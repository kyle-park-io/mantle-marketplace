'use client';

import { useCallback, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export function SearchBar({ onSearch, defaultValue = '' }: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onSearch(q);
      }, 200);
    },
    [onSearch],
  );

  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        type="search"
        placeholder="Search by name, description, or tag... (supports regex)"
        defaultValue={defaultValue}
        onChange={handleChange}
        className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm text-stone-900 placeholder-stone-400 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );
}
