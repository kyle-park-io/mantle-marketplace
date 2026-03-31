export type { Platform, Category } from './constants';
import type { Platform, Category } from './constants';

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
  skillPath?: string;
}
