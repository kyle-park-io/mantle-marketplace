---
description: PR workflow, title format, size limits, body template, and merge strategy.
---

# Pull Request Conventions

## Workflow

- **Never push directly to `main`** — all changes must go through a PR.
- Always branch off `main`, make changes, then open a PR to merge back.
- Follow this order every time:
  1. Run `/pr-review-toolkit:review-pr` — catch bugs, type issues, silent failures before opening the PR
  2. Fix any critical or important issues found
  3. Run `/commit-push-pr` — commits, pushes, and opens the PR in one shot
- Never skip step 1. Never push and open a PR manually.

## Title

Same format as commit subject: `<type>(<scope>): <subject>`

- 72 characters max
- Imperative mood, no period, **must start with lowercase**
- Written in **English**
- Examples:
  - `feat(auth): add OAuth2 login with Google`
  - `fix(api): handle null response from payment gateway`

## Size

- **Target**: < 400 lines changed
- **Hard limit**: < 800 lines changed
- If larger, split into a stack of PRs with a base branch
- Reviewer attention drops sharply above 400 lines

## Body Template

```markdown
## Summary

<!-- What does this PR do and why? 2-4 sentences max. -->

## Changes

-
-
-

## Testing

<!-- How was this tested? Check all that apply. -->

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manually tested locally
- [ ] Tested on staging

## Screenshots / recordings

<!-- For UI changes, include before/after. Delete if not applicable. -->

## Notes for reviewer

<!-- Anything to highlight: tricky logic, areas of uncertainty, decisions made. -->

## Related

<!-- Closes #, Refs #, links to design docs, Slack threads, etc. -->
```

## Labels

| Label                 | Meaning                    |
| --------------------- | -------------------------- |
| `breaking-change`     | Contains a breaking change |
| `needs-design-review` | Requires design sign-off   |
| `do-not-merge`        | Not ready, blocked, or WIP |
| `hotfix`              | Urgent fix for production  |

## Review Etiquette

### Author

- Self-review before requesting review — read your own diff
- Respond to all comments before re-requesting review
- Mark conversations resolved only after addressing them
- Don't force-push after review has started (use new commits)

### Reviewer

- Approve only when you'd be comfortable shipping it
- Use prefixes to signal comment weight:
  - `nit:` — minor style/preference, not blocking
  - `suggestion:` — better approach, take or leave
  - `question:` — need clarification, not necessarily a change
  - `blocker:` — must fix before merge
- Review within 1 business day if assigned

## Merge Strategy

- **Default**: Squash and merge (keeps main history clean)
- **Exception**: Merge commit for long-lived feature branches where history matters
- Never merge your own PR without at least one approval (except hotfixes)
- Delete branch after merge

## Checklist Before Requesting Review

- [ ] Title follows convention
- [ ] PR is < 400 lines (or justified if larger)
- [ ] Body is filled out (no empty template)
- [ ] Tests pass in CI
- [ ] No unresolved merge conflicts
- [ ] No debug code, `console.log`, or commented-out blocks left in
- [ ] Breaking changes documented in body and labeled
