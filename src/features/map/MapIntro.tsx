import { ru } from '../../content/ru';

export function MapIntro() {
  return (
    <section className="shrink-0 border-b border-page-border bg-[#FAFBFC] px-5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-cbr-navy">{ru.mapScreen.title}</h2>
          <p className="mt-0.5 text-xs leading-snug text-page-muted">
            {ru.mapScreen.subtitle}
          </p>
        </div>
        <p className="hidden shrink-0 text-[11px] text-page-muted md:block">
          {ru.mapScreen.mapHint}
        </p>
      </div>
    </section>
  );
}
