'use client';

import { useState, useCallback, useMemo } from 'react';
import { ItemCard } from '@/components/item-card';
import { CategoryTabs } from '@/components/category-tabs';
import { SearchBar } from '@/components/search-bar';
import { getItemsByPlatformAndCategory } from '@/lib/data';
import { PLATFORMS, CATEGORIES } from '@/lib/constants';
import type { Platform, Category } from '@/lib/types';
import { notFound } from 'next/navigation';

interface Props {
  platform: string;
  category: string;
}

export function CategoryPageClient({ platform, category }: Props) {
  const [query, setQuery] = useState('');

  if (!PLATFORMS.includes(platform as Platform)) notFound();
  if (!CATEGORIES.includes(category as Category)) notFound();

  const allItems = getItemsByPlatformAndCategory(
    platform as Platform,
    category as Category,
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;

    let regex: RegExp;
    try {
      regex = new RegExp(query, 'i');
    } catch {
      regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }

    return allItems.filter(
      (item) =>
        regex.test(item.name) ||
        regex.test(item.description) ||
        item.tags.some((tag) => regex.test(tag)),
    );
  }, [allItems, query]);

  const handleSearch = useCallback((q: string) => setQuery(q), []);

  return (
    <div className="mt-6">
      <CategoryTabs />
      <div className="mt-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      {filteredItems.length === 0 ? (
        <p className="mt-16 text-center text-stone-400">
          {query ? `No results for "${query}"` : 'No items found.'}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
