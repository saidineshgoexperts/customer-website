'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) {
            setToken(savedToken);
            fetchProfile(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async (authToken) => {
        try {
            const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/user/profile', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.data);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const loginWithWhatsApp = async (mobile) => {
        try {
            const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/auth/sendWhatsAppOtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, fcmtoken: '1234' })
            });
            return await response.json();
        } catch (error) {
            toast.error('Failed to send OTP');
            throw error;
        }
    };

    const verifyOtp = async (mobile, otp) => {
        try {
            const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/auth/verifywhatsappOTP', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp, fcmtoken: '1234' })
            });
            const data = await response.json();
            if ((data.success || data.status === 'success') && data.token) {
                setToken(data.token);
                localStorage.setItem('auth_token', data.token);
                await fetchProfile(data.token);
                toast.success('Login successful!');
            }
            return data;
        } catch (error) {
            toast.error('Verification failed');
            throw error;
        }
    };

    const loginWithGoogle = async (idToken) => {
        try {
            const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/auth/loginWithGoogle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken, fcmtoken: '1234' })
            });
            const data = await response.json();
            if (data.success && data.token) {
                setToken(data.token);
                localStorage.setItem('auth_token', data.token);
                await fetchProfile(data.token);
                toast.success('Login successful!');
            }
            return data;
        } catch (error) {
            toast.error('Google Sign-in failed');
            throw error;
        }
    };

    const updateProfile = async (formData) => {
        try {
            const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/user/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.data);
                toast.success('Profile updated successfully!');
            }
            return data;
        } catch (error) {
            toast.error('Failed to update profile');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
        toast.message('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isAuthenticated: !!token,
            loginWithWhatsApp,
            verifyOtp,
            loginWithGoogle,
            updateProfile,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
