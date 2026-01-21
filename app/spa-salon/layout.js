import { SpaSalonNavbar } from '@/components/spasalon/SpaSalonNavbar';

export default function SpaSalonLayout({ children }) {
    return (
        <div className="min-h-screen">
            <SpaSalonNavbar />
            {children}
        </div>
    );
}
