---
title: 0. 시작 준비
nav_order: 2
permalink: /00-start-here/
---

# 시작 준비

Claude Code를 열기 전에 **자료, 범위, 역할, 안전 기준**부터 확인합니다. 준비가 끝나지 않으면 새 기능을 만들지 말고 제공된 더미 Sample로 시작합니다.

## 10분 준비 체크

- [ ] 팀별 Claude Code Max 20x 지정 사용자가 로그인했다.
- [ ] 세 명의 역할을 Owner·Builder·Verifier로 나눴다.
- [ ] 2주차 v2.0 문서와 1주차 Wiki를 열 수 있다.
- [ ] 공개·더미·비식별 Sample Input 1개가 있다.
- [ ] 사람이 보고 승인할 Expected Output 1개가 있다.
- [ ] 오늘 만들 기능과 만들지 않을 기능이 한 문장씩 적혀 있다.
- [ ] 인터넷·API가 없어도 보여줄 저장 Sample과 결과가 있다.

## 팀원 3명의 일

| 역할 | 책임 | 남길 증거 |
|---|---|---|
| **Owner · Navigator** | 실제 업무규칙, 범위, 사람 승인 기준을 지킨다. | 범위 결정, 업무 승인 |
| **Builder · Driver** | 지정 Max 계정으로 한 번에 한 작업만 요청하고 실행한다. | 변경 파일, 실행 결과 |
| **Verifier · Recorder** | 기대 결과와 실제 결과를 비교하고 실패를 기록한다. | Test Log, 결정 기록 |

Max 계정 비밀번호는 공유하지 않습니다. Builder가 실행하는 동안 Owner와 Verifier는 Expected Output, 테스트 입력, 결과 판정을 준비합니다.

## 공개 사이트에서 지켜야 할 정보 경계

<div class="scope-lock">
  <div class="in">
    <strong>사용 가능</strong>
    <ul><li>직접 만든 더미 CSV·문서</li><li>공개 API·공개 문서·공식 RSS</li><li>값을 바꾼 화면 구조와 예시</li><li>비식별 업무 규칙</li></ul>
  </div>
  <div class="out">
    <strong>사용 금지</strong>
    <ul><li>개인·고객 정보</li><li>실제 손익·계약·영업기밀</li><li>운영 로그·접근키·비밀번호</li><li>참가자 사진·이름·원본 발표자료</li></ul>
  </div>
</div>

## 오늘 만들 한 문장

아래 문장을 채우면 범위가 잠깁니다.

```text
[실제 사용자 1명]이 [Sample Input 1종]을 넣으면
[핵심 처리 1개]를 거쳐 [결과물 1개]를 받고,
[담당자]가 [확인할 항목]을 검토한다.
```

예시:

```text
PM이 더미 WBS CSV를 넣으면 지연·담당 누락을 찾아 일일 보고서를 받고,
프로젝트 리더가 지연 판정과 다음 조치를 검토한다.
```

## Claude Code 첫 요청

처음부터 수정시키지 말고 이해 결과를 먼저 확인합니다.

```text
지금은 파일을 수정하지 마세요.
README, CLAUDE.md, samples/input, samples/expected, tests를 먼저 읽어주세요.

1. 오늘 만들 핵심 흐름을 한 문장으로 요약하고
2. 그대로 둘 것 KEEP, 바꿀 것 REPLACE, 버릴 것 DELETE를 구분하고
3. 45~75분 작업 단위와 각 작업의 완료 확인방법을 적어주세요.

UI, 외부 API, 자동 발송은 Silver 통과 전 계획에 넣지 마세요.
```

[하네스 기본 구조로 →]({{ site.baseurl }}/01-harness-basics/)

