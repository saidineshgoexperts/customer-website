'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, ShieldCheck, Mail, User, LogOut, Camera, Chrome, Pencil, Check, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function AuthModal({ isOpen, onClose, theme = {} }) {
    const { user, loginWithWhatsApp, verifyOtp, loginWithGoogle, updateProfile, logout, isAuthenticated } = useAuth();
    const [step, setStep] = useState('login'); // login, otp, profile
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    // Profile Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = React.useRef(null);

    // Initial load of profile data
    React.useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                email: user.email || ''
            });
        }
    }, [user]);

    // Default Dark Theme (Fallback)
    const defaultTheme = {
        bgMobile: 'bg-[#0a0a0a]',
        textMain: 'text-white',
        textHover: 'text-[#037166]', // Accent
        border: 'border-[#037166]/20',
        buttonBg: 'bg-[#1a1a1a]', // Input bg
        accentGradientFrom: 'from-[#037166]',
        accentGradientTo: 'to-[#04a99d]',
        accent: 'bg-[#037166]'
    };

    const t = typeof theme === 'object' && Object.keys(theme).length > 0 ? theme : defaultTheme;

    // Derived colors for cleaner JSX
    const inputBg = t.buttonBg;
    const borderColor = t.border;
    const accentText = t.textHover;

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
                // onClose(); // Don't close, show profile update instead
                setIsEditing(true); // Auto-enable edit mode
                setStep('profile');
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
            const data = await loginWithGoogle();
            if (data.success || data.status === 'success') {
                onClose();
            }
        } catch (error) {
            console.error('Google login error:', error);
            // Error toast is already shown in AuthContext
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
                className={`relative w-full max-w-md ${t.bgMobile} rounded-3xl border ${borderColor} shadow-2xl overflow-hidden`}
            >
                {/* Header */}
                <div className={`p-6 border-b border-opacity-10 ${borderColor} flex items-center justify-between`}>
                    <h2 className={`text-xl font-bold ${t.textMain}`}>
                        {isAuthenticated ? 'Your Profile' : 'Sign In'}
                    </h2>
                    <button onClick={onClose} className={`p-2 rounded-xl transition-colors hover:bg-white/10 ${t.textMain} opacity-70 hover:opacity-100`}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8">
                    {!isAuthenticated ? (
                        step === 'login' ? (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-opacity-10 ${t.accent}`}>
                                        <Phone className={`w-8 h-8 ${accentText}`} />
                                    </div>
                                    <h3 className={`text-lg font-bold ${t.textMain} mb-2`}>Login with WhatsApp</h3>
                                    <p className={`${t.textMain} opacity-60 text-sm`}>We'll send you a one-time password on WhatsApp</p>
                                </div>

                                <form onSubmit={handleSendOtp} className="space-y-4">
                                    <div className="relative">
                                        <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${t.textMain} opacity-40`} />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            className={`w-full pl-12 pr-4 py-4 ${inputBg} border border-opacity-20 ${borderColor} rounded-xl ${t.textMain} placeholder:opacity-30 focus:border-opacity-100 transition-all outline-none`}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || mobile.length !== 10}
                                        className={`w-full py-4 bg-gradient-to-r ${t.accentGradientFrom} ${t.accentGradientTo} text-white font-bold rounded-xl hover:shadow-lg hover:shadow-current/30 disabled:opacity-50 transition-all`}
                                    >
                                        {loading ? 'Sending...' : 'Send OTP'}
                                    </button>
                                </form>

                                <div className="relative py-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className={`w-full border-t border-opacity-10 ${borderColor}`}></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className={`px-4 ${t.bgMobile} ${t.textMain} opacity-50 text-sm italic`}>or continue with</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGoogleLogin}
                                    className={`w-full py-4 ${inputBg} border border-opacity-20 ${borderColor} ${t.textMain} hover:bg-opacity-80 font-bold rounded-xl flex items-center justify-center gap-3 transition-all`}
                                >
                                    <Chrome className="w-5 h-5" />
                                    Sign in with Google
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-opacity-10 ${t.accent}`}>
                                        <ShieldCheck className={`w-8 h-8 ${accentText}`} />
                                    </div>
                                    <h3 className={`text-lg font-bold ${t.textMain} mb-2`}>Enter Verification Code</h3>
                                    <p className={`${t.textMain} opacity-60 text-sm`}>Code sent to +91 {mobile}</p>
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
                                                className={`w-12 h-14 ${inputBg} border border-opacity-20 ${borderColor} rounded-xl ${t.textMain} text-center text-xl font-bold focus:border-opacity-100 outline-none transition-all`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || otp.length !== 6}
                                        className={`w-full py-4 bg-gradient-to-r ${t.accentGradientFrom} ${t.accentGradientTo} text-white font-bold rounded-xl hover:shadow-lg hover:shadow-current/30 disabled:opacity-50 transition-all`}
                                    >
                                        {loading ? 'Verifying...' : 'Verify OTP'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep('login');
                                            setOtp('');
                                        }}
                                        className={`w-full ${t.textMain} opacity-60 text-sm hover:opacity-100 hover:underline transition-colors`}
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
                                    <div className={`w-24 h-24 rounded-full border-2 border-opacity-50 ${borderColor} overflow-hidden ${inputBg}`}>
                                        {previewImage || user?.image ? (
                                            <img src={previewImage || user.image} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center text-3xl font-bold ${accentText}`}>
                                                {user?.firstName?.[0] || user?.name?.[0] || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setSelectedFile(file);
                                                setPreviewImage(URL.createObjectURL(file));
                                                // Auto-enable edit mode if image is changed
                                                setIsEditing(true);
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`absolute bottom-0 right-0 p-2 ${t.accent} rounded-full text-white shadow-lg group-hover:scale-110 transition-transform cursor-pointer hover:bg-opacity-90`}
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className={`text-xl font-bold ${t.textMain}`}>{user?.name || `${user?.firstName} ${user?.lastName}`}</h3>
                                    <p className={`${t.textMain} opacity-60 text-sm`}>{user?.phone || user?.mobile || 'No phone'}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={async () => {
                                        if (isEditing) {
                                            // Handle Save
                                            setLoading(true);
                                            try {
                                                const formData = new FormData();
                                                formData.append('name', profileData.name);
                                                formData.append('email', profileData.email);
                                                if (selectedFile) {
                                                    formData.append('image', selectedFile);
                                                }

                                                await updateProfile(formData);
                                                setIsEditing(false);
                                                setSelectedFile(null);
                                                toast.success('Profile updated successfully');
                                            } catch (error) {
                                                console.error(error);
                                                toast.error('Failed to update profile');
                                            } finally {
                                                setLoading(false);
                                            }
                                        } else {
                                            setIsEditing(true);
                                        }
                                    }}
                                    className={`absolute top-0 right-0 p-2.5 rounded-xl border transition-all ${isEditing
                                        ? `bg-green-500/20 border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse`
                                        : `bg-white/5 border-white/10 ${t.textHover} hover:bg-white/10`
                                        }`}
                                >
                                    {isEditing ? <Check className="w-5 h-5 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" /> : <Pencil className="w-5 h-5" />}
                                </motion.button>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${t.textMain} opacity-40`} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={profileData.email}
                                        disabled={!isEditing}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                        className={`w-full pl-12 pr-4 py-4 ${inputBg} border border-opacity-20 ${borderColor} rounded-xl ${t.textMain} placeholder:opacity-30 focus:border-opacity-100 transition-all outline-none ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                    />
                                </div>
                                <div className="relative">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${t.textMain} opacity-40`} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={profileData.name}
                                        disabled={!isEditing}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                                        className={`w-full pl-12 pr-4 py-4 ${inputBg} border border-opacity-20 ${borderColor} rounded-xl ${t.textMain} placeholder:opacity-30 focus:border-opacity-100 transition-all outline-none ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                                    />
                                </div>
                            </div>

                            {!isEditing && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={onClose}
                                    className={`w-full py-4 border border-green-500/30 text-green-500 font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-green-500/10 transition-all`}
                                >
                                    Continue to Booking
                                    <ChevronRight className="w-4 h-4" />
                                </motion.button>
                            )}

                            <button
                                onClick={() => {
                                    logout();
                                    onClose();
                                }}
                                className={`w-full py-4 border border-red-500/30 text-red-500 font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all`}
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
