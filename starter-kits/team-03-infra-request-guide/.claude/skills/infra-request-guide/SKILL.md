---
name: infra-request-guide
description: 승인된 더미 IDC·AWS 가이드로 근거 안내, 누락 질문, JSM 요청서 초안과 검토 목록을 만든다.
---

# Infra Request Guide Workflow

1. `CLAUDE.md`, 가이드, 요청, Expected Output, Test를 읽는다.
2. guide-finder가 관련 문서·절·기준일을 찾는다.
3. 근거가 없거나 충돌하면 상태를 표시하고 사람 확인으로 보낸다.
4. request-drafter가 필수 질문과 JSM 요청서 초안을 만든다.
5. `outputs/guidance.md`, `outputs/jsm-request-draft.md`에 저장한다.
6. infra-reviewer가 근거·누락·금지행동을 확인한다.
7. Test 결과와 인프라 담당 승인 항목을 기록한다.

## Fallback

- 검색 구현 실패 → 제목·절 번호 키워드 검색
- 요청 양식 미확정 → 공통 필드만 작성하고 나머지는 TBD
- 정책 충돌 → 두 근거를 모두 제시하고 사람 결정

