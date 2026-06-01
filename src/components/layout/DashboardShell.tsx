import type { ReactNode } from 'react';

interface DashboardShellProps {
  metrics: ReactNode;
  filterBar: ReactNode;
  map: ReactNode;
  drilldown: ReactNode;
  ranking?: ReactNode;
}

/** Dashboard body without header (Phase 2 shell). */
export function DashboardShell({
  metrics,
  filterBar,
  map,
  drilldown,
  ranking,
}: DashboardShellProps) {
  return (
    <>
      <div className="border-b border-page-border bg-page-bg px-6 py-3">
        {metrics}
      </div>
      <div className="border-b border-page-border bg-white">{filterBar}</div>
      <div className="flex flex-1 gap-0 overflow-hidden p-4">
        <div className="flex w-[68%] flex-col gap-4 pr-2">
          {map}
          {ranking ? <div className="shrink-0">{ranking}</div> : null}
        </div>
        <div className="w-[32%] overflow-y-auto pl-2">{drilldown}</div>
      </div>
    </>
  );
}
