import {
  Download,
  Landmark,
  ListOrdered,
  Wallet,
} from 'lucide-react';
import { AppIcon } from '../../components/icons/AppIcon';
import { ru } from '../../content/ru';
import type { Region } from '../../types';
import { buildRegionTxt } from '../export/buildRegionExport';
import { downloadBlob } from '../export/downloadBlob';
import { PANEL_HELPER } from './panelStyles';
import type { LucideIcon } from 'lucide-react';

interface RegionPanelLinksProps {
  region: Region;
}

const DETAILS_ROOT_ID = 'panel-details-root';

function scrollToSection(sectionId: string) {
  const details = document.getElementById(DETAILS_ROOT_ID);
  if (details instanceof HTMLDetailsElement && !details.open) {
    details.open = true;
  }

  window.requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

function LinkButton({
  icon,
  label,
  onClick,
  primary,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        primary
          ? 'inline-flex items-center gap-1.5 rounded-md border border-cbr-navy bg-cbr-navy px-2.5 py-1.5 text-[12px] font-medium text-white hover:opacity-90'
          : 'inline-flex items-center gap-1.5 rounded-md border border-page-border bg-white px-2.5 py-1.5 text-[12px] font-medium text-cbr-navy hover:bg-[#EEF3F8]'
      }
    >
      <AppIcon icon={icon} size={14} className={primary ? 'text-white' : undefined} />
      {label}
    </button>
  );
}

export function RegionPanelLinks({ region }: RegionPanelLinksProps) {
  const handleExport = () => {
    const text = buildRegionTxt(region);
    downloadBlob(
      `vulnmap-${region.id}-memo.txt`,
      text,
      'text/plain;charset=utf-8',
    );
  };

  return (
    <div className="space-y-2">
      <p className={PANEL_HELPER}>{ru.panel.links.helper}</p>
      <div className="flex flex-wrap gap-1.5">
        <LinkButton
          icon={Wallet}
          label={ru.panel.links.finance}
          onClick={() => scrollToSection('panel-section-finance')}
        />
        <LinkButton
          icon={ListOrdered}
          label={ru.panel.links.scenarios}
          onClick={() => scrollToSection('panel-section-scenarios')}
        />
        <LinkButton
          icon={Landmark}
          label={ru.panel.links.recommendations}
          onClick={() => scrollToSection('panel-section-recommendations')}
        />
        <LinkButton
          icon={Download}
          label={ru.panel.links.export}
          onClick={handleExport}
          primary
        />
      </div>
    </div>
  );
}
