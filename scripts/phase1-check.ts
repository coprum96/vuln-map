import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');

const REQUIRED_FILES = [
  'package.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'tsconfig.json',
  'index.html',
  'public/geo/russia.geojson',
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/features/map/RussiaMapSVG.tsx',
  'public/geo/russia-outline.geojson',
  'src/data/ru.ts',
  'src/data/regionData.ts',
  'server/index.mjs',
  'server/handlers.mjs',
  'server/data/regions.json',
];

const FORBIDDEN_UI = /\b(mock|demo|тест|заглушка)\b/i;

import { REGION_IDS } from '../src/data/regionData.ts';

let failed = 0;

function pass(msg: string) {
  console.log(`  ✓ ${msg}`);
}

function fail(msg: string) {
  console.error(`  ✗ ${msg}`);
  failed += 1;
}

function walkTsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTsFiles(full));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      out.push(full);
    }
  }
  return out;
}

console.log('Phase 1 check — VulnMap\n');

console.log('1. File structure');
for (const rel of REQUIRED_FILES) {
  const path = join(ROOT, rel);
  if (existsSync(path)) pass(rel);
  else fail(`Missing: ${rel}`);
}

console.log(`\n2. Region data (${REGION_IDS.length} pilot regions)`);
const regionsPath = join(ROOT, 'src/data/regionData.ts');
const regionsSrc = readFileSync(regionsPath, 'utf8');
for (const id of REGION_IDS) {
  if (regionsSrc.includes(`id: '${id}'`)) pass(`region ${id}`);
  else fail(`region ${id} not in regionData.ts`);
}

console.log('\n3. Russia GeoJSON');
const geoRaw = readFileSync(join(ROOT, 'public/geo/russia.geojson'), 'utf8');
const geo = JSON.parse(geoRaw) as {
  type: string;
  features: { properties: { name?: string; ADMIN?: string } }[];
};
if (geo.type !== 'FeatureCollection') fail('GeoJSON type must be FeatureCollection');
else pass('FeatureCollection');
if (geo.features.length >= 80) pass(`${geo.features.length} federal subjects`);
else if (geo.features.length >= 1) pass(`${geo.features.length} geo features`);
else fail('russia.geojson has no features');
const hasMoscow = geo.features.some(
  (f) => f.properties?.name === 'Москва' || f.properties?.name === 'Moscow',
);
if (hasMoscow) pass('pilot geo names present');
else fail('Moscow not found in russia.geojson');

console.log('\n4. UI strings (no forbidden words)');
const srcDir = join(ROOT, 'src');
let uiViolations = 0;
for (const file of walkTsFiles(srcDir)) {
  const content = readFileSync(file, 'utf8');
  if (FORBIDDEN_UI.test(content)) {
    fail(`Forbidden word in ${file.replace(ROOT, '')}`);
    uiViolations += 1;
  }
}
if (uiViolations === 0) pass('src/ clean');

console.log('\n5. ru.ts exports');
const ruPath = join(ROOT, 'src/content/ru.ts');
const ruContent = readFileSync(ruPath, 'utf8');
if (ruContent.includes('export const ru')) pass('ru constant');
else fail('ru.ts must export ru');
if (ruContent.includes('VulnMap')) pass('branding strings');

console.log('\n6. SVG map (no Leaflet)');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
  dependencies?: Record<string, string>;
};
if (!pkg.dependencies?.leaflet) pass('leaflet removed from dependencies');
else fail('leaflet should not be in dependencies');
if (existsSync(join(ROOT, 'src/features/map/RussiaMapSVG.tsx')))
  pass('RussiaMapSVG.tsx');
else fail('RussiaMapSVG.tsx missing');

console.log('\n7. Server JSON');
const serverRegions = JSON.parse(
  readFileSync(join(ROOT, 'server/data/regions.json'), 'utf8'),
) as { id: string }[];
if (serverRegions.length === REGION_IDS.length)
  pass(`server regions.json (${serverRegions.length})`);
else
  fail(
    `server regions.json must have ${REGION_IDS.length} entries (run: npx tsx scripts/sync-server-regions.ts)`,
  );

console.log('\n8. TypeScript');
try {
  execSync('npx tsc --noEmit', { cwd: ROOT, stdio: 'pipe' });
  pass('tsc --noEmit');
} catch (e) {
  const err = e as { stdout?: Buffer; stderr?: Buffer };
  fail('TypeScript errors');
  if (err.stdout) console.error(err.stdout.toString());
  if (err.stderr) console.error(err.stderr.toString());
}

console.log('\n' + (failed === 0 ? '✅ Phase 1: PASSED' : `❌ Phase 1: FAILED (${failed} errors)`));
process.exit(failed === 0 ? 0 : 1);
