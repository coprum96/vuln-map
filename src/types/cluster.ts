import type { ClusterId } from './region';

export interface ClusterMetric {
  key: string;
  value: string;
}

export interface ClusterProfile {
  id: ClusterId;
  sharePercent: number;
  factors: string[];
  attackPatterns: string[];
  metrics: ClusterMetric[];
}
