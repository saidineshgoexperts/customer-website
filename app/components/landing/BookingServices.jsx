'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, Clock, Star, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

function SkeletonCard() {
  return (
    <div className="h-auto bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-xl border border-[#037166]/20 rounded-3xl overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-24 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="h-5 bg-[#2a2a2a] rounded animate-pulse w-3/4" />
      </div>
    </div>
  );
}

export function BookingServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/products/latest_bookings_services');
        const data = await response.json();

        if (data.success && data.services) {
          const transformedServices = data.services.slice(0, 6).map(service => ({
            id: service._id,
            title: service.serviceName,
            category: service.categoryName,
            rating: 4.8,
            bookings: '2.3K',
            image: service.mainImage
              ? `https://api.doorstephub.com/${service.mainImage}`
              : 'https://images.unsplash.com/photo-1594873604892-b599f847e859?w=400',
            status: service.status === 'active' ? 'Save 10% On Services' : 'Unavailable',
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

  const handleServiceClick = (service) => {
    const categoryParam = encodeURIComponent(service.category);
    const subCategoryParam = encodeURIComponent(service.title);
    router.push(`/services/detail/${service.id}?category=${categoryParam}&subCategory=${subCategoryParam}`);
  };

  return (
    <section id="booking-services" className="relative py-22  overflow-hidden">
      {/* Architectural World Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d12] to-[#0a0a0a]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(3,113,102,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(3,113,102,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Gradient Orbs - Intensified */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: 'spring', damping: 30 }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#037166]/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.02,
            y: -mousePosition.y * 0.02,
          }}
          transition={{ type: 'spring', damping: 30 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#025951]/40 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1 bg-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-[#037166]" />
            <h6 className="text-sm  bg-gradient-to-r from-[#037166] to-[#ff6b35] bg-clip-text text-transparent font-medium">Futuristic Service Partners</h6>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Latest Booking </span>
            <span className="text-[#037166]">Services</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Book your favorite services instantly with our advanced booking platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative h-auto flex flex-col"
              >
                <div className="relative flex-1 bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-xl border border-[#037166]/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#037166]/20 transition-all duration-300 flex flex-col">
                  {/* Status Badge - Top Center */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-[#037166]/90 backdrop-blur-md rounded-b-lg rounded-t-none text-[15px]  text-white shadow-lg border border-t-0 border-[#037166]/20 whitespace-nowrap">

                    <h6 className="text-[10px] font-ubuntu tracking-wide">{service.status}</h6>
                  </div>

                  {/* Image - Fixed height */}
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    {/* Book Now Button Badge - Bottom Center */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 px-6 py-1 bg-[#037166] backdrop-blur-md rounded-t-lg rounded-b-none text-white shadow-lg border border-b-0 border-[#037166]/20 whitespace-nowrap cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#025951]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service);
                      }}
                    >
                      <h6 className="text-[12px] font-ubuntu  tracking-wider ">Book Now</h6>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col">
                    <div className="space-y-1">

                      {/* Category + Rating */}
                      <div className="flex items-center justify-between">

                        {/* Category */}
                        <h6 className="text-[10px] text-[#037166] font-medium uppercase tracking-wider">
                          {service.category}
                        </h6>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#037166] fill-[#037166]" />
                          <span className="text-xs text-gray-300 font-medium">
                            {service.rating}
                          </span>
                        </div>

                      </div>

                      {/* Title */}
                      <h4
                        className="text-[12px] font-medium text-white group-hover:text-[#037166] transition-colors leading-tight line-clamp-2"
                        title={service.title}
                      >
                        {service.title}
                      </h4>

                    </div>
                  </div>


                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#037166]/0 via-[#037166]/20 to-[#037166]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
