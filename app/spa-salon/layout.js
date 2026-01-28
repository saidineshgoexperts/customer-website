import { Header } from '@/components/layout/Header';

export const metadata = {
    title: 'Spa & Salon Services | SuperHub',
    description: 'Book premium spa, salon, and wellness services at home or nearby.',
};

export default function SpaSalonLayout({ children }) {
    const spaTheme = {
        bgScrolled: 'bg-white/95',
        bgMobile: 'bg-white/95',
        textMain: 'text-gray-700',
        textHover: 'text-[#C06C84]',
        border: 'border-[#C06C84]/20',
        accent: 'bg-[#C06C84]',
        accentGradientFrom: 'from-[#C06C84]',
        accentGradientTo: 'to-[#6C5CE7]',
        buttonBg: 'bg-gray-50',
    };

    return (
        <div className="min-h-screen">
            <Header theme={spaTheme} />
            {children}
        </div>
    );
}
