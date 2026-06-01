import type { Region } from '../../types';

export type MapPeriod = '2025' | '2024';

export function regionScoreForPeriod(region: Region, period: MapPeriod): number {
  return period === '2024' ? region.score2024 : region.score;
}
