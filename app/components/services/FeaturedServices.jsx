import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { fetchFeaturedServices, imageLoader } from '@/lib/api';

export function FeaturedServices({ onServiceClick, onViewAll }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedServices();
        setServices(data);
      } catch (err) {
        console.error('Error loading featured services:', err);
        setError('Failed to load featured services');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-[#037166] animate-spin" />
        <p className="text-white/60">Loading featured services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-full bg-[#037166]/20 border border-[#037166]/50 text-white hover:bg-[#037166]/40 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1614]/30 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#037166]/10 border border-[#037166]/20 mb-4"
          >
            <Sparkles className="w-3 h-3 text-[#04a99d]" />
            <span className="text-xs font-medium text-[#04a99d]">FEATURED</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            Explore Our Featured Service
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Top-rated services trusted by thousands of customers
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => onServiceClick?.(service._id)}
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                {/* Featured Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-xs font-medium text-white shadow-lg"
                >
                  ⭐ {service.serviceDelhiveryType || 'Featured'}
                </motion.div>

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={imageLoader({ src: service.mainImage })}
                    alt={service.serviceName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover Glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating Placeholder (not in API, using dummy) */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#037166]/20">
                      <Star className="w-4 h-4 fill-[#04a99d] text-[#04a99d]" />
                      <span className="text-sm font-medium text-white">4.8</span>
                    </div>
                    <span className="text-sm text-white/50">(New)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors line-clamp-1">
                    {service.serviceName}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-end">
                    {/* <div>
                      <p className="text-xs text-white/50 mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-white">₹{service.serviceCharge}</p>
                    </div> */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center shadow-lg shadow-[#037166]/30 group-hover:shadow-[#037166]/50 transition-all"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* Glass Border on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl border-2 border-[#037166]/50 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#037166]/50 text-white font-medium transition-all duration-300 flex items-center gap-2 group"
            onClick={onViewAll}
          >
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
