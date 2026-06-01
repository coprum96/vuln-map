import type { ScenarioId } from '../types';

export interface ScenarioMeta {
  id: ScenarioId;
}

export const SCENARIO_META: Record<ScenarioId, ScenarioMeta> = {
  bank_call: { id: 'bank_call' },
  sms_phishing: { id: 'sms_phishing' },
  invest_fraud: { id: 'invest_fraud' },
  pseudo_gos: { id: 'pseudo_gos' },
  resort_fraud: { id: 'resort_fraud' },
  online_fraud: { id: 'online_fraud' },
};

export const TREND_COLORS = {
  improving: '#16a34a',
  worsening: '#dc2626',
  stable: '#94a3b8',
} as const;

export const MAP_SELECTED_STROKE = '#0f4c81';
