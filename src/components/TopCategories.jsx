'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight } from 'lucide-react';

// Fallback categories if API fails
const fallbackCategories = [
  {
    title: 'Oven Repair',
    image: 'https://images.unsplash.com/photo-1715591780947-2784b54e5bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVuJTIwcmVwYWlyJTIwdGVjaG5pY2lhbnxlbnwxfHx8fDE3NjgwMzgwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'TV Repair',
    image: 'https://images.unsplash.com/photo-1762329405381-fe8014d280d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwcmVwYWlyfGVufDF8fHx8MTc2ODAzODA1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Home Cleaning & Maintenance',
    image: 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc2Nzk3ODg1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Refrigerator Repair',
    image: 'https://images.unsplash.com/photo-1716193696093-9c54b6a290e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyaWdlcmF0b3IlMjByZXBhaXJ8ZW58MXx8fHwxNzY4MDM4MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Washing Machine Repair',
    image: 'https://images.unsplash.com/photo-1696546761269-a8f9d2b80512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMHJlcGFpcnxlbnwxfHx8fDE3Njc5OTYyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Computer Repair',
    image: 'https://images.unsplash.com/photo-1721332154191-ba5f1534266e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhcHRvcCUyMHJlcGFpcnxlbnwxfHx8fDE3NjgwMzgwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'AC Repair',
    image: 'https://images.unsplash.com/photo-1647022528152-52ed9338611d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25lciUyMHJlcGFpcnxlbnwxfHx8fDE3NjgwMzgxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Plumbing Service',
    image: 'https://images.unsplash.com/photo-1703130931611-8daf760576cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzY4MDM4MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function TopCategories({ onCategoryClick, onViewAll }) {
  const [categories, setCategories] = useState(fallbackCategories);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Get user's geolocation
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              // Fetch categories from API
              const response = await fetch(
                'https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/getallcategorys',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    lattitude: latitude.toString(),
                    longitude: longitude.toString(),
                  }),
                }
              );

              if (!response.ok) {
                throw new Error('Failed to fetch categories');
              }

              const result = await response.json();

              if (result.success && result.data && result.data.length > 0) {
                // Map API data to component format
                const mappedCategories = result.data.map((item) => ({
                  title: item.name,
                  image: `https://api.doorstephub.com/${item.image}`,
                  _id: item._id,
                  status: item.status,
                }));

                setCategories(mappedCategories);
              }

              setIsLoading(false);
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Use default Hyderabad coordinates if geolocation fails
              fetchWithDefaultLocation();
            }
          );
        } else {
          // Geolocation not supported, use default location
          fetchWithDefaultLocation();
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    };

    const fetchWithDefaultLocation = async () => {
      try {
        // Default to Hyderabad coordinates
        const response = await fetch(
          'https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/getallcategorys',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lattitude: '17.4391296',
              longitude: '78.4433152',
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          const mappedCategories = result.data.map((item) => ({
            title: item.name,
            image: `https://api.doorstephub.com/${item.image}`,
            _id: item._id,
            status: item.status,
          }));

          setCategories(mappedCategories);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching with default location:', error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#037166]/10 border border-[#037166]/20 mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-[#04a99d] animate-pulse" />
              <span className="text-xs font-medium text-[#04a99d]">POPULAR</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-3"
            >
              Explore Top Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60"
            >
              Browse our most requested services
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#037166]/50 transition-all duration-300 group"
            onClick={onViewAll}
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -12 }}
                  onClick={() => onCategoryClick?.(category.title)}
                  className="group cursor-pointer"
                >
                  <div className="relative w-72 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#037166]/40 via-[#037166]/10 to-transparent"
                    />

                    {/* Glass Card Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                          {category.title}
                        </h3>
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: '60px' }}
                          className="h-1 bg-gradient-to-r from-[#037166] to-[#04a99d] rounded-full"
                        />
                      </div>
                    </div>

                    {/* Glassmorphism Border on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 rounded-3xl border-2 border-[#037166]/50 pointer-events-none"
                      style={{ boxShadow: '0 0 20px rgba(3, 113, 102, 0.3)' }}
                    />

                    {/* Floating Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5 text-[#04a99d]" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
