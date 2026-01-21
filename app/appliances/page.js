'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppliancesPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to services page
        router.replace('/services');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-white">Redirecting to services...</div>
        </div>
    );
}
