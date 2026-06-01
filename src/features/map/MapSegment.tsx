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
        'rounded-[5px] px-3 py-1.5 text-[13px] font-medium leading-tight transition-colors',
        'whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cbr-navy',
        active
          ? 'bg-cbr-navy text-white shadow-sm'
          : 'text-[#374151] hover:bg-[#EEF3F8]',
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
