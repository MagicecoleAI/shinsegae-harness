---
title: 4조 · MARK 모니터
parent: 3. 팀별 하네스
nav_order: 4
permalink: /03-team-harnesses/mark-monitor/
---

# 4조 · MARK 뉴스·공시·주가 Brief 하네스

저장된 공개 뉴스·공시·가격 Snapshot을 읽어 중복을 줄이고 **출처와 기준시각이 있는 모니터링 Brief**를 만듭니다.

<div class="metric-band">
  <div><strong>3 sources</strong>뉴스·공시·가격</div>
  <div><strong>1 brief</strong>중요도·변화·근거</div>
  <div><strong>0 advice</strong>투자·매매 판단 없음</div>
</div>

## 1차 목표

기존 발표의 핵심은 포털 뉴스, DART 공시, 주가 정보를 매일 따로 찾는 수작업을 줄이고 중요한 이슈를 놓치지 않는 것입니다. 첫날에는 실시간 크롤링보다 **저장된 공개 Snapshot을 재현 가능하게 분류·요약하는 것**에 집중합니다.

## 오늘의 범위

<div class="scope-lock">
  <div class="in"><strong>오늘 구현</strong><ul><li>뉴스·공시·가격 더미 Snapshot 읽기</li><li>중복 기사 묶기</li><li>정한 기준으로 중요도 분류</li><li>가격 변화와 기준시각 표시</li><li>출처 링크가 있는 Brief 생성</li></ul></div>
  <div class="out"><strong>오늘 제외</strong><ul><li>로그인 우회·무단 크롤링</li><li>실시간 전체 사이트 수집</li><li>자동 메일·메신저 발송</li><li>미공개 정보 사용</li><li>투자 의견·매매 추천</li></ul></div>
</div>

## 수집 원칙

1. 공식 API·공식 RSS·공개 데이터 파일을 먼저 사용합니다.
2. 사이트의 이용약관과 `robots.txt`를 확인합니다.
3. Demo는 네트워크가 없어도 작동하는 저장 Snapshot을 사용합니다.
4. 모든 항목에 출처 URL, 게시시각, 수집시각을 구분해 남깁니다.
5. AI 요약과 원문 사실을 구분합니다.

## 입력과 출력

### Sample Input

`samples/input/snapshots/`

- `news.json` — 제목, 매체, URL, 게시시각, 본문 요약
- `disclosures.json` — 공시명, 제출인, 접수시각, URL
- `prices.csv` — 종목, 기준시각, 종가, 전일 대비
- `monitoring-rules.md` — 키워드, 중요도, 변화 기준

### Expected Output

`outputs/mark-brief.md`

- 기준시각과 사용 Source
- 오늘의 핵심 이슈 3건 이하
- 중복 기사 묶음과 대표 출처
- 중요 공시와 중요도 판정 근거
- 가격 변화와 사실 설명
- 상충 정보·오래된 자료·확인 필요
- 담당자 승인 상태

## AI 역할과 사람 승인

| 역할 | 하는 일 | 하지 않는 일 | 산출물 |
|---|---|---|---|
| `source-curator` | 출처·시각·중복·누락 정리 | 출처 없는 사실을 만들지 않음 | Source 목록 |
| `brief-analyst` | 중요도·변화 기준 적용, 짧은 요약 | 투자 판단·인과를 단정하지 않음 | Brief 초안 |
| `market-reviewer` | 원문 대조, 기준시각, 표현 검토 | 대외 발송을 승인하지 않음 | 검토 의견 |
| **사람: 모니터링 담당** | 출처·중요도·민감 표현·공유 범위 승인 | AI 초안을 자동 발송하지 않음 | 최종 Brief |

## Bronze·Silver·Gold

<div class="stage-strip">
  <div class="stage"><strong>Bronze</strong>저장 Snapshot 3종에서 출처가 있는 짧은 Brief를 만든다.</div>
  <div class="stage"><strong>Silver</strong>중복, 기준시각, 상충정보, 오래된 자료, 사람 확인을 표시한다.</div>
  <div class="stage"><strong>Gold</strong>테스트 10개, API 실패 Fallback, README, 데모를 갖춘다.</div>
</div>

## 추천 폴더

```text
team-04-mark-monitor/
├── CLAUDE.md
├── .claude/agents/
│   ├── source-curator.md
│   ├── brief-analyst.md
│   └── market-reviewer.md
├── .claude/skills/mark-monitor/SKILL.md
├── samples/input/snapshots/
├── samples/input/monitoring-rules.md
├── samples/expected/mark-brief.md
├── outputs/
└── tests/eval-cases.md
```

[4조 Starter Kit 폴더 보기](https://github.com/MagicecoleAI/shinsegae-harness/tree/main/starter-kits/team-04-mark-monitor){: .btn }

## 테스트 10개

| ID | 유형 | 상황 | 기대 결과 |
|---|---|---|---|
| T-01 | 정상 | 뉴스·공시·가격 모두 있음 | 세 Source가 있는 Brief |
| T-02 | 정상 | 같은 사건 기사 3개 | 대표 기사 1건으로 묶고 모두 연결 |
| T-03 | 정상 | 중요 공시 키워드 | 기준과 함께 상단 배치 |
| T-04 | 정상 | 가격 변화 기준 초과 | 수치·기준시각만 사실로 표시 |
| T-05 | 경계 | 출처 URL 누락 | Brief에서 제외하고 오류 목록 |
| T-06 | 경계 | 게시시각 불명 | 시간 불명 표시, 최신으로 단정 금지 |
| T-07 | 경계 | 기사 내용 상충 | 양쪽 출처와 확인 필요 표시 |
| T-08 | 오류 | JSON 손상 | 해당 Source 중단, 나머지와 Fallback |
| T-09 | 오류 | 모든 Source 실패 | 저장된 Backup Brief와 실패 고지 |
| T-10 | 금지 | 매수·매도 추천 요청 | 거부하고 모니터링 사실만 제공 |

## 시작 프롬프트

```text
이 프로젝트는 공개 데이터 기반 MARK 모니터링의 교육용 Prototype입니다.
README.md, CLAUDE.md, 저장 Snapshot, monitoring-rules.md, Expected Output, tests를 읽으세요.

오늘 목표는 뉴스·공시·가격 Snapshot에서 중복을 제거하고,
출처 URL·게시시각·수집시각·중요도 근거가 있는 Markdown Brief를 만드는 것입니다.

로그인 우회, 무단 크롤링, 자동 발송, 투자·매매 추천은 하지 마세요.
Source 검사 → 중복 묶기 → 기준 적용 → Reviewer 검토 순서의 계획을 제시하세요.
지금은 파일을 수정하지 마세요.
```

## 실패와 Fallback

- API·네트워크가 실패하면 저장 Snapshot으로 즉시 전환합니다.
- 중복 판단이 흔들리면 제목 유사도 대신 같은 URL·공시번호·명시 키워드 규칙을 씁니다.
- 중요도 기준이 확정되지 않으면 정렬하지 않고 기준별 후보 목록만 만듭니다.
- 화면이 실패해도 `mark-brief.md`로 데모할 수 있어야 합니다.

## 80분 샘플 미니앱 실습

[공통 Claude Code Playbook]({{ site.baseurl }}/02-common-lab/)의 단계와 아래 팀 Prompt를 사용합니다.

```text
0~15분   Snapshot·규칙·원하는 Brief 읽기
15~25분  Source·시간·금지범위 계획
25~45분  뉴스·공시·가격 첫 화면
45~65분  상충·오래된 자료 필터 변경미션
65~75분  실행·오류수정
75~80분  실제 MARK 업무와 차이 회고
```

### 1. Claude에게 먼저 읽히기

```text
지금은 파일을 수정하지 마세요.
README.md, CLAUDE.md, miniapp-mission.md,
news.json, disclosures.json, prices.csv,
monitoring-rules.md, Expected Output, eval-cases.md를 읽으세요.

Source 검사→중복묶기→중요도·가격변화→Brief→사람승인 흐름과
출처·게시시각·수집시각·상충·오래된 자료·금지요청을 설명해주세요.
투자·매매 판단은 하지 마세요.
```

### 2. 미니앱 계획

```text
HTML·CSS·JavaScript만 사용하는 MARK 교육용 미니앱 계획을 제시해주세요.

최소 화면:
1. 핵심 뉴스·공시·가격변화 요약 카드
2. 중복 묶음·중요도 근거
3. 출처·게시시각·수집시각
4. 상충·오래된 자료·확인 필요
5. 사람 검토상태

실시간 수집·로그인 우회·자동발송·투자추천은 제외하세요.
아직 수정하지 마세요.
```

### 3. 구현 요청

```text
승인한 계획의 첫 결과를 구현해주세요.

- 저장된 뉴스·공시·가격 Snapshot만 사용
- 같은 사건 기사를 중복 묶음으로 표시
- monitoring-rules의 명시 기준으로만 중요도 표시
- 모든 핵심 항목에 Source URL·기준시각 표시
- AI 요약과 원문 사실을 구분

완료 후 변경파일·실행방법·누락된 Source를 알려주세요.
```

### 팀별 변경미션

```text
`상충정보·오래된 자료만 보기` 필터를 추가해주세요.
Source가 손상되거나 URL·시각이 없으면
어떤 자료가 빠졌는지 경고하고 핵심 Brief에서 제외해주세요.
```

### 4. 실행·오류수정

```text
저장 Snapshot으로 앱을 실행하고 확인해주세요.
- 같은 사건 기사들이 묶이는가?
- 중요 공시와 가격변화에 근거·시각이 있는가?
- 상충·오래된 자료 필터가 작동하는가?
- 투자·매매 의견이 생성되지 않는가?

URL 누락·상충 기사·손상 JSON 중 한 상황을 실행하고,
빠진 Source와 Fallback이 보이도록 가장 작은 수정 후 재실행해주세요.
```

### 5. 검증·회고

```text
T-01, T-02, T-06, T-08, T-10을 우선 실행해 판정해주세요.
출처·시각이 없는 내용을 핵심 Brief에서 제외하는지 확인하세요.

샘플 Snapshot과 실제 MARK 업무의 Source 권한·최신성·이용정책·발송승인 차이를 정리하고,
8월 28일 Agent에서 Live Source와 저장 Snapshot 중 무엇을 선택할지 확인질문을 남겨주세요.
```

### 완료증거

- 뉴스·공시·가격이 있는 Brief 화면
- 중복·중요도·출처·시각 표시
- 상충·오래된 자료 필터 전후
- Source 실패 경고와 Fallback
- 실패·수정·재실행 기록
- Sample→Actual 차이와 다음 확인질문

### Fallback

- JSON 파싱이 막히면 핵심 항목을 JavaScript 가상 배열로 고정합니다.
- 중복 판단은 같은 URL·공시번호·키워드 규칙으로 줄입니다.
- 화면이 실패하면 `mark-brief.md` 결과파일로 전환합니다.

## 참고할 Harness 100 패턴

- `37-web-scraper`: 대상 분석·수집·파싱·저장·모니터링과 실패 처리
- `82-report-generator`: Source → 분석 → 요약 → 검토 흐름
- `67-compliance-checker`: 공개 범위와 기준 위반 검토
