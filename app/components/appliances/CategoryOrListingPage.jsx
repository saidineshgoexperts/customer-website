'use client';

import React, { useState, useEffect } from 'react';
import { CategoryPage } from '@/components/appliances/CategoryPage';
import { ServicesListingPage } from '@/components/appliances/ServicesListingPage';
import { Loader2 } from 'lucide-react';

export function CategoryOrListingPage({ slug }) {
    const [viewType, setViewType] = useState('loading'); // 'loading', 'category', 'listing', '404'
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        const checkSlugType = async () => {
            try {
                // 1. Try to fetch as a Category first
                // We can use the getsubcategorysbycategoryid API which takes a slug.
                // If it returns success and data, it's likely a category.
                const response = await fetch('https://api.doorstephub.com/v1/dhubApi/app/applience-repairs-website/getsubcategorysbycategoryid', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slug: slug })
                });

                const data = await response.json();

                if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                    // It's a valid category
                    setCategoryData(data); // Pass this data to avoid re-fetching if possible, or just let CategoryPage fetch
                    setViewType('category');
                } else {
                    // If not a category, assume it's a listing (subcategory)
                    // ServicesListingPage will handle the validity of the slug for listing
                    setViewType('listing');
                }
            } catch (error) {
                console.error("Error checking slug type:", error);
                // Fallback to listing if category check fails errors out (network issue or otherwise)
                // or maybe 404? For now, let's try listing.
                setViewType('listing');
            }
        };

        if (slug) {
            checkSlugType();
        }
    }, [slug]);

    if (viewType === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <Loader2 className="w-8 h-8 text-[#037166] animate-spin" />
            </div>
        );
    }

    if (viewType === 'category') {
        return <CategoryPage slug={slug} initialData={categoryData} />;
    }

    if (viewType === 'listing') {
        return <ServicesListingPage slug={slug} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
            <p>Page not found</p>
        </div>
    );
}
