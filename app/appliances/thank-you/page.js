'use client';

import { ThankYouPage } from '@/components/appliances/ThankYouPage';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const savedAddress = sessionStorage.getItem('selected_address');
        const address = savedAddress ? JSON.parse(savedAddress) : null;

        setBookingDetails({
            date: searchParams.get('date') || 'Confirmed',
            time: searchParams.get('time') || '',
            address: address ? `${address.flat}, ${address.area}, ${address.cityName}` : ''
        });
    }, [searchParams]);

    return <ThankYouPage bookingDetails={bookingDetails} />;
}

import { Suspense } from 'react';

export default function ThankYouRoute() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    );
}
