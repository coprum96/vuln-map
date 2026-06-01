import clsx from 'clsx';
import { ru } from '../../content/ru';
import type { RegionId } from '../../types';

interface MapQuickActionsProps {
  selectedId: RegionId | null;
  onOpenMsk: () => void;
  onOpenSpb: () => void;
  onShowCritical: () => void;
  embedded?: boolean;
}

const btnClass =
  'shrink-0 rounded border border-page-border bg-white px-2.5 py-1.5 text-[12px] font-medium text-cbr-navy hover:bg-[#EEF3F8] active:bg-[#E2EAF2] lg:px-2 lg:py-0.5 lg:text-[11px]';

export function MapQuickActions({
  selectedId,
  onOpenMsk,
  onOpenSpb,
  onShowCritical,
  embedded = false,
}: MapQuickActionsProps) {
  return (
    <div
      className={clsx(
        'shrink-0 bg-[#FAFBFC] px-3 py-1 sm:px-4 lg:py-0.5',
        !embedded && 'border-b border-[#E0E6ED]',
        embedded && 'lg:shrink-0 lg:border-0 lg:border-l lg:border-[#E0E6ED] lg:pl-3',
      )}
    >
      <div className="flex items-center gap-1.5 lg:gap-2">
        <span className="hidden shrink-0 text-[9px] font-medium uppercase tracking-wide text-page-muted lg:inline">
          {ru.mapScreen.quickActions.label}
        </span>
        <div
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-none lg:overflow-visible"
          role="toolbar"
          aria-label={ru.mapScreen.quickActions.label}
        >
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
      </div>
    </div>
  );
}
