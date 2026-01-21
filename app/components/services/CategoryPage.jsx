'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  Award,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

// Default theme settings
const defaultTheme = {
  accentOpacity: 0.15,
  glowIntensity: 0.3,
  description: 'Professional repair and maintenance services by certified technicians',
  stats: [
    { label: 'Average Rating', value: '4.9', icon: Star },
    { label: 'Completed Jobs', value: '10K+', icon: CheckCircle },
    { label: 'Expert Technicians', value: '200+', icon: Award },
  ],
};

// Popular subcategories (first 3 are featured)
const featuredCount = 3;

// Skeleton Loader Component
function CategorySkeleton() {
  return (
    <div className="relative h-full p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />

      {/* Icon Skeleton */}
      <div className="w-16 h-16 rounded-xl bg-white/10 mb-6 animate-pulse" />

      {/* Text Skeletons */}
      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse" />
      </div>

      {/* Button Skeleton */}
      <div className="mt-6 flex items-center gap-2">
        <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function CategoryPage({ category, categoryId }) {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryMetadata, setCategoryMetadata] = useState({
    categoryName: category,
    totalCount: 0,
    detectedCity: null
  });

  // Use default theme settings
  const theme = defaultTheme;

  const handleSubCategoryClick = (subCategory) => {
    router.push(`/services/listing/${subCategory._id}?category=${encodeURIComponent(category)}&name=${encodeURIComponent(subCategory.name)}`);
  };

  const handleBack = () => {
    router.push('/services');
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!categoryId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/getsubcategorysbycategoryid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryId: categoryId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subcategories');
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setSubCategories(data.data);

          // Set category metadata from API response
          if (data.image) {
            setCategoryImage(data.image);
          }

          setCategoryMetadata({
            categoryName: data.categoryName || category,
            totalCount: data.totalCount || data.data.length,
            detectedCity: data.detectedCity
          });
        }
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categoryId, category]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen pt-20 bg-gradient-to-b from-[#0a0a0a] via-[#0f1614] to-[#0a0a0a]"
    >
      {/* Compact Hero Section with Breadcrumb */}
      <section className="relative py-12 overflow-hidden border-b border-white/5">
        {/* Category Image Background (if available from API) */}
        {categoryImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={`https://api.doorstephub.com/${categoryImage}`}
              alt={categoryMetadata.categoryName}
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </div>
        )}

        {/* Subtle Teal Gradient Background Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#037166] to-[#04a99d]"
          style={{ opacity: theme.accentOpacity }}
        />

        {/* Animated glow orb - category specific intensity */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [theme.glowIntensity * 0.5, theme.glowIntensity, theme.glowIntensity * 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#037166] rounded-full blur-[120px]"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Back Button + Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/10 hover:border-[#037166]/50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/50">
              <button onClick={handleBack} className="hover:text-white/80 transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/80">Services</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#037166]">{categoryMetadata.categoryName || category}</span>
            </div>
          </motion.div>

          {/* Category Header - Horizontal Layout */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {categoryMetadata.categoryName || category}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                {theme.description}
              </p>

              {/* Trust Badges - Horizontal */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  <Shield className="w-4 h-4 text-[#037166]" />
                  <span className="text-sm text-white/80">Verified Professionals</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  <Zap className="w-4 h-4 text-[#037166]" />
                  <span className="text-sm text-white/80">Same-Day Available</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  <Award className="w-4 h-4 text-[#037166]" />
                  <span className="text-sm text-white/80">90-Day Warranty</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {theme.stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:border-[#037166]/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subcategories Section - Redesigned Layout */}
      <section className="py-16 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Choose Your Service
                </h2>
                <p className="text-white/60">
                  Select the specific service type you need
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <TrendingUp className="w-4 h-4 text-[#037166]" />
                {categoryMetadata.totalCount || subCategories.length} services available
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CategorySkeleton key={i} />
              ))}
            </div>
          ) : subCategories.length === 0 ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/5 rounded-3xl border border-white/10"
            >
              <div className="text-white/40 mb-4">
                <Users className="w-12 h-12 mx-auto opacity-20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No specific services found</h3>
              <p className="text-white/50">We're expanding our services in this category. Check back soon!</p>
            </motion.div>
            :
            <>
              {/* Most Popular Subcategories - Up to featuredCount */}
              {subCategories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 fill-[#037166] text-[#037166]" />
                    <h3 className="text-lg font-semibold text-white">Most Popular</h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {subCategories.slice(0, Math.min(subCategories.length, featuredCount)).map((subCategory, index) => (
                      <motion.div
                        key={subCategory._id || `featured-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        whileHover={{ y: -8 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        onClick={() => handleSubCategoryClick(subCategory)}
                        className="group cursor-pointer relative"
                      >
                        <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border-2 border-white/10 hover:border-[#037166]/50 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                          {/* Popular Badge */}
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-xs font-semibold">
                            Popular
                          </div>

                          {/* Background glow on hover */}
                          <AnimatePresence>
                            {hoveredIndex === index && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 bg-gradient-to-br from-[#037166]/20 to-[#04a99d]/10"
                              />
                            )}
                          </AnimatePresence>

                          {/* Image Background if available (low opacity) */}
                          {subCategory.image && (
                            <div className="absolute inset-0 z-0">
                              <img
                                src={`https://api.doorstephub.com/${subCategory.image}`}
                                alt={subCategory.name}
                                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
                            </div>
                          )}

                          {/* Icon/Image */}
                          <div className="relative z-10 mb-6">
                            {subCategory.image ? (
                              <div className="w-20 h-20 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#037166]/30 border-2 border-[#037166]/30">
                                <img
                                  src={`https://api.doorstephub.com/${subCategory.image}`}
                                  alt={subCategory.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#037166] to-[#04a99d] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#037166]/30">
                                <svg
                                  className="w-10 h-10 text-white"
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
                            )}
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#04a99d] transition-colors">
                              {subCategory.name}
                            </h3>
                            <p className="text-white/60 text-sm mb-4 leading-relaxed">
                              Professional service by verified and experienced technicians
                            </p>

                            {/* Price */}


                            {/* CTA */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-[#04a99d] font-semibold text-sm">
                                View Services
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-[#037166] text-[#037166]" />
                                <span className="text-sm text-white/80">4.9</span>
                              </div>
                            </div>
                          </div>

                          {/* Hover glow border */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                            className="absolute inset-0 rounded-3xl border-2 border-[#037166] pointer-events-none"
                            style={{ boxShadow: '0 0 30px rgba(3, 113, 102, 0.5)' }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* All Other Subcategories - Compact Grid (Remaining) */}
              {subCategories.length > featuredCount && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">All Services</h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subCategories.slice(featuredCount).map((subCategory, index) => {
                      const absoluteIndex = index + featuredCount;
                      return (
                        <motion.div
                          key={subCategory._id || `regular-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                          whileHover={{ y: -4 }}
                          onHoverStart={() => setHoveredIndex(absoluteIndex)}
                          onHoverEnd={() => setHoveredIndex(null)}
                          onClick={() => handleSubCategoryClick(subCategory)}
                          className="group cursor-pointer"
                        >
                          <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/50 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                            {/* Background glow on hover */}
                            <AnimatePresence>
                              {hoveredIndex === absoluteIndex && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 bg-gradient-to-br from-[#037166]/15 to-[#04a99d]/5"
                                />
                              )}
                            </AnimatePresence>

                            {/* Image Background if available (low opacity) */}
                            {subCategory.image && (
                              <div className="absolute inset-0 z-0">
                                <img
                                  src={`https://api.doorstephub.com/${subCategory.image}`}
                                  alt={subCategory.name}
                                  className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/90 to-transparent" />
                              </div>
                            )}

                            <div className="relative z-10 flex items-start justify-between gap-4">
                              {/* Left: Icon & Content */}
                              <div className="flex-1">
                                <div className="flex items-start gap-4 mb-3">
                                  {subCategory.image ? (
                                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform border-2 border-[#037166]/30">
                                      <img
                                        src={`https://api.doorstephub.com/${subCategory.image}`}
                                        alt={subCategory.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#037166] to-[#04a99d] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                      <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <h4 className="font-bold text-white mb-1 group-hover:text-[#04a99d] transition-colors">
                                      {subCategory.name}
                                    </h4>
                                    <p className="text-xs text-white/50">Verified professionals</p>
                                  </div>
                                </div>

                                {/* Price & Rating */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-xs text-white/40">from</span>
                                    <span className="text-xl font-bold text-[#037166]">
                                      $49
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-[#037166] text-[#037166]" />
                                    <span className="text-xs text-white/60">4.8</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Arrow */}
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#037166]/20 transition-colors">
                                  <ChevronRight className="w-4 h-4 text-[#037166] group-hover:translate-x-0.5 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Bottom CTA Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 pt-8 border-t border-white/5"
              >
                <div className="bg-gradient-to-r from-[#037166]/10 to-[#04a99d]/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Need Help Choosing?
                      </h3>
                      <p className="text-white/60">
                        Our experts can recommend the best service for your needs
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#037166]/50 transition-all whitespace-nowrap">
                        Contact Support
                      </button>
                      {/* <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-semibold hover:shadow-xl hover:shadow-[#037166]/30 transition-all whitespace-nowrap">
                        View All Services
                      </button> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          }
        </div>
      </section>
    </motion.div>
  );
}
