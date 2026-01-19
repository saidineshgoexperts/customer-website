'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, ShieldCheck, Mail, User, LogOut, Camera, Chrome } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function AuthModal({ isOpen, onClose }) {
    const { user, loginWithWhatsApp, verifyOtp, loginWithGoogle, updateProfile, logout, isAuthenticated } = useAuth();
    const [step, setStep] = useState('login'); // login, otp, profile
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (mobile.length !== 10) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
        }
        setLoading(true);
        try {
            const data = await loginWithWhatsApp(mobile);
            if (data.success || data.status === 'success') {
                setStep('otp');
                toast.success('OTP sent to WhatsApp');
            } else {
                toast.error(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast.error('Please enter 6-digit OTP');
            return;
        }
        setLoading(true);
        try {
            const data = await verifyOtp(mobile, otp);
            if (data.success || data.status === 'success') {
                onClose();
            } else {
                toast.error(data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Logic for getting google idToken would go here
            // const data = await loginWithGoogle(idToken);
            toast.info('Google login integration coming soon');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-[#1a1a1a] rounded-3xl border border-[#037166]/30 shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {isAuthenticated ? 'Your Profile' : 'Sign In'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8">
                    {!isAuthenticated ? (
                        step === 'login' ? (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#037166]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Phone className="w-8 h-8 text-[#037166]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Login with WhatsApp</h3>
                                    <p className="text-white/60 text-sm">We'll send you a one-time password on WhatsApp</p>
                                </div>

                                <form onSubmit={handleSendOtp} className="space-y-4">
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#037166] transition-all"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || mobile.length !== 10}
                                        className="w-full py-4 bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#037166]/30 disabled:opacity-50 transition-all"
                                    >
                                        {loading ? 'Sending...' : 'Send OTP'}
                                    </button>
                                </form>

                                <div className="relative py-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-4 bg-[#1a1a1a] text-white/40 text-sm italic">or continue with</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all"
                                >
                                    <Chrome className="w-5 h-5" />
                                    Sign in with Google
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#037166]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <ShieldCheck className="w-8 h-8 text-[#037166]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Enter Verification Code</h3>
                                    <p className="text-white/60 text-sm">Code sent to +91 {mobile}</p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                    <div className="flex justify-between gap-2">
                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                maxLength={1}
                                                value={otp[index] || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '');
                                                    if (val) {
                                                        const newOtp = otp.split('');
                                                        newOtp[index] = val;
                                                        const finalOtp = newOtp.join('').slice(0, 6);
                                                        setOtp(finalOtp);
                                                        if (index < 5) {
                                                            document.getElementById(`otp-${index + 1}`).focus();
                                                        }
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Backspace' && !otp[index] && index > 0) {
                                                        document.getElementById(`otp-${index - 1}`).focus();
                                                    }
                                                }}
                                                className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-bold text-white focus:border-[#037166] focus:ring-1 focus:ring-[#037166] outline-none transition-all"
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || otp.length !== 6}
                                        className="w-full py-4 bg-gradient-to-r from-[#037166] to-[#04a99d] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#037166]/30 disabled:opacity-50 transition-all"
                                    >
                                        {loading ? 'Verifying...' : 'Verify OTP'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep('login');
                                            setOtp('');
                                        }}
                                        className="w-full text-white/60 text-sm hover:text-white hover:underline transition-colors"
                                    >
                                        Back to Mobile Login
                                    </button>
                                </form>
                            </div>
                        )
                    ) : (
                        // Profile View
                        <div className="space-y-6">
                            <div className="relative flex flex-col items-center">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full border-2 border-[#037166] overflow-hidden bg-white/5">
                                        {user?.image ? (
                                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#037166]">
                                                {user?.firstName?.[0] || user?.name?.[0] || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 bg-[#037166] rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className="text-xl font-bold text-white">{user?.name || `${user?.firstName} ${user?.lastName}`}</h3>
                                    <p className="text-white/60 text-sm">{user?.phone || user?.mobile || 'No phone'}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        defaultValue={user?.email}
                                        onBlur={(e) => updateProfile({ email: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#037166] transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        defaultValue={user?.name || `${user?.firstName} ${user?.lastName}`}
                                        onBlur={(e) => updateProfile({ name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#037166] transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    logout();
                                    onClose();
                                }}
                                className="w-full py-4 border border-red-500/30 text-red-500 font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
