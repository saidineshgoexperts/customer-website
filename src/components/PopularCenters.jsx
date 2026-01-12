'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, ArrowRight, TrendingUp } from 'lucide-react';

const centers = [
  {
    image: 'https://images.unsplash.com/photo-1667503779301-3120a323859a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHJlcGFpciUyMGNlbnRlcnxlbnwxfHx8fDE3NjgwMzgyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Premium Tech Service',
    location: 'Downtown District',
    rating: 4.9,
    reviews: 1240,
    speciality: 'All Electronics',
    popular: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1675034743372-672c3c3f8377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBhaXIlMjBzaG9wJTIwc3RvcmV8ZW58MXx8fHwxNzY4MDM4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Smart Repair Pro',
    location: 'Tech Park Area',
    rating: 4.8,
    reviews: 987,
    speciality: 'Smart Devices',
    popular: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1767938198097-b7d8ac22251d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlJTIwYnVzaW5lc3MlMjBzdG9yZWZyb250fGVufDF8fHx8MTc2ODAzODI0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Elite Appliance Care',
    location: 'Central Plaza',
    rating: 4.9,
    reviews: 1568,
    speciality: 'Home Appliances',
    popular: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1667503779301-3120a323859a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHJlcGFpciUyMGNlbnRlcnxlbnwxfHx8fDE3NjgwMzgyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Rapid Fix Solutions',
    location: 'Market Street',
    rating: 4.7,
    reviews: 756,
    speciality: 'Quick Service',
    popular: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1675034743372-672c3c3f8377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBhaXIlMjBzaG9wJTIwc3RvcmV8ZW58MXx8fHwxNzY4MDM4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'TechMaster Center',
    location: 'Innovation Hub',
    rating: 4.8,
    reviews: 892,
    speciality: 'Certified Repairs',
    popular: true,
  },
];

export function PopularCenters({ onStoreClick }) {
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
            <Award className="w-3 h-3 text-[#04a99d]" />
            <span className="text-xs font-medium text-[#04a99d]">TOP RATED</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            Explore Popular Services Centers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Most trusted and highly-rated service providers in your area
          </motion.p>
        </div>

        {/* Horizontal Scroll */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max">
              {centers.map((center, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                    {/* Popular Badge */}
                    {center.popular && (
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] shadow-lg">
                        <TrendingUp className="w-3 h-3 text-white" />
                        <span className="text-xs font-medium text-white">Most Popular</span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={center.image}
                        alt={center.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Hover Glow */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#04a99d] transition-colors">
                        {center.name}
                      </h3>
                      <p className="text-white/50 text-sm mb-3">{center.location}</p>

                      {/* Speciality Badge */}
                      <div className="inline-block px-3 py-1 rounded-lg bg-[#037166]/20 border border-[#037166]/30 mb-4">
                        <span className="text-xs font-medium text-[#04a99d]">{center.speciality}</span>
                      </div>

                      {/* Rating & CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#037166]/20">
                            <Star className="w-4 h-4 fill-[#04a99d] text-[#04a99d]" />
                            <span className="text-sm font-medium text-white">{center.rating}</span>
                          </div>
                          <span className="text-sm text-white/50">({center.reviews})</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium text-sm shadow-lg shadow-[#037166]/30 group-hover:shadow-[#037166]/50 transition-all flex items-center gap-2"
                          onClick={() => onStoreClick?.(index)}
                        >
                          View Store
                          <ArrowRight className="w-4 h-4" />
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
          </div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
