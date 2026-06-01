import type { ReactNode } from 'react';

interface MapFilterGroupProps {
  label: string;
  children: ReactNode;
}

export function MapFilterGroup({ label, children }: MapFilterGroupProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-cbr-navy">
        {label}
      </span>
      <div
        className="flex max-w-full overflow-x-auto rounded-md border border-[#D0D8E2] bg-white p-0.5 shadow-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label={label}
      >
        <div className="inline-flex min-w-0 flex-wrap gap-0.5 sm:flex-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}
