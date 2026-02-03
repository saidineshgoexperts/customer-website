'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Search, User, ShoppingCart, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LocationBar } from '../location/LocationBar';
import { AuthModal } from '../auth/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export function Header({ theme = {}, navItems = [] }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Default Theme (Landing Page / Dark)
  const defaultTheme = {
    bgScrolled: 'bg-[#0a0a0a]/80',
    bgMobile: 'bg-[#0a0a0a]/95',
    textMain: 'text-gray-300',
    textHover: 'text-[#037166]',
    border: 'border-[#037166]/20',
    accent: 'bg-[#037166]',
    accentGradientFrom: 'from-[#037166]',
    accentGradientTo: 'to-[#02b39a]',
    buttonBg: 'bg-[#1a1a1a]', // For icon buttons
    logoTextGradient: 'from-white to-gray-300', // If needed
  };

  const currentTheme = { ...defaultTheme, ...theme };

  // Default Navigation (Landing Page)
  const defaultNavItems = [
    { name: 'Appliance Services', href: '/services' },
    { name: 'Religious Services', href: '/religious-services' },
    { name: 'PG Hostels', href: '/pghostels' },
    {
      name: 'More',
      dropdown: [
        { name: 'Become a Partner', href: '/partner' },
        { name: 'Share Ride', href: '#share-ride' }
      ]
    }
  ];

  const [apiNavItems, setApiNavItems] = useState([]);

  // Fetch Services for Navigation
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/all-services');
        const data = await response.json();

        if (data.success && data.data) {
          const mappedItems = data.data.map(service => {
            let href = '#';
            const name = service.name.trim();

            if (name.toUpperCase() === 'APPLIANCE SERVICE') href = '/services';
            else if (name.toUpperCase() === 'RELIGIOUS SERVICES') href = '/religious-services';
            else if (name.toUpperCase() === 'PG HOSTELS') href = '/pghostels';
            else if (name.toUpperCase() === 'SPA SALONS') href = '/spa-salon';

            // Format Name: Title Case
            const formattedName = name
              .toLowerCase()
              .split(' ')
              .map(word => word.toUpperCase() === 'PG' ? 'PG' : (word.charAt(0).toUpperCase() + word.slice(1)))
              .join(' ');

            return { name: formattedName, href, originalService: service };
          });

          // Add 'More' dropdown for extra static items
          mappedItems.push({
            name: 'More',
            dropdown: [
              { name: 'Become a Partner', href: '/partner' },
              { name: 'Share Ride', href: '#share-ride' }
            ]
          });

          setApiNavItems(mappedItems);
        }
      } catch (error) {
        console.error("Failed to fetch nav services:", error);
      }
    };

    if (navItems.length === 0) {
      fetchServices();
    }
  }, []);

  const handleServiceClick = (item) => {
    if (item.originalService) {
      const serviceData = {
        id: item.originalService._id,
        name: item.originalService.name,
        servicetypeName: item.originalService.servicetypeName || item.originalService.name,
        image: item.originalService.image
      };
      localStorage.setItem('selectedService', JSON.stringify(serviceData));
    }
  };

  const menuItems = navItems.length > 0 ? navItems : (apiNavItems.length > 0 ? apiNavItems : defaultNavItems);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-item-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || pathname?.includes('/services') || pathname?.includes('/listings')
          ? `${currentTheme.bgScrolled} backdrop-blur-xl border-b ${currentTheme.border} shadow-lg shadow-[#037166]/5`
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
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav id="navbar-services" className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div key={index} className="relative nav-item-dropdown">
                  {item.dropdown ? (
                    <>
                      <motion.button
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        whileHover={{ y: -2 }}
                        className={`${currentTheme.textMain} hover:text-[#037166] transition-colors relative font-medium whitespace-nowrap flex items-center gap-1`}
                      >
                        {item.name}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-90' : ''}`} />
                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentTheme.accentGradientFrom} ${currentTheme.accentGradientTo} ${activeDropdown === index ? 'w-full' : ''} transition-all duration-300`} />
                      </motion.button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`absolute top-full left-0 mt-2 w-48 ${currentTheme.bgMobile} backdrop-blur-xl border ${currentTheme.border} rounded-xl shadow-2xl z-50 overflow-hidden`}
                          >
                            {item.dropdown.map((subItem, idx) => (
                              <Link key={idx} href={subItem.href} onClick={() => setActiveDropdown(null)}>
                                <span className={`block px-4 py-3 text-sm ${currentTheme.textMain} hover:text-[#037166] hover:bg-[#037166]/10 transition-all cursor-pointer`}>
                                  {subItem.name}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => handleServiceClick(item)}>
                      <motion.span
                        className={`${currentTheme.textMain} hover:text-[#037166] transition-colors relative group font-medium whitespace-nowrap cursor-pointer`}
                        whileHover={{ y: -2 }}
                      >
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentTheme.accentGradientFrom} ${currentTheme.accentGradientTo} group-hover:w-full transition-all duration-300`} />
                      </motion.span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <div id="location-bar">
                <LocationBar theme={currentTheme} />
              </div>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`hidden sm:flex items-center justify-center w-11 h-11 rounded-full ${currentTheme.buttonBg} hover:bg-[#037166]/20 border ${currentTheme.border} transition-all relative shadow-md hover:shadow-lg`}
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
                className={`flex items-center justify-center w-11 h-11 rounded-full ${currentTheme.buttonBg} hover:bg-[#037166]/20 border ${currentTheme.border} transition-all overflow-hidden shadow-md hover:shadow-lg`}
              >
                {isAuthenticated && user?.image ? (
                  <img
                    src={user.image?.startsWith('http') ? user.image : `https://api.doorstephub.com/${user.image}`}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-[#037166]" />
                )}
              </motion.button>



              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl ${currentTheme.buttonBg} border ${currentTheme.border} hover:bg-[#037166]/10 transition-all shadow-md hover:shadow-lg`}
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
              className={`lg:hidden ${currentTheme.bgMobile} backdrop-blur-xl border-t ${currentTheme.border} shadow-lg`}
            >
              <div className="px-4 py-6 space-y-4">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <div className={`block py-2 px-4 ${currentTheme.textMain} font-medium text-base opacity-70`}>{item.name}</div>
                        {item.dropdown.map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <motion.span
                              className={`block py-2 px-6 ${currentTheme.textMain} hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition-all font-medium text-sm cursor-pointer`}
                              whileTap={{ x: 10 }}
                            >
                              {subItem.name}
                            </motion.span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => {
                          handleServiceClick(item);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <motion.span
                          className={`block py-3 px-4 ${currentTheme.textMain} hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition-all font-medium text-base cursor-pointer`}
                          whileTap={{ x: 10 }}
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    )}
                  </div>
                ))}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} theme={currentTheme} />
    </>
  );
}
