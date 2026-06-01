import { useMemo } from 'react';
import type { DashboardFilters, Region, RegionId } from '../types';
import { REGIONS } from '../data/regionData';
import { regionName } from '../data/ru';

export interface MapRegionView extends Region {
  name: string;
  visible: boolean;
  dimmed: boolean;
}

function matchesFilters(region: Region, filters: DashboardFilters): boolean {
  if (filters.risk !== 'all' && region.riskLevel !== filters.risk) return false;
  if (filters.trend !== 'all' && region.trend !== filters.trend) return false;
  if (filters.cluster !== 'all') {
    const clusterId = Number(filters.cluster) as 0 | 1 | 2;
    const shares = [region.clusters.c0, region.clusters.c1, region.clusters.c2];
    const max = Math.max(...shares);
    const dominant =
      shares[0] === max ? 0 : shares[1] === max ? 1 : 2;
    if (dominant !== clusterId) return false;
  }
  return true;
}

export function useMapData(filters: DashboardFilters) {
  return useMemo(() => {
    const regions: MapRegionView[] = REGIONS.map((region) => {
      const visible = matchesFilters(region, filters);
      return {
        ...region,
        name: regionName(region.id),
        visible,
        dimmed: !visible,
      };
    });

    const visibleIds = new Set(
      regions.filter((r) => r.visible).map((r) => r.id),
    );

    return { regions, visibleIds };
  }, [filters]);
}

export function isRegionHighlighted(
  id: RegionId,
  visibleIds: Set<RegionId>,
): boolean {
  return visibleIds.has(id);
}
