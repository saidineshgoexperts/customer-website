'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { MapPin, Plus, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/pghostels/ui/dialog';
import { Input } from '@/components/pghostels/ui/input';

const mockAddresses = [
    { id: 1, label: 'Home', address: '123 MG Road, Bangalore - 560001', isDefault: true },
    { id: 2, label: 'Office', address: '456 Brigade Road, Bangalore - 560025', isDefault: false },
];

export default function AddressPage() {
    const router = useRouter();
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [addresses, setAddresses] = useState(mockAddresses);
    const [newAddress, setNewAddress] = useState({ label: '', address: '' });

    const handleContinue = () => {
        if (selectedAddress) {
            router.push('/pghostels/booking/confirm');
        }
    };

    const handleAddAddress = () => {
        if (newAddress.label && newAddress.address) {
            const newAddr = {
                id: addresses.length + 1,
                label: newAddress.label,
                address: newAddress.address,
                isDefault: false,
            };
            setAddresses([...addresses, newAddr]);
            setNewAddress({ label: '', address: '' });
            setShowAddDialog(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#037166]">Step 1 of 3</span>
                        <span className="text-sm text-gray-500">Select Address</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '33.33%' }}
                            className="h-full bg-gradient-to-r from-[#037166] to-[#025951]"
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Select Service Address</h1>

                    <div className="space-y-4 mb-6">
                        {addresses.map((address) => (
                            <motion.div
                                key={address.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedAddress(address.id)}
                                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === address.id
                                        ? 'border-[#037166] bg-[#037166]/5 shadow-lg shadow-[#037166]/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${selectedAddress === address.id
                                                    ? 'border-[#037166] bg-[#037166]'
                                                    : 'border-gray-300'
                                                }`}
                                        >
                                            {selectedAddress === address.id && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{address.label}</h3>
                                                {address.isDefault && (
                                                    <span className="px-2 py-0.5 bg-[#037166]/10 text-[#037166] text-xs rounded-full">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {address.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowAddDialog(true)}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#037166] hover:text-[#037166] transition-all flex items-center justify-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Add New Address</span>
                    </button>

                    <button
                        onClick={handleContinue}
                        disabled={!selectedAddress}
                        className={`w-full mt-8 py-4 rounded-xl font-semibold transition-all ${selectedAddress
                                ? 'bg-gradient-to-r from-[#037166] to-[#025951] text-white hover:shadow-xl hover:shadow-[#037166]/30'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Continue to Booking
                    </button>
                </motion.div>
            </div>

            {/* Add Address Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                            <Input
                                placeholder="e.g., Home, Office"
                                value={newAddress.label}
                                onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <Input
                                placeholder="Enter full address"
                                value={newAddress.address}
                                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            />
                        </div>
                        <button
                            onClick={handleAddAddress}
                            className="w-full py-3 bg-gradient-to-r from-[#037166] to-[#025951] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Add Address
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
