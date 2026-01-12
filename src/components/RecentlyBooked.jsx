'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight, Users } from 'lucide-react';

const recentServices = [
  {
    image: 'https://images.unsplash.com/photo-1647022528152-52ed9338611d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25lciUyMHJlcGFpcnxlbnwxfHx8fDE3NjgwMzgxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'AC Service & Repair',
    description: 'Gas refill, filter cleaning, and maintenance',
    price: '₹699',
    bookings: 142,
  },
  {
    image: 'https://images.unsplash.com/photo-1703130931611-8daf760576cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzY4MDM4MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Emergency Plumbing',
    description: 'Leak fixes, pipe repairs, and installations',
    price: '₹599',
    bookings: 98,
  },
  {
    image: 'https://images.unsplash.com/photo-1576446468729-7674e99608f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nfGVufDF8fHx8MTc2ODAyODc2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Electrical Wiring',
    description: 'Switches, wiring, and electrical troubleshooting',
    price: '₹499',
    bookings: 127,
  },
  {
    image: 'https://images.unsplash.com/photo-1626081063434-79a2169791b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJwZW50ZXIlMjB3b29kd29ya3xlbnwxfHx8fDE3NjgwMzc5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Carpentry Services',
    description: 'Furniture repair, installation, and custom work',
    price: '₹799',
    bookings: 84,
  },
  {
    image: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzY4MDI1ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Professional Painting',
    description: 'Interior and exterior painting services',
    price: '₹1,499',
    bookings: 67,
  },
  {
    image: 'https://images.unsplash.com/photo-1622906608804-6c6ce517a6f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXN0JTIwY29udHJvbCUyMHNlcnZpY2V8ZW58MXx8fHwxNzY3OTYwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Pest Control',
    description: 'Complete home pest control and prevention',
    price: '₹899',
    bookings: 156,
  },
];

export function RecentlyBooked() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#037166]/10 border border-[#037166]/20 mb-4"
          >
            <TrendingUp className="w-3 h-3 text-[#04a99d]" />
            <span className="text-xs font-medium text-[#04a99d]">TRENDING NOW</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            Explore Our Recently Booked Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            See what services your neighbors are booking right now
          </motion.p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max">
              {recentServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 backdrop-blur-sm">
                    {/* Booking Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <Users className="w-4 h-4 text-[#04a99d]" />
                      <span className="text-sm font-medium text-white">Booked {service.bookings} times</span>
                    </div>

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Hover Glow */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-[#037166]/30 to-transparent"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#04a99d] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        {service.description}
                      </p>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/50 mb-1">From</p>
                          <p className="text-2xl font-bold text-white">{service.price}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium text-sm shadow-lg shadow-[#037166]/30 group-hover:shadow-[#037166]/50 transition-all flex items-center gap-2"
                        >
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Glass Border on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 rounded-2xl border-2 border-[#037166]/50 pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
