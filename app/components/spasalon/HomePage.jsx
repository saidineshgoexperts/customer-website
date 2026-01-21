'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, Heart, ChevronRight, Sparkles, Award, Users, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QuestionnaireModal } from './QuestionnaireModal';
import Image from 'next/image';

const categories = [
    {
        id: 'haircut',
        name: 'Haircut & Styling',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc2ODY1MjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        icon: '✂️',
        description: 'Expert hair cutting & styling',
    },
    {
        id: 'facial',
        name: 'Facial & Skincare',
        image: 'https://images.unsplash.com/photo-1684014286330-ddbeb4a40c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBza2luY2FyZXxlbnwxfHx8fDE3Njg1NTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        icon: '✨',
        description: 'Glowing skin treatments',
    },
    {
        id: 'massage',
        name: 'Massage & Relaxation',
        image: 'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3Njg2NTI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        icon: '💆',
        description: 'Deep relaxation therapy',
    },
    {
        id: 'bridal',
        name: 'Bridal & Makeup',
        image: 'https://images.unsplash.com/photo-1625139108082-48bb424c2333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBhcnRpc3R8ZW58MXx8fHwxNzY4NTQyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        icon: '💐',
        description: 'Perfect bridal looks',
    },
    {
        id: 'manicure',
        name: 'Manicure & Pedicure',
        image: 'https://images.unsplash.com/photo-1634235421135-16ebd88c13c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZSUyMHBlZGljdXJlJTIwbmFpbHN8ZW58MXx8fHwxNzY4NTcwMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        icon: '💅',
        description: 'Beautiful nail care',
    },
    {
        id: 'waxing',
        name: 'Waxing & Threading',
        image: 'https://images.unsplash.com/photo-1706973320004-98a2fe6ddb7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHdheGluZ3xlbnwxfHx8fDE3Njg2NTI2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        icon: '🌿',
        description: 'Smooth skin solutions',
    },
];

const featuredPackages = [
    {
        id: 1,
        name: 'Glow Facial Combo',
        image: 'https://images.unsplash.com/photo-1684014286330-ddbeb4a40c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBza2luY2FyZXxlbnwxfHx8fDE3Njg1NTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.8,
        price: 1299,
        duration: '90 min',
        reviews: 234,
    },
    {
        id: 2,
        name: 'Deep Tissue Massage',
        image: 'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3Njg2NTI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.9,
        price: 1899,
        duration: '120 min',
        reviews: 456,
    },
    {
        id: 3,
        name: 'Bridal Trial Package',
        image: 'https://images.unsplash.com/photo-1625139108082-48bb424c2333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBhcnRpc3R8ZW58MXx8fHwxNzY4NTQyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5.0,
        price: 2999,
        duration: '180 min',
        reviews: 189,
    },
    {
        id: 4,
        name: 'Luxury Hair Spa',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc2ODY1MjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.7,
        price: 999,
        duration: '60 min',
        reviews: 321,
    },
    {
        id: 5,
        name: 'Party Makeup',
        image: 'https://images.unsplash.com/photo-1625139108082-48bb424c2333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBhcnRpc3R8ZW58MXx8fHwxNzY4NTQyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.6,
        price: 1499,
        duration: '75 min',
        reviews: 278,
    },
];

export function HomePage() {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white pt-16">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#FBEAF0] to-[#F4F3FF]">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Sparkles */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`sparkle-${i}`}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.8, 0.3],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-[#C06C84]" />
                        </motion.div>
                    ))}

                    {/* Floating Circles */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={`circle-${i}`}
                            className="absolute rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${50 + Math.random() * 100}px`,
                                height: `${50 + Math.random() * 100}px`,
                                background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(192, 108, 132, 0.1)' : 'rgba(108, 92, 231, 0.1)'}, transparent)`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 20, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#E8ECF2] mb-6 shadow-sm"
                            >
                                <Sparkles className="w-4 h-4 text-[#C06C84]" />
                                <span className="text-[#0F172A] text-sm">Premium Wellness Services</span>
                            </motion.div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] mb-6 leading-tight">
                                Glow Up.
                                <br />
                                <span className="text-[#C06C84]">Chill Out.</span>
                                <br />
                                Book in Minutes.
                            </h1>

                            <p className="text-xl text-[#64748B] mb-8">
                                Premium salon & spa services at home or nearby centers.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#C06C84]/50 transition-all flex items-center justify-center gap-2"
                                >
                                    Explore Spa Services
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => router.push('/spa-salon/booking/address')}
                                    className="px-8 py-4 bg-white text-[#C06C84] rounded-xl font-medium border-2 border-[#C06C84] hover:bg-[#C06C84] hover:text-white transition-all"
                                >
                                    Book Appointment Now
                                </motion.button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-12">
                                <StatCard icon={<Users />} value="50K+" label="Happy Clients" />
                                <StatCard icon={<Award />} value="500+" label="Expert Staff" />
                                <StatCard icon={<Star />} value="4.9" label="Avg Rating" />
                            </div>
                        </motion.div>

                        {/* Right Side - Floating Service Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px] hidden lg:block"
                        >
                            {['Facial', 'Hair Spa', 'Massage', 'Makeup', 'Mani-Pedi'].map((service, index) => (
                                <motion.div
                                    key={service}
                                    className="absolute bg-white border border-[#E8ECF2] rounded-2xl p-6 shadow-xl"
                                    style={{
                                        left: `${(index % 2) * 50}%`,
                                        top: `${index * 15}%`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 2, 0, -2, 0],
                                    }}
                                    transition={{
                                        duration: 4 + index,
                                        repeat: Infinity,
                                        delay: index * 0.2,
                                    }}
                                    whileHover={{ scale: 1.1, zIndex: 10 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-[#C06C84]/20 to-[#6C5CE7]/20 rounded-xl flex items-center justify-center text-2xl">
                                            {['✨', '💇', '💆', '💄', '💅'][index]}
                                        </div>
                                        <div>
                                            <p className="text-[#0F172A] font-semibold">{service}</p>
                                            <div className="flex items-center gap-1 text-[#FBBF24] text-sm">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="text-[#0F172A]">4.{8 - index}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Explore Categories */}
            <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F7FB]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                            Explore <span className="text-[#C06C84]">Categories</span>
                        </h2>
                        <p className="text-xl text-[#64748B]">
                            Step into different worlds of wellness
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                onClick={() => handleCategoryClick(category)}
                                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* White Glass Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />

                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="text-5xl mb-3">{category.icon}</div>
                                    <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{category.name}</h3>
                                    <p className="text-[#64748B]">{category.description}</p>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-[#C06C84] rounded-3xl" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Packages */}
            <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Featured Packages</h2>
                        <p className="text-xl text-[#64748B]">Most booked this week</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredPackages.slice(0, 3).map((pkg, index) => (
                            <PackageCard key={pkg.id} package={pkg} index={index} router={router} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Booked */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F7FB]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Booked Near You</h2>
                        <p className="text-[#64748B]">Popular choices in your area</p>
                    </motion.div>

                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {featuredPackages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-80"
                            >
                                <RecentlyBookedCard package={pkg} router={router} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nearby Spa Centers */}
            <section id="nearby" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Nearby Spa Centers</h2>
                            <p className="text-[#64748B]">Top-rated centers in your vicinity</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => router.push('/spa-salon/results')}
                            className="text-[#C06C84] hover:text-[#6C5CE7] flex items-center gap-2 transition-colors"
                        >
                            View All
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((_, index) => (
                            <NearbyCenterCard key={index} index={index} router={router} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommended For You */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F7FB]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
                            Recommended Based on Your <span className="text-[#C06C84]">Mood</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MoodCard
                            mood="Relax Mode"
                            service="Stress Relief Massage"
                            image="https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3Njg2NTI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            color="#C06C84"
                            router={router}
                        />
                        <MoodCard
                            mood="Glow Mode"
                            service="Skin Brightening Facial"
                            image="https://images.unsplash.com/photo-1684014286330-ddbeb4a40c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBza2luY2FyZXxlbnwxfHx8fDE3Njg1NTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            color="#6C5CE7"
                            router={router}
                        />
                        <MoodCard
                            mood="Event Ready"
                            service="Party Makeup"
                            image="https://images.unsplash.com/photo-1625139108082-48bb424c2333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBhcnRpc3R8ZW58MXx8fHwxNzY4NTQyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                            color="#22C55E"
                            router={router}
                        />
                    </div>
                </div>
            </section>

            {/* Beauty & Wellness Tips */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Beauty & Wellness Tips</h2>
                        <p className="text-xl text-[#64748B]">Expert advice for your beauty routine</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <BlogCard
                            title="5 Skincare Routine Tips"
                            image="https://images.unsplash.com/photo-1684014286330-ddbeb4a40c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBza2luY2FyZXxlbnwxfHx8fDE3Njg1NTQxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            readTime="5 min read"
                        />
                        <BlogCard
                            title="Bridal Prep Timeline"
                            image="https://images.unsplash.com/photo-1625139108082-48bb424c2333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBhcnRpc3R8ZW58MXx8fHwxNzY4NTQyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                            readTime="8 min read"
                        />
                        <BlogCard
                            title="Hair Care Guide"
                            image="https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaW5nfGVufDF8fHx8MTc2ODY1MjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                            readTime="6 min read"
                        />
                    </div>
                </div>
            </section>

            {/* Questionnaire Modal */}
            <QuestionnaireModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                categoryName={selectedCategory?.name || ''}
                categoryId={selectedCategory?.id || ''}
            />
        </div>
    );
}

// Helper Components
function StatCard({ icon, value, label }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
        >
            <div className="w-12 h-12 bg-gradient-to-r from-[#C06C84]/20 to-[#6C5CE7]/20 rounded-xl flex items-center justify-center text-[#C06C84] mx-auto mb-2">
                {icon}
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
            <p className="text-sm text-[#64748B]">{label}</p>
        </motion.div>
    );
}

function PackageCard({ package: pkg, index, router }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => router.push(`/spa-salon/detail/${pkg.id}`)}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8ECF2] cursor-pointer group shadow-lg hover:shadow-xl transition-all"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#C06C84] hover:bg-white transition-colors"
                >
                    <Heart className="w-5 h-5" />
                </motion.button>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-2">{pkg.name}</h3>

                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-[#0F172A]">{pkg.rating}</span>
                        <span className="text-[#64748B] text-sm">({pkg.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#64748B]">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{pkg.duration}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-[#0F172A]">₹{pkg.price}</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#C06C84]/50 transition-all"
                    >
                        Book Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

function RecentlyBookedCard({ package: pkg, router }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={() => router.push(`/spa-salon/detail/${pkg.id}`)}
            className="bg-white rounded-xl overflow-hidden border border-[#E8ECF2] cursor-pointer shadow-md hover:shadow-lg transition-all"
        >
            <div className="relative h-32">
                <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-3 py-1 bg-[#22C55E] text-white text-xs rounded-full">
                    Available Today
                </div>
            </div>

            <div className="p-4">
                <h4 className="text-[#0F172A] font-semibold mb-1">{pkg.name}</h4>
                <div className="flex items-center gap-1 text-[#FBBF24] text-sm mb-2">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[#0F172A]">{pkg.rating}</span>
                </div>
                <p className="text-[#C06C84] font-bold">₹{pkg.price}</p>
            </div>
        </motion.div>
    );
}

function NearbyCenterCard({ index, router }) {
    const centers = [
        {
            name: 'Lotus Spa & Wellness',
            image: 'https://images.unsplash.com/photo-1760882206955-f4e8321cc9f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBjZW50ZXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg2NTI2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
            location: 'Madhapur, 2.5 km',
            rating: 4.8,
            price: 599,
        },
        {
            name: 'Radiance Beauty Studio',
            image: 'https://images.unsplash.com/photo-1633692315409-a23e338c5cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg2MzQwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            location: 'Gachibowli, 3.2 km',
            rating: 4.9,
            price: 799,
        },
        {
            name: 'Serenity Spa Center',
            image: 'https://images.unsplash.com/photo-1690552153723-32572f195000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHNwYSUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3Njg2NTI2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            location: 'Kondapur, 4.1 km',
            rating: 4.7,
            price: 699,
        },
        {
            name: 'Glamour Salon & Spa',
            image: 'https://images.unsplash.com/photo-1667235195726-a7c440bca9bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB3ZWxsbmVzc3xlbnwxfHx8fDE3Njg1NTcwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            location: 'Hitech City, 1.8 km',
            rating: 5.0,
            price: 899,
        },
    ];

    const center = centers[index];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => router.push(`/spa-salon/detail/${index + 1}`)}
            className="bg-white rounded-xl overflow-hidden border border-[#E8ECF2] cursor-pointer shadow-md hover:shadow-lg transition-all"
        >
            <div className="relative h-40">
                <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h4 className="text-[#0F172A] font-semibold mb-2">{center.name}</h4>
                <div className="flex items-center gap-1 text-[#64748B] text-sm mb-2">
                    <MapPin className="w-4 h-4 text-[#C06C84]" />
                    <span>{center.location}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-[#0F172A]">{center.rating}</span>
                    </div>
                    <p className="text-[#0F172A]">Starting ₹{center.price}</p>
                </div>
            </div>
        </motion.div>
    );
}

function MoodCard({ mood, service, image, color, router }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/spa-salon/detail/1')}
            className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group"
        >
            <img
                src={image}
                alt={service}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div
                    className="inline-block px-4 py-2 rounded-full text-white text-sm mb-3 self-start"
                    style={{ backgroundColor: color }}
                >
                    {mood}
                </div>
                <h3 className="text-2xl font-bold text-white">{service}</h3>
            </div>
        </motion.div>
    );
}

function BlogCard({ title, image, readTime }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8ECF2] cursor-pointer shadow-md hover:shadow-lg transition-all"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{title}</h3>
                <div className="flex items-center gap-2 text-[#64748B]">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">{readTime}</span>
                </div>
            </div>
        </motion.div>
    );
}
