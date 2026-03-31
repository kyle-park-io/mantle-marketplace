'use client';

import type { Category } from '@/lib/types';

interface CategoryInfo {
  title: string;
  description: string;
}

const CATEGORY_INFO: Record<Category, CategoryInfo> = {
  skills: {
    title: 'About Skills',
    description:
      "A Skill is a reusable prompt/workflow package that extends Claude's capabilities for specific Mantle tasks. Skills are loaded into Claude's context to guide it through structured workflows — like evaluating DeFi risk, analyzing portfolios, or deploying contracts safely.",
  },
  plugins: {
    title: 'About Plugins',
    description:
      'A Plugin is a full Claude Code extension that adds new commands, tools, and behaviors to your agent. Unlike Skills (which are prompt-based), Plugins ship executable code that runs alongside Claude — typically as an MCP server, slash command set, or scaffold toolkit.',
  },
  mcp: {
    title: 'About MCP',
    description:
      'An MCP (Model Context Protocol) tool connects Claude to external services and blockchain data via a standardized protocol. MCP servers expose tools that Claude can call at runtime — like reading on-chain balances, querying subgraphs, or simulating transactions.',
  },
};

interface CategoryInfoTooltipProps {
  category: Category;
}

export function CategoryInfoTooltip({ category }: CategoryInfoTooltipProps) {
  const info = CATEGORY_INFO[category];

  return (
    <div className="group relative inline-flex items-center">
      {/* Trigger button */}
      <button
        type="button"
        aria-label={`Learn more: ${info.title}`}
        className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-stone-300 bg-stone-100 text-[10px] font-semibold text-stone-400 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1"
      >
        ?
      </button>

      {/* Tooltip */}
      <div
        role="tooltip"
        className="pointer-events-none absolute left-6 top-1/2 z-50 w-72 -translate-y-1/2 rounded-lg border border-stone-200 bg-white p-4 shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-orange-500">
          {info.title}
        </p>
        <p className="text-xs leading-relaxed text-stone-600">
          {info.description}
        </p>
      </div>
    </div>
  );
}
