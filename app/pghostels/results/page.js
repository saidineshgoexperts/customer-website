'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    MapPin, Star, Search, Sliders, Heart, TrendingUp, X, Wifi, Utensils,
    Shirt, Zap, Award, Sparkles, ChevronRight
} from 'lucide-react';
import { Input } from '@/components/pghostels/ui/input';

const mockListings = [
    {
        id: '1',
        name: 'MAHENDRA A',
        location: 'Koramangala, Bangalore',
        rating: 4.3,
        orders: 8,
        monthlyPrice: 6500,
        image: 'https://images.unsplash.com/photo-1617430690223-3e165b390e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg2NDU4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 0.6,
        matchScore: 92,
        badges: ['Verified', 'Best for Students'],
        amenities: ['WiFi', 'Food', 'AC', 'Laundry'],
        availableBeds: 3,
    },
    {
        id: '2',
        name: 'GREEN VALLEY PG',
        location: 'Whitefield, Bangalore',
        rating: 4.8,
        orders: 142,
        monthlyPrice: 8500,
        image: 'https://images.unsplash.com/photo-1760067538068-03d10481bacb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaG9zdGVsJTIwcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3Njg2NDY3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 0.8,
        matchScore: 95,
        badges: ['Verified', 'Near Metro'],
        amenities: ['WiFi', 'Food', 'AC', 'Laundry'],
        availableBeds: 2,
    },
    {
        id: '3',
        name: 'URBAN NEST CO-LIVING',
        location: 'Indiranagar, Bangalore',
        rating: 4.6,
        orders: 89,
        monthlyPrice: 12000,
        image: 'https://images.unsplash.com/photo-1707598973296-255b29445512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xpdmluZyUyMHdvcmtzcGFjZSUyMGxvdW5nZXxlbnwxfHx8fDE3Njg2NDY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 1.2,
        matchScore: 88,
        badges: ['Verified', 'Premium'],
        amenities: ['WiFi', 'Food', 'AC', 'Gym'],
        availableBeds: 5,
    },
    {
        id: '4',
        name: 'ELITE WOMEN\'S HOSTEL',
        location: 'Koramangala, Bangalore',
        rating: 4.9,
        orders: 201,
        monthlyPrice: 10000,
        image: 'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg2MjY5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: 0.5,
        matchScore: 97,
        badges: ['Verified', 'Top Rated', 'Near Metro'],
        amenities: ['WiFi', 'Food', 'AC', 'Laundry'],
        availableBeds: 1,
    },
];

const amenityIcons = {
    WiFi: Wifi,
    Food: Utensils,
    AC: Zap,
    Laundry: Shirt,
    Gym: TrendingUp,
};

export default function PGResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryName = searchParams.get('categoryName');
    const roomType = searchParams.get('roomType');
    const budget = searchParams.get('budget');

    const [savedItems, setSavedItems] = useState([]);
    const [showNearby, setShowNearby] = useState(false);

    const toggleSave = (id) => {
        setSavedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const filterChips = [];
    if (roomType) filterChips.push(roomType.replace('-', ' '));
    if (budget) filterChips.push(budget);

    const sortedListings = [...mockListings].sort((a, b) => b.matchScore - a.matchScore);
    const recommendedListings = sortedListings.slice(0, 3);

    const PGCard = ({ listing, isNearby }) => {
        const isSaved = savedItems.includes(listing.id);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer relative"
            >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#037166]/30">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                            style={{ backgroundImage: `url(${listing.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {listing.badges.map((badge, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900"
                                >
                                    {badge}
                                </span>
                            ))}
                            {listing.availableBeds <= 3 && (
                                <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                                    Few beds left
                                </span>
                            )}
                        </div>

                        {/* Match Score Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="absolute top-4 right-4 bg-gradient-to-br from-[#037166] to-[#025951] text-white px-4 py-2 rounded-2xl shadow-lg flex items-center space-x-2"
                        >
                            <Award className="w-4 h-4" />
                            <span className="font-bold">{listing.matchScore}%</span>
                            <span className="text-xs">match</span>
                        </motion.div>

                        {/* Distance Badge */}
                        {isNearby && (
                            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-[#037166] text-white rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{listing.distance} km away</span>
                            </div>
                        )}

                        {/* Save Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSave(listing.id);
                            }}
                            className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                            <Heart
                                className={`w-5 h-5 transition-all ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-6" onClick={() => router.push(`/pghostels/hostel-detail/${listing.id}`)}>
                        {/* PG Name & Location */}
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#037166] transition-colors">
                                {listing.name}
                            </h3>
                            <div className="flex items-center text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{listing.location}</span>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-1">
                                <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                                <span className="font-bold text-gray-900">{listing.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">{listing.orders} Orders</span>
                            </div>
                            {listing.availableBeds <= 5 && (
                                <div className="flex items-center space-x-1 text-[#037166]">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-medium">{listing.availableBeds} beds left</span>
                                </div>
                            )}
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {listing.amenities.map((amenity, i) => {
                                const Icon = amenityIcons[amenity];
                                return (
                                    <div
                                        key={i}
                                        className="px-3 py-1.5 bg-gray-100 rounded-lg flex items-center space-x-1.5 text-sm text-gray-700"
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        <span>{amenity}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Starting from</div>
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-3xl font-bold text-gray-900">₹{listing.monthlyPrice.toLocaleString()}</span>
                                    <span className="text-sm text-gray-500">/month</span>
                                </div>
                            </div>

                            <button className="px-6 py-3 bg-gradient-to-r from-[#037166] to-[#025951] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#037166]/30 transition-all flex items-center space-x-2">
                                <span>View Details</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const displayListings = showNearby
        ? [...sortedListings].sort((a, b) => a.distance - b.distance)
        : sortedListings;

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
                            PGs matched for you
                        </h1>
                        <p className="text-white/90 text-lg mb-4">
                            Based on your preferences + location
                        </p>

                        {/* Filter Chips */}
                        {filterChips.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {filterChips.map((chip, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium flex items-center space-x-2"
                                    >
                                        <span>{chip}</span>
                                    </span>
                                ))}
                            </div>
                        )}
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
                                placeholder="Search by area, landmark, hostel name..."
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
                {/* Recommended Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#037166] to-[#025951] rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Recommended for you</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {recommendedListings.map((listing) => (
                            <PGCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                </motion.div>

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
                            All PGs ({sortedListings.length})
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
                </div>

                {/* Listings Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {displayListings.map((listing) => (
                        <PGCard key={listing.id} listing={listing} isNearby={showNearby} />
                    ))}
                </div>
            </div>
        </div>
    );
}
