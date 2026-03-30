---
title: Mantle Agent Marketplace
description: Mantle 생태계의 플러그인, 스킬, MCP 툴을 탐색하고 설치하세요.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

**Languages**: [English](README.md) | 한국어 | [中文](README.zh.md)

# Mantle Agent Marketplace

> Mantle 생태계의 플러그인, 스킬, MCP 툴을 탐색하고 설치하세요.

## 개요

Mantle Agent Marketplace는 개발자가 Mantle 생태계 플랫폼(Mantle, Bybit, Byreal)에서 Claude Code 플러그인, 재사용 가능한 스킬, MCP 툴을 검색하고 설치할 수 있는 Next.js 기반 사이트입니다. 데이터는 빌드 시 GitHub에서 가져오며 GitHub Actions를 통해 매시간 갱신됩니다. 공식 Mantle 아이템은 보라색 카드와 ✓ OFFICIAL 배지로 구별됩니다.

## 주요 기능

- 2단계 내비게이션: 플랫폼 탭(Mantle / Bybit / Byreal)과 카테고리 탭(플러그인 / 스킬 / MCP)
- 보라색 카드와 ✓ OFFICIAL 배지로 공식 아이템 강조 표시
- 설치 명령어 원클릭 클립보드 복사
- 빌드 타임 GitHub 데이터 동기화 — 런타임 데이터베이스 불필요
- GitHub Actions 크론으로 매시간 증분 빌드를 트리거하여 목록을 최신 상태로 유지

## 시작하기

### 사전 요구사항

- Node.js >= 24.0.0
- pnpm >= 10.0.0
- API 속도 제한을 피하기 위한 GitHub 개인 액세스 토큰 (`GITHUB_PERSONAL_ACCESS_TOKEN`)

### 설치

```bash
git clone git@github.com:kyle-park-io/mantle-marketplace.git
cd mantle-marketplace
pnpm install
cp .env.example .env
# .env 파일에 GITHUB_PERSONAL_ACCESS_TOKEN 입력
pnpm sync
pnpm dev
```

### 사용법

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다. 상단의 플랫폼 탭으로 Mantle, Bybit, Byreal 간에 전환하고, 카테고리 탭으로 플러그인, 스킬, MCP 툴을 필터링하세요. 아이템 카드의 설치 명령어를 클릭하면 클립보드에 복사됩니다.

## 설정

| 변수                           | 필수 여부 | 설명                                            |
| ------------------------------ | --------- | ----------------------------------------------- |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | 필수      | 빌드 시 레포 데이터를 가져오기 위한 GitHub 토큰 |
| `VERCEL_TOKEN`                 | CI용      | GitHub Actions 배포에 사용되는 Vercel API 토큰  |
| `VERCEL_ORG_ID`                | CI용      | 프로젝트의 Vercel 조직 ID                       |
| `VERCEL_PROJECT_ID`            | CI용      | 배포 대상의 Vercel 프로젝트 ID                  |

`pnpm sync` 또는 `pnpm build`를 실행하기 전에 `.env.example`을 `.env`로 복사하고 값을 입력하세요.

## 기여하기

1. `main`에서 브랜치 생성: `git checkout -b feat/<기능명>`
2. 변경 후 커밋 전 `pnpm format` 실행
3. `/pr-review-toolkit:review-pr`로 문제를 조기에 확인
4. `/commit-push-pr`로 PR 생성

모든 커밋은 컨벤셔널 커밋 형식을 따라야 합니다 (`.claude/rules/commit-conventions.md` 참조).

## 라이센스

MIT — [LICENSE](LICENSE) 참조
