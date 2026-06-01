import type { RegionId } from '../../types';
import { REGIONS_BY_ID } from '../../data/regionData';
import {
  regionName,
  riskLabel,
  ru,
  trendLabel,
} from '../../content/ru';
import type { MapPeriod } from './mapPeriod';
import { regionScoreForPeriod } from './mapPeriod';

interface MapTooltipOverlayProps {
  x: number;
  y: number;
  pilotId: RegionId | null;
  geoName: string;
  period: MapPeriod;
  containerWidth: number;
  containerHeight: number;
}

function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  containerWidth: number,
  containerHeight: number,
) {
  const margin = 8;
  const maxLeft = Math.max(margin, containerWidth - width - margin);
  const maxTop = Math.max(margin, containerHeight - height - margin);
  return {
    left: Math.min(Math.max(margin, x), maxLeft),
    top: Math.min(Math.max(margin, y), maxTop),
  };
}

export function MapTooltipOverlay({
  x,
  y,
  pilotId,
  geoName,
  period,
  containerWidth,
  containerHeight,
}: MapTooltipOverlayProps) {
  const offset = 14;
  const estWidth = pilotId ? 200 : 220;
  const estHeight = pilotId ? 88 : 96;
  const { left, top } = clampPosition(
    x + offset,
    y + offset,
    estWidth,
    estHeight,
    containerWidth,
    containerHeight,
  );

  if (pilotId) {
    const region = REGIONS_BY_ID[pilotId];
    const score = regionScoreForPeriod(region, period);
    const deltaStr =
      region.deltaPercent >= 0
        ? `+${region.deltaPercent.toFixed(1)}%`
        : `${region.deltaPercent.toFixed(1)}%`;

    return (
      <div
        className="pointer-events-none absolute z-20 w-[200px] rounded-md border border-page-border bg-white px-3 py-2 shadow-lg"
        style={{ left, top }}
      >
        <p className="truncate text-sm font-bold text-cbr-navy">
          {regionName(pilotId)}
        </p>
        <p className="mt-1.5 text-[12px] leading-snug text-page-text">
          <span className="text-page-muted">{ru.mapScreen.tooltip.risk}: </span>
          <span className="font-semibold">{riskLabel(region.riskLevel)}</span>
          <span className="mx-1 text-page-muted">·</span>
          <span className="text-page-muted">{ru.mapScreen.tooltip.index}: </span>
          <span className="font-semibold">{score}</span>
          <span className="text-page-muted">/100</span>
        </p>
        <p className="mt-1 text-[11px] text-page-muted">
          {ru.mapScreen.tooltip.trend}: {trendLabel(region.trend)} ({deltaStr})
        </p>
        <p className="mt-1 text-[10px] font-medium text-cbr-navy">
          {ru.mapScreen.tooltip.summaryClick}
        </p>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute z-20 w-[220px] rounded-md border border-[#C5D4E3] bg-[#F8FAFC] px-3 py-2.5 shadow-md"
      style={{ left, top }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">
        {ru.mapScreen.tooltip.outsideTitle}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-page-text">
        {geoName}
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-page-muted">
        {ru.mapScreen.tooltip.hintNoData}
      </p>
    </div>
  );
}
