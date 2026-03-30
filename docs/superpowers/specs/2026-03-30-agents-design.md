# Agents Folder Design

**Date:** 2026-03-30
**Topic:** `.claude/agents/` — reusable subagent definitions for the claude-template

## Goal

Provide a set of ready-to-use custom agents in `.claude/agents/` that any project based on this template can adopt without modification. The agents must minimize git conflicts, avoid stepping on each other's work, and leverage existing plugins already configured in `settings.json`.

## Structure

```
.claude/agents/
├── orchestrator.md    # Entry point: classify request, decide branch strategy, route to agent
├── feature-dev.md     # Feature development via feature-dev plugin
├── code-reviewer.md   # Read-only review via pr-review-toolkit + code-review plugins
└── hotfix.md          # Urgent fixes directly on current branch
```

## Agent Responsibilities

### orchestrator

- Classify incoming request: new feature / bug fix / review / hotfix
- Branch decision logic:
  - New feature → create `feat/<name>` branch
  - Bug fix (wide impact) → create `fix/<name>` branch
  - Bug fix (1-2 lines) → work on current branch
  - Review request → no branch change
  - Hotfix → create `hotfix/<name>` branch
- Never commit directly to `main`
- Route to appropriate agent after branch setup

### feature-dev

- Always start by invoking `/feature-dev` plugin
- Plugin workflow: code-explorer → code-architect → implement → code-reviewer
- End with `/commit-push-pr`

### code-reviewer

- Read-only: never modify files
- Use `/pr-review-toolkit:review-pr` and `/code-review`
- Return feedback only, no branch or file changes

### hotfix

- Work on current branch, no new branch
- Scope limited to the affected file only — no refactoring
- End with `/commit`

## Conflict Prevention

- Each agent has a single, non-overlapping responsibility
- Only orchestrator decides branch strategy — other agents inherit the branch already set up
- code-reviewer is strictly read-only, preventing any file collision
- hotfix is scoped to minimal changes to avoid touching unrelated code
