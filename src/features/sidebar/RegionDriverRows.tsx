import clsx from 'clsx';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { AppIcon } from '../../components/icons/AppIcon';
import { ru } from '../../content/ru';
import { PANEL_HELPER } from './panelStyles';
import type { RegionDriver } from './buildRegionAnalytics';
import type { LucideIcon } from 'lucide-react';

interface RegionDriverRowsProps {
  drivers: RegionDriver[];
}

const CONTRIBUTION_ICON: Record<
  RegionDriver['contribution'],
  { icon: LucideIcon; className: string }
> = {
  increases: { icon: TrendingUp, className: 'text-cbr-red' },
  decreases: { icon: TrendingDown, className: 'text-emerald-700' },
  neutral: { icon: Minus, className: 'text-page-muted' },
};

const CONTRIBUTION_BG = {
  increases: 'bg-red-50 border-red-100',
  decreases: 'bg-emerald-50 border-emerald-100',
  neutral: 'bg-[#F3F4F6] border-[#E5E7EB]',
} as const;

export function RegionDriverRows({ drivers }: RegionDriverRowsProps) {
  if (drivers.length === 0) {
    return <p className={PANEL_HELPER}>{ru.panel.empty.noDrivers}</p>;
  }

  return (
    <ul className="space-y-1">
      {drivers.map((driver) => {
        const cfg = CONTRIBUTION_ICON[driver.contribution];
        return (
          <li
            key={driver.id}
            className="flex items-center gap-2 rounded-md border border-page-border bg-[#FAFBFC] px-2 py-1.5"
          >
            <span
              className={clsx(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded border',
                CONTRIBUTION_BG[driver.contribution],
              )}
              title={ru.panel.contribution[driver.contribution]}
            >
              <AppIcon icon={cfg.icon} size={14} className={cfg.className} />
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-[12px] font-medium text-page-text"
                title={driver.label}
              >
                {driver.label}
              </p>
              {driver.detail ? (
                <p
                  className="truncate text-[11px] text-page-muted"
                  title={driver.detail}
                >
                  {driver.detail}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
