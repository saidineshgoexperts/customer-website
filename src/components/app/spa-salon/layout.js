import { Header } from '@/components/layout/Header';

export const metadata = {
    title: 'Spa & Salon Services | DoorstepHub',
    description: 'Book premium spa, salon, and wellness services at home or nearby.',
};

export default function SpaSalonLayout({ children }) {
    const spaSalonTheme = {
        bgScrolled: 'bg-white/80',
        bgMobile: 'bg-white/95',
        textMain: 'text-[#0F172A]',
        textHover: 'text-[#C06C84]',
        border: 'border-[#C06C84]/10',
        accent: 'bg-[#C06C84]',
        accentGradientFrom: 'from-[#C06C84]',
        accentGradientTo: 'to-[#6C5CE7]',
        buttonBg: 'bg-[#F6F7FB]',
        isLight: true
    };

    return (
        <div className="min-h-screen bg-white">
            <Header theme={spaSalonTheme} />
            {children}
        </div>
    );
}
