'use client';

import { useRouter } from 'next/navigation';
import { ViewAllPage } from '@/components/appliances/ViewAllPage';

export default function AllCategoriesPage() {
    const router = useRouter();

    const handleCategoryClick = (category) => {
        router.push(`/appliances/category/${category._id}?name=${encodeURIComponent(category.title)}`);
    };

    return (
        <ViewAllPage
            type="categories"
            onBack={() => router.back()}
            onCategoryClick={handleCategoryClick}
        />
    );
}
