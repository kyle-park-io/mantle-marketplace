---
title: Plugin Setup Guide
description: How to register the marketplace and install plugins for Claude Code.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

# Plugin Setup Guide

## 1. Register the Marketplace

Register the official Claude plugins marketplace before installing any plugins.

```bash
claude plugins marketplace add https://github.com/anthropics/claude-plugins-official.git
```

Verify it was added:

```bash
claude plugins marketplace list
```

## 2. Install a Plugin

```bash
claude plugins install <plugin-name>@claude-plugins-official
```

Example:

```bash
claude plugins install frontend-design@claude-plugins-official
```

## 3. Enable / Disable a Plugin

```bash
# Enable
claude plugins enable <plugin-name>

# Disable
claude plugins disable <plugin-name>
```

## 4. List Installed Plugins

```bash
claude plugins list
```

## 5. Uninstall a Plugin

```bash
claude plugins uninstall <plugin-name>
```

## Installed Plugins

Plugins installed in this project (project scope):

| Name                   | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `frontend-design`      | UI/UX design guidance and frontend component best practices                                     |
| `feature-dev`          | Comprehensive feature development workflow with specialized agents                              |
| `context7`             | Up-to-date documentation lookup from source repositories                                        |
| `code-simplifier`      | Simplifies and refines code for clarity and maintainability                                     |
| `typescript-lsp`       | TypeScript/JavaScript language server for code intelligence                                     |
| `playwright`           | Browser automation and end-to-end testing via Microsoft Playwright MCP                          |
| `code-review`          | Automated PR code review with multi-agent scoring                                               |
| `pr-review-toolkit`    | Specialized PR review agents for comments, tests, error handling, type design, and code quality |
| `commit-commands`      | Git commit, push, and PR creation workflows                                                     |
| `github`               | Official GitHub MCP server — create issues, manage PRs, search repos                            |
| `security-guidance`    | Warns about potential security issues when editing files (XSS, injection, etc.)                 |
| `claude-md-management` | Tools to maintain and improve CLAUDE.md files                                                   |

## Prerequisites

### github plugin — MCP & Authentication

The `github` plugin connects via MCP using the GitHub Copilot API. It requires a GitHub Personal Access Token.

**MCP server config** (auto-configured by the plugin):

```json
{
  "github": {
    "type": "http",
    "url": "https://api.githubcopilot.com/mcp/",
    "headers": {
      "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"
    }
  }
}
```

**Setup:**

1. Generate a Personal Access Token at https://github.com/settings/tokens
   - Required scopes: `repo`, `read:org`, `read:user`
2. Copy `.env.example` to `.env` and fill in your token:

```bash
cp .env.example .env
```

3. Export the variables in your shell:

```bash
source .env
```

### commit-commands plugin — gh CLI

The `commit-commands` plugin uses the `gh` CLI for PR creation.

1. Install `gh` CLI: https://cli.github.com
2. Authenticate:

```bash
gh auth login
```

## Available Plugins (claude-plugins-official)

For the full list, see: https://github.com/anthropics/claude-plugins-official
