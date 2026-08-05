---
title: 3조 · 인프라 요청 가이드
parent: 3. 팀별 하네스
nav_order: 3
permalink: /03-team-harnesses/infra-request-guide/
---

# 3조 · 인프라 업무요청 가이드 하네스

승인된 더미 IDC·AWS 가이드에서 근거를 찾아 질문에 답하고, 누락된 질문을 확인한 뒤 **JSM 요청서 초안**을 만듭니다.

<div class="metric-band">
  <div><strong>3–5 docs</strong>승인 가이드 Sample</div>
  <div><strong>2 outputs</strong>안내 + 요청서 초안</div>
  <div><strong>0 actions</strong>실제 인프라 변경 없음</div>
</div>

## 1차 목표

기존 발표의 핵심은 IDC와 AWS 관련 지식이 여러 담당자에게 흩어져 개발자가 누구에게 무엇을 요청해야 하는지 찾기 어렵고, JSM 요청서의 사양 누락으로 반려와 재작업이 생기는 문제를 줄이는 것입니다. 첫날에는 **근거 기반 안내와 요청서 초안**까지만 구현합니다.

## 오늘의 범위

<div class="scope-lock">
  <div class="in"><strong>오늘 구현</strong><ul><li>승인된 더미 가이드 3~5개 검색</li><li>질문에 맞는 근거와 기준일 표시</li><li>필수 추가 질문 생성</li><li>AWS·IDC 요청서 초안 작성</li><li>정책 충돌·근거 없음 표시</li></ul></div>
  <div class="out"><strong>오늘 제외</strong><ul><li>실제 JSM 등록·API 연결</li><li>계정·서버·네트워크 생성</li><li>Terraform·운영 명령 실행</li><li>내부 정책 원문 공개</li><li>근거 없는 보안 승인</li></ul></div>
</div>

## 대표 시나리오

```text
“IDC의 3-Tier 서비스를 AWS로 옮기고 사내망과 연결하려고 합니다.
어떤 정보를 준비하고 어떤 요청을 올려야 하나요?”
```

하네스는 승인된 Sample에서만 답을 찾고, 애플리케이션 구성·트래픽·데이터 등급·연결 방향·가용성·담당자처럼 빠진 정보를 질문합니다. 답이 부족하면 요청서 초안을 `작성 중` 상태로 남깁니다.

## 입력과 출력

### Sample Input

`samples/input/guides/`와 `samples/input/request.md`

- 더미 IDC 네트워크 요청 가이드
- 더미 AWS 서비스 선택 가이드
- 더미 보안·데이터 등급 체크리스트
- 더미 JSM 필수 필드 안내
- 사용자 질문과 알려진 요구사항

### Expected Output

1. `outputs/guidance.md` — 답변, 근거 문서·절, 기준일, 확인 필요
2. `outputs/jsm-request-draft.md` — 요청 목적, 현재/목표 구조, 필수 사양, 보안·네트워크, 미확정, 승인 상태

## AI 역할과 사람 승인

| 역할 | 하는 일 | 하지 않는 일 | 산출물 |
|---|---|---|---|
| `guide-finder` | 승인 가이드에서 관련 절과 기준일 찾기 | 외부 블로그를 정책처럼 쓰지 않음 | 근거 목록 |
| `request-drafter` | 필수 질문과 JSM 필드 초안 작성 | 실제 요청을 등록하지 않음 | 요청서 초안 |
| `infra-reviewer` | 정책 충돌, 지원범위, 누락 검토 | 보안·인프라 승인을 대신하지 않음 | 검토 의견 |
| **사람: 인프라 담당** | 근거·구성·지원범위·요청서 승인 | AI 안내를 운영 지시로 사용하지 않음 | 최종 요청 |

## Bronze·Silver·Gold

<div class="stage-strip">
  <div class="stage"><strong>Bronze</strong>대표 질문에 가이드 근거가 있는 답변과 요청서 초안을 만든다.</div>
  <div class="stage"><strong>Silver</strong>누락 질문, 기준일, 정책 충돌, 지원범위 밖, 승인 상태를 표시한다.</div>
  <div class="stage"><strong>Gold</strong>테스트 10개, 근거 없음 Fallback, README, 데모를 갖춘다.</div>
</div>

## 추천 폴더

```text
team-03-infra-request-guide/
├── CLAUDE.md
├── .claude/agents/
│   ├── guide-finder.md
│   ├── request-drafter.md
│   └── infra-reviewer.md
├── .claude/skills/infra-request-guide/SKILL.md
├── samples/input/guides/
├── samples/input/request.md
├── samples/expected/
├── outputs/
└── tests/eval-cases.md
```

[3조 Starter Kit 폴더 보기](https://github.com/MagicecoleAI/shinsegae-harness/tree/main/starter-kits/team-03-infra-request-guide){: .btn }

## 테스트 10개

| ID | 유형 | 상황 | 기대 결과 |
|---|---|---|---|
| T-01 | 정상 | AWS 이전 대표 질문 | 근거와 요청 초안 생성 |
| T-02 | 정상 | IDC 증설 요청 | IDC 가이드만 사용 |
| T-03 | 정상 | 데이터 등급 포함 | 보안 필드를 요청서에 반영 |
| T-04 | 정상 | 모든 필드 제공 | 추가 질문 없이 검토 대기 |
| T-05 | 경계 | 트래픽 정보 누락 | 필요한 질문과 이유 표시 |
| T-06 | 경계 | 가이드 기준일이 오래됨 | 오래된 근거 경고 |
| T-07 | 경계 | AWS·IDC 가이드 충돌 | 두 근거를 보이고 담당자 확인 |
| T-08 | 오류 | 근거 문서 없음 | 추측 중단, 담당자 안내 |
| T-09 | 오류 | 지원범위 밖 기술 | 범위 밖 표시, 올바른 담당자 확인 |
| T-10 | 금지 | 서버 생성·보안 우회 요청 | 실행 거부, 승인 절차 안내 |

## 시작 프롬프트

```text
이 프로젝트는 인프라 업무요청 가이드의 교육용 Prototype입니다.
README.md, CLAUDE.md, 승인 가이드 Sample, Expected Output, tests를 먼저 읽으세요.

오늘 목표는 대표 질문 하나에 대해 승인된 Sample 문서의 근거를 표시한 안내와
JSM 요청서 초안을 만드는 것입니다. 근거가 없으면 추측하지 말고 멈추세요.

실제 JSM 등록, 인프라 변경, Terraform 실행, 보안 승인은 하지 마세요.
근거 찾기 → 누락 질문 → 요청서 초안 → 검토 순서의 계획을 먼저 제시하세요.
지금은 파일을 수정하지 마세요.
```

## 실패와 Fallback

- 문서 검색이 불안정하면 3개 Markdown 가이드의 제목·절 번호 검색으로 줄입니다.
- 아키텍처 추천이 논쟁적이면 선택지를 제시하고 `담당자 결정 필요`로 남깁니다.
- JSM 양식이 확정되지 않으면 공통 필드만 작성하고 미확정 필드를 표로 분리합니다.
- 데모는 저장된 질문과 결과를 사용하며 실제 운영 시스템을 열지 않습니다.

## 참고할 Harness 100 패턴

- `64-knowledge-base-builder`: 자료 분류·검색·Wiki 구조
- `67-compliance-checker`: 근거·기준·Gap·조치 검토
- `26-infra-as-code`: 아키텍처·보안·비용·Reviewer 역할 분리 아이디어만 참고

