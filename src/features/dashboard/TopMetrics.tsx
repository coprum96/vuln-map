import { REGIONS } from '../../data/regionData';
import { ru } from '../../data/ru';
import { MetricCard } from '../../components/ui/MetricCard';

export function TopMetrics() {
  const avgScore =
    REGIONS.reduce((sum, r) => sum + r.score, 0) / REGIONS.length;
  const criticalCount = REGIONS.filter((r) => r.riskLevel === 'critical').length;
  const worseningCount = REGIONS.filter((r) => r.trend === 'worsening').length;
  const totalAnnualLossMln = REGIONS.reduce(
    (sum, r) => sum + r.finance.annualExposureMln,
    0,
  );

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MetricCard
        value={avgScore.toFixed(1)}
        label={ru.metrics.nationalIndex}
        trend="worsening"
        trendValue="+2.4"
      />
      <MetricCard
        value={String(criticalCount)}
        label={ru.metrics.criticalRegions}
      />
      <MetricCard
        value={String(worseningCount)}
        label={ru.metrics.worseningRegions}
      />
      <MetricCard
        value={`${totalAnnualLossMln} млн руб`}
        label={ru.metrics.annualRegionalLosses}
        trend="worsening"
        trendValue="+8.2% к 2024"
      />
    </div>
  );
}
