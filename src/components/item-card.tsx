import Link from 'next/link';
import type { MarketplaceItem } from '@/lib/types';

interface ItemCardProps {
  item: MarketplaceItem;
}

export function ItemCard({ item }: ItemCardProps) {
  const href = `/${item.platform}/${item.category}/${item.slug}`;

  return (
    <Link href={href}>
      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 transition-colors hover:border-orange-400">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-900">{item.name}</h3>
          {item.isOfficial && (
            <span className="shrink-0 text-xs font-bold text-orange-500">
              ✓ OFFICIAL
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-stone-500 line-clamp-2">
          {item.description}
        </p>
        <p className="mt-2 text-xs text-stone-400">by {item.author}</p>
        <div className="mt-3 font-mono text-xs text-stone-400">
          {item.installCommand}
        </div>
      </div>
    </Link>
  );
}
