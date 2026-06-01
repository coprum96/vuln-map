import clsx from 'clsx';

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-cbr px-[14px] py-1 text-[13px] font-medium transition-colors',
        active
          ? 'border border-cbr-navy bg-cbr-navy text-white'
          : 'border border-[#D0D0D0] bg-white text-[#444444] hover:border-cbr-navy',
      )}
    >
      {label}
    </button>
  );
}
