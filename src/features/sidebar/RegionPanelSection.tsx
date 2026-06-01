import type { ReactNode } from 'react';
import {
  PANEL_SECTION,
  PANEL_SECTION_BODY,
  PANEL_SECTION_HEADING,
} from './panelStyles';

interface RegionPanelSectionProps {
  title: string;
  children: ReactNode;
  id?: string;
}

export function RegionPanelSection({
  title,
  children,
  id,
}: RegionPanelSectionProps) {
  return (
    <section id={id} className={PANEL_SECTION}>
      <h3 className={PANEL_SECTION_HEADING}>{title}</h3>
      <div className={PANEL_SECTION_BODY}>{children}</div>
    </section>
  );
}
