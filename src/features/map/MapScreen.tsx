import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import type { RegionId } from '../../types';
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

      <div className="shrink-0 border-b border-[#E0E6ED] bg-white lg:flex lg:items-center lg:justify-between">
        <MapSummaryStrip
          summary={summary}
          onPriorityClick={handlePriorityClick}
          embedded
        />
        <MapQuickActions
          selectedId={selectedId}
          onOpenMsk={() => openPilot('msk')}
          onOpenSpb={() => openPilot('spb')}
          onShowCritical={handleShowCritical}
          embedded
        />
      </div>

      <div
        className={clsx(
          'relative min-h-0 flex-1 bg-[#E8ECF0] transition-[padding] duration-250 ease-out',
          sidebarOpen && 'lg:pr-[min(420px,100%)]',
        )}
      >
        <div className="absolute inset-0 flex min-h-0 flex-col p-0">
          <div
            className={clsx(
              'relative min-h-0 flex-1 overflow-hidden bg-[#F3F6F9]',
              'border-y border-[#D5DCE5] lg:border lg:border-[#CCD4DE] lg:shadow-sm',
            )}
          >
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
