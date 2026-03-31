---
title: Mantle Agent Marketplace
description: A marketplace for browsing and installing Plugins, Skills, and MCP tools in the Mantle ecosystem.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

# Project Guidelines

> Project details are defined in `PROJECT.md` — read it for full context.

## Project Overview

Next.js fullstack marketplace for the Mantle ecosystem. Users browse Plugins, Skills, and MCP tools across platforms (Mantle / Bybit / Byreal TBD) and copy install commands. Official Mantle items are visually distinguished. Data is synced from GitHub repos at build time via GitHub Actions cron.

## Project Type

- [x] Fullstack (frontend + backend)

---

## Tech Stack

- **Language**: TypeScript (strict)
- **Package Manager**: pnpm
- **Framework**: Next.js App Router (SSG + API Routes)
- **Styling**: Tailwind CSS
- **Testing**: Vitest (unit), Playwright (E2E)
- **Deployment**: Vercel

## Common Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Run development server
pnpm build          # Build for production
pnpm test           # Run tests
pnpm format         # Format code with Prettier
```

---

## Architecture

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
│           └── route.ts
├── components/
│   ├── platform-tabs.tsx                 # 'use client'
│   ├── category-tabs.tsx                 # 'use client'
│   ├── item-card.tsx                     # server component
│   └── install-command.tsx               # 'use client' (clipboard)
└── lib/
    ├── github.ts                         # GitHub API fetch (server only)
    ├── item-guides.ts                    # per-slug "when to use / what it does" content
    └── types.ts                          # shared types
```

## Conventions

- Separate server and client code clearly — use `"use client"` / `"use server"` directives
- File naming: kebab-case for all files
- Keep API routes thin — delegate logic to `lib/`
- Use `generateStaticParams` for all dynamic routes
- Use `frontend-design` plugin for all UI/UX implementation

## Domain

- **Plugin**: Claude Code plugin extending Claude's capabilities
- **Skill**: Reusable prompt/workflow packaged as a skill
- **MCP**: Model Context Protocol tool — external tool integration
- **Official item**: Provided directly by Mantle (or respective platform) — shown with `✓ OFFICIAL` orange text badge (no filled background)
- Platforms: `mantle` | `bybit` | `byreal`
- Categories: `plugins` | `skills` | `mcp` (plugins featured first)

## References

- Reference site: https://claudemarketplaces.com/ (we feature Plugins first, unlike this)
- Official skills repo: https://github.com/mantle-xyz/mantle-skills
- Official scaffold repo: https://github.com/mantle-xyz/mantle-agent-scaffold
- Next.js docs: https://nextjs.org/docs

## Data Sync

- Data fetched from GitHub at build time (`lib/github.ts`)
- GitHub Actions cron triggers rebuild every hour
- Official repos: `mantle-xyz/mantle-skills`, `mantle-xyz/mantle-agent-scaffold`
- `GITHUB_PERSONAL_ACCESS_TOKEN` env var required to avoid rate limiting

---

## Gotchas

- `fs` module cannot be used in client components — move all `lib/data.ts` calls to server components and pass data as props
- Tags in `SYNC_CONFIGS` are the source of truth — never hardcode `tags: []` in `github.ts`; use `config.tags ?? []`
- CSS `group-hover` tooltips disappear when mouse moves onto the panel — use `useState` + `onMouseEnter/Leave` on a shared wrapper instead
- `CategoryInfoTooltip` uses per-slug guide data from `src/lib/item-guides.ts` — add an entry there when adding a new item to `SYNC_CONFIGS`
- Official item badge is `✓ OFFICIAL` orange text (no filled background)

---

## Plugin Usage

| Situation              | Plugin / Skill                 |
| ---------------------- | ------------------------------ |
| Starting a new feature | `/feature-dev`                 |
| Building UI components | `/frontend-design`             |
| Working with a library | `context7` (auto)              |
| After writing code     | `/code-simplifier`             |
| E2E testing            | `playwright` MCP               |
| Before creating a PR   | `/pr-review-toolkit:review-pr` |
| Creating a commit      | `/commit`                      |
| Creating a PR          | `/commit-push-pr`              |
| End of session         | `/revise-claude-md`            |
