'use client';

import React, { createContext, useState, useEffect, useRef, useContext } from 'react';

const LocationContext = createContext(null);

const STORAGE_KEY = 'user_location_data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Helper to load Google Maps Script
const loadGoogleMapsScript = (callback) => {
    if (typeof window.google !== 'undefined' && window.google.maps) {
        callback();
        return;
    }

    if (document.getElementById('google-maps-script')) {
        const interval = setInterval(() => {
            if (typeof window.google !== 'undefined' && window.google.maps) {
                clearInterval(interval);
                callback();
            }
        }, 100);
        return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => callback();
    document.head.appendChild(script);
};

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMapsLoaded, setIsMapsLoaded] = useState(false);

    // Refs for services
    const geocoderRef = useRef(null);
    const autocompleteServiceRef = useRef(null);
    const placesServiceRef = useRef(null);

    useEffect(() => {
        // 1. Load Google Maps
        if (GOOGLE_API_KEY) {
            loadGoogleMapsScript(() => {
                setIsMapsLoaded(true);
                try {
                    geocoderRef.current = new window.google.maps.Geocoder();
                    autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
                    const dummyNode = document.createElement('div');
                    placesServiceRef.current = new window.google.maps.places.PlacesService(dummyNode);
                } catch (e) {
                    console.error("Error initializing Google Maps services:", e);
                }
            });
        } else {
            setError('Google Maps API Key missing');
            setLoading(false);
        }

        // 2. Check Cache
        const checkCache = () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    const age = Date.now() - parsed.timestamp;
                    if (age < CACHE_DURATION) {
                        setLocation(parsed);
                        setLoading(false);
                        return true;
                    }
                }
            } catch (err) {
                console.error('Error reading location cache:', err);
            }
            return false;
        };

        if (!checkCache()) {
            setLoading(false);
        }
    }, []);

    const saveLocation = (data) => {
        const locationData = { ...data, timestamp: Date.now() };
        setLocation(locationData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(locationData));
    };

    const reverseGeocode = (lat, lng) => {
        return new Promise((resolve, reject) => {
            if (!geocoderRef.current) {
                reject(new Error('Google Maps not loaded'));
                return;
            }

            const latlng = { lat, lng };
            geocoderRef.current.geocode({ location: latlng }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const result = results[0];
                    let city = '';
                    let area = '';

                    for (const component of result.address_components) {
                        if (component.types.includes('locality')) {
                            city = component.long_name;
                        }
                        if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
                            area = component.long_name;
                        }
                    }

                    const shortAddress = area ? `${area}, ${city}` : city || result.formatted_address.split(',')[0];

                    const data = {
                        lat,
                        lng,
                        address: result.formatted_address,
                        shortAddress: shortAddress
                    };
                    resolve(data);
                } else {
                    reject(new Error('Geocoder failed: ' + status));
                }
            });
        });
    };

    const detectLocation = async () => {
        setLoading(true);
        setError(null);

        if (!('geolocation' in navigator)) {
            setError('Geolocation is not supported');
            setLoading(false);
            return;
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const data = await reverseGeocode(latitude, longitude);
                        saveLocation(data);
                        setLoading(false);
                        resolve(data);
                    } catch (err) {
                        console.error(err);
                        setError(typeof err === 'string' ? err : err.message || 'Failed to detect location');
                        setLoading(false);
                        reject(err);
                    }
                },
                (err) => {
                    setError(err.message);
                    setLoading(false);
                    reject(err);
                }
            );
        });
    };

    const searchLocation = async (query) => {
        if (!query || !autocompleteServiceRef.current) return [];

        return new Promise((resolve, reject) => {
            const request = {
                input: query,
                componentRestrictions: { country: 'in' },
            };

            autocompleteServiceRef.current.getPlacePredictions(request, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    resolve(predictions.map(p => ({
                        description: p.description,
                        place_id: p.place_id,
                        main_text: p.structured_formatting.main_text,
                        secondary_text: p.structured_formatting.secondary_text
                    })));
                } else {
                    resolve([]);
                }
            });
        });
    };

    const setManualLocation = async (placeId) => {
        return new Promise((resolve, reject) => {
            if (!placesServiceRef.current) {
                reject('Maps service not loaded');
                return;
            }

            placesServiceRef.current.getDetails({ placeId: placeId, fields: ['name', 'formatted_address', 'geometry', 'address_components'] }, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();

                    let city = '';
                    let area = '';
                    if (place.address_components) {
                        for (const component of place.address_components) {
                            if (component.types.includes('locality')) {
                                city = component.long_name;
                            }
                            if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
                                area = component.long_name;
                            }
                        }
                    }
                    const shortAddress = area ? `${area}, ${city}` : city || place.name;

                    const data = {
                        lat,
                        lng,
                        address: place.formatted_address,
                        shortAddress: shortAddress
                    };
                    saveLocation(data);
                    resolve(data);
                } else {
                    reject('Failed to get place details');
                }
            });
        });
    };

    return (
        <LocationContext.Provider value={{
            location,
            loading,
            error,
            detectLocation,
            searchLocation,
            setManualLocation,
            isMapsLoaded
        }}>
            {children}
        </LocationContext.Provider>
    );
}

export const useLocationContext = () => useContext(LocationContext);
