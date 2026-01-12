'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/* ---------- IMAGE LOADER ---------- */
const imageLoader = ({ src }) => {
  return `https://api.doorstephub.com/${src}`;
};

/* ---------- SERVICE NAME TO SLUG MAPPING ---------- */
const serviceSlugMap = {
  'APPLIANCE SERVICE': 'appliances',
  'PG Hostels': 'pg-hostel',
  'Religious Services': 'religious',
  'Spa Salons': 'spa-salon',
  'Daily Needs': 'daily-needs',
  'MEDICINE': 'medicine',
  'PARCEL': 'parcel',
};

/* ---------- COMPACT SERVICES SECTION ---------- */
function ServiceCardsSection({ services, loading }) {
  const router = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const handleServiceClick = (serviceName) => {
    const slug = serviceSlugMap[serviceName] || serviceName.toLowerCase().replace(/\s+/g, '-');
    router.push(`/services/${slug}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-400">Loading services...</p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            variants={cardVariants}
            onClick={() => handleServiceClick(service.name)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/50 transition-all duration-300 hover:scale-105">
              <Image
                loader={imageLoader}
                src={service.image}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Service Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
              
              </div>

              {/* Hover Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
              />
            </div>



              <p className="text-white text-xs font-medium text-center line-clamp-2 group-hover:text-[#04a99d] transition-colors">
                  {service.name}
                </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- HERO SECTION ---------- */
function HeroContent({ services = [], loading = false, error = null }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(3,113,102,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(3,113,102,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: 'spring', damping: 30 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#037166]/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.015,
            y: -mousePosition.y * 0.015,
          }}
          transition={{ type: 'spring', damping: 30 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#025951]/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#037166]/10 border border-[#037166]/30 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#037166]" />
            <span className="text-sm text-[#037166] font-medium">Welcome to the Future of Services</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Everything You Need.
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#037166] via-[#02b39a] to-[#037166] bg-clip-text text-transparent">
              One Hub.
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Your premium gateway to services, spa, salon, hostels, religious experiences, and more.
            All in one beautifully crafted platform.
          </motion.p>

          {/* Service Cards - Right Below Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {error ? (
              <div className="mt-12 text-center">
                <p className="text-red-400 text-sm mb-2">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-[#04a99d] hover:text-[#037166] text-sm underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              <ServiceCardsSection services={services} loading={loading} />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}

/* ---------- HERO + SERVICES (API INTEGRATION HERE) ---------- */
export function HeroSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL 
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_ALL_SERVICES_ENDPOINT}`
          : 'https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/all-services';

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Validate API response structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid API response format');
        }

        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setServices(data.data);
        } else if (data.success && (!data.data || data.data.length === 0)) {
          console.warn('API returned success but no services data');
          setServices([]);
        } else {
          throw new Error(data.message || 'Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.message || 'Failed to load services. Please try again later.');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return <HeroContent services={services} loading={loading} error={error} />;
}

export default HeroSection;
