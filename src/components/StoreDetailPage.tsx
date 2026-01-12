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
  ThumbsUp
} from 'lucide-react';
import { toast } from 'sonner';
import type { CartItem } from '@/app/page';

interface StoreDetailPageProps {
  storeId: number;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onGoToCart: () => void;
  onServiceClick: (serviceId: number) => void;
}

// Dynamic center data based on ID
const centerData: Record<number, {
  name: string;
  location: string;
  city: string;
  rating: number;
  reviews: number;
  jobsDone: string;
  startingPrice: number;
  phone: string;
  hours: string;
  description: string[];
  address: string;
  mapUrl: string;
}> = {
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
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639290926582!2d-121.88954568468278!3d37.33463197983907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcca1b5b2d5e5%3A0x8825f6a7e0d8e64!2sApple%20Park!5e0!3m2!1sen!2sus!4v1649876543210!5m2!1sen!2sus',
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

const storeServices = [
  { 
    id: 'basic', 
    title: 'Basic Appliance Repair', 
    price: 49, 
    duration: '1-2 hours', 
    features: [
      'Diagnostic check',
      'Basic repairs',
      '30-day warranty',
      'Standard parts included',
    ]
  },
  { 
    id: 'standard', 
    title: 'Standard Service Package', 
    price: 69, 
    duration: '1-1.5 hours',
    popular: true,
    features: [
      'Full diagnostic',
      'Complete repair',
      '90-day warranty',
      'Premium parts included',
      'Deep cleaning',
    ]
  },
  { 
    id: 'premium', 
    title: 'Premium Maintenance', 
    price: 99, 
    duration: '2-3 hours', 
    features: [
      'Complete diagnostic',
      'Full repair & maintenance',
      '1-year warranty',
      'Premium parts & accessories',
      'Deep cleaning & sanitization',
      'Performance optimization',
    ]
  },
  { 
    id: 'emergency', 
    title: 'Emergency Repair', 
    price: 129, 
    duration: '30-60 min',
    features: [
      'Same-day service',
      'Priority booking',
      '24/7 availability',
      'Express diagnostic',
      '90-day warranty',
    ]
  },
  { 
    id: 'cleaning', 
    title: 'Deep Cleaning Service', 
    price: 79, 
    duration: '2 hours',
    features: [
      'Thorough cleaning',
      'Sanitization',
      'Polish & shine',
      'Maintenance tips',
      '30-day warranty',
    ]
  },
  { 
    id: 'installation', 
    title: 'Installation Service', 
    price: 89, 
    duration: '1-2 hours',
    features: [
      'Professional setup',
      'Testing & calibration',
      'User training',
      'Documentation',
      '60-day warranty',
    ]
  },
];

const portfolioImages = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
  'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600',
  'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c6?w=600',
  'https://images.unsplash.com/photo-1585128792335-a1c13c7b3d6c?w=600',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600',
  'https://images.unsplash.com/photo-1581092583537-20d51876f6f7?w=600',
];

const reviews = [
  { id: 1, name: 'Sarah Johnson', rating: 5, date: 'Jan 8, 2026', comment: 'Excellent service! The technician was very professional and fixed my appliance quickly. Highly recommend!', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Michael Chen', rating: 5, date: 'Jan 5, 2026', comment: 'Great experience from start to finish. Booking was easy and the repair was done perfectly.', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Emily Rodriguez', rating: 4, date: 'Jan 3, 2026', comment: 'Very satisfied with the service. The price was fair and the work quality was top-notch.', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'David Thompson', rating: 5, date: 'Dec 28, 2025', comment: 'They went above and beyond! Fixed the issue and gave me maintenance tips. Will definitely use again.', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Lisa Martinez', rating: 5, date: 'Dec 25, 2025', comment: 'Professional, punctual, and friendly. The technician explained everything clearly.', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export function StoreDetailPage({
  storeId,
  onBack,
  onAddToCart,
  onGoToCart,
}: StoreDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'portfolio' | 'location' | 'reviews'>('services');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  // Get center data or use default for ID 1
  const center = centerData[storeId] || centerData[1];

  // Auto-slide carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId)
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleAddToCart = (service: typeof storeServices[0]) => {
    onAddToCart({
      id: `store-${storeId}-service-${service.id}`,
      serviceId: storeId,
      serviceName: service.title,
      packageName: 'TechFix Pro Center',
      price: service.price,
      duration: service.duration,
      quantity: 1,
      category: 'Store Service',
      subCategory: 'Professional',
    });
    toast.success(`${service.title} added to cart!`, {
      description: 'Continue shopping or proceed to checkout',
    });
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
                className={`h-2 rounded-full transition-all ${
                  index === currentImageIndex 
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
              {(['services', 'about', 'portfolio', 'location', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-4 text-sm font-medium capitalize transition-all whitespace-nowrap ${
                    activeTab === tab ? 'text-[#037166]' : 'text-white/60 hover:text-white/80'
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

              {/* Service Rate Cards - Reusing exact same pattern as ServiceDetailsPage */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {storeServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSelectPackage(service.id)}
                    className={`relative bg-white/5 backdrop-blur-sm border-2 rounded-3xl p-6 cursor-pointer transition-all hover:scale-105 ${
                      selectedPackages.includes(service.id)
                        ? 'border-[#037166] shadow-xl shadow-[#037166]/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </div>
                    )}

                    {/* Selection Indicator */}
                    {selectedPackages.includes(service.id) && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#037166] flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-[#037166]">${service.price}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white/60 mb-6">
                      <Clock className="w-4 h-4 text-[#037166]" />
                      <span className="text-sm">{service.duration}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#037166] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>

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

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onGoToCart}
                  className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#037166]/50 transition-all"
                >
                  View Cart ({selectedPackages.length})
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
                {reviews.slice(0, reviewsToShow).map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{review.name}</h3>
                            <p className="text-sm text-white/50">{review.date}</p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < review.rating
                                    ? 'fill-[#037166] text-[#037166]'
                                    : 'text-white/20'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show More Button */}
              {reviewsToShow < reviews.length && (
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
    </motion.div>
  );
}