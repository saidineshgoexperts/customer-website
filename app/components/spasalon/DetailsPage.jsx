'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Star, MapPin, Clock, Heart, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/spasalon/ui/tabs';

const mockService = {
    id: 1,
    name: 'Luxury Hair Spa Treatment',
    provider: 'Lotus Spa & Wellness',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc2ODY1MjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 324,
    price: 999,
    duration: '60 min',
    distance: '2.5 km',
    address: '123, Madhapur Main Road, Hyderabad - 500081',
    description: 'Experience the ultimate relaxation with our luxury hair spa treatment. Our expert stylists use premium products to nourish and revitalize your hair.',
    includes: [
        'Deep conditioning treatment',
        'Scalp massage',
        'Hair wash with premium shampoo',
        'Blow dry and styling',
    ],
    reviews: [
        { name: 'Priya Sharma', rating: 5, comment: 'Amazing service! My hair feels so soft and healthy.', avatar: '👩‍💼' },
        { name: 'Anjali Reddy', rating: 5, comment: 'Best hair spa in the city. Highly recommended!', avatar: '👩‍🎓' },
        { name: 'Sneha Patel', rating: 4, comment: 'Great experience, will definitely come back.', avatar: '👩‍💻' },
    ],
};

export function DetailsPage() {
    const router = useRouter();
    const params = useParams();
    const [activeTab, setActiveTab] = useState('details');

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-32 pt-16">
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="fixed top-24 left-4 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-200"
            >
                <ArrowLeft className="w-5 h-5 text-gray-900" />
            </motion.button>

            {/* Hero Image */}
            <div className="relative h-[400px] overflow-hidden">
                <img
                    src={mockService.image}
                    alt={mockService.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                        {/* Left - Name & Provider */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {mockService.name}
                            </h1>
                            <p className="text-xl text-gray-600">{mockService.provider}</p>
                            <div className="flex items-center gap-2 mt-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{mockService.distance} away</span>
                            </div>
                        </div>

                        {/* Right - Quick Stats */}
                        <div className="flex flex-wrap gap-4">
                            {/* Rating Card */}
                            <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 rounded-2xl p-4 border border-[#F59E0B]/20 min-w-[120px]">
                                <div className="flex items-center justify-center mb-1">
                                    <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B] mr-1" />
                                    <span className="text-2xl font-bold text-gray-900">{mockService.rating}</span>
                                </div>
                                <div className="text-xs text-gray-500 text-center">{mockService.reviewCount} Reviews</div>
                            </div>

                            {/* Duration Card */}
                            <div className="bg-gradient-to-br from-[#C06C84]/10 to-[#C06C84]/5 rounded-2xl p-4 border border-[#C06C84]/20 min-w-[120px]">
                                <div className="flex items-center justify-center mb-1">
                                    <Clock className="w-5 h-5 text-[#C06C84] mr-1" />
                                    <span className="text-2xl font-bold text-gray-900">{mockService.duration}</span>
                                </div>
                                <div className="text-xs text-gray-500 text-center">Duration</div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-2">
                            <TabsList className="bg-transparent w-full grid grid-cols-3 gap-2">
                                <TabsTrigger
                                    value="details"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C06C84] data-[state=active]:to-[#6C5CE7] data-[state=active]:text-white rounded-xl"
                                >
                                    Details
                                </TabsTrigger>
                                <TabsTrigger
                                    value="reviews"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C06C84] data-[state=active]:to-[#6C5CE7] data-[state=active]:text-white rounded-xl"
                                >
                                    Reviews
                                </TabsTrigger>
                                <TabsTrigger
                                    value="about"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C06C84] data-[state=active]:to-[#6C5CE7] data-[state=active]:text-white rounded-xl"
                                >
                                    About
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Details Tab */}
                        <TabsContent value="details">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h3>
                                <p className="text-gray-700 leading-relaxed text-lg mb-6">{mockService.description}</p>

                                <h4 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h4>
                                <ul className="space-y-2">
                                    {mockService.includes.map((item, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-[#C06C84] rounded-full mr-3"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </TabsContent>

                        {/* Reviews Tab */}
                        <TabsContent value="reviews">
                            <div className="space-y-4">
                                {mockService.reviews.map((review, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C06C84] to-[#6C5CE7] flex items-center justify-center text-2xl flex-shrink-0">
                                                {review.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                            </div>
                                        </div>
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
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">About {mockService.provider}</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {mockService.provider} is a premium wellness center offering top-quality spa and salon services.
                                        Our expert staff is dedicated to providing you with the best experience.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-[#C06C84]/10 to-[#C06C84]/5 rounded-2xl p-8 border border-[#C06C84]/30">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-[#C06C84]" />
                                        Address
                                    </h3>
                                    <p className="text-gray-700 text-lg">{mockService.address}</p>
                                </div>
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>

            {/* Fixed Bottom CTA */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-50"
            >
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Service Price</div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-gray-900">
                                ₹{mockService.price}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/spa-salon/booking/address')}
                        className="px-12 py-4 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#C06C84]/40 transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                        Book Now
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
