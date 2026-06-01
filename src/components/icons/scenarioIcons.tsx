import {
  Building2,
  Globe,
  Landmark,
  Phone,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { ScenarioId } from '../../types';

export const SCENARIO_ICONS: Record<ScenarioId, LucideIcon> = {
  bank_call: Phone,
  sms_phishing: Smartphone,
  invest_fraud: TrendingUp,
  pseudo_gos: Landmark,
  resort_fraud: Building2,
  online_fraud: Globe,
};
