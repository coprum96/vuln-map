import { useCallback, useState } from 'react';
import type { ClusterFilter, DashboardFilters, RiskFilter, TrendFilter } from '../types';

const INITIAL: DashboardFilters = {
  risk: 'all',
  cluster: 'all',
  trend: 'all',
};

export function useFilters() {
  const [filters, setFilters] = useState<DashboardFilters>(INITIAL);

  const setRisk = useCallback((risk: RiskFilter) => {
    setFilters((f) => ({ ...f, risk }));
  }, []);

  const setCluster = useCallback((cluster: ClusterFilter) => {
    setFilters((f) => ({ ...f, cluster }));
  }, []);

  const setTrend = useCallback((trend: TrendFilter) => {
    setFilters((f) => ({ ...f, trend }));
  }, []);

  const reset = useCallback(() => {
    setFilters(INITIAL);
  }, []);

  return { filters, setRisk, setCluster, setTrend, reset };
}
