'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, MapPin, Calendar, Clock, CreditCard, Wallet,
    Truck, CheckCircle, Loader2, Building2
} from 'lucide-react';
import { toast } from 'sonner';
import { useServiceCart } from '@/context/ServiceCartContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

function PGConfirmContent() {
    const router = useRouter();
    const { cartData, cartItems, loading: cartLoading, addToCart } = useServiceCart();
    const { token, isAuthenticated } = useAuth();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [bookedDate, setBookedDate] = useState('');
    const [bookedTime, setBookedTime] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Service window: 9 AM to 9 PM
    const SERVICE_END_HOUR = 21;

    useEffect(() => {
        const savedAddress = sessionStorage.getItem('selected_address');
        if (savedAddress) {
            setSelectedAddress(JSON.parse(savedAddress));
        } else {
            toast.error('No address selected');
            router.push('/pghostels/booking/address');
        }

        // Auto-select first available date
        const initialDates = getAvailableDates();
        if (initialDates.length > 0) {
            setBookedDate(initialDates[0].value);
        }
    }, [router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) setShowAuthModal(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    // Cart restoration if empty
    useEffect(() => {
        if (!isAuthenticated || cartLoading || cartItems.length > 0) return;
        const saved = sessionStorage.getItem('pg_booking_data');
        if (!saved) return;
        (async () => {
            try {
                const { providerId, packageId, addons } = JSON.parse(saved);
                await addToCart(providerId, packageId, 'professional_service', 1, null, 'professional', true);
                if (Array.isArray(addons)) {
                    for (const addonId of addons) {
                        await addToCart(providerId, addonId, 'professional_addon', 1, packageId, 'professional', true);
                    }
                }
                toast.success('Booking details restored');
            } catch { console.warn('Cart restoration failed'); }
        })();
    }, [isAuthenticated, cartLoading, cartItems.length]);

    useEffect(() => { setBookedTime(''); }, [bookedDate]);

    const getAvailableDates = () => {
        const now = new Date();
        const dates = [];
        const todayLimit = new Date();
        todayLimit.setHours(SERVICE_END_HOUR - 1, 0, 0, 0);
        const startFromTomorrow = now > todayLimit;

        for (let i = (startFromTomorrow ? 1 : 0); i < 10 + (startFromTomorrow ? 1 : 0); i++) {
            const date = new Date();
            date.setDate(now.getDate() + i);
            dates.push({
                value: date.toISOString().split('T')[0],
                dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNumber: date.getDate().toString().padStart(2, '0'),
                month: date.toLocaleDateString('en-US', { month: 'short' }),
            });
        }
        return dates;
    };

    const getAvailableTimes = (selectedDateValue) => {
        const now = new Date();
        const selectedDate = new Date(selectedDateValue);
        const allTimeSlots = [
            { label: '09:00 AM - 11:00 AM', value: '09:00', startHour: 9 },
            { label: '11:00 AM - 01:00 PM', value: '11:00', startHour: 11 },
            { label: '01:00 PM - 03:00 PM', value: '13:00', startHour: 13 },
            { label: '03:00 PM - 05:00 PM', value: '15:00', startHour: 15 },
            { label: '05:00 PM - 07:00 PM', value: '17:00', startHour: 17 },
            { label: '07:00 PM - 09:00 PM', value: '19:00', startHour: 19 },
        ];
        if (selectedDate.toDateString() === now.toDateString()) {
            const currentHour = now.getHours();
            return allTimeSlots.filter(slot => slot.startHour > currentHour + 1);
        }
        return allTimeSlots;
    };

    const availableDates = getAvailableDates();
    const availableTimesForSelectedDate = getAvailableTimes(bookedDate);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to proceed');
            setShowAuthModal(true);
            return;
        }
        if (!selectedAddress) { toast.error('Please select an address'); return; }
        if (!bookedDate || !bookedTime) { toast.error('Please select date and time'); return; }
        if (cartItems.length === 0) { toast.error('Your cart is empty'); return; }

        setLoading(true);
        try {
            const payload = {
                serviceAddressId: selectedAddress._id,
                bookedDate,
                bookedTime,
                paymentMethod,
                sourceOfLead: 'website',
                providerType: 'professional',
            };

            const endpoint = paymentMethod === 'ONLINE'
                ? 'https://api.doorstephub.com/v1/dhubApi/app/service-cart/initiate-payment'
                : 'https://api.doorstephub.com/v1/dhubApi/app/service-cart/checkout';

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                if (paymentMethod === 'ONLINE' && data.access_key) {
                    toast.success('Redirecting to payment gateway...');
                    window.location.href = `https://testpay.easebuzz.in/pay/${data.access_key}`;
                } else {
                    sessionStorage.removeItem('pg_booking_data');
                    toast.success('Booking confirmed! Welcome to your new home.');
                    router.push(`/pghostels/booking/success?date=${bookedDate}&time=${bookedTime}`);
                }
            } else {
                toast.error(data.message || 'Checkout failed');
            }
        } catch {
            toast.error('Failed to complete checkout');
        } finally {
            setLoading(false);
        }
    };

    if (cartLoading && cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-[#037166] animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-20 pb-32 bg-gray-50"
        >
            {/* Header */}
            <section className="sticky top-20 z-40 bg-gradient-to-r from-[#037166] via-teal-600 to-[#04a99d] border-b border-white/10 shadow-lg">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push('/pghostels/booking/address')}
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
                        <Building2 className="w-8 h-8" />
                        Confirm Booking
                    </motion.h1>
                </div>

                {/* Progress Indicator */}
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-6">
                    <div className="flex items-center gap-2">
                        {['Select PG', 'Address', 'Confirm & Pay'].map((step, index) => {
                            const isCompleted = index < 2;
                            const isCurrent = index === 2;
                            return (
                                <React.Fragment key={step}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-white shadow-md' : isCurrent ? 'bg-white ring-4 ring-white/30 scale-110 shadow-lg' : 'bg-white/30'
                                            }`}>
                                            {isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-[#037166]" />
                                            ) : (
                                                <span className={`text-sm font-bold ${isCurrent ? 'text-[#037166]' : 'text-white/60'}`}>{index + 1}</span>
                                            )}
                                        </div>
                                        <span className={`text-xs sm:text-sm font-medium transition-all ${isCurrent ? 'text-white font-bold' : 'text-white/70'
                                            }`}>{step}</span>
                                    </div>
                                    {index < 2 && (
                                        <div className={`h-0.5 flex-1 mx-2 transition-all ${isCompleted ? 'bg-white/80' : 'bg-white/20'
                                            }`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
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
                            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#037166]" />
                                Select Date
                            </h3>
                            {availableDates.length === 0 ? (
                                <p className="text-gray-500 text-sm">No dates available at this time</p>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {availableDates.map((date) => (
                                        <button
                                            key={date.value}
                                            onClick={() => setBookedDate(date.value)}
                                            className={`p-4 rounded-2xl flex flex-col items-center gap-0.5 transition-all border-2 ${bookedDate === date.value
                                                ? 'bg-[#037166] border-[#037166] text-white shadow-lg'
                                                : 'bg-white border-gray-100 text-gray-700 hover:border-[#037166]/30'
                                                }`}
                                        >
                                            <span className={`text-[10px] uppercase font-bold tracking-widest ${bookedDate === date.value ? 'text-white/80' : 'text-gray-400'}`}>
                                                {date.dayName}
                                            </span>
                                            <span className="text-lg font-black tracking-tight">{date.dayNumber} {date.month}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Time Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#037166]" />
                                Select Time Slot
                            </h3>
                            {availableTimesForSelectedDate.length === 0 ? (
                                <p className="text-gray-500 text-sm">
                                    {bookedDate ? 'No time slots available for selected date' : 'Please select a date first'}
                                </p>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-3">
                                    {availableTimesForSelectedDate.map((time) => (
                                        <button
                                            key={time.value}
                                            onClick={() => setBookedTime(time.value)}
                                            className={`p-4 rounded-xl font-medium transition-all ${bookedTime === time.value
                                                ? 'bg-[#037166] text-white shadow-lg shadow-[#037166]/30'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                        >
                                            {time.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Payment Method */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-[#037166]" />
                                Select Payment Method
                            </h3>
                            <div className="grid md:grid-cols-3 gap-3">
                                {[
                                    { id: 'COD', label: 'Pay at Hostel', icon: Truck },
                                    { id: 'WALLET', label: 'Wallet Pay', icon: Wallet },
                                    { id: 'ONLINE', label: 'Online Payment', icon: CreditCard },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-5 rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === method.id
                                            ? 'bg-[#037166] text-white shadow-lg'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-white' : 'text-[#037166]'}`} />
                                        <span className="text-sm font-medium">{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Booking Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#037166]" />
                                Booking Address
                            </h3>
                            {selectedAddress ? (
                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                    <p className="text-gray-900 font-medium mb-1">{selectedAddress.name}</p>
                                    <p className="text-gray-600">{selectedAddress.flat}, {selectedAddress.area}</p>
                                    <p className="text-gray-500">{selectedAddress.cityName}, {selectedAddress.postalCode}</p>
                                </div>
                            ) : (
                                <div className="p-4 rounded-lg bg-gray-50">
                                    <p className="text-gray-400">No address selected</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="sticky top-48 p-6 rounded-3xl bg-white border border-gray-200 shadow-xl"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

                            {/* Cart Items */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                                <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-[#037166]/10 flex items-center justify-center text-[#037166]">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Items Selected</p>
                                            <p className="text-gray-900 font-bold">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 space-y-1 pl-1">
                                        {cartItems.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="w-1 h-1 rounded-full bg-[#037166]" />
                                                <span className="line-clamp-1">{item.itemName}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Service Cost</span>
                                        <span className="text-gray-900 font-bold">₹{cartData?.totalServiceCost || 0}</span>
                                    </div>
                                    {(cartData?.platformFee > 0) && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Platform Fee</span>
                                            <span className="text-gray-900 font-bold">₹{cartData.platformFee}</span>
                                        </div>
                                    )}
                                    {(cartData?.gstAmount > 0) && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">GST</span>
                                            <span className="text-gray-900 font-bold">₹{cartData.gstAmount}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="p-4 rounded-2xl bg-[#037166]/5 border border-[#037166]/20 mb-6">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600 font-medium">Total Payable</span>
                                    <span className="text-2xl font-black text-[#037166]">
                                        ₹{(cartData?.finalAmount || cartData?.totalServiceCost || 0).toFixed(0)}
                                    </span>
                                </div>
                                <p className="text-[10px] text-[#037166] uppercase font-bold">
                                    {paymentMethod === 'COD' ? 'Pay at Hostel' : paymentMethod === 'WALLET' ? 'via Wallet' : 'Online Payment'}
                                </p>
                            </div>

                            {/* Confirm Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                disabled={loading || !bookedDate || !bookedTime}
                                className={`w-full px-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${loading || !bookedDate || !bookedTime
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-gradient-to-r from-[#037166] to-[#04a99d] text-white hover:shadow-[#037166]/40'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Confirming...
                                    </div>
                                ) : (
                                    'Confirm Booking'
                                )}
                            </motion.button>

                            <p className="mt-4 text-[10px] text-center text-gray-400">
                                By booking, you agree to our Terms & Cancellation Policy.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => {
                    setShowAuthModal(false);
                    if (!isAuthenticated) router.back();
                }}
            />
        </motion.div>
    );
}

export default function PGConfirmPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-[#037166] animate-spin" />
            </div>
        }>
            <PGConfirmContent />
        </Suspense>
    );
}
