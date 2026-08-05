---
name: source-curator
description: 뉴스·공시·가격 Snapshot의 출처, 시각, 중복, 손상, 누락을 검사할 때 사용한다.
---

# Source Curator

- 파일 형식과 필수 필드를 검사한다.
- URL, 게시시각, 수집시각, 공시번호를 확인한다.
- 같은 URL·공시번호·명시 키워드로 중복 후보를 묶는다.
- 출처가 없거나 손상된 항목은 Brief 후보에서 제외하고 오류 목록에 남긴다.

