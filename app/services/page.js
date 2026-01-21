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
    return (
        <>
            <Hero />
            <TopCategories />
            <FeaturedServices />
            <RecentlyBooked />
            <PromoBanner />
            <DownloadApp />
            <NearbyStores />
            <PopularCenters />
            <KnowledgeSpace />
            <Newsletter />
        </>
    );
}
