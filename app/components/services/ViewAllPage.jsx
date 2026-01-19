import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin, Zap, Loader2 } from 'lucide-react';
import { fetchFeaturedServices, imageLoader } from '@/lib/api';

export function ViewAllPage({
  type,
  onBack,
  onServiceClick,
  onStoreClick,
  onCategoryClick,
}) {
  const [categories, setCategories] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (type === 'categories') {
      const fetchCategories = async () => {
        try {
          // Using default coordinates only if needed, or empty body as per Postman snippet
          const body = {
            lattitude: '17.4391296',
            longitude: '78.4433152',
          };

          const response = await fetch(
            'https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/getallcategorys',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            }
          );

          if (!response.ok) throw new Error('Failed to fetch categories');
          const result = await response.json();

          if (result.success && result.data) {
            setCategories(result.data.map(item => ({
              ...item,
              title: item.name,
              image: `https://api.doorstephub.com/${item.image}`
            })));
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCategories();
    } else if (type === 'featured') {
      const loadFeatured = async () => {
        try {
          setIsLoading(true);
          const data = await fetchFeaturedServices();
          setFeaturedServices(data);
        } catch (error) {
          console.error('Error fetching featured services:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadFeatured();
    } else {
      setIsLoading(false);
    }
  }, [type]);

  const getTitle = () => {
    switch (type) {
      case 'featured':
        return 'All Featured Services';
      case 'stores':
        return 'All Nearby Stores';
      case 'categories':
        return 'All Categories';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0a0a0a]"
    >
      {/* Header */}
      <section className="bg-gradient-to-r from-[#025a51] via-[#037166] to-[#04a99d] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold">{getTitle()}</h1>
        </div>
      </section>

      {/* Grid Content */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#037166] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {type === 'categories' && categories.map((category, index) => (
              <motion.div
                key={category._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => onCategoryClick?.(category)}
                className="group cursor-pointer"
              >
                <div className="relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 shadow-lg hover:shadow-[#037166]/20 transition-all duration-300">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-8">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#04a99d] transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 border-2 border-[#037166]/0 group-hover:border-[#037166]/50 rounded-3xl pointer-events-none transition-all duration-300" />
                </div>
              </motion.div>
            ))}

            {type === 'featured' && featuredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => onServiceClick?.(service._id)}
                className="group cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-[#1a1a1a] border border-white/10 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageLoader({ src: service.mainImage })}
                      alt={service.serviceName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {service.serviceDelhiveryType || 'Featured'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors line-clamp-1">
                      {service.serviceName}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-2xl font-bold text-white">₹{service.serviceCharge}</p>
                      </div>
                      <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {type === 'stores' && [1, 2, 3, 4, 5, 6].map((id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: id * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => onStoreClick?.(id)}
                className="group cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-[#1a1a1a] border border-white/10">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
                      alt="Store"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                      Service Center {id}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#04a99d]" />
                      123 Main Street, City
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="w-4 h-4 fill-[#04a99d] text-[#04a99d]" />
                      <span className="text-white font-medium">4.8</span>
                      <span className="text-white/40">(890 reviews)</span>
                    </div>
                    <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all">
                      View Center
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
