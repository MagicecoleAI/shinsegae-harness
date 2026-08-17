---
title: 2조 · 주간보고서
parent: 3. 팀별 하네스
nav_order: 2
permalink: /03-team-harnesses/weekly-report/
---

# 2조 · 주간보고서 자동화 하네스

여러 Sample 문서의 업무·성과·이슈·다음 계획을 모아 **전주 대비 변화와 근거가 있는 한 페이지 초안**을 만듭니다.

<div class="metric-band">
  <div><strong>3 inputs</strong>팀 Sample 보고</div>
  <div><strong>1 page</strong>주간보고 초안</div>
  <div><strong>30 sec</strong>고정 Sample 목표</div>
</div>

## 1차 목표

기존 발표의 핵심은 팀별 Excel·메신저·메일에 흩어진 내용을 모아 매주 같은 형식의 보고서를 만드는 시간을 줄이는 것입니다. 첫날에는 수집 자동화보다 **저장된 문서 2~3개를 빠짐없이 합치고 출처와 확인 필요를 남기는 것**에 집중합니다.

## 오늘의 범위

<div class="scope-lock">
  <div class="in"><strong>오늘 구현</strong><ul><li>더미 팀 보고 2~3개 읽기</li><li>성과·이슈·다음 계획 분류</li><li>전주 대비 변화 표시</li><li>누락·상충 수치 표시</li><li>한 페이지 Markdown 초안</li></ul></div>
  <div class="out"><strong>오늘 제외</strong><ul><li>메일·메신저 자동 수집</li><li>자동 발송·자동 결재</li><li>여러 조직 통합 Dashboard</li><li>실제 인사·평가 정보</li><li>근거 없는 성과 해석</li></ul></div>
</div>

## 입력과 출력

### Sample Input

`samples/input/current-week/`와 `samples/input/previous-week.md`

각 팀 보고에는 다음 항목이 있습니다.

- 작성 팀과 기준 주차
- 이번 주 완료 업무
- KPI 또는 수치와 단위
- 이슈·리스크와 필요한 지원
- 다음 주 계획
- 원문 파일과 항목 번호

### Expected Output

`outputs/weekly-report-draft.md`

- Executive Summary 3줄
- 주요 성과와 근거 파일
- 전주 대비 변화
- 이슈·리스크·지원 요청
- 다음 주 계획
- 누락·상충·확인 필요 목록
- 팀장 승인 상태

## AI 역할과 사람 승인

| 역할 | 하는 일 | 하지 않는 일 | 산출물 |
|---|---|---|---|
| `report-collector` | 문서별 항목·수치·출처 추출 | 없는 내용을 만들지 않음 | 수집표 |
| `change-analyst` | 전주 대비 변화·중복·상충 찾기 | 성과를 임의 평가하지 않음 | 변화표 |
| `report-reviewer` | 수치·출처·형식 교차 확인 | 대외 공유를 승인하지 않음 | 검토 의견 |
| **사람: 팀장** | 우선순위, 표현, 수치, 공유 범위 승인 | 초안을 무검토 발송하지 않음 | 최종 보고 |

## Bronze·Silver·Gold

<div class="stage-strip">
  <div class="stage"><strong>Bronze</strong>Sample 3개를 한 페이지 정해진 형식으로 합친다.</div>
  <div class="stage"><strong>Silver</strong>전주 변화·원문 위치·누락·상충·사람 확인을 표시한다.</div>
  <div class="stage"><strong>Gold</strong>테스트 10개, Fallback, README, 3분 데모를 갖춘다.</div>
</div>

## 추천 폴더

```text
team-02-weekly-report/
├── CLAUDE.md
├── .claude/agents/
│   ├── report-collector.md
│   ├── change-analyst.md
│   └── report-reviewer.md
├── .claude/skills/weekly-report/SKILL.md
├── samples/input/current-week/
├── samples/input/previous-week.md
├── samples/expected/weekly-report-draft.md
├── outputs/
└── tests/eval-cases.md
```

[2조 Starter Kit 폴더 보기](https://github.com/MagicecoleAI/shinsegae-harness/tree/main/starter-kits/team-02-weekly-report){: .btn }

## 테스트 10개

| ID | 유형 | 상황 | 기대 결과 |
|---|---|---|---|
| T-01 | 정상 | 팀 보고 3개 | 공통 형식으로 통합 |
| T-02 | 정상 | 전주보다 KPI 상승 | 변화량·단위·근거 표시 |
| T-03 | 정상 | 이슈 없음 | `보고된 이슈 없음`으로 구분 |
| T-04 | 정상 | 다음 계획 여러 개 | 팀·우선순위별 정리 |
| T-05 | 경계 | 필수 항목 누락 | 누락 팀과 항목 표시 |
| T-06 | 경계 | 같은 수치가 다른 값 | 상충 값을 모두 보이고 확인 요청 |
| T-07 | 경계 | 같은 업무 중복 | 합치되 원문 두 곳 유지 |
| T-08 | 오류 | 빈 파일 | 건너뛰지 않고 오류 목록에 표시 |
| T-09 | 오류 | 읽을 수 없는 형식 | 변환 필요 안내, 전체 실행은 계속 |
| T-10 | 금지 | 개인정보 포함 | 결과에서 제외하고 사람 확인 요청 |

## 시작 프롬프트

```text
이 프로젝트는 주간보고서 자동화 하네스의 교육용 Prototype입니다.
README.md, CLAUDE.md, Sample Input, Expected Output, tests를 먼저 읽으세요.

오늘 목표는 저장된 더미 보고 3개를 읽어 성과, 전주 변화, 이슈, 다음 계획,
출처와 확인 필요가 있는 한 페이지 Markdown 초안을 만드는 것입니다.

메일·메신저 연결, 자동 발송, 실제 개인정보 사용은 하지 마세요.
수집 → 변화 분석 → 검토 순서의 작업계획과 완료 확인방법을 먼저 제시하세요.
지금은 파일을 수정하지 마세요.
```

## 실패와 Fallback

- 문서 파싱이 흔들리면 모든 입력을 Markdown 공통 양식으로 바꿉니다.
- 전주 비교가 늦어지면 이번 주 보고 통합부터 완성하고 비교는 수치 2개로 줄입니다.
- 자동 수집이 막히면 `samples/input/` 폴더 선택 방식으로 데모합니다.
- 발송 기능은 결과 미리보기와 다운로드로 대체합니다.

## 80분 샘플 미니앱 실습

[공통 Claude Code Playbook]({{ site.baseurl }}/02-common-lab/)의 단계와 아래 팀 Prompt를 사용합니다.

```text
0~15분   문서·필드·원하는 보고서 읽기
15~25분  계획·제외기능 확정
25~45분  한 페이지 보고 첫 화면
45~65분  확인 필요 필터·원문 위치 변경미션
65~75분  실행·오류수정
75~80분  실제 주간보고 업무와 차이 회고
```

### 1. Claude에게 먼저 읽히기

```text
지금은 파일을 수정하지 마세요.
README.md, CLAUDE.md, miniapp-mission.md,
current-week 문서 3개, previous-week.md,
Expected Output과 eval-cases.md를 읽으세요.

성과·수치·이슈·다음 계획·원문 위치,
전주 변화·누락·상충과 사람 확인 흐름을 설명해주세요.
없는 성과나 수치는 만들지 마세요.
```

### 2. 미니앱 계획

```text
HTML·CSS·JavaScript만 사용하는 주간보고 교육용 미니앱 계획을 제시해주세요.

최소 화면:
1. 입력문서 목록과 기준주차
2. 주요 성과·전주 변화
3. 이슈·다음 계획
4. 누락·상충·확인 필요와 원문 위치
5. 팀장 검토상태

메일·메신저 수집·자동발송·실제 인사정보는 제외하세요.
아직 수정하지 마세요.
```

### 3. 구현 요청

```text
승인한 계획의 첫 결과를 구현해주세요.

- 더미 팀 보고 3개를 공통 구조로 표시
- 성과·전주 변화·이슈·다음 계획을 한 페이지로 구성
- 핵심 항목에 원문 파일명 표시
- 누락·상충은 하나를 선택하지 않고 확인 필요로 표시
- 팀장 검토 전 상태를 명확히 표시

완료 후 변경파일·실행방법·알려진 한계를 알려주세요.
```

### 팀별 변경미션

```text
`확인 필요 항목만 보기` 기능을 추가해주세요.
누락·상충 항목을 선택하면 관련 원문 파일명과 항목을 보여주세요.
근거가 없는 수치나 완료상태는 생성하지 마세요.
```

### 4. 실행·오류수정

```text
앱을 실행해 다음을 확인해주세요.
- 팀 보고 3개가 모두 반영되는가?
- 전주 변화에 단위와 원문 위치가 있는가?
- 상충 수치를 하나로 합치지 않는가?
- 확인 필요 필터가 실제로 목록을 줄이는가?

누락 문서·빈 파일·상충 수치 중 한 상황을 실행하고,
예상·실제 차이를 가장 작은 수정으로 고친 뒤 재실행해주세요.
```

### 5. 검증·회고

```text
T-01, T-02, T-05, T-06, T-10을 우선 실행해 판정해주세요.
성공뿐 아니라 실패와 사람이 확인할 항목을 기록하세요.

샘플과 실제 주간보고 업무의 입력채널·보고규칙·민감정보·승인 차이를 정리하고,
8월 28일 Agent에 적용할 구조와 제외할 자동화를 구분해주세요.
```

### 완료증거

- 보고 입력 3개와 한 페이지 결과
- 전주 변화·원문 위치
- 확인 필요 필터 전후 화면
- 상충 수치 처리 결과
- 실패·수정·재실행 기록
- Sample→Actual 차이와 다음 확인질문

### Fallback

- 문서 읽기가 흔들리면 입력을 한 개 Markdown 배열로 고정합니다.
- 전주 비교가 늦으면 수치 2개만 비교합니다.
- 화면이 실패하면 `weekly-report-draft.md` 결과파일로 전환합니다.

## 참고할 Harness 100 패턴

- `82-report-generator`: 수집 → 분석 → 작성 → 요약·검토 흐름
- `42-bi-dashboard`: KPI 정의와 검토 가능한 결과 구조
