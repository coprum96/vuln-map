import clsx from 'clsx';
import { REGIONS } from '../../data/regionData';
import { regionName, ru } from '../../data/ru';
import { RiskBadge } from '../../components/ui/RiskBadge';
import { TrendArrow } from '../../components/ui/TrendArrow';
import type { RegionId } from '../../types';

interface RegionRankingTableProps {
  selectedId: RegionId;
  onSelect: (id: RegionId) => void;
}

export function RegionRankingTable({
  selectedId,
  onSelect,
}: RegionRankingTableProps) {
  const sorted = [...REGIONS].sort((a, b) => b.score - a.score);

  return (
    <div className="overflow-hidden rounded-none border border-page-border bg-white shadow-cbr-sm">
      <div className="border-b border-page-border px-4 py-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wide text-cbr-navy">
          {ru.drilldown.ranking}
        </h3>
      </div>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-cbr-navy text-xs uppercase text-white">
            <th className="px-4 py-2 font-semibold">{ru.drilldown.region}</th>
            <th className="px-4 py-2 font-semibold">{ru.drilldown.score}</th>
            <th className="px-4 py-2 font-semibold">{ru.drilldown.dynamic}</th>
            <th className="px-4 py-2 font-semibold">{ru.filters.risk}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((region, index) => {
            const deltaStr =
              region.deltaPercent >= 0
                ? `+${region.deltaPercent.toFixed(1)}%`
                : `${region.deltaPercent.toFixed(1)}%`;
            const isSelected = region.id === selectedId;
            return (
              <tr
                key={region.id}
                onClick={() => onSelect(region.id)}
                className={clsx(
                  'cursor-pointer border-b border-page-border transition-colors',
                  index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]',
                  'hover:bg-[#EEF3F8]',
                  isSelected && 'border-l-4 border-l-cbr-navy bg-[#EEF3F8]',
                )}
              >
                <td className="px-4 py-2 font-medium text-page-text">
                  {regionName(region.id)}
                </td>
                <td className="px-4 py-2 font-bold text-cbr-navy">{region.score}</td>
                <td className="px-4 py-2">
                  <TrendArrow direction={region.trend} value={deltaStr} />
                </td>
                <td className="px-4 py-2">
                  <RiskBadge level={region.riskLevel} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
