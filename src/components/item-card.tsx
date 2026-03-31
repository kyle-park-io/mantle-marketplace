import Link from 'next/link';
import type { MarketplaceItem } from '@/lib/types';

interface ItemCardProps {
  item: MarketplaceItem;
}

export function ItemCard({ item }: ItemCardProps) {
  const href = `/${item.platform}/${item.category}/${item.slug}`;

  return (
    <Link href={href}>
      <div
        className={`rounded-lg border p-4 transition-colors hover:border-indigo-400 ${
          item.isOfficial
            ? 'border-indigo-200 bg-indigo-50'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          {item.isOfficial && (
            <span className="shrink-0 rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
              ✓ OFFICIAL
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>
        <p className="mt-2 text-xs text-gray-400">by {item.author}</p>
        <div className="mt-3 font-mono text-xs text-gray-400">
          {item.installCommand}
        </div>
      </div>
    </Link>
  );
}
