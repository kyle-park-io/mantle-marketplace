---
description: Guidelines for managing Claude conversation context to maintain quality and performance.
---

# Context Conventions

## When to Clear Context

Run `/clear` to reset the conversation context in these situations:

- Starting a new, unrelated task
- Context has grown too large and responses feel slow or less accurate
- After completing a major feature or PR merge
- When switching between different parts of the codebase

## Why It Matters

- Long contexts degrade response quality over time
- Irrelevant prior conversation adds noise to new tasks
- Clearing keeps Claude focused on the current task

## Memory Types

`/clear` resets the conversation context but does **not** affect these:

| Type               | Location                         | Persists after `/clear`        |
| ------------------ | -------------------------------- | ------------------------------ |
| Auto memory        | `~/.claude/projects/.../memory/` | Yes — survives across sessions |
| Claude Code memory | `/memory` command                | Yes — manually managed         |

**Auto memory** is written automatically by Claude during conversations — user preferences, project context, feedback. Review and clean up periodically if it becomes stale.

**Claude Code memory** is a manual notepad for cross-session context. Edit or delete entries directly via `/memory`.

## Rules

- Don't carry one long conversation across multiple unrelated tasks — clear between them
- If Claude starts giving inconsistent or degraded responses, `/clear` first before debugging
- After `/clear`, re-provide any essential context (current task, relevant files, constraints)
