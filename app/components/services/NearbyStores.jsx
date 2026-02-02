'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Star, Phone, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocation } from '@/hooks/useLocation';
import { toast } from 'sonner';



export function NearbyServiceCenters({ onViewAll }) {
  const router = useRouter();
  const { location, detectWithGPS, error: locationError } = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          const transformedServices = data.nearestServiceCenters.slice(0, 4).map((service, index) => ({
            id: service?._id || index,
            name: service?.name || service?.business_name || `${service?.firstName || ''} ${service?.lastName || ''}` || 'Unknown Service',
            distance: `${(0.5 + index * 0.8).toFixed(1)} km`,
            rating: parseFloat(service?.rating) || 4.5,
            status: service?.storeHours || 'Open Now',
            phone: service?.phone || '+91 9876543210',
            address: service?.address || service?.cityName || 'Hyderabad, Telangana',
            image: service?.image ? `https://api.doorstephub.com/${service.image}` : null,
            logo: service?.logo ? `https://api.doorstephub.com/${service.logo}` : null,
          }));

          setServices(transformedServices);
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

          <h2 className="text-4xl sm:text-5xl font-bold mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/services/child/683dbc04b62d2a241de0f7e8?category=Services&name=Service Centers')}
          >
            <span className="text-white">Nearest Appliance </span>
            <span className="bg-gradient-to-r from-[#037166] via-[#04a99d] to-[#037166] bg-clip-text text-transparent">
              Service Centers
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find expert repair centers near you for all your home appliances.
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => router.push(`/services/store/${service.id}`)}
              >
                <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                  {/* Distance Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-6 py-1 bg-gradient-to-r from-[#037166] to-[#04a99d] backdrop-blur-md rounded-full rounded-t-none border border-t-0 border-[#037166]/30 shadow-lg whitespace-nowrap flex items-center space-x-2"
                  >
                    <MapPin className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-bold">{service.distance} away</span>
                  </motion.div>

                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-[#2a2a2a]">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="w-12 h-12 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Hover Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
                    />

                    {/* View Details Button - Bottom Right */}
                    <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-[#037166] flex items-center justify-center shadow-lg shadow-black/40 border border-white/20"
                      >
                        <ArrowRight className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#037166]/20">
                        <Star className="w-3.5 h-3.5 fill-[#04a99d] text-[#04a99d]" />
                        <span className="text-xs font-bold text-white">{service.rating}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${service.status === 'Open Now'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                        {service.status.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#04a99d] transition-colors line-clamp-1">
                      {service.name}
                    </h4>
                    <p className="text-white/40 text-xs line-clamp-1 mb-4">
                      {service.address}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `tel:${service.phone}`;
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#037166] border border-white/10 hover:border-[#037166] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                  </div>

                  {/* Glass Border on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl border-2 border-[#037166]/50 pointer-events-none"
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 border-2 border-dashed border-gray-700 rounded-3xl">
              {location ? (
                <>
                  <MapPin className="w-16 h-16 mx-auto mb-6 opacity-50" />
                  <p className="text-lg mb-2">No service centers found nearby</p>
                  <button onClick={detectWithGPS} className="mt-4 px-6 py-2 bg-[#037166] text-white rounded-xl">Retry Detection</button>
                </>
              ) : (
                <>
                  <Navigation className="w-16 h-16 mx-auto mb-6 opacity-50" />
                  <p className="text-lg mb-2">Enable location to see nearby stores</p>
                  <button onClick={detectWithGPS} className="mt-4 px-8 py-3 bg-gradient-to-r from-[#037166] to-[#04a99d] text-white rounded-2xl shadow-lg">Detect My Location</button>
                </>
              )}
            </div>
          )}
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
