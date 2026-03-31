'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useCallback, useRef } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ platform: string; category: string }>();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const url = `/${params.platform}/${params.category}${q ? `?q=${encodeURIComponent(q)}` : ''}`;
        router.replace(url);
      }, 300);
    },
    [router, params],
  );

  return (
    <input
      type="search"
      placeholder="Search..."
      defaultValue={searchParams.get('q') ?? ''}
      onChange={handleSearch}
      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
    />
  );
}
