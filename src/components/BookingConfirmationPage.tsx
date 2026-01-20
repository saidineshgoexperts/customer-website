'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, MapPin, User, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import type { Address } from './AddressPage';

export interface CartItem {
  id: string;
  serviceId?: number;
  serviceName: string;
  packageName: string;
  price: number;
  quantity: number;
  duration?: string;
  category?: string;
  subCategory?: string;
}

interface BookingConfirmationPageProps {
  cartItems: CartItem[];
  address: Address;
  onBack: () => void;
  onConfirmBooking: () => void;
}

export function BookingConfirmationPage({
  cartItems,
  address,
  onBack,
  onConfirmBooking,
}: BookingConfirmationPageProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [technicianPreference, setTechnicianPreference] = useState('any');
  const [isConfirming, setIsConfirming] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Generate next 7 days for date selection
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    };
  });

  const availableTimes = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
  ];

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    setIsConfirming(true);

    // Simulate booking confirmation
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Booking confirmed successfully!');
    onConfirmBooking();
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
            Back to Address
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3"
          >
            <Sparkles className="w-8 h-8" />
            Confirm Your Booking
          </motion.h1>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-6">
          <div className="flex items-center gap-2">
            {['Service', 'Cart', 'Address', 'Confirm'].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#037166] to-[#04a99d] flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/90 text-sm font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 3 && <div className="h-0.5 flex-1 bg-white/30" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#04a99d]" />
                Select Date
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`p-4 rounded-xl font-medium transition-all ${selectedDate === date.value
                      ? 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white shadow-lg shadow-[#037166]/30'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Time Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#04a99d]" />
                Select Time Slot
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-xl font-medium transition-all ${selectedTime === time
                      ? 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white shadow-lg shadow-[#037166]/30'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Technician Preference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#04a99d]" />
                Technician Preference (Optional)
              </h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { value: 'any', label: 'Any Available' },
                  { value: 'senior', label: 'Senior Technician' },
                  { value: 'same', label: 'Same as Last Time' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTechnicianPreference(option.value)}
                    className={`p-4 rounded-xl font-medium transition-all ${technicianPreference === option.value
                      ? 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Service Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#04a99d]" />
                Service Address
              </h3>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-white font-medium mb-1">{address.label}</p>
                <p className="text-white/80">{address.street}</p>
                <p className="text-white/60">{address.city}</p>
              </div>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-48 p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">Booking Summary</h3>

              {/* Services */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="text-white/90 font-medium">{item.serviceName}</p>
                      <p className="text-white/60 text-xs">
                        {item.packageName} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-white/90 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/10 mb-4" />

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="h-px bg-white/10 mb-4" />

              <div className="flex justify-between text-xl font-bold text-white mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Selected Date/Time Preview */}
              {selectedDate && selectedTime && (
                <div className="p-4 rounded-lg bg-[#037166]/10 border border-[#037166]/20 mb-6">
                  <p className="text-white/80 text-sm mb-2">Scheduled for:</p>
                  <p className="text-white font-medium">
                    {availableDates.find(d => d.value === selectedDate)?.label}
                  </p>
                  <p className="text-white font-medium">{selectedTime}</p>
                </div>
              )}

              {/* Confirm Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={isConfirming}
                className={`w-full px-6 py-4 rounded-xl font-medium text-lg transition-all ${isConfirming
                  ? 'bg-white/20 text-white/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white hover:shadow-lg hover:shadow-[#037166]/40'
                  }`}
              >
                {isConfirming ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Confirming...
                  </div>
                ) : (
                  'Confirm Booking'
                )}
              </motion.button>

              <p className="text-white/60 text-xs text-center mt-4">
                You'll receive a confirmation email and SMS
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
