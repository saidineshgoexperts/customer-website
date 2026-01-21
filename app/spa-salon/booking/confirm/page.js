'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Check, ChevronRight } from 'lucide-react';
import { Input } from '@/components/spasalon/ui/input';

const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM',
];

const mockBookingData = {
    serviceName: 'Luxury Hair Spa Treatment',
    providerName: 'Lotus Spa & Wellness',
    price: 999,
    address: '123, Madhapur Main Road, Hyderabad - 500081',
};

export default function ConfirmPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

    const handleConfirm = () => {
        if (selectedDate) {
            router.push('/spa-salon/booking/success');
        }
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F6F7FB] py-8 pt-24">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#C06C84]">Step 2 of 3</span>
                        <span className="text-sm text-gray-500">Confirm Booking</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '33.33%' }}
                            animate={{ width: '66.66%' }}
                            className="h-full bg-gradient-to-r from-[#C06C84] to-[#6C5CE7]"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Date & Time */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-6 underline decoration-[#C06C84] decoration-2 underline-offset-4">Select Slot</h2>

                        <div className="space-y-6">
                            {/* Date Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Appointment Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C06C84]" />
                                    <Input
                                        type="date"
                                        min={today}
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="pl-10 h-12 rounded-xl focus:border-[#C06C84]"
                                    />
                                </div>
                            </div>

                            {/* Time Slot */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Preferred Time Slot
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${selectedTime === slot
                                                ? 'bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white shadow-lg shadow-[#C06C84]/30'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                                }`}
                                        >
                                            <Clock className="w-4 h-4 mx-auto mb-1" />
                                            <div className="text-xs">{slot}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Booking Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-6 underline decoration-[#6C5CE7] decoration-2 underline-offset-4">Booking Summary</h2>

                        <div className="space-y-4">
                            <div className="pb-4 border-b border-gray-100">
                                <div className="font-bold text-gray-900 text-xl mb-1">
                                    {mockBookingData.serviceName}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-[#C06C84] rounded-full"></span>
                                    {mockBookingData.providerName}
                                </div>
                            </div>

                            <div className="flex justify-between py-2">
                                <div className="text-gray-600">Service Price</div>
                                <div className="font-bold text-gray-900">₹{mockBookingData.price}</div>
                            </div>

                            <div className="pt-4 border-t-2 border-[#C06C84]/20">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-[#C06C84]">
                                            ₹{mockBookingData.price}
                                        </div>
                                        <div className="text-xs text-gray-400">Paid after service</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-br from-[#C06C84]/10 to-[#6C5CE7]/10 rounded-2xl border border-[#C06C84]/20">
                                <div className="text-sm text-gray-700 space-y-2">
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C06C84] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Professional & verified staff</span>
                                    </div>
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C06C84] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Sanitized tools & premium products</span>
                                    </div>
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C06C84] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Full satisfaction guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={!selectedDate}
                            className={`w-full mt-6 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center space-x-2 ${selectedDate
                                ? 'bg-gradient-to-r from-[#C06C84] to-[#6C5CE7] text-white hover:shadow-xl hover:shadow-[#C06C84]/40'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <span>Confirm Booking</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
