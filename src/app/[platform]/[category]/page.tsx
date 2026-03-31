import { ItemCard } from '@/components/item-card';
import { CategoryTabs } from '@/components/category-tabs';
import { SearchBar } from '@/components/search-bar';
import { getItemsByPlatformAndCategory } from '@/lib/data';
import { PLATFORMS, CATEGORIES } from '@/lib/constants';
import type { Platform, Category } from '@/lib/types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ platform: string; category: string }>;
}

export function generateStaticParams() {
  return PLATFORMS.flatMap((platform) =>
    CATEGORIES.map((category) => ({ platform, category })),
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const { platform, category } = await params;

  if (!PLATFORMS.includes(platform as Platform)) notFound();
  if (!CATEGORIES.includes(category as Category)) notFound();

  const items = getItemsByPlatformAndCategory(
    platform as Platform,
    category as Category,
  );

  return (
    <div className="mt-6">
      <CategoryTabs />
      <div className="mt-4">
        <SearchBar />
      </div>
      {items.length === 0 ? (
        <p className="mt-16 text-center text-gray-400">No items found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
