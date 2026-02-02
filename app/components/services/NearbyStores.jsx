'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Star, Phone, Clock } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useLocation } from '@/hooks/useLocation';
import { toast } from 'sonner';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 17.3850, // Hyderabad default
  lng: 78.4867
};

const options = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ],
};

export function NearbyServiceCenters({ onViewAll }) {
  const { location, detectWithGPS, error: locationError } = useLocation();
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // Fetch nearest service centers
  useEffect(() => {
    const fetchNearestServiceCenters = async () => {
      if (!location) return;

      try {
        setLoading(true);
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/nearest_service_centers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lattitude: location.lat,
            longitude: location.lng,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch service centers');
        }

        const data = await response.json();

        if (data.success && data.nearestServiceCenters) {
          // Add coordinates to services (using location as fallback with offset)
          const transformedServices = data.nearestServiceCenters.slice(0, 8).map((service, index) => {
            // Simulate coordinates around user's location
            const offsetLat = location.lat + (Math.random() - 0.5) * 0.02;
            const offsetLng = location.lng + (Math.random() - 0.5) * 0.02;

            return {
              id: service?._id || index,
              name: service?.name || service?.business_name || `${service?.firstName || ''} ${service?.lastName || ''}` || 'Unknown Service',
              distance: `${(0.5 + index * 0.8).toFixed(1)} km`,
              rating: parseFloat(service?.rating) || 4.5,
              status: service?.storeHours || 'Open Now',
              phone: service?.phone || '+91 9876543210',
              address: service?.address || service?.cityName || 'Hyderabad, Telangana',
              lat: offsetLat,
              lng: offsetLng,
              image: service?.image ? `https://api.doorstephub.com/${service.image}` : null,
              logo: service?.logo ? `https://api.doorstephub.com/${service.logo}` : null,
            };
          });

          setServices(transformedServices);
          // Auto-select first service
          if (transformedServices.length > 0) {
            setSelectedService(0);
          }
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error('Error fetching service centers:', err);
        setError('Failed to load nearby services');
        toast.error('Failed to load nearby services');
      } finally {
        setLoading(false);
      }
    };

    fetchNearestServiceCenters();
  }, [location]);

  const MapComponent = useCallback(() => {
    if (!isLoaded || !location) return null;

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: location.lat, lng: location.lng }}
        zoom={13}
        options={options}
      >
        {/* User's Location */}
        <Marker
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }}
          title="Your Location"
        />

        {/* Service Centers */}
        {services.map((service, index) => (
          <Marker
            key={service.id}
            position={{ lat: service.lat, lng: service.lng }}
            title={service.name}
            icon={{
              url: selectedService === index
                ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(32, 32)
            }}
            onClick={() => setSelectedService(index)}
          />
        ))}
      </GoogleMap>
    );
  }, [isLoaded, location, services, selectedService]);

  // Skeleton
  const SkeletonService = () => (
    <div className="p-6 rounded-2xl bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#037166]/20 overflow-hidden relative">
      <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 bg-[#2a2a2a] rounded animate-pulse" />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-[#2a2a2a] rounded-full animate-pulse" />
              <div className="h-3 w-12 bg-[#2a2a2a] rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#2a2a2a] rounded-full animate-pulse" />
          <div className="h-4 w-20 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
        <div className="h-10 w-20 bg-[#2a2a2a] rounded-lg animate-pulse" />
      </div>
    </div>
  );

  if (loadError) {
    return (
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-400 mb-4">Failed to load Google Maps</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#037166] text-white rounded-full"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="nearby-centers" className="relative py-12 overflow-hidden">
      {/* Dark Map Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a1410] to-[#0a0a0a]">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="map-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 0 25 L 50 25 M 25 0 L 25 50" stroke="rgba(3,113,102,0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <Navigation className="w-4 h-4 text-[#037166]" />
            <h6 className="text-sm text-[#037166] font-medium">Live Location Services</h6>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Nearest Appliance Service Centers
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {/* Real-time service centers near {location ? location.shortAddress || 'you' : 'you'} */}
            {selectedService !== null && services[selectedService] && (
              <h4 className="block mt-2 text-[#04a99d] font-medium">
                📍 {services[selectedService].name} ({services[selectedService].distance})
              </h4>
            )}
          </p>

          {!location && (
            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={detectWithGPS}
                className="px-8 py-3 bg-gradient-to-r from-[#037166] to-[#04a99d] hover:from-[#025951] text-white rounded-2xl font-medium transition-all shadow-lg shadow-[#037166]/30"
              >
                🔍 Detect My Location
              </button>
              {locationError && (
                <p className="text-red-400 mt-2 text-sm max-w-md">{locationError}</p>
              )}
            </div>
          )}
        </motion.div>

        {/* Map & List */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a]/90 to-[#0f0f0f]/90 border-2 border-[#037166]/20 shadow-2xl"
          >
            {!isLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[#037166]/20 border-t-[#04a99d] rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading map...</p>
                </div>
              </div>
            ) : !location ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Enable location to see nearby centers</p>
                </div>
              </div>
            ) : (
              <MapComponent />
            )}
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:max-h-[500px] "
          >
            {loading ? (
              Array(4).fill(0).map((_, i) => <SkeletonService key={i} />)
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  onClick={() => setSelectedService(index)}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-2xl cursor-pointer transition-all duration-300 group ${selectedService === index
                    ? 'bg-gradient-to-r from-[#037166]/30 to-[#04a99d]/20 border-2 border-[#037166] shadow-2xl shadow-[#037166]/40'
                    : 'bg-[#1a1a1a]/70 border border-[#037166]/20 hover:border-[#037166]/40 hover:bg-[#1a1a1a]/90'
                    }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-[#04a99d] transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">{service.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-[#04a99d] mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        {service.rating}
                      </div>
                      <div className="text-xs text-gray-500">{service.distance}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <h6 className={`px-3 py-1 rounded-full text-xs font-medium ${service.status === 'Open Now'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}>
                      {service.status}
                    </h6>
                    <button className="px-4 py-2 bg-[#037166]/50 hover:bg-[#037166] text-white text-sm rounded-xl transition-all group-hover:scale-105">
                      Call Now
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-500 border-2 border-dashed border-gray-700 rounded-3xl">
                {location ? (
                  <>
                    <MapPin className="w-16 h-16 mx-auto mb-6 opacity-50" />
                    <p className="text-lg mb-2">No service centers found nearby</p>
                    <p className="text-sm">Try adjusting your location</p>
                  </>
                ) : (
                  <>
                    <Navigation className="w-16 h-16 mx-auto mb-6 opacity-50" />
                    <p className="text-lg mb-2">Enable location access</p>
                    <button
                      onClick={detectWithGPS}
                      className="mt-4 px-6 py-2 bg-[#037166] text-white rounded-xl"
                    >
                      Detect Location
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#037166]/50 text-white font-medium transition-all duration-300 flex items-center gap-2 group"
            onClick={onViewAll}
          >
            View All Stores
            <Navigation className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
