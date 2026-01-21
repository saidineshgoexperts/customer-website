'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Home, Smartphone, Download, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ThankYouPage({ bookingDetails }) {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f1614] to-[#0a0a0a] flex items-center justify-center px-4 py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#037166] to-[#04a99d] rounded-full blur-2xl opacity-50 animate-pulse" />
                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center">
                            <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </motion.div>

                {/* Thank You Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-[#04a99d]" />
                        Thank You!
                    </h1>
                    <p className="text-xl text-white/80 mb-2">Your booking has been confirmed</p>
                    <p className="text-white/60">We've sent a confirmation to your email and SMS</p>
                </motion.div>

                {/* Booking Details Card */}
                {bookingDetails && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 rounded-2xl p-6 mb-8"
                    >
                        <h3 className="text-lg font-bold text-white mb-4">Booking Details</h3>
                        <div className="space-y-3">
                            {bookingDetails.date && (
                                <div className="flex items-center gap-3 text-white/80">
                                    <Calendar className="w-5 h-5 text-[#04a99d]" />
                                    <span>{bookingDetails.date}</span>
                                </div>
                            )}
                            {bookingDetails.time && (
                                <div className="flex items-center gap-3 text-white/80">
                                    <Clock className="w-5 h-5 text-[#04a99d]" />
                                    <span>{bookingDetails.time}</span>
                                </div>
                            )}
                            {bookingDetails.address && (
                                <div className="flex items-center gap-3 text-white/80">
                                    <MapPin className="w-5 h-5 text-[#04a99d]" />
                                    <span className="flex-1">{bookingDetails.address}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <button
                        onClick={handleGoHome}
                        className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#037166]/40 transition-all flex items-center justify-center gap-3"
                    >
                        <Home className="w-6 h-6" />
                        Back to Home
                    </button>
                </motion.div>

                {/* App Download Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 rounded-2xl p-6"
                >
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#037166]/20 mb-4">
                            <Smartphone className="w-8 h-8 text-[#04a99d]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Download Our Mobile App To Track Your Order</h3>
                        <p className="text-white/60 text-sm">Get exclusive deals and faster booking on our mobile app</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* iOS App */}
                        <a
                            href="https://apps.apple.com/app/doorstep-hub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#037166]/50 p-4 transition-all hover:bg-white/10"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#037166] to-[#04a99d] flex items-center justify-center flex-shrink-0">
                                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white/60 text-xs mb-1">Download on the</p>
                                    <p className="text-white font-bold text-lg">App Store</p>
                                </div>
                                <Download className="w-5 h-5 text-white/40 group-hover:text-[#04a99d] transition-colors" />
                            </div>
                        </a>

                        {/* Android App */}
                        <a
                            href="https://play.google.com/store/apps/details?id=com.doorstephub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#037166]/50 p-4 transition-all hover:bg-white/10"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#037166] to-[#04a99d] flex items-center justify-center flex-shrink-0">
                                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white/60 text-xs mb-1">GET IT ON</p>
                                    <p className="text-white font-bold text-lg">Google Play</p>
                                </div>
                                <Download className="w-5 h-5 text-white/40 group-hover:text-[#04a99d] transition-colors" />
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Footer Message */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-white/40 text-sm mt-8"
                >
                    Need help? Contact our support team 24/7
                </motion.p>
            </motion.div>
        </div>
    );
}
