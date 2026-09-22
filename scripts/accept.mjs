// Cổng nghiệm thu BELLA CELLA — chạy trên build production đang phục vụ ở BASE.
//   npm run build && npm start   (terminal khác)
//   npm run accept               (mặc định: overflow + reveal + axe + Lighthouse)
//   npm run accept -- --no-lh    (bỏ Lighthouse)
//   npm run accept -- --lh-only --runs 3   (chỉ Lighthouse, lấy trung vị theo Perf)
// Kết quả: in bảng ra stdout, ảnh chụp + JSON vào .accept/ (không commit).
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const OUT = '.accept';
const ROUTES = ['/', '/san-pham', '/san-pham/exo-bio-ampoule', '/kien-thuc', '/lieu-trinh', '/huong-dan', '/faq', '/chuyen-gia', '/lien-he'];
const WIDTHS = [390, 768, 1440];
const THEMES = ['light', 'dark'];
const LH_ROUTES = ['/', '/san-pham/exo-bio-ampoule'];
const noLh = process.argv.includes('--no-lh');
const lhOnly = process.argv.includes('--lh-only');
const RUNS = Number(process.argv[process.argv.indexOf('--runs') + 1]) || 1;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let failed = 0;
const fail = (m) => { failed++; console.log('  FAIL ' + m); };

// Bẫy đã dính: server cũ phục vụ hash CSS cũ → 400 → trang mất style → axe "sạch" giả.
{
  const page = await browser.newPage();
  await page.goto(BASE + '/');
  // CSS có thể là <link> (kiểm HTTP 200) hoặc inline (experimental.inlineCss).
  const css = await page.$$eval('link[rel="stylesheet"]', (l) => l.map((x) => x.href));
  for (const href of css) {
    const r = await page.request.get(href);
    console.log(`css ${r.status()} ${href.replace(BASE, '')}`);
    if (r.status() !== 200) fail(`CSS ${href} trả ${r.status()} — restart npm start`);
  }
  // Chứng cứ CSS thật sự áp dụng: token --ink có giá trị và body không còn margin mặc định 8px.
  const styled = await page.evaluate(() => ({ ink: getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(), margin: getComputedStyle(document.body).margin }));
  console.log(`css áp dụng: --ink=${styled.ink || '(trống)'} body.margin=${styled.margin}`);
  if (!styled.ink || styled.margin === '8px') fail('trang không có CSS — restart npm start sau khi build');
  await page.close();
}
if (failed) { await browser.close(); process.exit(1); }

const axeRows = [];
for (const theme of lhOnly ? [] : THEMES) {
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, colorScheme: theme });
    await ctx.addInitScript((t) => { try { localStorage.setItem('bc-theme', t); } catch {} }, theme);
    const page = await ctx.newPage();
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (ov > 0) fail(`tràn ngang ${ov}px ${route} @${w} ${theme}`);
      // Cuộn hết trang: mọi khối reveal phải hiện đủ (không kẹt ẩn, không mờ).
      await page.evaluate(async () => { for (let y = 0; y <= document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
      await page.waitForTimeout(150);
      const hidden = await page.$$eval('section.block', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1' || getComputedStyle(e).visibility === 'hidden').length);
      if (hidden) fail(`${hidden} section.block không hiện đủ ${route} @${w} ${theme}`);
      await page.evaluate(() => window.scrollTo(0, 0));
      const name = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '_')}-${w}-${theme}`;
      await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
      if (w !== 768) {
        const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        const bad = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        axeRows.push({ route, w, theme, serious: bad.length, ids: bad.map((v) => `${v.id}×${v.nodes.length}`).join(' ') });
        if (bad.length) fail(`axe ${route} @${w} ${theme}: ${bad.map((v) => v.id).join(', ')}`);
      }
    }
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}/axe.json`, JSON.stringify(axeRows, null, 1));
console.log(`axe: ${axeRows.length} lượt quét, ${axeRows.filter((r) => r.serious).length} lượt có lỗi serious/critical`);
console.log(`overflow/reveal: ${ROUTES.length} route × ${WIDTHS.length} bề rộng × ${THEMES.length} theme`);

if (!noLh) {
  const { default: lighthouse } = await import('lighthouse');
  const { launch } = await import('chrome-launcher');
  const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new'] });
  console.log('\nLighthouse mobile (mặc định: 4× CPU, mạng chậm giả lập)');
  console.log('route | perf | a11y | bp | seo | LCP | CLS | TBT | audit lệch');
  for (const route of LH_ROUTES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) runs.push((await lighthouse(BASE + route, { port: chrome.port, output: 'json', logLevel: 'error' })).lhr);
    runs.sort((x, y) => x.categories.performance.score - y.categories.performance.score);
    const r = { lhr: runs[Math.floor(runs.length / 2)] };
    if (RUNS > 1) console.log(`${route} perf ${RUNS} lần: ${runs.map((x) => Math.round(x.categories.performance.score * 100)).join(' ')} → lấy trung vị`);
    const c = r.lhr.categories, a = r.lhr.audits;
    const s = (k) => Math.round(c[k].score * 100);
    const off = ['best-practices', 'seo'].flatMap((k) => c[k].auditRefs.filter((ar) => ar.weight > 0 && a[ar.id].score !== null && a[ar.id].score < 1).map((ar) => ar.id));
    console.log(`${route} | ${s('performance')} | ${s('accessibility')} | ${s('best-practices')} | ${s('seo')} | ${a['largest-contentful-paint'].displayValue} | ${a['cumulative-layout-shift'].displayValue} | ${a['total-blocking-time'].displayValue} | ${off.join(' ')}`);
    writeFileSync(`${OUT}/lh${route.replaceAll('/', '_')}.json`, JSON.stringify(r.lhr));
    if (s('performance') < 90) fail(`Lighthouse perf ${route} < 90`);
    if (s('accessibility') < 95) fail(`Lighthouse a11y ${route} < 95`);
    if (s('best-practices') < 95) fail(`Lighthouse BP ${route} < 95`);
  }
  try { await chrome.kill(); } catch {} // Windows: chrome-launcher đôi khi EPERM khi xoá thư mục tạm
}

console.log(failed ? `\nKẾT QUẢ: ${failed} mục FAIL` : '\nKẾT QUẢ: ĐẠT');
process.exit(failed ? 1 : 0);
