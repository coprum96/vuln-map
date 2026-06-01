import { useCallback, useState } from 'react';
import type { RegionId } from '../types';
import { REGIONS_BY_ID } from '../data/regionData';
import type { Region } from '../types';

const EXPORT_FALLBACK: RegionId = 'krd';

export function useSelectedRegion() {
  const [selectedId, setSelectedId] = useState<RegionId | null>(null);

  const selectRegion = useCallback((id: RegionId | null) => {
    setSelectedId(id);
  }, []);

  const selected: Region =
    selectedId !== null ? REGIONS_BY_ID[selectedId] : REGIONS_BY_ID[EXPORT_FALLBACK];

  return { selectedId, selected, selectRegion };
}
