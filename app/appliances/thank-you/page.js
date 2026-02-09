'use client';

import { ThankYouPage } from '@/components/appliances/ThankYouPage';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const savedAddress = sessionStorage.getItem('selected_address');
        const sessionAddress = savedAddress ? JSON.parse(savedAddress) : null;

        // Prioritize URL params for social/redirect cases, fallback to sessionStorage
        const urlAddress = searchParams.get('address');

        // Format Date if it exists
        const rawDate = searchParams.get('date') || sessionStorage.getItem('last_booking_date');
        let formattedDate = rawDate || 'Confirmed';

        if (rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
            const [year, month, day] = rawDate.split('-');
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            formattedDate = `${day} ${months[parseInt(month) - 1]} ${year}`;
        }

        // Clean up duplicated address parts from URL
        let cleanAddress = urlAddress;
        if (urlAddress) {
            // Split by newline to preserve name/structure
            const lines = urlAddress.split('\n');
            const cleanedLines = lines.map(line => {
                // Split by comma to find duplicated segments within the line (e.g. area repeated)
                const segments = line.split(',').map(s => s.trim());
                // Remove duplicates while preserving order
                const uniqueSegments = segments.filter((item, index) => segments.indexOf(item) === index);
                return uniqueSegments.join(', ');
            });
            cleanAddress = cleanedLines.join('\n');
        }

        const displayAddress = cleanAddress || (sessionAddress ? `${sessionAddress.flat}, ${sessionAddress.area}, ${sessionAddress.cityName}` : '');

        setBookingDetails({
            orderId: searchParams.get('orderId') || '',
            date: formattedDate,
            time: searchParams.get('time') || sessionStorage.getItem('last_booking_time') || '',
            address: displayAddress
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
