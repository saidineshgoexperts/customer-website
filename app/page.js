import { Header } from '../src/components/Header';
import  HeroSection  from '../src/components/HeroSection';
import { BookingServices } from '../src/components/BookingServices';
import { NearbyServiceCenters } from '../src/components/NearbyServiceCenters';
import { LatestSpaServices } from '../src/components/LatestSpaServices';
import { RecommendedSpaSalon } from '../src/components/RecommendedSpaSalon';
import { PremiumPGHostels } from '../src/components/PremiumPGHostels';
import { RecommendedHostels } from '../src/components/RecommendedHostels';
import { LatestReligiousServices } from '../src/components/LatestReligiousServices';
import { RecommendedReligious } from '../src/components/RecommendedReligious';
import { AppDownload } from '../src/components/AppDownload';
import { KnowledgeSection } from '../src/components/KnowledgeSection';
import { Footer } from '../src/components/Footer';

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <BookingServices />
      <NearbyServiceCenters />
      <LatestSpaServices />
      <RecommendedSpaSalon />
      <PremiumPGHostels />
      <RecommendedHostels />
      <LatestReligiousServices />
      <RecommendedReligious />
      <AppDownload />
      <KnowledgeSection />
      <Footer />
    </div>
  );
}
