'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Star, MapPin, Clock, Heart, ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const allServices = [
    {
        id: 1,
        name: 'Luxury Hair Spa Treatment',
        provider: 'Lotus Spa & Wellness',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc2ODY1MjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.8,
        reviews: 324,
        price: 999,
        duration: '60 min',
        distance: '2.5 km',
        availability: 'Available Today',
        isNearby: true,
    },
    {
        id: 2,
        name: 'Deep Tissue Massage',
        provider: 'Radiance Beauty Studio',
        image: 'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3Njg2NTI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.9,
        reviews: 456,
        price: 1899,
        duration: '120 min',
        distance: '3.2 km',
        availability: 'Available Today',
        isNearby: true,
    },
    {
        id: 3,
        name: 'Glow Facial Combo',
        provider: 'Serenity Spa Center',
        image: 'https://images.unsplash.com/photo-1684014286330-ddbeb4a40c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBza2luY2FyZXxlbnwxfHx8fDE3Njg1NTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.7,
        reviews: 234,
        price: 1299,
        duration: '90 min',
        distance: '4.1 km',
        availability: 'Available Today',
        isNearby: true,
    },
    {
        id: 4,
        name: 'Bridal Makeup Package',
        provider: 'Glamour Salon & Spa',
        image: 'https://images.unsplash.com/photo-1625139108082-48bb424c2333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBhcnRpc3R8ZW58MXx8fHwxNzY4NTQyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5.0,
        reviews: 189,
        price: 2999,
        duration: '180 min',
        distance: '1.8 km',
        availability: 'Available Today',
        isNearby: true,
    },
    {
        id: 5,
        name: 'Premium Haircut & Styling',
        provider: 'Style Studio',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc2ODY1MjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.6,
        reviews: 412,
        price: 599,
        duration: '45 min',
        distance: '5.3 km',
        availability: 'Tomorrow',
        isNearby: false,
    },
    {
        id: 6,
        name: 'Relaxation Spa Package',
        provider: 'Zen Wellness',
        image: 'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3Njg2NTI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.8,
        reviews: 298,
        price: 1499,
        duration: '90 min',
        distance: '6.7 km',
        availability: 'Tomorrow',
        isNearby: false,
    },
];

const filters = [
    'All Services',
    'Highest Rated',
    'Price: Low to High',
    'Price: High to Low',
    'Nearest First',
];

export function ResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All Services');
    const [showFilters, setShowFilters] = useState(false);

    const filteredServices = allServices.filter(service => {
        const matchesTab = activeTab === 'all' || (activeTab === 'nearby' && service.isNearby);
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.provider.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#F6F7FB] pt-20">
            {/* Header */}
            <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-[#E8ECF2] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Back Button */}
                    <motion.button
                        whileHover={{ x: -5 }}
                        onClick={() => router.push('/spa-salon')}
                        className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Home
                    </motion.button>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
                                Spa Services <span className="text-[#C06C84]">Matched for You</span>
                            </h1>
                            <p className="text-[#64748B]">
                                {filteredServices.length} services available
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-[#E8ECF2] rounded-xl text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#C06C84] transition-colors shadow-sm"
                            />
                        </div>

                        {/* Filter Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E8ECF2] rounded-xl text-[#0F172A] hover:border-[#C06C84] transition-colors shadow-sm"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Filters
                        </motion.button>
                    </div>

                    {/* Filter Chips */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-wrap gap-3 mt-6"
                        >
                            {filters.map((filter) => (
                                <motion.button
                                    key={filter}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={`px-4 py-2 rounded-lg border transition-all ${selectedFilter === filter
                                        ? 'bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] border-transparent text-white'
                                        : 'bg-[#F6F7FB] border-[#E8ECF2] text-[#64748B] hover:border-[#C06C84]'
                                        }`}
                                >
                                    {filter}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                    {/* Tabs */}
                    <div className="flex gap-4 mt-6">
                        <TabButton
                            active={activeTab === 'all'}
                            onClick={() => setActiveTab('all')}
                        >
                            All Services
                        </TabButton>
                        <TabButton
                            active={activeTab === 'nearby'}
                            onClick={() => setActiveTab('nearby')}
                        >
                            Nearby Centers
                        </TabButton>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            router={router}
                        />
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">No services found</h3>
                        <p className="text-[#64748B]">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`relative px-6 py-3 rounded-lg font-medium transition-all ${active
                ? 'text-white'
                : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
        >
            {children}
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] rounded-lg -z-10"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
            )}
            {!active && (
                <div className="absolute inset-0 bg-[#F6F7FB] rounded-lg -z-10" />
            )}
        </button>
    );
}

function ServiceCard({ service, index, router }) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => router.push(`/spa-salon/detail/${service.id}`)}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8ECF2] cursor-pointer group shadow-md hover:shadow-xl transition-all"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsWishlisted(!isWishlisted);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#C06C84] hover:bg-white transition-colors shadow-md"
                >
                    <Heart
                        className={`w-5 h-5 ${isWishlisted ? 'fill-[#C06C84] text-[#C06C84]' : ''}`}
                    />
                </motion.button>

                {/* Availability Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${service.availability === 'Available Today'
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-[#6C5CE7] text-white'
                    }`}>
                    {service.availability}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-1">{service.name}</h3>
                <p className="text-[#64748B] text-sm mb-4">{service.provider}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-[#0F172A] font-medium">{service.rating}</span>
                        <span className="text-[#64748B] text-sm">({service.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#64748B]">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{service.duration}</span>
                    </div>
                </div>

                {/* Distance */}
                {service.isNearby && (
                    <div className="flex items-center gap-1 text-[#64748B] mb-4">
                        <MapPin className="w-4 h-4 text-[#C06C84]" />
                        <span className="text-sm">{service.distance} away</span>
                    </div>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E8ECF2]">
                    <div>
                        <p className="text-2xl font-bold text-[#0F172A]">₹{service.price}</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/spa-salon/booking/address`);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#C06C84]/50 transition-all"
                    >
                        Book Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
