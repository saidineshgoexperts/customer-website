'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Clock, CreditCard, Wallet, Banknote, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useServiceCart } from '@/context/ServiceCartContext';
import { useAuth } from '@/context/AuthContext';

export function ServiceCartCheckoutPage({ selectedAddress, onBack, onSuccess }) {
    const { cartData, cartItems } = useServiceCart();
    const { token } = useAuth();

    const [bookedDate, setBookedDate] = useState('');
    const [bookedTime, setBookedTime] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (!selectedAddress) {
            toast.error('Please select an address');
            return;
        }
        if (!bookedDate) {
            toast.error('Please select a date');
            return;
        }
        if (!bookedTime) {
            toast.error('Please select a time');
            return;
        }

        setLoading(true);
        try {
            const endpoint = paymentMethod === 'ONLINE'
                ? 'https://api.doorstephub.com/v1/dhubApi/app/service-cart/initiate-payment'
                : 'https://api.doorstephub.com/v1/dhubApi/app/service-cart/checkout';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceAddressId: selectedAddress._id,
                    bookedDate,
                    bookedTime,
                    paymentMethod,
                    sourceOfLead: 'App'
                })
            });

            const data = await response.json();
            console.log('💳 Checkout Response:', data);

            if (data.success) {
                if (paymentMethod === 'ONLINE' && data.access_key) {
                    // Redirect to Easebuzz payment gateway with access_key
                    const easebuzzUrl = `https://testpay.easebuzz.in/pay/${data.access_key}`;
                    console.log('🔗 Redirecting to Easebuzz:', easebuzzUrl);
                    toast.success('Redirecting to payment gateway...');
                    window.location.href = easebuzzUrl;
                } else {
                    // COD or Wallet payment successful
                    toast.success('Booking created successfully!');
                    onSuccess && onSuccess(data);
                }
            } else {
                toast.error(data.message || 'Checkout failed');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Failed to complete checkout');
        } finally {
            setLoading(false);
        }
    };

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM'
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-20 pb-32 bg-gradient-to-b from-[#0a0a0a] via-[#0f1614] to-[#0a0a0a]"
        >
            {/* Header */}
            <section className="sticky top-20 z-40 bg-gradient-to-r from-[#025a51] via-[#037166] to-[#04a99d] border-b border-white/10 shadow-lg">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={onBack}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all text-sm mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Address
                    </motion.button>

                    <h1 className="text-3xl md:text-4xl font-bold text-white">Checkout</h1>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Selected Address Display */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#037166]" />
                                Service Address
                            </h2>
                            <div className="p-4 rounded-xl bg-[#037166]/10 border border-[#037166]/30">
                                <p className="text-white font-semibold mb-1">{selectedAddress?.type || 'Home'}</p>
                                <p className="text-white/80 text-sm mb-1">{selectedAddress?.flat}, {selectedAddress?.area}</p>
                                <p className="text-white/60 text-xs">{selectedAddress?.cityName}, {selectedAddress?.postalCode}</p>
                            </div>
                        </motion.div>

                        {/* Date Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#037166]" />
                                Select Date
                            </h2>
                            <input
                                type="date"
                                value={bookedDate}
                                onChange={(e) => setBookedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#037166] focus:outline-none"
                            />
                        </motion.div>

                        {/* Time Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#037166]" />
                                Select Time
                            </h2>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setBookedTime(time)}
                                        className={`px-4 py-3 rounded-xl border-2 transition-all ${bookedTime === time
                                            ? 'border-[#037166] bg-[#037166]/10 text-white'
                                            : 'border-white/10 text-white/60 hover:border-white/20'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Payment Method */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-[#037166]" />
                                Payment Method
                            </h2>
                            <div className="space-y-3">
                                <div
                                    onClick={() => setPaymentMethod('COD')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'COD'
                                        ? 'border-[#037166] bg-[#037166]/10'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <Banknote className="w-6 h-6 text-[#037166]" />
                                    <div>
                                        <p className="text-white font-semibold">Cash on Delivery</p>
                                        <p className="text-white/60 text-sm">Pay when service is completed</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('WALLET')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'WALLET'
                                        ? 'border-[#037166] bg-[#037166]/10'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <Wallet className="w-6 h-6 text-[#037166]" />
                                    <div>
                                        <p className="text-white font-semibold">Wallet</p>
                                        <p className="text-white/60 text-sm">Pay using your wallet balance</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('ONLINE')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'ONLINE'
                                        ? 'border-[#037166] bg-[#037166]/10'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <CreditCard className="w-6 h-6 text-[#037166]" />
                                    <div>
                                        <p className="text-white font-semibold">Online Payment</p>
                                        <p className="text-white/60 text-sm">Pay via UPI, Card, Net Banking</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="sticky top-48 bg-gradient-to-br from-[#1a1a1a] to-[#0f1614] border border-white/10 rounded-2xl p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                            {/* Cart Items */}
                            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.itemId} className="flex justify-between text-sm">
                                        <span className="text-white/80">{item.itemName}</span>
                                        <span className="text-white">₹{item.subtotal.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-white/10 mb-4" />

                            {/* Pricing */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-white/80">
                                    <span>Service Cost</span>
                                    <span>₹{(cartData?.totalServiceCost || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/80">
                                    <span>Platform Fee</span>
                                    <span>₹{(cartData?.platformFee || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/80">
                                    <span>Consultation Fee</span>
                                    <span>₹{(cartData?.consultationFee || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/80">
                                    <span>GST</span>
                                    <span>₹{(cartData?.gstAmount || 0).toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div className="flex justify-between text-xl font-bold text-white">
                                    <span>Total</span>
                                    <span>₹{(cartData?.finalAmount || 0).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading || !selectedAddress || !bookedDate || !bookedTime}
                                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-medium text-lg hover:shadow-lg hover:shadow-[#037166]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Pay ₹${(cartData?.finalAmount || 0).toFixed(2)}`
                                )}
                            </button>

                            <p className="text-white/60 text-xs text-center mt-4">
                                This is the consultationFee
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
