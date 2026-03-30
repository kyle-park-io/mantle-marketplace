# Agents Folder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `.claude/agents/` with four reusable subagent definitions (orchestrator, feature-dev, code-reviewer, hotfix) that any project using this template can adopt without modification.

**Architecture:** Four markdown files in `.claude/agents/`, each with a frontmatter `name`/`description` and a body that acts as the agent's system prompt. The orchestrator is the entry point — it classifies the request, sets up the branch, applies worktree isolation, and routes to the appropriate specialist agent.

**Tech Stack:** Markdown (Claude Code custom agent format), git worktrees for isolation, existing plugins: `feature-dev`, `frontend-design`, `pr-review-toolkit`, `code-review`, `commit-commands`

---

### Task 1: Create branch and verify files

**Files:**

- No code changes — branch setup and verification only

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/add-agents-folder
```

- [ ] **Step 2: Verify all four agent files exist**

```bash
ls .claude/agents/
```

Expected output:

```
code-reviewer.md  feature-dev.md  hotfix.md  orchestrator.md
```

- [ ] **Step 3: Verify spec file exists**

```bash
ls docs/superpowers/specs/
```

Expected output:

```
2026-03-30-agents-design.md
```

---

### Task 2: Verify orchestrator.md content

**Files:**

- Verify: `.claude/agents/orchestrator.md`

- [ ] **Step 1: Check frontmatter is valid**

```bash
head -5 .claude/agents/orchestrator.md
```

Expected:

```
---
name: orchestrator
description: Entry point for all development tasks...
---
```

- [ ] **Step 2: Confirm four sections exist**

```bash
grep "^## Step" .claude/agents/orchestrator.md
```

Expected:

```
## Step 1 - Classify the request
## Step 2 - Branch strategy
## Step 3 - Isolation strategy
## Step 4 - Route to the appropriate agent
```

- [ ] **Step 3: Confirm worktree isolation is present**

```bash
grep "worktree" .claude/agents/orchestrator.md
```

Expected: at least 3 lines mentioning `worktree`

---

### Task 3: Verify feature-dev.md content

**Files:**

- Verify: `.claude/agents/feature-dev.md`

- [ ] **Step 1: Check frontmatter**

```bash
head -5 .claude/agents/feature-dev.md
```

Expected:

```
---
name: feature-dev
description: Implements new features and bug fixes...
---
```

- [ ] **Step 2: Confirm frontend-design branch exists**

```bash
grep "frontend-design" .claude/agents/feature-dev.md
```

Expected: line mentioning `/frontend-design` plugin

- [ ] **Step 3: Confirm five workflow steps exist**

```bash
grep "^### [0-9]" .claude/agents/feature-dev.md
```

Expected:

```
### 1. Explore
### 2. Architect
### 3. Implement
### 4. Review
### 5. Commit and PR
```

---

### Task 4: Verify code-reviewer.md content

**Files:**

- Verify: `.claude/agents/code-reviewer.md`

- [ ] **Step 1: Check frontmatter**

```bash
head -5 .claude/agents/code-reviewer.md
```

Expected:

```
---
name: code-reviewer
description: Read-only code review agent...
---
```

- [ ] **Step 2: Confirm read-only rules are present**

```bash
grep -i "read-only\|never.*modif\|never.*Write\|never.*Edit" .claude/agents/code-reviewer.md
```

Expected: at least 2 matches

- [ ] **Step 3: Confirm both review plugins are referenced**

```bash
grep "pr-review-toolkit\|code-review" .claude/agents/code-reviewer.md
```

Expected: both tools mentioned

---

### Task 5: Verify hotfix.md content

**Files:**

- Verify: `.claude/agents/hotfix.md`

- [ ] **Step 1: Check frontmatter**

```bash
head -5 .claude/agents/hotfix.md
```

Expected:

```
---
name: hotfix
description: Urgent fix agent for production issues...
---
```

- [ ] **Step 2: Confirm minimal-scope rule is present**

```bash
grep -i "minimal\|scope\|refactor" .claude/agents/hotfix.md
```

Expected: at least 2 matches enforcing narrow scope

- [ ] **Step 3: Confirm workflow steps exist**

```bash
grep "^### [0-9]" .claude/agents/hotfix.md
```

Expected:

```
### 1. Identify the root cause
### 2. Apply the fix
### 3. Verify
### 4. Commit
### 5. Push (if needed)
```

---

### Task 6: Commit and push

**Files:**

- Stage: `.claude/agents/`
- Stage: `docs/superpowers/`

- [ ] **Step 1: Stage all new files**

```bash
git add .claude/agents/ docs/superpowers/
```

- [ ] **Step 2: Verify staged files**

```bash
git status
```

Expected: 6 new files staged (4 agents + spec + plan)

- [ ] **Step 3: Commit using /commit skill**

Run `/commit` — subject should be:

```
feat(.claude): add agents folder with orchestrator and specialist agents
```

- [ ] **Step 4: Push branch**

```bash
git push -u origin feat/add-agents-folder
```

- [ ] **Step 5: Open PR using /commit-push-pr or gh**

```bash
gh pr create \
  --title "feat(.claude): add agents folder with orchestrator and specialist agents" \
  --body "$(cat <<'EOF'
## Summary

- Adds `.claude/agents/` with four reusable subagent definitions
- `orchestrator` classifies requests, decides branch strategy, applies worktree isolation, and routes to specialist agents
- `feature-dev` drives feature and fix work via `feature-dev` plugin, routing UI tasks to `frontend-design`
- `code-reviewer` is read-only, uses `pr-review-toolkit` and `code-review` plugins
- `hotfix` applies minimal-scope urgent fixes on isolated worktree branches

## Changes

- `.claude/agents/orchestrator.md`
- `.claude/agents/feature-dev.md`
- `.claude/agents/code-reviewer.md`
- `.claude/agents/hotfix.md`
- `docs/superpowers/specs/2026-03-30-agents-design.md`
- `docs/superpowers/plans/2026-03-30-agents-folder.md`

## Testing

- [ ] Manually verified all four agent files have correct frontmatter
- [ ] Manually verified orchestrator includes worktree isolation logic
- [ ] Manually verified feature-dev includes frontend-design branch
- [ ] Manually verified code-reviewer is read-only
- [ ] Manually verified hotfix enforces minimal scope

## Notes for reviewer

Agents are markdown files — no runtime tests possible. Verification is structural (grep checks in Tasks 2-5).
EOF
)"
```
