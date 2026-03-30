---
description: README languages (en/kr/zh), required sections, and sync rules.
---

# README Conventions

## Languages

Always create README in three languages:

- `README.md` — English (default, shown on GitHub)
- `README.kr.md` — Korean
- `README.zh.md` — Chinese (Simplified, 简体中文)

`README.md` is the GitHub-displayed file and contains the English content. Each file must include a language switcher at the top:

```markdown
**Languages**: English | [한국어](README.kr.md) | [中文](README.zh.md)
```

All three files must be kept in sync — same content, different languages.

## Frontmatter

Each README must start with the following frontmatter:

```markdown
---
title: Project Name
description: One-line description of the project.
author: Kyle (https://github.com/kyle-park-io)
date: YYYY-MM-DD
---
```

## Structure

Each README must include the following sections in order:

```markdown
# Project Name

> One-line description

## Overview

What this project does and why it exists. 2-4 sentences.

## Features

- Feature 1
- Feature 2
- Feature 3

## Getting Started

### Prerequisites

List of requirements (Node.js version, environment variables, etc.)

### Installation

Step-by-step installation commands.

### Usage

Basic usage examples with code snippets.

## Configuration

Available options and environment variables (if applicable).

## Contributing

How to contribute — branch naming, PR process, etc.

## License

License name with link to LICENSE file.
```

## Star History

Add a Star History chart at the bottom of `README.md` (English only, not needed in kr/zh):

```markdown
## Star History

<a href="https://www.star-history.com/?repos=<owner>%2F<repo>&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=<owner>/<repo>&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=<owner>/<repo>&type=date&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/image?repos=<owner>/<repo>&type=date&legend=top-left" />
  </picture>
</a>
```

Replace `<owner>` and `<repo>` with the actual GitHub owner and repository name.

## Rules

- Keep all three language versions in sync whenever one is updated
- Use native, natural language — not machine-translated tone
- Code blocks and commands are language-agnostic — do not translate them
- Screenshots and diagrams are shared across all versions (use relative paths)
- Badge links (CI, version, license) go at the top, below the title
- Never abbreviate sections — if a section doesn't apply, remove it entirely rather than leaving it empty
