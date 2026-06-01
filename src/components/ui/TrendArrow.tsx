import clsx from 'clsx';
import type { TrendDirection } from '../../types';

interface TrendArrowProps {
  direction: TrendDirection;
  value: string;
}

const ARROWS: Record<TrendDirection, string> = {
  improving: '↓',
  worsening: '↑',
  stable: '→',
};

const DIRECTION_CLASSES: Record<TrendDirection, string> = {
  improving: 'text-[#2E7D32]',
  worsening: 'text-cbr-red',
  stable: 'text-page-muted',
};

export function TrendArrow({ direction, value }: TrendArrowProps) {
  return (
    <span className={clsx('text-sm font-semibold', DIRECTION_CLASSES[direction])}>
      {ARROWS[direction]} {value}
    </span>
  );
}
