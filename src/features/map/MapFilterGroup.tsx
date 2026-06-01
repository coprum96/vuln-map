import clsx from 'clsx';
import type { ReactNode } from 'react';

interface MapFilterGroupProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function MapFilterGroup({ label, children, className }: MapFilterGroupProps) {
  return (
    <div className={clsx('flex min-w-0 flex-col gap-px', className)}>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-cbr-navy">
        {label}
      </span>
      <div
        className="flex max-w-full overflow-x-auto rounded border border-[#D0D8E2] bg-white p-px shadow-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label={label}
      >
        <div className="inline-flex min-w-0 gap-px">{children}</div>
      </div>
    </div>
  );
}
