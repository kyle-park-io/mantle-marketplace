# Mantle Agent Marketplace — Design Spec

**Date:** 2026-03-30
**Status:** Approved

---

## Overview

An agent marketplace for the Mantle ecosystem. Users can browse Plugins, Skills, and MCP tools, then copy install commands to their terminal. Designed to scale to multiple platforms (Bybit, Byreal TBD) under a unified interface.

Reference: [claudemarketplaces.com](https://claudemarketplaces.com/) — with the key difference that Plugins are featured first.

---

## Target Users

- **Developers**: Build Mantle agents and look for plugins/MCP tools
- **End users**: Use agents and install plugins as needed

---

## Tech Stack

| Item            | Choice                           |
| --------------- | -------------------------------- |
| Framework       | Next.js App Router               |
| Rendering       | SSG + API Routes (hybrid)        |
| Language        | TypeScript (strict)              |
| Package Manager | pnpm                             |
| Deployment      | Vercel                           |
| Data Sync       | GitHub Actions cron (every hour) |

---

## Navigation Structure

Two-level tab structure:

**Top tabs (platform):**

- Mantle (default)
- Bybit
- Byreal (name TBD)

**Sub tabs (category):**

- Plugins (default — featured first)
- Skills
- MCP

---

## Official Item Display

Official Mantle-provided items are distinguished by:

1. **Badge**: `✓ OFFICIAL` badge in the top-right corner of the card
2. **Card color**: Purple-tinted background and border (`rgba(99,102,241,...)`)

Community items use the default card style (no badge, default border).

---

## Install Flow

- Method: **copy command** (one-click clipboard copy)
- Default format: `claude install <package-name>`
- Official Mantle items may have a dedicated CLI command in the future (extension point kept open)

---

## Data Model

```typescript
type Platform = 'mantle' | 'bybit' | 'byreal';
type Category = 'plugins' | 'skills' | 'mcp';

interface MarketplaceItem {
  slug: string;
  name: string;
  description: string;
  category: Category;
  platform: Platform;
  isOfficial: boolean; // applies badge + card color
  installCommand: string; // copied to clipboard
  author: string;
  version: string;
  readme: string; // markdown for detail page
  githubUrl?: string;
  tags: string[];
  updatedAt: string;
}

interface GithubSyncConfig {
  repo: string; // e.g. 'mantle-xyz/mantle-skills'
  platform: Platform;
  category: Category;
  isOfficial: boolean;
}
```

---

## GitHub Sync

### Sync targets

| Repo                               | Platform | Category | Official |
| ---------------------------------- | -------- | -------- | -------- |
| `mantle-xyz/mantle-skills`         | mantle   | skills   | ✓        |
| `mantle-xyz/mantle-agent-scaffold` | mantle   | plugins  | ✓        |
| Community items                    | mantle   | mixed    | -        |

### GitHub Actions cron

```yaml
# .github/workflows/sync.yml
on:
  schedule:
    - cron: '0 * * * *' # every hour
  workflow_dispatch: # manual trigger

jobs:
  sync-and-deploy:
    steps:
      - Fetch data from sync target repos via GitHub API
      - Build Next.js (generateStaticParams for static pages)
      - Deploy to Vercel
```

- Env var: `GITHUB_TOKEN` (prevent API rate limiting)
- On cron failure: previous Vercel deployment stays live

---

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                          # home
│   ├── [platform]/
│   │   ├── layout.tsx                    # PlatformTabs (server component)
│   │   ├── page.tsx                      # listing (default: plugins)
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [category]/
│   │       ├── page.tsx                  # category listing
│   │       └── [slug]/
│   │           └── page.tsx              # detail page
│   └── api/
│       └── search/
│           └── route.ts                  # search API
├── components/
│   ├── platform-tabs.tsx                 # 'use client'
│   ├── category-tabs.tsx                 # 'use client'
│   ├── item-card.tsx                     # server component
│   └── install-command.tsx               # 'use client' (clipboard)
└── lib/
    ├── github.ts                         # GitHub API fetch (server only)
    └── types.ts                          # shared types
```

File naming: kebab-case. Server/client components clearly separated.

---

## v1 Scope

| In scope                              | Out of scope                    |
| ------------------------------------- | ------------------------------- |
| Platform tabs (Mantle default)        | Community submission form (TBD) |
| Category tabs (Plugins/Skills/MCP)    | User auth / login               |
| Listing page with search              | Reviews / ratings               |
| Detail page (README, install command) | Bybit/Byreal real data          |
| Official badge + card color           |                                 |
| GitHub Actions cron sync              |                                 |
| Vercel deployment                     |                                 |

---

## Open Questions

- Confirm exact name for `Byreal`
- Decide community item data source (static JSON vs DB)
- Define official Mantle CLI command format
