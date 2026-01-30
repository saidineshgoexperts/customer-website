'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '@/components/services/Hero';
import { ServiceTypeSelectionModal } from '@/components/services/ServiceTypeSelectionModal';
import { TopCategories } from '@/components/services/TopCategories';
import { FeaturedServices } from '@/components/services/FeaturedServices';
import { RecentlyBooked } from '@/components/services/RecentlyBooked';
import { PromoBanner } from '@/components/services/PromoBanner';
import { DownloadApp } from '@/components/services/DownloadApp';
import { NearbyServiceCenters as NearbyStores } from '@/components/services/NearbyStores';
import { PopularCenters } from '@/components/services/PopularCenters';
import { KnowledgeSpace } from '@/components/services/KnowledgeSpace';
import { Newsletter } from '@/components/services/Newsletter';

export default function ServicesPage() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleServiceClick = (serviceId, categoryName, subcategoryName) => {
        // Encode parameters for URL
        const categoryParam = encodeURIComponent(categoryName || 'General');
        const subCategoryParam = encodeURIComponent(subcategoryName || 'Service');

        // Navigate to service detail page
        router.push(`/services/detail/${serviceId}?category=${categoryParam}&subCategory=${subCategoryParam}`);
    };

    const handleTypeSelect = (type) => {
        setShowModal(false);
        if (type === 'partner') {
            router.push('/services/verified');
        } else if (type === 'center') {
            router.push('/services/centers');
        }
    };

    const openModal = () => setShowModal(true);

    return (
        <>
            <Hero
                onBookService={openModal}
                onViewServices={openModal}
            />
            <ServiceTypeSelectionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSelect={handleTypeSelect}
            />
            <TopCategories onViewAll={() => router.push('/services/categories')} />
            <FeaturedServices
                onServiceClick={handleServiceClick}
                onViewAll={() => router.push('/services/featured')}
            />
            <RecentlyBooked
                onServiceClick={handleServiceClick}
                onViewAll={() => router.push('/services/recent')}
            />
            {/* <PromoBanner /> */}
            <DownloadApp />
            <NearbyStores />
            <PopularCenters />
            <KnowledgeSpace />
            <Newsletter />
        </>
    );
}
