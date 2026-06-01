import type { Region } from '../types';

/** center в regionData: [lat, lng] для Leaflet. */
export function regionLatLng(region: Pick<Region, 'center'>): [number, number] {
  return [region.center[0], region.center[1]];
}
