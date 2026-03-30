---
description: Guidelines for maintaining CLAUDE.md using the claude-md-management plugin.
---

# CLAUDE.md Conventions

## Plugin

- `claude-md-management@claude-plugins-official` is active
- Use `/revise-claude-md` at the end of a session to capture learnings

## When to Update

- After discovering project-specific patterns or quirks
- After finding useful bash commands or workflows
- After a session where missing context caused extra back-and-forth
- Before closing a long session

## Rules

- Run `/revise-claude-md` at the end of significant sessions
- Keep entries concise — one line per concept
- Add team-shared context to `CLAUDE.md` (committed to git)
- Add personal/local context to `.claude.local.md` (gitignored)
- Avoid obvious or one-off information — only add what helps future sessions
