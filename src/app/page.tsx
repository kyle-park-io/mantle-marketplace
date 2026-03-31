import Link from 'next/link';
import { ItemCard } from '@/components/item-card';
import { getItemsByPlatformAndCategory } from '@/lib/data';
import { DEFAULT_PLATFORM, CATEGORIES } from '@/lib/constants';
import type { Category } from '@/lib/constants';

const CATEGORY_LABELS: Record<Category, string> = {
  plugins: 'Plugins',
  skills: 'Skills',
  mcp: 'MCP',
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Mantle Agent Marketplace
        </h1>
        <p className="mt-4 text-lg text-stone-500">
          Browse and install Plugins, Skills, and MCP tools for the Mantle
          ecosystem.
        </p>
        <Link
          href={`/${DEFAULT_PLATFORM}/plugins`}
          className="mt-8 inline-block rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-3 font-medium text-white shadow-sm shadow-orange-200 hover:from-orange-500 hover:to-orange-700 transition-all"
        >
          Browse Marketplace
        </Link>
      </div>

      {/* Category previews */}
      {CATEGORIES.map((category) => {
        const items = getItemsByPlatformAndCategory(
          DEFAULT_PLATFORM,
          category,
        ).slice(0, 3);
        if (items.length === 0) return null;
        return (
          <div key={category} className="mt-16">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {CATEGORY_LABELS[category]}
              </h2>
              <Link
                href={`/${DEFAULT_PLATFORM}/${category}`}
                className="text-sm text-orange-600 hover:text-orange-500"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ItemCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
