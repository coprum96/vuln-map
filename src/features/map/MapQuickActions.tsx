import clsx from 'clsx';
import { ru } from '../../content/ru';
import type { RegionId } from '../../types';

interface MapQuickActionsProps {
  selectedId: RegionId | null;
  onOpenMsk: () => void;
  onOpenSpb: () => void;
  onShowCritical: () => void;
}

const btnClass =
  'rounded-md border border-page-border bg-white px-2.5 py-1 text-[12px] font-medium text-cbr-navy hover:bg-[#EEF3F8]';

export function MapQuickActions({
  selectedId,
  onOpenMsk,
  onOpenSpb,
  onShowCritical,
}: MapQuickActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-[#E0E6ED] bg-[#FAFBFC] px-3 py-1.5 sm:px-4">
      <span className="mr-1 text-[11px] font-medium uppercase tracking-wide text-page-muted">
        {ru.mapScreen.quickActions.label}
      </span>
      <button
        type="button"
        className={clsx(btnClass, selectedId === 'msk' && 'border-cbr-navy bg-[#EEF3F8]')}
        onClick={onOpenMsk}
      >
        {ru.mapScreen.quickActions.openMsk}
      </button>
      <button
        type="button"
        className={clsx(btnClass, selectedId === 'spb' && 'border-cbr-navy bg-[#EEF3F8]')}
        onClick={onOpenSpb}
      >
        {ru.mapScreen.quickActions.openSpb}
      </button>
      <button type="button" className={btnClass} onClick={onShowCritical}>
        {ru.mapScreen.quickActions.showCritical}
      </button>
    </div>
  );
}
