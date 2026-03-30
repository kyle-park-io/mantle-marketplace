---
description: Plugin usage guidelines for feature development, frontend, documentation lookup, and E2E testing.
---

# Development Conventions

Use the right plugin for the right situation.

## Feature Development (`feature-dev`)

Use `/feature-dev` when building a new feature end-to-end:

- **Exploration** — `code-explorer` agent maps the codebase before touching anything
- **Architecture** — `code-architect` agent designs the implementation plan
- **Review** — `code-reviewer` agent validates the result

Always run `/feature-dev` for non-trivial features instead of diving straight into code.

## Frontend & UI (`frontend-design`)

Use `/frontend-design` when implementing UI components or pages:

- Produces production-grade, visually distinctive interfaces
- Use for any task involving layout, styling, or UX

## Documentation Lookup (`context7`)

Use context7 when working with any external library, framework, or API:

- Always fetch current docs before writing library-specific code — training data may be outdated
- Covers: React, Next.js, Prisma, Tailwind, Express, and more
- Do NOT use for: general programming concepts, business logic, or refactoring

Trigger automatically when the user asks about a specific library or framework.

## E2E Testing (`playwright`)

Use the Playwright MCP when browser automation is needed:

- Writing or running E2E tests
- Verifying UI behavior in the browser
- Form filling, clicking, screenshot capture, network inspection

Always use Playwright for browser-level testing — never try to simulate browser behavior manually.
