'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Star, Check, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function RecommendedHostels() {
  const hostels = [
    {
      name: 'Comfort Haven',
      tagline: 'Your Cozy Retreat',
      rating: 4.9,
      residents: 45,
      image: 'https://images.unsplash.com/photo-1743116591552-9ff5e8c1ad31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGhvc3RlbHxlbnwxfHx8fDE3NjgwMjY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Homely Atmosphere', 'Community Kitchen', 'Weekly Events'],
      trustScore: 98,
    },
    {
      name: 'SafeNest Residency',
      tagline: 'Where Safety Meets Comfort',
      rating: 4.8,
      residents: 62,
      image: 'https://images.unsplash.com/photo-1539606420556-14c457c45507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBhY2NvbW1vZGF0aW9ufGVufDF8fHx8MTc2ODAyNjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['24/7 Security', 'CCTV Coverage', 'Female-only Floors'],
      trustScore: 96,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Warm Comfort Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0a0a] to-[#0a0a0a]" />

        {/* Warm Glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#037166]/20 via-[#ff6b35]/10 to-transparent rounded-full blur-3xl"
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#037166]/10 to-[#ff6b35]/10 border border-[#037166]/30 rounded-full mb-6">
            <Heart className="w-4 h-4 text-[#ff6b35]" />
            <span className="text-sm bg-gradient-to-r from-[#037166] to-[#ff6b35] bg-clip-text text-transparent font-medium">
              Warm Comfort World
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Recommended Hostels
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trusted accommodations with a focus on safety, comfort, and community
          </p>
        </motion.div>

        {/* Hostels Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {hostels.map((hostel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              {/* Trust-Focused Card */}
              <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-[#1a1410] border-2 border-[#037166]/30 rounded-3xl overflow-hidden shadow-2xl">
                {/* Trust Score Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative w-20 h-20"
                  >
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="#1a1a1a"
                        strokeWidth="6"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="#037166"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={220}
                        initial={{ strokeDashoffset: 220 }}
                        whileInView={{ strokeDashoffset: 220 - (220 * hostel.trustScore) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-xl font-bold text-white">{hostel.trustScore}</div>
                      <div className="text-xs text-[#037166]">Trust</div>
                    </div>
                  </motion.div>
                </div>

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={hostel.image}
                    alt={hostel.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

                  {/* Heart Icon */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 left-6 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-md border border-[#037166]/30 rounded-full flex items-center justify-center group/heart"
                  >
                    <Heart className="w-6 h-6 text-[#ff6b35] group-hover/heart:fill-[#ff6b35] transition-all" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#037166] transition-colors">
                      {hostel.name}
                    </h3>
                    <p className="text-gray-400 italic">{hostel.tagline}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-[#037166] fill-[#037166]" />
                      <span className="text-lg font-semibold text-white">{hostel.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-[#037166]" />
                      <span className="text-sm text-gray-400">{hostel.residents} residents</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {hostel.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-6 h-6 bg-[#037166]/20 border border-[#037166]/40 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-[#037166]" />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#037166] to-[#025951] rounded-xl text-white font-semibold shadow-xl shadow-[#037166]/40 hover:shadow-2xl hover:shadow-[#037166]/50 transition-all flex items-center justify-center space-x-2"
                  >
                    <Home className="w-5 h-5" />
                    <span>Schedule a Visit</span>
                  </motion.button>
                </div>

                {/* Warm Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#037166]/20 via-[#ff6b35]/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Check, label: 'Verified Properties', value: '100%' },
            { icon: Heart, label: 'Satisfaction Rate', value: '4.8/5' },
            { icon: Users, label: 'Happy Residents', value: '2.5K+' },
            { icon: Home, label: 'Safe Locations', value: '50+' },
          ].map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-[#1a1a1a]/60 to-[#1a1410]/60 backdrop-blur-sm border border-[#037166]/20 rounded-2xl text-center"
            >
              <indicator.icon className="w-8 h-8 text-[#037166] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{indicator.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{indicator.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
