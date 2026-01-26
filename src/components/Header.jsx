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
        ? 'bg-teal-500/10 backdrop-blur-3xl border-b border-teal-400/30 shadow-xl shadow-teal-900/20'
        : 'bg-teal-500/15 backdrop-blur-2xl border-b border-teal-400/20 shadow-lg shadow-teal-900/10'
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
          <nav className="hidden lg:flex items-center space-x-8">
            {['Appliance Services', 'Religious Services', 'PG & Hostels'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                className="text-gray-200/90 hover:text-white transition-all relative group backdrop-blur-sm px-3 py-1 rounded-lg hover:bg-white/5"
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
                className="text-gray-200/90 hover:text-white transition-all backdrop-blur-sm px-3 py-1 rounded-lg hover:bg-white/5 relative"
              >
                More
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#037166] to-[#02b39a] group-hover:w-full transition-all duration-300" />
              </motion.button>

              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-3 w-48 bg-gradient-to-br from-[#0f0f0f]/80 via-[#025951]/60 to-[#037166]/50 backdrop-blur-2xl border border-[#037166]/40 rounded-2xl shadow-2xl shadow-[#037166]/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <a
                  href="#spa-&-salon"
                  className="block px-4 py-3 text-sm text-gray-200/90 hover:text-white hover:bg-white/10 rounded-xl transition-all backdrop-blur-sm"
                >
                  Spa & Salon
                </a>

                <a
                  href="#share-ride"
                  className="block px-4 py-3 text-sm text-gray-200/90 hover:text-white hover:bg-white/10 rounded-xl transition-all backdrop-blur-sm"
                >
                  Share Ride
                </a>
                <a
                  href="#order-medicine"
                  className="block px-4 py-3 text-sm text-gray-200/90 hover:text-white hover:bg-white/10 rounded-xl transition-all backdrop-blur-sm"
                >
                  Order Medicine
                </a>
              </motion.div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#025951]/50 to-[#037166]/60 hover:from-[#037166]/70 hover:to-[#02b39a]/70 backdrop-blur-xl border border-[#037166]/50 rounded-xl transition-all shadow-lg shadow-[#037166]/30 hover:shadow-xl hover:shadow-[#037166]/50"
            >
              <Search className="w-5 h-5 text-white/90" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#025951]/50 to-[#037166]/60 hover:from-[#037166]/70 hover:to-[#02b39a]/70 backdrop-blur-xl border border-[#037166]/50 rounded-xl transition-all shadow-lg shadow-[#037166]/30 hover:shadow-xl hover:shadow-[#037166]/50"
            >
              <User className="w-5 h-5 text-white/90" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-[#037166] via-[#02b39a] to-[#025951] backdrop-blur-xl text-white font-medium rounded-2xl border border-[#037166]/50 shadow-xl shadow-[#037166]/40 hover:shadow-2xl hover:shadow-[#037166]/60 transition-all hover:from-[#02b39a] hover:to-[#037166]"
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-gradient-to-r from-[#025951]/60 to-[#037166]/70 backdrop-blur-xl border border-[#037166]/50 shadow-lg shadow-[#037166]/30 hover:shadow-xl hover:shadow-[#037166]/50 transition-all"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white/90" />
              ) : (
                <Menu className="w-6 h-6 text-white/90" />
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
            className="lg:hidden bg-gradient-to-b from-[#0a0a0a]/80 via-[#025951]/70 to-[#037166]/60 backdrop-blur-2xl border-t border-[#037166]/40 shadow-2xl shadow-[#037166]/30"
          >
            <div className="px-4 py-6 space-y-4">
              {['Services', 'Booking', 'Spa & Saloons', 'PG & Hostels', 'Religious Services', 'More'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="block py-3 px-4 text-gray-200/90 hover:text-white hover:bg-white/10 rounded-xl transition-all backdrop-blur-sm font-medium"
                  whileTap={{ x: 10 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-[#037166] via-[#02b39a] to-[#025951] backdrop-blur-xl text-white font-semibold rounded-2xl border border-[#037166]/50 shadow-xl shadow-[#037166]/40 hover:shadow-2xl hover:shadow-[#037166]/60 transition-all"
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
