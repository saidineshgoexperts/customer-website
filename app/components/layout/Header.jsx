'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LocationBar } from '../location/LocationBar';
import { AuthModal } from '../auth/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#037166]/20 shadow-lg shadow-[#037166]/5'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center relative group flex-shrink-0"
              >
                <div className="relative w-48 h-14 overflow-hidden flex-shrink-0">
                  <Image
                    src="/d-hub-logo.png"
                    alt="Doorstep Hub Logo"
                    fill
                    sizes="192px"
                    className="object-contain"
                    priority
                  />
                </div>
                {/* <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent whitespace-nowrap -ml-2 mr-6">
                  Doorstep Hub
                </span> */}
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/appliances">
                <motion.span
                  className="text-gray-300 hover:text-[#037166] transition-colors relative group cursor-pointer font-medium whitespace-nowrap"
                  whileHover={{ y: -2 }}
                >
                  Appliance Services
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
                </motion.span>
              </Link>

              {['Religious Services', 'PG & Hostels'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-gray-300 hover:text-[#037166] transition-colors relative group font-medium whitespace-nowrap"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}

              {/* MORE DROPDOWN */}
              <div className="relative group">
                <motion.button
                  whileHover={{ y: -2 }}
                  className="text-gray-300 hover:text-[#037166] transition-colors relative font-medium whitespace-nowrap"
                >
                  More
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
                </motion.button>

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-[#0f0f0f]/95 backdrop-blur-xl border border-[#037166]/20 rounded-xl shadow-2xl z-50"
                >
                  <a
                    href="#spa-&-salon"
                    className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-t-xl transition-all"
                  >
                    Spa & Salon
                  </a>
                  <a
                    href="#share-ride"
                    className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 transition-all"
                  >
                    Share Ride
                  </a>
                  <a
                    href="#order-medicine"
                    className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-b-xl transition-all"
                  >
                    Order Medicine
                  </a>
                </motion.div>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <LocationBar />

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-[#1a1a1a] hover:bg-[#037166]/20 border border-[#037166]/30 transition-all relative shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 text-[#037166]" />
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#037166] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </motion.button>

              {/* Auth Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-[#1a1a1a] hover:bg-[#037166]/20 border border-[#037166]/30 transition-all overflow-hidden shadow-md hover:shadow-lg"
              >
                {isAuthenticated && user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-[#037166]" />
                )}
              </motion.button>

              {/* Get Started Button */}
              <Link href="/appliances">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-[#037166] to-[#025951] rounded-full text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#037166]/40 transition-all border border-[#037166]/30"
                >
                  Get Started
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-[#1a1a1a] border border-[#037166]/30 hover:bg-[#037166]/10 transition-all shadow-md hover:shadow-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#037166]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#037166]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#037166]/20 shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {[
                  'Appliance Services',
                  'Religious Services',
                  'PG & Hostels',
                  'Spa & Salons',
                  'Share Ride',
                  'Order Medicine'
                ].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                    className="block py-3 px-4 text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition-all font-medium text-base"
                    whileTap={{ x: 10 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-[#037166] to-[#025951] rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all border border-[#037166]/30"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
