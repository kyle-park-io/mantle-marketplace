# CLAUDE.md Instruction Guide

This document explains how to create a `CLAUDE.md` for your project using this template.

## What is CLAUDE.md?

`CLAUDE.md` is the primary instruction file Claude reads at the start of every session. It defines your project's architecture, conventions, and development guidelines. Think of it as onboarding documentation written for Claude.

## Frontmatter

Each `CLAUDE.md` must start with the following frontmatter:

```markdown
---
title: <Project Name>
description: <One-line description of the project.>
author: <Your Name> (<https://github.com/your-handle>)
date: YYYY-MM-DD
---
```

## How to Create It

1. Fill in the project brief:

```bash
cp PROJECT.template.md PROJECT.md
```

Open `PROJECT.md` and fill in your project details — what it does, project type, tech choices, key features, and domain notes.

2. Copy the CLAUDE.md template:

```bash
cp CLAUDE.template.md CLAUDE.md
```

3. Ask Claude to generate CLAUDE.md from your project brief:

```
Read PROJECT.md and CLAUDE.template.md, then generate a CLAUDE.md tailored to my project.
Use the relevant rules from .claude/rules/ based on the project type.
Keep only the sections that apply. Stay under 200 lines.
```

4. Review and adjust as needed

## Available Rules

| File                         | When to include                  |
| ---------------------------- | -------------------------------- |
| `code-conventions.md`        | Always                           |
| `commit-conventions.md`      | Always                           |
| `pr-conventions.md`          | Always                           |
| `package-manager.md`         | Always                           |
| `formatting-conventions.md`  | Always                           |
| `github-conventions.md`      | Always                           |
| `security-conventions.md`    | Always                           |
| `plugin-conventions.md`      | Always                           |
| `context-conventions.md`     | Always                           |
| `claude-md-conventions.md`   | Always                           |
| `development-conventions.md` | When building features or UI     |
| `license-conventions.md`     | When setting up a new project    |
| `readme-conventions.md`      | When setting up a new project    |
| `tooling-conventions.md`     | When using CLI tools or binaries |

## Length Rule

**Keep CLAUDE.md under 200 lines.**

If it exceeds 200 lines:

1. **Extract repeated patterns** into `.claude/rules/` as a new rule file
2. **Remove obvious information** — don't document what's already in rules files
3. **Summarize** verbose sections into bullet points
4. **Split by scope** — team-shared content goes in `CLAUDE.md`, personal/local content goes in `.claude.local.md` (gitignored)

Check length anytime:

```bash
wc -l CLAUDE.md
```

## Tips

- Focus on what's **unique to your project** — architecture decisions, domain concepts, gotchas
- Don't duplicate what's already in `.claude/rules/` — reference it instead
- Run `/revise-claude-md` after significant sessions to keep it up to date
