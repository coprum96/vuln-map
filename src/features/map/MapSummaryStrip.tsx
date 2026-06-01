import clsx from 'clsx';
import { AlertTriangle, Flag, MapPin } from 'lucide-react';
import { AppIcon } from '../../components/icons/AppIcon';
import { riskLabel, ru } from '../../content/ru';
import type { MapPilotSummary } from './mapSummary';

interface MapSummaryStripProps {
  summary: MapPilotSummary;
  onPriorityClick: () => void;
  embedded?: boolean;
}

function StatCard({
  icon,
  value,
  label,
  valueClassName = 'text-cbr-navy',
}: {
  icon: typeof MapPin;
  value: number | string;
  label: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1 rounded-md border border-[#E8ECF0] bg-[#FAFBFC] px-1.5 py-1 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 lg:gap-1.5">
      <AppIcon icon={icon} size={13} className="shrink-0 text-cbr-navy" />
      <span className={`text-[12px] font-semibold tabular-nums lg:text-[11px] ${valueClassName}`}>
        {value}
      </span>
      <span className="truncate text-[10px] text-page-muted sm:text-[11px]">{label}</span>
    </div>
  );
}

export function MapSummaryStrip({
  summary,
  onPriorityClick,
  embedded = false,
}: MapSummaryStripProps) {
  return (
    <div
      className={clsx(
        'shrink-0 bg-white px-3 py-1 text-[12px] sm:px-4 lg:py-0.5',
        !embedded && 'border-b border-[#E0E6ED]',
        embedded && 'lg:flex-1 lg:min-w-0 lg:border-0',
      )}
    >
      <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-0 lg:flex-nowrap lg:gap-x-4">
        <StatCard
          icon={MapPin}
          value={summary.pilotCount}
          label={ru.mapScreen.summary.pilots}
        />
        <StatCard
          icon={AlertTriangle}
          value={summary.highCriticalCount}
          label={ru.mapScreen.summary.highCritical}
          valueClassName="text-cbr-red"
        />
        <button
          type="button"
          onClick={onPriorityClick}
          className="col-span-2 flex min-h-[40px] min-w-0 items-center gap-1 rounded-md border border-[#E8ECF0] bg-[#FAFBFC] px-1.5 py-1 text-left active:bg-[#EEF3F8] sm:col-span-1 sm:min-h-0 sm:flex-1 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 lg:min-w-0 lg:max-w-[min(100%,320px)] lg:flex-none"
        >
          <AppIcon icon={Flag} size={13} className="shrink-0 text-cbr-navy" />
          <span className="shrink-0 text-[10px] text-page-muted sm:text-[11px]">
            {ru.mapScreen.summary.priority}:
          </span>
          <span className="truncate text-[12px] font-semibold text-cbr-navy lg:text-[11px]">
            {summary.priorityName}
          </span>
          <span className="hidden shrink-0 text-[10px] text-page-muted md:inline">
            · {summary.priorityScore} ({riskLabel(summary.priorityRisk)})
          </span>
          <span className="shrink-0 text-[10px] text-page-muted md:hidden">
            · {summary.priorityScore}
          </span>
        </button>
      </div>
    </div>
  );
}
