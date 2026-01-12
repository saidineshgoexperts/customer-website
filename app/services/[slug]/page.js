import { notFound } from 'next/navigation';
import ServiceProviderFlow from '../../../src/provider/ServiceProviderFlow';

// Valid service slugs
const validServiceSlugs = [
  'appliances',
  'pg-hostel',
  'religious',
  'spa-salon',
  'daily-needs',
  'medicine',
  'parcel',
];

// Service metadata for SEO
const serviceMetadata = {
  appliances: {
    title: 'Appliance Services - Doorstep Hub',
    description: 'Professional appliance repair and maintenance services at your doorstep',
  },
  'pg-hostel': {
    title: 'PG & Hostel Services - Doorstep Hub',
    description: 'Find premium PG and hostel accommodations',
  },
  religious: {
    title: 'Religious Services - Doorstep Hub',
    description: 'Book religious services and ceremonies',
  },
  'spa-salon': {
    title: 'Spa & Salon Services - Doorstep Hub',
    description: 'Premium spa and salon services at your doorstep',
  },
  'daily-needs': {
    title: 'Daily Needs Services - Doorstep Hub',
    description: 'Get your daily needs delivered to your doorstep',
  },
  medicine: {
    title: 'Medicine Services - Doorstep Hub',
    description: 'Order medicines online with doorstep delivery',
  },
  parcel: {
    title: 'Parcel Services - Doorstep Hub',
    description: 'Send and receive parcels with ease',
  },
};

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  
  if (!slug || !validServiceSlugs.includes(slug)) {
    return {
      title: 'Service Not Found - Doorstep Hub',
    };
  }

  const metadata = serviceMetadata[slug] || serviceMetadata.appliances;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export async function generateStaticParams() {
  return validServiceSlugs.map((slug) => ({
    slug,
  }));
}

export default function ServicePage({ params }) {
  const slug = params?.slug;

  // Validate slug - server-side
  if (!slug || !validServiceSlugs.includes(slug)) {
    notFound();
  }

  return <ServiceProviderFlow serviceType={slug} />;
}
