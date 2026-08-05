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

## 참고할 Harness 100 패턴

- `53-financial-modeler`: 수익·비용·시나리오·Reviewer의 의존관계
- `32-data-analysis`: 입력 정리·분석·보고 순서

이 페이지의 Starter는 위 구조를 참고했지만, 예상손익 입력·안전·테스트 기준은 이 과정에 맞게 새로 작성했습니다.

