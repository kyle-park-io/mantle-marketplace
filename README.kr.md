---
title: Claude Template
description: 플러그인, 규칙, 훅이 포함된 바로 사용 가능한 Claude Code 설정 템플릿.
author: Kyle (https://github.com/kyle-park-io)
date: 2026-03-30
---

**Languages**: [English](README.md) | 한국어 | [中文](README.zh.md)

# Claude Template

바로 사용 가능한 Claude Code 설정 템플릿입니다. 이 레포를 클론하고 워크플로우에 맞게 커스터마이징하세요.

## 개요

플러그인, 규칙, 훅, 컨벤션이 미리 설정된 Claude Code 템플릿입니다. 클론 후 어떤 프로젝트에든 바로 적용할 수 있도록 설계되었습니다.

## 주요 기능

- 플러그인 사전 설치 (frontend-design, feature-dev, pr-review-toolkit 등)
- 커밋, PR, 코드, 포맷팅, 라이센스 컨벤션 규칙 포함
- 자동 포맷팅 및 누락 파일 감지 훅
- pnpm + TypeScript 기본 설정 포함

## 시작하기

### 사전 요구사항

- Node.js >= 24.0.0
- pnpm >= 10.0.0
- Claude Code CLI

### 설치

```bash
git clone git@github.com:kyle-park-io/claude-template.git
cd claude-template
pnpm install
```

### 사용법

1. `.claude/settings.json`에서 모델, 사고 수준, 플러그인 설정
2. `CLAUDE.template.md`를 `CLAUDE.md`로 복사 후 프로젝트 가이드라인 작성
3. `.env.example`을 `.env`로 복사 후 필요한 토큰 입력

## 프로젝트 구조

```
.
├── .claude/
│   ├── hooks/          # 자동화 스크립트 (파일 저장 후, 세션 시작 시)
│   ├── rules/          # Claude가 로드하는 프로젝트 컨벤션
│   └── settings.json   # 공유 프로젝트 설정
├── docs/
│   └── PLUGINS.md      # 플러그인 설치 및 설정 가이드
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierrc
├── CLAUDE.template.md
├── package.json
└── tsconfig.json
```

## 설정

### `.claude/settings.json`

- `model` — 사용할 Claude 모델 (기본값: `claude-sonnet-4-6`)
- `thinkingEffort` — 사고 수준: `"low"`, `"medium"`, `"high"`
- `enabledPlugins` — 설치된 플러그인 목록
- `hooks` — 세션 시작 및 파일 저장 시 자동 실행 트리거

### `.claude/settings.local.json`

개인 로컬 설정 오버라이드. 레포에 커밋되지 않습니다.

## 기여하기

1. `main`에서 브랜치 생성
2. `.claude/rules/` 컨벤션 준수
3. PR 열기 전 `/pr-review-toolkit:review-pr` 실행
4. `/commit-push-pr`로 PR 생성

## 라이센스

MIT — [LICENSE](LICENSE) 참조
