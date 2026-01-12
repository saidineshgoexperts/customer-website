'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Building2, Wifi, Coffee, Shield, Bed, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PremiumPGHostels() {
  const hostels = [
    {
      name: 'Urban Nest PG',
      type: 'Premium PG',
      location: 'Downtown Area',
      price: '$450/month',
      occupancy: 'Single/Double',
      image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njc5NTMwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['High-Speed WiFi', '24/7 Security', 'Housekeeping', 'Gym Access'],
    },
    {
      name: 'Elite Stay Hostel',
      type: 'Modern Hostel',
      location: 'Tech Park',
      price: '$380/month',
      occupancy: 'Triple/Quad',
      image: 'https://images.unsplash.com/photo-1539606420556-14c457c45507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBhY2NvbW1vZGF0aW9ufGVufDF8fHx8MTc2ODAyNjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Cafeteria', 'Study Rooms', 'Laundry', 'Power Backup'],
    },
    {
      name: 'Skyline Residency',
      type: 'Luxury PG',
      location: 'Business District',
      price: '$550/month',
      occupancy: 'Single Only',
      image: 'https://images.unsplash.com/photo-1743116591552-9ff5e8c1ad31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGhvc3RlbHxlbnwxfHx8fDE3NjgwMjY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Fully Furnished', 'AC Rooms', 'Food Included', 'Recreation'],
    },
  ];

  const amenityIcons = {
    'High-Speed WiFi': Wifi,
    '24/7 Security': Shield,
    'Housekeeping': Building2,
    'Gym Access': Users,
    'Cafeteria': Coffee,
    'Study Rooms': Building2,
    'Laundry': Building2,
    'Power Backup': Building2,
    'Fully Furnished': Bed,
    'AC Rooms': Building2,
    'Food Included': Coffee,
    'Recreation': Users,
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Architectural World Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d12] to-[#0a0a0a]" />
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_48%,#037166_48%,#037166_52%,transparent_52%)] bg-[length:60px_60px]" />
        </div>

        {/* Depth Layers */}
        <motion.div
          style={{ perspective: 1000 }}
          className="absolute inset-0"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 + i * 0.02 }}
              transition={{ delay: i * 0.2 }}
              className="absolute inset-0 border-2 border-[#037166]"
              style={{
                transform: `translateZ(${i * 50}px) scale(${1 - i * 0.1})`,
              }}
            />
          ))}
        </motion.div>
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
            <Building2 className="w-4 h-4 text-[#037166]" />
            <span className="text-sm text-[#037166] font-medium">Modern Architectural World</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Premium PG & Hostels
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover your perfect home away from home with modern amenities and comfort
          </p>
        </motion.div>

        {/* Hostels Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {hostels.map((hostel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              {/* Card with Parallax Effect */}
              <motion.div
                whileHover={{ y: -15, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#037166]/30 rounded-3xl overflow-hidden shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Type Badge */}
                <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-[#037166]/80 backdrop-blur-md border border-[#037166]/50 rounded-full">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{hostel.type}</span>
                </div>

                {/* Image with Depth */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={hostel.image}
                      alt={hostel.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Architectural Grid Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(3,113,102,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(3,113,102,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#037166] transition-colors">
                    {hostel.name}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Location</span>
                      <span className="text-white font-medium">{hostel.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Occupancy</span>
                      <span className="text-white font-medium">{hostel.occupancy}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 p-4 bg-[#037166]/10 border border-[#037166]/20 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Starting from</div>
                    <div className="text-3xl font-bold text-[#037166]">{hostel.price}</div>
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {hostel.amenities.map((amenity, idx) => {
                      const Icon = amenityIcons[amenity] || Building2;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center space-x-2 p-2 bg-[#1a1a1a]/50 rounded-lg"
                        >
                          <Icon className="w-4 h-4 text-[#037166]" />
                          <span className="text-xs text-gray-300">{amenity}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-3 bg-gradient-to-r from-[#037166] to-[#025951] rounded-xl text-white font-semibold text-sm shadow-lg shadow-[#037166]/30"
                    >
                      Book Tour
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-3 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#037166]/30 rounded-xl text-white font-semibold text-sm hover:bg-[#037166]/10 transition-all"
                    >
                      Details
                    </motion.button>
                  </div>
                </div>

                {/* 3D Depth Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#037166]/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
