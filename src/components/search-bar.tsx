'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useCallback } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ platform: string; category: string }>();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      const url = `/${params.platform}/${params.category}${q ? `?q=${encodeURIComponent(q)}` : ''}`;
      router.replace(url);
    },
    [router, params],
  );

  return (
    <input
      type="search"
      placeholder="Search..."
      defaultValue={searchParams.get('q') ?? ''}
      onChange={handleSearch}
      className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
    />
  );
}
