import { ru } from '../../content/ru';

/** Краткий контекст экрана — на desktop скрыт (есть header + легенда). */
export function MapIntro() {
  return (
    <section className="shrink-0 border-b border-page-border bg-[#FAFBFC] px-3 py-0.5 sm:px-4 lg:hidden">
      <h2 className="text-[12px] font-bold leading-tight text-cbr-navy sm:text-[13px]">
        {ru.mapScreen.title}
      </h2>
      <p className="mt-px text-[10px] leading-snug text-page-muted sm:text-[11px]">
        {ru.mapScreen.subtitle}
      </p>
    </section>
  );
}
