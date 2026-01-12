'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Clock, Shield, CheckCircle, Award, ThumbsUp, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { CartItem } from '@/app/page';

interface ServiceDetailsPageProps {
  serviceId: number;
  category: string;
  subCategory: string;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onGoToCart: () => void;
}

// Service-specific accent colors
const serviceAccents: Record<string, string> = {
  'Oven Repair': '#5a8b9d', // muted teal/steel blue
  'TV Repair': '#5a8b9d',
  'Home Cleaning & Maintenance': '#52c4b8', // soft mint
  'Refrigerator Repair': '#5a8b9d',
  'Washing Machine Repair': '#5a8b9d',
  'Computer Repair': '#5a8b9d',
  'AC Repair': '#5a8b9d',
  'Plumbing Service': '#8b8a5a', // warm amber-teal
};

// Mock service data
const serviceData = {
  1: {
    title: 'Expert Microwave Oven Repair',
    provider: 'TechFix Pro',
    rating: 4.9,
    reviews: 245,
    description: 'Professional microwave oven repair service with certified technicians. We handle all major brands and models with guaranteed satisfaction.',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    ],
  },
};

const rateCards = [
  {
    id: 'basic',
    title: 'Basic Repair',
    price: 49,
    duration: '1-2 hours',
    features: [
      'Diagnostic check',
      'Basic repairs',
      '30-day warranty',
      'Standard parts included',
    ],
  },
  {
    id: 'standard',
    title: 'Standard Service',
    price: 69,
    duration: '1-1.5 hours',
    features: [
      'Full diagnostic',
      'Complete repair',
      '90-day warranty',
      'Premium parts included',
      'Deep cleaning',
    ],
    popular: true,
  },
  {
    id: 'premium',
    title: 'Premium Package',
    price: 99,
    duration: '2-3 hours',
    features: [
      'Complete diagnostic',
      'Full repair & maintenance',
      '1-year warranty',
      'Premium parts & accessories',
      'Deep cleaning & sanitization',
      'Performance optimization',
    ],
  },
];

const relatedServices = [
  {
    id: 101,
    title: 'Oven Deep Cleaning',
    price: 29,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
  },
  {
    id: 102,
    title: 'Appliance Maintenance',
    price: 39,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
  },
  {
    id: 103,
    title: 'Extended Warranty',
    price: 49,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
  },
];

export function ServiceDetailsPage({ 
  serviceId, 
  category, 
  subCategory, 
  onBack, 
  onAddToCart,
  onGoToCart 
}: ServiceDetailsPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const accentColor = serviceAccents[category] || '#5a8b9d';
  
  const service = serviceData[serviceId as keyof typeof serviceData] || serviceData[1];

  const handleSelectCard = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleAddSelectedToCart = () => {
    if (selectedCards.length === 0) {
      toast.error('Please select at least one package');
      return;
    }

    selectedCards.forEach(cardId => {
      const card = rateCards.find(c => c.id === cardId);
      if (card) {
        onAddToCart({
          id: `${serviceId}-${card.id}`,
          serviceId,
          serviceName: service.title,
          packageName: card.title,
          price: card.price,
          duration: card.duration,
          quantity: 1,
          category,
          subCategory,
        });
      }
    });

    toast.success(`${selectedCards.length} package(s) added to cart!`);
    setSelectedCards([]);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section with Service Accent Color */}
      <section className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, #025a51 0%, ${accentColor} 50%, #037166 100%)`,
          }}
        />
        
        {/* Animated glow orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: accentColor }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </motion.button>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-sm mb-6"
          >
            {category} → {subCategory} → {service.title}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
                <div className="relative h-96">
                  <img
                    src={service.images[currentImageIndex]}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 p-4">
                  {service.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                        currentImageIndex === idx 
                          ? 'ring-2 ring-[#037166] scale-105' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Service Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-white/80 text-lg mb-4">{service.provider}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#04a99d] text-[#04a99d]" />
                  <span className="text-white font-medium text-lg">{service.rating}</span>
                  <span className="text-white/60">({service.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Service Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: 'Certified Technicians' },
                  { icon: Clock, text: 'Same-Day Service' },
                  { icon: ThumbsUp, text: 'Satisfaction Guaranteed' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}40` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    <span className="text-white/90 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rate Cards Section */}
      <section className="py-20 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your <span className="bg-gradient-to-r from-[#037166] to-[#04a99d] bg-clip-text text-transparent">Package</span>
            </h2>
            <p className="text-white/60 text-lg">
              Select one or multiple packages to add to your cart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {rateCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleSelectCard(card.id)}
                className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 ${
                  selectedCards.includes(card.id)
                    ? 'bg-gradient-to-br from-[#037166]/20 to-[#04a99d]/10 border-2 border-[#037166]'
                    : 'bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular Badge */}
                {card.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}

                {/* Selected Check */}
                <AnimatePresence>
                  {selectedCards.includes(card.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">${card.price}</span>
                  <span className="text-white/60">/ service</span>
                </div>
                <p className="text-white/60 text-sm mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {card.duration}
                </p>

                <div className="space-y-3">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#04a99d] flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add to Cart Button */}
          {selectedCards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={handleAddSelectedToCart}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium text-lg hover:shadow-lg hover:shadow-[#037166]/30 transition-all"
              >
                Add {selectedCards.length} Package{selectedCards.length > 1 ? 's' : ''} to Cart
              </button>
              <button
                onClick={onGoToCart}
                className="px-8 py-4 rounded-xl border-2 border-[#037166] text-white font-medium text-lg hover:bg-[#037166]/10 transition-all"
              >
                View Cart
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0f1614]/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-8"
          >
            You Might Also Need
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((related, index) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/50 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                      {related.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">${related.price}</span>
                      <button
                        onClick={() => {
                          onAddToCart({
                            id: `related-${related.id}`,
                            serviceId: related.id,
                            serviceName: related.title,
                            packageName: 'Add-on Service',
                            price: related.price,
                            duration: '1 hour',
                            quantity: 1,
                            category,
                            subCategory,
                          });
                          toast.success(`${related.title} added to cart!`);
                        }}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
