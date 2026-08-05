---
name: wbs-daily-report
description: 더미 WBS를 검사해 지연·누락·상태 불일치·다음 마감이 있는 Daily와 PM 확인 목록을 만든다.
---

# WBS Daily Workflow

1. `CLAUDE.md`, Sample, Expected Output, Test를 읽고 기준일을 확인한다.
2. wbs-validator가 필수 열·날짜·상태·중복을 검사한다.
3. schedule-analyst가 명시 규칙으로 지연·다음 마감·불일치를 계산한다.
4. `outputs/wbs-daily-report.md`에 원본 행이 있는 Daily를 쓴다.
5. project-reviewer가 계산·판정·금지행동을 확인한다.
6. PM 확인과 승인 상태, Test 결과를 기록한다.

## Fallback

- Excel 처리 실패 → 제공 CSV 사용
- 진행률 방식 미확정 → 방식별 결과를 나란히 제시
- 지연 기준 논쟁 → 명시된 단순 규칙만 적용
- 자동 알림 요청 → 발송하지 않는 미리보기 파일로 대체

