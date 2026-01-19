'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, Clock, Star, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

function SkeletonCard() {
  return (
    <div className="relative h-full bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-xl border border-[#037166]/20 rounded-3xl overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-3 w-24 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-5 bg-[#2a2a2a] rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-[#2a2a2a] rounded animate-pulse" />
          <div className="h-4 w-24 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
        <div className="h-12 bg-[#2a2a2a] rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export function BookingServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/products/latest_bookings_services');
        const data = await response.json();

        if (data.success && data.services) {
          const transformedServices = data.services.slice(0, 4).map(service => ({
            id: service._id,
            title: service.serviceName,
            category: service.categoryName,
            rating: 4.8,
            bookings: '2.3K',
            image: service.mainImage
              ? `https://api.doorstephub.com/${service.mainImage}`
              : 'https://images.unsplash.com/photo-1594873604892-b599f847e859?w=400',
            status: service.status === 'active' ? 'Available' : 'Unavailable',
          }));
          setServices(transformedServices);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceId) => {
    router.push(`/service?id=${serviceId}`);
  };

  return (
    <section className="relative py-22 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d1410] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzLDExMywxMDIsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1 bg-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-[#037166]" />
            <span className="text-sm text-[#037166] font-medium">Futuristic Dashboard</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Latest Booking Services
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Book your favorite services instantly with our advanced booking platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="relative h-full bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-xl border border-[#037166]/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#037166]/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#037166]/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                    {service.status}
                  </div>

                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-[#037166] font-medium mb-2 uppercase tracking-wider">
                      {service.category}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[#037166] transition-colors">
                      {service.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-[#037166] fill-[#037166]" />
                        <span className="text-sm text-white font-medium">{service.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{service.bookings} bookings</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => handleServiceClick(service.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-[#037166] to-[#025951] rounded-xl text-white font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[#037166]/40 transition-all"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="absolute -inset-1 bg-gradient-to-r from-[#037166]/0 via-[#037166]/20 to-[#037166]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#037166]/30 rounded-full text-white font-semibold hover:bg-[#037166]/10 transition-all inline-flex items-center space-x-2"
          >
            <span>View All Services</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
}
