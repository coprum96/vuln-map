import { SovaMark } from '../icons/SovaMark';
import { ru } from '../../content/ru';

function HeaderMetaPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded border border-white/20 bg-white/8 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-white/90">
      {children}
    </span>
  );
}

export function HeaderBar() {
  return (
    <header className="relative h-11 shrink-0 bg-cbr-navy">
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-cbr-red" aria-hidden />

      <div className="flex h-11 items-center justify-between gap-2 px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/15 bg-white/5 text-white/90 sm:h-8 sm:w-8"
            aria-hidden
          >
            <SovaMark size={20} title={ru.header.markAria} className="sm:hidden" />
            <SovaMark size={22} title={ru.header.markAria} className="hidden sm:block" />
          </div>

          <div className="min-w-0 leading-none">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <h1 className="text-base font-bold tracking-wide text-white sm:text-lg">
                {ru.header.productName}
              </h1>
              <span className="hidden text-[9px] font-semibold uppercase tracking-widest text-cbr-muted xl:inline">
                {ru.header.metaSuptech}
              </span>
            </div>
            <p className="mt-px hidden truncate text-[10px] text-cbr-muted md:block">
              {ru.header.descriptor}
            </p>
          </div>
        </div>

        <div
          className="hidden shrink-0 items-center gap-1 lg:flex"
          aria-label={ru.header.metaObservation}
        >
          <HeaderMetaPill>{ru.header.metaPilot}</HeaderMetaPill>
          <span className="text-white/20" aria-hidden>
            |
          </span>
          <HeaderMetaPill>{ru.header.metaObservation}</HeaderMetaPill>
        </div>
      </div>
    </header>
  );
}
