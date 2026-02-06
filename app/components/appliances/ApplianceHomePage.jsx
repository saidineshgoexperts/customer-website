'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '@/components/appliances/Hero';
import { ServiceBookingModal } from '@/components/appliances/ServiceBookingModal';
import { ServiceTypeSelectionModal } from '@/components/appliances/ServiceTypeSelectionModal';
import { TopCategories } from '@/components/appliances/TopCategories';
import { FeaturedServices } from '@/components/appliances/FeaturedServices';
import { RecentlyBooked } from '@/components/appliances/RecentlyBooked';
import { DownloadApp } from '@/components/appliances/DownloadApp';
import { NearbyServiceCenters as NearbyStores } from '@/components/appliances/NearbyStores';
import { PopularCenters } from '@/components/appliances/PopularCenters';
import { KnowledgeSpace } from '@/components/appliances/KnowledgeSpace';
import { Newsletter } from '@/components/appliances/Newsletter';

export function ApplianceHomePage() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [showExploreModal, setShowExploreModal] = useState(false);

    const handleServiceClick = (serviceId, categoryName, subcategoryName) => {
        const categoryParam = encodeURIComponent(categoryName || 'General');
        const subCategoryParam = encodeURIComponent(subcategoryName || 'Service');
        // We use /appliances here for the new neat navigation
        router.push(`/appliances/detail/${serviceId}?category=${categoryParam}&subCategory=${subCategoryParam}`);
    };

    const openModal = () => setShowModal(true);
    const openExploreModal = () => setShowExploreModal(true);

    const handleExploreSelect = (type) => {
        const typeToId = {
            'partner': '683dbbfbb62d2a241de0f7e3',
            'center': '683dbc04b62d2a241de0f7e8'
        };

        const id = typeToId[type];
        if (id) {
            router.push(`/appliances/child/${id}?category=Services&name=${type === 'partner' ? 'Verified Partners' : 'Service Centers'}`);
        }
        setShowExploreModal(false);
    };

    return (
        <>
            <Hero
                onBookService={openModal}
                onViewServices={openExploreModal}
            />
            <ServiceBookingModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <ServiceTypeSelectionModal
                isOpen={showExploreModal}
                onClose={() => setShowExploreModal(false)}
                onSelect={handleExploreSelect}
            />
            <TopCategories onViewAll={() => router.push('/appliances/categories')} />
            <FeaturedServices
                onServiceClick={handleServiceClick}
                onViewAll={() => router.push('/appliances/featured')}
            />
            <RecentlyBooked
                onServiceClick={handleServiceClick}
                onViewAll={() => router.push('/appliances/recent')}
            />
            <DownloadApp />
            <NearbyStores />
            <PopularCenters onStoreClick={(store) => {
                const categoryParam = encodeURIComponent('General');
                const subCategoryParam = encodeURIComponent(store.speciality || 'Service');
                router.push(`/appliances/detail/${store.id}?category=${categoryParam}&subCategory=${subCategoryParam}`);
            }} />
            <KnowledgeSpace />
            <Newsletter />
        </>
    );
}
