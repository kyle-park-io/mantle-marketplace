# Mantle Agent Marketplace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js marketplace site where users can browse and install Mantle ecosystem plugins, skills, and MCP tools.

**Architecture:** Next.js App Router with SSG + API Routes. Data is fetched from GitHub at build time and stored as static JSON. Pages are pre-rendered with `generateStaticParams`. A search API route handles client-side filtering.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS, pnpm, Vercel

---

## File Map

```
src/
├── app/
│   ├── layout.tsx                          # Root layout with nav
│   ├── page.tsx                            # Home page (hero + category preview)
│   ├── [platform]/
│   │   ├── layout.tsx                      # Platform layout with PlatformTabs
│   │   ├── page.tsx                        # Redirects to /[platform]/plugins
│   │   ├── loading.tsx                     # Loading UI
│   │   ├── error.tsx                       # Error UI
│   │   └── [category]/
│   │       ├── page.tsx                    # Category listing page
│   │       └── [slug]/
│   │           └── page.tsx                # Item detail page
│   └── api/
│       └── search/
│           └── route.ts                    # Search API (GET ?q=&platform=&category=)
├── components/
│   ├── platform-tabs.tsx                   # 'use client' — platform switcher
│   ├── category-tabs.tsx                   # 'use client' — category switcher
│   ├── item-card.tsx                       # Server component — marketplace card
│   ├── install-command.tsx                 # 'use client' — clipboard copy
│   └── search-bar.tsx                      # 'use client' — search input
└── lib/
    ├── types.ts                            # Shared TypeScript types
    ├── github.ts                           # GitHub API fetch logic
    ├── data.ts                             # Load/parse static JSON data
    └── constants.ts                        # PLATFORMS, CATEGORIES, sync config
data/
└── items.json                              # Generated at build time by sync script
scripts/
└── sync.ts                                 # GitHub sync script (run at build time)
.github/
└── workflows/
    └── sync.yml                            # Cron job: hourly rebuild + deploy
```

---

## Task 1: Initialize Next.js Project

**Files:**

- Modify: `package.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `next.config.ts`
- Create: `.env.example`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Install Next.js and dependencies**

```bash
pnpm add next@15 react@19 react-dom@19
pnpm add -D @types/react @types/react-dom tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p
```

- [ ] **Step 2: Update package.json scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "tsx scripts/sync.ts && next build",
    "start": "next start",
    "sync": "tsx scripts/sync.ts",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check-files": "ts-node .claude/hooks/check-project-files.ts"
  }
}
```

- [ ] **Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Configure Tailwind (tailwind.config.ts)**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Create root layout**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mantle Agent Marketplace',
  description: 'Browse and install plugins, skills, and MCP tools for the Mantle ecosystem.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create globals.css**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 7: Create placeholder home page**

```typescript
// src/app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Mantle Agent Marketplace</h1>
    </main>
  );
}
```

- [ ] **Step 8: Create .env.example**

```bash
# GitHub Personal Access Token for syncing external repos (mantle-xyz/*)
# Requires repo:read scope. The built-in GITHUB_TOKEN cannot access external repos.
MARKETPLACE_GITHUB_TOKEN=
```

- [ ] **Step 9: Run dev server and verify**

```bash
pnpm dev
```

Expected: Next.js dev server starts at http://localhost:3000

- [ ] **Step 10: Commit**

Stage the files and use `/commit` with message:
`chore: initialize next.js project with tailwind`

```bash
git add next.config.ts tailwind.config.ts postcss.config.mjs src/ .env.example package.json pnpm-lock.yaml
```

---

## Task 2: Define Types and Constants

**Files:**

- Create: `src/lib/types.ts`
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Create shared types**

```typescript
// src/lib/types.ts
export type Platform = 'mantle' | 'bybit' | 'byreal';
export type Category = 'plugins' | 'skills' | 'mcp';

export interface MarketplaceItem {
  slug: string;
  name: string;
  description: string;
  category: Category;
  platform: Platform;
  isOfficial: boolean;
  installCommand: string;
  author: string;
  version: string;
  readme: string;
  githubUrl?: string;
  tags: string[];
  updatedAt: string;
}

export interface GithubSyncConfig {
  repo: string;
  platform: Platform;
  category: Category;
  isOfficial: boolean;
}
```

- [ ] **Step 2: Create constants**

```typescript
// src/lib/constants.ts
import type { GithubSyncConfig, Platform, Category } from './types';

export const PLATFORMS: Platform[] = ['mantle', 'bybit', 'byreal'];

export const CATEGORIES: Category[] = ['plugins', 'skills', 'mcp'];

export const DEFAULT_PLATFORM: Platform = 'mantle';
export const DEFAULT_CATEGORY: Category = 'plugins';

export const SYNC_CONFIGS: GithubSyncConfig[] = [
  {
    repo: 'mantle-xyz/mantle-agent-scaffold',
    platform: 'mantle',
    category: 'plugins',
    isOfficial: true,
  },
  {
    repo: 'mantle-xyz/mantle-skills',
    platform: 'mantle',
    category: 'skills',
    isOfficial: true,
  },
];
```

- [ ] **Step 3: Commit**

Stage the files and use `/commit` with message:
`feat(lib): add shared types and constants`

```bash
git add src/lib/types.ts src/lib/constants.ts
```

---

## Task 3: GitHub Sync Script

**Files:**

- Create: `scripts/sync.ts`
- Create: `src/lib/github.ts`
- Create: `data/items.json` (generated)

- [ ] **Step 1: Install dependencies**

```bash
pnpm add -D tsx
```

- [ ] **Step 2: Create GitHub fetch logic**

```typescript
// src/lib/github.ts
import type { GithubSyncConfig, MarketplaceItem } from './types';

interface GithubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  topics: string[];
}

interface GithubPackageJson {
  version?: string;
  author?: string | { name: string };
}

async function fetchWithAuth(url: string): Promise<Response> {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
  if (process.env.MARKETPLACE_GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.MARKETPLACE_GITHUB_TOKEN}`;
  }
  return fetch(url, { headers });
}

async function fetchRepoMeta(repo: string): Promise<GithubRepoResponse> {
  const res = await fetchWithAuth(`https://api.github.com/repos/${repo}`);
  if (!res.ok) throw new Error(`Failed to fetch repo ${repo}: ${res.status}`);
  return res.json() as Promise<GithubRepoResponse>;
}

async function fetchReadme(repo: string): Promise<string> {
  const res = await fetchWithAuth(
    `https://api.github.com/repos/${repo}/readme`,
  );
  if (!res.ok) return '';
  const data = (await res.json()) as { content: string; encoding: string };
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

async function fetchPackageJson(repo: string): Promise<GithubPackageJson> {
  const res = await fetchWithAuth(
    `https://api.github.com/repos/${repo}/contents/package.json`,
  );
  if (!res.ok) return {};
  const data = (await res.json()) as { content: string; encoding: string };
  try {
    return JSON.parse(
      Buffer.from(data.content, 'base64').toString('utf-8'),
    ) as GithubPackageJson;
  } catch {
    return {};
  }
}

export async function fetchItemFromRepo(
  config: GithubSyncConfig,
): Promise<MarketplaceItem> {
  const [meta, readme, pkg] = await Promise.all([
    fetchRepoMeta(config.repo),
    fetchReadme(config.repo),
    fetchPackageJson(config.repo),
  ]);

  const repoName = config.repo.split('/')[1];
  const author =
    typeof pkg.author === 'string'
      ? pkg.author
      : (pkg.author?.name ?? config.repo.split('/')[0]);

  return {
    slug: repoName,
    name: repoName,
    description: meta.description ?? '',
    category: config.category,
    platform: config.platform,
    isOfficial: config.isOfficial,
    installCommand: `claude install ${repoName}`,
    author,
    version: pkg.version ?? '0.0.0',
    readme,
    githubUrl: meta.html_url,
    tags: meta.topics,
    updatedAt: meta.pushed_at,
  };
}
```

- [ ] **Step 3: Create sync script**

```typescript
// scripts/sync.ts
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
```

- [ ] **Step 4: Add data/ to .gitignore**

Add to `.gitignore`:

```
# Generated data (sync output)
data/
```

- [ ] **Step 5: Run sync script and verify**

```bash
MARKETPLACE_GITHUB_TOKEN=your_token pnpm sync
```

Expected: `data/items.json` created with array of items.

- [ ] **Step 6: Commit**

Stage the files and use `/commit` with message:
`feat(sync): add github sync script and fetch logic`

```bash
git add scripts/sync.ts src/lib/github.ts .gitignore
```

---

## Task 4: Data Loading Library

**Files:**

- Create: `src/lib/data.ts`

- [ ] **Step 1: Create data loading utility**

```typescript
// src/lib/data.ts
import { readFileSync } from 'fs';
import { join } from 'path';
import type { MarketplaceItem, Platform, Category } from './types';

function loadItems(): MarketplaceItem[] {
  try {
    const raw = readFileSync(join(process.cwd(), 'data/items.json'), 'utf-8');
    return JSON.parse(raw) as MarketplaceItem[];
  } catch {
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
```

- [ ] **Step 2: Commit**

Stage the files and use `/commit` with message:
`feat(lib): add data loading utilities`

```bash
git add src/lib/data.ts
```

---

## Task 5: Search API Route

**Files:**

- Create: `src/app/api/search/route.ts`

- [ ] **Step 1: Create search route**

```typescript
// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllItems } from '@/lib/data';
import type { Platform, Category } from '@/lib/types';

export function GET(request: NextRequest): NextResponse {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q')?.toLowerCase() ?? '';
  const platform = searchParams.get('platform') as Platform | null;
  const category = searchParams.get('category') as Category | null;

  let items = getAllItems();

  if (platform) {
    items = items.filter((item) => item.platform === platform);
  }

  if (category) {
    items = items.filter((item) => item.category === category);
  }

  if (q) {
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  return NextResponse.json(items);
}
```

- [ ] **Step 2: Update tsconfig.json to support path aliases**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 3: Commit**

Stage the files and use `/commit` with message:
`feat(api): add search route with platform/category/query filters`

```bash
git add src/app/api/search/route.ts tsconfig.json
```

---

## Task 6: Core UI Components

**Files:**

- Create: `src/components/install-command.tsx`
- Create: `src/components/item-card.tsx`
- Create: `src/components/platform-tabs.tsx`
- Create: `src/components/category-tabs.tsx`
- Create: `src/components/search-bar.tsx`

- [ ] **Step 1: Create InstallCommand component**

```typescript
// src/components/install-command.tsx
'use client';

import { useState } from 'react';

interface InstallCommandProps {
  command: string;
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm">
      <code className="flex-1 font-mono text-gray-300">{command}</code>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create ItemCard component**

```typescript
// src/components/item-card.tsx
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
            ? 'border-indigo-500/50 bg-indigo-950/30'
            : 'border-gray-700 bg-gray-900'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white">{item.name}</h3>
          {item.isOfficial && (
            <span className="shrink-0 rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
              ✓ OFFICIAL
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-400 line-clamp-2">
          {item.description}
        </p>
        <p className="mt-2 text-xs text-gray-500">by {item.author}</p>
        <div className="mt-3 font-mono text-xs text-gray-500">
          {item.installCommand}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Create PlatformTabs component**

```typescript
// src/components/platform-tabs.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PLATFORMS, DEFAULT_CATEGORY } from '@/lib/constants';

export function PlatformTabs() {
  const params = useParams<{ platform: string }>();
  const currentPlatform = params.platform;

  return (
    <div className="flex gap-1 border-b border-gray-800">
      {PLATFORMS.map((platform) => (
        <Link
          key={platform}
          href={`/${platform}/${DEFAULT_CATEGORY}`}
          className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
            currentPlatform === platform
              ? 'border-b-2 border-indigo-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {platform}
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create CategoryTabs component**

```typescript
// src/components/category-tabs.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';

export function CategoryTabs() {
  const params = useParams<{ platform: string; category: string }>();
  const { platform: currentPlatform, category: currentCategory } = params;

  return (
    <div className="flex gap-1 border-b border-gray-800">
      {CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/${currentPlatform}/${category}`}
          className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
            currentCategory === category
              ? 'border-b-2 border-indigo-400 text-indigo-300'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Create SearchBar component**

```typescript
// src/components/search-bar.tsx
'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useCallback } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ platform: string; category: string }>();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      const url = `/${params.platform}/${params.category}${q ? `?q=${encodeURIComponent(q)}` : ''}`;
      router.replace(url);
    },
    [router, params],
  );

  return (
    <input
      type="search"
      placeholder="Search..."
      defaultValue={searchParams.get('q') ?? ''}
      onChange={handleSearch}
      className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
    />
  );
}
```

- [ ] **Step 6: Commit**

Stage the files and use `/commit` with message:
`feat(components): add item-card, platform-tabs, category-tabs, install-command, search-bar`

```bash
git add src/components/
```

---

## Task 7: Platform Layout and Listing Page

**Files:**

- Create: `src/app/[platform]/layout.tsx`
- Create: `src/app/[platform]/page.tsx`
- Create: `src/app/[platform]/loading.tsx`
- Create: `src/app/[platform]/error.tsx`
- Create: `src/app/[platform]/[category]/page.tsx`

- [ ] **Step 1: Create platform layout**

```typescript
// src/app/[platform]/layout.tsx
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
```

- [ ] **Step 2: Create platform index page (redirect to plugins)**

```typescript
// src/app/[platform]/page.tsx
import { redirect } from 'next/navigation';
import { DEFAULT_CATEGORY } from '@/lib/constants';

interface PageProps {
  params: Promise<{ platform: string }>;
}

export default async function PlatformPage({ params }: PageProps) {
  const { platform } = await params;
  redirect(`/${platform}/${DEFAULT_CATEGORY}`);
}
```

- [ ] **Step 3: Create loading UI**

```typescript
// src/app/[platform]/loading.tsx
export default function Loading() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-36 animate-pulse rounded-lg bg-gray-800" />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create error UI**

```typescript
// src/app/[platform]/error.tsx
'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mt-16 text-center">
      <p className="text-gray-400">Something went wrong.</p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
      >
        Try again
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Create category listing page**

```typescript
// src/app/[platform]/[category]/page.tsx
import { ItemCard } from '@/components/item-card';
import { CategoryTabs } from '@/components/category-tabs';
import { SearchBar } from '@/components/search-bar';
import { getItemsByPlatformAndCategory } from '@/lib/data';
import { PLATFORMS, CATEGORIES } from '@/lib/constants';
import type { Platform, Category } from '@/lib/types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ platform: string; category: string }>;
  searchParams: Promise<{ q?: string }>;
}

export function generateStaticParams() {
  return PLATFORMS.flatMap((platform) =>
    CATEGORIES.map((category) => ({ platform, category })),
  );
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { platform, category } = await params;
  const { q } = await searchParams;

  if (!PLATFORMS.includes(platform as Platform)) notFound();
  if (!CATEGORIES.includes(category as Category)) notFound();

  let items = getItemsByPlatformAndCategory(
    platform as Platform,
    category as Category,
  );

  if (q) {
    const query = q.toLowerCase();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  return (
    <div className="mt-6">
      <CategoryTabs />
      <div className="mt-4">
        <SearchBar />
      </div>
      {items.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">No items found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Commit**

Stage the files and use `/commit` with message:
`feat(pages): add platform layout and category listing page`

```bash
git add src/app/[platform]/
```

---

## Task 8: Item Detail Page

**Files:**

- Create: `src/app/[platform]/[category]/[slug]/page.tsx`

- [ ] **Step 1: Install markdown renderer**

```bash
pnpm add react-markdown
pnpm add -D @types/react-markdown
```

- [ ] **Step 2: Create detail page**

```typescript
// src/app/[platform]/[category]/[slug]/page.tsx
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

  const item = getItemBySlug(
    platform as Platform,
    category as Category,
    slug,
  );

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{item.name}</h1>
            {item.isOfficial && (
              <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
                ✓ OFFICIAL
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-400">{item.description}</p>
          <p className="mt-1 text-sm text-gray-500">
            by {item.author} · v{item.version}
          </p>
        </div>
        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded border border-gray-700 px-3 py-1.5 text-sm text-gray-400 hover:border-gray-500 hover:text-white transition-colors"
          >
            GitHub →
          </a>
        )}
      </div>

      <InstallCommand command={item.installCommand} />

      {item.readme && (
        <div className="prose prose-invert mt-8 max-w-none">
          <ReactMarkdown>{item.readme}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

Stage the files and use `/commit` with message:
`feat(pages): add item detail page with readme and install command`

```bash
git add src/app/[platform]/[category]/[slug]/
```

---

## Task 9: Home Page

**Files:**

- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update home page**

```typescript
// src/app/page.tsx
import Link from 'next/link';
import { ItemCard } from '@/components/item-card';
import { getItemsByPlatformAndCategory } from '@/lib/data';
import { DEFAULT_PLATFORM, CATEGORIES } from '@/lib/constants';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Mantle Agent Marketplace
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Browse and install plugins, skills, and MCP tools for the Mantle ecosystem.
          </p>
          <Link
            href={`/${DEFAULT_PLATFORM}/plugins`}
            className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>

        {/* Category previews */}
        {CATEGORIES.map((category) => {
          const items = getItemsByPlatformAndCategory(DEFAULT_PLATFORM, category).slice(0, 3);
          if (items.length === 0) return null;
          return (
            <div key={category} className="mt-16">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold capitalize">{category}</h2>
                <Link
                  href={`/${DEFAULT_PLATFORM}/${category}`}
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <ItemCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

Stage the files and use `/commit` with message:
`feat(pages): add home page with hero and category previews`

```bash
git add src/app/page.tsx
```

---

## Task 10: GitHub Actions Cron Sync

**Files:**

- Create: `.github/workflows/sync.yml`

- [ ] **Step 1: Create GitHub Actions workflow**

```yaml
# .github/workflows/sync.yml
name: Sync and Deploy

on:
  schedule:
    - cron: '0 * * * *' # every hour
  workflow_dispatch: # manual trigger

jobs:
  sync-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Sync data from GitHub
        run: pnpm sync
        env:
          GITHUB_TOKEN: ${{ secrets.MARKETPLACE_GITHUB_TOKEN }}

      - name: Build
        run: pnpm build
        env:
          GITHUB_TOKEN: ${{ secrets.MARKETPLACE_GITHUB_TOKEN }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

- [ ] **Step 2: Add required secrets note to .env.example**

```bash
# GitHub Personal Access Token for syncing external repos (mantle-xyz/*)
# Requires repo:read scope. The built-in GITHUB_TOKEN cannot access external repos.
MARKETPLACE_GITHUB_TOKEN=

# Vercel deployment (for GitHub Actions)
# VERCEL_TOKEN=
# VERCEL_ORG_ID=
# VERCEL_PROJECT_ID=
```

- [ ] **Step 3: Commit**

Stage the files and use `/commit` with message:
`ci: add github actions cron sync and vercel deploy workflow`

```bash
git add .github/workflows/sync.yml .env.example
```

---

## Task 11: README and Final Polish

**Files:**

- Modify: `README.md`
- Modify: `README.kr.md`
- Modify: `README.zh.md`
- Modify: `package.json` (update name)

- [ ] **Step 1: Update package.json name**

```json
{
  "name": "mantle-marketplace",
  "description": "Agent marketplace for the Mantle ecosystem"
}
```

- [ ] **Step 2: Update README.md, README.kr.md, README.zh.md**

Follow the readme-conventions.md template. Include:

- Frontmatter
- Language switcher
- Overview, Features, Getting Started, Configuration, Contributing, License sections
- Star History chart (README.md only)

- [ ] **Step 3: Run build to verify everything works**

```bash
pnpm sync && pnpm build
```

Expected: Build completes without errors.

- [ ] **Step 4: Final commit**

Stage the files and use `/commit` with message:
`docs: update readme and package metadata`

```bash
git add README.md README.kr.md README.zh.md package.json
```

---

## Task 12: PR and Deploy

- [ ] **Step 1: Review PR before opening**

```bash
/pr-review-toolkit:review-pr
```

- [ ] **Step 2: Fix any critical issues found**

- [ ] **Step 3: Open PR**

```bash
/commit-push-pr
```

- [ ] **Step 4: Merge and verify Vercel deployment**
