'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Check, ChevronRight } from 'lucide-react';
import { Input } from '@/components/pghostels/ui/input';

const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM',
];

const mockBookingData = {
    hostelName: 'MAHENDRA A',
    roomType: 'Single Room',
    monthlyPrice: 6500,
    address: '123, 5th Main Road, Koramangala 1st Block, Bangalore - 560034',
};

export default function ConfirmPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

    const handleConfirm = () => {
        if (selectedDate) {
            router.push('/pghostels/booking/success');
        }
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#037166]">Step 2 of 3</span>
                        <span className="text-sm text-gray-500">Confirm Booking</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '33.33%' }}
                            animate={{ width: '66.66%' }}
                            className="h-full bg-gradient-to-r from-[#037166] to-[#025951]"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Date & Time */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Move-in Date & Time</h2>

                        <div className="space-y-6">
                            {/* Date Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Move-in Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="date"
                                        min={today}
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="pl-10 h-12"
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
                                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${selectedTime === slot
                                                    ? 'bg-gradient-to-r from-[#037166] to-[#025951] text-white shadow-lg shadow-[#037166]/30'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
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
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h2>

                        <div className="space-y-4">
                            <div className="pb-4 border-b border-gray-200">
                                <div className="font-semibold text-gray-900 text-lg mb-1">
                                    {mockBookingData.hostelName}
                                </div>
                                <div className="text-sm text-gray-600">{mockBookingData.address}</div>
                            </div>

                            <div className="flex justify-between pb-3 border-b border-gray-100">
                                <div>
                                    <div className="font-medium text-gray-900">{mockBookingData.roomType}</div>
                                    <div className="text-sm text-gray-500">Monthly rent</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900">
                                        ₹{mockBookingData.monthlyPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t-2 border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-[#037166]">
                                            ₹{mockBookingData.monthlyPrice.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">/month</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-br from-[#037166]/10 to-[#037166]/5 rounded-lg border border-[#037166]/20">
                                <div className="text-sm text-gray-700 space-y-2">
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-[#037166] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>1 month security deposit required</span>
                                    </div>
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-[#037166] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Notice period: 1 month</span>
                                    </div>
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-[#037166] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>No brokerage fees</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={!selectedDate}
                            className={`w-full mt-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${selectedDate
                                    ? 'bg-gradient-to-r from-[#037166] to-[#025951] text-white hover:shadow-xl hover:shadow-[#037166]/30'
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
