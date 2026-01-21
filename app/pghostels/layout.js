import { PGHostelNavbar } from '@/components/pghostels/PGHostelNavbar';

export const metadata = {
    title: 'PG & Hostels Booking | SuperHub',
    description: 'Find verified PGs, co-living spaces, and hostels near your college or office. Book instantly with zero brokerage.',
};

export default function PGHostelsLayout({ children }) {
    return (
        <>
            <PGHostelNavbar />
            {children}
        </>
    );
}
