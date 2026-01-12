'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  {
    image: 'https://images.unsplash.com/photo-1715591780947-2784b54e5bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVuJTIwcmVwYWlyJTIwdGVjaG5pY2lhbnxlbnwxfHx8fDE3NjgwMzgwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Oven Deep Clean & Repair',
    description: 'Professional cleaning and repair service for all oven types',
    price: '₹599',
    rating: 4.8,
    reviews: 234,
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1762329405381-fe8014d280d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwcmVwYWlyfGVufDF8fHx8MTc2ODAzODA1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Smart TV Installation & Repair',
    description: 'Expert TV mounting, setup, and troubleshooting services',
    price: '₹799',
    rating: 4.9,
    reviews: 189,
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc2Nzk3ODg1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Deep Home Cleaning',
    description: 'Complete home sanitization and deep cleaning service',
    price: '₹1,299',
    rating: 4.7,
    reviews: 412,
    featured: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1716193696093-9c54b6a290e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyaWdlcmF0b3IlMjByZXBhaXJ8ZW58MXx8fHwxNzY4MDM4MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Refrigerator Service',
    description: 'Gas refill, cooling issues, and complete maintenance',
    price: '₹899',
    rating: 4.6,
    reviews: 287,
    featured: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1696546761269-a8f9d2b80512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMHJlcGFpcnxlbnwxfHx8fDE3Njc5OTYyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Washing Machine Repair',
    description: 'Fix all brands - drainage, drum, and motor issues',
    price: '₹699',
    rating: 4.8,
    reviews: 356,
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1721332154191-ba5f1534266e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhcHRvcCUyMHJlcGFpcnxlbnwxfHx8fDE3NjgwMzgwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Computer & Laptop Repair',
    description: 'Hardware fixes, software installation, virus removal',
    price: '₹499',
    rating: 4.9,
    reviews: 521,
    featured: false,
  },
];

export function FeaturedServices({ onServiceClick, onViewAll }) {
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
            Explore Our Featured Services
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => onServiceClick?.(index)}
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                {/* Featured Badge */}
                {service.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-xs font-medium text-white shadow-lg"
                  >
                    ⭐ Featured
                  </motion.div>
                )}

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
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
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#037166]/20">
                      <Star className="w-4 h-4 fill-[#04a99d] text-[#04a99d]" />
                      <span className="text-sm font-medium text-white">{service.rating}</span>
                    </div>
                    <span className="text-sm text-white/50">({service.reviews} reviews)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/50 mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-white">{service.price}</p>
                    </div>
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
