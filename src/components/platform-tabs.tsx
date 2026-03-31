'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PLATFORMS, DEFAULT_CATEGORY } from '@/lib/constants';
import type { Platform } from '@/lib/constants';

const PLATFORM_LOGOS: Record<
  Platform,
  { src: string; width: number; height: number }
> = {
  mantle: { src: '/logos/mantle.svg', width: 28, height: 28 },
  bybit: { src: '/logos/bybit.png', width: 28, height: 28 },
  byreal: { src: '/logos/byreal.png', width: 28, height: 28 },
};

export function PlatformTabs() {
  const params = useParams<{ platform: string }>();
  const currentPlatform = params.platform;

  return (
    <div className="flex gap-1 border-b border-stone-200">
      {PLATFORMS.map((platform) => {
        const logo = PLATFORM_LOGOS[platform];
        return (
          <Link
            key={platform}
            href={`/${platform}/${DEFAULT_CATEGORY}`}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium capitalize transition-colors ${
              currentPlatform === platform
                ? 'border-b-2 border-orange-500 text-stone-900'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Image
              src={logo.src}
              alt={`${platform} logo`}
              width={logo.width}
              height={logo.height}
              className="rounded-sm object-contain"
            />
            {platform}
          </Link>
        );
      })}
    </div>
  );
}
