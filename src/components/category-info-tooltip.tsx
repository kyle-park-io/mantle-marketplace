'use client';

import type { Category } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/constants';
import { ITEM_GUIDES } from '@/lib/item-guides';

interface CategoryInfoTooltipProps {
  category: Category;
  slug: string;
  name: string;
}

export function CategoryInfoTooltip({
  category,
  slug,
  name,
}: CategoryInfoTooltipProps) {
  const label = CATEGORY_LABELS[category];
  const guide = ITEM_GUIDES[slug];

  if (!guide) return null;

  return (
    <div className="group fixed right-0 top-1/2 z-40 -translate-y-1/2">
      {/* Trigger tab */}
      <div className="flex cursor-default flex-col items-center gap-1.5 rounded-l-lg border border-r-0 border-stone-200 bg-white px-2.5 py-3 shadow-sm transition-colors group-hover:border-orange-300 group-hover:bg-orange-50">
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
        <span className="text-[11px] font-semibold text-stone-500 group-hover:text-orange-500 [writing-mode:vertical-lr]">
          About this {label.replace(/s$/, '')}
        </span>
      </div>

      {/* Tooltip panel */}
      <div
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 mr-2 w-72 -translate-y-1/2 rounded-lg border border-stone-200 bg-white p-4 shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100"
      >
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-orange-500">
          {label.replace(/s$/, '')}
        </p>
        <p className="mb-4 text-sm font-semibold text-stone-900">{name}</p>

        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wide">
              When to use
            </p>
            <ul className="space-y-1">
              {guide.whenToUse.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-relaxed text-stone-600"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-stone-100 pt-3">
            <p className="mb-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wide">
              What it does
            </p>
            <ul className="space-y-1">
              {guide.whatItDoes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-relaxed text-stone-600"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
