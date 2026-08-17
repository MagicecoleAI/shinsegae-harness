---
title: Home
nav_order: 1
permalink: /
---

<div class="hero-panel">
  <span class="eyebrow">Shinsegae I&amp;C · AI4PM Field Guide</span>
  <h1>Shinsegae<br>Harness</h1>
  <p>GitBook의 팀별 업무설명을 Claude Code가 읽게 하고, 더미 Sample로 미니앱을 직접 만들고 실패·수정한 뒤 실제 Agent 주제와 결과물을 결정하는 실전 작업실입니다.</p>
  <div class="hero-actions">
    <a class="btn btn-primary" href="{{ site.baseurl }}/00-start-here/">시작 준비</a>
    <a class="btn" href="{{ site.baseurl }}/02-common-lab/">Claude Code 미니앱 만들기</a>
    <a class="btn" href="{{ site.baseurl }}/03-team-harnesses/">우리 팀 하네스 선택</a>
    <a class="btn" href="{{ site.baseurl }}/assets/downloads/shinsegae-harness-starter-kits.zip">Starter Kit 받기</a>
  </div>
</div>

## 하네스는 AI가 일하는 울타리입니다

AI가 무엇을 해야 하는지만 적으면 결과가 매번 흔들립니다. 하네스는 **사용할 자료, 업무 규칙, 결과 형식, 사람의 승인, 실패했을 때 멈추는 기준**을 한 폴더에 묶습니다.

<div class="harness-rail" aria-label="하네스 7단계">
  <div class="rail-stop">목표</div>
  <div class="rail-stop">자료</div>
  <div class="rail-stop">역할</div>
  <div class="rail-stop">도구·권한</div>
  <div class="rail-stop">결과</div>
  <div class="rail-stop">사람 승인</div>
  <div class="rail-stop">테스트 기록</div>
</div>

{: .important }
> 완료 기준은 “코드가 많다”가 아닙니다. **같은 Sample Input으로 결과를 다시 만들고, 사람이 확인할 곳과 실패한 테스트를 설명할 수 있는가**입니다.

## 다섯 팀, 다섯 개의 실제 업무 장면

<div class="team-grid">
  <article class="team-card" data-team="01">
    <span class="team-label">TEAM 01 · FINANCE OPS</span>
    <h3>프로젝트 예상손익</h3>
    <p>더미 월별 자료를 읽어 계획·실적·차이를 계산하고, 누락과 합계 이상을 사람이 검토할 수 있게 표시합니다.</p>
    <a href="{{ site.baseurl }}/03-team-harnesses/forecast-pnl/">1조 가이드 →</a>
  </article>
  <article class="team-card" data-team="02">
    <span class="team-label">TEAM 02 · REPORT OPS</span>
    <h3>주간보고서 자동화</h3>
    <p>흩어진 Sample 보고를 한 페이지 초안으로 합치고, 전주 대비 변화와 확인이 필요한 수치를 표시합니다.</p>
    <a href="{{ site.baseurl }}/03-team-harnesses/weekly-report/">2조 가이드 →</a>
  </article>
  <article class="team-card" data-team="03">
    <span class="team-label">TEAM 03 · INFRA OPS</span>
    <h3>인프라 업무요청 가이드</h3>
    <p>승인된 IDC·AWS 안내에서 근거를 찾아 답변하고 JSM 요청서 초안을 만들되, 실제 인프라 변경은 하지 않습니다.</p>
    <a href="{{ site.baseurl }}/03-team-harnesses/infra-request-guide/">3조 가이드 →</a>
  </article>
  <article class="team-card" data-team="04">
    <span class="team-label">TEAM 04 · INTELLIGENCE OPS</span>
    <h3>MARK 뉴스·공시 Brief</h3>
    <p>저장된 공개 데이터 Snapshot을 중복 제거하고, 출처·기준시각이 있는 모니터링 Brief를 만듭니다.</p>
    <a href="{{ site.baseurl }}/03-team-harnesses/mark-monitor/">4조 가이드 →</a>
  </article>
  <article class="team-card" data-team="05">
    <span class="team-label">TEAM 05 · DELIVERY OPS</span>
    <h3>프로젝트 WBS Daily</h3>
    <p>더미 WBS에서 지연·담당 누락·다음 마감 항목을 찾아, 원본을 바꾸지 않는 일일 보고서를 만듭니다.</p>
    <a href="{{ site.baseurl }}/03-team-harnesses/wbs-daily-report/">5조 가이드 →</a>
  </article>
</div>

## 8월 21일의 성공 순서

<div class="stage-strip">
  <div class="stage"><strong>09:00 · Live Demo</strong>강사의 실제 Claude Code 읽기·계획·변경·실행·오류수정을 본다.</div>
  <div class="stage"><strong>10:00 · 팀 샘플</strong>5개 팀이 각자의 GitBook·Starter로 유사 미니앱을 만들고 시행착오를 기록한다.</div>
  <div class="stage"><strong>13:00 · 실제 Agent</strong>샘플과 실제 업무의 차이를 분석해 8월 28일 Agent 주제와 변경점을 정한다.</div>
  <div class="stage"><strong>17:00 · 팀 약속</strong>결과물·Demo·시험·담당·일정·완료증거를 팀 이름으로 약속한다.</div>
</div>

## 먼저 할 일

1. [시작 준비]({{ site.baseurl }}/00-start-here/)에서 데이터·계정·역할을 확인합니다.
2. [Claude Code 미니앱 Playbook]({{ site.baseurl }}/02-common-lab/)에서 읽기·계획·구현·오류수정 Prompt를 확인합니다.
3. [우리 팀 하네스]({{ site.baseurl }}/03-team-harnesses/)에서 팀별 GitBook·Starter·변경미션을 확인합니다.
4. [8시간 수업 Runbook]({{ site.baseurl }}/04-build-day/)으로 오전 샘플과 오후 Agent 주제결정을 연결합니다.
5. [평가와 발표]({{ site.baseurl }}/05-evaluation/)에서 팀 발표와 8월 28일 완료약속을 준비합니다.

{: .safe }
> Claude Code에는 공개·더미·비식별 자료만 넣습니다. 실제 고객정보, 실제 손익, 계약·영업기밀, 운영 로그, 접근키는 사용하지 않습니다. AI가 만든 결과는 담당자가 확인하기 전까지 초안입니다.
