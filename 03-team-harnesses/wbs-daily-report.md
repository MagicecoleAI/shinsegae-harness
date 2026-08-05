---
title: 5조 · WBS Daily
parent: 3. 팀별 하네스
nav_order: 5
permalink: /03-team-harnesses/wbs-daily-report/
---

# 5조 · 프로젝트 WBS Daily 하네스

더미 WBS를 읽어 **지연·담당 누락·다음 마감·확인 필요**를 찾아 원본과 분리된 일일 보고서를 만듭니다.

<div class="metric-band">
  <div><strong>1 WBS</strong>더미 CSV</div>
  <div><strong>1 daily</strong>상태 보고서</div>
  <div><strong>0 edits</strong>원본 자동 수정 없음</div>
</div>

## 1차 목표

기존 발표의 핵심은 Excel로 수기 관리하는 작업·일정·담당·산출물에서 상태를 빠르게 파악하고 보고서 작성 시간을 줄이는 것입니다. 첫날에는 예측 모델보다 **명시된 규칙으로 지연과 누락을 찾고 근거 행을 남기는 것**에 집중합니다.

## 오늘의 범위

<div class="scope-lock">
  <div class="in"><strong>오늘 구현</strong><ul><li>더미 WBS 필수 열·날짜 검사</li><li>지연·담당 누락·상태 불일치 판정</li><li>다음 7일 마감 목록</li><li>원본 행과 판정 이유 표시</li><li>PM 승인 상태가 있는 Daily</li></ul></div>
  <div class="out"><strong>오늘 제외</strong><ul><li>원본 WBS 자동 수정</li><li>담당자 자동 독촉·발송</li><li>복잡한 완료일 예측</li><li>실제 실명·프로젝트 자료</li><li>AI의 우선순위 자동 확정</li></ul></div>
</div>

## 입력과 출력

### Sample Input

`samples/input/wbs_sample.csv`

| 열 | 뜻 | 확인 규칙 |
|---|---|---|
| `task_id` | 더미 작업 번호 | 고유값 |
| `task_name` | 작업명 | 빈 값 금지 |
| `owner` | 더미 담당 역할 | 빈 값이면 경고 |
| `start_date` | 시작일 | `YYYY-MM-DD` |
| `due_date` | 마감일 | 시작일 이후 |
| `status` | Not Started·In Progress·Done·Blocked | 허용값만 사용 |
| `progress` | 진척률 | 0~100 |
| `deliverable` | 산출물 | 완료 작업은 필수 |

### Expected Output

`outputs/wbs-daily-report.md`

- 기준일과 사용 파일
- 전체 진행률과 계산 방식
- 지연 작업, 판정 이유, 원본 행
- 담당 누락·상태 불일치·완료 산출물 누락
- 다음 7일 마감과 확인할 담당 역할
- AI 제안과 PM 결정의 구분
- `검토 전 / 승인 / 수정 필요` 상태

## AI 역할과 사람 승인

| 역할 | 하는 일 | 하지 않는 일 | 산출물 |
|---|---|---|---|
| `wbs-validator` | 필수 열·날짜·상태·중복 검사 | 원본 행을 수정하지 않음 | 입력 점검표 |
| `schedule-analyst` | 규칙에 따라 지연·다음 마감 계산 | 사람의 업무 성과를 평가하지 않음 | Daily 초안 |
| `project-reviewer` | 판정 이유·합계·근거 행 교차 확인 | 담당자에게 자동 통보하지 않음 | 검토 의견 |
| **사람: PM** | 지연 판정, 담당, 다음 조치, 공유 범위 승인 | AI 제안을 자동 확정하지 않음 | 최종 Daily |

## Bronze·Silver·Gold

<div class="stage-strip">
  <div class="stage"><strong>Bronze</strong>더미 WBS에서 지연·담당 누락·다음 마감을 만든다.</div>
  <div class="stage"><strong>Silver</strong>원본 행·판정 이유·상태 불일치·PM 확인을 표시한다.</div>
  <div class="stage"><strong>Gold</strong>테스트 10개, Fallback, README, 3분 데모를 갖춘다.</div>
</div>

## 추천 폴더

```text
team-05-wbs-daily-report/
├── CLAUDE.md
├── .claude/agents/
│   ├── wbs-validator.md
│   ├── schedule-analyst.md
│   └── project-reviewer.md
├── .claude/skills/wbs-daily-report/SKILL.md
├── samples/input/wbs_sample.csv
├── samples/expected/wbs-daily-report.md
├── outputs/
└── tests/eval-cases.md
```

[5조 Starter Kit 폴더 보기](https://github.com/MagicecoleAI/shinsegae-harness/tree/main/starter-kits/team-05-wbs-daily-report){: .btn }

## 테스트 10개

| ID | 유형 | 상황 | 기대 결과 |
|---|---|---|---|
| T-01 | 정상 | 진행 중·완료·대기 혼합 | 상태별·전체 요약 정확 |
| T-02 | 정상 | 마감일 경과·미완료 | 지연과 일수 표시 |
| T-03 | 정상 | 다음 7일 마감 | 날짜순 목록 |
| T-04 | 정상 | Blocked 작업 | 장애와 PM 확인 분리 |
| T-05 | 경계 | 담당 누락 | 임의 배정 없이 경고 |
| T-06 | 경계 | Done인데 진척률 80 | 상태 불일치 표시 |
| T-07 | 경계 | 중복 `task_id` | 중복 행과 영향 표시 |
| T-08 | 오류 | 잘못된 날짜 형식 | 계산 중단, 오류 행 안내 |
| T-09 | 오류 | 시작일이 마감일 이후 | 논리 오류와 수정 요청 |
| T-10 | 금지 | 원본 자동 수정 요청 | 거부하고 별도 수정 제안표 생성 |

## 시작 프롬프트

```text
이 프로젝트는 WBS Daily 하네스의 교육용 Prototype입니다.
README.md, CLAUDE.md, wbs_sample.csv, Expected Output, tests를 먼저 읽으세요.

오늘 목표는 기준일을 명시하고 지연, 담당 누락, 상태 불일치,
다음 7일 마감과 원본 행이 있는 Markdown Daily를 만드는 것입니다.

원본 WBS 수정, 자동 독촉, 실제 실명 사용, 완료일 예측은 하지 마세요.
입력 검사 → 규칙 계산 → 보고서 → Reviewer 검토 순서의 계획을 먼저 제시하세요.
지금은 파일을 수정하지 마세요.
```

## 실패와 Fallback

- Excel 읽기가 막히면 CSV로 변환한 고정 Sample을 사용합니다.
- 진척률 계산 방식이 확정되지 않으면 단순 평균과 작업 수 기준을 모두 보여주고 PM이 선택하게 합니다.
- 지연 기준이 논쟁적이면 `due_date < 기준일 AND status != Done` 규칙만 사용합니다.
- 자동 알림은 `notification-preview.md` 초안으로 대체합니다.

## 참고할 Harness 100 패턴

- `32-data-analysis`: 정제 → 분석 → 보고 흐름
- `88-risk-register`: 위험 식별 → 평가 → 대응 → 모니터링 구조
- `46-product-manager`: 계획·스프린트·Reviewer 구조

