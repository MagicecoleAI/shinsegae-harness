---
title: 7. 참고자료와 안전
nav_order: 9
permalink: /07-reference/
---

# 참고자료와 안전

이 사이트는 공개 참고자료의 구조와 패턴을 신세계 I&C AI4PM의 5개 프로젝트에 맞게 새로 구성한 실습용 보조자료입니다.

## 참고한 공개자료

### Samsung AX Leader Program

- [공개 학습 사이트](https://edumagiceco.github.io/samsung-ax-leader-program/)
- [GitHub 저장소](https://github.com/edumagiceco/samsung-ax-leader-program)

참고한 부분은 실습형 사이트의 정보 구조, 하네스 구성 설명, 팀별 영감 라이브러리, Build Day에 재사용 가능한 샘플 전환 방식입니다. 기업명·브랜드·일정·업무 데이터·문구는 복제하지 않았습니다.

### Harness 100

- [Harness 100 한국어 README](https://github.com/revfactory/harness-100/blob/main/README_ko.md)
- [Harness 100 저장소](https://github.com/revfactory/harness-100)

참고한 부분은 `.claude/CLAUDE.md`, 역할별 `agents`, 전체 흐름을 조율하는 `skills`, Reviewer 교차 검증, 작업 크기별 축소 모드, 정상·기존 파일·오류 테스트 패턴입니다.

Harness 100은 Apache License 2.0으로 공개되어 있습니다. 이 사이트의 Starter는 원본 파일을 그대로 배포하지 않고, 5개 팀의 더미 입력·업무 범위·안전 기준에 맞게 새로 작성했습니다.

## 팀별 참고 연결

| 팀 | 참고한 Harness 100 패턴 | 이 과정에서 바꾼 점 |
|---|---|---|
| 1조 | Financial Modeler, Data Analysis | DCF·가치평가를 제거하고 더미 프로젝트 차이 분석으로 축소 |
| 2조 | Report Generator, BI Dashboard | 자동 수집·발송을 제거하고 저장 문서 한 페이지 초안으로 축소 |
| 3조 | Knowledge Base, Compliance, IaC | 실제 인프라 변경을 금지하고 근거 안내·요청서 초안으로 축소 |
| 4조 | Web Scraper, Report Generator | 무단 수집·투자 판단을 금지하고 저장 공개 Snapshot으로 축소 |
| 5조 | Data Analysis, Risk Register, PM | 원본 수정·자동 독촉을 금지하고 별도 Daily 보고서로 축소 |

## Claude Code 사용 원칙

- 팀별 Claude Code Max 20x 지정 좌석 1개를 사용합니다.
- 비밀번호와 계정을 공유하지 않습니다.
- Builder가 실행하고 Owner와 Verifier가 요청·검토·판정을 나눕니다.
- Claude의 완료 설명을 증거로 삼지 않고 실제 파일과 실행 결과를 확인합니다.
- 외부 시스템 변경, 자동 발송, 운영 명령은 명시적 사람 승인 없이는 실행하지 않습니다.

## 공개·더미 데이터 원칙

| 사용 가능 | 사용 금지 |
|---|---|
| 직접 만든 더미 값 | 실제 고객·임직원 개인정보 |
| 공개 API·공식 RSS·공개 문서 | 실제 손익·계약·영업기밀 |
| 비식별 구조·업무 규칙 | 운영 로그·토큰·접근키 |
| 저장된 공개 Snapshot | 미공개 뉴스·공시·내부 정책 원문 |

## AI 결과의 지위

이 사이트의 모든 결과는 교육용 초안입니다.

- 재무·손익: PM 또는 재무 담당 승인 전 확정하지 않습니다.
- 주간보고: 팀장 승인 전 발송하지 않습니다.
- 인프라: 인프라·보안 담당 승인 전 운영 지시로 사용하지 않습니다.
- 뉴스·공시: 출처 확인 전 내부 Brief로 확정하지 않으며 투자 판단에 사용하지 않습니다.
- WBS: PM 승인 없이 원본 일정·담당·상태를 바꾸지 않습니다.

{: .safe }
> 좋은 하네스는 AI가 더 많이 결정하게 만드는 장치가 아니라, **AI가 어디까지 일하고 어디서 사람에게 멈춰야 하는지 분명하게 만드는 장치**입니다.

