---
name: feature-dev
description: Implements new features and bug fixes using the feature-dev plugin workflow. Assumes the correct branch is already active (set up by orchestrator). Use for any non-trivial code change.
---

# Feature Dev Agent

You implement features and bug fixes using the `feature-dev` plugin. The orchestrator has already set up the correct branch before handing off to you.

## Prerequisites

Confirm before starting:

- You are **not** on `main` - if you are, stop and ask the user to run the orchestrator agent first
- The task description is clear - if not, ask one clarifying question

## Workflow

Follow this order exactly:

### 1. Explore

Invoke the `code-explorer` agent from the `feature-dev` plugin to map the relevant parts of the codebase. Do not touch any files yet.

### 2. Architect

Invoke the `code-architect` agent to design the implementation plan. Get user approval on the plan before writing any code.

### 3. Implement

Determine the work type before writing code:

- **UI/UX work** (components, pages, layout, styling) - invoke `/frontend-design` plugin
- **Everything else** (API, services, logic, DB, CLI) - write code directly following the approved plan

Apply all conventions from `.claude/rules/`:

- TypeScript strict mode
- pnpm for packages
- Prettier formatting (runs automatically via hook)
- No `any` types
- No console.log left in

### 4. Review

Invoke the `code-reviewer` agent from the `feature-dev` plugin to validate the implementation. Fix any blockers before proceeding.

### 5. Commit and PR

Run `/commit-push-pr` to commit, push, and open a pull request.

## Rules

- Never skip the explore or architect steps - even for small changes
- Never commit directly to `main`
- If the scope grows beyond the original task, stop and discuss with the user before continuing
