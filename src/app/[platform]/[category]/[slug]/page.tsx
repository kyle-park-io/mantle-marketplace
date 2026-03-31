import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { InstallCommand } from '@/components/install-command';
import { CategoryInfoTooltip } from '@/components/category-info-tooltip';
import { CategoryTabs } from '@/components/category-tabs';
import { getItemBySlug, getAllItems } from '@/lib/data';
import { CATEGORY_LABELS } from '@/lib/constants';
import type { Platform, Category } from '@/lib/types';
import { notFound } from 'next/navigation';

function stripFrontmatter(content: string): string {
  if (!content.startsWith('---')) return content;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return content;
  return content.slice(end + 4).trimStart();
}

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
    <>
      <div className="mt-6">
        <CategoryTabs />
      </div>
      <CategoryInfoTooltip
        category={item.category as Category}
        slug={item.slug}
        name={item.name}
      />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
        {/* Back button */}
        <Link
          href={`/${platform}/${category}`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-orange-500"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to {CATEGORY_LABELS[item.category as Category]}
        </Link>

        {/* Hero card */}
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-stone-500">
                  {CATEGORY_LABELS[item.category as Category]}
                </span>
                {item.isOfficial && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
                    ✓ OFFICIAL
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-stone-900">{item.name}</h1>
              <p className="text-base leading-relaxed text-stone-600">
                {item.description}
              </p>
              <p className="flex items-center gap-2 text-sm text-stone-400">
                <span>by {item.author}</span>
                <span className="text-stone-300">·</span>
                <span>v{item.version}</span>
              </p>
            </div>
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            )}
          </div>

          {/* Install */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
              Install
            </p>
            <InstallCommand command={item.installCommand} />
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-stone-100 pt-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* README */}
        {item.readme && (
          <div className="rounded-xl border border-stone-200 bg-white px-8 py-8 shadow-sm">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-wide text-stone-400">
              README
            </h2>
            <div className="prose prose-stone prose-headings:font-semibold prose-a:text-orange-600 prose-code:text-stone-700 prose-code:bg-stone-100 prose-code:rounded prose-pre:bg-stone-100 prose-pre:border prose-pre:border-stone-200 max-w-none">
              <ReactMarkdown skipHtml={true}>
                {stripFrontmatter(item.readme)}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
