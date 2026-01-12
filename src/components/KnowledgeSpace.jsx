'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

const articles = [
  {
    image: 'https://images.unsplash.com/photo-1758523670768-db86402d5faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVwYWlyJTIwdGlwcyUyMGJsb2d8ZW58MXx8fHwxNzY4MDM4MzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: '10 Signs Your Appliance Needs Immediate Repair',
    excerpt: 'Learn the warning signs that indicate your home appliances need professional attention before they break down completely.',
    readTime: '5 min read',
    category: 'Maintenance Tips',
  },
  {
    image: 'https://images.unsplash.com/photo-1574801439983-71705fb11bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsaWFuY2UlMjBtYWludGVuYW5jZSUyMGd1aWRlfGVufDF8fHx8MTc2ODAzODMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Essential Maintenance Guide for Home Appliances',
    excerpt: 'Keep your appliances running smoothly with our comprehensive maintenance schedule and care tips for every device.',
    readTime: '7 min read',
    category: 'How-To Guide',
  },
  {
    image: 'https://images.unsplash.com/photo-1648091856908-8f830ab0c5b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXklMjBob21lJTIwaW1wcm92ZW1lbnR8ZW58MXx8fHwxNzY4MDM4MzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'DIY vs Professional Repair: Making the Right Choice',
    excerpt: 'Discover when you can handle repairs yourself and when it\'s time to call in the professionals for optimal results.',
    readTime: '6 min read',
    category: 'Expert Advice',
  },
  {
    image: 'https://images.unsplash.com/photo-1758523670768-db86402d5faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVwYWlyJTIwdGlwcyUyMGJsb2d8ZW58MXx8fHwxNzY4MDM4MzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Save Money: Extend Your Appliance Lifespan',
    excerpt: 'Simple tips and tricks to maximize the longevity of your home appliances and save thousands in replacement costs.',
    readTime: '4 min read',
    category: 'Money Saving',
  },
];

export function KnowledgeSpace() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#037166] rounded-full blur-[150px]"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#037166]/10 border border-[#037166]/20 mb-4"
          >
            <BookOpen className="w-3 h-3 text-[#04a99d]" />
            <span className="text-xs font-medium text-[#04a99d]">LEARN & EXPLORE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Knowledge Space
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Expert tips and guides to help you maintain your home
          </motion.p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, rotateZ: index % 2 === 0 ? 1 : -1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="text-xs font-medium text-[#04a99d]">{article.category}</span>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
                  />

                  {/* Sketch Line Accent */}
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileHover={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                    viewBox="0 0 300 60"
                  >
                    <motion.path
                      d="M0,30 Q75,10 150,30 T300,30"
                      stroke="#04a99d"
                      strokeWidth="2"
                      fill="none"
                    />
                  </motion.svg>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#04a99d] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Read Time & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/50">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{article.readTime}</span>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-1 text-[#04a99d] font-medium text-sm"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Glass Border on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl border-2 border-[#037166]/50 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#037166]/50 text-white font-medium transition-all duration-300 flex items-center gap-2 group"
          >
            Explore All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
