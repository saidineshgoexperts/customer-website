import { Header } from '@/components/layout/Header';

export const metadata = {
    title: 'Spa & Salon Services | DoorstepHub',
    description: 'Book premium spa, salon, and wellness services at home or nearby.',
};

export default function SpaSalonLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            {children}
        </div>
    );
}
