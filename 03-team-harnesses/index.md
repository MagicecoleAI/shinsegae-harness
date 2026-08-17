---
title: 3. 팀별 하네스
nav_order: 5
has_children: true
permalink: /03-team-harnesses/
---

# 팀별 하네스

5개 팀의 1차 발표 목표와 가까운 GitBook·Starter를 사용해 오전에는 **유사 샘플 미니앱을 직접 만들고 시행착오를 경험**합니다. 오후에는 샘플을 그대로 복제하지 않고 실제 8월 28일 Agent 주제와 변경·개선점을 결정합니다.

처음 사용하는 팀은 먼저 [Claude Code 미니앱 제작 Playbook]({{ site.baseurl }}/02-common-lab/)의 읽기·계획·범위축소·구현·오류수정 Prompt를 확인하세요.

## 팀별 한 줄 목표

| 팀 | 1차 목표 | 오전 샘플 미니앱 | 8월 28일 결정으로 가져갈 것 |
|---|---|---|---|
| [1조]({{ site.baseurl }}/03-team-harnesses/forecast-pnl/) | 프로젝트 예상손익 | 손익 요약·차이 기준 필터 | 실제 계산규칙·재무 승인·SAP 경계 |
| [2조]({{ site.baseurl }}/03-team-harnesses/weekly-report/) | 주간보고서 | 전주 변화·확인 필요 필터 | 실제 입력채널·민감정보·팀장 승인 |
| [3조]({{ site.baseurl }}/03-team-harnesses/infra-request-guide/) | 인프라 업무요청 | 근거·누락질문·요청서 초안 | 실제 가이드·권한·JSM·보안 승인 |
| [4조]({{ site.baseurl }}/03-team-harnesses/mark-monitor/) | MARK 리포트 | Source·상충·오래된 자료 필터 | Live Source·이용정책·발송 승인 |
| [5조]({{ site.baseurl }}/03-team-harnesses/wbs-daily-report/) | WBS 관리 | 지연·누락·다음 7일 필터 | 실제 일정규칙·원본 권한·PM 승인 |

## 팀별 Starter를 사용하는 기준

- 2주차 v2.0의 사용자·입력·결과가 가장 가까운 팀 킷 하나만 고릅니다.
- Agent 수와 폴더를 모두 유지할 필요는 없습니다.
- 좋은 기능이어도 v2.0에 없으면 `DELETE` 또는 4주차 Backlog로 보냅니다.
- UI는 Silver 통과 뒤 시간이 남을 때만 만듭니다.
- 실제 시스템 연동 없이 고정 Sample로 끝까지 실행할 수 있어야 합니다.
- 10시 45분까지 첫 화면이 없으면 각 페이지의 Fallback 또는 공통 앱 구조로 전환합니다.

{: .safe }
> 팀 페이지와 Starter Kit의 모든 데이터는 교육용 더미입니다. 실제 손익, 내부 정책 원문, 미공개 공시, 운영 인프라 정보, 실명 WBS로 바꾸지 마세요.

## 공통 데모 순서

1. **문제** — 현재 어떤 수작업에서 시간이 걸리는가?
2. **입력** — 어떤 더미 Sample을 사용했는가?
3. **작동** — 입력이 어떤 단계로 결과가 되는가?
4. **검토** — 사람이 무엇을 확인하고 승인하는가?
5. **테스트** — 무엇이 통과했고 무엇이 실패했는가?
6. **다음** — 4주차에 고칠 한 가지는 무엇인가?
