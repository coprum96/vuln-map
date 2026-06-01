import { ru } from '../../data/ru';

export function Header() {
  return (
    <>
      <header className="flex h-[72px] shrink-0 items-center justify-between bg-cbr-navy px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-cbr-red text-sm font-bold text-white">
            {ru.app.logo}
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <h1 className="text-[22px] font-bold tracking-wide text-white">
              {ru.app.title}
            </h1>
            <span className="hidden text-cbr-muted sm:inline" aria-hidden>
              |
            </span>
            <p className="text-[13px] text-cbr-muted">{ru.app.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
          <div className="hidden text-right md:block">
            <p className="text-sm text-cbr-muted">ФинТехЛаб СПбГУ</p>
            <p className="text-xs text-cbr-muted-dark">{ru.app.study}</p>
          </div>
          <button
            type="button"
            className="rounded-cbr border-0 bg-cbr-red px-4 py-2 text-sm font-semibold text-white hover:bg-cbr-red-dark"
          >
            {ru.app.exportReport}
          </button>
        </div>
      </header>
      <div className="h-1 shrink-0 bg-cbr-red" aria-hidden />
    </>
  );
}
