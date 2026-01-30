'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Store, X } from 'lucide-react';

export function ServiceTypeSelectionModal({ isOpen, onClose, onSelect }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative p-6 text-center border-b border-gray-100">
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <h3 className="text-2xl font-bold text-gray-900">What are you looking for?</h3>
                        <p className="text-gray-500 mt-1">Select the type of service you need</p>
                    </div>

                    {/* Options */}
                    <div className="p-6 grid gap-4">
                        {/* Verified Partner Option */}
                        <button
                            onClick={() => onSelect('partner')}
                            className="group relative flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-[#037166] hover:bg-[#037166]/5 transition-all duration-300 text-left"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#037166]/10 flex items-center justify-center group-hover:bg-[#037166] transition-colors">
                                <ShieldCheck className="w-6 h-6 text-[#037166] group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 group-hover:text-[#037166]">Verified Partner</h4>
                                <p className="text-sm text-gray-500">Book certified professionals for doorstep service</p>
                            </div>
                        </button>

                        {/* Service Center Option */}
                        <button
                            onClick={() => onSelect('center')}
                            className="group relative flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 text-left"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <Store className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 group-hover:text-blue-600">Service Center</h4>
                                <p className="text-sm text-gray-500">Find nearby authorized service centers</p>
                            </div>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-50 text-center text-xs text-gray-400">
                        DoorstepHub • Trusted Services
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
