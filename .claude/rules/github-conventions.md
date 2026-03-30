---
description: GitHub CLI and MCP plugin setup, authentication, and usage conventions.
---

# GitHub Conventions

## Tools

Two GitHub integrations are available — use both:

| Tool                | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `gh` CLI            | PR creation, push, branch management               |
| `github` MCP plugin | GitHub API — issues, PRs, code review, repo search |

## GitHub CLI (`gh`)

- Install if missing: `brew install gh` (see tooling-conventions.md for fallback)
- Authenticate before use: `gh auth login` (use SSH protocol)
- Verify: `gh auth status`

## GitHub MCP Plugin

- Plugin: `github@claude-plugins-official` (already enabled)
- Requires `GITHUB_PERSONAL_ACCESS_TOKEN` in `.env`
- Token needs scopes: `repo`, `read:org`, `read:user`
- Set in `.env`: `GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxx`

## Usage

- Create PR: use `/commit-push-pr` skill — never run `gh pr create` manually
- Review PR: use `/code-review` skill
- For GitHub API operations (issues, search, etc.): use the `github` MCP plugin
- All `gh` commands must be run from within the repository directory

## Branch Protection

Always enable branch protection on `main` for every new repository:

- `allow_force_pushes`: false
- `allow_deletions`: false

Set via:

```bash
gh api repos/<owner>/<repo>/branches/main/protection \
  --method PUT \
  --field required_status_checks=null \
  --field enforce_admins=false \
  --field required_pull_request_reviews=null \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

> Requiring PR reviews needs GitHub Pro for private repos. Public repos can use it for free.

## Remote

- Always use SSH remote: `git@github.com:<owner>/<repo>.git`
- Never use HTTPS remote
