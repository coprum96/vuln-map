import { REGIONS } from '../../data/regionData';
import { getClusterProfile } from '../../data/clusterProfiles';
import {
  clusterLabel,
  ru,
  scenarioLabel,
} from '../../content/ru';
import type { Region, ScenarioId } from '../../types';

export type DriverContribution = 'increases' | 'decreases' | 'neutral';

export interface RegionDriver {
  id: string;
  label: string;
  detail: string;
  contribution: DriverContribution;
}

export interface RegionTrendView {
  score2024: number;
  score2025: number;
  deltaPoints: number;
  deltaLabel: string;
  explanation: string;
  isFlat: boolean;
}

function pilotAverageScore(): number {
  const sum = REGIONS.reduce((acc, r) => acc + r.score, 0);
  return Math.round(sum / REGIONS.length);
}

function pilotMedianExposure(): number {
  const sorted = REGIONS.map((r) => r.finance.annualExposureMln).sort(
    (a, b) => a - b,
  );
  const mid = Math.floor(sorted.length / 2);
  return sorted[mid] ?? 0;
}

function dominantClusterShare(region: Region): number {
  const { c0, c1, c2 } = region.clusters;
  return Math.max(c0, c1, c2);
}

function fill(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function formatDeltaPoints(delta: number): string {
  if (Math.abs(delta) < 0.5) return '0';
  const rounded =
    Math.abs(delta) >= 10 ? delta.toFixed(0) : delta.toFixed(1);
  return rounded.replace(/\.0$/, '');
}

export function buildRiskSummary(region: Region): string {
  const template = ru.panel.summary[region.riskLevel];
  return fill(template, { cluster: clusterLabel(region.dominantCluster) });
}

/** Короткие акценты без дублирования summary / drivers / trend */
export function buildKeyInsights(region: Region): string[] {
  const avg = pilotAverageScore();
  const medianExp = pilotMedianExposure();
  const insights: string[] = [];

  if (region.score > avg + 2) {
    insights.push(
      fill(ru.panel.insights.vsPilotHigher, { score: region.score, avg }),
    );
  } else if (region.score < avg - 2) {
    insights.push(
      fill(ru.panel.insights.vsPilotLower, { score: region.score, avg }),
    );
  }

  if (region.finance.annualExposureMln > medianExp * 1.08) {
    insights.push(
      fill(ru.panel.insights.exposureHigh, {
        mln: region.finance.annualExposureMln,
        median: medianExp,
      }),
    );
  }

  return insights.slice(0, 3);
}

export function buildKeyDrivers(region: Region): RegionDriver[] {
  const drivers: RegionDriver[] = [];
  const share = dominantClusterShare(region);
  const profile = getClusterProfile(region.dominantCluster);
  const deltaPoints = region.score - region.score2024;
  const medianExp = pilotMedianExposure();

  drivers.push({
    id: 'cluster',
    label: ru.panel.drivers.dominantCluster,
    detail: `${clusterLabel(region.dominantCluster)} · ${share}%`,
    contribution:
      region.dominantCluster === 0 || region.riskLevel === 'critical'
        ? 'increases'
        : 'neutral',
  });

  drivers.push({
    id: 'delta',
    label: ru.panel.drivers.indexDynamic,
    detail: `${region.score2024} → ${region.score} (${deltaPoints >= 0 ? '+' : ''}${formatDeltaPoints(deltaPoints)})`,
    contribution:
      deltaPoints > 1 ? 'increases' : deltaPoints < -1 ? 'decreases' : 'neutral',
  });

  const scenarios = region.scenarioIds.slice(0, 2);
  scenarios.forEach((id: ScenarioId, index) => {
    drivers.push({
      id: `scenario-${id}`,
      label:
        index === 0
          ? ru.panel.drivers.topScenario
          : ru.panel.drivers.secondScenario,
      detail: scenarioLabel(id),
      contribution: 'increases',
    });
  });

  if (region.finance.annualExposureMln >= medianExp) {
    drivers.push({
      id: 'exposure',
      label: ru.panel.drivers.exposure,
      detail: `${region.finance.annualExposureMln} млн ₽`,
      contribution:
        region.finance.annualExposureMln > medianExp * 1.05
          ? 'increases'
          : 'neutral',
    });
  }

  if (region.finance.largeLossPercent >= 25) {
    drivers.push({
      id: 'large-loss',
      label: ru.panel.drivers.largeLoss,
      detail: `${region.finance.largeLossPercent}%`,
      contribution: 'increases',
    });
  }

  if (drivers.length < 5 && profile.attackPatterns[0]) {
    drivers.push({
      id: 'attack-pattern',
      label: profile.attackPatterns[0],
      detail: profile.factors[0] ?? '',
      contribution: 'increases',
    });
  }

  return drivers.slice(0, 5);
}

export function buildTrendView(region: Region): RegionTrendView {
  const deltaPoints = region.score - region.score2024;
  const isFlat = Math.abs(deltaPoints) < 0.5 && Math.abs(region.deltaPercent) < 1;
  const deltaLabel = formatDeltaPoints(deltaPoints);

  let explanation: string;
  if (isFlat) {
    explanation = ru.panel.trend.flat;
  } else if (region.trend === 'improving') {
    explanation = fill(ru.panel.trend.improved, { delta: deltaLabel });
  } else if (region.trend === 'worsening') {
    explanation = fill(ru.panel.trend.worsened, { delta: deltaLabel });
  } else {
    explanation = fill(ru.panel.trend.stable, { delta: deltaLabel });
  }

  return {
    score2024: region.score2024,
    score2025: region.score,
    deltaPoints,
    deltaLabel,
    explanation,
    isFlat,
  };
}

export function contributionSymbol(
  contribution: DriverContribution,
): string {
  return ru.panel.contribution[contribution];
}
