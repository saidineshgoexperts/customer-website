'use client';

import React from 'react';
import { motion } from 'motion/react';

export function ServicePreviewCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      <div className="w-48 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
        <div className="relative h-full">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Hover Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
          />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-medium text-white text-center group-hover:text-[#04a99d] transition-colors">
              {service.title}
            </h3>
          </div>

          {/* Glass Effect Border on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl border-2 border-[#037166]/50 pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
}
