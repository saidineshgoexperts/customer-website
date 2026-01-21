'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import { MapPin, Star, Search, Sliders, Heart, TrendingUp } from 'lucide-react';
import { Input } from '@/components/pghostels/ui/input';

const mockListings = [
    {
        id: '1',
        name: 'MAHENDRA A',
        location: 'Koramangala, Bangalore',
        rating: 4.3,
        orders: 8,
        basePrice: 175,
        monthlyPrice: 6500,
        image: 'https://images.unsplash.com/photo-1617430690223-3e165b390e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg2NDU4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 0.6,
    },
    {
        id: '2',
        name: 'GREEN VALLEY PG',
        location: 'Whitefield, Bangalore',
        rating: 4.8,
        orders: 142,
        basePrice: 250,
        monthlyPrice: 8500,
        image: 'https://images.unsplash.com/photo-1760067538068-03d10481bacb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaG9zdGVsJTIwcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3Njg2NDY3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 0.8,
    },
    {
        id: '3',
        name: 'URBAN NEST CO-LIVING',
        location: 'Indiranagar, Bangalore',
        rating: 4.6,
        orders: 89,
        basePrice: 350,
        monthlyPrice: 12000,
        image: 'https://images.unsplash.com/photo-1707598973296-255b29445512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xpdmluZyUyMHdvcmtzcGFjZSUyMGxvdW5nZXxlbnwxfHx8fDE3Njg2NDY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 1.2,
    },
    {
        id: '4',
        name: 'SUNSHINE DORM',
        location: 'BTM Layout, Bangalore',
        rating: 4.2,
        orders: 45,
        basePrice: 150,
        monthlyPrice: 5500,
        image: 'https://images.unsplash.com/photo-1709805619372-40de3f158e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBiZWRyb29tJTIwZG9ybWl0b3J5fGVufDF8fHx8MTc2ODY0NTg5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 2.1,
    },
    {
        id: '5',
        name: 'ELITE WOMEN\'S HOSTEL',
        location: 'Koramangala, Bangalore',
        rating: 4.9,
        orders: 201,
        basePrice: 300,
        monthlyPrice: 10000,
        image: 'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg2MjY5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 0.5,
    },
    {
        id: '6',
        name: 'PREMIUM LIVING SPACES',
        location: 'HSR Layout, Bangalore',
        rating: 4.7,
        orders: 156,
        basePrice: 450,
        monthlyPrice: 15000,
        image: 'https://images.unsplash.com/photo-1581209410127-8211e90da024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjby1saXZpbmclMjBzcGFjZSUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3Njg2NDU4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 1.8,
    },
];

export default function NewListingPage() {
    const params = useParams();
    const router = useRouter();
    const type = params.type;
    const [savedItems, setSavedItems] = useState([]);
    const [showNearby, setShowNearby] = useState(false);

    const toggleSave = (id) => {
        setSavedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const HostelCard = ({ listing, isNearby }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            onClick={() => router.push(`/pghostels/hostel-detail/${listing.id}`)}
            className="group cursor-pointer relative"
        >
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#037166]/30">
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${listing.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Save Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(listing.id);
                        }}
                        className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
                    >
                        <Heart
                            className={`w-5 h-5 transition-all ${savedItems.includes(listing.id)
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-600'
                                }`}
                        />
                    </button>

                    {/* Distance Badge */}
                    {isNearby && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#037166] text-white rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{listing.distance} km away</span>
                        </div>
                    )}

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#037166] transition-colors">
                            {listing.name}
                        </h3>
                        <div className="flex items-center text-white/90 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{listing.location}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            {/* Rating */}
                            <div className="flex items-center space-x-1">
                                <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                                <span className="text-lg font-bold text-gray-900">{listing.rating}</span>
                            </div>

                            {/* Orders */}
                            <div className="flex items-center space-x-1 text-gray-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">{listing.orders} Orders</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Base Price</div>
                            <div className="flex items-baseline space-x-1">
                                <span className="text-3xl font-bold text-gray-900">₹{listing.basePrice}</span>
                                <span className="text-sm text-gray-500">/day</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                ₹{listing.monthlyPrice.toLocaleString()}/month
                            </div>
                        </div>

                        <button className="px-6 py-3 bg-gradient-to-r from-[#037166] to-[#025951] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#037166]/30 transition-all">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const displayListings = showNearby
        ? [...mockListings].sort((a, b) => a.distance - b.distance)
        : mockListings;

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#037166] to-[#025951] py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {type === 'all' ? 'All PGs & Hostels' : `${type.charAt(0).toUpperCase() + type.slice(1)} Listings`}
                        </h1>
                        <p className="text-white/90 text-lg">Based on your location</p>
                    </motion.div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Search by name, area, or landmark..."
                                className="pl-12 h-12 bg-gray-50 border-gray-200"
                            />
                        </div>
                        <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                            <Sliders className="w-5 h-5" />
                            <span className="hidden md:inline font-medium">Filters</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2 bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
                        <button
                            onClick={() => setShowNearby(false)}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${!showNearby
                                    ? 'bg-gradient-to-r from-[#037166] to-[#025951] text-white'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            All PGs
                        </button>
                        <button
                            onClick={() => setShowNearby(true)}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${showNearby
                                    ? 'bg-gradient-to-r from-[#037166] to-[#025951] text-white'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Nearby PGs
                        </button>
                    </div>

                    <div className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{mockListings.length}</span> properties found
                    </div>
                </div>

                {/* Listings Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayListings.map((listing) => (
                        <HostelCard key={listing.id} listing={listing} isNearby={showNearby} />
                    ))}
                </div>
            </div>
        </div>
    );
}
