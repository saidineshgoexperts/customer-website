'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Home, Briefcase, MapPin, Plus, Check, X, Trash2, Edit2, Loader2, Search, Crosshair } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLocationContext } from '@/context/LocationContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { GoogleMap } from '@react-google-maps/api';
import { locationManager } from '@/services/locationManager';

export function AddressPage({
  selectedAddress,
  onSelectAddress,
  onBack,
  onContinue,
}) {
  const { user, token, isAuthenticated } = useAuth();
  const { detectWithGPS, loading: locationLoading, isMapsLoaded } = useLocationContext();
  const mapRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
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
    defaultAddress: false,
    latitude: "17.450123",
    longitude: "78.390456",
    stateId: "680cbb3d2d42e474f451ace3", // Default IDs from user example
    cityId: "684d704faa93650a05d5ff47"
  });
  const [detectionSuccess, setDetectionSuccess] = useState(false);

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

  // No longer needed: Pre-fill logic moved to trigger button for better UX
  // (prevents auto-restore when user clears the field manually)

  const handleAutoDetect = async () => {
    try {
      const locationData = await detectWithGPS();
      setNewAddress(prev => ({
        ...prev,
        area: locationData.area || '',
        cityName: locationData.city || '',
        postalCode: locationData.postalCode || '',
        stateName: locationData.state || 'Telangana',
        addressLineOne: locationData.address || '',
        latitude: locationData.lat || prev.latitude,
        longitude: locationData.lng || prev.longitude
      }));
      setDetectionSuccess(true);
      toast.success('Location detected successfully!');
      // Reset success check after 3 seconds
      setTimeout(() => setDetectionSuccess(false), 3000);
    } catch (error) {
      toast.error('Failed to detect location. Please fill manually.');
    }
  };

  const handleAddOrUpdateAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.area || !newAddress.flat || !newAddress.postalCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const url = editingAddress
        ? `https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/edituseraddress/${editingAddress._id}`
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
          latitude: newAddress.latitude.toString(),
          longitude: newAddress.longitude.toString(),
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
      defaultAddress: address.defaultAddress,
      latitude: address.latitude || "17.450123",
      longitude: address.longitude || "78.390456",
      stateId: address.stateId || "680cbb3d2d42e474f451ace3",
      cityId: address.cityId || "684d704faa93650a05d5ff47"
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
      <section className="sticky top-20 z-40 bg-gradient-to-r from-[#025a51] via-[#037166] to-[#04a99d] border-b border-white/10 shadow-lg opacity-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3"
          >
            <MapPin className="w-8 h-8" />
            Your Service Address
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
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-[#f0f2f5] border border-gray-200/20 group">
                {/* Real-time Google Map */}
                {isMapsLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: parseFloat(newAddress.latitude || "17.450123"), lng: parseFloat(newAddress.longitude || "78.390456") }}
                    zoom={15}
                    options={{
                      disableDefaultUI: true,
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                      clickableIcons: false, // We want drag map, not click POIs
                      gestureHandling: 'greedy'
                    }}
                    onLoad={(map) => { mapRef.current = map; }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={async () => {
                      if (!mapRef.current) return;
                      // setIsDragging(true); // removed to avoid flicker on immediate stop
                      const center = mapRef.current.getCenter();
                      const lat = center.lat();
                      const lng = center.lng();

                      try {
                        const data = await locationManager.reverseGeocode(lat, lng);
                        setNewAddress(prev => ({
                          ...prev,
                          area: data.area || prev.area,
                          cityName: data.city || prev.cityName,
                          postalCode: data.postalCode || prev.postalCode,
                          stateName: data.state || prev.stateName,
                          addressLineOne: data.address,
                          latitude: lat,
                          longitude: lng
                        }));
                      } catch (error) {
                        console.error("Geocoding failed", error);
                      } finally {
                        setIsDragging(false);
                      }
                    }}
                  >
                    {/* Search Bar Overlay */}
                    <div className="absolute top-4 left-4 right-4 z-10">
                      <div className="relative">
                        <div className="w-full bg-white rounded-xl shadow-lg shadow-black/5 p-4 flex items-center gap-3">
                          <Search className="w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                              const query = e.target.value;
                              setSearchQuery(query);
                              if (query.length > 2) {
                                locationManager.searchLocation(query).then(setSearchResults);
                              } else {
                                setSearchResults([]);
                              }
                            }}
                            placeholder="Search for your location"
                            className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm font-medium"
                          />
                          {searchQuery && (
                            <button onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="p-1 hover:bg-gray-100 rounded-full">
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                        </div>

                        {/* Search Results Dropdown */}
                        {searchResults.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto divide-y divide-gray-50 z-50">
                            {searchResults.map((result) => (
                              <button
                                key={result.place_id}
                                onClick={async () => {
                                  setSearchQuery(result.description);
                                  setSearchResults([]);
                                  try {
                                    const loc = await locationManager.setManualLocation(result.place_id);
                                    setNewAddress(prev => ({ ...prev, ...loc, latitude: loc.lat, longitude: loc.lng }));
                                    if (mapRef.current) {
                                      mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });
                                      mapRef.current.setZoom(17);
                                      setShowAddForm(true);
                                    }
                                  } catch (e) {
                                    toast.error("Failed to load location");
                                  }
                                }}
                                className="w-full p-3 text-left hover:bg-gray-50 flex items-start gap-3 transition-colors"
                              >
                                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{result.main_text}</p>
                                  <p className="text-xs text-gray-400 line-clamp-1">{result.secondary_text}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Locate Me Button */}
                    <div className="absolute bottom-24 right-6 z-20">
                      <button
                        onClick={async () => {
                          setIsLocating(true);
                          try {
                            const loc = await detectWithGPS();
                            if (loc && mapRef.current) {
                              setNewAddress(prev => ({ ...prev, ...loc, latitude: loc.lat, longitude: loc.lng }));
                              mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });
                              mapRef.current.setZoom(17);
                              setShowAddForm(true);
                            }
                          } catch (e) {
                            toast.error("Location detection failed");
                          } finally {
                            setIsLocating(false);
                          }
                        }}
                        className="w-12 h-12 rounded-full bg-white text-gray-600 shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
                        title="Use Current Location"
                      >
                        {isLocating ? <Loader2 className="w-5 h-5 animate-spin text-[#037166]" /> : <Crosshair className="w-6 h-6" />}
                      </button>
                    </div>

                    {/* Confirm Button */}
                    {/* <div className="absolute bottom-6 right-6 left-6 z-20">
                      <button
                        onClick={() => setShowAddForm(true)}
                        disabled={isDragging}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#037166] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#025a51] transition-all active:scale-95 disabled:opacity-70"
                      >
                        <span>{isDragging ? 'Locating...' : 'Confirm Location'}</span>
                      </button>
                    </div> */}
                  </GoogleMap>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-100">
                    <Loader2 className="w-8 h-8 animate-spin mb-2 text-[#037166]" />
                    <span className="text-sm">Loading Google Maps...</span>
                  </div>
                )}

                {/* Fixed Center Pin Target */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className="relative -mt-8 transition-transform duration-200" style={{ transform: isDragging ? 'scale(1.1) translateY(-10px)' : 'scale(1) translateY(0)' }}>
                    <div className="w-4 h-4 rounded-full bg-black/20 animate-ping absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    <MapPin className="w-10 h-10 text-[#ea4335] drop-shadow-xl relative z-10" fill="#ea4335" />
                    <div className="w-1 h-3 bg-black/80 mx-auto rounded-full mt-1" />
                  </div>
                </div>
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
                          <h4 className="text-xl font-bold text-white capitalize">{address.type}</h4>
                          {address.defaultAddress && (
                            <h6 className="px-2 py-0.5 rounded-full bg-[#037166]/20 text-[#04a99d] text-xs font-medium">
                              DEFAULT
                            </h6>
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
                  name: user?.name || '',
                  phone: user?.mobile || user?.phone || '',
                  type: 'Home',
                  area: '',
                  flat: '',
                  postalCode: '',
                  addressLineOne: '',
                  addressLineTwo: '',
                  stateName: 'Telangana',
                  cityName: 'Hyderabad',
                  defaultAddress: false,
                  latitude: "17.450123",
                  longitude: "78.390456"
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
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                      </h4>
                      {!editingAddress && (
                        <p className="text-white/40 text-xs mt-1">Information pre-filled from your profile</p>
                      )}
                    </div>
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
                      <div className="flex flex-col gap-1">
                        <input
                          placeholder="Full Name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                        />
                        <p className="text-[10px] text-white/30 px-1 italic">Recipient name for service reference</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <input
                          placeholder="Phone Number"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all"
                        />
                        <p className="text-[10px] text-white/30 px-1 italic">Contact number for this address</p>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        placeholder="Flat / Plot / House No."
                        value={newAddress.flat}
                        onChange={(e) => setNewAddress({ ...newAddress, flat: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#037166] transition-all pr-32"
                      />
                      <button
                        onClick={handleAutoDetect}
                        disabled={locationLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#037166]/20 text-[#04a99d] text-[10px] font-bold border border-[#037166]/30 hover:bg-[#037166]/30 transition-all uppercase tracking-wider disabled:opacity-50"
                      >
                        {locationLoading ? (
                          <Loader2 className="w-3 animate-spin" />
                        ) : detectionSuccess ? (
                          <Check className="w-3 text-[#04a99d]" />
                        ) : (
                          <MapPin className="w-3" />
                        )}
                        {detectionSuccess ? 'Detected' : 'Detect'}
                      </button>
                    </div>

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
