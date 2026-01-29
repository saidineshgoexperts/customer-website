'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Star, Clock, Heart, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function RecommendedReligious() {
  const journeys = [
    {
      title: 'Sacred Temple Tour',
      description: 'A guided spiritual journey through ancient temples',
      duration: '4 hours',
      difficulty: 'Easy',
      rating: 4.9,
      participants: 45,
      image: 'https://images.unsplash.com/photo-1741798037832-6c0c86a6262a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHByYXllcnxlbnwxfHx8fDE3NjgwMjY3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      highlights: ['Expert Guide', 'Prayer Session', 'Cultural Insights'],
    },
    {
      title: 'Meditation Retreat',
      description: 'Deep meditation and spiritual awakening experience',
      duration: '2 days',
      difficulty: 'Moderate',
      rating: 5.0,
      participants: 30,
      image: 'https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsJTIwcGVhY2V8ZW58MXx8fHwxNzY4MDI2NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      highlights: ['Silent Meditation', 'Yoga Sessions', 'Organic Meals'],
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Guided Journey Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0d12] to-[#0a0a0a]" />

        {/* Path Animation */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#037166" />
              <stop offset="100%" stopColor="#9b59b6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 300 Q 400 100, 800 300 T 1600 300"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3 }}
          />
        </svg>

        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 bg-[#037166] rounded-full blur-sm"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#037166]/10 via-[#9b59b6]/10 to-[#037166]/10 border border-[#037166]/30 rounded-full mb-6">
            <Compass className="w-4 h-4 text-[#9b59b6]" />
            <span className="text-sm bg-gradient-to-r from-[#037166] via-[#9b59b6] to-[#037166] bg-clip-text text-transparent font-medium">
              Guided Spiritual Journey
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[#9b59b6] to-white bg-clip-text text-transparent">
              Recommended Religious Journeys
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Embark on transformative spiritual experiences curated for seekers of all paths
          </p>
        </motion.div>

        {/* Journey Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {journeys.map((journey, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group"
            >
              {/* Journey Card */}
              <div className="relative h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f1a] border-2 border-[#037166]/30 rounded-3xl overflow-hidden shadow-2xl">
                {/* Image with Compass Overlay */}
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={journey.image}
                    alt={journey.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

                  {/* Compass Icon */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
                  >
                    <Compass className="w-32 h-32 text-[#037166]" />
                  </motion.div>

                  {/* Rating Badge */}
                  <div className="absolute top-6 right-6 px-4 py-2 bg-[#037166]/90 backdrop-blur-md rounded-full flex items-center space-x-2">
                    <Star className="w-4 h-4 text-white fill-white" />
                    <span className="text-sm font-bold text-white">{journey.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#9b59b6] transition-colors">
                      {journey.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{journey.description}</p>
                  </div>

                  {/* Journey Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-[#037166]/10 border border-[#037166]/20 rounded-xl">
                      <Clock className="w-5 h-5 text-[#037166] mb-2" />
                      <div className="text-xs text-gray-400 mb-1">Duration</div>
                      <div className="text-sm font-semibold text-white">{journey.duration}</div>
                    </div>
                    <div className="p-4 bg-[#037166]/10 border border-[#037166]/20 rounded-xl">
                      <Heart className="w-5 h-5 text-[#037166] mb-2" />
                      <div className="text-xs text-gray-400 mb-1">Difficulty</div>
                      <div className="text-sm font-semibold text-white">{journey.difficulty}</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <BookOpen className="w-4 h-4 text-[#9b59b6]" />
                      <span className="text-sm font-semibold text-white">Journey Highlights</span>
                    </div>
                    <div className="grid gap-2">
                      {journey.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#037166] to-[#9b59b6] rounded-full" />
                          <span className="text-sm text-gray-300">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Participants & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-gradient-to-br from-[#037166] to-[#9b59b6] rounded-full border-2 border-[#1a1a1a]"
                          />
                        ))}
                      </div>
                      <span>{journey.participants}+ joined</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-[#037166] via-[#9b59b6] to-[#037166] bg-[length:200%_100%] hover:bg-right rounded-xl text-white font-semibold transition-all duration-500 shadow-lg shadow-[#037166]/40"
                    >
                      Begin Journey
                    </motion.button>
                  </div>
                </div>

                {/* Spiritual Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#037166]/20 via-[#9b59b6]/20 to-[#037166]/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-[#1a1a1a]/60 via-[#1a1a1a]/80 to-[#1a1a1a]/60 backdrop-blur-xl border border-[#037166]/20 rounded-3xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 mx-auto mb-4 opacity-30"
          >
            <Compass className="w-full h-full text-[#9b59b6]" />
          </motion.div>
          <p className="text-xl text-gray-300 italic leading-relaxed mb-2">
            "The journey of a thousand miles begins with a single step"
          </p>
          <p className="text-sm text-[#037166]">- Ancient Wisdom</p>
        </motion.div>
      </div>
    </section>
  );
}
