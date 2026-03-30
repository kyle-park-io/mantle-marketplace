# 개발 절차 가이드

> 이 프로젝트의 기능 개발 흐름을 설명하는 문서입니다.
> Claude Code + Superpowers 플러그인 기반으로 운영됩니다.

---

## 전체 흐름

```
1. 브레인스토밍     → 아이디어를 디자인/스펙으로 정리
2. 계획 작성       → 스펙을 구현 태스크로 분해
3. 계획 실행       → 서브에이전트가 코드 작성
4. PR 리뷰 & 머지  → 검토 후 main에 반영
```

---

## 1단계: 브레인스토밍 (`/brainstorming`)

**언제:** 새 기능이나 큰 변경을 시작할 때

**하는 일:**

- Claude와 대화로 아이디어를 구체화
- 시각적 목업/다이어그램으로 UI 방향 결정
- 기술 접근법 2-3가지 비교 후 선택
- 스펙 문서 작성 → `docs/superpowers/specs/YYYY-MM-DD-<기능명>-design.md`

**산출물:** 승인된 스펙 문서

---

## 2단계: 구현 계획 작성 (`/writing-plans`)

**언제:** 스펙이 승인된 직후

**하는 일:**

- 스펙을 bite-sized 태스크로 분해
- 각 태스크마다 파일 경로, 코드, 테스트, 커밋 명령어 포함
- TDD 방식 — 테스트 먼저, 구현 나중
- 계획 문서 저장 → `docs/superpowers/plans/YYYY-MM-DD-<기능명>.md`

**산출물:** 체크리스트 형태의 구현 계획 문서

---

## 3단계: 계획 실행

두 가지 방식 중 선택:

### 방식 A: 서브에이전트 방식 (권장) — `subagent-driven-development`

```
각 태스크 → 전용 서브에이전트 파견 → 결과 리뷰 → 다음 태스크
```

- 태스크마다 새 에이전트가 독립적으로 실행
- 각 태스크 완료 후 리뷰 포인트
- 빠른 이터레이션, 실수 조기 발견
- **독립적인 태스크는 병렬로 동시 실행 가능**

### 방식 B: 인라인 실행 — `executing-plans`

```
현재 세션에서 순차 실행 → 체크포인트마다 리뷰
```

- 현재 대화 세션에서 직접 실행
- 배치 단위로 체크포인트 설정

---

## 4단계: PR 리뷰 & 머지

**순서 (절대 생략 불가):**

```
1. /pr-review-toolkit:review-pr  ← 버그/타입 오류/silent failure 체크
2. 발견된 이슈 수정
3. /commit-push-pr               ← 커밋 + 푸시 + PR 생성 한 번에
4. 머지 (squash merge 기본)
```

---

## 에이전트 역할 정리

| 에이전트                      | 역할                                |
| ----------------------------- | ----------------------------------- |
| `brainstorming`               | 아이디어 → 스펙                     |
| `writing-plans`               | 스펙 → 구현 계획                    |
| `subagent-driven-development` | 계획 → 코드 (태스크별 서브에이전트) |
| `executing-plans`             | 계획 → 코드 (현재 세션 인라인)      |
| `feature-dev`                 | 기능 구현 서브에이전트              |
| `frontend-design`             | UI 컴포넌트 구현 서브에이전트       |
| `pr-review-toolkit:review-pr` | PR 전 종합 리뷰                     |
| `commit-push-pr`              | 커밋 + 푸시 + PR 생성               |

---

## 스킬 사용 규칙

- 새 기능 → 항상 `brainstorming` 먼저
- UI 구현 → `frontend-design` 사용
- 외부 라이브러리 → `context7` 자동 참조
- PR 생성 전 → 반드시 `review-pr` 먼저
- 커밋 → `/commit` 스킬 사용 (직접 `git commit` 금지)
- main 직접 커밋 금지 → 항상 브랜치 + PR

---

## 문서 위치

| 문서                   | 위치                      |
| ---------------------- | ------------------------- |
| 스펙 (설계 결정)       | `docs/superpowers/specs/` |
| 구현 계획              | `docs/superpowers/plans/` |
| 개발 절차 (이 문서)    | `docs/workflow/`          |
| 프로젝트 브리프        | `PROJECT.md`              |
| Claude 개발 가이드라인 | `CLAUDE.md`               |
