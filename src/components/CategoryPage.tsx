'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  onSubCategoryClick: (subCategory: string) => void;
  onBack: () => void;
}

// Sub-categories data based on category
const subCategoriesData: Record<string, string[]> = {
  'Oven Repair': [
    'Microwave Oven Repair',
    'Convection Oven Repair',
    'Built-in Oven Repair',
    'Gas Oven Repair',
    'Toaster Oven Repair',
    'Commercial Oven Repair',
  ],
  'TV Repair': [
    'LED TV Repair',
    'Smart TV Repair',
    'OLED TV Repair',
    'LCD TV Repair',
    'Plasma TV Repair',
    'Projector Repair',
  ],
  'Home Cleaning & Maintenance': [
    'Deep Cleaning',
    'Regular Cleaning',
    'Move-in/Move-out Cleaning',
    'Post-Construction Cleaning',
    'Window Cleaning',
    'Carpet Cleaning',
  ],
  'Refrigerator Repair': [
    'Single Door Fridge Repair',
    'Double Door Fridge Repair',
    'Side-by-Side Fridge Repair',
    'Mini Fridge Repair',
    'Commercial Fridge Repair',
    'Ice Maker Repair',
  ],
  'Washing Machine Repair': [
    'Top Load Washer Repair',
    'Front Load Washer Repair',
    'Semi-Automatic Washer Repair',
    'Dryer Repair',
    'Washer-Dryer Combo Repair',
    'Commercial Washer Repair',
  ],
  'Computer Repair': [
    'Laptop Repair',
    'Desktop Repair',
    'Mac Repair',
    'Gaming PC Repair',
    'Data Recovery',
    'Virus Removal',
  ],
  'AC Repair': [
    'Split AC Repair',
    'Window AC Repair',
    'Central AC Repair',
    'Portable AC Repair',
    'AC Installation',
    'AC Maintenance',
  ],
  'Plumbing Service': [
    'Pipe Repair',
    'Drain Cleaning',
    'Toilet Repair',
    'Faucet Repair',
    'Water Heater Repair',
    'Emergency Plumbing',
  ],
};

export function CategoryPage({ category, onSubCategoryClick, onBack }: CategoryPageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const subCategories = subCategoriesData[category] || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section with Teal Gradient */}
      <section className="relative py-20 overflow-hidden">
        {/* FULL TEAL GRADIENT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#025a51] via-[#037166] to-[#04a99d]" />
        
        {/* Animated glow orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#05c9b8] rounded-full blur-[120px]"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </motion.button>

          {/* Category Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {category}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Choose the specific service you need for professional repairs and maintenance
            </p>
            
            {/* Animated divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 bg-white/40 mx-auto mt-8 rounded-full"
            />
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 66.7C1200 66.7 1320 53.3 1380 46.7L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#0a0a0a"/>
          </svg>
        </div>
      </section>

      {/* Sub-Categories Grid */}
      <section className="py-20 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Select Your <span className="bg-gradient-to-r from-[#037166] to-[#04a99d] bg-clip-text text-transparent">Service Type</span>
            </h2>
            <p className="text-white/60 text-lg">
              Click on a service to see available professionals and pricing
            </p>
          </motion.div>

          {/* Sub-Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subCategories.map((subCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => onSubCategoryClick(subCategory)}
                className="group cursor-pointer"
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/50 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                  {/* Background glow on hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#037166]/20 to-[#04a99d]/10"
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#037166] to-[#04a99d] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                      {subCategory}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      Professional service by verified technicians
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-[#04a99d] font-medium text-sm">
                      View Services
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover glow border */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    className="absolute inset-0 rounded-2xl border-2 border-[#037166] pointer-events-none"
                    style={{ boxShadow: '0 0 20px rgba(3, 113, 102, 0.4)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
