import type { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  filterBar: ReactNode;
  map: ReactNode;
  drilldown: ReactNode;
  metrics?: ReactNode;
  ranking?: ReactNode;
}

export function Layout({
  filterBar,
  map,
  drilldown,
  metrics,
  ranking,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-page-bg">
      <Header />
      {metrics ? (
        <div className="border-b border-page-border bg-page-bg px-6 py-3">
          {metrics}
        </div>
      ) : null}
      <div className="border-b border-page-border bg-white">{filterBar}</div>
      <div className="flex flex-1 gap-0 overflow-hidden p-4">
        <div className="flex w-[68%] flex-col gap-4 pr-2">
          {map}
          {ranking ? <div className="shrink-0">{ranking}</div> : null}
        </div>
        <div className="w-[32%] overflow-y-auto pl-2">{drilldown}</div>
      </div>
    </div>
  );
}
