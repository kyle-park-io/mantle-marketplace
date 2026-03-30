export type Platform = 'mantle' | 'bybit' | 'byreal';
export type Category = 'plugins' | 'skills' | 'mcp';

export interface MarketplaceItem {
  slug: string;
  name: string;
  description: string;
  category: Category;
  platform: Platform;
  isOfficial: boolean;
  installCommand: string;
  author: string;
  version: string;
  readme: string;
  githubUrl?: string;
  tags: string[];
  updatedAt: string;
}

export interface GithubSyncConfig {
  repo: string;
  platform: Platform;
  category: Category;
  isOfficial: boolean;
}
