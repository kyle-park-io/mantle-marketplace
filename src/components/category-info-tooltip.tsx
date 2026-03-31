'use client';

import type { Category } from '@/lib/types';

interface CategoryInfo {
  title: string;
  bullets: string[];
}

const CATEGORY_INFO: Record<Category, CategoryInfo> = {
  skills: {
    title: 'About Skills',
    bullets: [
      'Load structured workflows into Claude's context',
      'Guide Claude through Mantle-specific tasks step by step',
      'Cover DeFi risk evaluation, portfolio analysis, contract deployment, and more',
      'Read-only by default — no signing or broadcasting',
      'Combine multiple skills for complex multi-step operations',
    ],
  },
  plugins: {
    title: 'About Plugins',
    bullets: [
      'Full Claude Code extensions that ship executable code',
      'Add new slash commands and tools to your agent',
      'Typically include an MCP server, skill set, and scaffold toolkit',
      'Install once, use across all your Mantle agent projects',
      'Official plugins are maintained by Mantle team',
    ],
  },
  mcp: {
    title: 'About MCP',
    bullets: [
      'Connect Claude to live blockchain data via Model Context Protocol',
      'Read on-chain balances, token info, and transaction history',
      'Query subgraphs and indexers for historical data',
      'Simulate transactions before signing',
      'Resolve and verify contract addresses against the Mantle registry',
    ],
  },
};

interface CategoryInfoTooltipProps {
  category: Category;
}

export function CategoryInfoTooltip({ category }: CategoryInfoTooltipProps) {
  const info = CATEGORY_INFO[category];

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
        <span className="text-xs font-semibold text-stone-500 group-hover:text-orange-500 [writing-mode:vertical-rl] rotate-180">
          {info.title}
        </span>
      </div>

      {/* Tooltip panel — slides in from the right */}
      <div
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 mr-0 w-64 -translate-y-1/2 rounded-lg border border-stone-200 bg-white p-4 shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-orange-500">
          {info.title}
        </p>
        <ul className="space-y-1.5">
          {info.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-xs leading-relaxed text-stone-600">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
