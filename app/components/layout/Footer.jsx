'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const footerLinks = {

  Quicklinks: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    // { name: 'Press Kit', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Become a ServicePartner', href: '/partner' },

    { name: 'Download Android App', href: 'https://play.google.com/store/apps/details?id=com.doorstephub.partner' },

    { name: 'Download Ios App', href: 'https://apps.apple.com/in/app/doorstep-hub/id6448539336' },
  ],
  Moreinfo: [
    { name: 'FAQs', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'All Services', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/DoorstepHub/', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/doorstephub', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/doorstephub_india/', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/channel/UCTn8lV-nEbdWdwXolLAsMZA', label: 'YouTube' },
];

const additionalServices = [
  {
    title: 'PG & Hostels',
    basePath: '/pghostels',
    groups: [
      {
        id: 'pg', name: 'PG Services', subcategories: [
          { _id: 'men-pg', name: "Men's PG", query: 'type=men' },
          { _id: 'women-pg', name: "Women's PG", query: 'type=women' },
          { _id: 'coliving', name: "Co-living PG", query: 'type=coliving' },
          { _id: 'luxury-pg', name: "Luxury PG", query: 'type=luxury' }
        ]
      },
      {
        id: 'hostels', name: 'Hostels', subcategories: [
          { _id: 'student-hostel', name: 'Student Hostels', query: 'type=student' },
          { _id: 'working-hostel', name: 'Working Professionals Hostels', query: 'type=working' },
          { _id: 'backpackers', name: 'Backpacker Hostels', query: 'type=backpacker' }
        ]
      }
    ]
  },
  {
    title: 'Religious Services',
    basePath: '/religious-services',
    groups: [
      {
        id: 'pooja', name: 'Pooja Services', subcategories: [
          { _id: 'ganesh-pooja', name: 'Ganesh Pooja', query: 'service=ganesh' },
          { _id: 'satyanarayan', name: 'Satyanarayan Pooja', query: 'service=satyanarayan' },
          { _id: 'griha-pravesh', name: 'Griha Pravesh', query: 'service=grihapravesh' },
          { _id: 'office-pooja', name: 'Office Pooja', query: 'service=office' }
        ]
      },
      {
        id: 'pandit', name: 'Pandit Booking', subcategories: [
          { _id: 'wedding-pandit', name: 'Wedding Pandit', query: 'service=wedding' },
          { _id: 'funeral-priest', name: 'Funeral Services', query: 'service=funeral' },
          { _id: 'astrology', name: 'Vedic Astrology', query: 'service=astrology' }
        ]
      }
    ]
  },
  {
    title: 'Spa & Salon',
    basePath: '/spa-salon',
    groups: [
      {
        id: 'spa', name: 'Spa Therapies', subcategories: [
          { _id: 'thai-massage', name: 'Thai Massage', query: 'category=thai' },
          { _id: 'swedish-massage', name: 'Swedish Massage', query: 'category=swedish' },
          { _id: 'deep-tissue', name: 'Deep Tissue', query: 'category=deeptissue' },
          { _id: 'ayurvedic', name: 'Ayurvedic Spa', query: 'category=ayurvedic' }
        ]
      },
      {
        id: 'salon', name: 'Salon Services', subcategories: [
          { _id: 'haircut', name: 'Haircut & Styling', query: 'category=haircut' },
          { _id: 'facial', name: 'Facial Treatments', query: 'category=facial' },
          { _id: 'manicure', name: 'Manicure & Pedicure', query: 'category=manicure' },
          { _id: 'makeup', name: 'Bridal Makeup', query: 'category=makeup' }
        ]
      }
    ]
  }
];

export function Footer() {
  const [serviceGroups, setServiceGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Step 1: Fetch Categories
        const catResponse = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/getallcategorys', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lattitude: '17.4391296', longitude: '78.4433152' })
        });
        const catData = await catResponse.json();

        if (catData.success && Array.isArray(catData.data)) {
          // Step 2: Fetch subcategories for each category
          const groups = await Promise.all(catData.data.map(async (category) => {
            try {
              const subResponse = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/getsubcategorysbycategoryid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categoryId: category._id })
              });
              const subData = await subResponse.json();
              return {
                id: category._id,
                name: category.name,
                subcategories: subData.success && Array.isArray(subData.data) ? subData.data : []
              };
            } catch (err) {
              console.error(`Error fetching subcategories for ${category.name}:`, err);
              return { id: category._id, name: category.name, subcategories: [] };
            }
          }));

          setServiceGroups(groups);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0a] to-black border-t border-white/5">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#037166]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        {/* Explore Services Dynamic Section */}
        {!isLoading && serviceGroups.some(group => group.subcategories.length > 0) && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Appliance Services</h3>
              <div className="text-sm leading-8 text-gray-400">
                {serviceGroups.map((group, groupIdx) => (
                  group.subcategories.length > 0 && (
                    <span key={group.id} className="inline mr-1">
                      {/* Group Name */}
                      <Link
                        href={`/services/category/${group.id}?name=${encodeURIComponent(group.name)}`}
                        className="text-white font-bold hover:text-[#04a99d] transition-colors whitespace-nowrap mr-2"
                      >
                        {group.name}:
                      </Link>

                      {/* Subcategories */}
                      {group.subcategories.map((sub, idx) => (
                        <span key={sub._id} className="inline">
                          <Link
                            href={`/services/listing/${sub._id}?category=${encodeURIComponent(group.name)}&name=${encodeURIComponent(sub.name)}`}
                            className="text-white/70 hover:text-[#04a99d] transition-colors"
                          >
                            {sub.name}
                          </Link>
                          {/* Separator between subcategories */}
                          {idx < group.subcategories.length - 1 && (
                            <span className="mx-2 text-white/20">|</span>
                          )}
                        </span>
                      ))}

                      {/* Separator between Groups - Render unless it's the last group */}
                      {groupIdx < serviceGroups.length - 1 && (
                        <span className="mx-4 text-[#037166] opacity-50">||</span>
                      )}
                    </span>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Additional Services Sections */}
        {additionalServices.map((section, sIdx) => (
          <div key={sIdx} className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
              <div className="text-sm leading-8 text-gray-400">
                {section.groups.map((group, groupIdx) => (
                  <span key={group.id} className="inline mr-1">
                    {/* Group Name */}
                    <span className="text-white font-bold whitespace-nowrap mr-2">
                      {group.name}:
                    </span>

                    {/* Subcategories */}
                    {group.subcategories.map((sub, idx) => (
                      <span key={sub._id} className="inline">
                        <Link
                          href={`${section.basePath}?${sub.query}`}
                          className="text-white/70 hover:text-[#04a99d] transition-colors"
                        >
                          {sub.name}
                        </Link>
                        {/* Separator between subcategories */}
                        {idx < group.subcategories.length - 1 && (
                          <span className="mx-2 text-white/20">|</span>
                        )}
                      </span>
                    ))}

                    {/* Separator between Groups - Render unless it's the last group */}
                    {groupIdx < section.groups.length - 1 && (
                      <span className="mx-4 text-[#037166] opacity-50">||</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative w-48 h-14 overflow-hidden mb-6">
                <Image
                  src="/d-hub-logo.png"
                  alt="Doorstep Hub Logo"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
              <p className="text-white/60 mb-6 leading-relaxed max-w-sm">
                Your trusted partner for all home service needs. Connecting you with verified professionals for quick, reliable, and affordable solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/60 hover:text-[#04a99d] transition-colors cursor-pointer">
                  {/* <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div> */}
                  {/* <span className="text-sm">8886688666</span> */}
                </div>
                <div className="flex items-center gap-3 text-white/60 hover:text-[#04a99d] transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">help@doorstephub.com</span>
                </div>
                {/* <div className="flex items-center gap-3 text-white/60 hover:text-[#04a99d] transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Hyderabad, Telangana</span>
                </div> */}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#04a99d] transition-colors text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div> */}

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.Quicklinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#04a99d] transition-colors text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-bold mb-4">More Info</h4>
            <ul className="space-y-3">
              {footerLinks.Moreinfo.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#04a99d] transition-colors text-sm block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>


        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 text-sm"
          >
            © {new Date().getFullYear()} Doorstep Hub Pvt Ltd. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#037166] hover:to-[#04a99d] border border-white/10 hover:border-[#037166]/50 flex items-center justify-center text-white/60 hover:text-white transition-all group"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >

        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#037166]/50 to-transparent" />
    </footer>
  );
}
