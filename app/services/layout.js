import { GlobalNav } from '@/components/layout/GlobalNav';
import { Footer } from '@/components/layout/Footer';

export default function ServicesLayout({ children }) {
    return (
        <>
            <GlobalNav />
            {children}
            <Footer />
        </>
    );
}
