'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
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
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#037166] to-[#025951] rounded-xl flex items-center justify-center shadow-lg shadow-[#037166]/30">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Doorstep Hub
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
  {['Appliance Services', 'Religious Services', 'PG & Hostels'].map((item) => (
    <motion.a
      key={item}
      href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
      className="text-gray-300 hover:text-[#037166] transition-colors relative group"
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
      className="text-gray-300 hover:text-[#037166] transition-colors relative"
    >
      More
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
    </motion.button>

    {/* Dropdown */}
    <div className="absolute top-full left-0 mt-3 w-48 bg-[#0f0f0f]/90 backdrop-blur-xl border border-[#037166]/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <a
        href="#spa-&-salon"
        className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition"
      >
        Spa & Salon
      </a>


        <a
        href="#spa-&-salon"
        className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition"
      >
        Share Ride  
      </a>
       <a
        href="#spa-&-salon"
        className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition"
      >
        Order Medicine
      </a>
    </div>
  </div>
</nav>


          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#037166]/20 border border-[#037166]/30 transition-all"
            >
              <Search className="w-5 h-5 text-[#037166]" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#037166]/20 border border-[#037166]/30 transition-all"
            >
              <User className="w-5 h-5 text-[#037166]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-[#037166] to-[#025951] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#037166]/40 transition-all"
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#1a1a1a] border border-[#037166]/30"
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
            className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#037166]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {['Services', 'Booking', 'Spa & Saloons', 'PG & Hostels', 'Religious Services','More'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="block py-2 text-gray-300 hover:text-[#037166] transition-colors"
                  whileTap={{ x: 10 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#037166] to-[#025951] rounded-full text-white font-medium"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
