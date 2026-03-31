import { PLATFORMS, CATEGORIES } from '@/lib/constants';
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
  return <CategoryPageClient platform={platform} category={category} />;
}
