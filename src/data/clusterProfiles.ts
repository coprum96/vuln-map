import type { ClusterProfile } from '../types';

export const CLUSTER_PROFILES: ClusterProfile[] = [
  {
    id: 0,
    sharePercent: 48.5,
    factors: ['Availability Bias', 'Warning Fatigue'],
    attackPatterns: [
      'Игнорирование предупреждений',
      'Привыкание к сигналам безопасности',
    ],
    metrics: [
      { key: 'warning', value: '31.1%' },
      { key: 'sms', value: '55.9%' },
      { key: 'age65', value: '52.3%' },
    ],
  },
  {
    id: 1,
    sharePercent: 24.8,
    factors: ['Authority Bias', 'Learned Helplessness'],
    attackPatterns: [
      'Звонок из банка',
      'SMS-фишинг с urgency',
    ],
    metrics: [
      { key: 'warning', value: '25.4%' },
      { key: 'sms', value: '59.7%' },
      { key: 'age65', value: '52.4%' },
    ],
  },
  {
    id: 2,
    sharePercent: 26.3,
    factors: ['Sunk Cost', 'Overconfidence'],
    attackPatterns: ['Инвестфрод', 'Суммы 100k+'],
    metrics: [
      { key: 'finance', value: '41.7%' },
      { key: 'sms', value: '52.1%' },
      { key: 'large', value: '100k+' },
    ],
  },
];

export function getClusterProfile(id: ClusterProfile['id']): ClusterProfile {
  const profile = CLUSTER_PROFILES.find((p) => p.id === id);
  if (!profile) throw new Error(`Unknown cluster ${id}`);
  return profile;
}

export const RESEARCH_STATS = {
  respondents: 15_000,
  features: 85,
  silhouette: 0.5234,
  anovaF: 8.45,
  anovaP: 0.0032,
  k: 3,
} as const;
