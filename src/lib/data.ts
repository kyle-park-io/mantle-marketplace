import { readFileSync } from 'fs';
import { join } from 'path';
import type { MarketplaceItem, Platform, Category } from './types';

function loadItems(): MarketplaceItem[] {
  try {
    const raw = readFileSync(join(process.cwd(), 'data/items.json'), 'utf-8');
    return JSON.parse(raw) as MarketplaceItem[];
  } catch {
    return [];
  }
}

export function getAllItems(): MarketplaceItem[] {
  return loadItems();
}

export function getItemsByPlatformAndCategory(
  platform: Platform,
  category: Category,
): MarketplaceItem[] {
  return loadItems().filter(
    (item) => item.platform === platform && item.category === category,
  );
}

export function getItemBySlug(
  platform: Platform,
  category: Category,
  slug: string,
): MarketplaceItem | undefined {
  return loadItems().find(
    (item) =>
      item.platform === platform &&
      item.category === category &&
      item.slug === slug,
  );
}
