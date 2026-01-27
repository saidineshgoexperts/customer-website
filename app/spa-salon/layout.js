import { SpaSalonNavbar } from '@/components/spasalon/SpaSalonNavbar';

export const metadata = {
    title: 'Spa & Salon Services | SuperHub',
    description: 'Book premium spa, salon, and wellness services at home or nearby.',
};

export default function SpaSalonLayout({ children }) {
    return (
        <div className="min-h-screen">
            <SpaSalonNavbar />
            {children}
        </div>
    );
}
