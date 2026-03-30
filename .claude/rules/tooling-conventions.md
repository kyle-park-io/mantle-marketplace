---
description: How to check and install required binaries when they are missing.
---

# Tooling Conventions

## When a Required Binary is Missing

Before running any command, check if the required binary exists. If not, install it using the appropriate package manager for the OS.

## Installation Priority

Always try **Homebrew first** regardless of OS. If not available, fall back to the OS-native method.

1. `brew install <package>` — Homebrew (always first)
2. **macOS fallback**: `curl` or `wget` to download binary directly from official release
3. **Linux fallback**:
   - `apt-get install -y <package>` — Debian/Ubuntu
   - `yum install -y <package>` — RHEL/CentOS
   - `apk add <package>` — Alpine
4. **Windows fallback**:
   - `choco install <package> -y` — Chocolatey
   - `winget install <package>` — Windows Package Manager
5. **Last resort**: download binary directly from official release

## Rules

- Always verify installation succeeded before proceeding (`which <binary>` or `<binary> --version`)
- Never assume a binary is installed — check first
- Use the silent/non-interactive flag when available (`-y`, `--silent`, `-q`) to avoid prompts
- If installation requires admin/sudo, inform the user and ask for confirmation before proceeding
- Prefer the official package manager for the OS over downloading binaries directly

## Check Pattern

```bash
if ! command -v <binary> &>/dev/null; then
  # install using OS-appropriate method
fi
```
