---
title: 3. 팀별 하네스
nav_order: 5
has_children: true
permalink: /03-team-harnesses/
---

# 팀별 하네스

5개 팀의 1차 발표 목표를 기준으로, 8시간 안에 **만들고·검증하고·설명할 수 있는 범위**로 다시 구성했습니다. 팀의 2주차 v2.0이 바뀌었다면 아래 내용을 강제하지 말고 가장 가까운 Starter만 선택합니다.

## 팀별 한 줄 목표

| 팀 | 1차 목표 | 8시간 핵심 결과 | 참고 패턴 |
|---|---|---|---|
| [1조]({{ site.baseurl }}/03-team-harnesses/forecast-pnl/) | 프로젝트 예상손익 관리 자동화 | 계획·실적·차이·이상 표시 보고서 | Financial Modeler, Data Analysis |
| [2조]({{ site.baseurl }}/03-team-harnesses/weekly-report/) | 주간보고서 자동화 | 전주 변화와 근거가 있는 한 페이지 초안 | Report Generator |
| [3조]({{ site.baseurl }}/03-team-harnesses/infra-request-guide/) | 인프라 업무요청 가이드 AI Agent | 근거 기반 안내와 JSM 요청서 초안 | Knowledge Base, Compliance |
| [4조]({{ site.baseurl }}/03-team-harnesses/mark-monitor/) | MARK 뉴스·주가·공시 리포트 | 공개 Snapshot 기반 출처 있는 Brief | Web Scraper, Report Generator |
| [5조]({{ site.baseurl }}/03-team-harnesses/wbs-daily-report/) | AI Agent 기반 WBS 관리 | 지연·누락·다음 마감 일일 보고서 | Data Analysis, Risk Register |

## 팀별 Starter를 고르는 기준

- 2주차 v2.0의 사용자·입력·결과가 가장 가까운 팀 킷 하나만 고릅니다.
- Agent 수와 폴더를 모두 유지할 필요는 없습니다.
- 좋은 기능이어도 v2.0에 없으면 `DELETE` 또는 4주차 Backlog로 보냅니다.
- UI는 Silver 통과 뒤 시간이 남을 때만 만듭니다.
- 실제 시스템 연동 없이 고정 Sample로 끝까지 실행할 수 있어야 합니다.

{: .safe }
> 팀 페이지와 Starter Kit의 모든 데이터는 교육용 더미입니다. 실제 손익, 내부 정책 원문, 미공개 공시, 운영 인프라 정보, 실명 WBS로 바꾸지 마세요.

## 공통 데모 순서

1. **문제** — 현재 어떤 수작업에서 시간이 걸리는가?
2. **입력** — 어떤 더미 Sample을 사용했는가?
3. **작동** — 입력이 어떤 단계로 결과가 되는가?
4. **검토** — 사람이 무엇을 확인하고 승인하는가?
5. **테스트** — 무엇이 통과했고 무엇이 실패했는가?
6. **다음** — 4주차에 고칠 한 가지는 무엇인가?

