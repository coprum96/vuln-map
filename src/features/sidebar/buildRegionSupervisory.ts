import { getClusterProfile } from '../../data/clusterProfiles';
import { clusterLabel, ru, scenarioLabel } from '../../content/ru';
import type { Region } from '../../types';
import type { Recommendation } from '../../types';

function fill(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

export function buildResponsePriority(region: Region): string {
  return ru.panel.responsePriority[region.riskLevel];
}

export function buildVulnerabilitySigns(region: Region): string[] {
  const profile = getClusterProfile(region.dominantCluster);
  const signs: string[] = [
    fill(ru.panel.signs.dominantGroup, {
      cluster: clusterLabel(region.dominantCluster),
      share: Math.max(region.clusters.c0, region.clusters.c1, region.clusters.c2),
    }),
    ...profile.factors.slice(0, 2).map((f) =>
      fill(ru.panel.signs.factor, { factor: f }),
    ),
  ];

  if (region.finance.largeLossPercent >= 20) {
    signs.push(
      fill(ru.panel.signs.largeLossShare, {
        pct: region.finance.largeLossPercent,
      }),
    );
  }

  if (region.trend === 'worsening') {
    signs.push(ru.panel.signs.worseningTrend);
  }

  return signs.slice(0, 5);
}

export function buildImpactScenarios(region: Region): string[] {
  return region.scenarioIds.map((id) => scenarioLabel(id));
}

export function buildPreventiveMeasureText(
  recommendation: Recommendation | undefined,
): string {
  if (!recommendation) return ru.panel.empty.noAction;
  return `${recommendation.title}. ${recommendation.body}`;
}
