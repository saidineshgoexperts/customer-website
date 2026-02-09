'use client';

import { ServiceCartCheckoutPage } from '@/components/appliances/ServiceCartCheckoutPage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutRoute() {
    const router = useRouter();
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const savedAddress = sessionStorage.getItem('selected_address');
        if (savedAddress) {
            setSelectedAddress(JSON.parse(savedAddress));
        }
    }, []);

    return (
        <ServiceCartCheckoutPage
            selectedAddress={selectedAddress}
            onBack={() => router.push('/appliances/address')}
            onSuccess={(data) => {
                router.push(`/appliances/thank-you?orderId=${data?.bookingId || data?.orderId || ''}&date=${data?.bookedDate || ''}&time=${data?.bookedTime || ''}`);
            }}
        />
    );
}
