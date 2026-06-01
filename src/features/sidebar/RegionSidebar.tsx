import clsx from 'clsx';
import { ChevronDown, X } from 'lucide-react';
import { useMemo } from 'react';
import type { Region } from '../../types';
import { getRecommendations } from '../../data/recommendations';
import { AppIcon } from '../../components/icons/AppIcon';
import { regionName, ru } from '../../content/ru';
import { RiskBadge } from '../../components/ui/RiskBadge';
import { TrendArrow } from '../../components/ui/TrendArrow';
import { ClusterDonut } from '../drilldown/ClusterDonut';
import { FinanceBlock } from '../drilldown/FinanceBlock';
import { ClusterDonutLegend } from './ClusterDonutLegend';
import { SidebarScenarioList } from './SidebarScenarioList';
import {
  buildKeyDrivers,
  buildRiskSummary,
  buildTrendView,
} from './buildRegionAnalytics';
import {
  buildImpactScenarios,
  buildResponsePriority,
  buildVulnerabilitySigns,
} from './buildRegionSupervisory';
import { PANEL_HELPER } from './panelStyles';
import { RegionActionCard } from './RegionActionCard';
import { RegionBulletList } from './RegionBulletList';
import { RegionDriverRows } from './RegionDriverRows';
import { RegionPanelLinks } from './RegionPanelLinks';
import { RegionPanelSection } from './RegionPanelSection';
import { RegionTrendSection } from './RegionTrendSection';

interface RegionSidebarProps {
  region: Region | null;
  onClose: () => void;
}

const HORIZON_TAGS = ['H1', 'H2', 'H3'] as const;

export function RegionSidebar({ region, onClose }: RegionSidebarProps) {
  const open = region !== null;

  const analytics = useMemo(() => {
    if (!region) return null;
    const recommendations = getRecommendations(region.id, region.dominantCluster);
    const primaryAction =
      recommendations.find((r) => r.priority === 'high') ?? recommendations[0];

    return {
      summary: buildRiskSummary(region),
      responsePriority: buildResponsePriority(region),
      vulnerabilitySigns: buildVulnerabilitySigns(region),
      impactScenarios: buildImpactScenarios(region),
      drivers: buildKeyDrivers(region),
      trend: buildTrendView(region),
      primaryAction,
      recommendations,
    };
  }, [region]);

  const deltaStr = region
    ? region.deltaPercent >= 0
      ? `+${region.deltaPercent.toFixed(1)}%`
      : `${region.deltaPercent.toFixed(1)}%`
    : '';

  return (
    <aside
      className={clsx(
        'fixed top-14 z-40 flex flex-col border-l-4 border-l-cbr-red bg-white shadow-[-10px_0_32px_rgba(28,63,110,0.18)] transition-transform duration-250 ease-out',
        'right-0 h-[calc(100vh-56px)] w-full max-w-[420px]',
        'max-md:inset-x-0 max-md:max-w-none',
        open ? 'translate-x-0' : 'translate-x-full max-md:translate-x-full',
      )}
      aria-hidden={!open}
      role="dialog"
      aria-label={ru.mapScreen.sidebar.title}
    >
      {region && analytics ? (
        <>
          <div className="relative shrink-0 border-b border-page-border bg-[#F7F9FC] px-4 py-2.5 pr-11 sm:px-5 sm:py-3 sm:pr-12">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-cbr-navy">
              {ru.mapScreen.sidebar.title}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-page-muted sm:text-xs">
              {ru.mapScreen.sidebar.subtitle}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md border border-page-border bg-white text-page-muted hover:bg-[#EEF3F8] sm:right-3 sm:top-3"
              aria-label={ru.mapScreen.sidebar.close}
            >
              <AppIcon icon={X} size={18} className="text-page-muted" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5 sm:px-5 sm:pb-6">
            <header className="border-b border-[#E8ECF0] py-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="max-w-[calc(100%-4rem)] break-words text-xl font-bold leading-tight text-cbr-navy sm:text-[22px]">
                  {regionName(region.id)}
                </h2>
                <RiskBadge level={region.riskLevel} />
              </div>
              <div className="mt-2.5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] text-page-muted">{ru.drilldown.index}</p>
                  <p className="text-[38px] font-bold leading-none text-cbr-red sm:text-[42px]">
                    {region.score}
                    <span className="text-lg font-semibold text-page-muted sm:text-xl">
                      /100
                    </span>
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <TrendArrow direction={region.trend} value={deltaStr} />
                  <p className="text-[11px] text-page-muted">{ru.drilldown.vs2024}</p>
                </div>
              </div>
            </header>

            <RegionPanelSection title={ru.panel.sections.summary}>
              <p className="text-[13px] leading-snug text-page-text">
                {analytics.summary}
              </p>
            </RegionPanelSection>

            <RegionPanelSection title={ru.panel.sections.responsePriority}>
              <p className="text-[13px] leading-snug text-page-text">
                {analytics.responsePriority}
              </p>
            </RegionPanelSection>

            <RegionPanelSection title={ru.panel.sections.vulnerabilitySigns}>
              <RegionBulletList
                items={analytics.vulnerabilitySigns}
                emptyText={ru.panel.empty.noSigns}
              />
            </RegionPanelSection>

            <RegionPanelSection title={ru.panel.sections.impactScenarios}>
              <RegionBulletList
                items={analytics.impactScenarios}
                emptyText={ru.panel.empty.noScenarios}
              />
            </RegionPanelSection>

            <RegionPanelSection title={ru.panel.sections.factors}>
              <RegionDriverRows drivers={analytics.drivers} />
            </RegionPanelSection>

            <RegionPanelSection title={ru.panel.sections.trend}>
              <RegionTrendSection region={region} trend={analytics.trend} />
            </RegionPanelSection>

            <RegionPanelSection title={ru.panel.sections.action}>
              {analytics.primaryAction ? (
                <RegionActionCard recommendation={analytics.primaryAction} />
              ) : (
                <p className={PANEL_HELPER}>{ru.panel.empty.noAction}</p>
              )}
            </RegionPanelSection>

            <RegionPanelSection title={ru.panel.sections.links}>
              <RegionPanelLinks region={region} />
            </RegionPanelSection>

            <details
              id="panel-details-root"
              className="group border-t border-[#E8ECF0] py-3"
            >
              <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-cbr-navy">
                  {ru.panel.sections.details}
                  <AppIcon
                    icon={ChevronDown}
                    size={16}
                    className="text-page-muted transition group-open:rotate-180"
                  />
                </span>
              </summary>
              <div className="mt-2">
                <RegionPanelSection title={ru.drilldown.clusters}>
                  <ClusterDonut clusters={region.clusters} />
                  <ClusterDonutLegend clusters={region.clusters} />
                </RegionPanelSection>

                <RegionPanelSection
                  title={ru.drilldown.scenarios}
                  id="panel-section-scenarios"
                >
                  <SidebarScenarioList scenarioIds={region.scenarioIds} />
                </RegionPanelSection>

                <RegionPanelSection
                  title={ru.drilldown.finance}
                  id="panel-section-finance"
                >
                  <FinanceBlock finance={region.finance} />
                </RegionPanelSection>

                <RegionPanelSection
                  title={ru.drilldown.nudges}
                  id="panel-section-recommendations"
                >
                  {analytics.recommendations.length > 0 ? (
                    <ul className="space-y-2">
                      {analytics.recommendations.map((rec, index) => (
                        <li
                          key={rec.id}
                          className={clsx(
                            'rounded-md border border-page-border p-2.5',
                            rec.priority === 'high'
                              ? 'border-l-[3px] border-l-cbr-red'
                              : 'border-l-[3px] border-l-cbr-navy',
                          )}
                        >
                          <span className="rounded bg-cbr-navy px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {HORIZON_TAGS[index] ?? 'H3'}
                          </span>
                          <p className="mt-1.5 text-sm font-semibold text-page-text">
                            {rec.title}
                          </p>
                          <p className="mt-0.5 text-xs text-page-muted">
                            {rec.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={PANEL_HELPER}>{ru.panel.empty.noAction}</p>
                  )}
                </RegionPanelSection>
              </div>
            </details>
          </div>
        </>
      ) : null}
    </aside>
  );
}
