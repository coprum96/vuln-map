import type { RegionId } from '../../types';

/** Радиус невидимой зоны клика (px) — компактные и городские субъекты увеличены */
const PILOT_HIT_RADIUS: Partial<Record<RegionId, number>> = {
  msk: 30,
  spb: 28,
  kal: 26,
  vgg: 22,
  pri: 24,
  irk: 20,
};

const DEFAULT_HIT_RADIUS = 16;

export function getPilotHitRadius(
  pilotId: RegionId,
  containerWidth: number,
): number {
  const base = PILOT_HIT_RADIUS[pilotId] ?? DEFAULT_HIT_RADIUS;
  if (containerWidth < 480) return base * 0.9;
  if (containerWidth < 720) return base * 0.95;
  return base;
}
