'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft, Star, TrendingUp, DollarSign, Wifi, Utensils, Shirt, Zap,
    Car, Shield, Camera, MessageSquare, Sparkles, MapPin, Clock, Check, X
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/pghostels/ui/tabs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const mockHostelData = {
    id: '1',
    name: 'MAHENDRA A',
    location: 'Koramangala, Bangalore',
    address: '123, 5th Main Road, Koramangala 1st Block, Bangalore - 560034',
    rating: 4.3,
    orders: 8,
    basePrice: 175,
    monthlyPrice: 6500,
    logo: 'https://images.unsplash.com/photo-1730096081994-73f1fa5f189a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjByZWNlcHRpb24lMjBkZXNrfGVufDF8fHx8MTc2ODY0NjcxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
        'https://images.unsplash.com/photo-1617430690223-3e165b390e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg2NDU4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1760067538068-03d10481bacb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaG9zdGVsJTIwcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3Njg2NDY3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1707598973296-255b29445512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xpdmluZyUyMHdvcmtzcGFjZSUyMGxvdW5nZXxlbnwxfHx8fDE3Njg2NDY3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1758523417133-41f21fb9f058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2ODY0NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg2MjY5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1709805619372-40de3f158e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBiZWRyb29tJTIwZG9ybWl0b3J5fGVufDF8fHx8MTc2ODY0NTg5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: [
        { icon: Wifi, label: 'High-Speed WiFi', available: true },
        { icon: Utensils, label: '3 Meals Daily', available: true },
        { icon: Shirt, label: 'Laundry Service', available: true },
        { icon: Zap, label: 'Power Backup', available: true },
        { icon: Car, label: 'Parking', available: true },
        { icon: Shield, label: '24/7 Security', available: true },
        { icon: Sparkles, label: 'AC Rooms', available: false },
        { icon: Camera, label: 'CCTV', available: true },
    ],
    reviews: [
        {
            name: 'Priya Sharma',
            avatar: '👩‍💼',
            rating: 5,
            date: '2 days ago',
            comment: 'Excellent PG with great facilities. The food is amazing and the staff is very friendly. Highly recommended for working professionals.'
        },
        {
            name: 'Rahul Kumar',
            avatar: '👨‍💻',
            rating: 4,
            date: '1 week ago',
            comment: 'Very clean and well-maintained. Good WiFi speed. Only issue is parking can be tight during peak hours.'
        },
        {
            name: 'Sneha Patel',
            avatar: '👩‍🎓',
            rating: 5,
            date: '2 weeks ago',
            comment: 'Perfect location near my office. The rooms are spacious and the management is responsive to any issues.'
        },
    ],
    about: 'MAHENDRA A is a premium PG accommodation located in the heart of Koramangala. We provide comfortable, safe, and affordable living spaces for students and working professionals. Our facility offers modern amenities, home-cooked meals, and a friendly community atmosphere.',
    rules: [
        { rule: 'Entry time: 11:00 PM', allowed: true },
        { rule: 'Visitors allowed with prior notice', allowed: true },
        { rule: 'No smoking inside premises', allowed: false },
        { rule: 'Monthly payment in advance', allowed: true },
    ],
};

export default function NewHostelDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [activeTab, setActiveTab] = useState('portfolio');
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-32">
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="fixed top-24 left-4 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-200"
            >
                <ArrowLeft className="w-5 h-5 text-gray-900" />
            </motion.button>

            {/* Image Gallery Slider */}
            <motion.div
                style={{ opacity: headerOpacity }}
                className="relative h-[500px] overflow-hidden"
            >
                <Slider {...sliderSettings}>
                    {mockHostelData.images.map((image, index) => (
                        <div key={index} className="relative h-[500px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>
                    ))}
                </Slider>
            </motion.div>

            {/* Hostel Header Info - Floating Card */}
            <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        {/* Left - Name & Logo */}
                        <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-200 flex-shrink-0">
                                <img
                                    src={mockHostelData.logo}
                                    alt={mockHostelData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {mockHostelData.name}
                                </h1>
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{mockHostelData.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Quick Stats */}
                        <div className="flex flex-wrap gap-4">
                            {/* Rating Card */}
                            <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 rounded-2xl p-4 border border-[#F59E0B]/20 min-w-[120px]">
                                <div className="flex items-center justify-center mb-1">
                                    <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B] mr-1" />
                                    <span className="text-2xl font-bold text-gray-900">{mockHostelData.rating}</span>
                                </div>
                                <div className="text-xs text-gray-500 text-center">Rating</div>
                            </div>

                            {/* Orders Card */}
                            <div className="bg-gradient-to-br from-[#037166]/10 to-[#037166]/5 rounded-2xl p-4 border border-[#037166]/20 min-w-[120px]">
                                <div className="flex items-center justify-center mb-1">
                                    <TrendingUp className="w-5 h-5 text-[#037166] mr-1" />
                                    <span className="text-2xl font-bold text-gray-900">{mockHostelData.orders}</span>
                                </div>
                                <div className="text-xs text-gray-500 text-center">Orders</div>
                            </div>

                            {/* Base Price Card */}
                            <div className="bg-gradient-to-br from-[#037166]/10 to-[#037166]/5 rounded-2xl p-4 border border-[#037166]/20 min-w-[120px]">
                                <div className="flex items-center justify-center mb-1">
                                    <DollarSign className="w-5 h-5 text-[#037166] mr-1" />
                                    <span className="text-2xl font-bold text-gray-900">₹{mockHostelData.basePrice}</span>
                                </div>
                                <div className="text-xs text-gray-500 text-center">Base Price</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    {/* Sticky Tab Navigation */}
                    <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-2">
                        <TabsList className="bg-transparent w-full grid grid-cols-4 gap-2">
                            <TabsTrigger
                                value="portfolio"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#037166] data-[state=active]:to-[#025951] data-[state=active]:text-white rounded-xl"
                            >
                                <Camera className="w-4 h-4 mr-2" />
                                Portfolio
                            </TabsTrigger>
                            <TabsTrigger
                                value="reviews"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#037166] data-[state=active]:to-[#025951] data-[state=active]:text-white rounded-xl"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Reviews
                            </TabsTrigger>
                            <TabsTrigger
                                value="amenities"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#037166] data-[state=active]:to-[#025951] data-[state=active]:text-white rounded-xl"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Amenities
                            </TabsTrigger>
                            <TabsTrigger
                                value="about"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#037166] data-[state=active]:to-[#025951] data-[state=active]:text-white rounded-xl"
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                About
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Portfolio Tab */}
                    <TabsContent value="portfolio" className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid md:grid-cols-2 gap-4"
                        >
                            {mockHostelData.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${image})` }}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    {/* Reviews Tab */}
                    <TabsContent value="reviews" className="space-y-4">
                        {mockHostelData.reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            >
                                <div className="flex items-start space-x-4">
                                    {/* Avatar */}
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#037166] to-[#025951] flex items-center justify-center text-2xl flex-shrink-0">
                                        {review.avatar}
                                    </div>

                                    <div className="flex-1">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{review.date}</span>
                                                </div>
                                            </div>

                                            {/* Rating Stars */}
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating
                                                            ? 'fill-[#F59E0B] text-[#F59E0B]'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Comment */}
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </TabsContent>

                    {/* Amenities Tab */}
                    <TabsContent value="amenities">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {mockHostelData.amenities.map((amenity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`rounded-2xl p-6 border-2 transition-all ${amenity.available
                                        ? 'bg-gradient-to-br from-[#037166]/10 to-[#037166]/5 border-[#037166]/30 hover:border-[#037166]'
                                        : 'bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${amenity.available
                                                ? 'bg-[#037166]/20'
                                                : 'bg-gray-200'
                                                }`}
                                        >
                                            <amenity.icon
                                                className={`w-6 h-6 ${amenity.available ? 'text-[#037166]' : 'text-gray-400'
                                                    }`}
                                            />
                                        </div>
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center ${amenity.available
                                                ? 'bg-[#22C55E]/20'
                                                : 'bg-red-100'
                                                }`}
                                        >
                                            {amenity.available ? (
                                                <Check className="w-4 h-4 text-[#22C55E]" />
                                            ) : (
                                                <X className="w-4 h-4 text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                    <h4
                                        className={`font-semibold ${amenity.available ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                    >
                                        {amenity.label}
                                    </h4>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* About Tab */}
                    <TabsContent value="about">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Description */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">About the PG</h3>
                                <p className="text-gray-700 leading-relaxed text-lg">{mockHostelData.about}</p>
                            </div>

                            {/* Address */}
                            <div className="bg-gradient-to-br from-[#037166]/10 to-[#037166]/5 rounded-2xl p-8 border border-[#037166]/30">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-[#037166]" />
                                    Address
                                </h3>
                                <p className="text-gray-700 text-lg">{mockHostelData.address}</p>
                            </div>

                            {/* Rules */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">House Rules</h3>
                                <div className="space-y-4">
                                    {mockHostelData.rules.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl"
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.allowed
                                                    ? 'bg-[#22C55E]/20'
                                                    : 'bg-red-100'
                                                    }`}
                                            >
                                                {item.allowed ? (
                                                    <Check className="w-5 h-5 text-[#22C55E]" />
                                                ) : (
                                                    <X className="w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                            <span className="text-gray-700 text-lg">{item.rule}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Fixed Bottom CTA */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-50"
            >
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Monthly Price</div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-gray-900">
                                ₹{mockHostelData.monthlyPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">/month</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            ₹{mockHostelData.basePrice}/day base price
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/pghostels/booking/address')}
                        className="px-12 py-4 bg-gradient-to-r from-[#037166] to-[#025951] text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#037166]/40 transition-all transform hover:scale-105"
                    >
                        Continue to Book
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
