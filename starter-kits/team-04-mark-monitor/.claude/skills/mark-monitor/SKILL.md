---
name: mark-monitor
description: 저장된 공개 뉴스·공시·가격 Snapshot을 검증, 중복 제거, 중요도 분류해 출처 있는 Brief를 만든다.
---

# MARK Monitor Workflow

1. `CLAUDE.md`, Snapshot, 규칙, Expected Output, Test를 읽는다.
2. source-curator가 Source 필드·시각·중복·손상을 검사한다.
3. brief-analyst가 명시 규칙으로 중요도와 변화를 정리한다.
4. `outputs/mark-brief.md`에 기준시각과 Source가 있는 Brief를 쓴다.
5. market-reviewer가 원문·표현·상충·금지항목을 확인한다.
6. 사람 확인과 승인 상태, Test 결과를 기록한다.

## Fallback

- API·네트워크 실패 → 저장 Snapshot
- 중복 판단 불확실 → URL·공시번호 규칙만 사용
- 중요도 기준 불명확 → 후보 목록만 만들고 사람 정렬
- 모든 Source 실패 → 실패 보고서와 저장 Backup 경로 표시

