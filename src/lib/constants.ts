export const PLATFORMS = ['mantle', 'bybit', 'byreal'] as const;
export type Platform = (typeof PLATFORMS)[number];

export const CATEGORIES = ['plugins', 'skills', 'mcp'] as const;
export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_PLATFORM: Platform = 'mantle';
export const DEFAULT_CATEGORY: Category = 'plugins';

export const SYNC_CONFIGS: Array<{
  repo: string;
  platform: Platform;
  category: Category;
  isOfficial: boolean;
}> = [
  {
    repo: 'mantle-xyz/mantle-agent-scaffold',
    platform: 'mantle',
    category: 'plugins',
    isOfficial: true,
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
  },
];
