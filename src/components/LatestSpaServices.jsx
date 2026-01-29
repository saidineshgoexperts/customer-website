'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Waves, Star, Clock, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LatestSpaServices() {
  const spaServices = [
    {
      title: 'Deep Tissue Massage',
      duration: '90 min',
      price: '$120',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1757689314932-bec6e9c39e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMG1hc3NhZ2V8ZW58MXx8fHwxNzY3OTQ0NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      benefits: ['Stress Relief', 'Pain Management'],
    },
    {
      title: 'Aromatherapy Session',
      duration: '60 min',
      price: '$85',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582498674105-ad104fcc5784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY3OTU0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      benefits: ['Relaxation', 'Mood Enhancement'],
    },
    {
      title: 'Hot Stone Therapy',
      duration: '75 min',
      price: '$95',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1650434509457-48e13c4a168b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHplbnxlbnwxfHx8fDE3NjgwMjY3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      benefits: ['Muscle Tension', 'Circulation'],
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
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
              Latest Spa Services
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

        {/* Spa Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {spaServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -12 }}
              className="group relative"
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
                className="relative h-full bg-gradient-to-br from-[#1a1a1a]/60 to-[#0f0f0f]/60 backdrop-blur-2xl border border-[#037166]/20 rounded-3xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
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
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#037166] transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-[#037166]/20 rounded-lg">
                      <Star className="w-4 h-4 text-[#037166] fill-[#037166]" />
                      <span className="text-sm text-white font-medium">{service.rating}</span>
                    </div>
                  </div>

                  {/* Benefits Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#037166]/10 border border-[#037166]/20 rounded-full text-xs text-[#037166]"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Duration & Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4 text-[#037166]" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-[#037166]">{service.price}</div>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#037166]/80 to-[#025951]/80 backdrop-blur-sm rounded-xl text-white font-medium hover:from-[#037166] hover:to-[#025951] transition-all"
                  >
                    Book Session
                  </motion.button>
                </div>

                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#037166]/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Breathing Instruction */}
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
}
