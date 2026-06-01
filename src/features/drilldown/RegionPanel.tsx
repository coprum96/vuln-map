import type { Region } from '../../types';
import { getRecommendations } from '../../data/recommendations';
import { regionName, ru } from '../../data/ru';
import { Card } from '../../components/ui/Card';
import { RiskBadge } from '../../components/ui/RiskBadge';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { TrendArrow } from '../../components/ui/TrendArrow';
import { ClusterDonut } from './ClusterDonut';
import { ScenarioList } from './ScenarioList';
import { FinanceBlock } from './FinanceBlock';
import { NudgeCards } from './NudgeCards';

interface RegionPanelProps {
  region: Region;
}

export function RegionPanel({ region }: RegionPanelProps) {
  const deltaStr =
    region.deltaPercent >= 0
      ? `+${region.deltaPercent.toFixed(1)}%`
      : `${region.deltaPercent.toFixed(1)}%`;

  const recommendations = getRecommendations(region.id, region.dominantCluster);

  return (
    <div className="space-y-0">
      <Card className="rounded-cbr-md">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-cbr-navy">
              {regionName(region.id)}
            </h2>
            <p className="text-xs text-page-muted">{ru.drilldown.index}</p>
          </div>
          <RiskBadge level={region.riskLevel} />
        </div>
        <div className="mt-3 flex items-end justify-between border-t border-[#F0F0F0] pt-3">
          <span className="text-[48px] font-bold leading-none text-cbr-red">
            {region.score}
          </span>
          <div className="text-right">
            <TrendArrow direction={region.trend} value={deltaStr} />
            <p className="text-xs text-page-muted">{ru.drilldown.vs2024}</p>
          </div>
        </div>
      </Card>

      <Card className="mt-3 rounded-cbr-md border-t border-[#F0F0F0]">
        <SectionTitle>{ru.drilldown.clusters}</SectionTitle>
        <ClusterDonut clusters={region.clusters} />
      </Card>

      <Card className="mt-3 rounded-cbr-md">
        <SectionTitle>{ru.drilldown.scenarios}</SectionTitle>
        <ScenarioList scenarioIds={region.scenarioIds} />
      </Card>

      <Card className="mt-3 rounded-cbr-md">
        <SectionTitle>{ru.drilldown.finance}</SectionTitle>
        <FinanceBlock finance={region.finance} />
      </Card>

      <div className="mt-3 border-t border-[#F0F0F0] pt-3">
        <SectionTitle>{ru.drilldown.nudges}</SectionTitle>
        <div className="mt-2">
          <NudgeCards items={recommendations} />
        </div>
      </div>
    </div>
  );
}
