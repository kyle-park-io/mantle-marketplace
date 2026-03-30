---
title: Claude Template
description: 内置插件、规则和钩子的开箱即用 Claude Code 配置模板。
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

**Languages**: [English](README.md) | [한국어](README.kr.md) | 中文

# Claude Template

开箱即用的 Claude Code 配置模板。克隆此仓库并根据您的工作流程进行自定义。

## 概述

本模板提供预配置的 Claude Code 环境，内置插件、规则、钩子和代码规范，可直接克隆并应用于任何项目。

## 主要功能

- 预安装插件（frontend-design、feature-dev、pr-review-toolkit 等）
- 涵盖提交、PR、代码、格式化和许可证的规范规则
- 自动格式化及缺失文件检测钩子
- 开箱即用的 pnpm + TypeScript 配置

## 快速开始

### 前置要求

- Node.js >= 24.0.0
- pnpm >= 10.0.0
- Claude Code CLI

### 安装

```bash
git clone git@github.com:kyle-park-io/claude-template.git
cd claude-template
pnpm install
```

### 使用方法

1. 编辑 `.claude/settings.json` 调整模型、推理强度和插件
2. 将 `CLAUDE.template.md` 复制为 `CLAUDE.md`，填入项目专属指南
3. 将 `.env.example` 复制为 `.env`，填入所需令牌

## 项目结构

```
.
├── .claude/
│   ├── hooks/          # 自动化脚本（文件写入后、会话启动时）
│   ├── rules/          # Claude 加载的项目规范
│   └── settings.json   # 共享项目配置
├── docs/
│   └── PLUGINS.md      # 插件安装与配置指南
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierrc
├── CLAUDE.template.md
├── package.json
└── tsconfig.json
```

## 配置说明

### `.claude/settings.json`

- `model` — 使用的 Claude 模型（默认：`claude-sonnet-4-6`）
- `thinkingEffort` — 推理强度：`"low"`、`"medium"`、`"high"`
- `enabledPlugins` — 已安装的插件列表
- `hooks` — 会话启动及文件写入时的自动触发器

### `.claude/settings.local.json`

个人本地配置覆盖，不提交到仓库。

## 贡献指南

1. 从 `main` 创建分支
2. 遵循 `.claude/rules/` 中的规范
3. 提交 PR 前运行 `/pr-review-toolkit:review-pr`
4. 通过 `/commit-push-pr` 创建 PR

## 许可证

MIT — 详见 [LICENSE](LICENSE)
