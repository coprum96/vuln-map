import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ClusterShare } from '../../types';
import { CLUSTER_COLORS } from '../../constants/clusterColors';
import { clusterLabel } from '../../data/ru';

interface ClusterDonutProps {
  clusters: ClusterShare;
}

export function ClusterDonut({ clusters }: ClusterDonutProps) {
  const data = [
    { name: clusterLabel(0), value: clusters.c0, id: 0 as const },
    { name: clusterLabel(1), value: clusters.c1, id: 1 as const },
    { name: clusterLabel(2), value: clusters.c2, id: 2 as const },
  ];

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={2}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.id} fill={CLUSTER_COLORS[entry.id].bg} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
