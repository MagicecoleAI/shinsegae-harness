# WBS Daily Project Rules

## Goal

더미 WBS CSV에서 지연·담당 누락·상태 불일치·다음 7일 마감을 찾아 근거 행이 있는 Markdown Daily를 만든다.

## Rules

- 원본 WBS를 수정하지 않는다.
- 기준일을 모든 실행에 명시한다.
- 지연은 `due_date < 기준일 AND status != Done` 명시 규칙으로 판정한다.
- 담당이 없으면 임의 배정하지 않는다.
- 상태·진척률이 충돌하면 모두 표시하고 PM 확인으로 보낸다.
- 실제 실명, 개인 성과평가, 자동 독촉·발송을 사용하지 않는다.
- 결과는 `outputs/`에 저장한다.

## Done

Daily, Reviewer 의견, 원본 행 추적, Test Log, PM 승인 목록이 있어야 완료다.

