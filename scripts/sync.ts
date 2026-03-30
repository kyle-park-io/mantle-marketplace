import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fetchItemFromRepo } from '../src/lib/github';
import { SYNC_CONFIGS } from '../src/lib/constants';
import type { MarketplaceItem } from '../src/lib/types';

async function main(): Promise<void> {
  console.log('Syncing marketplace data from GitHub...');

  const items: MarketplaceItem[] = [];
  let hasFailed = false;

  for (const config of SYNC_CONFIGS) {
    try {
      const item = await fetchItemFromRepo(config);
      items.push(item);
      console.log(`  ✓ ${item.name}`);
    } catch (err) {
      console.error(`  ✗ Failed to fetch ${config.repo}:`, err);
      hasFailed = true;
    }
  }

  const outDir = join(process.cwd(), 'data');
  const outFile = join(outDir, 'items.json');

  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outFile, JSON.stringify(items, null, 2));
    console.log(`\nWrote ${items.length} items to ${outFile}`);
  } catch (err) {
    console.error(`Failed to write data file to ${outFile}:`, err);
    process.exit(1);
  }

  if (hasFailed) {
    console.error('\nSync completed with errors. Some items may be missing.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
