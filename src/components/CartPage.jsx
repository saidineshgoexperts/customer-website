'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Suggested add-on services
const suggestedAddOns = [
  {
    id: 'addon-1',
    title: 'Express Service',
    description: 'Priority scheduling within 24 hours',
    price: 15,
  },
  {
    id: 'addon-2',
    title: 'Extended Warranty',
    description: '1-year extended coverage',
    price: 29,
  },
  {
    id: 'addon-3',
    title: 'Deep Cleaning',
    description: 'Professional cleaning service',
    price: 25,
  },
];

export function CartPage({
  cartItems,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToAddress,
  onAddToCart,
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleRemove = (itemId) => {
    onRemoveItem(itemId);
    toast.success('Item removed from cart');
  };

  const handleAddAddon = (addon) => {
    onAddToCart({
      id: addon.id,
      serviceId: 999,
      serviceName: addon.title,
      packageName: addon.description,
      price: addon.price,
      duration: '30 mins',
      quantity: 1,
      category: 'Add-on',
      subCategory: 'Services',
    });
    toast.success(`${addon.title} added to cart!`);
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
            Continue Shopping
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3"
          >
            <ShoppingCart className="w-8 h-8" />
            Your Cart
            {cartItems.length > 0 && (
              <span className="text-lg text-white/80">({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
            )}
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-white/40" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/60 mb-8">Add some services to get started!</p>
            <button
              onClick={onBack}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all"
            >
              Browse Services
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                    className="group relative rounded-2xl p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/30 transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      {/* Service Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.serviceName}
                        </h3>
                        <p className="text-white/60 text-sm mb-3">{item.packageName}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-white/60 text-sm">Quantity:</span>
                          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="w-8 text-center text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-white/60">
                              ${item.price} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 rounded-2xl border border-[#037166]/50 pointer-events-none"
                      style={{ boxShadow: '0 0 15px rgba(3, 113, 102, 0.2)' }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Suggested Add-ons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#04a99d]" />
                  Enhance Your Service
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {suggestedAddOns.map((addon, index) => (
                    <motion.div
                      key={addon.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 hover:border-[#037166]/30 transition-all"
                    >
                      <h4 className="font-bold text-white mb-1">{addon.title}</h4>
                      <p className="text-white/60 text-sm mb-3">{addon.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">${addon.price}</span>
                        <button
                          onClick={() => handleAddAddon(addon)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#037166] to-[#04a99d] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#037166]/30 transition-all"
                        >
                          Add
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Price Summary - Sticky on Desktop */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-48 p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onProceedToAddress}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium text-lg hover:shadow-lg hover:shadow-[#037166]/40 transition-all"
                >
                  Proceed to Address
                </motion.button>

                <div className="mt-6 p-4 rounded-lg bg-[#037166]/10 border border-[#037166]/20">
                  <p className="text-white/80 text-sm text-center">
                    <span className="font-medium text-[#04a99d]">✓</span> All prices include service guarantee
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Footer */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl border-t border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80">Total</span>
            <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onProceedToAddress}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium hover:shadow-lg hover:shadow-[#037166]/40 transition-all"
          >
            Proceed to Address
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
