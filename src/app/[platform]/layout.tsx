import { PlatformTabs } from '@/components/platform-tabs';
import { PLATFORMS } from '@/lib/constants';
import type { Platform } from '@/lib/types';
import { notFound } from 'next/navigation';

interface PlatformLayoutProps {
  children: React.ReactNode;
  params: Promise<{ platform: string }>;
}

export function generateStaticParams() {
  return PLATFORMS.map((platform) => ({ platform }));
}

export default async function PlatformLayout({
  children,
  params,
}: PlatformLayoutProps) {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as Platform)) notFound();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <PlatformTabs />
        {children}
      </div>
    </div>
  );
}
