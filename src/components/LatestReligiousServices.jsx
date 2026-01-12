'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Church, Calendar, MapPin, Users, Bell } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LatestReligiousServices() {
  const services = [
    {
      name: 'Temple Prayer Service',
      location: 'Sacred Temple',
      date: 'Jan 15, 2026',
      time: '6:00 AM',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1712999533944-9200e6b20e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBzcGlyaXR1YWwlMjByZWxpZ2lvdXN8ZW58MXx8fHwxNzY4MDI2NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Morning Prayer',
    },
    {
      name: 'Spiritual Meditation',
      location: 'Meditation Center',
      date: 'Jan 16, 2026',
      time: '7:00 PM',
      attendees: 85,
      image: 'https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcGVhY2V8ZW58MXx8fHwxNzY4MDI2NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Meditation',
    },
    {
      name: 'Community Gathering',
      location: 'Divine Hall',
      date: 'Jan 18, 2026',
      time: '5:00 PM',
      attendees: 200,
      image: 'https://images.unsplash.com/photo-1741798037832-6c0c86a6262a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHByYXllcnxlbnwxfHx8fDE3NjgwMjY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Community',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Spiritual Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0a10] to-[#0a0a0a]" />
        
        {/* Divine Ambient Glow */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#037166]/15 via-[#9b59b6]/10 to-transparent rounded-full blur-3xl"
        />

        {/* Light Rays */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#037166] to-transparent"
              style={{
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: 'top center',
              }}
            />
          ))}
        </div>
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#037166]/10 via-[#9b59b6]/10 to-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <Church className="w-4 h-4 text-[#9b59b6]" />
            <span className="text-sm bg-gradient-to-r from-[#037166] via-[#9b59b6] to-[#037166] bg-clip-text text-transparent font-medium">
              Spiritual World
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[#9b59b6] to-white bg-clip-text text-transparent">
              Latest Religious Services
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with your spiritual side through sacred ceremonies and community gatherings
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              {/* Spiritual Card */}
              <div className="relative h-full bg-gradient-to-br from-[#1a1a1a]/70 to-[#1a0f1a]/70 backdrop-blur-xl border border-[#037166]/20 rounded-3xl overflow-hidden shadow-2xl">
                {/* Type Badge */}
                <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-gradient-to-r from-[#9b59b6]/80 to-[#037166]/80 backdrop-blur-md rounded-full">
                  <span className="text-xs font-bold text-white">{service.type}</span>
                </div>

                {/* Bell Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                  className="absolute top-6 right-6 z-20 w-12 h-12 bg-[#037166]/20 backdrop-blur-md border border-[#037166]/30 rounded-full flex items-center justify-center"
                >
                  <Bell className="w-6 h-6 text-[#9b59b6]" />
                </motion.div>

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Divine Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                  
                  {/* Subtle Glow Animation */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#9b59b6]/30 rounded-full blur-2xl"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#9b59b6] transition-colors">
                    {service.name}
                  </h3>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="w-4 h-4 text-[#037166]" />
                      <span className="text-gray-300">{service.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Calendar className="w-4 h-4 text-[#037166]" />
                      <span className="text-gray-300">{service.date} • {service.time}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Users className="w-4 h-4 text-[#037166]" />
                      <span className="text-gray-300">{service.attendees} attending</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#037166] via-[#9b59b6] to-[#037166] bg-[length:200%_100%] hover:bg-right rounded-xl text-white font-semibold transition-all duration-500 shadow-lg shadow-[#037166]/30"
                  >
                    Join Service
                  </motion.button>
                </div>

                {/* Divine Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-1 bg-gradient-to-r from-[#037166]/20 via-[#9b59b6]/20 to-[#037166]/20 blur-xl -z-10"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Peaceful Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-gray-400 italic text-lg"
          >
            "Find peace in every moment, strength in every prayer"
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
