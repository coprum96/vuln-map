import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import { geoPath } from 'd3-geo';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { RegionId } from '../../types';
import { REGIONS_BY_ID } from '../../data/regionData';
import { getPilotIdFromGeoProperties } from './geoRegionMap';
import { createRussiaProjection } from './russiaProjection';
import { getPilotHitRadius } from './pilotHitRadius';
import {
  svgRiskFill,
  SVG_NO_DATA_FILL,
  SVG_NO_DATA_HOVER,
  SVG_PILOT_STROKE,
  SVG_PILOT_STROKE_WIDTH,
} from './svgRiskColors';
import { MapTooltipOverlay } from './MapTooltipOverlay';
import { MapEmptyState } from './MapEmptyState';
import type { MapPeriod } from './mapPeriod';
import { isRegionHighlighted } from '../../hooks/useMapData';

interface RussiaMapSVGProps {
  selectedId: RegionId | null;
  onSelect: (id: RegionId | null) => void;
  visibleIds: Set<RegionId>;
  period: MapPeriod;
  filterEmpty: boolean;
}

interface GeoFeature extends Feature<Geometry> {
  properties: Record<string, unknown> & { name?: string };
}

interface RenderedFeature {
  pathD: string;
  pilotId: RegionId | null;
  centroid: [number, number];
  geoName: string;
}

const INTERNAL_STROKE = '#DDE3EA';
const OUTLINE_STROKE = '#5A7A9A';
const SELECTED_STROKE = '#C8102E';
const SELECTED_HALO = '#1C3F6E';
/** Внутренний отступ проекции (меньше = крупнее карта в контейнере) */
function mapPaddingForSize(width: number, height: number): number {
  if (width >= 1280 && height >= 520) return 8;
  if (width >= 768) return 10;
  return 12;
}

function pointerClientXY(
  e: MouseEvent<SVGElement> | TouchEvent<SVGElement>,
): { clientX: number; clientY: number } {
  if ('touches' in e) {
    const t = e.touches[0] ?? e.changedTouches[0];
    if (t) return { clientX: t.clientX, clientY: t.clientY };
  }
  const me = e as MouseEvent<SVGElement>;
  return { clientX: me.clientX, clientY: me.clientY };
}

function stripCollectionBbox(geo: FeatureCollection): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: geo.features,
  };
}

export function RussiaMapSVG({
  selectedId,
  onSelect,
  visibleIds,
  period,
  filterEmpty,
}: RussiaMapSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [regions, setRegions] = useState<GeoFeature[]>([]);
  const [outlineFeature, setOutlineFeature] = useState<GeoFeature | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  const [hovered, setHovered] = useState<{
    pilotId: RegionId | null;
    geoName: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setSize({ width, height });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    window.addEventListener('resize', updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');

    void Promise.all([
      fetch('/geo/russia.geojson').then((r) => {
        if (!r.ok) throw new Error(`regions ${r.status}`);
        return r.json() as Promise<FeatureCollection>;
      }),
      fetch('/geo/russia-outline.geojson').then((r) => {
        if (!r.ok) throw new Error(`outline ${r.status}`);
        return r.json() as Promise<FeatureCollection>;
      }),
    ])
      .then(([regionsGeo, outlineGeo]) => {
        if (cancelled) return;
        const cleaned = stripCollectionBbox(regionsGeo);
        setRegions(cleaned.features as GeoFeature[]);
        const outline = outlineGeo.features[0] as GeoFeature | undefined;
        setOutlineFeature(outline ?? null);
        setLoadState('ready');
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const projection = useMemo(() => {
    if (size.width < 10 || size.height < 10) return null;
    const pad = mapPaddingForSize(size.width, size.height);
    return createRussiaProjection(size.width, size.height, pad);
  }, [size.width, size.height]);

  const pathGenerator = useMemo(
    () => (projection ? geoPath(projection) : null),
    [projection],
  );

  const rendered = useMemo((): RenderedFeature[] => {
    if (!pathGenerator) return [];
    return regions.map((feature) => {
      const pilotId = getPilotIdFromGeoProperties(feature.properties);
      const pathD = pathGenerator(feature) ?? '';
      const centroid = pathGenerator.centroid(feature);
      const geoName = String(feature.properties?.name ?? '');
      return { pathD, pilotId, centroid, geoName };
    });
  }, [regions, pathGenerator]);

  const outlinePath = useMemo(() => {
    if (!pathGenerator || !outlineFeature) return null;
    return pathGenerator(outlineFeature) ?? null;
  }, [outlineFeature, pathGenerator]);

  const getFill = useCallback(
    (pilotId: RegionId | null, isHover: boolean): string => {
      if (!pilotId) {
        return isHover ? SVG_NO_DATA_HOVER : SVG_NO_DATA_FILL;
      }
      const region = REGIONS_BY_ID[pilotId];
      const highlighted = isRegionHighlighted(pilotId, visibleIds);
      if (!highlighted && !filterEmpty) {
        return isHover ? '#E0E5EB' : '#ECEFF3';
      }
      return svgRiskFill(region.riskLevel, isHover);
    },
    [visibleIds, filterEmpty],
  );

  const getOpacity = useCallback(
    (pilotId: RegionId | null): number => {
      if (!pilotId) return selectedId ? 0.35 : 0.5;
      const highlighted = isRegionHighlighted(pilotId, visibleIds);
      if (!highlighted) return 0.2;
      if (!selectedId) return 1;
      if (pilotId === selectedId) return 1;
      return 0.48;
    },
    [selectedId, visibleIds],
  );

  const handlePilotSelect = useCallback(
    (pilotId: RegionId) => {
      if (!isRegionHighlighted(pilotId, visibleIds)) return;
      onSelect(pilotId);
    },
    [onSelect, visibleIds],
  );

  const setHoverFromPointer = useCallback(
    (
      pilotId: RegionId | null,
      geoName: string,
      clientX: number,
      clientY: number,
    ) => {
      const rect = containerRef.current?.getBoundingClientRect();
      setHovered({
        pilotId,
        geoName,
        x: clientX - (rect?.left ?? 0),
        y: clientY - (rect?.top ?? 0),
      });
    },
    [],
  );

  const setHoverFromEvent = useCallback(
    (
      pilotId: RegionId | null,
      geoName: string,
      e: MouseEvent<SVGElement> | TouchEvent<SVGElement>,
    ) => {
      const { clientX, clientY } = pointerClientXY(e);
      setHoverFromPointer(pilotId, geoName, clientX, clientY);
    },
    [setHoverFromPointer],
  );

  useEffect(() => {
    if (!hovered) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = containerRef.current;
      if (root && !root.contains(e.target as Node)) {
        setHovered(null);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [hovered]);

  const pilotFeatures = useMemo(
    () =>
      rendered.filter(
        (r) => r.pilotId && r.pathD && isRegionHighlighted(r.pilotId, visibleIds),
      ),
    [rendered, visibleIds],
  );

  const nonPilotFeatures = useMemo(
    () => rendered.filter((r) => !r.pilotId && r.pathD),
    [rendered],
  );

  const selectedFeature = useMemo(
    () => rendered.find((r) => r.pilotId === selectedId && r.pathD),
    [rendered, selectedId],
  );

  const svgReady =
    loadState === 'ready' && size.width > 0 && pathGenerator !== null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 touch-manipulation"
    >
      {loadState === 'loading' ? <MapEmptyState variant="loading" /> : null}
      {loadState === 'error' ? <MapEmptyState variant="error" /> : null}

      {svgReady ? (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}
          role="img"
          aria-label="Карта России"
        >
          <defs>
            <clipPath id="russia-map-clip">
              <rect width={size.width} height={size.height} />
            </clipPath>
          </defs>
          <g clipPath="url(#russia-map-clip)">
            {nonPilotFeatures.map((item, index) => {
              const { pathD, geoName } = item;
              const isHovered = hovered?.geoName === geoName && !hovered.pilotId;
              return (
                <path
                  key={`np-${geoName}-${index}`}
                  d={pathD}
                  fill={getFill(null, isHovered)}
                  stroke={INTERNAL_STROKE}
                  strokeWidth={0.5}
                  opacity={getOpacity(null)}
                  pointerEvents="stroke"
                  style={{ transition: 'fill 0.15s ease, opacity 0.2s ease' }}
                  onMouseEnter={(e) => setHoverFromEvent(null, geoName, e)}
                  onMouseMove={(e) => setHoverFromEvent(null, geoName, e)}
                  onMouseLeave={() => setHovered(null)}
                  onTouchStart={(e) => setHoverFromEvent(null, geoName, e)}
                  onTouchMove={(e) => setHoverFromEvent(null, geoName, e)}
                />
              );
            })}
            {rendered
              .filter((r) => r.pilotId && !isRegionHighlighted(r.pilotId!, visibleIds))
              .map((item, index) => {
                const { pilotId, pathD, geoName } = item;
                if (!pathD || !pilotId) return null;
                return (
                  <path
                    key={`dim-${geoName}-${index}`}
                    d={pathD}
                    fill={getFill(pilotId, false)}
                    stroke={INTERNAL_STROKE}
                    strokeWidth={0.5}
                    opacity={getOpacity(pilotId)}
                    pointerEvents="none"
                  />
                );
              })}
            {pilotFeatures.map((item, index) => {
              const { pilotId, pathD, geoName } = item;
              if (!pilotId) return null;
              const isHovered =
                hovered?.pilotId === pilotId || hovered?.geoName === geoName;
              const isSelected = pilotId === selectedId;
              return (
                <path
                  key={`pilot-${geoName}-${index}`}
                  d={pathD}
                  fill={getFill(pilotId, isHovered)}
                  stroke={
                    isSelected
                      ? SELECTED_STROKE
                      : isHovered
                        ? SELECTED_HALO
                        : SVG_PILOT_STROKE
                  }
                  strokeWidth={
                    isSelected ? 2 : isHovered ? 1.5 : SVG_PILOT_STROKE_WIDTH
                  }
                  opacity={getOpacity(pilotId)}
                  style={{
                    cursor: 'pointer',
                    transition: 'fill 0.15s ease, opacity 0.2s ease, stroke 0.15s ease',
                  }}
                  onMouseEnter={(e) => setHoverFromEvent(pilotId, geoName, e)}
                  onMouseMove={(e) => setHoverFromEvent(pilotId, geoName, e)}
                  onMouseLeave={() => setHovered(null)}
                  onTouchStart={(e) => setHoverFromEvent(pilotId, geoName, e)}
                  onTouchMove={(e) => setHoverFromEvent(pilotId, geoName, e)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePilotSelect(pilotId);
                  }}
                />
              );
            })}
            {pilotFeatures.map((item) => {
              if (!item.pilotId) return null;
              const [cx, cy] = item.centroid;
              const r = getPilotHitRadius(item.pilotId, size.width);
              return (
                <circle
                  key={`hit-${item.pilotId}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="transparent"
                  stroke="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) =>
                    setHoverFromEvent(item.pilotId, item.geoName, e)
                  }
                  onMouseMove={(e) =>
                    setHoverFromEvent(item.pilotId, item.geoName, e)
                  }
                  onMouseLeave={() => setHovered(null)}
                  onTouchStart={(e) =>
                    setHoverFromEvent(item.pilotId, item.geoName, e)
                  }
                  onTouchMove={(e) =>
                    setHoverFromEvent(item.pilotId, item.geoName, e)
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePilotSelect(item.pilotId!);
                  }}
                />
              );
            })}
            {selectedFeature?.pathD ? (
              <g pointerEvents="none" aria-hidden>
                <path
                  d={selectedFeature.pathD}
                  fill="none"
                  stroke={SELECTED_HALO}
                  strokeWidth={8}
                  strokeLinejoin="round"
                  opacity={0.35}
                />
                <path
                  d={selectedFeature.pathD}
                  fill="none"
                  stroke={SELECTED_STROKE}
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
              </g>
            ) : null}
            {outlinePath ? (
              <path
                d={outlinePath}
                fill="none"
                stroke={OUTLINE_STROKE}
                strokeWidth={1.5}
                pointerEvents="none"
              />
            ) : null}
          </g>
        </svg>
      ) : null}

      {hovered && svgReady ? (
        <MapTooltipOverlay
          x={hovered.x}
          y={hovered.y}
          pilotId={hovered.pilotId}
          geoName={hovered.geoName}
          period={period}
          containerWidth={size.width}
          containerHeight={size.height}
        />
      ) : null}
    </div>
  );
}
