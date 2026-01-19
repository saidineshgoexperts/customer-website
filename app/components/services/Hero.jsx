'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { ServicePreviewCard } from '@/components/services/ServicePreviewCard';

const services = [
  { image: 'https://images.unsplash.com/photo-1715591780947-2784b54e5bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVuJTIwcmVwYWlyJTIwdGVjaG5pY2lhbnxlbnwxfHx8fDE3NjgwMzgwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Oven Repair' },
  { image: 'https://images.unsplash.com/photo-1762329405381-fe8014d280d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwcmVwYWlyfGVufDF8fHx8MTc2ODAzODA1N3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'TV Repair' },
  { image: 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc2Nzk3ODg1Nnww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Home Cleaning' },
  { image: 'https://images.unsplash.com/photo-1716193696093-9c54b6a290e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyaWdlcmF0b3IlMjByZXBhaXJ8ZW58MXx8fHwxNzY4MDM4MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Refrigerator Repair' },
  { image: 'https://images.unsplash.com/photo-1696546761269-a8f9d2b80512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMHJlcGFpcnxlbnwxfHx8fDE3Njc5OTYyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Washing Machine' },
  { image: 'https://images.unsplash.com/photo-1721332154191-ba5f1534266e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhcHRvcCUyMHJlcGFpcnxlbnwxfHx8fDE3NjgwMzgwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Computer Repair' },
  { image: 'https://images.unsplash.com/photo-1746005718004-1f992c399428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwcmVwYWlyJTIwdGVjaG5pY2lhbnxlbnwxfHx8fDE3NjgwMzgwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Mobile Repair' },
];

export function Hero({ onViewServices, onBookService }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1614] to-[#0a0a0a]" />

      {/* Particles Effect */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#037166] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#037166] rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"
      />

      <motion.div style={{ y }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-[#04a99d]" />
            <span className="text-sm text-white/80">Trusted by 10,000+ customers</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Broken Appliance?
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#037166] via-[#04a99d] to-[#05bfb0] bg-clip-text text-transparent">
              We'll Fix It Today.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Expert technicians, instant booking, and guaranteed fixes.
            From appliances to electronics—book any service in minutes.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-white/70">
              <Shield className="w-5 h-5 text-[#04a99d]" />
              <span className="text-sm">Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-5 h-5 text-[#04a99d]" />
              <span className="text-sm">Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-5 h-5 text-[#04a99d]" />
              <span className="text-sm">90-Day Warranty</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(3, 113, 102, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium text-lg shadow-xl shadow-[#037166]/30 hover:shadow-[#037166]/50 transition-all duration-300 flex items-center gap-2"
              onClick={onViewServices}
            >
              View Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-white/20 hover:border-[#037166]/50 text-white font-medium text-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
              onClick={onBookService}
            >
              Book a Service Now
            </motion.button>
          </motion.div>

          {/* Service Preview Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative"
          >
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-4 min-w-max px-4">
                {services.map((service, index) => (
                  <ServicePreviewCard key={index} service={service} index={index} />
                ))}
              </div>
            </div>

            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
