import type { RiskLevel } from '../types';

export interface RiskColorSet {
  bg: string;
  light: string;
  text: string;
  fill: string;
}

export const RISK_COLORS: Record<RiskLevel, RiskColorSet> = {
  low: {
    bg: '#2E7D32',
    light: '#E8F5E9',
    text: '#1B5E20',
    fill: '#2E7D32',
  },
  medium: {
    bg: '#F5A623',
    light: '#FFF8E1',
    text: '#E65100',
    fill: '#F5A623',
  },
  high: {
    bg: '#E65100',
    light: '#FFF3E0',
    text: '#BF360C',
    fill: '#E65100',
  },
  critical: {
    bg: '#C8102E',
    light: '#FFEBEE',
    text: '#8B0000',
    fill: '#C8102E',
  },
};

export const RISK_EMOJI: Record<RiskLevel, string> = {
  low: '🟢',
  medium: '🟡',
  high: '🟠',
  critical: '🔴',
};

export const RISK_THRESHOLDS = {
  lowMax: 40,
  mediumMax: 60,
  highMax: 75,
} as const;

export function scoreToRiskLevel(score: number): RiskLevel {
  if (score >= 76) return 'critical';
  if (score > 60) return 'high';
  if (score > 40) return 'medium';
  return 'low';
}
