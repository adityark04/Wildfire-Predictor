
export interface WildfireInputFeatures {
  temperature: number; // °C
  humidity: number;    // %
  windSpeed: number;   // km/h
  precipitation: number; // mm (last 7 days)
  soilMoisture: number; // % (e.g. 0-100)
  vegetationIndex: number; // NDVI (e.g. 0.0 - 1.0)
  humanActivity: HumanActivityLevel;
}

export enum HumanActivityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface PredictionResult {
  riskProbability: number; // 0.0 - 1.0
  riskLevel: RiskLevel;
  assessment: string; 
}

export enum RiskLevel {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  VERY_HIGH = 'Very High',
  EXTREME = 'Extreme',
}

// Type for the expected structure from Gemini API
export interface GeminiPredictionResponse {
  riskProbability: number;
  riskLevel: string; // This will be a string, needs mapping to RiskLevel enum
  assessment: string;
}
