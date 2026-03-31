import ReactMarkdown from 'react-markdown';
import { InstallCommand } from '@/components/install-command';
import { getItemBySlug, getAllItems } from '@/lib/data';
import type { Platform, Category } from '@/lib/types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ platform: string; category: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllItems().map((item) => ({
    platform: item.platform,
    category: item.category,
    slug: item.slug,
  }));
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { platform, category, slug } = await params;

  const item = getItemBySlug(platform as Platform, category as Category, slug);

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-stone-900">{item.name}</h1>
            {item.isOfficial && (
              <span className="rounded bg-orange-600 px-2 py-0.5 text-xs font-bold text-white">
                ✓ OFFICIAL
              </span>
            )}
          </div>
          <p className="mt-2 text-stone-500">{item.description}</p>
          <p className="mt-1 text-sm text-stone-400">
            by {item.author} · v{item.version}
          </p>
        </div>
        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded border border-orange-400 px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
          >
            GitHub →
          </a>
        )}
      </div>

      <InstallCommand command={item.installCommand} />

      {item.readme && (
        <div className="prose mt-8 max-w-none">
          <ReactMarkdown skipHtml={true}>{item.readme}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
