'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, MapPin, Clock, DollarSign, Filter, X, Zap } from 'lucide-react';

interface ServicesListingPageProps {
  category: string;
  subCategory: string;
  onBack: () => void;
  onServiceClick?: (serviceId: number) => void;
}

// Mock services data
const servicesData = [
  {
    id: 1,
    title: 'Expert Microwave Oven Repair',
    provider: 'TechFix Pro',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
    rating: 4.9,
    reviews: 245,
    price: 49,
    duration: '1-2 hours',
    distance: '0.5 mi',
    available: true,
  },
  {
    id: 2,
    title: 'Quick Microwave Fix Service',
    provider: 'HomeRepair Solutions',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    rating: 4.8,
    reviews: 189,
    price: 59,
    duration: '1 hour',
    distance: '0.8 mi',
    available: true,
  },
  {
    id: 3,
    title: 'Professional Microwave Repair',
    provider: 'QuickFix Experts',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    rating: 4.7,
    reviews: 156,
    price: 45,
    duration: '2 hours',
    distance: '1.2 mi',
    available: true,
  },
  {
    id: 4,
    title: 'Same-Day Microwave Service',
    provider: 'Express Repair Hub',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
    rating: 4.9,
    reviews: 312,
    price: 69,
    duration: '30 mins',
    distance: '0.3 mi',
    available: true,
  },
  {
    id: 5,
    title: 'Affordable Microwave Repair',
    provider: 'Budget Repairs',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    rating: 4.6,
    reviews: 98,
    price: 39,
    duration: '1.5 hours',
    distance: '1.8 mi',
    available: false,
  },
  {
    id: 6,
    title: 'Premium Microwave Service',
    provider: 'Elite Home Services',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
    rating: 4.9,
    reviews: 423,
    price: 79,
    duration: '1 hour',
    distance: '0.6 mi',
    available: true,
  },
];

const nearbyCenters = [
  {
    id: 1,
    name: 'TechFix Pro Center',
    address: '123 Tech Street, Downtown',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    rating: 4.9,
    reviews: 1250,
    distance: '0.5 mi',
    services: 15,
    openNow: true,
  },
  {
    id: 2,
    name: 'HomeRepair Solutions Hub',
    address: '456 Service Ave, Westside',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
    rating: 4.8,
    reviews: 890,
    distance: '0.8 mi',
    services: 22,
    openNow: true,
  },
  {
    id: 3,
    name: 'QuickFix Service Center',
    address: '789 Repair Blvd, Eastside',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400',
    rating: 4.7,
    reviews: 645,
    distance: '1.2 mi',
    services: 18,
    openNow: false,
  },
];

export function ServicesListingPage({ category, subCategory, onBack, onServiceClick }: ServicesListingPageProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'centers'>('services');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Sticky Header with Teal Gradient */}
      <div className="sticky top-20 z-40 bg-gradient-to-r from-[#025a51] via-[#037166] to-[#04a99d] border-b border-white/10 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {category}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {subCategory}
            </h1>
            <p className="text-white/80">{category} • Professional Services</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex gap-2 border-t border-white/10 pt-4">
            <button
              onClick={() => setActiveTab('services')}
              className="relative px-6 py-3 text-sm font-medium text-white transition-all"
            >
              All Services
              {activeTab === 'services' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('centers')}
              className="relative px-6 py-3 text-sm font-medium text-white/70 hover:text-white transition-all"
            >
              Nearby Centers
              {activeTab === 'centers' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filter - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block w-80 flex-shrink-0"
          >
            <div className="sticky top-48 p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#04a99d]" />
                Filters
              </h3>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-white/80 mb-3 text-sm font-medium">Price Range</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#037166]"
                    placeholder="Min"
                  />
                  <span className="text-white/40">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#037166]"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-white/80 mb-3 text-sm font-medium">Minimum Rating</label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        minRating === rating
                          ? 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{rating}+ Stars</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-white/80 mb-3 text-sm font-medium">Availability</label>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all text-sm">
                    <Zap className="w-4 h-4 text-[#04a99d]" />
                    Available Now
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all text-sm">
                    <Clock className="w-4 h-4 text-[#04a99d]" />
                    Same Day Service
                  </button>
                </div>
              </div>

              {/* Reset Button */}
              <button className="w-full mt-6 px-4 py-3 rounded-lg border border-white/20 text-white/80 hover:bg-white/5 transition-all text-sm font-medium">
                Reset Filters
              </button>
            </div>
          </motion.aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium shadow-2xl flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>

          {/* Main Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'services' ? (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {servicesData.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/50 transition-all duration-300">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                          
                          {/* Availability Badge */}
                          {service.available && (
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-xs font-bold flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Available Now
                            </div>
                          )}

                          {/* Price Badge */}
                          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white font-bold">
                            ${service.price}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-white/60 text-sm mb-4">{service.provider}</p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-[#04a99d] text-[#04a99d]" />
                              <span className="text-white font-medium">{service.rating}</span>
                              <span className="text-white/40">({service.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/60">
                              <Clock className="w-4 h-4" />
                              <span>{service.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/60">
                              <MapPin className="w-4 h-4" />
                              <span>{service.distance}</span>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <button
                            onClick={() => onServiceClick?.(service.id)}
                            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all"
                          >
                            Book Now
                          </button>
                        </div>

                        {/* Hover Border Glow */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 rounded-2xl border-2 border-[#037166] pointer-events-none"
                          style={{ boxShadow: '0 0 20px rgba(3, 113, 102, 0.4)' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="centers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-6"
                >
                  {nearbyCenters.map((center, index) => (
                    <motion.div
                      key={center.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/50 transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
                            <img
                              src={center.image}
                              alt={center.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/60" />
                            
                            {/* Open Badge */}
                            {center.openNow && (
                              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-xs font-bold">
                                Open Now
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                              {center.name}
                            </h3>
                            <p className="text-white/60 text-sm mb-4 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {center.address}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-[#04a99d] text-[#04a99d]" />
                                <span className="text-white font-medium">{center.rating}</span>
                                <span className="text-white/40 text-sm">({center.reviews} reviews)</span>
                              </div>
                              <div className="flex items-center gap-1 text-white/60 text-sm">
                                <MapPin className="w-4 h-4" />
                                {center.distance} away
                              </div>
                              <div className="text-white/60 text-sm">
                                {center.services} services available
                              </div>
                            </div>

                            <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all">
                              View Center
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] rounded-t-3xl border-t border-white/10 p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#04a99d]" />
                  Filters
                </h3>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Same filter content as desktop */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-3 text-sm font-medium">Price Range</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                      placeholder="Min"
                    />
                    <span className="text-white/40">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-3 text-sm font-medium">Minimum Rating</label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          minRating === rating
                            ? 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white'
                            : 'bg-white/5 text-white/70'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{rating}+ Stars</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setFilterOpen(false)}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}