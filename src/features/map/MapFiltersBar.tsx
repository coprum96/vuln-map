import type { RiskFilter } from '../../types';
import { riskLabel, ru } from '../../content/ru';
import type { MapPeriod } from './mapPeriod';
import { MapFilterGroup } from './MapFilterGroup';
import { MapSegment } from './MapSegment';

interface MapFiltersBarProps {
  period: MapPeriod;
  risk: RiskFilter;
  onPeriod: (p: MapPeriod) => void;
  onRisk: (r: RiskFilter) => void;
}

const RISK_OPTIONS: RiskFilter[] = [
  'all',
  'low',
  'medium',
  'high',
  'critical',
];

function riskPillLabel(v: RiskFilter): string {
  if (v === 'all') return ru.filters.all;
  return riskLabel(v);
}

export function MapFiltersBar({
  period,
  risk,
  onPeriod,
  onRisk,
}: MapFiltersBarProps) {
  return (
    <div className="shrink-0 border-b border-page-border bg-white px-3 py-2.5 sm:px-5 sm:py-3">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <MapFilterGroup label={ru.mapScreen.filters.period}>
          <MapSegment
            label={ru.mapScreen.filters.period2025}
            active={period === '2025'}
            onClick={() => onPeriod('2025')}
          />
          <MapSegment
            label={ru.mapScreen.filters.period2024}
            active={period === '2024'}
            onClick={() => onPeriod('2024')}
          />
        </MapFilterGroup>

        <MapFilterGroup label={ru.mapScreen.filters.riskLevel}>
          {RISK_OPTIONS.map((opt) => (
            <MapSegment
              key={opt}
              label={riskPillLabel(opt)}
              active={risk === opt}
              onClick={() => onRisk(opt)}
            />
          ))}
        </MapFilterGroup>
      </div>
    </div>
  );
}
