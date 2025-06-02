
import { HumanActivityLevel, RiskLevel, WildfireInputFeatures } from './types';

export const DEFAULT_INPUT_FEATURES: WildfireInputFeatures = {
  temperature: 25,
  humidity: 40,
  windSpeed: 15,
  precipitation: 5,
  soilMoisture: 30,
  vegetationIndex: 0.6,
  humanActivity: HumanActivityLevel.MEDIUM,
};

export const RISK_LEVEL_STYLES: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  [RiskLevel.LOW]: { bg: 'bg-green-600', text: 'text-green-100', border: 'border-green-500' },
  [RiskLevel.MODERATE]: { bg: 'bg-yellow-500', text: 'text-yellow-900', border: 'border-yellow-400' },
  [RiskLevel.HIGH]: { bg: 'bg-orange-500', text: 'text-orange-100', border: 'border-orange-400' },
  [RiskLevel.VERY_HIGH]: { bg: 'bg-red-600', text: 'text-red-100', border: 'border-red-500' },
  [RiskLevel.EXTREME]: { bg: 'bg-purple-700', text: 'text-purple-100', border: 'border-purple-600' },
};

export const HUMAN_ACTIVITY_OPTIONS = Object.values(HumanActivityLevel);
