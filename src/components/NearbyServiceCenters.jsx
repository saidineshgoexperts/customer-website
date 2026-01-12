'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Star, Phone, Clock } from 'lucide-react';

export function NearbyServiceCenters() {
  const [selectedService, setSelectedService] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hyderabad coordinates (your location)
  const HYDERABAD_LATTITUDE = 17.385044;
  const HYDERABAD_LONGITUDE = 78.486671;

  useEffect(() => {
    const fetchNearestServiceCenters = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/nearest_service_centers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lattitude: HYDERABAD_LATTITUDE,
            longitude: HYDERABAD_LONGITUDE,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch service centers');
        }

        const data = await response.json();

        if (data.success && data.nearestServiceCenters) {
          const transformedServices = data.nearestServiceCenters.map((service, index) => ({
            id: service._id,
            name: service.name || `${service.firstName} ${service.lastName}`,
            distance: `${(0.3 + index * 0.4).toFixed(1)} km`, // Simulated distance
            rating: parseFloat(service.rating) || 4.5,
            status: service.storeHours ? service.storeHours : 'Open',
            phone: service.phone || '+91XXXXXXXXXX',
            address: service.address || service.cityName || 'Hyderabad',
            image: service.image 
              ? `https://api.doorstephub.com/${service.image}`
              : `https://images.unsplash.com/photo-${index + 1}?w=400`,
            logo: service.logo 
              ? `https://api.doorstephub.com/${service.logo}` 
              : null,
          }));
          
          setServices(transformedServices.slice(0, 5)); // Limit to 5 services
        }
      } catch (err) {
        console.error('Error fetching service centers:', err);
        setError('Failed to load nearby services');
      } finally {
        setLoading(false);
      }
    };

    fetchNearestServiceCenters();
  }, []);

  // Skeleton for loading state
  const SkeletonService = () => (
    <div className="p-6 rounded-2xl bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#037166]/20 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 bg-[#2a2a2a] rounded" />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-[#2a2a2a] rounded-full" />
              <div className="h-3 w-12 bg-[#2a2a2a] rounded" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-[#2a2a2a] rounded-full" />
              <div className="h-3 w-8 bg-[#2a2a2a] rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#2a2a2a] rounded-full" />
          <div className="h-4 w-20 bg-[#2a2a2a] rounded" />
        </div>
        <div className="h-10 w-20 bg-[#2a2a2a] rounded-lg" />
      </div>
    </div>
  );

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dark Map World Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a1410] to-[#0a0a0a]">
        {/* Map Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="map-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="rgba(3,113,102,0.3)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="3" fill="rgba(3,113,102,0.5)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-pattern)" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <Navigation className="w-4 h-4 text-[#037166]" />
            <span className="text-sm text-[#037166] font-medium">Live Location Services</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Nearby Service Centers
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover essential services near you with real-time availability
          </p>
        </motion.div>

        {/* Interactive Map & List */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-xl border border-[#037166]/20 rounded-3xl overflow-hidden p-8"
          >
            {/* Simulated Map */}
            <div className="relative w-full h-full">
              {/* Center Point (You) */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#037166] rounded-full shadow-lg shadow-[#037166]/50"
              >
                <div className="absolute inset-0 bg-[#037166] rounded-full animate-ping opacity-75" />
              </motion.div>

              {/* Service Pins */}
              {services.map((service, index) => {
                const positions = [
                  { top: '20%', left: '60%' },
                  { top: '70%', left: '30%' },
                  { top: '35%', left: '75%' },
                  { top: '80%', left: '70%' },
                  { top: '15%', left: '25%' },
                ];

                return (
                  <motion.div
                    key={service.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedService(index)}
                    className="absolute cursor-pointer"
                    style={positions[index] || positions[0]}
                  >
                    <div className={`relative ${selectedService === index ? 'z-10' : ''}`}>
                      <motion.div
                        animate={selectedService === index ? { y: [0, -10, 0] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedService === index
                            ? 'bg-gradient-to-br from-[#037166] to-[#025951] shadow-xl shadow-[#037166]/50'
                            : 'bg-[#1a1a1a] border-2 border-[#037166]/40'
                        }`}
                      >
                        <MapPin className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      {/* Connection Line to Center */}
                      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                        <motion.line
                          x1="50%"
                          y1="50%"
                          x2="0"
                          y2="0"
                          stroke="#037166"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.3 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}

              {/* Radar Circle Animation */}
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-[#037166] rounded-full"
              />
            </div>

            {/* Map Label */}
            <div className="absolute bottom-4 left-4 px-3 py-2 bg-[#037166]/20 backdrop-blur-sm border border-[#037166]/30 rounded-lg">
              <p className="text-xs text-[#037166] font-medium">
                {loading ? 'Locating...' : `${services.length} centers found`}
              </p>
            </div>
          </motion.div>

          {/* Service List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {loading ? (
              Array(5).fill(0).map((_, index) => <SkeletonService key={index} />)
            ) : error ? (
              <div className="p-8 text-center text-gray-400 rounded-2xl border border-[#037166]/20">
                {error}
              </div>
            ) : (
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  onClick={() => setSelectedService(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedService === index
                      ? 'bg-gradient-to-r from-[#037166]/20 to-[#025951]/20 border-2 border-[#037166] shadow-lg shadow-[#037166]/20'
                      : 'bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#037166]/20 hover:border-[#037166]/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-[#037166]" />
                          <span>{service.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-[#037166] fill-[#037166]" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-[#037166]/20 rounded-full flex items-center justify-center"
                    >
                      <Navigation className="w-5 h-5 text-[#037166]" />
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#037166]" />
                      <span className="text-sm text-gray-300">{service.status}</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#037166]/20 hover:bg-[#037166]/30 border border-[#037166]/30 rounded-lg text-sm text-[#037166] font-medium transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {service.phone}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
