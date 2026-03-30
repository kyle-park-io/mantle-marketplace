import { readFileSync } from 'fs';
import { join } from 'path';
import type { MarketplaceItem, Platform, Category } from './types';

let _cache: MarketplaceItem[] | null = null;

function loadItems(): MarketplaceItem[] {
  if (_cache) return _cache;
  try {
    const raw = readFileSync(join(process.cwd(), 'data/items.json'), 'utf-8');
    _cache = JSON.parse(raw) as MarketplaceItem[];
    return _cache;
  } catch (err) {
    const isNotFound = (err as NodeJS.ErrnoException).code === 'ENOENT';
    if (isNotFound) {
      console.warn(
        'data/items.json not found. Run `pnpm sync` to populate marketplace data.',
      );
    } else {
      console.error(
        'Failed to load marketplace data from data/items.json:',
        err,
      );
    }
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
