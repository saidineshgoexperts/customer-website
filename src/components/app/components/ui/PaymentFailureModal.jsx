'use client';

import { motion } from 'motion/react';
import { AlertCircle, RefreshCw, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PaymentFailureModal({ isOpen, onRetry, onChangeMethod, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
            >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Failed
                </h3>

                <p className="text-gray-500 mb-8">
                    We couldn't process your payment. This might be due to insufficient funds or a bank issue. You haven't been charged.
                </p>

                <div className="space-y-3">
                    <Button
                        onClick={onRetry}
                        className="w-full bg-[#037166] hover:bg-[#025951] text-white rounded-xl py-6 text-lg font-semibold flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onChangeMethod}
                        className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-6 flex items-center justify-center gap-2"
                    >
                        <CreditCard className="w-5 h-5" />
                        Use Different Method
                    </Button>

                    <button
                        onClick={onClose}
                        className="text-sm text-gray-400 hover:text-gray-600 mt-4"
                    >
                        Cancel Transaction
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
