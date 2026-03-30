import type { GithubSyncConfig, Platform, Category } from './types';

export const PLATFORMS: Platform[] = ['mantle', 'bybit', 'byreal'];

export const CATEGORIES: Category[] = ['plugins', 'skills', 'mcp'];

export const DEFAULT_PLATFORM: Platform = 'mantle';
export const DEFAULT_CATEGORY: Category = 'plugins';

export const SYNC_CONFIGS: GithubSyncConfig[] = [
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
