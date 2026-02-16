import { Header } from '@/components/layout/Header';
import { NetworkStatus } from '@/components/ui/NetworkStatus';
import { SessionManager } from '@/components/auth/SessionManager';

export const metadata = {
    title: 'PG & Hostels Booking | DoorstepHub',
    description: 'Find verified PGs, co-living spaces, and hostels near your college or office. Book instantly with zero brokerage.',
};

export default function PGHostelsLayout({ children }) {
    const pgTheme = {
        bgScrolled: 'bg-white/95',
        bgMobile: 'bg-white/95',
        textMain: 'text-gray-700',
        textHover: 'text-[#037166]',
        border: 'border-gray-200',
        accent: 'bg-[#037166]',
        accentGradientFrom: 'from-[#037166]',
        accentGradientTo: 'to-[#025951]',
        buttonBg: 'bg-gray-50',
        isLight: true
    };

    return (
        <>
            <NetworkStatus />
            <SessionManager />
            <Header theme={pgTheme} />
            {children}
        </>
    );
}
