'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SpaSalonNavbar() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg'
                : 'bg-white/60 backdrop-blur-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        className="flex-shrink-0 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push('/')}
                    >
                        <h1 className="text-xl font-bold text-[#0F172A]">
                            D-<span className="text-[#C06C84]">Hub</span>
                        </h1>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLink onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>
                            Categories
                        </NavLink>
                        <NavLink onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
                            Featured
                        </NavLink>
                        <NavLink onClick={() => document.getElementById('nearby')?.scrollIntoView({ behavior: 'smooth' })}>
                            Nearby
                        </NavLink>

                        {/* More Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setMoreOpen(!moreOpen)}
                                className="text-[#0F172A] hover:text-[#C06C84] transition-colors flex items-center gap-1 group"
                            >
                                More
                                <ChevronDown className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C06C84] group-hover:w-full transition-all duration-300" />
                            </button>

                            {moreOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-[#E8ECF2] overflow-hidden min-w-[200px]"
                                >
                                    <DropdownItem onClick={() => router.push('/pghostels')}>PG & Hostels</DropdownItem>
                                    <DropdownItem onClick={() => router.push('/services')}>Services</DropdownItem>
                                    <DropdownItem onClick={() => router.push('/appliances')}>Appliances</DropdownItem>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Location */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F6F7FB] hover:bg-[#E8ECF2] transition-colors border border-[#E8ECF2]"
                        >
                            <MapPin className="w-4 h-4 text-[#C06C84]" />
                            <span className="text-sm text-[#0F172A]">Hyderabad, Madhapur</span>
                        </motion.button>

                        {/* Cart */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 text-[#0F172A] hover:text-[#C06C84] transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-[#C06C84] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </motion.button>

                        {/* Contact Us */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-[#F6F7FB] hover:bg-[#E8ECF2] text-[#0F172A] rounded-lg border border-[#E8ECF2] transition-colors"
                        >
                            Contact Us
                        </motion.button>

                        {/* Sign In */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#C06C84]/50 transition-all"
                        >
                            Sign In
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-[#0F172A] p-2"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden py-4 border-t border-[#E8ECF2]"
                    >
                        <div className="flex flex-col space-y-3">
                            <MobileNavLink onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>
                                Categories
                            </MobileNavLink>
                            <MobileNavLink onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
                                Featured
                            </MobileNavLink>
                            <MobileNavLink onClick={() => document.getElementById('nearby')?.scrollIntoView({ behavior: 'smooth' })}>
                                Nearby
                            </MobileNavLink>

                            <div className="pt-3 border-t border-[#E8ECF2] space-y-2">
                                <button className="w-full px-4 py-2 bg-[#F6F7FB] text-[#0F172A] rounded-lg text-left flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#C06C84]" />
                                    Hyderabad, Madhapur
                                </button>
                                <button className="w-full px-4 py-2 bg-[#F6F7FB] text-[#0F172A] rounded-lg">
                                    Contact Us
                                </button>
                                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white rounded-lg">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}

function NavLink({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="text-[#0F172A] hover:text-[#C06C84] transition-colors relative group"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C06C84] group-hover:w-full transition-all duration-300" />
        </button>
    );
}

function MobileNavLink({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="text-[#0F172A] hover:text-[#C06C84] transition-colors px-4 py-2 rounded-lg hover:bg-[#F6F7FB] text-left w-full"
        >
            {children}
        </button>
    );
}

function DropdownItem({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left px-4 py-3 text-[#0F172A] hover:bg-[#F6F7FB] hover:text-[#C06C84] transition-colors"
        >
            {children}
        </button>
    );
}
