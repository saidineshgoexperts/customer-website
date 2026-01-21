'use client';

import { ThankYouPage } from '@/components/services/ThankYouPage';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ThankYouRoute() {
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
