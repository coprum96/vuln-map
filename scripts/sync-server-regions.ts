/**
 * Синхронизирует server/data/regions.json с src/data/regionData.ts
 * (center в API: [lng, lat])
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { REGIONS } from '../src/data/regionData.ts';

const ROOT = join(import.meta.dirname, '..');

const payload = REGIONS.map((r) => ({
  id: r.id,
  score: r.score,
  score2024: r.score2024,
  riskLevel: r.riskLevel,
  clusters: r.clusters,
  deltaPercent: r.deltaPercent,
  trend: r.trend,
  center: [r.center[1], r.center[0]] as [number, number],
  finance: r.finance,
  scenarioIds: r.scenarioIds,
  dominantCluster: r.dominantCluster,
}));

writeFileSync(
  join(ROOT, 'server/data/regions.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
);

console.log(`Synced ${payload.length} regions to server/data/regions.json`);
