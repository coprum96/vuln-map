import type { ClusterId } from '../types';

export interface ClusterColorSet {
  bg: string;
  light: string;
}

export const CLUSTER_COLORS: Record<ClusterId, ClusterColorSet> = {
  0: { bg: '#C8102E', light: '#FFEBEE' },
  1: { bg: '#1C3F6E', light: '#EEF3F8' },
  2: { bg: '#F5A623', light: '#FFF8E1' },
};
