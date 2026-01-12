'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin, Zap } from 'lucide-react';

interface ViewAllPageProps {
  type: 'featured' | 'stores' | 'categories';
  onBack: () => void;
  onServiceClick?: (serviceId: number) => void;
  onStoreClick?: (storeId: number) => void;
  onCategoryClick?: (category: string) => void;
}

const categories = [
  { title: 'Oven Repair', image: 'https://images.unsplash.com/photo-1715591780947-2784b54e5bfa?w=400' },
  { title: 'TV Repair', image: 'https://images.unsplash.com/photo-1762329405381-fe8014d280d5?w=400' },
  { title: 'Home Cleaning', image: 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=400' },
  { title: 'Refrigerator Repair', image: 'https://images.unsplash.com/photo-1716193696093-9c54b6a290e5?w=400' },
  { title: 'Washing Machine Repair', image: 'https://images.unsplash.com/photo-1696546761269-a8f9d2b80512?w=400' },
  { title: 'Computer Repair', image: 'https://images.unsplash.com/photo-1721332154191-ba5f1534266e?w=400' },
  { title: 'AC Repair', image: 'https://images.unsplash.com/photo-1647022528152-52ed9338611d?w=400' },
  { title: 'Plumbing Service', image: 'https://images.unsplash.com/photo-1703130931611-8daf760576cf?w=400' },
];

export function ViewAllPage({
  type,
  onBack,
  onServiceClick,
  onStoreClick,
  onCategoryClick,
}: ViewAllPageProps) {
  const getTitle = () => {
    switch (type) {
      case 'featured':
        return 'All Featured Services';
      case 'stores':
        return 'All Nearby Stores';
      case 'categories':
        return 'All Categories';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-white"
    >
      {/* Header */}
      <section className="bg-gradient-to-r from-[#025a51] via-[#037166] to-[#04a99d] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold">{getTitle()}</h1>
        </div>
      </section>

      {/* Grid Content */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {type === 'categories' && categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => onCategoryClick?.(category.title)}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#04a99d] transition-colors">
                    {category.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}

          {type === 'featured' && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: id * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => onServiceClick?.(id)}
              className="group cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400"
                    alt="Service"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-xs font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Available Now
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#037166] transition-colors">
                    Expert Service {id}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">Professional service provider</p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-[#037166] text-[#037166]" />
                    <span className="text-gray-900 font-medium">4.9</span>
                    <span className="text-gray-500">(245)</span>
                  </div>
                  <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {type === 'stores' && [1, 2, 3, 4, 5, 6].map((id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: id * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => onStoreClick?.(id)}
              className="group cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
                    alt="Store"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#037166] transition-colors">
                    Service Center {id}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    123 Main Street, City
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-[#037166] text-[#037166]" />
                    <span className="text-gray-900 font-medium">4.8</span>
                    <span className="text-gray-500">(890 reviews)</span>
                  </div>
                  <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all">
                    View Center
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
