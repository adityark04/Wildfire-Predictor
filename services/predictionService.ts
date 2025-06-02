
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { WildfireInputFeatures, PredictionResult, RiskLevel, GeminiPredictionResponse } from '../types';

// Ensure API_KEY is accessed correctly for client-side (if bundler replaces process.env)
// For this exercise, we assume process.env.API_KEY is directly available as per instructions.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable is not set. AI predictions will fail.");
  // In a real app, you might throw an error here or disable AI features.
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" }); // Provide a fallback to prevent crash if key is undefined at init

function mapStringToRiskLevel(riskLevelStr: string): RiskLevel {
  const upperCaseRiskLevel = riskLevelStr.toUpperCase().replace(/\s+/g, '_'); // e.g. "Very High" -> "VERY_HIGH"
  switch (upperCaseRiskLevel) {
    case 'LOW': return RiskLevel.LOW;
    case 'MODERATE': return RiskLevel.MODERATE;
    case 'HIGH': return RiskLevel.HIGH;
    case 'VERY_HIGH': return RiskLevel.VERY_HIGH;
    case 'EXTREME': return RiskLevel.EXTREME;
    default:
      console.warn(`Unknown risk level string: ${riskLevelStr}. Defaulting to Moderate.`);
      return RiskLevel.MODERATE; // Fallback
  }
}

export const getWildfireRisk = async (features: WildfireInputFeatures): Promise<PredictionResult> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the API_KEY environment variable.");
  }

  const model = 'gemini-2.5-flash-preview-04-17';

  const prompt = `
You are a wildfire risk assessment AI. Based on the following environmental and human activity data, predict the wildfire risk.

Input Data:
- Temperature: ${features.temperature}°C
- Humidity: ${features.humidity}%
- Wind Speed: ${features.windSpeed} km/h
- Precipitation (last 7 days): ${features.precipitation} mm
- Soil Moisture: ${features.soilMoisture}%
- Vegetation Index (NDVI): ${features.vegetationIndex}
- Human Activity Level: ${features.humanActivity}

Your response MUST be a valid JSON object with the following structure and nothing else (no markdown, no explanations outside the JSON):
{
  "riskProbability": 0.XX, // A number between 0.0 and 1.0, e.g., 0.75
  "riskLevel": "RiskLevelString",    // One of: "Low", "Moderate", "High", "Very High", "Extreme"
  "assessment": "A brief (2-3 sentences) explanation of the risk factors and overall situation."
}

Example for high risk:
{
  "riskProbability": 0.82,
  "riskLevel": "Very High",
  "assessment": "The combination of high temperatures, low humidity, and significant wind speed, along with dry vegetation, creates a very high risk of wildfire ignition and rapid spread. Recent low precipitation exacerbates these conditions."
}

Provide your prediction for the given input data.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json", // Request JSON output
        temperature: 0.5, // Moderate temperature for some variability but mostly deterministic for this task
      }
    });
    
    let jsonStr = response.text.trim();

    // Remove potential markdown fences (```json ... ``` or ``` ... ```)
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    const parsedData = JSON.parse(jsonStr) as GeminiPredictionResponse;

    if (
      typeof parsedData.riskProbability !== 'number' ||
      typeof parsedData.riskLevel !== 'string' ||
      typeof parsedData.assessment !== 'string'
    ) {
      console.error("Invalid JSON structure from AI:", parsedData);
      throw new Error("AI response did not match the expected format.");
    }
    
    // Clamp probability just in case
    const riskProbability = Math.max(0, Math.min(1, parsedData.riskProbability));

    return {
      riskProbability: riskProbability,
      riskLevel: mapStringToRiskLevel(parsedData.riskLevel),
      assessment: parsedData.assessment,
    };

  } catch (error) {
    console.error('Error calling Gemini API or parsing response:', error);
    if (error instanceof Error) {
        // Check for common API errors (though @google/genai might wrap them)
        if (error.message.includes("API key not valid")) {
            throw new Error("Invalid Gemini API Key. Please check your configuration.");
        }
        if (error.message.includes("quota")) {
            throw new Error("API quota exceeded. Please try again later or check your Gemini plan.");
        }
         throw new Error(`AI prediction failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching wildfire risk from AI.');
  }
};
