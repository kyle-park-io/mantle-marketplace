import { PLATFORMS, CATEGORIES } from '@/lib/constants';
import { getItemsByPlatformAndCategory } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Platform, Category } from '@/lib/types';
import { CategoryPageClient } from './category-page-client';

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

  return <CategoryPageClient items={items} />;
}
