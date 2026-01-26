'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, Clock, Shield, CheckCircle, Award, ThumbsUp, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

// Service-specific accent colors
const serviceAccents = {
  'Oven Repair': '#5a8b9d', // muted teal/steel blue
  'TV Repair': '#5a8b9d',
  'Home Cleaning & Maintenance': '#52c4b8', // soft mint
  'Refrigerator Repair': '#5a8b9d',
  'Washing Machine Repair': '#5a8b9d',
  'Computer Repair': '#5a8b9d',
  'AC Repair': '#5a8b9d',
  'Plumbing Service': '#8b8a5a', // warm amber-teal
};

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
  subCategory
}) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('services');
  const [visibleReviews, setVisibleReviews] = useState(4);
  const accentColor = serviceAccents[category] || '#5a8b9d';

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceId) return;
      setLoading(true);
      try {
        const response = await fetch(`https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/dhub_service_details/${serviceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch details');

        const data = await response.json();
        if (data.success) {
          setServiceDetails(data);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        toast.error("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading service details...</div>
      </div>
    );
  }

  if (!serviceDetails?.storeData) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
        <button onClick={() => router.back()} className="px-6 py-2 bg-white/10 rounded-full">Go Back</button>
      </div>
    );
  }

  const { storeData, provider_rate_cards = [], serviceImages = [], customerRatings = [] } = serviceDetails;

  // Prepare images list (banner + service images)
  // FIXED CODE:
  const images = [
    storeData.bannerImage ? `https://api.doorstephub.com/${storeData.bannerImage}` : 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
    ...serviceImages.map(img => `https://api.doorstephub.com/${img}`)
  ].filter(Boolean); // Remove any null/undefined images

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
            onClick={() => {
              // Get subCategoryId from serviceDetails or use a fallback
              const subCatId = serviceDetails?.storeData?.subCategoryId;
              if (subCatId && category && subCategory) {
                router.push(`/services/listing/${subCatId}?category=${encodeURIComponent(category)}&name=${encodeURIComponent(subCategory)}`);
              } else {
                window.history.back();
              }
            }}
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
            {category} → {subCategory} → {storeData.name}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
                <div className="relative h-64">
                  <img
                    src={images[currentImageIndex]}
                    alt={storeData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
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
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all flex-shrink-0 ${currentImageIndex === idx
                          ? 'ring-2 ring-[#037166] scale-105'
                          : 'opacity-60 hover:opacity-100'
                          }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Service Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                {storeData.name}
              </h1>
              <p className="text-white/80 text-lg mb-4">Professional Service</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#04a99d] text-[#04a99d]" />
                  <span className="text-white font-medium text-lg">{storeData.avgRating}</span>
                  <span className="text-white/60">({storeData.totalRatings} ratings)</span>
                </div>
                <div className="text-white/60">
                  {storeData.totalOrders}+ Orders
                </div>
              </div>

              <p className="text-white/80 text-lg mb-6 leading-relaxed whitespace-pre-line">
                {storeData.description}
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

              {/* Booking Button in Hero */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  const finalServiceId = storeData.id || storeData._id || serviceId;
                  if (!finalServiceId) {
                    toast.error("Service information missing");
                    return;
                  }

                  localStorage.setItem('last_service_id', finalServiceId);
                  const firstPackage = provider_rate_cards[0];

                  // Clean the price string (remove + and non-numeric chars)
                  const rawPrice = firstPackage?.price || 0;
                  const cleanPrice = typeof rawPrice === 'string'
                    ? parseInt(rawPrice.replace(/[^0-9]/g, '')) || 0
                    : rawPrice;

                  // Enrich the item with service details for the confirmation page
                  const itemsToBook = [{
                    ...(firstPackage || {}),
                    id: firstPackage?.id || `direct-${finalServiceId}`,
                    serviceId: finalServiceId,
                    serviceName: storeData.name || 'Professional Service',
                    packageName: firstPackage?.title || 'Standard Package',
                    price: cleanPrice,
                    bookingCost: storeData.serviceBookingCost || 0,
                    inspectionCost: storeData.inspectionCost || 0,
                    quantity: 1
                  }];

                  localStorage.setItem('booking_package_details', JSON.stringify(itemsToBook));
                  router.push('/services/address');
                }}
                className="w-full mt-6 px-10 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#037166]/40 transition-all flex items-center justify-center gap-3 group"
              >
                Book This Service Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-12 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-8 py-3 font-semibold transition-all relative ${activeTab === 'services'
                ? 'text-white bg-[#037166]'
                : 'text-white/60 hover:text-white bg-white/5'
                }`}
              style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-8 py-3 font-semibold transition-all relative ${activeTab === 'portfolio'
                ? 'text-white bg-[#037166]'
                : 'text-white/60 hover:text-white bg-white/5'
                }`}
              style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-3 font-semibold transition-all relative ${activeTab === 'reviews'
                ? 'text-white bg-[#037166]'
                : 'text-white/60 hover:text-white bg-white/5'
                }`}
              style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Services Tab */}
            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Services</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {provider_rate_cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#037166]/50 transition-all"
                    >
                      <span className="text-white font-medium">{card.title}</span>
                      <span className="text-[#04a99d] font-bold text-xl">₹{card.price}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Portfolio</h3>
                {serviceImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {serviceImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                      >
                        <img
                          src={`https://api.doorstephub.com/${img}`}
                          alt={`Portfolio ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/60">
                    No portfolio images available
                  </div>
                )}
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Reviews</h3>
                {customerRatings.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {customerRatings.slice(0, visibleReviews).map((review, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#037166] flex items-center justify-center font-bold text-white flex-shrink-0">
                            {review.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-bold">{review.name}</h4>
                              <span className="text-white/40 text-sm">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating
                                    ? 'fill-[#fbbf24] text-[#fbbf24]'
                                    : 'text-white/20'
                                    }`}
                                />
                              ))}
                            </div>
                            <p className="text-white/80 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {customerRatings.length > visibleReviews && (
                      <div className="flex justify-center mt-6">

                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/60">
                    No reviews available yet
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Booking Button Below Tabs */}
          {/* <div className="flex justify-center mt-8">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                const finalServiceId = storeData.id || storeData._id || serviceId;
                if (!finalServiceId) {
                  toast.error("Service information missing");
                  return;
                }

                localStorage.setItem('last_service_id', finalServiceId);
                const firstPackage = provider_rate_cards[0];

                // Clean the price string (remove + and non-numeric chars)
                const rawPrice = firstPackage?.price || 0;
                const cleanPrice = typeof rawPrice === 'string'
                  ? parseInt(rawPrice.replace(/[^0-9]/g, '')) || 0
                  : rawPrice;

                // Enrich the item with service details for the confirmation page
                const itemsToBook = [{
                  ...(firstPackage || {}),
                  id: firstPackage?.id || `direct-${finalServiceId}`,
                  serviceId: finalServiceId,
                  serviceName: storeData.name || 'Professional Service',
                  packageName: firstPackage?.title || 'Standard Package',
                  price: cleanPrice,
                  bookingCost: storeData.serviceBookingCost || 0,
                  inspectionCost: storeData.inspectionCost || 0,
                  quantity: 1
                }];

                localStorage.setItem('booking_package_details', JSON.stringify(itemsToBook));
                router.push('/services/address');
              }}
              className="px-12 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#037166]/40 transition-all flex items-center gap-3 group"
            >
              Book This Service Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div> */}

          {/* Show More Reviews Button */}
          {activeTab === 'reviews' && customerRatings.length > visibleReviews && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleReviews(prev => prev + 4)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
              >
                Show More Reviews
              </button>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
