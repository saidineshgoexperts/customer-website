'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Download, Star, Shield, Zap, Apple } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export function AppDownload() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a1412] to-[#0a0a0a]" />

        {/* Animated Waves */}
        <svg className="absolute bottom-0 w-full h-64 opacity-10">
          <motion.path
            d="M0,160 Q400,100 800,160 T1600,160 L1600,256 L0,256 Z"
            fill="url(#wave-gradient)"
            initial={{ d: "M0,160 Q400,100 800,160 T1600,160 L1600,256 L0,256 Z" }}
            animate={{ d: "M0,140 Q400,180 800,140 T1600,140 L1600,256 L0,256 Z" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#037166" />
              <stop offset="100%" stopColor="#02b39a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#037166]/10 border border-[#037166]/30 rounded-full mb-8">
              <Download className="w-4 h-4 text-[#037166]" />
              <span className="text-sm text-[#037166] font-medium">Download Our App</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Everything in </span>
              <span className="bg-gradient-to-r from-[#037166] to-[#02b39a] bg-clip-text text-transparent">
                Your Pocket
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Access all services, book appointments, track orders, and manage your spiritual journey—all from one powerful app.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Zap, text: 'Lightning-fast booking' },
                { icon: Shield, text: 'Secure & private' },
                { icon: Star, text: 'Exclusive app-only deals' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#037166]/20 to-[#025951]/20 border border-[#037166]/30 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#037166]" />
                  </div>
                  <span className="text-lg text-white">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#037166] to-[#025951] rounded-2xl text-white font-semibold shadow-xl shadow-[#037166]/40 hover:shadow-2xl hover:shadow-[#037166]/50 transition-all"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-base font-bold">App Store</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-[#1a1a1a]/80 backdrop-blur-sm border-2 border-[#037166]/30 rounded-2xl text-white font-semibold hover:bg-[#037166]/10 transition-all"
              >
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-base font-bold">Google Play</div>
                </div>
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-8 mt-10 pt-10 border-t border-[#037166]/20"
            >
              <div>
                <div className="text-3xl font-bold text-[#037166] mb-1">4.8★</div>
                <div className="text-sm text-gray-400">App Rating</div>
              </div>
              <div className="h-12 w-px bg-[#037166]/20" />
              <div>
                <div className="text-3xl font-bold text-[#037166] mb-1">50K+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="h-12 w-px bg-[#037166]/20" />
              <div>
                <div className="text-3xl font-bold text-[#037166] mb-1">10K+</div>
                <div className="text-sm text-gray-400">Reviews</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Floating Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[700px] hidden lg:block"
          >
            {/* Main Phone */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="relative w-72 h-[580px] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-[3rem] border-8 border-[#2a2a2a] shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#0a0a0a] rounded-b-3xl z-20" />

                {/* Screen */}
                <div className="relative w-full h-full bg-white flex items-center justify-center p-8">
                  <ImageWithFallback
                    src="/d-hub-logo.png"
                    alt="Doorstep Hub App"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screen Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#037166]/30 to-[#02b39a]/30 blur-2xl -z-10" />
              </div>
            </motion.div>

            {/* Secondary Phone (Behind) */}
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-28 left-1/2 -translate-x-1/2 opacity-40 scale-90 -rotate-12"
            >
              <div className="w-72 h-[580px] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-[3rem] border-8 border-[#2a2a2a] shadow-2xl" />
            </motion.div>

            {/* Floating Icons */}
            {[
              { Icon: Download, position: { top: '10%', left: '10%' } },
              { Icon: Star, position: { top: '20%', right: '10%' } },
              { Icon: Shield, position: { bottom: '20%', left: '15%' } },
              { Icon: Zap, position: { bottom: '15%', right: '15%' } },
            ].map(({ Icon, position }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  y: { duration: 2 + index, repeat: Infinity },
                  rotate: { duration: 3 + index, repeat: Infinity },
                }}
                className="absolute"
                style={position}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#037166]/30 to-[#025951]/30 backdrop-blur-md border border-[#037166]/40 rounded-2xl flex items-center justify-center shadow-lg shadow-[#037166]/20">
                  <Icon className="w-8 h-8 text-[#037166]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
