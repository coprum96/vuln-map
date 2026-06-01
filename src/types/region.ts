export type RegionId =
  | 'spb'
  | 'msk'
  | 'nvs'
  | 'svr'
  | 'tat'
  | 'krd'
  | 'niz'
  | 'ros'
  | 'vgg'
  | 'sta'
  | 'sam'
  | 'bas'
  | 'che'
  | 'per'
  | 'kya'
  | 'irk'
  | 'pri'
  | 'kha'
  | 'kal'
  | 'vrn';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type TrendDirection = 'improving' | 'worsening' | 'stable';

export interface ClusterShare {
  c0: number;
  c1: number;
  c2: number;
}

export interface RegionFinance {
  avgLossRub: number;
  largeLossPercent: number;
  annualExposureMln: number;
}

export interface Region {
  id: RegionId;
  score: number;
  score2024: number;
  riskLevel: RiskLevel;
  clusters: ClusterShare;
  deltaPercent: number;
  trend: TrendDirection;
  center: [number, number];
  finance: RegionFinance;
  scenarioIds: ScenarioId[];
  dominantCluster: ClusterId;
}

export type ScenarioId =
  | 'bank_call'
  | 'sms_phishing'
  | 'invest_fraud'
  | 'pseudo_gos'
  | 'resort_fraud'
  | 'online_fraud';

export type ClusterId = 0 | 1 | 2;
