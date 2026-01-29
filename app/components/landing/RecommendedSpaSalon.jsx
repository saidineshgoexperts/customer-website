'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, TrendingUp, Crown } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export function RecommendedSpaSalon() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured spa stores from API
  useEffect(() => {
    const fetchFeaturedSpaStores = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/products/featured_spa_stores');
        const data = await response.json();

        if (data.success && data.stores && data.stores.length > 0) {
          const mappedStores = data.stores.map((store, index) => ({
            id: store._id,
            name: store.storeName || `${store.firstName} ${store.lastName}`,
            category: 'Premium Spa & Salon',
            rating: 4.8,
            reviews: '500+',
            price: '$$',
            image: store.image ? `https://api.doorstephub.com/${store.image}` : 'https://images.unsplash.com/photo-1582498674105-ad104fcc5784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY3OTU0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
            badge: index === 0 ? 'Top Rated' : 'Trending',
            highlights: [
              store.bio || 'Experienced professional',
              'Premium Services',
              `${store.cityName || 'Hyderabad'} Location`
            ],
            isDummy: false
          }));
          setFeatured(mappedStores);
        } else {
          // Fallback to original hardcoded data - expanded to 4 items
          setFeatured([
            {
              id: 'dummy-1',
              name: 'Royal Glow Spa',
              category: 'Premium Spa',
              rating: 4.9,
              reviews: '1.2K',
              price: '$$$',
              image: 'https://images.unsplash.com/photo-1582498674105-ad104fcc5784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY3OTU0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
              badge: 'Top Rated',
              highlights: ['VIP Lounge', 'Expert Therapists', 'Premium Products'],
              isDummy: true
            },
            {
              id: 'dummy-2',
              name: 'Elegance Hair Studio',
              category: 'Luxury Salon',
              rating: 4.8,
              reviews: '980',
              price: '$$$',
              image: 'https://images.unsplash.com/photo-1675034741696-fa9551c31bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGhhaXJjdXQlMjBiZWF1dHl8ZW58MXx8fHwxNzY4MDI2NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
              badge: 'Trending',
              highlights: ['Celebrity Stylists', 'Latest Trends', 'Exclusive Brands'],
              isDummy: true
            },
            {
              id: 'dummy-3',
              name: 'Zenith Wellness Retreat',
              category: 'Luxury Spa',
              rating: 4.9,
              reviews: '1.5K',
              price: '$$$',
              image: 'https://images.unsplash.com/photo-1578631618866-c4e99113bbce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjByZXRyZWF0fGVufDF8fHwxNzY3OTU0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
              badge: 'Top Rated',
              highlights: ['Holistic Treatments', 'Organic Products', 'Private Suites'],
              isDummy: true
            },
            {
              id: 'dummy-4',
              name: 'Velvet Touch Salon',
              category: 'Premium Salon',
              rating: 4.7,
              reviews: '850',
              price: '$$',
              image: 'https://images.unsplash.com/photo-1606851732918-bfec4a081ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHNiYWxheSUyMGhhaXJ8ZW58MXx8fHwxNzY4MDI2NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
              badge: 'Trending',
              highlights: ['Signature Styles', 'Premium Colors', 'Express Services'],
              isDummy: true
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching featured spa stores:', err);
        // Fallback to original hardcoded data - expanded to 4 items
        setFeatured([
          {
            id: 'dummy-1',
            name: 'Royal Glow Spa',
            category: 'Premium Spa',
            rating: 4.9,
            reviews: '1.2K',
            price: '$$$',
            image: 'https://images.unsplash.com/photo-1582498674105-ad104fcc5784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY3OTU0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
            badge: 'Top Rated',
            highlights: ['VIP Lounge', 'Expert Therapists', 'Premium Products'],
            isDummy: true
          },
          {
            id: 'dummy-2',
            name: 'Elegance Hair Studio',
            category: 'Luxury Salon',
            rating: 4.8,
            reviews: '980',
            price: '$$$',
            image: 'https://images.unsplash.com/photo-1675034741696-fa9551c31bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxvbiUyMGhhaXJjdXQlMjBiZWF1dHl8ZW58MXx8fHwxNzY4MDI2NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
            badge: 'Trending',
            highlights: ['Celebrity Stylists', 'Latest Trends', 'Exclusive Brands'],
            isDummy: true
          },
          {
            id: 'dummy-3',
            name: 'Zenith Wellness Retreat',
            category: 'Luxury Spa',
            rating: 4.9,
            reviews: '1.5K',
            price: '$$$',
            image: 'https://images.unsplash.com/photo-1578631618866-c4e99113bbce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjByZXRyZWF0fGVufDF8fHwxNzY3OTU0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
            badge: 'Top Rated',
            highlights: ['Holistic Treatments', 'Organic Products', 'Private Suites'],
            isDummy: true
          },
          {
            id: 'dummy-4',
            name: 'Velvet Touch Salon',
            category: 'Premium Salon',
            rating: 4.7,
            reviews: '850',
            price: '$$',
            image: 'https://images.unsplash.com/photo-1606851732918-bfec4a081ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHNiYWxheSUyMGhhaXJ8ZW58MXx8fHwxNzY4MDI2NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
            badge: 'Trending',
            highlights: ['Signature Styles', 'Premium Colors', 'Express Services'],
            isDummy: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSpaStores();
  }, []);

  if (loading) {
    return (
      <section className="relative py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent">
              Recommended Spa & Salon
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 h-80 rounded-3xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#12100a] to-[#0a0a0a]" />

        {/* Golden Accent Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#037166]/20 via-[#d4af37]/10 to-transparent rounded-full blur-3xl"
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#037166]/10 via-[#d4af37]/10 to-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <Crown className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm bg-gradient-to-r from-[#037166] to-[#d4af37] bg-clip-text text-transparent font-medium">
              Luxury Glow World
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent">
              Recommended Spa & Salon
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Premium destinations handpicked for the ultimate pampering experience
          </p>
        </motion.div>

        {/* Featured Cards - Changed to 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((place, index) => (
            <motion.div
              key={place.id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className={`group relative ${place.isDummy ? 'cursor-not-allowed grayscale-[0.5] opacity-80' : ''}`}
            >
              {/* Premium Card - Original sizing preserved */}
              <div className={`relative h-full bg-gradient-to-br from-[#1a1a1a] via-[#1a1510] to-[#0f0f0f] border-2 border-[#037166]/30 rounded-3xl overflow-hidden ${place.isDummy ? 'pointer-events-none' : ''}`}>
                {/* Top Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#d4af37]/90 to-[#037166]/90 backdrop-blur-md rounded-full">
                  <Award className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">{place.badge}</span>
                </div>

                {/* Image with Luxury Overlay - Original height preserved */}
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

                  {/* Shimmer Effect */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={place.isDummy ? {} : { x: '100%' }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>

                {/* Content - Original spacing preserved */}
                <div className="p-8 -mt-20 relative z-10">
                  {/* Main Info Card */}
                  <motion.div
                    whileHover={place.isDummy ? {} : { y: -5 }}
                    className="p-6 bg-[#1a1a1a]/90 backdrop-blur-xl border border-[#037166]/30 rounded-2xl mb-6 shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-xs text-[#d4af37] font-semibold mb-2 uppercase tracking-wider">
                          {place.category}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#037166] transition-colors">
                          {place.name}
                        </h3>
                      </div>
                      <div className="px-3 py-1 bg-[#037166]/20 rounded-lg">
                        <span className="text-sm text-[#d4af37] font-bold">{place.price}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                        <span className="text-lg font-bold text-white">{place.rating}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {place.reviews} reviews
                      </div>
                      <TrendingUp className="w-5 h-5 text-[#037166] ml-auto" />
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {place.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-[#037166] rounded-full" />
                          <span className="text-sm text-gray-300">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className={`grid grid-cols-2 gap-4 ${place.isDummy ? 'opacity-50 pointer-events-none' : ''}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !place.isDummy && (window.location.href = `/spa-salon?storeId=${place.id}`)}
                      className="py-3 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] rounded-xl text-white font-semibold shadow-lg shadow-[#C06C84]/40 hover:shadow-xl hover:shadow-[#C06C84]/50 transition-all"
                      disabled={place.isDummy}
                    >
                      Book Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !place.isDummy && (window.location.href = `/spa-salon?storeId=${place.id}`)}
                      className="py-3 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#C06C84]/30 rounded-xl text-white font-semibold hover:bg-[#C06C84]/10 transition-all"
                      disabled={place.isDummy}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>

                {/* Premium Glow Effect */}
                {!place.isDummy && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#037166]/20 via-[#d4af37]/20 to-[#037166]/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Stats - Original layout preserved */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Crown, label: 'Premium Partners', value: '50+' },
            { icon: Award, label: 'Quality Certified', value: '100%' },
            { icon: Sparkles, label: 'Satisfied Clients', value: '15K+' },
            { icon: TrendingUp, label: 'Growth Rate', value: '250%' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-[#1a1a1a]/60 to-[#1a1510]/60 backdrop-blur-sm border border-[#037166]/20 rounded-2xl text-center"
            >
              <stat.icon className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
