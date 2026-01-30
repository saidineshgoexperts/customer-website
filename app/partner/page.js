'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
    CheckCircle,
    TrendingUp,
    Users,
    Shield,
    Smartphone,
    ArrowRight,
    Download,
    Star,
    Wallet,
    Clock
} from 'lucide-react';
import Link from 'next/link';

export default function BecomePartnerPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#037166]/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#04a99d]/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#037166]/10 border border-[#037166]/20 text-[#04a99d] font-medium text-sm mb-6">
                                <Star className="w-4 h-4 fill-current" />
                                Join 10,000+ Professionals
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                                Grow Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#037166] to-[#04a99d]">
                                    Business
                                </span> With Us
                            </h1>
                            <p className="text-xl text-white/60 mb-8 leading-relaxed max-w-lg">
                                Join Doorstep Hub as a partner and get access to verified leads, timely payments, and the freedom to work on your own terms.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold hover:shadow-lg hover:shadow-[#037166]/30 transition-all transform hover:-translate-y-1">
                                    <Download className="w-6 h-6" />
                                    <div>
                                        <span className="block text-xs font-normal opacity-80">Download for</span>
                                        <span className="text-lg leading-none">Android</span>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all transform hover:-translate-y-1">
                                    <Download className="w-6 h-6" />
                                    <div>
                                        <span className="block text-xs font-normal opacity-80">Download for</span>
                                        <span className="text-lg leading-none">iOS</span>
                                    </div>
                                </button>
                            </div>
                        </motion.div>

                        {/* Right Image/Mockup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10 w-full max-w-md mx-auto aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] border-8 border-[#2a2a2a] shadow-2xl shadow-[#037166]/20 overflow-hidden">
                                {/* Simulated App UI */}
                                <div className="h-full bg-gradient-to-b from-[#0f1614] to-[#0a0a0a] p-6 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 rounded-2xl bg-[#037166]/20 flex items-center justify-center mb-6">
                                        <TrendingUp className="w-10 h-10 text-[#04a99d]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Partner Dashboard</h3>
                                    <p className="text-white/50 text-sm mb-8">Track earnings and manage bookings in one place.</p>

                                    <div className="w-full space-y-4">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#037166]/20 flex items-center justify-center">
                                                <Wallet className="w-5 h-5 text-[#04a99d]" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-xs text-white/50">Today's Earnings</div>
                                                <div className="font-bold text-white">₹2,450</div>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-xs text-white/50">New Leads</div>
                                                <div className="font-bold text-white">5 Active</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/4 -right-8 p-4 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-xl backdrop-blur-md z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-green-500/20">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/60">Success Rate</div>
                                        <div className="font-bold text-white">98%</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-[#0f1614]/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner With Us?</h2>
                        <p className="text-white/60 text-lg">We provide the technology and support you need to take your service business to the next level.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="w-8 h-8 text-[#04a99d]" />,
                                title: "Verified Customers",
                                desc: "Get access to a large base of verified customers looking for your specific services."
                            },
                            {
                                icon: <Wallet className="w-8 h-8 text-[#04a99d]" />,
                                title: "Guaranteed Payments",
                                desc: "Transparent pricing and timely payments directly to your bank account."
                            },
                            {
                                icon: <Clock className="w-8 h-8 text-[#04a99d]" />,
                                title: "Flexible Timings",
                                desc: "Be your own boss. Choose your working hours and availability status anytime."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#037166]/50 transition-colors group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#037166]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-[#037166] to-[#04a99d] rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Start Earning?</h2>
                                <div className="space-y-8">
                                    {[
                                        { step: "01", text: "Download the Partner App" },
                                        { step: "02", text: "Complete your profile & verification" },
                                        { step: "03", text: "Start accepting bookings" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-full bg-white text-[#037166] font-bold text-xl flex items-center justify-center flex-shrink-0">
                                                {item.step}
                                            </div>
                                            <p className="text-xl text-white font-medium">{item.text}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex gap-4">
                                    <button className="px-8 py-4 rounded-xl bg-white text-[#037166] font-bold hover:shadow-xl transition-all">
                                        Download App
                                    </button>
                                </div>
                            </div>

                            <div className="hidden lg:block relative">
                                <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-full" />
                                <Smartphone className="w-96 h-96 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 rotate-12" />
                                {/* Placeholder for phone mockup image overlay if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
