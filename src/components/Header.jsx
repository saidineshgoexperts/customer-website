// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X, Search, User } from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';

// export function Header() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
//         ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#037166]/20 shadow-lg shadow-[#037166]/5'
//         : 'bg-transparent'
//         }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link href="/">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center space-x-2"
//             >
//               <Image
//                 src="/d-hub-logo.png"
//                 alt="Doorstep Hub"
//                 width={90}
//                 height={90}
//                 className="object-contain"
//                 priority
//               />
//               {/* <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 Doorstep Hub
//               </span> */}
//             </motion.div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             {['Appliance Services', 'Religious Services', 'PG & Hostels'].map((item) => (
//               <motion.a
//                 key={item}
//                 href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
//                 className="text-gray-300 hover:text-[#037166] transition-colors relative group"
//                 whileHover={{ y: -2 }}
//               >
//                 {item}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
//               </motion.a>
//             ))}

//             {/* MORE DROPDOWN */}
//             <div className="relative group">
//               <motion.button
//                 whileHover={{ y: -2 }}
//                 className="text-gray-300 hover:text-[#037166] transition-colors relative"
//               >
//                 More
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
//               </motion.button>

//               {/* Dropdown */}
//               <div className="absolute top-full left-0 mt-3 w-48 bg-[#0f0f0f]/90 backdrop-blur-xl border border-[#037166]/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                 <a
//                   href="#spa-&-salon"
//                   className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition"
//                 >
//                   Spa & Salon
//                 </a>


//                 <a
//                   href="#spa-&-salon"
//                   className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition"
//                 >
//                   Share Ride
//                 </a>
//                 <a
//                   href="#spa-&-salon"
//                   className="block px-4 py-3 text-sm text-gray-300 hover:text-[#037166] hover:bg-[#037166]/10 rounded-xl transition"
//                 >
//                   Order Medicine
//                 </a>
//               </div>
//             </div>
//           </nav>


//           {/* Right Actions */}
//           <div className="flex items-center space-x-4">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#037166]/20 border border-[#037166]/30 transition-all"
//             >
//               <Search className="w-5 h-5 text-[#037166]" />
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#037166]/20 border border-[#037166]/30 transition-all"
//             >
//               <User className="w-5 h-5 text-[#037166]" />
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-[#037166] to-[#025951] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#037166]/40 transition-all"
//             >
//               Get Started
//             </motion.button>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 rounded-xl bg-[#1a1a1a] border border-[#037166]/30"
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-6 h-6 text-[#037166]" />
//               ) : (
//                 <Menu className="w-6 h-6 text-[#037166]" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#037166]/20"
//           >
//             <div className="px-4 py-6 space-y-4">
//               {['Services', 'Booking', 'Spa & Saloons', 'PG & Hostels', 'Religious Services', 'More'].map((item) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
//                   className="block py-2 text-gray-300 hover:text-[#037166] transition-colors"
//                   whileTap={{ x: 10 }}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full px-6 py-3 bg-gradient-to-r from-[#037166] to-[#025951] rounded-full text-white font-medium"
//               >
//                 Get Started
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/10 backdrop-blur-md border-b border-white/10 shadow-lg shadow-white/5'
        : 'bg-transparent border-b border-transparent'
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
              <Image
                src="/d-hub-logo.png"
                alt="Doorstep Hub"
                width={90}
                height={90}
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {['Appliance Service', 'Spa Saloons', 'Pg Hostels', 'Religious Services'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                className="text-white/90 hover:text-white transition-all relative group px-3 py-1 rounded-lg hover:bg-[#037166]/10 font-medium text-sm xl:text-base"
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
                className="text-white/90 hover:text-white transition-all px-3 py-1 rounded-lg hover:bg-[#037166]/10 relative font-medium text-sm xl:text-base"
              >
                More
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
              </motion.button>

              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-3 w-48 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#037166]/30 rounded-2xl shadow-xl shadow-[#037166]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <a
                  href="#daily-needs"
                  className="block px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-[#037166]/20 rounded-xl transition-all"
                >
                  Daily Needs
                </a>
                <a
                  href="#share-ride"
                  className="block px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-[#037166]/20 rounded-xl transition-all"
                >
                  Share Ride
                </a>
                <a
                  href="#order-medicine"
                  className="block px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-[#037166]/20 rounded-xl transition-all"
                >
                  Order Medicine
                </a>
              </motion.div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Location Pill */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-xl transition-all shadow-lg shadow-black/5"
            >
              <div className="p-1 rounded-full bg-[#037166]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#037166]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Delivering to</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-white">Hyderabad</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </motion.button>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all shadow-lg shadow-black/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#037166]"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
            </motion.button>

            {/* User Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all shadow-lg shadow-black/5"
            >
              <User className="w-5 h-5 text-[#037166]" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-[#037166]/20 hover:bg-[#037166]/40 backdrop-blur-md border border-[#037166]/30 shadow-lg shadow-[#037166]/10 transition-all"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
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
            className="lg:hidden bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#037166]/30 shadow-2xl shadow-[#037166]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {['Services', 'Booking', 'Spa & Saloons', 'PG & Hostels', 'Religious Services', 'More'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="block py-3 px-4 text-white/90 hover:text-white hover:bg-[#037166]/20 rounded-xl transition-all font-medium"
                  whileTap={{ x: 10 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
