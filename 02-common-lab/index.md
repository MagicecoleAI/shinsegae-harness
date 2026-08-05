---
title: 2. 공통 실습
nav_order: 4
permalink: /02-common-lab/
---

# 공통 실습: 30분 하네스 뼈대 만들기

팀별 Starter Kit을 복사한 다음, **KEEP·REPLACE·DELETE**를 정하고 첫 실행 계획을 만듭니다.

## 1. Starter Kit 복사

[전체 Starter Kit ZIP 받기]({{ site.baseurl }}/assets/downloads/shinsegae-harness-starter-kits.zip){: .btn .btn-primary }

압축을 풀고 우리 팀 폴더를 선택합니다.

```text
starter-kits/
├── team-01-forecast-pnl/
├── team-02-weekly-report/
├── team-03-infra-request-guide/
├── team-04-mark-monitor/
└── team-05-wbs-daily-report/
```

## 2. 고정 예시를 먼저 확인

Claude Code에서 팀 폴더를 연 뒤 다음처럼 요청합니다.

```text
이 폴더는 신세계 I&C AI4PM 실습용 Starter입니다.
README.md와 CLAUDE.md를 먼저 읽고, Sample Input과 Expected Output을 비교해주세요.
지금은 수정하지 말고 현재 폴더의 입력, 처리, 결과, 사람 확인, 테스트 구조만 설명해주세요.
```

설명을 듣고 아래 세 가지만 확인합니다.

- Sample Input이 실제로 열린다.
- Expected Output의 필수 항목을 이해했다.
- 인터넷이나 사내 시스템 없이도 핵심 흐름을 만들 수 있다.

## 3. KEEP·REPLACE·DELETE

| 결정 | 뜻 | 예시 |
|---|---|---|
| **KEEP** | 그대로 쓸 구조와 검증 | `outputs/` 저장, Reviewer 승인표 |
| **REPLACE** | 우리 업무로 바꿀 입력·규칙·결과 | 더미 열 이름, 보고서 항목, 기준일 |
| **DELETE** | 오늘 만들지 않을 연동·화면·기능 | SAP/JSM 연결, 자동 메일, 실시간 수집 |

```text
Starter를 기준으로 KEEP, REPLACE, DELETE 표를 작성해주세요.
2주차 v2.0에 없는 기능은 DELETE에 넣고,
Bronze에 필요한 변경만 45~75분 단위로 나눠주세요.
```

## 4. 첫 작업 카드

Claude Code에는 한 번에 한 작업만 줍니다.

```text
1. 이번 작업:
2. 사용할 입력:
3. 만들어야 할 결과:
4. 변경해도 되는 파일:
5. 지켜야 할 업무규칙:
6. 완료 확인방법:
7. 하지 말아야 할 것:
```

좋은 예:

```text
1. 이번 작업: sample.csv의 필수 열 5개를 확인한다.
2. 사용할 입력: samples/input/sample.csv
3. 만들어야 할 결과: outputs/input-check.md
4. 변경해도 되는 파일: src/validate_input.py, outputs/
5. 지켜야 할 업무규칙: 빈 값과 형식 오류를 별도로 표시한다.
6. 완료 확인방법: 정상 Sample은 통과하고, 누락 Sample은 중단한다.
7. 하지 말아야 할 것: 원본 CSV 수정, 외부 API 호출, UI 제작.
```

## 5. 결과 확인과 다음 작업

작업마다 네 가지를 확인합니다.

1. 어떤 파일이 바뀌었는가?
2. 실제로 실행했는가?
3. Expected Output과 무엇이 다른가?
4. 다음 작업으로 가도 되는가, 먼저 고쳐야 하는가?

{: .important }
> 20분 이상 막히면 더 똑똑한 프롬프트를 고민하지 말고 범위를 줄입니다. 외부 연결 → 저장 Sample, 화면 → 결과파일, 여러 입력 → 입력 1개 순으로 줄이세요.

[우리 팀 하네스 선택 →]({{ site.baseurl }}/03-team-harnesses/)

