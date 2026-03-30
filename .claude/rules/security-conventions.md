---
description: Security guidance plugin usage and secure coding practices.
---

# Security Conventions

## Plugin

- `security-guidance@claude-plugins-official` is active
- Automatically warns about potential security issues when editing files
- Covers: command injection, XSS, unsafe code patterns, and more

## Secret Guard Hooks

Two automatic layers prevent secrets from reaching the repository:

| Hook                         | Trigger                          | What it blocks                                                |
| ---------------------------- | -------------------------------- | ------------------------------------------------------------- |
| `pre-tool-secret-guard.sh`   | Claude `Write`/`Edit` tool calls | Writes to `.env` files; API key patterns in file content      |
| `pre-commit-secret-guard.sh` | `git commit` (any author)        | Staged files containing secret patterns; tracked `.env` files |

The pre-commit hook is auto-installed to `.git/hooks/pre-commit` on `SessionStart`.

Detected patterns: `sk-`, `sk-ant-`, `ghp_`, `gho_`, `github_pat_`, `AKIA`, `AIza`, `xoxb-`, `ya29.`, JWT tokens.

## Rules

- Never ignore security warnings from the plugin — address them before committing
- Never commit secrets, tokens, or credentials — use `.env` and `.gitignore`
- Validate all external input at system boundaries (user input, API responses)
- Avoid unsafe patterns:
  - Command injection: never interpolate user input into shell commands
  - XSS: always sanitize output in HTML contexts
  - SQL injection: always use parameterized queries
- If unsure about security implications, ask before proceeding
