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
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// Dynamic center data based on ID
const centerData = {
  1: {
    name: 'TechFix Pro Center',
    location: 'Downtown, San Francisco',
    city: 'San Francisco',
    rating: 4.9,
    reviews: 1250,
    jobsDone: '2.5K+',
    startingPrice: 49,
    phone: '(555) 123-4567',
    hours: 'Mon-Sat: 9AM - 7PM',
    description: [
      'TechFix Pro Center is San Francisco\'s premier appliance and electronics repair service provider. With over 10 years of experience and a team of certified technicians, we specialize in fast, reliable repairs for all major brands and models.',
      'Our commitment to excellence and customer satisfaction has made us the trusted choice for thousands of satisfied customers. We offer transparent pricing, same-day service availability, and a comprehensive 90-day warranty on all repairs.',
      'From refrigerators to washing machines, ovens to air conditioners, our expert team handles it all with precision and care. We use only genuine parts and follow manufacturer guidelines to ensure lasting results.',
    ],
    address: '1234 Market Street\nDowntown, San Francisco\nCA 94103, United States',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0867827834843!2d-122.40641668468194!3d37.78579897975836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1649876543210!5m2!1sen!2sus',
  },
  2: {
    name: 'Smart Repair Hub',
    location: 'Tech Park Area, San Jose',
    city: 'San Jose',
    rating: 4.8,
    reviews: 987,
    jobsDone: '1.8K+',
    startingPrice: 45,
    phone: '(555) 234-5678',
    hours: 'Mon-Sun: 8AM - 8PM',
    description: [
      'Smart Repair Hub brings cutting-edge technology to appliance repair. Our certified technicians use advanced diagnostic tools to quickly identify and fix issues with precision.',
      'Specializing in smart home devices and modern appliances, we stay ahead of the curve with continuous training on the latest technologies. Our same-day service guarantee ensures minimal disruption to your daily routine.',
      'With transparent pricing and no hidden fees, we\'ve built a reputation for honesty and quality workmanship. All repairs come with a comprehensive warranty for your peace of mind.',
    ],
    address: '5678 Innovation Blvd\nTech Park Area, San Jose\nCA 95110, United States',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639290926582!2d-121.88954568468278!3d37.33463197983907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcca1b5b2d5e5%3A0x8825f6a7e0d8e64!2sApple%20Park!5e0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcca1b5b2d5e5%3A0x8825f6a7e0d8e64!2sApple%20Park!5e0!3m2!1sen!2sus!4v1649876543210!5m2!1sen!2sus',
  },
  3: {
    name: 'Elite Appliance Care',
    location: 'Central Plaza, Oakland',
    city: 'Oakland',
    rating: 4.9,
    reviews: 1568,
    jobsDone: '3.2K+',
    startingPrice: 55,
    phone: '(555) 345-6789',
    hours: 'Mon-Fri: 8AM - 6PM, Sat: 9AM - 5PM',
    description: [
      'Elite Appliance Care is Oakland\'s most trusted name in appliance repair. For over 15 years, we\'ve provided premium service to residential and commercial clients throughout the Bay Area.',
      'Our master technicians are factory-trained and certified to work on all major brands. We maintain the largest inventory of genuine parts in the region, ensuring fast repairs without delays.',
      'From emergency repairs to preventive maintenance, we offer comprehensive solutions tailored to your needs. Our customer-first approach and lifetime workmanship guarantee set us apart.',
    ],
    address: '9012 Central Plaza Dr\nCentral Plaza, Oakland\nCA 94612, United States',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.5463516347!2d-122.27155268468!3d37.80500007975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f80b0b0b0b0b0%3A0x0!2sOakland!5e0!3m2!1sen!2sus!4v1649876543210!5m2!1sen!2sus',
  },
  4: {
    name: 'Rapid Fix Solutions',
    location: 'Market Street, Fremont',
    city: 'Fremont',
    rating: 4.7,
    reviews: 756,
    jobsDone: '1.5K+',
    startingPrice: 39,
    phone: '(555) 456-7890',
    hours: 'Mon-Sat: 7AM - 9PM',
    description: [
      'Rapid Fix Solutions lives up to its name with the fastest turnaround times in the industry. Our express service gets most repairs done within 24 hours, with emergency same-day options available.',
      'We specialize in quick diagnostics and efficient repairs without compromising quality. Our streamlined process and experienced team ensure you\'re back up and running in no time.',
      'Serving the Fremont community with pride, we offer competitive pricing and flexible scheduling to fit your busy lifestyle. Customer satisfaction is our top priority.',
    ],
    address: '3456 Market Street\nFremont, CA 94538\nUnited States',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.736284!2d-121.98862468468!3d37.54827497981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc0c0c0c0c0c0%3A0x0!2sFremont!5e0!3m2!1sen!2sus!4v1649876543210!5m2!1sen!2sus',
  },
};

const storeImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
  'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
];



const portfolioImages = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
  'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600',
  'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c6?w=600',
  'https://images.unsplash.com/photo-1585128792335-a1c13c7b3d6c?w=600',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600',
  'https://images.unsplash.com/photo-1581092583537-20d51876f6f7?w=600',
];



export function StoreDetailPage({
  storeId,
  serviceId,
  onBack,
  onAddToCart,
  onGoToCart,
}) {
  const [activeTab, setActiveTab] = useState('services');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [storeDetails, setStoreDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storeServicesData, setStoreServicesData] = useState(null);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [showAddons, setShowAddons] = useState(false);
  const [addons, setAddons] = useState([]);
  const [addonsLoading, setAddonsLoading] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!storeId || !serviceId) return;
      setLoading(true);
      try {
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/single_provider_screen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            providerId: storeId,
            serviceId: serviceId
          })
        });

        if (!response.ok) throw new Error('Failed to fetch details');

        const data = await response.json();
        if (data.success) {
          setStoreDetails(data);
        }
      } catch (error) {
        console.error("Error fetching store details:", error);
        // toast.error("Failed to load store details");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [storeId, serviceId]);

  // Fetch Store Services
  useEffect(() => {
    const fetchStoreServices = async () => {
      if (!storeId) return;
      setServicesLoading(true);
      try {
        const response = await fetch(`https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/service_center_services/${storeId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

        });

        if (!response.ok) throw new Error('Failed to fetch services');

        const data = await response.json();
        if (data.success) {
          setStoreServicesData(data);
        }
      } catch (error) {
        console.error("Error fetching store services:", error);
        // toast.error("Failed to load available services");
      } finally {
        setServicesLoading(false);
      }
    };

    fetchStoreServices();
  }, [storeId]);

  const fetchAddons = async (sIds) => {
    if (!sIds || sIds.length === 0) return;

    setAddonsLoading(true);
    try {
      const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/professional-services-flow/public/professional-service-addons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceIds: sIds,
          professionalProviderId: storeId
        })
      });
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setAddons(data.data);
        setShowAddons(true);
      } else {
        // No addons, proceed to book/cart
        handleDirectActionMultiple(sIds);
      }
    } catch (error) {
      console.error('Error fetching addons:', error);
      handleDirectActionMultiple(sIds);
    } finally {
      setAddonsLoading(false);
    }
  };

  const handleBookSelected = () => {
    if (selectedPackages.length === 0) {
      toast.error("Please select at least one service");
      return;
    }
    fetchAddons(selectedPackages);
  };

  const handleDirectActionMultiple = (sIds) => {
    const selectedItems = storeServicesData.services.filter(s => sIds.includes(s._id));

    selectedItems.forEach(service => {
      onAddToCart({
        id: service._id,
        serviceId: storeId,
        serviceName: service.serviceName || service.title,
        packageName: center.name,
        price: service.price,
        duration: service.duration || '40 mins',
        quantity: 1,
        category: 'Store Service',
        subCategory: 'Professional',
      });
    });

    toast.success(`${selectedItems.length} services added to cart`);
    onGoToCart();
  };

  // Derived data
  const apiCenter = storeServicesData?.serviceCenter || {};
  const oldCenter = storeDetails?.storeData?.[0] || {};

  const center = {
    name: apiCenter.firstName ? `${apiCenter.firstName} ${apiCenter.lastName}` : (oldCenter.firstName ? `${oldCenter.firstName} ${oldCenter.lastName}` : centerData[1].name),
    location: storeServicesData?.location?.address || oldCenter.address || centerData[1].location,
    city: (storeServicesData?.location?.address || oldCenter.address || '').split(',').pop() || centerData[1].city,
    rating: apiCenter.avgRating ? parseFloat(apiCenter.avgRating).toFixed(1) : (oldCenter.avgRating ? parseFloat(oldCenter.avgRating).toFixed(1) : centerData[1].rating),
    reviews: apiCenter.totalRatings || oldCenter.totalRatings || 0,
    jobsDone: apiCenter.totalOrders ? `${apiCenter.totalOrders}+` : (oldCenter.totalOrders ? `${oldCenter.totalOrders}+` : centerData[1].jobsDone),
    startingPrice: apiCenter.BasePrice || oldCenter.BasePrice || centerData[1].startingPrice,
    phone: centerData[1].phone,
    hours: apiCenter.updateTime ? `Last updated: ${apiCenter.updateTime}` : centerData[1].hours,
    description: storeServicesData?.about?.bio ? [storeServicesData.about.bio] : (centerData[1].description),
    address: storeServicesData?.location?.address || oldCenter.address || centerData[1].address,
    mapUrl: centerData[1].mapUrl,
  };

  const reviewsList = storeServicesData?.reviews || storeDetails?.customerRatings || [];
  const baseUrl = 'https://api.doorstephub.com/';
  const portfolioList = storeServicesData?.portfolio?.images?.map(img => img.startsWith('http') ? img : `${baseUrl}${img}`) || [];
  const bannerImg = storeServicesData?.banner_image ? (storeServicesData.banner_image.startsWith('http') ? storeServicesData.banner_image : `${baseUrl}${storeServicesData.banner_image}`) : null;

  const apiImages = storeDetails?.serviceImages?.[0]?.workingImages;
  const galleryImages = (portfolioList.length > 0) ? portfolioList : ((apiImages && apiImages.length > 0) ? apiImages : storeImages);
  if (bannerImg && !galleryImages.includes(bannerImg)) {
    galleryImages.unshift(bannerImg);
  }

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  const handleSelectPackage = (packageId) => {
    setSelectedPackages(prev =>
      prev.includes(packageId)
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const nextImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
  };

  const prevImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev - 1 + storeImages.length) % storeImages.length);
  };

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
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={storeImages[currentImageIndex]}
              alt="Store"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {storeImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${index === currentImageIndex
                  ? 'w-8 bg-[#037166]'
                  : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>

          {/* Store Info Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h1 className="text-4xl font-bold text-white mb-3">{center.name}</h1>

              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#037166]" />
                  <span className="text-white/80">{center.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-[#037166] text-[#037166]" />
                    <span className="text-white font-semibold">{center.rating}</span>
                  </div>
                  <span className="text-white/60">({center.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#037166]" />
                  <span className="text-white/80">{center.jobsDone} Jobs Done</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-semibold">
                  Starting from ${center.startingPrice}
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
                  className={`relative px-6 py-4 text-sm font-medium capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'text-[#037166]' : 'text-white/60 hover:text-white/80'
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
                <p className="text-white/60 text-lg">Choose from our professional repair packages</p>
              </div>

              {/* Service Rate Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {servicesLoading ? (
                  // Service Skeleton
                  [1, 2, 3].map((i) => (
                    <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse" />
                  ))
                ) : (storeServicesData?.services || []).map((service, index) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSelectPackage(service._id)}
                    className={`relative bg-white/5 backdrop-blur-sm border-2 rounded-3xl p-6 cursor-pointer transition-all hover:scale-105 ${selectedPackages.includes(service._id)
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

                    <h3 className="text-xl font-bold text-white mb-2">{service.serviceName || service.title}</h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-[#037166]">₹{service.price}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white/60 mb-6">
                      <Clock className="w-4 h-4 text-[#037166]" />
                      <span className="text-sm">{service.duration || '40 mins'}</span>
                    </div>

                    {/* Features Placeholder */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#037166] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">Professional Service</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#037166] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">Warranty included</span>
                      </div>
                    </div>

                    {/* CTA Button removed as we have a global Book button */}
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 sticky bottom-0 bg-[#0a0a0a]/80 backdrop-blur-xl p-4 border-t border-white/10 -mx-6 lg:-mx-8">
                <button
                  onClick={onGoToCart}
                  className="flex-1 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#037166]/50 transition-all"
                >
                  View Cart ({selectedPackages.length})
                </button>
                <button
                  onClick={handleBookSelected}
                  disabled={selectedPackages.length === 0 || addonsLoading}
                  className="flex-[2] px-8 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold hover:shadow-xl hover:shadow-[#037166]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addonsLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  Book {selectedPackages.length} {selectedPackages.length === 1 ? 'Service' : 'Services'}
                </button>
              </div>
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
              <h2 className="text-3xl font-bold text-white mb-6">About {center.name}</h2>

              {/* Description */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                {center.description.map((paragraph, index) => (
                  <p key={index} className="text-white/70 text-lg leading-relaxed mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Trust Indicators - Same pattern as existing */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#037166]/50 transition-all">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Expert Technicians</h3>
                  <p className="text-white/60">Certified professionals with years of experience</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#037166]/50 transition-all">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">90-Day Warranty</h3>
                  <p className="text-white/60">All repairs backed by our guarantee</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#037166]/50 transition-all">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center mb-4">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Same-Day Service</h3>
                  <p className="text-white/60">Fast turnaround for urgent repairs</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#037166]/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#037166]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Phone</p>
                      <p className="text-lg font-semibold text-white">{center.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#037166]/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#037166]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Working Hours</p>
                      <p className="text-lg font-semibold text-white">{center.hours}</p>
                    </div>
                  </div>
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
              <h2 className="text-3xl font-bold text-white mb-2">Our Work</h2>
              <p className="text-white/60 mb-8 text-lg">See examples of our repair and service projects</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setLightboxImage(image)}
                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
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
              <h2 className="text-3xl font-bold text-white mb-2">Our Location</h2>
              <p className="text-white/60 mb-8 text-lg">Visit us at our service center</p>

              {/* Map */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8">
                <div className="relative h-[500px] bg-gray-900">
                  <iframe
                    src={center.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Store Location"
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
                      <p className="text-white/60 leading-relaxed">
                        {center.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#037166]/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-[#037166]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-lg">Get Directions</h3>
                      <p className="text-white/60 leading-relaxed mb-3">
                        Located in the heart of Downtown San Francisco, easily accessible by public transport.
                      </p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#037166] font-semibold hover:text-[#04a99d] transition-colors"
                      >
                        Open in Maps
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
                  <p className="text-white/60 text-lg">What our customers say about us</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-6 h-6 fill-[#037166] text-[#037166]" />
                    <span className="text-3xl font-bold text-white">4.9</span>
                  </div>
                  <p className="text-sm text-white/50">Based on 1,250 reviews</p>
                </div>
              </div>

              {/* Reviews List - Same pattern as existing */}
              <div className="space-y-6 mb-8">
                {reviewsList.slice(0, reviewsToShow).map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.image || `https://ui-avatars.com/api/?name=${review.name}&background=random`}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{review.name}</h3>
                            <p className="text-sm text-white/50">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < review.rating
                                  ? 'fill-[#037166] text-[#037166]'
                                  : 'text-white/20'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">{review.comment || `Rated ${review.rating} stars`}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show More Button */}
              {reviewsToShow < reviewsList.length && (
                <div className="text-center">
                  <button
                    onClick={() => setReviewsToShow(prev => prev + 2)}
                    className="px-8 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#037166]/50 transition-all"
                  >
                    Show More Reviews
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Addons Modal */}
      <AnimatePresence>
        {showAddons && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddons(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#1a1a1a] rounded-3xl border border-[#037166]/30 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#037166]/20 to-transparent">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#037166]" />
                  Recommended Add-ons
                </h2>
                <button onClick={() => setShowAddons(false)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
                {addons.map((parent) => (
                  <div key={parent.parentServiceId} className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={parent.parentServiceImage ? `https://api.doorstephub.com/${parent.parentServiceImage}` : 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100'}
                          alt={parent.parentServiceName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{parent.parentServiceName}</h4>
                        <p className="text-[#037166] text-xs font-bold">Standard: ₹{parent.parentServicePrice}</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {parent.addons.map((addon) => (
                        <div
                          key={addon._id}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-[#037166]/30 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            {addon.image && (
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={`https://api.doorstephub.com/${addon.image}`} alt={addon.childServiceName} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-bold text-white text-xs">{addon.childServiceName}</h3>
                              <p className="text-[#037166] text-xs font-bold">₹{addon.price} {addon.priceUnit && <span className="text-white/40 font-normal">/ {addon.priceUnit}</span>}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              onAddToCart({
                                id: addon._id,
                                serviceId: storeId,
                                serviceName: addon.childServiceName,
                                packageName: `${center.name} (Add-on)`,
                                price: addon.price,
                                duration: '20 mins',
                                quantity: 1,
                                category: 'Add-on',
                                subCategory: parent.parentServiceName,
                              });
                              toast.success(`${addon.childServiceName} added!`);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#037166]/20 text-[#037166] hover:bg-[#037166] hover:text-white transition-all text-xs font-bold"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5">
                <button
                  onClick={() => {
                    handleDirectActionMultiple(selectedPackages);
                    setShowAddons(false);
                    // navigate to address page
                    if (window.onProceedToAddress) {
                      window.onProceedToAddress();
                    } else {
                      onGoToCart();
                    }
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  Continue to Address
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}