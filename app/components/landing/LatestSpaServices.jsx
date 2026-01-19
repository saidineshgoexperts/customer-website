'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Waves, Star, Clock, Heart, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function LatestSpaServices() {
  const [spaStores, setSpaStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaServices = async () => {
      try {
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/products/latest_spa_stores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

        });

        const data = await response.json();
        if (data.success) {
          setSpaStores(data.stores || []);
        }
      } catch (error) {
        console.error("Error fetching spa services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaServices();
  }, []);

  return (
    <section className="relative py-22 overflow-hidden">
      {/* Zen World Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a120f] to-[#0a0a0a]" />

        {/* Breathing Animation Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#037166]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#025951]/20 rounded-full blur-3xl"
        />
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
            <Waves className="w-4 h-4 text-[#037166]" />
            <span className="text-sm text-[#037166] font-medium">Calm Zen World</span>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Latest Spa Service
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Experience tranquility and rejuvenation with our premium spa treatments
          </motion.p>
        </motion.div>

        {/* Spa Services Slider */}
        <div className="flex overflow-x-auto pb-8 gap-6 snap-x scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {loading ? (
            // Skeleton Loading
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative w-[calc(100%/1.5)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/6.5)] h-[380px] flex-shrink-0 snap-start">
                <div className="relative h-full flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                  {/* Image skeleton */}
                  <div className="relative h-40 bg-white/10 flex-shrink-0" />
                  {/* Content skeleton */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-6 w-3/4 bg-white/10 rounded" />
                      <div className="h-6 w-1/4 bg-white/10 rounded" />
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="h-4 w-4 bg-white/10 rounded-full flex-shrink-0" />
                        <div className="h-4 w-2/3 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-6 mt-auto">
                      <div className="h-4 w-1/3 bg-white/10 rounded" />
                      <div className="h-6 w-1/4 bg-white/10 rounded" />
                    </div>
                    <div className="w-full py-3 bg-white/10 rounded-xl" />
                  </div>
                </div>
              </div>
            ))
          ) : spaStores.map((store, index) => {
            const imageUrl = store.image ? (store.image.startsWith('http') ? store.image : `https://api.doorstephub.com/${store.image}`) : 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800';

            return (
              <motion.div
                key={store._id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative w-[calc(100%/1.5)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/6.5)] h-[380px] flex-shrink-0 snap-start"
              >
                {/* Card with Breathing Effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(3, 113, 102, 0)',
                      '0 0 30px 5px rgba(3, 113, 102, 0.1)',
                      '0 0 0 0 rgba(3, 113, 102, 0)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  className="relative h-full flex flex-col bg-gradient-to-br from-[#1a1a1a]/60 to-[#0f0f0f]/60 backdrop-blur-2xl border border-[#037166]/20 rounded-2xl overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={imageUrl}
                      alt={store.storeName}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    {/* Floating Heart Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="absolute top-4 right-4 w-12 h-12 bg-[#037166]/20 backdrop-blur-md border border-[#037166]/30 rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-6 h-6 text-[#037166]" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#037166] transition-colors line-clamp-1">
                        {store.storeName}
                      </h3>
                      {/* Placeholder Rating/New Tag */}
                      <div className="flex items-center space-x-1 px-2 py-1 bg-[#037166]/20 rounded-lg">
                        <span className="text-xs text-[#037166] font-bold uppercase">New</span>
                      </div>
                    </div>

                    {/* Location - Limited to 1 line to save space */}
                    <div className="flex-1 min-h-0 overflow-hidden">
                      <div className="flex items-start gap-2 mb-2 text-white/60">
                        <MapPin className="w-4 h-4 text-[#037166] mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-1">
                          {store.address || store.cityName || 'Hyderabad'}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-6 mt-auto">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <span className="text-sm">Starting from</span>
                      </div>
                      <div className="text-2xl font-bold text-[#037166]">₹{store.defaultPrice}</div>
                    </div>

                    {/* Book Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-[#037166]/80 to-[#025951]/80 backdrop-blur-sm rounded-xl text-white font-medium hover:from-[#037166] hover:to-[#025951] transition-all"
                    >
                      View Details
                    </motion.button>
                  </div>

                  {/* Subtle Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#037166]/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Breathing Instruction */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-[#037166]/5 border border-[#037166]/20 rounded-full"
          >
            <div className="w-2 h-2 bg-[#037166] rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Breathe in... hold... breathe out...</span>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}
