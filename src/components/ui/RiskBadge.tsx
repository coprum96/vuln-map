import clsx from 'clsx';
import type { RiskLevel } from '../../types';
import { riskLabel } from '../../data/ru';

const LEVEL_CLASSES: Record<RiskLevel, string> = {
  low: 'bg-[#2E7D32] text-white',
  medium: 'bg-[#F5A623] text-white',
  high: 'bg-[#E65100] text-white',
  critical: 'bg-cbr-red text-white',
};

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-cbr px-2.5 py-0.5 text-xs font-semibold',
        LEVEL_CLASSES[level],
      )}
    >
      {riskLabel(level)}
    </span>
  );
}
