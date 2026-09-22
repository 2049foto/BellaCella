/* Đo hiệu năng lặp nhiều lượt + biểu đồ trong terminal.
   Lighthouse dao động mạnh theo máy, một lượt đo không kết luận được gì —
   script này chạy N lượt mỗi route, in trung vị, dải min–max, biểu đồ cột và
   các chỉ số Web Vitals, rồi ghi JSON để so sánh giữa các lần triển khai.

     npm run perf                         (5 lượt, localhost)
     npm run perf -- --runs 9
     BASE=https://bellacella.vercel.app npm run perf -- --runs 5
     npm run perf -- --routes /,/en       (chọn route)

   Ngưỡng ĐẠT: perf ≥ 90 (trung vị), a11y 100, best-practices 100, CLS ≤ 0.02. */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const OUT = '.accept';
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const RUNS = Number(arg('--runs', 5));
const ROUTES = arg('--routes', '/,/san-pham,/san-pham/exo-bio-ampoule,/lieu-trinh,/huong-dan,/kien-thuc,/faq,/en,/en/products,/en/products/exo-bio-ampoule').split(',');
mkdirSync(OUT, { recursive: true });

const med = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
const bar = (v, max = 100, width = 28) => '█'.repeat(Math.round((v / max) * width)).padEnd(width, '·');
const pad = (s, n) => String(s).padEnd(n);

const { default: lighthouse } = await import('lighthouse');
const { launch } = await import('chrome-launcher');
const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new'] });

console.log(`Lighthouse mobile · ${RUNS} lượt/route · BASE=${BASE}\n`);
const table = [];
for (const route of ROUTES) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    const { lhr } = await lighthouse(BASE + route, { port: chrome.port, output: 'json', logLevel: 'error' });
    runs.push({
      perf: Math.round(lhr.categories.performance.score * 100),
      a11y: Math.round(lhr.categories.accessibility.score * 100),
      bp: Math.round(lhr.categories['best-practices'].score * 100),
      lcp: lhr.audits['largest-contentful-paint'].numericValue / 1000,
      cls: lhr.audits['cumulative-layout-shift'].numericValue,
      tbt: lhr.audits['total-blocking-time'].numericValue,
      si: lhr.audits['speed-index'].numericValue / 1000,
    });
    process.stdout.write(`\r${pad(route, 34)} lượt ${i + 1}/${RUNS} → perf ${runs[i].perf}   `);
  }
  const k = (f) => runs.map((r) => r[f]);
  const row = {
    route,
    perf: med(k('perf')), perfMin: Math.min(...k('perf')), perfMax: Math.max(...k('perf')),
    a11y: med(k('a11y')), bp: med(k('bp')),
    lcp: med(k('lcp')), cls: med(k('cls')), tbt: med(k('tbt')), si: med(k('si')),
    all: k('perf'),
  };
  table.push(row);
  process.stdout.write('\r' + ' '.repeat(60) + '\r');
  console.log(`${pad(route, 34)} perf ${bar(row.perf)} ${row.perf}  (${row.perfMin}–${row.perfMax}, các lượt: ${row.all.join(' ')})`);
}
try { await chrome.kill(); } catch { /* Windows: chrome-launcher đôi khi EPERM khi xoá thư mục tạm */ }

console.log('\nroute                              | perf | a11y |  bp  |  LCP  |  SI   |  CLS  | TBT');
console.log('-'.repeat(88));
for (const r of table) {
  console.log(`${pad(r.route, 34)} | ${pad(r.perf, 4)} | ${pad(r.a11y, 4)} | ${pad(r.bp, 4)} | ${pad(r.lcp.toFixed(1) + 's', 5)} | ${pad(r.si.toFixed(1) + 's', 5)} | ${pad(r.cls.toFixed(3), 5)} | ${Math.round(r.tbt)}ms`);
}

console.log('\nLCP theo route (mục tiêu ≤ 2.5s tốt, ≤ 4.0s chấp nhận)');
const lcpMax = Math.max(4, ...table.map((r) => r.lcp));
for (const r of table) console.log(`${pad(r.route, 34)} ${bar(r.lcp, lcpMax)} ${r.lcp.toFixed(1)}s`);

const bad = table.filter((r) => r.perf < 90 || r.a11y < 100 || r.bp < 100 || r.cls > 0.02);
writeFileSync(`${OUT}/perf.json`, JSON.stringify({ base: BASE, runs: RUNS, at: new Date().toISOString(), table }, null, 1));
console.log(bad.length ? `\nKẾT QUẢ: ${bad.length} route dưới ngưỡng — ${bad.map((r) => r.route).join(', ')}` : '\nKẾT QUẢ: ĐẠT mọi ngưỡng');
process.exit(bad.length ? 1 : 0);
