import type { ClusterShare } from '../../types';
import { CLUSTER_COLORS } from '../../constants/clusterColors';
import { clusterLabel } from '../../data/ru';

interface ClusterDonutLegendProps {
  clusters: ClusterShare;
}

export function ClusterDonutLegend({ clusters }: ClusterDonutLegendProps) {
  const items = [
    { id: 0 as const, value: clusters.c0 },
    { id: 1 as const, value: clusters.c1 },
    { id: 2 as const, value: clusters.c2 },
  ];

  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between text-sm text-page-text"
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 shrink-0"
              style={{ backgroundColor: CLUSTER_COLORS[item.id].bg }}
            />
            {clusterLabel(item.id)}
          </span>
          <span className="font-semibold text-cbr-navy">{item.value}%</span>
        </li>
      ))}
    </ul>
  );
}
