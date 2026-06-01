import clsx from 'clsx';
import { Shield } from 'lucide-react';
import { AppIcon } from '../../components/icons/AppIcon';
import { ru } from '../../content/ru';
import type { Recommendation } from '../../types';

interface RegionActionCardProps {
  recommendation: Recommendation;
}

export function RegionActionCard({ recommendation }: RegionActionCardProps) {
  return (
    <div
      className={clsx(
        'rounded-md border p-2.5',
        recommendation.priority === 'high'
          ? 'border-l-[3px] border-l-cbr-red border-page-border bg-red-50/30'
          : 'border-l-[3px] border-l-cbr-navy border-page-border bg-[#F7F9FC]',
      )}
    >
      <div className="flex items-start gap-2">
        <AppIcon
          icon={Shield}
          size={18}
          className="mt-0.5 shrink-0 text-cbr-navy"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-page-muted">
              {ru.panel.action.nextStep}
            </p>
            <span
              className={clsx(
                'shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase',
                recommendation.priority === 'high'
                  ? 'bg-cbr-red/10 text-cbr-red'
                  : 'bg-cbr-navy/10 text-cbr-navy',
              )}
            >
              {recommendation.priority === 'high'
                ? ru.panel.actionPriority.high
                : ru.panel.actionPriority.medium}
            </span>
          </div>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-page-text">
            {recommendation.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-page-muted">
            {recommendation.body}
          </p>
        </div>
      </div>
    </div>
  );
}
