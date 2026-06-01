import { REGIONS } from '../../data/regionData';
import { regionName } from '../../content/ru';
import type { Region, RegionId } from '../../types';

const RISK_RANK = { critical: 4, high: 3, medium: 2, low: 1 } as const;

export interface MapPilotSummary {
  pilotCount: number;
  highCriticalCount: number;
  priorityId: RegionId;
  priorityName: string;
  priorityScore: number;
  priorityRisk: Region['riskLevel'];
}

export function computeMapPilotSummary(): MapPilotSummary {
  const highCritical = REGIONS.filter(
    (r) => r.riskLevel === 'high' || r.riskLevel === 'critical',
  );

  const priority = [...REGIONS].sort((a, b) => {
    const riskDiff = RISK_RANK[b.riskLevel] - RISK_RANK[a.riskLevel];
    if (riskDiff !== 0) return riskDiff;
    return b.score - a.score;
  })[0] as Region;

  return {
    pilotCount: REGIONS.length,
    highCriticalCount: highCritical.length,
    priorityId: priority.id,
    priorityName: regionName(priority.id),
    priorityScore: priority.score,
    priorityRisk: priority.riskLevel,
  };
}

export function firstCriticalRegionId(): RegionId | null {
  const critical = REGIONS.find((r) => r.riskLevel === 'critical');
  return critical?.id ?? null;
}
