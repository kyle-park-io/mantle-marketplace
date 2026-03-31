---
title: Mantle Agent Marketplace
description: 浏览并安装 Mantle 生态系统的插件、技能和 MCP 工具。
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-31
---

**Languages**: [English](README.md) | [한국어](README.kr.md) | 中文

# Mantle Agent Marketplace

> 浏览并安装 Mantle 生态系统的插件、技能和 MCP 工具。

## 概述

Mantle Agent Marketplace 是一个基于 Next.js 的站点，让开发者可以在 Mantle 生态系统平台（Mantle、Bybit、Byreal）中发现并安装 Claude Code 插件、可复用技能和 MCP 工具。数据在构建时从 GitHub 拉取，并通过 GitHub Actions 每小时刷新一次。官方 Mantle 项目以 ✓ OFFICIAL 徽章加以区分。

## 主要功能

- 两级导航：平台标签页（Mantle / Bybit / Byreal）和类别标签页（插件 / 技能 / MCP）
- 支持正则表达式的搜索栏，可按名称、描述或标签过滤项目
- 每个项目详情页展示来自源仓库的 README
- 详情页右侧固定面板 — 说明每个技能/插件/MCP 的使用时机和功能
- 一键复制安装命令到剪贴板
- 详情页返回按钮
- 构建时 GitHub 数据同步——无需运行时数据库
- GitHub Actions 定时任务每小时触发构建，保持列表内容最新

## 快速开始

### 前置要求

- Node.js >= 24.0.0
- pnpm >= 10.0.0
- GitHub 个人访问令牌（`GITHUB_PERSONAL_ACCESS_TOKEN`），用于避免 API 速率限制

### 安装

```bash
git clone git@github.com:kyle-park-io/mantle-marketplace.git
cd mantle-marketplace
pnpm install
cp .env.example .env
# 在 .env 中填入 GITHUB_PERSONAL_ACCESS_TOKEN
pnpm sync
pnpm dev
```

### 使用方法

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。使用顶部的平台标签在 Mantle、Bybit 和 Byreal 之间切换，使用类别标签过滤插件、技能或 MCP 工具。点击任意项目可查看其 README 和安装说明。将鼠标悬停在右侧固定面板上，可查看该项目的使用时机和功能介绍。

## 配置说明

| 变量                           | 是否必填 | 说明                                        |
| ------------------------------ | -------- | ------------------------------------------- |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | 必填     | 构建时用于获取仓库数据的 GitHub 令牌        |
| `VERCEL_TOKEN`                 | CI 使用  | GitHub Actions 部署时使用的 Vercel API 令牌 |
| `VERCEL_ORG_ID`                | CI 使用  | 项目对应的 Vercel 组织 ID                   |
| `VERCEL_PROJECT_ID`            | CI 使用  | 部署目标的 Vercel 项目 ID                   |

在运行 `pnpm sync` 或 `pnpm build` 前，请将 `.env.example` 复制为 `.env` 并填入相应值。

## 贡献指南

1. 从 `main` 创建分支：`git checkout -b feat/<功能名>`
2. 修改完成后，提交前运行 `pnpm format`
3. 运行 `/pr-review-toolkit:review-pr` 提前发现问题
4. 通过 `/commit-push-pr` 创建 PR

所有提交须遵循约定式提交格式（参见 `.claude/rules/commit-conventions.md`）。

## 许可证

MIT — 详见 [LICENSE](LICENSE)
