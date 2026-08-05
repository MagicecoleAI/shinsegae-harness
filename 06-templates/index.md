---
title: 6. 복사해서 쓰는 양식
nav_order: 8
permalink: /06-templates/
---

# 복사해서 쓰는 양식

아래 양식은 팀 폴더의 Markdown 파일로 복사해 사용합니다. 전체 원본은 [Starter Kit ZIP]({{ site.baseurl }}/assets/downloads/shinsegae-harness-starter-kits.zip)에 들어 있습니다.

## Project Brief

```markdown
# Project Brief

## 오늘 만들 한 문장
[사용자]가 [Sample Input]을 넣으면 [핵심 처리]를 거쳐 [결과물]을 받고,
[담당자]가 [확인사항]을 검토한다.

## 범위
- 반드시 구현:
- 이번에 제외:
- 사람만 결정:

## 완료 기준
- 같은 Sample로 다시 실행된다.
- 결과의 근거와 기준일을 찾을 수 있다.
- 잘못된 입력에서 멈추거나 확인을 요청한다.
```

## Data Inventory

```markdown
| 자료 | 출처 | 공개/더미/비식별 | 기준일 | 필수 필드 | 누락 시 행동 | 사용 승인 |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
```

## CLAUDE.md 핵심

```markdown
# Project Rules

## Goal
- 입력 1개에서 결과파일 1개를 만든다.

## Read first
- README.md
- samples/input/
- samples/expected/
- tests/eval-cases.md

## Safety
- 공개·더미·비식별 자료만 사용한다.
- 원본 입력을 수정하지 않는다.
- 근거가 없으면 추측하지 않고 `확인 필요`로 표시한다.
- 외부 시스템에 등록·발송·변경하지 않는다.

## Output
- outputs/에 저장한다.
- 입력 파일, 기준일, 근거, 오류, 사람 확인, 승인 상태를 포함한다.

## Done
- 실행 증거와 Test Log가 있어야 완료다.
```

## Agent 역할카드

```markdown
---
name: role-name
description: 언제 이 역할을 사용하는지 한 문장
---

# 역할

## 책임
- 맡은 일 1
- 맡은 일 2

## 입력
- 읽을 파일과 필수 항목

## 결과
- 저장할 파일과 필수 섹션

## 중단 기준
- 근거 없음
- 필수 입력 누락
- 금지정보 또는 금지행동

## 사람에게 넘길 것
- 사람이 확인·승인할 항목
```

## Orchestrator Skill

```markdown
---
name: team-workflow
description: 팀의 대표 업무를 입력 검사부터 검토까지 실행한다.
---

# Workflow

1. README와 CLAUDE.md를 읽는다.
2. 입력을 검사한다. 치명 오류면 결과 생성을 중단한다.
3. 핵심 업무규칙을 실행한다.
4. 결과 초안을 outputs/에 저장한다.
5. Reviewer가 근거·수치·누락·금지 항목을 검토한다.
6. 사람 확인 목록과 승인 상태를 결과에 넣는다.
7. 실행한 Test와 실패를 기록한다.

# Fallback

- 외부 연결 실패 → 저장 Sample
- 복잡한 형식 실패 → 공통 Markdown/CSV
- AI 판단 불확실 → 규칙 결과 + 사람 확인
```

## Decision Log

```markdown
| 시각 | 발견한 문제 | 선택지 | 팀 결정 | 이유 | 영향 파일 | 결정자 |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
```

## Test Log

```markdown
| ID | 유형 | 입력·상황 | 기대 결과 | 실제 결과 | 판정 | 원인 | 다음 행동 |
|---|---|---|---|---|---|---|---|
| T-01 | 정상 |  |  |  |  |  |  |
| T-05 | 경계 |  |  |  |  |  |  |
| T-08 | 오류 |  |  |  |  |  |  |
| T-10 | 금지 |  |  |  |  |  |  |
```

## 3분 Demo Script

```markdown
1. 현재 문제와 오늘 줄인 범위 — 30초
2. 더미 Sample Input — 20초
3. 실제 실행과 결과 — 50초
4. 근거·오류·사람 승인 — 30초
5. Test 실패와 Fallback — 25초
6. 4주차 가장 먼저 고칠 것 — 25초
```

