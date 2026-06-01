import { ru } from '../../content/ru';
import { SVG_NO_DATA_FILL, SVG_RISK_FILL } from './svgRiskColors';

const LEGEND_ITEMS = [
  { key: 'low' as const, label: ru.mapScreen.legend.low },
  { key: 'medium' as const, label: ru.mapScreen.legend.medium },
  { key: 'high' as const, label: ru.mapScreen.legend.high },
  { key: 'critical' as const, label: ru.mapScreen.legend.critical },
];

export function MapLegend() {
  return (
    <div
      className="pointer-events-none absolute bottom-1 left-1 z-10 max-w-[min(176px,calc(100%-0.5rem))] rounded border border-page-border/80 bg-white/94 px-1.5 py-1 text-left shadow-sm backdrop-blur-sm sm:max-w-[188px] lg:bottom-auto lg:left-auto lg:right-1.5 lg:top-1.5 lg:max-w-none lg:px-2 lg:py-1"
      aria-label={ru.mapScreen.legend.title}
    >
      <div className="lg:flex lg:items-center lg:gap-2">
        <p className="shrink-0 text-[9px] font-semibold uppercase tracking-wide text-cbr-navy">
          {ru.mapScreen.legend.title}
        </p>
        <ul className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 lg:mt-0 lg:flex-nowrap lg:gap-x-1.5">
          {LEGEND_ITEMS.map(({ key, label }) => (
            <li
              key={key}
              className="flex items-center gap-0.5 text-[9px] text-page-text lg:text-[10px]"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-sm border border-[#B8C4D0]"
                style={{ backgroundColor: SVG_RISK_FILL[key] }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-1 hidden items-center gap-1 border-t border-dashed border-[#C5CDD8] pt-1 lg:mt-0 lg:border-0 lg:pt-0 xl:flex"
        role="group"
        aria-label={ru.mapScreen.legend.outsideSection}
      >
        <span
          className="h-2 w-2 shrink-0 rounded-sm border border-dashed border-[#9CA8B8]"
          style={{
            backgroundColor: SVG_NO_DATA_FILL,
            backgroundImage:
              'repeating-linear-gradient(135deg, #D5DCE5 0, #D5DCE5 1px, transparent 1px, transparent 3px)',
          }}
        />
        <p className="text-[9px] font-medium text-page-muted">
          {ru.mapScreen.legend.noData}
        </p>
      </div>
    </div>
  );
}
