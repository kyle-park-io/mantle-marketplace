---
description: Prettier setup, configuration, and auto-formatting rules.
---

# Formatting Conventions

## Tool

- Always use **Prettier** for code formatting — never format manually
- Prettier runs automatically via hook on every file write/edit

## Configuration (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "endOfLine": "lf"
}
```

## Scripts

- `pnpm format` — format all files
- `pnpm format:check` — check formatting without writing

## Rules

- Never commit files that fail `pnpm format:check`
- Do not override Prettier rules with inline comments unless absolutely necessary
- `pnpm-lock.yaml` and `dist/` are excluded from formatting
