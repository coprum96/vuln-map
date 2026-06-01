import type { RiskLevel } from '../../types';

/** Спокойная палитра заливки пилотных регионов на SVG-карте */
export const SVG_RISK_FILL: Record<RiskLevel, string> = {
  low: '#7BA88C',
  medium: '#C9B06A',
  high: '#D4926E',
  critical: '#B85C6B',
};

const HOVER_LIGHTEN: Record<RiskLevel, string> = {
  low: '#95BBA3',
  medium: '#D9C88A',
  high: '#E0AD8F',
  critical: '#CE7A88',
};

export const SVG_NO_DATA_FILL = '#EEF1F4';
export const SVG_NO_DATA_HOVER = '#E4E9EF';

/** Обводка пилотных субъектов для контраста на фоне */
export const SVG_PILOT_STROKE = '#8FA3B8';
export const SVG_PILOT_STROKE_WIDTH = 1.25;

export function svgRiskFill(level: RiskLevel, hover: boolean): string {
  return hover ? HOVER_LIGHTEN[level] : SVG_RISK_FILL[level];
}
