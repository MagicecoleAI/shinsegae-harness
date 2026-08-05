---
name: weekly-report
description: 저장된 더미 팀 보고를 수집해 전주 변화와 근거가 있는 한 페이지 주간보고 초안을 만든다.
---

# Weekly Report Workflow

1. `CLAUDE.md`, 현재·이전 주 Sample, Expected Output, Test를 읽는다.
2. report-collector가 항목과 원문 위치를 표로 정리한다.
3. change-analyst가 전주 변화, 중복, 상충을 찾는다.
4. 한 페이지 초안을 `outputs/weekly-report-draft.md`에 저장한다.
5. report-reviewer가 수치·출처·누락·민감 표현을 확인한다.
6. 사람 확인과 승인 상태를 넣고 Test 결과를 기록한다.

## Fallback

- 다양한 문서 파싱 실패 → Markdown 공통 형식 사용
- 이전 주 없음 → 현재 주 통합만 수행하고 비교 불가 표시
- 자동 수집 실패 → 저장 폴더 선택 방식 유지

