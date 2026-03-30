---
description: Default language, file extensions, tsconfig, and LSP usage guidelines.
---

# Code Conventions

## Language

- Always use **TypeScript** by default for all new code
- If the user requests a specific language (e.g. Python, Go, Rust), use that instead
- Never generate plain JavaScript unless explicitly requested — always prefer TypeScript
- All files must have proper TypeScript types — avoid `any`

## File Extensions

- Source files: `.ts`
- React components: `.tsx`
- Config files: `.ts` where possible (e.g. `vite.config.ts`, `jest.config.ts`)

## tsconfig

- Always use strict mode: `"strict": true`
- Target `ES2023` or higher

## LSP

- The `typescript-lsp` plugin is active — use it for type checking, diagnostics, and symbol resolution
- Before finalizing code, verify there are no LSP errors or warnings
- Prefer LSP-driven fixes over manual guessing when type errors occur
