'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Home, Briefcase, MapPin, Plus, Check, X, Trash2, Edit2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

export function AddressPage({
  selectedAddress,
  onSelectAddress,
  onBack,
  onContinue,
}) {
  const { token, isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    type: 'Home',
    area: '',
    flat: '',
    postalCode: '',
    addressLineOne: '',
    addressLineTwo: '',
    stateName: 'Telangana',
    cityName: 'Hyderabad',
    defaultAddress: false
  });

  const fetchAddresses = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/useraddress/getuseraddress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setAddresses(data.data || []);
        // Auto-select default address if none selected
        if (!selectedAddress && data.data?.length > 0) {
          const def = data.data.find(a => a.defaultAddress) || data.data[0];
          onSelectAddress(def);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  }, [token, selectedAddress, onSelectAddress]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    } else {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, fetchAddresses]);

  const handleAddOrUpdateAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.area || !newAddress.flat || !newAddress.postalCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const url = editingAddress
        ? `https://api.doorstephub.com/v1/dhubApi/app/useraddress/edituseraddress/${editingAddress._id}`
        : 'https://api.doorstephub.com/v1/dhubApi/app/useraddress/addaddress';

      const method = editingAddress ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newAddress,
          latitude: "17.450123", // Placeholder coords
          longitude: "78.390456",
          defaultAddress: addresses.length === 0 ? true : newAddress.defaultAddress
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(editingAddress ? 'Address updated!' : 'Address added!');
        setShowAddForm(false);
        setEditingAddress(null);
        fetchAddresses();
      } else {
        toast.error(data.message || 'Action failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.doorstephub.com/v1/dhubApi/app/useraddress/deleteuseraddress/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Address deleted');
        fetchAddresses();
      }
    } catch (error) {
      toast.error('Failed to delete address');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setNewAddress({
      name: address.name,
      phone: address.phone,
      type: address.type,
      area: address.area,
      flat: address.flat,
      postalCode: address.postalCode,
      addressLineOne: address.addressLineOne,
      addressLineTwo: address.addressLineTwo,
      stateName: address.stateName || 'Telangana',
      cityName: address.cityName || 'Hyderabad',
      defaultAddress: address.defaultAddress
    });
    setShowAddForm(true);
  };

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'home':
        return Home;
      case 'office':
        return Briefcase;
      default:
        return MapPin;
    }
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      toast.error('Please select an address');
      return;
    }
    // Save address to sessionStorage for other pages
    sessionStorage.setItem('selected_address', JSON.stringify(selectedAddress));
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
            {loading && addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/40">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#037166]" />
                <p>Loading your addresses...</p>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <MapPin className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No saved addresses found</p>
              </div>
            ) : (
              addresses.map((address, index) => {
                const Icon = getIcon(address.type);
                const isSelected = selectedAddress?._id === address._id;

                return (
                  <motion.div
                    key={address._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                    onClick={() => onSelectAddress(address)}
                    className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${isSelected
                      ? 'bg-gradient-to-br from-[#037166]/20 to-[#04a99d]/10 border-2 border-[#037166]'
                      : 'bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-white/20'
                      }`}
                  >
                    <div className="flex gap-6">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected
                        ? 'bg-gradient-to-br from-[#037166] to-[#04a99d]'
                        : 'bg-white/5'
                        }`}>
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-[#04a99d]'}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white capitalize">{address.type}</h3>
                          {address.defaultAddress && (
                            <span className="px-2 py-0.5 rounded-full bg-[#037166]/20 text-[#04a99d] text-xs font-medium">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="font-medium text-white mb-1">{address.name}</p>
                        <p className="text-white/80 text-sm mb-1">{address.flat}, {address.area}</p>
                        <p className="text-white/60 text-xs">{address.cityName}, {address.postalCode}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditClick(address); }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address._id); }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>

          {/* Add New Address Button */}
          {!showAddForm && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                setEditingAddress(null);
                setNewAddress({
                  name: '', phone: '', type: 'Home', area: '', flat: '',
                  postalCode: '', addressLineOne: '', addressLineTwo: '',
                  stateName: 'Telangana', cityName: 'Hyderabad', defaultAddress: false
                });
                setShowAddForm(true);
              }}
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
                    <h3 className="text-xl font-bold text-white">
                      {editingAddress ? 'Edit Address' : 'Add New Address'}
                    </h3>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5 text-white/60" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      {['Home', 'Office', 'Other'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setNewAddress({ ...newAddress, type })}
                          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${newAddress.type === type
                            ? 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white'
                            : 'bg-white/5 text-white/70 hover:bg-white/10'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                      />
                      <input
                        placeholder="Phone Number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                      />
                    </div>

                    <input
                      placeholder="Flat / Plot / House No."
                      value={newAddress.flat}
                      onChange={(e) => setNewAddress({ ...newAddress, flat: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                    />

                    <input
                      placeholder="Area / Locality"
                      value={newAddress.area}
                      onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        placeholder="City"
                        value={newAddress.cityName}
                        onChange={(e) => setNewAddress({ ...newAddress, cityName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                      />
                      <input
                        placeholder="State"
                        value={newAddress.stateName}
                        onChange={(e) => setNewAddress({ ...newAddress, stateName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                      />
                      <input
                        placeholder="Postal Code"
                        value={newAddress.postalCode}
                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="defaultAddr"
                        checked={newAddress.defaultAddress}
                        onChange={(e) => setNewAddress({ ...newAddress, defaultAddress: e.target.checked })}
                        className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#037166]"
                      />
                      <label htmlFor="defaultAddr" className="text-sm text-white/60 cursor-pointer">Set as Default Address</label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddOrUpdateAddress}
                        disabled={loading}
                        className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : editingAddress ? 'Update Address' : 'Save Address'}
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          if (!isAuthenticated) {
            onBack();
          }
        }}
      />
    </motion.div>
  );
}
