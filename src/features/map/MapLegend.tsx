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
      className="pointer-events-none absolute bottom-2 left-2 z-10 max-w-[min(220px,calc(100%-1rem))] rounded-md border border-page-border bg-white/97 px-2.5 py-2 text-left shadow-md backdrop-blur-sm sm:bottom-3 sm:left-3 sm:px-3 sm:py-2.5"
      aria-label={ru.mapScreen.legend.title}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide text-cbr-navy">
        {ru.mapScreen.legend.title}
      </p>

      <p className="mt-2 text-[10px] font-medium text-page-muted">
        {ru.mapScreen.legend.pilotSection}
      </p>
      <ul className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1">
        {LEGEND_ITEMS.map(({ key, label }) => (
          <li
            key={key}
            className="flex items-center gap-1.5 text-[11px] text-page-text"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm border border-[#B8C4D0]"
              style={{ backgroundColor: SVG_RISK_FILL[key] }}
            />
            {label}
          </li>
        ))}
      </ul>

      <div
        className="mt-3 border-t border-dashed border-[#C5CDD8] pt-2.5"
        role="group"
        aria-label={ru.mapScreen.legend.outsideSection}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">
          {ru.mapScreen.legend.outsideSection}
        </p>
        <div className="mt-1.5 flex items-start gap-2">
          <span
            className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-sm border border-dashed border-[#9CA8B8] bg-[length:4px_4px]"
            style={{
              backgroundColor: SVG_NO_DATA_FILL,
              backgroundImage:
                'repeating-linear-gradient(135deg, #D5DCE5 0, #D5DCE5 1px, transparent 1px, transparent 3px)',
            }}
          />
          <div>
            <p className="text-[11px] font-medium text-page-text">
              {ru.mapScreen.legend.noData}
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-page-muted">
              {ru.mapScreen.legend.outsideNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
