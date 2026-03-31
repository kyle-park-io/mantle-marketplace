'use client';

import type { Category } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/constants';

interface CategoryInfoTooltipProps {
  category: Category;
  name: string;
  description: string;
  tags: string[];
}

export function CategoryInfoTooltip({
  category,
  name,
  description,
  tags,
}: CategoryInfoTooltipProps) {
  const label = CATEGORY_LABELS[category];

  return (
    <div className="group fixed right-6 top-1/2 z-40 -translate-y-1/2">
      {/* Trigger tab */}
      <div className="flex cursor-default items-center gap-1.5 rounded-l-lg border border-r-0 border-stone-200 bg-white px-3 py-2.5 shadow-sm transition-colors group-hover:border-orange-300 group-hover:bg-orange-50">
        <svg
          className="h-3.5 w-3.5 text-stone-400 group-hover:text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="rotate-180 text-xs font-semibold text-stone-500 group-hover:text-orange-500 [writing-mode:vertical-rl]">
          About this {label.replace(/s$/, '')}
        </span>
      </div>

      {/* Tooltip panel */}
      <div
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 w-72 -translate-y-1/2 rounded-lg border border-stone-200 bg-white p-4 shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
          {label.replace(/s$/, '')}
        </p>
        <p className="mb-3 text-sm font-semibold text-stone-900">{name}</p>
        <p className="mb-3 text-xs leading-relaxed text-stone-600">
          {description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-stone-100 pt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
