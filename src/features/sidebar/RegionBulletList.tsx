import { PANEL_HELPER } from './panelStyles';

interface RegionBulletListProps {
  items: string[];
  emptyText: string;
}

export function RegionBulletList({ items, emptyText }: RegionBulletListProps) {
  if (items.length === 0) {
    return <p className={PANEL_HELPER}>{emptyText}</p>;
  }

  return (
    <ul className="space-y-1">
      {items.map((text, index) => (
        <li
          key={`item-${index}`}
          className="text-[13px] leading-snug text-page-text before:mr-2 before:font-semibold before:text-cbr-navy before:content-['—']"
        >
          {text}
        </li>
      ))}
    </ul>
  );
}
