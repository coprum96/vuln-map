import { geoMercator } from 'd3-geo';
import type { Feature, Polygon } from 'geojson';

/** Прямоугольник для расчёта масштаба (без артефакта bbox −180…180 в GeoJSON). */
const RUSSIA_FIT_POLYGON: Feature<Polygon> = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [19, 41],
        [190, 41],
        [190, 82],
        [19, 82],
        [19, 41],
      ],
    ],
  },
};

export function createRussiaProjection(
  width: number,
  height: number,
  padding: number,
): ReturnType<typeof geoMercator> {
  const innerW = Math.max(width - padding * 2, 100);
  const innerH = Math.max(height - padding * 2, 100);

  const projWidth = geoMercator().center([98, 58]);
  projWidth.fitWidth(innerW, RUSSIA_FIT_POLYGON);

  const projHeight = geoMercator().center([98, 58]);
  projHeight.fitHeight(innerH, RUSSIA_FIT_POLYGON);

  const scaleW = projWidth.scale() ?? 500;
  const scaleH = projHeight.scale() ?? 500;

  let scale = Math.min(scaleW, scaleH) * 0.95;

  // На широких экранах заполняем по ширине (Россия вытянута по долготе).
  if (innerW / innerH > 1.2) {
    scale = scaleW * 0.92;
  }

  return geoMercator()
    .center([98, 58])
    .scale(scale)
    .translate([width / 2, height / 2]);
}
