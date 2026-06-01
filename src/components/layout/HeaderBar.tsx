import { Shield } from 'lucide-react';
import { AppIcon } from '../icons/AppIcon';
import { ru } from '../../content/ru';

function HeaderMetaPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded border border-white/20 bg-white/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90">
      {children}
    </span>
  );
}

export function HeaderBar() {
  return (
    <header className="relative shrink-0 bg-cbr-navy">
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-white/10"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 bg-cbr-red"
        aria-hidden
      />

      <div className="flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 sm:flex-nowrap sm:px-6 sm:py-0">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-white/15 bg-white/5"
            aria-hidden
          >
            <AppIcon
              icon={Shield}
              size={18}
              strokeWidth={1.5}
              className="text-white/85"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h1
                className="text-[22px] font-bold leading-none tracking-wide text-white sm:text-[24px]"
                style={{ letterSpacing: '0.04em' }}
              >
                {ru.header.productName}
              </h1>
              <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-cbr-muted sm:inline">
                {ru.header.metaSuptech}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-normal leading-tight tracking-wide text-cbr-muted sm:text-[12px]">
              <span className="text-cbr-muted-dark/90 uppercase tracking-widest">
                —
              </span>{' '}
              {ru.header.descriptor}
            </p>
          </div>
        </div>

        <div
          className="flex w-full flex-wrap items-center gap-1.5 sm:w-auto sm:justify-end"
          aria-label={ru.header.metaObservation}
        >
          <HeaderMetaPill>{ru.header.metaPilot}</HeaderMetaPill>
          <span className="hidden text-white/25 sm:inline" aria-hidden>
            |
          </span>
          <HeaderMetaPill>{ru.header.metaObservation}</HeaderMetaPill>
        </div>
      </div>
    </header>
  );
}
