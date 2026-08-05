---
title: 1. 하네스 기본 구조
nav_order: 3
permalink: /01-harness-basics/
---

# 하네스 기본 구조

하네스는 긴 프롬프트 한 장이 아닙니다. **AI가 반복해서 같은 기준으로 일하도록 만드는 파일 구조**입니다.

## 이 과정의 표준 폴더

```text
team-project/
├── README.md                    # 사람이 보는 실행 안내
├── CLAUDE.md                    # Claude Code가 먼저 읽는 공통 규칙
├── .claude/
│   ├── agents/                  # 역할별 지시서
│   │   ├── input-checker.md
│   │   ├── domain-worker.md
│   │   └── reviewer.md
│   └── skills/
│       └── team-workflow/
│           └── SKILL.md         # 전체 순서와 실패 처리
├── samples/
│   ├── input/                   # 공개·더미 입력
│   └── expected/                # 기대 결과 예시
├── outputs/                     # 실제 실행 결과
└── tests/
    └── eval-cases.md            # 정상·경계·오류·금지 테스트
```

## 각 파일의 역할

| 파일 | 한 문장 설명 | 좋은 상태 |
|---|---|---|
| `README.md` | 처음 보는 사람이 실행하는 방법 | 5단계 안에 재현 가능 |
| `CLAUDE.md` | 프로젝트 전체의 업무·안전·파일 규칙 | 할 일과 하지 말 일이 함께 있음 |
| `agents/*.md` | 역할별 책임과 결과 형식 | 서로 책임이 겹치지 않음 |
| `SKILL.md` | 어떤 순서로 역할을 호출하고 실패를 처리할지 | 입력·출력·중단·검토가 명확함 |
| `samples/` | 실제 정보를 대신하는 고정 예시 | 인터넷 없이도 실행 가능 |
| `tests/` | 잘되는 예시뿐 아니라 실패를 찾는 질문 | 정상 4·경계 3·오류 2·금지 1 |

## Harness 100에서 가져온 핵심

Harness 100은 업무를 여러 전문 역할로 나누고, 오케스트레이터가 순서와 의존관계를 관리하며, 마지막 Reviewer가 교차 검증하는 패턴을 보여줍니다. 이 과정에서는 이를 하루 실습에 맞게 줄였습니다.

- 역할 수는 많을수록 좋은 것이 아닙니다. **입력 확인·핵심 처리·검토** 3개부터 시작합니다.
- 결과는 대화창이 아니라 `outputs/` 파일로 남깁니다.
- 성공 흐름뿐 아니라 기존 파일, 입력 부족, 오류 흐름을 테스트합니다.
- 풀 모드가 실패하면 축소 모드, 마지막에는 고정 Sample 기반 단일 흐름으로 전환합니다.

## 이 과정의 공통 7단계

<div class="harness-rail" aria-label="하네스 7단계">
  <div class="rail-stop">목표</div><div class="rail-stop">자료</div><div class="rail-stop">역할</div><div class="rail-stop">도구·권한</div><div class="rail-stop">결과</div><div class="rail-stop">사람 승인</div><div class="rail-stop">테스트 기록</div>
</div>

### 1. 목표
한 사용자가 한 입력으로 한 결과를 받는 장면을 고릅니다.

### 2. 자료
출처, 기준일, 필수 열, 누락 시 행동을 적습니다.

### 3. 역할
AI가 맡을 일과 사람만 판단할 일을 분리합니다.

### 4. 도구·권한
읽을 수 있는 폴더, 만들 수 있는 파일, 절대 실행하지 않을 외부 작업을 정합니다.

### 5. 결과
Markdown, CSV, JSON, HTML 중 사람이 검토하기 쉬운 한 형식을 고릅니다.

### 6. 사람 승인
수치, 근거, 민감 표현, 예외처럼 사람이 최종 확인할 항목을 표시합니다.

### 7. 테스트 기록
잘못된 입력에서 AI가 멈추는지, 추측하지 않는지, 원본을 바꾸지 않는지 확인합니다.

{: .tip }
> [공통 실습]({{ site.baseurl }}/02-common-lab/)에서 이 구조를 30분 안에 만드는 순서를 따라 해보세요.

