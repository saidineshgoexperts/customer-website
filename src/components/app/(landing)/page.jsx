import HeroSection from '@/components/landing/HeroSection';
import { BookingServices } from '@/components/landing/BookingServices';
import { NearbyServiceCenters } from '@/components/landing/NearbyServiceCenters';
import { LatestSpaServices } from '@/components/landing/LatestSpaServices';
import { RecommendedSpaSalon } from '@/components/landing/RecommendedSpaSalon';
import { PremiumPGHostels } from '@/components/landing/PremiumPGHostels';
import { RecommendedHostels } from '@/components/landing/RecommendedHostels';
import { LatestReligiousServices } from '@/components/landing/LatestReligiousServices';
import { RecommendedReligious } from '@/components/landing/RecommendedReligious';
import { AppDownload } from '@/components/landing/AppDownload';
import { KnowledgeSection } from '@/components/landing/KnowledgeSection';

export default function Home() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
            <HeroSection />
            <BookingServices />
            <NearbyServiceCenters />
            <PremiumPGHostels />
            <RecommendedHostels />
            <LatestReligiousServices />
            <RecommendedReligious />
            <LatestSpaServices />
            <RecommendedSpaSalon />
            <AppDownload />
            <KnowledgeSection />
        </div>
    );
}
