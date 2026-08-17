import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const notes = [];

function fail(message) { failures.push(message); }
function filesUnder(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "_site", "vendor", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...filesUnder(full));
    else result.push(full);
  }
  return result;
}

const allFiles = filesUnder(root);
const textFiles = allFiles.filter((file) => /\.(md|yml|yaml|scss|html|mjs|json|csv)$/i.test(file));
const text = new Map(textFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));

const requiredPages = [
  "index.md",
  "00-start-here/index.md",
  "01-harness-basics/index.md",
  "02-common-lab/index.md",
  "03-team-harnesses/index.md",
  "03-team-harnesses/forecast-pnl.md",
  "03-team-harnesses/weekly-report.md",
  "03-team-harnesses/infra-request-guide.md",
  "03-team-harnesses/mark-monitor.md",
  "03-team-harnesses/wbs-daily-report.md",
  "04-build-day/index.md",
  "05-evaluation/index.md",
  "06-templates/index.md",
  "07-reference/index.md"
];

for (const rel of requiredPages) {
  if (!fs.existsSync(path.join(root, rel))) fail(`missing page: ${rel}`);
}

const teamPages = [
  "forecast-pnl.md",
  "weekly-report.md",
  "infra-request-guide.md",
  "mark-monitor.md",
  "wbs-daily-report.md"
].map((name) => path.join(root, "03-team-harnesses", name));

const requiredSections = [
  "## 1차 목표",
  "## 오늘의 범위",
  "## 입력과 출력",
  "## AI 역할과 사람 승인",
  "## Bronze·Silver·Gold",
  "## 추천 폴더",
  "## 테스트 10개",
  "## 시작 프롬프트",
  "## 실패와 Fallback",
  "## 80분 샘플 미니앱 실습",
  "### 1. Claude에게 먼저 읽히기",
  "### 2. 미니앱 계획",
  "### 3. 구현 요청",
  "### 팀별 변경미션",
  "### 4. 실행·오류수정",
  "### 5. 검증·회고",
  "### 완료증거",
  "### Fallback"
];

for (const file of teamPages) {
  const body = text.get(file) ?? "";
  for (const section of requiredSections) {
    if (!body.includes(section)) fail(`${path.relative(root, file)} missing ${section}`);
  }
  const testRows = (body.match(/\| T-\d{2} \|/g) ?? []).length;
  if (testRows !== 10) fail(`${path.relative(root, file)} expected 10 tests, found ${testRows}`);
}

const teams = [
  ["team-01-forecast-pnl", "forecast-pnl"],
  ["team-02-weekly-report", "weekly-report"],
  ["team-03-infra-request-guide", "infra-request-guide"],
  ["team-04-mark-monitor", "mark-monitor"],
  ["team-05-wbs-daily-report", "wbs-daily-report"]
];

for (const [team, skill] of teams) {
  const base = path.join(root, "starter-kits", team);
  const expected = [
    "README.md",
    "CLAUDE.md",
    "miniapp-mission.md",
    path.join(".claude", "skills", skill, "SKILL.md"),
    path.join("tests", "eval-cases.md"),
    path.join("outputs", "README.md")
  ];
  for (const rel of expected) {
    if (!fs.existsSync(path.join(base, rel))) fail(`${team} missing ${rel}`);
  }
  const agentsDir = path.join(base, ".claude", "agents");
  const agentCount = fs.existsSync(agentsDir) ? fs.readdirSync(agentsDir).filter((f) => f.endsWith(".md")).length : 0;
  if (agentCount < 3) fail(`${team} requires at least 3 agents, found ${agentCount}`);
  const sampleFiles = filesUnder(path.join(base, "samples"));
  if (sampleFiles.length < 2) fail(`${team} requires input and expected samples`);
  const evalBody = fs.readFileSync(path.join(base, "tests", "eval-cases.md"), "utf8");
  const testCount = (evalBody.match(/\| T-\d{2} \|/g) ?? []).length;
  if (testCount !== 10) fail(`${team} expected 10 eval rows, found ${testCount}`);
  const readmeBody = fs.readFileSync(path.join(base, "README.md"), "utf8");
  if (!readmeBody.includes("miniapp-mission.md")) fail(`${team} README does not link miniapp-mission.md`);
  const missionBody = fs.readFileSync(path.join(base, "miniapp-mission.md"), "utf8");
  for (const section of ["## 목표", "## 최소 화면", "## 변경미션", "## 하지 않을 것", "## 완료증거"]) {
    if (!missionBody.includes(section)) fail(`${team}/miniapp-mission.md missing ${section}`);
  }
}

const commonLab = fs.readFileSync(path.join(root, "02-common-lab", "index.md"), "utf8");
const commonLabSections = [
  "## 1. 시작 전 준비",
  "## 3. 80분 미니앱 실행순서",
  "## 4. Prompt 1 — 수정하지 말고 먼저 읽기",
  "## 5. Prompt 2 — 미니앱 작업계획 만들기",
  "## 6. Prompt 3 — 범위를 강제로 줄이기",
  "## 7. Prompt 4 — 첫 미니앱 구현",
  "## 8. Prompt 5 — 실행결과 확인하기",
  "## 9. Prompt 6 — 오류를 작게 수정하기",
  "## 10. Prompt 7 — 독립 검증하기",
  "## 11. Prompt 8 — 막혔을 때 범위축소·Fallback",
  "## 12. Prompt 9 — 회고와 실제 프로젝트 연결",
  "## 13. Prompt 10 — 세션 종료·인수인계"
];
for (const section of commonLabSections) {
  if (!commonLab.includes(section)) fail(`02-common-lab/index.md missing ${section}`);
}

for (const [file, phrase] of [
  ["index.md", "Claude Code 미니앱 만들기"],
  ["00-start-here/index.md", "미니앱 제작 절차"],
  ["03-team-harnesses/index.md", "Claude Code 미니앱 제작 Playbook"],
  ["04-build-day/index.md", "5개 팀별 샘플 미니앱"],
  ["05-evaluation/index.md", "팀당 10분 발표"]
]) {
  const body = fs.readFileSync(path.join(root, file), "utf8");
  if (!body.includes(phrase)) fail(`${file} missing current miniapp flow: ${phrase}`);
}

const forbiddenFileExtensions = allFiles.filter((file) => /\.(pdf|png|jpe?g|heic)$/i.test(file));
if (forbiddenFileExtensions.length) fail(`public repo contains source images/PDFs: ${forbiddenFileExtensions.join(", ")}`);

const starterZip = path.join(root, "assets", "downloads", "shinsegae-harness-starter-kits.zip");
if (!fs.existsSync(starterZip) || fs.statSync(starterZip).size < 1000) {
  fail("starter-kit ZIP missing or empty");
}

const publicText = [...text.entries()]
  .filter(([file]) => !file.includes(`${path.sep}scripts${path.sep}`))
  .map(([file, body]) => `${path.relative(root, file)}\n${body}`)
  .join("\n");

if (/\bDev\s*X\b/i.test(publicText)) fail("DevX reference remains in public content");
if (!publicText.includes("Claude Code Max")) fail("Claude Code Max guidance missing");
if (!publicText.includes("Harness 100")) fail("Harness 100 attribution missing");
if (!publicText.includes("Samsung AX Leader Program")) fail("Samsung reference attribution missing");

const permalinkMap = new Set();
for (const file of requiredPages) {
  const body = fs.readFileSync(path.join(root, file), "utf8");
  const match = body.match(/^permalink:\s*(\S+)\s*$/m);
  if (match) permalinkMap.add(match[1]);
}

for (const [file, body] of text) {
  if (!file.endsWith(".md") || file.includes(`${path.sep}starter-kits${path.sep}`)) continue;
  const links = [...body.matchAll(/\]\(\{\{ site\.baseurl \}\}(\/[^)#?]*\/?)/g)].map((m) => m[1]);
  for (const link of links) {
    if (link.startsWith("/assets/downloads/")) continue;
    if (!permalinkMap.has(link)) fail(`${path.relative(root, file)} links to unknown permalink ${link}`);
  }
}

notes.push(`pages=${requiredPages.length}`);
notes.push(`team_pages=${teamPages.length}`);
notes.push(`starter_files=${allFiles.filter((f) => f.includes(`${path.sep}starter-kits${path.sep}`)).length}`);
notes.push(`text_files=${textFiles.length}`);
notes.push(`miniapp_prompts=${(commonLab.match(/^## \d+\. Prompt /gm) ?? []).length}`);

if (failures.length) {
  console.error("VALIDATION FAIL");
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`VALIDATION PASS · ${notes.join(" · ")}`);
