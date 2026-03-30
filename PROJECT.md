---
title: Mantle Agent Marketplace
description: A marketplace for browsing and installing plugins, skills, and MCP tools in the Mantle ecosystem.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

# Project Brief

## Project Name

Mantle Agent Marketplace

## What It Does

A catalog site where developers and end users can browse plugins, skills, and MCP tools available in the Mantle ecosystem. Users can copy install commands directly from the marketplace. Official Mantle-provided items are visually distinguished from community items. Designed to scale to multiple platforms (Bybit, Byreal TBD) under a unified interface.

## Project Type

- [x] Fullstack (frontend + backend)

## Tech Choices

- **Framework**: Next.js App Router (SSG + API Routes)
- **Database**: None — static JSON generated at build time from GitHub API
- **Styling**: Tailwind CSS
- **State Management**: React Server Components + minimal client state
- **Testing**: Vitest (unit), Playwright (E2E)
- **Deployment**: Vercel

## Key Features

- Two-level tab navigation: platform (Mantle / Bybit / Byreal TBD) → category (Plugins / Skills / MCP)
- Plugins featured first in the category tabs
- Listing page with search and filtering
- Detail page per item: README, version, author, install command
- One-click clipboard copy for install commands (`claude install <package-name>`)
- Official Mantle items distinguished by badge (`✓ OFFICIAL`) + purple-tinted card color
- GitHub Actions cron (every hour) to sync data from official repos and rebuild

## Data Sources

- `mantle-xyz/mantle-skills` — official Mantle skills
- `mantle-xyz/mantle-agent-scaffold` — official Mantle plugins
- Community items: data source TBD (static JSON or DB)

## GitHub Sync

| Repo | Category | Official |
|------|----------|----------|
| `mantle-xyz/mantle-skills` | skills | ✓ |
| `mantle-xyz/mantle-agent-scaffold` | plugins | ✓ |

## Domain Notes

- **Plugin**: A Claude Code plugin that extends Claude's capabilities
- **Skill**: A reusable prompt/workflow packaged as a skill
- **MCP**: Model Context Protocol tool — external tool integration for Claude
- Official items are those provided directly by Mantle (or the respective platform)
- Install command format: `claude install <package-name>`

## Out of Scope

- Community item submission form (TBD for future version)
- User authentication / login
- Reviews or ratings system
- Real data for Bybit / Byreal platforms (v1 is Mantle only)

## Open Questions

- Confirm exact name for `Byreal`
- Decide community item data source (static JSON vs DB)
- Define official Mantle CLI command format (if different from `claude install`)
