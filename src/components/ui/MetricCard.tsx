import type { TrendDirection } from '../../types';
import { TrendArrow } from './TrendArrow';

interface MetricCardProps {
  value: string;
  label: string;
  trend?: TrendDirection;
  trendValue?: string;
}

export function MetricCard({ value, label, trend, trendValue }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-cbr border border-page-border border-l-4 border-l-cbr-red bg-white p-4 shadow-cbr">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[36px] font-bold leading-none text-cbr-navy">
          {value}
        </span>
        {trend && trendValue ? (
          <TrendArrow direction={trend} value={trendValue} />
        ) : null}
      </div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-page-muted">
        {label}
      </p>
    </div>
  );
}
