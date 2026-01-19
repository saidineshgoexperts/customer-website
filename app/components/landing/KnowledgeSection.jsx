'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export function KnowledgeSection() {
  const articles = [
    {
      title: 'The Ultimate Guide to Spa Treatments',
      category: 'Wellness',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1582498674105-ad104fcc5784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY3OTU0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      trending: true,
    },
    {
      title: 'Finding Your Perfect PG Accommodation',
      category: 'Housing',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njc5NTMwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      trending: false,
    },
    {
      title: 'Spiritual Practices for Modern Living',
      category: 'Spirituality',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcGVhY2V8ZW58MXx8fHwxNzY4MDI2NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      trending: true,
    },
    {
      title: 'Top 10 Service Centers Near You',
      category: 'Services',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1539606420556-14c457c45507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBhY2NvbW1vZGF0aW9ufGVufDF8fHx8MTc2ODAyNjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      trending: false,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Creative Studio Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0f0d] to-[#0a0a0a]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(3,113,102,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(3,113,102,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-[#037166]" />
            <span className="text-sm text-[#037166] font-medium">Creative Studio Cards</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore insights, tips, and stories from our community of service providers and users
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              {/* Studio Card */}
              <motion.div
                whileHover={{ y: -10 }}
                className="relative h-full bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-xl border border-[#037166]/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#037166]/20 transition-all duration-300"
              >
                {/* Trending Badge */}
                {article.trending && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-[#037166] to-[#02b39a] rounded-full flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white">Trending</span>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#037166]/80 backdrop-blur-md rounded-full">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 leading-snug group-hover:text-[#037166] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4 text-[#037166]" />
                      <span>{article.readTime}</span>
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-[#037166] font-medium text-sm flex items-center space-x-1 group/btn"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#037166]/0 via-[#037166]/20 to-[#037166]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#037166] to-[#025951] rounded-full text-white font-semibold shadow-xl shadow-[#037166]/40 hover:shadow-2xl hover:shadow-[#037166]/50 transition-all inline-flex items-center space-x-2"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto p-8 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/90 to-[#1a1a1a]/80 backdrop-blur-xl border-2 border-[#037166]/30 rounded-3xl"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400">Get the latest articles and exclusive insights delivered to your inbox</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-[#0a0a0a]/80 border border-[#037166]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#037166] transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-[#037166] to-[#025951] rounded-xl text-white font-semibold shadow-lg shadow-[#037166]/40 hover:shadow-xl hover:shadow-[#037166]/50 transition-all whitespace-nowrap"
            >
              Subscribe Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
