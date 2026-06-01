import { AlertTriangle, Flag, MapPin } from 'lucide-react';
import { AppIcon } from '../../components/icons/AppIcon';
import { riskLabel, ru } from '../../content/ru';
import type { MapPilotSummary } from './mapSummary';

interface MapSummaryStripProps {
  summary: MapPilotSummary;
  onPriorityClick: () => void;
}

export function MapSummaryStrip({
  summary,
  onPriorityClick,
}: MapSummaryStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#E0E6ED] bg-white px-3 py-2 text-[12px] sm:px-4">
      <div className="flex items-center gap-1.5">
        <AppIcon icon={MapPin} size={14} className="shrink-0 text-cbr-navy" />
        <span className="font-semibold tabular-nums text-cbr-navy">
          {summary.pilotCount}
        </span>
        <span className="text-page-muted">{ru.mapScreen.summary.pilots}</span>
      </div>
      <div className="hidden h-3 w-px bg-[#D5DCE5] sm:block" aria-hidden />
      <div className="flex items-center gap-1.5">
        <AppIcon icon={AlertTriangle} size={14} className="shrink-0 text-cbr-red" />
        <span className="font-semibold tabular-nums text-cbr-red">
          {summary.highCriticalCount}
        </span>
        <span className="text-page-muted">{ru.mapScreen.summary.highCritical}</span>
      </div>
      <div className="hidden h-3 w-px bg-[#D5DCE5] md:block" aria-hidden />
      <button
        type="button"
        onClick={onPriorityClick}
        className="flex min-w-0 flex-1 items-center gap-1.5 text-left hover:opacity-80 sm:flex-none"
      >
        <AppIcon icon={Flag} size={14} className="shrink-0 text-cbr-navy" />
        <span className="shrink-0 text-page-muted">
          {ru.mapScreen.summary.priority}:
        </span>
        <span className="truncate font-semibold text-cbr-navy">
          {summary.priorityName}
        </span>
        <span className="shrink-0 text-page-muted">
          · {summary.priorityScore} ({riskLabel(summary.priorityRisk)})
        </span>
      </button>
    </div>
  );
}
