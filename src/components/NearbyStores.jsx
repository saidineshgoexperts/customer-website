'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, ArrowRight, Navigation } from 'lucide-react';

const stores = [
  {
    image: 'https://images.unsplash.com/photo-1767938198097-b7d8ac22251d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlJTIwYnVzaW5lc3MlMjBzdG9yZWZyb250fGVufDF8fHx8MTc2ODAzODI0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'QuickFix Electronics',
    location: '2.3 km away',
    rating: 4.8,
    reviews: 342,
    services: 'Mobile, Laptop, TV Repair',
  },
  {
    image: 'https://images.unsplash.com/photo-1675034743372-672c3c3f8377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBhaXIlMjBzaG9wJTIwc3RvcmV8ZW58MXx8fHwxNzY4MDM4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'TechCare Solutions',
    location: '3.1 km away',
    rating: 4.9,
    reviews: 287,
    services: 'All Electronics Repair',
  },
  {
    image: 'https://images.unsplash.com/photo-1667503779301-3120a323859a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHJlcGFpciUyMGNlbnRlcnxlbnwxfHx8fDE3NjgwMzgyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Home Appliance Hub',
    location: '1.8 km away',
    rating: 4.7,
    reviews: 412,
    services: 'AC, Washing Machine, Fridge',
  },
  {
    image: 'https://images.unsplash.com/photo-1767938198097-b7d8ac22251d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlJTIwYnVzaW5lc3MlMjBzdG9yZWZyb250fGVufDF8fHx8MTc2ODAzODI0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Expert Repairs Co.',
    location: '4.2 km away',
    rating: 4.6,
    reviews: 198,
    services: 'Appliance Repair',
  },
  {
    image: 'https://images.unsplash.com/photo-1675034743372-672c3c3f8377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBhaXIlMjBzaG9wJTIwc3RvcmV8ZW58MXx8fHwxNzY4MDM4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Digital Fix Center',
    location: '2.7 km away',
    rating: 4.8,
    reviews: 256,
    services: 'Computer & Phone Repair',
  },
];

export function NearbyStores({ onStoreClick, onViewAll }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#037166]/10 border border-[#037166]/20 mb-4"
            >
              <Navigation className="w-3 h-3 text-[#04a99d]" />
              <span className="text-xs font-medium text-[#04a99d]">NEAR YOU</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-3"
            >
              Explore Nearby Stores
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60"
            >
              Find trusted service centers close to you
            </motion.p>
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max">
              {stores.map((store, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => onStoreClick?.(index)}
                >
                  <div className="relative w-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Distance Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                        <MapPin className="w-3 h-3 text-[#04a99d]" />
                        <span className="text-sm font-medium text-white">{store.location}</span>
                      </div>

                      {/* Hover Glow */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                        {store.name}
                      </h3>

                      {/* Services */}
                      <p className="text-white/50 text-sm mb-3">{store.services}</p>

                      {/* Rating & CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#037166]/20">
                            <Star className="w-4 h-4 fill-[#04a99d] text-[#04a99d]" />
                            <span className="text-sm font-medium text-white">{store.rating}</span>
                          </div>
                          <span className="text-sm text-white/50">({store.reviews})</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center shadow-lg shadow-[#037166]/30 group-hover:shadow-[#037166]/50 transition-all"
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
          </div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
