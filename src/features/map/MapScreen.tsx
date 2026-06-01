import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import type { RegionId } from '../../types';
import { regionName, ru } from '../../content/ru';
import { useFilters } from '../../hooks/useFilters';
import { useMapData } from '../../hooks/useMapData';
import { MapEmptyState } from './MapEmptyState';
import { MapFiltersBar } from './MapFiltersBar';
import { MapIntro } from './MapIntro';
import { MapLegend } from './MapLegend';
import { MapQuickActions } from './MapQuickActions';
import { MapSummaryStrip } from './MapSummaryStrip';
import {
  computeMapPilotSummary,
  firstCriticalRegionId,
} from './mapSummary';
import type { MapPeriod } from './mapPeriod';
import { RussiaMapSVG } from './RussiaMapSVG';

interface MapScreenProps {
  selectedId: RegionId | null;
  onSelect: (id: RegionId | null) => void;
}

export function MapScreen({ selectedId, onSelect }: MapScreenProps) {
  const [period, setPeriod] = useState<MapPeriod>('2025');
  const { filters, setRisk, reset } = useFilters();
  const { visibleIds } = useMapData(filters);

  const summary = useMemo(() => computeMapPilotSummary(), []);

  const showFilterEmpty = visibleIds.size === 0;
  const sidebarOpen = selectedId !== null;

  const openPilot = useCallback(
    (id: RegionId) => {
      reset();
      onSelect(id);
    },
    [onSelect, reset],
  );

  const handleShowCritical = useCallback(() => {
    reset();
    setRisk('critical');
    const criticalId = firstCriticalRegionId();
    onSelect(criticalId ?? summary.priorityId);
  }, [onSelect, reset, setRisk, summary.priorityId]);

  const handlePriorityClick = useCallback(() => {
    openPilot(summary.priorityId);
  }, [openPilot, summary.priorityId]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <MapIntro />
      <MapFiltersBar
        period={period}
        risk={filters.risk}
        onPeriod={setPeriod}
        onRisk={setRisk}
      />
      <MapSummaryStrip summary={summary} onPriorityClick={handlePriorityClick} />
      <MapQuickActions
        selectedId={selectedId}
        onOpenMsk={() => openPilot('msk')}
        onOpenSpb={() => openPilot('spb')}
        onShowCritical={handleShowCritical}
      />

      <div
        className={clsx(
          'relative min-h-0 flex-1 bg-[#EEF2F6] transition-[padding] duration-250 ease-out',
          sidebarOpen && 'md:pr-[min(420px,100%)]',
        )}
      >
        <div className="absolute inset-0 flex min-h-0 flex-col p-1.5 sm:p-2">
          {selectedId ? (
            <div className="mb-1.5 shrink-0 rounded-md border border-cbr-navy/20 bg-white/95 px-2 py-1 text-[11px] text-cbr-navy shadow-sm sm:px-2.5 sm:text-xs">
              <span className="text-page-muted">{ru.mapScreen.selectionHint}: </span>
              <span className="font-semibold">{regionName(selectedId)}</span>
            </div>
          ) : null}
          <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-md border border-[#D5DCE5] bg-[#F5F7FA] shadow-inner">
            <RussiaMapSVG
              selectedId={selectedId}
              onSelect={onSelect}
              visibleIds={visibleIds}
              period={period}
              filterEmpty={showFilterEmpty}
            />
            <MapLegend />
            {showFilterEmpty ? (
              <MapEmptyState variant="filter" onResetFilters={reset} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
