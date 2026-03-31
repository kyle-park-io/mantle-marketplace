'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';

export function CategoryTabs() {
  const params = useParams<{ platform: string; category: string }>();
  const { platform: currentPlatform, category: currentCategory } = params;

  return (
    <div className="flex gap-1 border-b border-gray-200">
      {CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/${currentPlatform}/${category}`}
          className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
            currentCategory === category
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
