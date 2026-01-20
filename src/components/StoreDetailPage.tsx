'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Shield,
  Users,
  Calendar,
  X,
  Check,
  Sparkles,
  ThumbsUp,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

export default function StoreDetailPage({ storeId, onBack, onAddToCart, onGoToCart }) {
  const [activeTab, setActiveTab] = useState('services');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [selectedPackages, setSelectedPackages] = useState([]);

  // API data state
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);

  // Addons popup state
  const [showAddonsPopup, setShowAddonsPopup] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [addonsData, setAddonsData] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [loadingAddons, setLoadingAddons] = useState(false);

  // Fetch service center details from API
  useEffect(() => {
    const fetchCenterDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/single_provider_screen',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              providerId: storeId
            })
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch service center details');
        }

        const data = await response.json();

        if (data.success) {
          setApiData(data);
          console.log('Service center data loaded:', data);
        }
      } catch (error) {
        console.error('Error fetching service center details:', error);
        toast.error('Failed to load service center details');
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchCenterDetails();
    }
  }, [storeId]);

  // Derived data from API response
  const center = apiData?.storeData?.[0] || {
    firstName: 'Loading',
    lastName: '',
    logo: '',
    address: 'Loading address...',
    avgRating: 0,
    totalRatings: 0,
    totalOrders: 0,
    BasePrice: 0,
    inspectionCost: 0,
    serviceBookingCost: 0,
    updateTime: ''
  };

  const services = apiData?.provider_rate_cards || [];
  const reviews = apiData?.customerRatings || [];
  const teamMembers = apiData?.teamMembers || [];
  const portfolioImages = apiData?.serviceImages?.map((img) =>
    `https://api.doorstephub.com${img}`
  ) || [];
  const bannerImage = center.logo
    ? `https://api.doorstephub.com/${center.logo}`
    : '';
  const aboutUs = apiData?.aboutUs || 'Professional service center providing quality services';

  const handleSelectPackage = (serviceId) => {
    setSelectedPackages(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Fetch service addons
  const fetchServiceAddons = async (serviceId) => {
    setLoadingAddons(true);
    try {
      const response = await fetch(
        'https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/service-addons',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceIds: [serviceId],
            providerId: storeId
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch addons');
      }

      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        return data.data[0]; // Return first item with addons
      }
      return null;
    } catch (error) {
      console.error('Error fetching addons:', error);
      return null;
    } finally {
      setLoadingAddons(false);
    }
  };

  const handleAddToCart = async (service) => {
    // Store current service
    setCurrentService(service);

    // Check for addons
    const addons = await fetchServiceAddons(service._id);

    if (addons && addons.addons && addons.addons.length > 0) {
      // Show popup if addons exist
      setAddonsData(addons);
      setSelectedAddons([]); // Reset selected addons
      setShowAddonsPopup(true);
    } else {
      // No addons, add directly to cart
      addServiceToCart(service, []);
    }
  };

  const addServiceToCart = (service, addons = []) => {
    // Add parent service
    onAddToCart({
      id: `store-${storeId}-service-${service._id}`,
      serviceId: parseInt(service._id),
      serviceName: service.name,
      packageName: `${center.firstName} ${center.lastName}`,
      price: service.price,
      duration: 'N/A',
      quantity: 1,
      category: 'Store Service',
      subCategory: 'Professional',
    });

    // Add selected addons
    addons.forEach((addon) => {
      onAddToCart({
        id: `store-${storeId}-addon-${addon._id}`,
        serviceId: parseInt(addon._id),
        serviceName: addon.childServiceName,
        packageName: `${center.firstName} ${center.lastName}`,
        price: addon.price,
        duration: 'N/A',
        quantity: 1,
        category: 'Addon Service',
        subCategory: 'Professional',
      });
    });

    toast.success(`${service.name}${addons.length > 0 ? ` + ${addons.length} addon(s)` : ''} added to cart!`, {
      description: 'Continue shopping or proceed to checkout',
    });

    // Close popup and navigate to cart
    setShowAddonsPopup(false);
    onGoToCart();
  };

  const handleContinueWithAddons = () => {
    if (currentService) {
      const selected = addonsData.addons.filter(addon =>
        selectedAddons.includes(addon._id)
      );
      addServiceToCart(currentService, selected);
    }
  };

  const handleSkipAddons = () => {
    if (currentService) {
      addServiceToCart(currentService, []);
    }
  };

  const toggleAddonSelection = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Generate Google Maps URL from address
  const getMapUrl = () => {
    if (center.address) {
      const encodedAddress = encodeURIComponent(center.address);
      return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodedAddress}`;
    }
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.45094882422221!3d17.430236671802923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzQ4LjkiTiA3OMKwMjcnMDMuNCJF!5e0!3m2!1sen!2sin!4v1630000000000';
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#0a0a0a] via-[#0f1614] to-[#0a0a0a] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#037166] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-lg">Loading service center details...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#0a0a0a] via-[#0f1614] to-[#0a0a0a]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/10 hover:border-[#037166]/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        {/* Hero Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[500px] rounded-3xl overflow-hidden mb-8 shadow-2xl"
        >
          <img
            src={bannerImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200'}
            alt={`${center.firstName} ${center.lastName}`}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Store Info Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h1 className="text-4xl font-bold text-white mb-3">
                {center.firstName} {center.lastName}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#037166]" />
                  <span className="text-white/80 max-w-xs truncate">{center.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-[#037166] text-[#037166]" />
                    <span className="text-white font-semibold">{center.avgRating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <span className="text-white/60">({center.totalRatings || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#037166]" />
                  <span className="text-white/80">{center.totalOrders || 0}+ Jobs Done</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-semibold">
                  Starting from ₹{center.BasePrice || center.serviceBookingCost || 0}
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#037166]" />
                    <span className="text-white/80 text-sm">90-Day Warranty</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#037166]" />
                    <span className="text-white/80 text-sm">Same-Day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sticky Tab Navigation */}
        <div className="sticky top-20 z-40 mb-8 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-white/5 -mx-6 px-6 lg:-mx-8 lg:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex gap-2 overflow-x-auto py-1">
              {['services', 'about', 'portfolio', 'location', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-4 text-sm font-medium capitalize transition-all whitespace-nowrap ${activeTab === tab
                    ? 'text-[#037166]'
                    : 'text-white/60 hover:text-white/80'
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeStoreTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#04a99d]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Available Services</h2>
                <p className="text-white/60 text-lg">
                  {services.length} professional {services.length === 1 ? 'service' : 'services'} available
                </p>
              </div>

              {/* Service Cards */}
              {services.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={service._id || index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSelectPackage(service._id)}
                      className={`relative bg-white/5 backdrop-blur-sm border-2 rounded-3xl p-6 cursor-pointer transition-all hover:scale-105 group ${selectedPackages.includes(service._id)
                        ? 'border-[#037166] shadow-xl shadow-[#037166]/20'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                    >
                      {/* Selection Indicator */}
                      {selectedPackages.includes(service._id) && (
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#037166] flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}

                      {/* Service Image */}
                      {service.image && (
                        <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-white/10">
                          <img
                            src={`https://api.doorstephub.com/${service.image}`}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-[#037166]">
                          ₹{service.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-white/60">{service.priceUnit}</span>
                      </div>

                      <p className="text-white/60 text-sm mb-6 line-clamp-3">{service.description}</p>

                      {/* CTA Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(service);
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-semibold hover:shadow-xl hover:shadow-[#037166]/30 transition-all"
                      >
                        Add to Cart
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-12">
                  <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 text-lg mb-4">No services available at this center yet.</p>
                  <p className="text-white/40 text-sm">Please check back later or contact the service center directly.</p>
                </div>
              )}

              {/* Action Buttons */}
              {services.length > 0 && (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={onGoToCart}
                    className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#037166]/50 transition-all"
                  >
                    View Cart ({selectedPackages.length})
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">About Us</h2>

              {/* Description */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                <p className="text-white/70 text-lg leading-relaxed">
                  {aboutUs}
                </p>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#037166]/50 transition-all text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{center.totalOrders || 0}+</h3>
                  <p className="text-white/60">Jobs Completed</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#037166]/50 transition-all text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{center.avgRating?.toFixed(1) || '0.0'}</h3>
                  <p className="text-white/60">Average Rating</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#037166]/50 transition-all text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{center.totalRatings || 0}</h3>
                  <p className="text-white/60">Total Reviews</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">Portfolio</h2>
              <p className="text-white/60 mb-8 text-lg">Examples of our work</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioImages.length > 0 ? (
                  portfolioImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setLightboxImage(image)}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-white/5 border border-white/10"
                    >
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">View</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-white/60">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                    No portfolio images available yet
                  </div>
                )}
              </div>

              {/* Lightbox */}
              <AnimatePresence>
                {lightboxImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setLightboxImage(null)}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                  >
                    <button
                      onClick={() => setLightboxImage(null)}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                    <motion.img
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      src={lightboxImage}
                      alt="Portfolio"
                      className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* LOCATION TAB */}
          {activeTab === 'location' && (
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">Location</h2>
              <p className="text-white/60 mb-8 text-lg">Find us easily</p>

              {/* Map */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8">
                <div className="relative h-[500px]">
                  <iframe
                    src={getMapUrl()}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Service Center Location"
                  />
                  {/* Custom Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center shadow-xl"
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#037166]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#037166]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-lg">Address</h3>
                      <p className="text-white/80 leading-relaxed">{center.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#037166]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#037166]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2 text-lg">Last Updated</h3>
                      <p className="text-white/80">{center.updateTime}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-[#037166] font-semibold hover:text-[#04a99d] transition-colors"
                      >
                        Get Directions
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Customer Reviews</h2>
                  <p className="text-white/60 text-lg">Hear from our satisfied customers</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-6 h-6 fill-[#037166] text-[#037166]" />
                    <span className="text-3xl font-bold text-white">{center.avgRating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <p className="text-sm text-white/50">Based on {center.totalRatings || 0} reviews</p>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6 mb-8">
                {reviews.slice(0, reviewsToShow).map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {review.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{review.name}</h3>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 transition-colors ${i < Math.floor(review.rating)
                                  ? 'fill-[#037166] text-[#037166]'
                                  : i < review.rating
                                    ? 'text-[#037166]'
                                    : 'text-white/20'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">{review.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show More Button */}
              {reviewsToShow < reviews.length && (
                <div className="text-center">
                  <button
                    onClick={() => setReviewsToShow(prev => Math.min(prev + 3, reviews.length))}
                    className="px-8 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#037166]/50 transition-all"
                  >
                    Show More Reviews ({reviews.length - reviewsToShow} more)
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Addons Popup */}
      <AnimatePresence>
        {showAddonsPopup && addonsData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddonsPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f1614] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Add Related Services</h2>
                <button
                  onClick={() => setShowAddonsPopup(false)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Parent Service (Auto-selected) */}
              <div className="mb-6">
                <p className="text-white/60 text-sm mb-3">Selected Service:</p>
                <div className="bg-white/5 border border-[#037166]/30 rounded-2xl p-4 flex items-center gap-4">
                  {addonsData.parentServiceImage && (
                    <img
                      src={`https://api.doorstephub.com/${addonsData.parentServiceImage}`}
                      alt={addonsData.parentServiceName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{addonsData.parentServiceName}</h3>
                    <p className="text-[#037166] font-bold">₹{addonsData.parentServicePrice.toFixed(2)}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#037166] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Addons List */}
              {addonsData.addons && addonsData.addons.length > 0 && (
                <div className="mb-6">
                  <p className="text-white/60 text-sm mb-3">
                    Additional Services ({addonsData.addons.length} available):
                  </p>
                  <div className="space-y-3">
                    {addonsData.addons.map((addon) => (
                      <div
                        key={addon._id}
                        onClick={() => toggleAddonSelection(addon._id)}
                        className={`bg-white/5 border-2 rounded-2xl p-4 cursor-pointer transition-all hover:bg-white/10 ${selectedAddons.includes(addon._id)
                            ? 'border-[#037166] shadow-lg shadow-[#037166]/20'
                            : 'border-white/10'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Checkbox */}
                          <div
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${selectedAddons.includes(addon._id)
                                ? 'bg-[#037166] border-[#037166]'
                                : 'border-white/30'
                              }`}
                          >
                            {selectedAddons.includes(addon._id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>

                          {/* Addon Info */}
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{addon.childServiceName}</h4>
                            {addon.description && (
                              <p className="text-white/60 text-sm mb-2">{addon.description}</p>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-[#037166] font-bold">₹{addon.price.toFixed(2)}</span>
                              <span className="text-white/40 text-sm">/ {addon.priceUnit}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="bg-white/5 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Total Price:</span>
                  <span className="text-2xl font-bold text-[#037166]">
                    ₹
                    {(
                      addonsData.parentServicePrice +
                      (addonsData.addons
                        ?.filter((addon) => selectedAddons.includes(addon._id))
                        .reduce((sum, addon) => sum + addon.price, 0) || 0)
                    ).toFixed(2)}
                  </span>
                </div>
                <p className="text-white/40 text-sm mt-2">
                  {1 + selectedAddons.length} item{selectedAddons.length !== 0 ? 's' : ''} selected
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleSkipAddons}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Skip Addons
                </button>
                <button
                  onClick={handleContinueWithAddons}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-semibold hover:shadow-xl hover:shadow-[#037166]/30 transition-all"
                >
                  Continue ({1 + selectedAddons.length} item{selectedAddons.length !== 0 ? 's' : ''})
                </button>
              </div>

              {/* Loading Overlay */}
              {loadingAddons && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-[#037166] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
