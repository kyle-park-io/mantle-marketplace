'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PLATFORMS, DEFAULT_CATEGORY } from '@/lib/constants';

export function PlatformTabs() {
  const params = useParams<{ platform: string }>();
  const currentPlatform = params.platform;

  return (
    <div className="flex gap-1 border-b border-gray-200">
      {PLATFORMS.map((platform) => (
        <Link
          key={platform}
          href={`/${platform}/${DEFAULT_CATEGORY}`}
          className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
            currentPlatform === platform
              ? 'border-b-2 border-indigo-500 text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {platform}
        </Link>
      ))}
    </div>
  );
}
