import { TrendArrow } from '../../components/ui/TrendArrow';
import { ru } from '../../content/ru';
import type { Region } from '../../types';
import type { RegionTrendView } from './buildRegionAnalytics';

interface RegionTrendSectionProps {
  region: Region;
  trend: RegionTrendView;
}

export function RegionTrendSection({ region, trend }: RegionTrendSectionProps) {
  const deltaStr =
    region.deltaPercent >= 0
      ? `+${region.deltaPercent.toFixed(1)}%`
      : `${region.deltaPercent.toFixed(1)}%`;

  const pointDeltaDisplay = trend.isFlat
    ? '±0'
    : `${trend.deltaPoints >= 0 ? '+' : ''}${trend.deltaLabel}`;

  return (
    <div className="rounded-md border border-page-border bg-[#FAFBFC] p-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1 text-center">
          <p className="text-[10px] font-medium uppercase text-page-muted">
            {ru.panel.trend.year2024}
          </p>
          <p className="mt-0.5 text-lg font-bold text-page-muted">
            {trend.score2024}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center px-1">
          <TrendArrow direction={region.trend} value={deltaStr} />
          <p className="mt-0.5 text-[11px] font-semibold tabular-nums text-page-text">
            {pointDeltaDisplay}
          </p>
        </div>
        <div className="min-w-0 flex-1 text-center">
          <p className="text-[10px] font-medium uppercase text-page-muted">
            {ru.panel.trend.year2025}
          </p>
          <p className="mt-0.5 text-lg font-bold text-cbr-red">
            {trend.score2025}
          </p>
        </div>
      </div>
      <p className="mt-2 border-t border-[#E8EDF2] pt-2 text-[12px] leading-snug text-page-text">
        {trend.explanation}
      </p>
    </div>
  );
}
