import type { Region } from '../../types';
import { getRecommendations } from '../../data/recommendations';
import {
  buildKeyDrivers,
  buildKeyInsights,
  buildRiskSummary,
  buildTrendView,
  contributionSymbol,
} from '../sidebar/buildRegionAnalytics';
import {
  buildImpactScenarios,
  buildPreventiveMeasureText,
  buildResponsePriority,
  buildVulnerabilitySigns,
} from '../sidebar/buildRegionSupervisory';
import {
  clusterLabel,
  regionName,
  riskLabel,
  scenarioLabel,
  trendLabel,
  ru,
} from '../../content/ru';

function formatDelta(delta: number): string {
  return delta >= 0 ? `+${delta.toFixed(1)}%` : `${delta.toFixed(1)}%`;
}

export function buildRegionTxt(region: Region): string {
  const summary = buildRiskSummary(region);
  const signs = buildVulnerabilitySigns(region);
  const scenarios = buildImpactScenarios(region);
  const drivers = buildKeyDrivers(region);
  const trend = buildTrendView(region);
  const responsePriority = buildResponsePriority(region);
  const insights = buildKeyInsights(region);
  const recommendations = getRecommendations(
    region.id,
    region.dominantCluster,
  );
  const primary =
    recommendations.find((r) => r.priority === 'high') ?? recommendations[0];
  const measure = buildPreventiveMeasureText(primary);

  const date = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const lines: string[] = [
    ru.panel.export.title,
    ru.panel.export.subtitle,
    '═'.repeat(50),
    '',
    ru.panel.export.region,
    `  ${regionName(region.id)}`,
    `  Дата формирования: ${date}`,
    '',
    ru.panel.export.riskLevel,
    `  ${riskLabel(region.riskLevel)} · ${ru.drilldown.index} ${region.score}/100 (${ru.panel.trend.year2025}), ${region.score2024} (${ru.panel.trend.year2024})`,
    `  ${ru.drilldown.dynamic}: ${formatDelta(region.deltaPercent)} · ${trendLabel(region.trend)}`,
    '',
    ru.panel.export.conclusion,
    `  ${summary}`,
    '',
    ru.panel.export.responsePriority,
    `  ${responsePriority}`,
    '',
    ru.panel.export.signs,
    ...(signs.length > 0
      ? signs.map((s) => `  — ${s}`)
      : [`  — ${ru.panel.empty.noSigns}`]),
    '',
    ru.panel.export.scenarios,
    ...(scenarios.length > 0
      ? scenarios.map((s, i) => `  ${i + 1}. ${s}`)
      : [`  — ${ru.panel.empty.noScenarios}`]),
    '',
    ru.panel.export.factors,
    ...(drivers.length > 0
      ? drivers.map((d) => {
          const sign = contributionSymbol(d.contribution);
          return `  ${sign} ${d.label}: ${d.detail}`;
        })
      : [`  — ${ru.panel.empty.noDrivers}`]),
    '',
    ru.panel.export.dynamics,
    `  ${trend.score2024} → ${trend.score2025} (${trend.deltaPoints >= 0 ? '+' : ''}${trend.deltaLabel} ${ru.panel.trend.points})`,
    `  ${trend.explanation}`,
    '',
    ru.panel.export.measure,
    `  ${measure}`,
    '',
    ru.panel.export.details,
  ];

  if (insights.length > 0) {
    lines.push('  Сопутствующие показатели:');
    insights.forEach((line) => lines.push(`  — ${line}`));
    lines.push('');
  }

  lines.push(`  ${ru.drilldown.clusters}:`);
  lines.push(`  — ${clusterLabel(0)}: ${region.clusters.c0}%`);
  lines.push(`  — ${clusterLabel(1)}: ${region.clusters.c1}%`);
  lines.push(`  — ${clusterLabel(2)}: ${region.clusters.c2}%`);
  lines.push('');
  lines.push(`  ${ru.drilldown.finance}:`);
  lines.push(
    `  — ${ru.drilldown.avgLoss}: ${region.finance.avgLossRub.toLocaleString('ru-RU')} ₽`,
  );
  lines.push(`  — ${ru.drilldown.largeLoss}: ${region.finance.largeLossPercent}%`);
  lines.push(`  — ${ru.drilldown.annual}: ${region.finance.annualExposureMln} млн ₽`);

  if (recommendations.length > 1) {
    lines.push('');
    lines.push(`  ${ru.drilldown.nudges}:`);
    recommendations.forEach((r) => {
      lines.push(`  — ${r.title}: ${r.body}`);
    });
  }

  lines.push('');
  lines.push('═'.repeat(50));
  lines.push(ru.app.study);

  return lines.join('\n');
}

export function buildRegionCsv(region: Region): string {
  const header = [
    'region_id',
    'region_name',
    'score',
    'score_2024',
    'risk_level',
    'delta_percent',
    'trend',
    'cluster_c0',
    'cluster_c1',
    'cluster_c2',
    'avg_loss_rub',
    'large_loss_pct',
    'annual_exposure_mln',
    'scenarios',
  ].join(',');

  const row = [
    region.id,
    `"${regionName(region.id)}"`,
    region.score,
    region.score2024,
    region.riskLevel,
    region.deltaPercent,
    region.trend,
    region.clusters.c0,
    region.clusters.c1,
    region.clusters.c2,
    region.finance.avgLossRub,
    region.finance.largeLossPercent,
    region.finance.annualExposureMln,
    `"${region.scenarioIds.map(scenarioLabel).join('; ')}"`,
  ].join(',');

  return `${header}\n${row}\n`;
}

export function buildRegionJson(region: Region): string {
  const payload = {
    meta: {
      product: ru.app.title,
      study: ru.app.study,
      exportedAt: new Date().toISOString(),
    },
    region: {
      ...region,
      name: regionName(region.id),
      riskLabel: riskLabel(region.riskLevel),
      trendLabel: trendLabel(region.trend),
      scenarioLabels: region.scenarioIds.map((id) => ({
        id,
        label: scenarioLabel(id),
      })),
      recommendations: getRecommendations(region.id, region.dominantCluster),
    },
  };
  return JSON.stringify(payload, null, 2);
}
