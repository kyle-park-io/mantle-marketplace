import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fetchItemFromRepo } from '../src/lib/github';
import { SYNC_CONFIGS } from '../src/lib/constants';
import type { MarketplaceItem } from '../src/lib/types';

async function sync(): Promise<void> {
  console.log('Syncing marketplace data from GitHub...');

  const items: MarketplaceItem[] = [];

  for (const config of SYNC_CONFIGS) {
    console.log(`Fetching ${config.repo}...`);
    try {
      const item = await fetchItemFromRepo(config);
      items.push(item);
      console.log(`  ✓ ${item.name}`);
    } catch (err) {
      console.error(`  ✗ Failed to fetch ${config.repo}:`, err);
    }
  }

  mkdirSync(join(process.cwd(), 'data'), { recursive: true });
  writeFileSync(
    join(process.cwd(), 'data/items.json'),
    JSON.stringify(items, null, 2),
  );

  console.log(
    `Sync complete. ${items.length} items written to data/items.json`,
  );
}

sync().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
