---
description: Use pnpm exclusively — installation commands, lockfile, and engine requirements.
---

# Package Manager Conventions

## Default

- Always use **pnpm** — never use npm or yarn

## Rules

- Install packages: `pnpm add <package>`
- Install dev packages: `pnpm add -D <package>`
- Install dependencies: `pnpm install`
- Run scripts: `pnpm <script>`
- Never commit `package-lock.json` or `yarn.lock` — only `pnpm-lock.yaml`
- Always set `"packageManager": "pnpm@10.33.0"` in `package.json`
- Always set `"engines": { "node": ">=24.0.0", "pnpm": ">=10.0.0" }` in `package.json`
- Always add `.nvmrc` in project root with the exact Node.js LTS version (`24.14.1`)
