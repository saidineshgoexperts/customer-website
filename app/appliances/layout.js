import { GlobalNav } from '@/components/layout/GlobalNav';
import { Footer } from '@/components/layout/Footer';

export default function AppliancesLayout({ children }) {
    return (
        <>
            <GlobalNav />
            {children}
            <Footer />
        </>
    );
}
