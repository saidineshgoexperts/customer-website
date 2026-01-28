'use client';

import { useRouter } from 'next/navigation';
import { Hero } from '@/components/services/Hero';
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

    const handleServiceClick = (serviceId, categoryName, subcategoryName) => {
        // Encode parameters for URL
        const categoryParam = encodeURIComponent(categoryName || 'General');
        const subCategoryParam = encodeURIComponent(subcategoryName || 'Service');

        // Navigate to service detail page
        router.push(`/services/detail/${serviceId}?category=${categoryParam}&subCategory=${subCategoryParam}`);
    };

    return (
        <>
            <Hero
                onBookService={() => router.push('/services/categories')}
                onViewServices={() => router.push('/services/featured')}
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
            <PromoBanner />
            <DownloadApp />
            <NearbyStores />
            <PopularCenters />
            <KnowledgeSpace />
            <Newsletter />
        </>
    );
}
