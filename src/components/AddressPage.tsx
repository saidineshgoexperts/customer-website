'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Home, Briefcase, MapPin, Plus, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Address } from '@/app/page';

interface AddressPageProps {
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  onBack: () => void;
  onContinue: () => void;
}

// Mock saved addresses
const savedAddresses: Address[] = [
  {
    id: 'addr-1',
    type: 'home',
    label: 'Home',
    street: '123 Main Street, Apt 4B',
    city: 'New York, NY 10001',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: 'addr-2',
    type: 'office',
    label: 'Office',
    street: '456 Business Ave, Suite 200',
    city: 'New York, NY 10002',
    zipCode: '10002',
    isDefault: false,
  },
];

export function AddressPage({
  selectedAddress,
  onSelectAddress,
  onBack,
  onContinue,
}: AddressPageProps) {
  const [addresses, setAddresses] = useState<Address[]>(savedAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home' as 'home' | 'office' | 'other',
    label: '',
    street: '',
    city: '',
    zipCode: '',
  });

  const getIcon = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return Home;
      case 'office':
        return Briefcase;
      default:
        return MapPin;
    }
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.zipCode) {
      toast.error('Please fill in all fields');
      return;
    }

    const address: Address = {
      id: `addr-${Date.now()}`,
      type: newAddress.type,
      label: newAddress.label,
      street: newAddress.street,
      city: newAddress.city,
      zipCode: newAddress.zipCode,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, address]);
    onSelectAddress(address);
    setShowAddForm(false);
    setNewAddress({
      type: 'home',
      label: '',
      street: '',
      city: '',
      zipCode: '',
    });
    toast.success('Address added successfully!');
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      toast.error('Please select an address');
      return;
    }
    onContinue();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-32"
    >
      {/* Header */}
      <section className="sticky top-20 z-40 bg-gradient-to-r from-[#025a51] via-[#037166] to-[#04a99d] border-b border-white/10 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3"
          >
            <MapPin className="w-8 h-8" />
            Select Service Address
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Saved Addresses */}
          <AnimatePresence mode="popLayout">
            {addresses.map((address, index) => {
              const Icon = getIcon(address.type);
              const isSelected = selectedAddress?.id === address.id;

              return (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  onClick={() => onSelectAddress(address)}
                  className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#037166]/20 to-[#04a99d]/10 border-2 border-[#037166]'
                      : 'bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#037166] to-[#04a99d]'
                        : 'bg-white/5'
                    }`}>
                      <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-[#04a99d]'}`} />
                    </div>

                    {/* Address Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{address.label}</h3>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-[#037166]/20 text-[#04a99d] text-xs font-medium">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p className="text-white/80 mb-1">{address.street}</p>
                      <p className="text-white/60 text-sm">{address.city}</p>
                    </div>

                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hover Glow */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-2xl border border-[#037166] pointer-events-none"
                      style={{ boxShadow: '0 0 20px rgba(3, 113, 102, 0.3)' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Add New Address Button */}
          {!showAddForm && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: addresses.length * 0.1 }}
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#037166]/50 bg-white/5 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium text-lg">Add New Address</span>
            </motion.button>
          )}

          {/* Add Address Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Add New Address</h3>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5 text-white/60" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Address Type */}
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Address Type</label>
                      <div className="flex gap-3">
                        {(['home', 'office', 'other'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setNewAddress({ ...newAddress, type })}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                              newAddress.type === type
                                ? 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white'
                                : 'bg-white/5 text-white/70 hover:bg-white/10'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Label */}
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Label</label>
                      <input
                        type="text"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        placeholder="e.g., My Home, Main Office"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#037166] transition-colors"
                      />
                    </div>

                    {/* Street */}
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Street Address</label>
                      <input
                        type="text"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        placeholder="123 Main Street, Apt 4B"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#037166] transition-colors"
                      />
                    </div>

                    {/* City & Zip */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 mb-2 text-sm">City, State</label>
                        <input
                          type="text"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          placeholder="New York, NY"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#037166] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2 text-sm">ZIP Code</label>
                        <input
                          type="text"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                          placeholder="10001"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#037166] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddAddress}
                        className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue Button */}
        {selectedAddress && !showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <button
              onClick={handleContinue}
              className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium text-lg hover:shadow-lg hover:shadow-[#037166]/40 transition-all"
            >
              Continue to Booking
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
