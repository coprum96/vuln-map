import { PANEL_HELPER } from './panelStyles';
import { ru } from '../../content/ru';

interface RegionInsightListProps {
  items: string[];
}

export function RegionInsightList({ items }: RegionInsightListProps) {
  if (items.length === 0) {
    return <p className={PANEL_HELPER}>{ru.panel.empty.noInsights}</p>;
  }

  return (
    <ul className="space-y-1">
      {items.map((text, index) => (
        <li
          key={`insight-${index}`}
          className="flex gap-2 text-[13px] leading-snug text-page-text before:shrink-0 before:font-bold before:text-cbr-navy before:content-['•']"
        >
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}
