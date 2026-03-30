---
title: CLAUDE.md Template
description: Example development guidelines for Claude Code. Replace with your project-specific instructions.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

# Project Guidelines

> This is a template. Keep sections relevant to your project type and delete the rest.
> Keep this file under 200 lines — see INSTRUCTION.md if it grows too large.
> Project details are defined in `PROJECT.md` — read it for context on what this project does.

## Project Overview

Briefly describe what this project does and its main goals.

## Project Type

Choose one and delete the others:

- [ ] Backend (API, server, CLI)
- [ ] Frontend (web app, UI)
- [ ] Fullstack (frontend + backend)
- [ ] Browser / E2E testing

---

## Common (always include)

### Tech Stack

- **Language**: TypeScript
- **Package Manager**: pnpm
- **Framework**: (e.g. Express, Next.js, Fastify)
- **Testing**: (e.g. Jest, Vitest, Playwright)

### Common Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Run development server
pnpm build          # Build for production
pnpm test           # Run tests
pnpm format         # Format code with prettier
```

### Notes for Claude

- Always run tests before marking a task as done
- Prefer editing existing files over creating new ones
- Do not add unnecessary comments or docstrings
- Follow all conventions in `.claude/rules/`

---

## Backend

> Delete this section if not a backend project.

### Architecture

```
src/
├── routes/       # API route handlers
├── services/     # Business logic
├── models/       # Data models / DB schemas
├── middleware/   # Auth, validation, error handling
└── utils/        # Shared utilities
```

### Conventions

- Use `async/await` — no raw promise chains
- Validate all input at route level before passing to services
- Never expose internal errors to API responses — map to HTTP status codes
- Use parameterized queries — never interpolate user input into SQL

### Database

- **Type**: (e.g. PostgreSQL, MongoDB, SQLite)
- **ORM/Query builder**: (e.g. Prisma, Drizzle, Knex)
- Migration tool: (e.g. `pnpm prisma migrate dev`)

---

## Frontend

> Delete this section if not a frontend project.

### Architecture

```
src/
├── components/   # Reusable UI components
├── pages/        # Page-level components or routes
├── hooks/        # Custom React hooks
├── store/        # State management
└── styles/       # Global styles, theme
```

### Conventions

- Use functional components — no class components
- Co-locate styles with components
- Keep components small — extract logic into hooks
- Use `frontend-design` plugin for UI/UX implementation

### Styling

- **Tool**: (e.g. Tailwind CSS, CSS Modules, styled-components)

### State Management

- **Tool**: (e.g. Zustand, Redux Toolkit, React Query)

---

## Fullstack

> Delete this section if not a fullstack project. Include both Backend and Frontend sections above.

### Architecture

```
src/
├── app/          # Next.js app router or pages
├── api/          # API routes or server actions
├── components/   # Shared UI components
├── lib/          # Shared utilities and configs
└── db/           # Database schema and migrations
```

### Conventions

- Separate server and client code clearly — use `"use client"` / `"use server"` directives
- Keep API routes thin — delegate logic to service layer

---

## Browser / E2E Testing

> Delete this section if not an E2E testing project.

### Architecture

```
tests/
├── e2e/          # End-to-end test suites
├── fixtures/     # Shared test data and setup
└── helpers/      # Reusable test utilities
```

### Conventions

- Use `playwright` plugin for all browser automation
- Write tests from the user's perspective — actions and assertions, not implementation
- Use `data-testid` attributes for stable selectors
- Always clean up test state after each test

### Commands

```bash
pnpm playwright test          # Run all E2E tests
pnpm playwright test --ui     # Run with Playwright UI
pnpm playwright show-report   # View last test report
```

---

## Plugin Usage

| Situation              | Plugin / Skill                 |
| ---------------------- | ------------------------------ |
| Starting a new feature | `/feature-dev`                 |
| Building UI components | `/frontend-design`             |
| Working with a library | `context7` (auto)              |
| After writing code     | `/code-simplifier`             |
| E2E testing            | `playwright` MCP               |
| Before creating a PR   | `/pr-review-toolkit:review-pr` |
| Creating a commit      | `/commit`                      |
| Creating a PR          | `/commit-push-pr`              |
| GitHub operations      | `github` MCP                   |
| End of session         | `/revise-claude-md`            |
