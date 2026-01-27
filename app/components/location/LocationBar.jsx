'use client';

import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, Crosshair, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from '@/hooks/useLocation';

export function LocationBar({ theme = 'dark' }) {
    const { location, detectWithGPS, searchLocation, setManualLocation, loading, error } = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);

    // REMOVED: Auto-detect on page load (violates UX best practices)
    // Why: GPS permission should ONLY be requested on explicit user action
    // LocationContext now handles silent IP detection as fallback

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        const results = await searchLocation(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
    };

    const handleSelectLocation = async (place) => {
        setIsSearching(true);
        try {
            await setManualLocation(place.place_id);
            setIsOpen(false);
            setSearchQuery('');
            setSearchResults([]);
        } catch (error) {
            console.error('Failed to set location:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleDetectCurrent = async () => {
        setIsDetecting(true);
        try {
            await detectWithGPS();
            // Keep modal open to show result, then close after brief delay
            setTimeout(() => {
                setIsOpen(false);
            }, 500);
        } catch (error) {
            console.error('GPS detection failed:', error);
            // Error is handled in context, fallback to IP already attempted
        } finally {
            setIsDetecting(false);
        }
    };

    const isLight = theme === 'light';


    return (
        <>
            {/* Navbar Trigger */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`hidden lg:flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all group mr-2 ${isLight
                        ? 'bg-gray-100/50 hover:bg-gray-200/50 border-gray-200'
                        : 'bg-[#1a1a1a] hover:bg-[#037166]/10 border-[#037166]/20'
                    }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <MapPin className={`w-4 h-4 ${isLight ? 'text-[#037166]' : 'text-[#037166] group-hover:text-[#04a99d]'}`} />
                <div className="flex flex-col items-start min-w-[100px] max-w-[160px]">
                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        {location ? 'Delivering to' : 'Location'}
                    </span>
                    <span className={`text-xs font-medium truncate w-full text-left ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {loading ? 'Detecting...' : location ? location.shortAddress : 'Select location'}
                    </span>
                </div>
                <ChevronDown className={`w-3 h-3 ${isLight ? 'text-gray-400' : 'text-gray-500 group-hover:text-[#037166]'}`} />
            </motion.button>

            {/* Helper for Mobile (Icon only or specific mobile bar) - Assuming GlobalNav handles mobile, we'll stick to this for now */}

            {/* Modal / Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#037166]/30 rounded-2xl shadow-2xl shadow-[#037166]/20 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-[#037166]/20 flex items-center justify-between bg-[#1a1a1a]/50">
                                <h3 className="text-lg font-semibold text-white">Change Location</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Search Body */}
                            <div className="p-4 space-y-4">
                                {/* Search Input */}
                                <form onSubmit={handleSearch} className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for area, street name..."
                                        className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#037166]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#037166] focus:ring-1 focus:ring-[#037166] transition-all"
                                        autoFocus
                                    />
                                    {isSearching && (
                                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#037166] animate-spin" />
                                    )}
                                </form>

                                {/* Detect Button */}
                                <button
                                    onClick={handleDetectCurrent}
                                    disabled={isDetecting}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#037166]/10 transition-colors group text-left border border-transparent hover:border-[#037166]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#037166]/20 flex items-center justify-center group-hover:bg-[#037166] transition-colors">
                                        {isDetecting ? (
                                            <Loader2 className="w-5 h-5 text-[#037166] group-hover:text-white animate-spin" />
                                        ) : (
                                            <Crosshair className="w-5 h-5 text-[#037166] group-hover:text-white" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-[#037166] font-semibold group-hover:text-[#04a99d]">
                                            {isDetecting ? 'Detecting location...' : 'Use current location'}
                                        </div>
                                        <div className="text-xs text-gray-500">Using GPS</div>
                                    </div>
                                </button>

                                {/* Results List */}
                                {searchResults.length > 0 && (
                                    <div className="mt-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search Results</div>
                                        {searchResults.map((place, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSelectLocation(place)}
                                                className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                                            >
                                                <MapPin className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                                                <div>
                                                    <div className="text-sm font-medium text-white">{place.main_text}</div>
                                                    <div className="text-xs text-gray-500 line-clamp-2">{place.secondary_text}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Empty State / Suggestions */}
                                {searchResults.length === 0 && searchQuery && !isSearching && (
                                    <div className="text-center py-6 text-gray-500 text-sm">
                                        No results found for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
