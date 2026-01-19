import { notFound } from 'next/navigation';
import ServiceProviderFlow from '@/components/services/ServiceProviderFlow';
import { fetchAllServices, getServiceSlug } from '@/lib/api';

// Generate static params from API (for build-time generation)
export async function generateStaticParams() {
    try {
        const services = await fetchAllServices();
        return services.map((service) => ({
            serviceSlug: getServiceSlug(service.name),
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        // Return empty array if API fails during build
        return [];
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const slug = params?.serviceSlug;

    // Map common slugs to titles
    const titleMap = {
        'appliances': 'Appliance Services',
        'pg-hostel': 'PG & Hostel Services',
        'religious': 'Religious Services',
        'spa-salon': 'Spa & Salon Services',
        'daily-needs': 'Daily Needs Services',
        'medicine': 'Medicine Services',
        'parcel': 'Parcel Services',
    };

    const title = titleMap[slug] || 'Services';

    return {
        title: `${title} - Doorstep Hub`,
        description: `Professional ${title.toLowerCase()} at your doorstep`,
    };
}

export default async function ServicePage({ params }) {
    const slug = params?.serviceSlug;

    if (!slug) {
        notFound();
    }

    // Validate slug exists in API (optional runtime validation)
    // For now, we'll let ServiceProviderFlow handle the service display

    return <ServiceProviderFlow serviceType={slug} />;
}
