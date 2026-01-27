import { ReligiousNavbar } from '@/components/religious/ReligiousNavbar';

export const metadata = {
    title: 'Religious & Spiritual Services | SuperHub',
    description: 'Book improved pandits, pujas, and spiritual services. Experience divine connection at your doorstep.',
};

export default function ReligiousServicesLayout({ children }) {
    return (
        <>
            <ReligiousNavbar />
            {children}
        </>
    );
}
