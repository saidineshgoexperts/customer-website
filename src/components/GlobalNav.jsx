'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, User, Home, Briefcase, Calendar, MapPin, Tag, ChevronRight } from 'lucide-react';

export function GlobalNav({ currentPage = 'home', breadcrumbs }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (href) => {
    router.push(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Briefcase },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Nearby', href: '/nearby', icon: MapPin },
    { name: 'Offers', href: '/offers', icon: Tag },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-lg'
            : 'bg-[#0a0a0a]/60 backdrop-blur-xl'
          }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(3, 113, 102, 0.2)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 20px rgba(3, 113, 102, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 relative group"
            >
              <Image
                src="/d-hub-logo.png"
                alt="Doorstep Hub"
                width={90}
                height={90}
                className="object-contain"
                priority
              />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SuperHub
              </span>

              {/* Animated Sketch Underline */}
              <svg className="absolute -bottom-1 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.path
                  d="M 0 2 Q 40 0, 80 2"
                  stroke="#037166"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </svg>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.name.toLowerCase();
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                    className="relative px-4 py-2 group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-[#037166]' : 'text-gray-400 group-hover:text-[#037166]'} transition-colors`} />
                      <span className={`text-sm font-medium ${isActive ? 'text-[#037166]' : 'text-gray-300 group-hover:text-[#037166]'} transition-colors`}>
                        {item.name}
                      </span>
                    </div>

                    {/* Active Tab Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 bg-[#037166]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                    />
                  </motion.a>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#037166]/20 border border-[#037166]/30 transition-all"
              >
                <Search className="w-5 h-5 text-[#037166]" />
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

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="border-t border-[#037166]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center space-x-2 text-sm overflow-x-auto">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <motion.a
                      href={crumb.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(crumb.href);
                      }}
                      whileHover={{ x: 2 }}
                      className={`whitespace-nowrap ${index === breadcrumbs.length - 1
                          ? 'text-[#037166] font-medium'
                          : 'text-gray-400 hover:text-[#037166]'
                        } transition-colors relative group`}
                    >
                      {crumb.label}
                      {/* Sketch underline on hover */}
                      <motion.svg
                        className="absolute -bottom-1 left-0 w-full h-1 opacity-0 group-hover:opacity-100"
                        initial={{ pathLength: 0 }}
                        whileHover={{ pathLength: 1 }}
                      >
                        <path
                          d={`M 0 2 L ${crumb.label.length * 6} 2`}
                          stroke="#037166"
                          strokeWidth="1"
                          fill="none"
                        />
                      </motion.svg>
                    </motion.a>
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="absolute top-0 right-0 bottom-0 w-80 bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-[#037166]/20"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="self-end p-2 rounded-xl bg-[#1a1a1a] border border-[#037166]/30 mb-8"
                >
                  <X className="w-6 h-6 text-[#037166]" />
                </button>

                {/* Menu Items */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = currentPage === item.name.toLowerCase();
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.98, x: 5 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${isActive
                            ? 'bg-gradient-to-r from-[#037166]/20 to-[#025951]/20 border border-[#037166]'
                            : 'bg-[#1a1a1a]/50 border border-[#037166]/20 hover:border-[#037166]/40'
                          }`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-[#037166]' : 'text-gray-400'}`} />
                        <span className={`font-medium ${isActive ? 'text-[#037166]' : 'text-white'}`}>
                          {item.name}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-[#037166] rounded-full animate-pulse" />
                        )}
                      </motion.a>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
