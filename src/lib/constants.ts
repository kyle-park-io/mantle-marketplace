import type { GithubSyncConfig } from './types';

export const PLATFORMS = ['mantle', 'bybit', 'byreal'] as const;
export type Platform = (typeof PLATFORMS)[number];

export const CATEGORIES = ['plugins', 'skills', 'mcp'] as const;
export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_PLATFORM: Platform = 'mantle';
export const DEFAULT_CATEGORY: Category = 'plugins';

export const SYNC_CONFIGS: GithubSyncConfig[] = [
  // Full scaffold plugin
  {
    repo: 'mantle-xyz/mantle-agent-scaffold',
    platform: 'mantle',
    category: 'plugins',
    isOfficial: true,
  },
  // MCP server
  {
    repo: 'mantle-xyz/mantle-agent-scaffold',
    platform: 'mantle',
    category: 'mcp',
    isOfficial: true,
  },
  // Individual skills
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-network-primer',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-address-registry-navigator',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-risk-evaluator',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-portfolio-analyst',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-data-indexer',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-readonly-debugger',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-tx-simulator',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-defi-operator',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-smart-contract-developer',
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-smart-contract-deployer',
  },
];
