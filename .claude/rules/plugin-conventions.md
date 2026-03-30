---
description: Use only official marketplace plugins, plugin usage priority, and how to add new plugins.
---

# Plugin Conventions

## Marketplace

- Only use plugins from the **official marketplace** (`claude-plugins-official`)
- Never install plugins from unknown or third-party sources

## Workflow

- Before implementing any feature manually, check if an installed plugin already handles it
- If a relevant plugin is installed, always use it via its skill or command
- If no plugin is available, refer to the official documentation (`/docs`) and implement manually following the same patterns

## Plugin Usage Priority

1. **Installed plugin skill** — use it directly if it covers the task
2. **Official docs** — if no plugin available, follow docs to implement manually
3. **Custom implementation** — only as a last resort when docs don't cover the case

## Adding New Plugins

- Only add plugins from `claude-plugins-official`
- Verify the plugin solves a recurring need, not a one-off task
- Add to `.claude/settings.json` under `enabledPlugins`
