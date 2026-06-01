import clsx from 'clsx';

interface MapSegmentProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function MapSegment({ label, active, onClick }: MapSegmentProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'min-h-[40px] rounded-[4px] px-2.5 py-1.5 text-[12px] font-medium leading-tight transition-colors sm:min-h-0 lg:px-2 lg:py-1 lg:text-[11px]',
        'whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cbr-navy',
        active
          ? 'bg-cbr-navy text-white shadow-sm'
          : 'text-[#374151] hover:bg-[#EEF3F8] active:bg-[#E2EAF2]',
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
