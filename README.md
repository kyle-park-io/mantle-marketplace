---
title: Mantle Agent Marketplace
description: Browse and install Plugins, Skills, and MCP tools for the Mantle ecosystem.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-31
---

**Languages**: English | [한국어](README.kr.md) | [中文](README.zh.md)

# Mantle Agent Marketplace

> Browse and install Plugins, Skills, and MCP tools for the Mantle ecosystem.

## Overview

Mantle Agent Marketplace is a Next.js site that lets developers discover and install Claude Code plugins, reusable skills, and MCP tools across Mantle ecosystem platforms (Mantle, Bybit, Byreal). Items are fetched from GitHub at build time and refreshed every hour via GitHub Actions. Official Mantle items are visually distinguished with a ✓ OFFICIAL badge.

## Features

- Two-level navigation: platform tabs (Mantle / Bybit / Byreal) and category tabs (Plugins / Skills / MCP)
- Regex-powered search bar for filtering items by name, description, or tags
- README viewer on each item detail page — rendered from the source repo
- Sticky info panel on detail pages explaining what each skill, plugin, or MCP does and when to use it
- One-click clipboard copy of install commands
- Back navigation on detail pages
- Build-time GitHub data sync — no runtime database required
- Hourly GitHub Actions cron triggers a rebuild to keep listings fresh

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- pnpm >= 10.0.0
- A GitHub personal access token (`GITHUB_PERSONAL_ACCESS_TOKEN`) to avoid API rate limits

### Installation

```bash
git clone git@github.com:kyle-park-io/mantle-marketplace.git
cd mantle-marketplace
pnpm install
cp .env.example .env
# Fill in GITHUB_PERSONAL_ACCESS_TOKEN in .env
pnpm sync
pnpm dev
```

### Usage

Open [http://localhost:3000](http://localhost:3000) in your browser. Use the platform tabs at the top to switch between Mantle, Bybit, and Byreal. Use the category tabs to filter by Plugins, Skills, or MCP tools. Click any item to view its README and install instructions. Hover the info panel on the right edge to see when to use that item and what it does.

## Configuration

| Variable                       | Required | Description                                         |
| ------------------------------ | -------- | --------------------------------------------------- |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | Yes      | GitHub token for fetching repo data at build time   |
| `VERCEL_TOKEN`                 | For CI   | Vercel API token used by GitHub Actions for deploys |
| `VERCEL_ORG_ID`                | For CI   | Vercel organization ID for the project              |
| `VERCEL_PROJECT_ID`            | For CI   | Vercel project ID for the deployment target         |

Copy `.env.example` to `.env` and fill in the values before running `pnpm sync` or `pnpm build`.

## Contributing

1. Branch off `main`: `git checkout -b feat/<your-feature>`
2. Make your changes and run `pnpm format` before committing
3. Run `/pr-review-toolkit:review-pr` to catch issues early
4. Open a PR via `/commit-push-pr`

All commits must follow the conventional commit format (see `.claude/rules/commit-conventions.md`).

## License

MIT — see [LICENSE](LICENSE)

## Star History

<a href="https://www.star-history.com/?repos=kyle-park-io%2Fmantle-marketplace&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=kyle-park-io/mantle-marketplace&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=kyle-park-io/mantle-marketplace&type=date&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/image?repos=kyle-park-io/mantle-marketplace&type=date&legend=top-left" />
  </picture>
</a>
