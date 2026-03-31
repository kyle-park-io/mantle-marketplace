import type { GithubSyncConfig } from './types';

export const PLATFORMS = ['mantle', 'bybit', 'byreal'] as const;
export type Platform = (typeof PLATFORMS)[number];

export const CATEGORIES = ['plugins', 'skills', 'mcp'] as const;
export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_PLATFORM: Platform = 'mantle';
export const DEFAULT_CATEGORY: Category = 'plugins';

export const CATEGORY_LABELS: Record<Category, string> = {
  plugins: 'Plugins',
  skills: 'Skills',
  mcp: 'MCP',
};

export const SYNC_CONFIGS: GithubSyncConfig[] = [
  // Full scaffold plugin
  {
    repo: 'mantle-xyz/mantle-agent-scaffold',
    platform: 'mantle',
    category: 'plugins',
    isOfficial: true,
    tags: ['scaffold', 'developer-tool', 'cli', 'skills', 'mantle'],
  },
  // MCP server
  {
    repo: 'mantle-xyz/mantle-agent-scaffold',
    platform: 'mantle',
    category: 'mcp',
    isOfficial: true,
    tags: ['mcp', 'stdio', 'mantle', 'defi', 'l2'],
  },
  // Individual skills
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-network-primer',
    tags: ['onboarding', 'reference', 'network', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-address-registry-navigator',
    tags: ['registry', 'safety', 'addresses', 'anti-phishing', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-risk-evaluator',
    tags: ['risk', 'safety', 'defi', 'preflight', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-portfolio-analyst',
    tags: ['portfolio', 'balances', 'allowances', 'read-only', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-data-indexer',
    tags: ['indexer', 'analytics', 'historical', 'graphql', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-readonly-debugger',
    tags: ['debugging', 'rpc', 'diagnostics', 'read-only', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-tx-simulator',
    tags: ['simulation', 'transaction', 'wysiwys', 'safety', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-defi-operator',
    tags: ['defi', 'swap', 'liquidity', 'lending', 'orchestration', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-smart-contract-developer',
    tags: ['smart-contracts', 'design', 'architecture', 'solidity', 'mantle'],
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
    skillPath: 'skills/mantle-smart-contract-deployer',
    tags: [
      'smart-contracts',
      'deployment',
      'verification',
      'explorer',
      'mantle',
    ],
  },
];
