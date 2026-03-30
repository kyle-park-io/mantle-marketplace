---
description: Commit message format, types, language, and workflow rules.
---

# Commit Conventions

## Workflow

- Always use the `/commit` skill when creating commits — never run `git commit` directly.
- **Never commit directly to `main`**. All changes must go through a PR.
- Always work on a feature branch and open a PR to merge into `main`.

## Format

```
<type>(<scope>): <subject>

[body]

[footer]
```

## Types

| Type       | When to use                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Performance improvement                                 |
| `test`     | Adding or updating tests                                |
| `docs`     | Documentation only                                      |
| `chore`    | Build process, dependency updates, tooling              |
| `ci`       | CI/CD configuration                                     |
| `revert`   | Revert a previous commit                                |

## Language

- All commit messages must be written in **English** — subject, body, and footer

## Rules

- **Subject line**: 50 characters max, imperative mood, no period at end, **must start with lowercase**
  - Good: `feat(auth): add OAuth2 login`
  - Bad: `feat(auth): Added OAuth2 login.`
  - Bad: `feat(auth): Add OAuth2 login` (uppercase)
- **Scope**: optional, lowercase, noun describing the affected area (e.g. `auth`, `api`, `ui`, `db`)
- **Body**: wrap at 72 characters, explain _what_ and _why_, not _how_
- **Breaking changes**: add `BREAKING CHANGE:` in footer with description
- **Issue references**: add `Closes #123` or `Refs #123` in footer

## Examples

```
feat(auth): add OAuth2 login with Google

Implement Google OAuth2 flow using passport.js.
Users can now sign in with their Google account
in addition to email/password.

Closes #42
```

```
fix(api): handle null response from payment gateway

The payment gateway occasionally returns null on timeout.
Previously this caused an unhandled exception; now we
return a 503 with a retry-after header.

Refs #87
```

```
refactor(db): replace raw queries with query builder

No functional changes. Improves readability and
prevents SQL injection by construction.
```

```
feat(api)!: remove deprecated v1 endpoints

BREAKING CHANGE: /api/v1/* endpoints have been removed.
Migrate to /api/v2/* — see docs/migration-v2.md.
```

## Atomic Commits

- One logical change per commit
- If you need "and" to describe the commit, split it
- Avoid WIP commits on main — squash before merging
