import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "_site");
const base = "/shinsegae-harness";
const failures = [];
let checked = 0;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const file of walk(root).filter((f) => f.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!ref.startsWith(`${base}/`) && ref !== `${base}/`) continue;
    const clean = decodeURIComponent(ref.split("#")[0].split("?")[0]);
    let rel = clean.slice(base.length).replace(/^\//, "");
    if (!rel || rel.endsWith("/")) rel = path.join(rel, "index.html");
    const target = path.join(root, rel);
    checked += 1;
    if (!fs.existsSync(target)) failures.push(`${path.relative(root, file)} -> ${ref}`);
  }
}

if (failures.length) {
  console.error("BUILT LINK CHECK FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`BUILT LINK CHECK PASS · checked=${checked}`);

