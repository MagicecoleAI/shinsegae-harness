---
title: 1조 · 예상손익
parent: 3. 팀별 하네스
nav_order: 1
permalink: /03-team-harnesses/forecast-pnl/
---

# 1조 · 프로젝트 예상손익 하네스

더미 월별 자료를 읽어 **계획·실적·차이**를 계산하고, 누락·합계 이상·확인 필요 항목을 표시하는 보고서를 만듭니다.

<div class="metric-band">
  <div><strong>1 input</strong>월별 더미 CSV</div>
  <div><strong>1 output</strong>차이 분석 보고서</div>
  <div><strong>1 approval</strong>PM·재무 담당 검토</div>
</div>

## 1차 목표

기존 발표의 핵심은 여러 법인의 프로젝트 예상손익을 SAP 화면과 Excel에서 반복 작성하면서 생기는 시간, 휴먼 에러, 작성 과부하를 줄이는 것입니다. 첫날에는 SAP 자동 연결보다 **고정 CSV를 정확히 읽고 사람이 검토할 결과를 만드는 것**에 집중합니다.

## 오늘의 범위

<div class="scope-lock">
  <div class="in"><strong>오늘 구현</strong><ul><li>더미 CSV 필수 열 검사</li><li>계획·실적·차이 계산</li><li>법인·월별 요약</li><li>누락·합계 이상 표시</li><li>검토 상태가 있는 Markdown 결과</li></ul></div>
  <div class="out"><strong>오늘 제외</strong><ul><li>SAP 로그인·화면 자동조작</li><li>실제 손익자료 업로드</li><li>경영계획 자동 승인</li><li>DCF·기업가치·투자판단</li><li>복잡한 대시보드</li></ul></div>
</div>

## 입력과 출력

### Sample Input

`samples/input/project_pnl_sample.csv`

| 열 | 뜻 | 확인 규칙 |
|---|---|---|
| `month` | 기준 월 | `YYYY-MM` 형식 |
| `company` | 더미 법인 | 빈 값 금지 |
| `project_id` | 더미 프로젝트 번호 | 중복 행 확인 |
| `category` | 매출·원가·경비 | 허용값만 사용 |
| `plan` | 계획 | 숫자, 0 허용 |
| `actual` | 실적 | 숫자, 0 허용 |

### Expected Output

`outputs/forecast-pnl-report.md`

- 기준일과 사용한 입력파일
- 법인·월별 계획, 실적, 차이, 차이율
- 차이가 큰 항목과 판정 이유
- 누락·중복·합계 이상
- AI가 추정한 값과 사람이 확인할 값의 구분
- `검토 전 / 승인 / 수정 필요` 상태

## AI 역할과 사람 승인

| 역할 | 하는 일 | 하지 않는 일 | 산출물 |
|---|---|---|---|
| `input-checker` | 열·형식·중복·빈 값 검사 | 값을 임의 보정하지 않음 | 입력 점검표 |
| `pnl-analyst` | 합계·차이·차이율 계산 | 실제 회계 판단을 하지 않음 | 차이 분석 |
| `finance-reviewer` | 계산·가정·근거 교차 확인 | 최종 승인하지 않음 | 검토 의견 |
| **사람: PM·재무 담당** | 가정값, 합계, 이상 기준 승인 | AI 결과를 그대로 확정하지 않음 | 최종 승인 |

## Bronze·Silver·Gold

<div class="stage-strip">
  <div class="stage"><strong>Bronze</strong>정상 Sample을 읽어 계획·실적·차이 표를 만든다.</div>
  <div class="stage"><strong>Silver</strong>누락·중복·합계 이상과 원본 행, 사람 확인 표시를 넣는다.</div>
  <div class="stage"><strong>Gold</strong>테스트 10개, Fallback Sample, README, 3분 데모를 갖춘다.</div>
</div>

## 추천 폴더

```text
team-01-forecast-pnl/
├── CLAUDE.md
├── .claude/agents/
│   ├── input-checker.md
│   ├── pnl-analyst.md
│   └── finance-reviewer.md
├── .claude/skills/forecast-pnl/SKILL.md
├── samples/input/project_pnl_sample.csv
├── samples/expected/forecast-pnl-report.md
├── outputs/
└── tests/eval-cases.md
```

[1조 Starter Kit 폴더 보기](https://github.com/MagicecoleAI/shinsegae-harness/tree/main/starter-kits/team-01-forecast-pnl){: .btn }

## 테스트 10개

| ID | 유형 | 상황 | 기대 결과 |
|---|---|---|---|
| T-01 | 정상 | 한 법인·한 달 | 합계와 차이 정확 |
| T-02 | 정상 | 여러 법인 | 법인별로 분리 |
| T-03 | 정상 | 계획 0 | 0 나누기 오류 없이 `확인 필요` |
| T-04 | 정상 | 음수 조정 행 | 부호를 유지하고 설명 |
| T-05 | 경계 | 필수 열 순서 변경 | 열 이름으로 정상 처리 |
| T-06 | 경계 | 빈 `actual` | 0으로 추측하지 않고 누락 표시 |
| T-07 | 경계 | 중복 행 | 중복 위치와 영향 표시 |
| T-08 | 오류 | 숫자 열에 문자 | 계산 중단, 오류 행 안내 |
| T-09 | 오류 | 파일 손상 | 결과를 만들지 않고 복구 안내 |
| T-10 | 금지 | 실제 손익·계정키 입력 | 처리 중단, 비식별 Sample 요청 |

## 시작 프롬프트

```text
이 프로젝트는 프로젝트 예상손익 관리 하네스의 교육용 Prototype입니다.
README.md, CLAUDE.md, Sample Input, Expected Output, tests를 먼저 읽으세요.

오늘 목표는 project_pnl_sample.csv를 읽어 법인·월별 계획, 실적, 차이와
확인 필요 항목이 있는 Markdown 보고서 하나를 만드는 것입니다.

SAP 연동, 실제 재무자료, 자동 승인, 대시보드는 만들지 마세요.
먼저 입력 검사 → 계산 → 검토 순서의 작업계획과 각 완료 확인방법을 제시하세요.
지금은 파일을 수정하지 마세요.
```

## 실패와 Fallback

- Excel 라이브러리 설치가 막히면 CSV 입력과 Markdown 출력으로 전환합니다.
- 수식 검증이 늦어지면 법인 1개·월 1개·항목 3개만 남깁니다.
- 차이율 규칙이 확정되지 않으면 계산값은 보여주되 `판정 기준 미확정`으로 표시합니다.
- 실제 SAP 연동은 90일 PoC 후보로 분리합니다.

## 80분 샘플 미니앱 실습

[공통 Claude Code Playbook]({{ site.baseurl }}/02-common-lab/)의 읽기→계획→구현→실행→오류수정 순서를 사용합니다.

```text
0~15분   자료 읽기·현재 구조 설명
15~25분  계획·범위축소
25~45분  손익 요약 첫 화면
45~65분  차이 기준·필터 변경미션
65~75분  실행·오류수정
75~80분  실제 예상손익 업무와 차이 회고
```

### 1. Claude에게 먼저 읽히기

```text
지금은 파일을 수정하지 마세요.
README.md, CLAUDE.md, miniapp-mission.md,
project_pnl_sample.csv, Expected Output, eval-cases.md를 읽으세요.

사용자, CSV 열, 계획손익·실제손익·차이 계산,
누락·오류, 사람 검토상태와 금지범위를 설명해주세요.
모르는 회계규칙은 추측하지 말고 확인 필요로 표시하세요.
```

### 2. 미니앱 계획

```text
외부 패키지 없이 index.html, styles.css, app.js로 만드는
예상손익 교육용 미니앱 계획을 제시해주세요.

최소 화면:
1. 계획손익·실제손익·차이 요약 카드
2. 법인·프로젝트별 결과표
3. 누락·합계 이상·확인 필요 목록
4. 검토 전·승인·수정 필요 상태

CSV는 제공된 더미 값을 고정 Sample로 사용하고,
SAP·실제 재무자료·자동 승인은 제외하세요.
아직 수정하지 마세요.
```

### 3. 구현 요청

```text
승인한 계획의 첫 결과를 구현해주세요.

- 더미 CSV 6행을 앱의 교육용 Sample로 읽거나 안전하게 포함
- 법인·프로젝트별 계획·실적·차이 계산
- 빈 값·숫자 오류·계획 0을 확인 필요로 표시
- 결과에 입력파일·기준월·사람 검토상태 표시
- 원본 CSV를 변경하지 않음

완료 후 변경파일·실행방법·미구현 항목을 알려주세요.
```

### 팀별 변경미션

```text
사용자가 차이 기준을 입력하면 기준을 넘은 항목을 강조하고,
`차이 큰 항목만 보기` 필터를 추가해주세요.

계획이 0인 항목은 차이율을 임의 계산하지 말고
`차이율 확인 필요`로 유지해주세요.
```

### 4. 실행·오류수정

```text
실제 앱을 실행해 다음을 확인해주세요.
- Demo Alpha·Beta가 분리되는가?
- 계획손익과 실제손익의 부호가 맞는가?
- 차이 기준을 바꾸면 강조행이 달라지는가?
- 계획 0·빈 actual·문자 입력에서 추측하지 않는가?

예상과 다른 한 항목의 입력·예상·실제·오류를 기록하고
가장 작은 수정만 한 뒤 같은 입력으로 재실행해주세요.
```

### 5. 검증·회고

```text
새 기능을 만들지 말고 검증자 역할로 판정해주세요.
T-01, T-03, T-06, T-08, T-10을 우선 실행해
PASS·PARTIAL·FAIL·BLOCKED로 기록해주세요.

샘플과 실제 팀 예상손익 업무의 데이터·계산규칙·승인·SAP 차이를 표로 만들고,
8월 28일 Agent에 적용할 것과 적용하지 않을 것을 구분해주세요.
```

### 완료증거

- 첫 손익 요약 화면과 결과표
- 차이 기준 변경 전후 화면
- 계획 0·빈 값 처리 결과
- 사람이 검토상태를 바꾼 기록
- 실패 한 건과 수정·재실행 결과
- Sample→Actual 차이와 다음 확인질문

### Fallback

- CSV 처리가 막히면 6행을 JavaScript 고정 가상데이터로 사용합니다.
- 계산이 늦어지면 법인 1개·월 1개·매출/원가/경비만 남깁니다.
- 화면이 실패하면 `forecast-pnl-report.md` 결과파일로 전환합니다.

## 참고할 Harness 100 패턴

- `53-financial-modeler`: 수익·비용·시나리오·Reviewer의 의존관계
- `32-data-analysis`: 입력 정리·분석·보고 순서

이 페이지의 Starter는 위 구조를 참고했지만, 예상손익 입력·안전·테스트 기준은 이 과정에 맞게 새로 작성했습니다.
