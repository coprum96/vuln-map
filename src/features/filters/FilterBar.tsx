import type { ClusterFilter, RiskFilter, TrendFilter } from '../../types';
import { FilterPill } from '../../components/ui/FilterPill';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { clusterLabel, riskLabel, ru, trendLabel } from '../../data/ru';
import type { ClusterId } from '../../types';

interface FilterBarProps {
  risk: RiskFilter;
  cluster: ClusterFilter;
  trend: TrendFilter;
  onRisk: (v: RiskFilter) => void;
  onCluster: (v: ClusterFilter) => void;
  onTrend: (v: TrendFilter) => void;
}

const RISK_OPTIONS: RiskFilter[] = [
  'all',
  'low',
  'medium',
  'high',
  'critical',
];

const CLUSTER_OPTIONS: ClusterFilter[] = ['all', '0', '1', '2'];

const TREND_OPTIONS: TrendFilter[] = [
  'all',
  'improving',
  'stable',
  'worsening',
];

function riskPillLabel(v: RiskFilter): string {
  if (v === 'all') return ru.filters.all;
  return riskLabel(v);
}

function clusterPillLabel(v: ClusterFilter): string {
  if (v === 'all') return ru.filters.all;
  return clusterLabel(Number(v) as ClusterId);
}

function trendPillLabel(v: TrendFilter): string {
  if (v === 'all') return ru.filters.all;
  return trendLabel(v);
}

export function FilterBar({
  risk,
  cluster,
  trend,
  onRisk,
  onCluster,
  onTrend,
}: FilterBarProps) {
  return (
    <div className="flex h-[52px] flex-wrap items-center gap-6 bg-white px-6 py-2">
      <SectionTitle>{ru.filters.title}</SectionTitle>
      <div className="flex items-center gap-2">
        <span className="text-xs text-page-muted">{ru.filters.risk}:</span>
        {RISK_OPTIONS.map((opt) => (
          <FilterPill
            key={opt}
            label={riskPillLabel(opt)}
            active={risk === opt}
            onClick={() => onRisk(opt)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-page-muted">{ru.filters.cluster}:</span>
        {CLUSTER_OPTIONS.map((opt) => (
          <FilterPill
            key={opt}
            label={clusterPillLabel(opt)}
            active={cluster === opt}
            onClick={() => onCluster(opt)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-page-muted">{ru.filters.trend}:</span>
        {TREND_OPTIONS.map((opt) => (
          <FilterPill
            key={opt}
            label={trendPillLabel(opt)}
            active={trend === opt}
            onClick={() => onTrend(opt)}
          />
        ))}
      </div>
    </div>
  );
}
