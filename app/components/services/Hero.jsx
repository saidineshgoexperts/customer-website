'use client';

import React from 'react';
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
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1614] to-[#0a0a0a]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#037166] rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-15" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-[#037166]/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#04a99d]" />
            <span className="text-sm text-white/80">Trusted by 50,000+ customers</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Expert Home Services
            <br />
            <span className="bg-gradient-to-r from-[#037166] via-[#04a99d] to-[#037166] bg-clip-text text-transparent">
              At Your Doorstep
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
            Professional repair and maintenance services for all your home needs.
            Book verified experts in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onBookService}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#037166]/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book a Service Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#04a99d] to-[#037166] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={onViewServices}
              className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-[#037166]/50 transition-all"
            >
              Explore Services
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Shield, label: 'Licensed Professionals', desc: 'All verified & insured' },
              { icon: Clock, label: 'Same Day Service', desc: 'Book in 60 seconds' },
              { icon: Sparkles, label: '90-Day Warranty', desc: 'On all services' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#037166]/50 transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white mb-1">{item.label}</div>
                  <div className="text-sm text-white/60">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Preview Cards */}
        <div className="mt-20">
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {services.map((service, i) => (
                <div key={service.title} className="flex-shrink-0">
                  <ServicePreviewCard service={service} index={i} />
                </div>
              ))}
            </div>

            {/* Fade gradient on sides */}
            <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
