import { Header } from '@/components/layout/Header';

export const metadata = {
    title: 'Religious & Spiritual Services | DoorstepHub',
    description: 'Book improved pandits, pujas, and spiritual services. Experience divine connection at your doorstep.',
};

export default function ReligiousServicesLayout({ children }) {
    const religiousTheme = {
        bgScrolled: 'bg-[#fff5e6]/95', // Warm light cream
        bgMobile: 'bg-[#fff5e6]/95',
        textMain: 'text-[#4a0d0d]', // Deep Maroon
        textHover: 'text-[#ff9933]', // Saffron
        border: 'border-[#ff9933]/20',
        accent: 'bg-[#ff9933]',
        accentGradientFrom: 'from-[#800000]', // Maroon
        accentGradientTo: 'to-[#ff9933]', // Saffron
        buttonBg: 'bg-white',
        isLight: true
    };

    return (
        <>
            <Header theme={religiousTheme} />
            {children}
        </>
    );
}
