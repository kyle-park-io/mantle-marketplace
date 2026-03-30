---
title: Claude Template
description: A ready-to-use Claude Code configuration template with plugins, rules, and hooks.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

**Languages**: English | [한국어](README.kr.md) | [中文](README.zh.md)

# Claude Template

A ready-to-use Claude Code configuration template. Clone this repo and customize it to match your workflow.

## Overview

This template provides a pre-configured Claude Code setup with plugins, rules, hooks, and conventions baked in. It is designed to be cloned and adapted to any project.

## Features

- Pre-installed plugins (frontend-design, feature-dev, pr-review-toolkit, and more)
- Project rules for commit, PR, code, formatting, and license conventions
- Hooks for auto-formatting and missing file detection
- pnpm + TypeScript setup out of the box

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- pnpm >= 10.0.0
- Claude Code CLI

### Installation

```bash
git clone git@github.com:kyle-park-io/claude-template.git
cd claude-template
pnpm install
```

### Usage

1. Edit `.claude/settings.json` to adjust model, effort, and plugins
2. Copy `CLAUDE.template.md` to `CLAUDE.md` and fill in your project-specific guidelines
3. Copy `.env.example` to `.env` and fill in required tokens

## Project Structure

```
.
├── .claude/
│   ├── hooks/          # Automation scripts (post-write, session-start)
│   ├── rules/          # Project conventions loaded by Claude
│   └── settings.json   # Shared project settings
├── docs/
│   └── PLUGINS.md      # Plugin setup and installation guide
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierrc
├── CLAUDE.template.md
├── package.json
└── tsconfig.json
```

## Configuration

### `.claude/settings.json`

- `model` — Claude model to use (default: `claude-sonnet-4-6`)
- `thinkingEffort` — reasoning effort: `"low"`, `"medium"`, or `"high"`
- `enabledPlugins` — installed plugins
- `hooks` — automation triggers on session start and file writes

### `.claude/settings.local.json`

Personal local overrides. Not committed to the repo.

## Contributing

1. Branch off `main`
2. Follow conventions in `.claude/rules/`
3. Run `/pr-review-toolkit:review-pr` before opening a PR
4. Open PR via `/commit-push-pr`

## License

MIT — see [LICENSE](LICENSE)

## Star History

<a href="https://www.star-history.com/?repos=kyle-park-io%2Fclaude-template&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=kyle-park-io/claude-template&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=kyle-park-io/claude-template&type=date&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/image?repos=kyle-park-io/claude-template&type=date&legend=top-left" />
  </picture>
</a>
