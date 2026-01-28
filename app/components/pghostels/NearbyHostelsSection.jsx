'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Heart, Wifi, Utensils, Shirt, TrendingUp } from 'lucide-react';
import { useLocationContext } from '@/context/LocationContext';

export function NearbyHostelsSection({ router }) {
    const { location } = useLocationContext();
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNearbyHostels = async () => {
            setLoading(true);
            try {
                // Using 'latest_pg_hostels' as requested for the nearby section
                const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/products/latest_pg_hostels');

                if (!response.ok) {
                    throw new Error('Failed to fetch hostels');
                }

                const data = await response.json();

                if (data.success && Array.isArray(data.hostels)) {
                    setHostels(data.hostels);
                } else {
                    setHostels([]);
                }

            } catch (err) {
                console.error('Error fetching hostels:', err);
                setError('Failed to load hostels');
            } finally {
                setLoading(false);
            }
        };

        fetchNearbyHostels();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-12">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />
                    </div>
                    <div className="flex gap-6 overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-80 h-[400px] rounded-3xl bg-gray-200 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error || hostels.length === 0) {
        return null; // Don't show section if no hostels or error
    }

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#037166]/10 border border-[#037166]/20 mb-4">
                        <MapPin className="w-3 h-3 text-[#037166]" />
                        <span className="text-xs font-medium text-[#037166]">NEAR YOU</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Hostels Near You
                    </h2>
                    <p className="text-xl text-gray-600">
                        {location?.city ? `Best PG hostels in ${location.city}` : 'Discover nearby accommodations'}
                    </p>
                </motion.div>

                {/* Horizontal Scroll */}
                <div className="relative">
                    <div className="overflow-x-auto scrollbar-hide pb-4">
                        <div className="flex gap-6 min-w-max">
                            {hostels.map((hostel, index) => (
                                <motion.div
                                    key={hostel._id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    onClick={() => router.push(`/pghostels/hostel-detail/${hostel._id}`)}
                                    className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 w-80"
                                >
                                    {/* Popular Badge */}
                                    {index < 3 && (
                                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] shadow-lg">
                                            <TrendingUp className="w-3 h-3 text-white" />
                                            <span className="text-xs font-medium text-white">Popular</span>
                                        </div>
                                    )}

                                    <div className="relative h-72">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                            style={{ backgroundImage: `url("https://api.doorstephub.com/${hostel.image}")` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30">
                                            <Heart className="w-5 h-5 text-white" />
                                        </button>

                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-2xl font-bold text-white mb-2">{hostel.hostelName}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/90 flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    {hostel.address || hostel.cityName}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    {[Wifi, Utensils, Shirt].map((Icon, j) => (
                                                        <div key={j} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                            <Icon className="w-4 h-4 text-white" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 flex items-center justify-between">
                                        <div>
                                            <span className="text-3xl font-bold text-gray-900">₹{parseInt(hostel.defaultPrice).toLocaleString()}</span>
                                            <span className="text-gray-500">/mo</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                                            <span className="font-semibold">{hostel.rating || 4.5}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
