'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { locationManager } from '@/services/locationManager';
import { LOCATION_CONFIG } from '@/config/locationConfig';

const LocationContext = createContext(null);

/**
 * Helper to load Google Maps Script
 * Why: Required for geocoding and places services
 */
const loadGoogleMapsScript = (callback) => {
    if (typeof window === 'undefined') return;

    if (typeof window.google !== 'undefined' && window.google.maps) {
        callback();
        return;
    }

    // Check if script is already present
    if (document.getElementById('google-maps-script')) {
        // If script exists but window.google is not available, wait for it
        if (typeof window.google === 'undefined' || !window.google.maps) {
            const interval = setInterval(() => {
                if (typeof window.google !== 'undefined' && window.google.maps) {
                    clearInterval(interval);
                    callback();
                }
            }, 100);
            return;
        } else {
            // Already loaded and ready
            callback();
            return;
        }
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    // Removed loading=async to ensure consistent callback behavior with older patterns if needed, 
    // but kept async/defer attributes. Added callback param to URL just in case.
    script.src = `https://maps.googleapis.com/maps/api/js?key=${LOCATION_CONFIG.GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
        // Double check initialization
        if (window.google && window.google.maps) {
            callback();
        } else {
            // Wait for partial load
            const interval = setInterval(() => {
                if (window.google && window.google.maps) {
                    clearInterval(interval);
                    callback();
                }
            }, 100);
        }
    };
    document.head.appendChild(script);
};

/**
 * LocationProvider - Production-grade location management
 * 
 * CRITICAL RULES:
 * 1. Never auto-trigger GPS on page load
 * 2. Always read from localStorage first
 * 3. Never block UI rendering for location
 * 4. Ask GPS permission ONLY on explicit user action
 * 5. Never override a saved location automatically
 */
export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMapsLoaded, setIsMapsLoaded] = useState(false);

    useEffect(() => {
        // 1. Load Google Maps (non-blocking)
        if (LOCATION_CONFIG.GOOGLE_MAPS_API_KEY) {
            loadGoogleMapsScript(() => {
                setIsMapsLoaded(true);
                locationManager.initializeGoogleServices();
            });
        } else {
            console.warn('Google Maps API Key missing');
        }

        // 2. Check localStorage first (instant, no async)
        const savedLocation = locationManager.getSavedLocation();
        if (savedLocation) {
            setLocation(savedLocation);
            return; // Exit early, we have a valid cached location
        }

        // 3. Silent IP-based detection as fallback (only if no saved location)
        // Why: Provide city-level location without asking permission
        const detectIPLocation = async () => {
            try {
                setLoading(true);
                const ipLocation = await locationManager.detectWithIP();
                setLocation(ipLocation);
            } catch (err) {
                console.error('IP detection failed:', err);
                // Don't show error to user, just log it
                // User can manually search or use GPS button
            } finally {
                setLoading(false);
            }
        };

        // Small delay to ensure client-side hydration complete
        const timer = setTimeout(() => {
            detectIPLocation();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // 4. Active Cache Maintenance (Every 5 minutes)
    // Why: Ensure location data doesn't go stale while user is on the site
    useEffect(() => {
        const refreshLocation = async () => {
            // Check if current saved location is valid/fresh
            const saved = locationManager.getSavedLocation();

            if (!saved) {
                console.log('Location cache expired, performing silent refresh...');
                try {
                    // Silent update (bypass setLoading to avoid UI flicker)
                    const ipLocation = await locationManager.detectWithIP();
                    setLocation(ipLocation);
                } catch (err) {
                    console.warn('Silent location refresh failed:', err);
                }
            }
        };

        // Align interval with cache duration
        const intervalId = setInterval(refreshLocation, LOCATION_CONFIG.CACHE_DURATION);

        return () => clearInterval(intervalId);
    }, []);

    /**
     * User-initiated GPS detection
     * Why: Only triggered by explicit button click
     */
    const detectWithGPS = async () => {
        setLoading(true);
        setError(null);

        try {
            const gpsLocation = await locationManager.detectWithGPS();
            setLocation(gpsLocation);
            return gpsLocation;
        } catch (err) {
            console.error('GPS detection failed:', err);

            // Fallback to IP detection on GPS failure
            try {
                const ipLocation = await locationManager.detectWithIP();
                setLocation(ipLocation);
                return ipLocation;
            } catch (ipErr) {
                setError('Unable to detect location. Please search manually.');
                throw err;
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Manual IP detection (if user wants to retry)
     * Why: Allow explicit IP-based detection
     */
    const detectWithIP = async () => {
        setLoading(true);
        setError(null);

        try {
            const ipLocation = await locationManager.detectWithIP();
            setLocation(ipLocation);
            return ipLocation;
        } catch (err) {
            console.error('IP detection failed:', err);
            setError('Unable to detect location via IP');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Search for locations
     * Why: Enable manual location selection
     */
    /**
     * Search for locations
     * Why: Enable manual location selection
     */
    const searchLocation = async (query) => {
        if (!isMapsLoaded) {
            console.warn('Google Maps not loaded yet');
            return [];
        }

        try {
            console.log('Searching for:', query);
            const results = await locationManager.searchLocation(query);
            console.log('Search results:', results);
            return results;
        } catch (err) {
            console.error('Search failed:', err);
            return [];
        }
    };

    /**
     * Set location from manual selection
     * Why: Allow users to override auto-detection
     */
    const setManualLocation = async (placeId) => {
        if (!isMapsLoaded) {
            throw new Error('Google Maps not loaded yet');
        }

        setLoading(true);
        setError(null);

        try {
            const manualLocation = await locationManager.setManualLocation(placeId);
            console.log('Manual location set:', manualLocation);
            setLocation(manualLocation);
            return manualLocation;
        } catch (err) {
            console.error('Manual location setting failed:', err);
            setError('Failed to set location');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Clear saved location
     * Why: Allow users to reset and choose new location
     */
    const clearLocation = () => {
        locationManager.clearLocation();
        setLocation(null);
        setError(null);
    };

    return (
        <LocationContext.Provider
            value={{
                location,
                loading,
                error,
                detectWithGPS,
                detectWithIP,
                searchLocation,
                setManualLocation,
                clearLocation,
                isMapsLoaded
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export const useLocationContext = () => useContext(LocationContext);
