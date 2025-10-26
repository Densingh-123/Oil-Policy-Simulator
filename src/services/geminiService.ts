import { GoogleGenAI } from "@google/genai";
import { SimulationResult } from '../types';

// Use environment variable for API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyAurNoRuPmTNG8pY35f5fq0NvbpNvz3jIs";

if (!API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const runSimulation = async (tariff: number, shock: string): Promise<SimulationResult> => {
  const scenarioName = `${tariff}% Tariff` + (shock !== 'None' ? ` + ${shock}` : '');
  
  let shockInstruction = '';
  if (shock !== 'None') {
    shockInstruction = `\n- **Exogenous Shock Event:** In addition to the tariff, model the impact of the following event: "${shock}". This should be reflected as a deviation in the scenario forecast compared to a standard tariff-only model.`
  }

  // Mock data generation for demonstration
  // In a real application, this would call the actual Gemini API
  const generateMockData = () => {
    const forecasts = [];
    const baseDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const month = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
      const monthStr = month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      const baseGlobalPrice = 800 + Math.random() * 200;
      const baseImportVolume = 0.8 + Math.random() * 0.4;
      const baseDomesticPrice = 100 + Math.random() * 20;
      const baseFarmerPrice = 100 + Math.random() * 15;
      
      // Apply tariff impact
      const tariffImpact = 1 + (tariff * 0.001);
      const shockImpact = shock !== 'None' ? 0.9 + Math.random() * 0.2 : 1;
      
      forecasts.push({
        month: monthStr,
        globalPrice: Math.round(baseGlobalPrice),
        importVolume: parseFloat(baseImportVolume.toFixed(2)),
        domesticPrice: parseFloat(baseDomesticPrice.toFixed(1)),
        farmerPriceIndex: parseFloat(baseFarmerPrice.toFixed(1)),
        globalPriceScenario: Math.round(baseGlobalPrice * shockImpact),
        importVolumeScenario: parseFloat((baseImportVolume / tariffImpact * shockImpact).toFixed(2)),
        domesticPriceScenario: parseFloat((baseDomesticPrice * tariffImpact * shockImpact).toFixed(1)),
        farmerPriceIndexScenario: parseFloat((baseFarmerPrice * tariffImpact).toFixed(1)),
      });
    }
    
    const importChange = ((tariff * -0.8) + (Math.random() * 0.4 - 0.2));
    const consumerPriceImpact = (tariff * 0.3) + (Math.random() * 0.2 - 0.1);
    const farmerPriceChange = (tariff * 0.4) + (Math.random() * 0.2 - 0.1);
    
    return {
      forecasts,
      metrics: {
        importChange: parseFloat(importChange.toFixed(2)),
        consumerPriceImpact: parseFloat(consumerPriceImpact.toFixed(2)),
        farmerPriceChange: parseFloat(farmerPriceChange.toFixed(2)),
        selfRelianceDelta: tariff >= 25 ? "Significantly accelerated" : 
                          tariff >= 15 ? "Moderately accelerated" : 
                          "Minimal impact",
      },
      recommendations: `* Consider implementing the ${tariff}% tariff gradually to monitor market response\n* Monitor global palm oil prices for potential supply chain impacts\n* Support domestic oilseed farmers with complementary policies\n* Assess consumer price impacts and consider targeted subsidies if needed\n* Review the policy after 6 months to evaluate effectiveness`,
      shapSummary: `**Tariff Rate:** (${tariff * 0.1}) - Primary driver of import reduction and domestic price increases\n**Global Supply Conditions:** (${Math.random() * 0.5 - 0.25}) - Moderate impact from international market trends\n**Domestic Production:** (${Math.random() * 0.3}) - Limited influence in short-term scenarios\n**Exchange Rate:** (${Math.random() * 0.4 - 0.2}) - Secondary factor affecting import costs\n**Consumer Demand:** (${Math.random() * 0.2}) - Minimal elasticity in short term`,
    };
  };

  try {
    // For now, use mock data since we don't have actual API access
    // In production, you would use the actual Gemini API call
    const mockResult = generateMockData();
    
    return {
      ...mockResult,
      scenarioName,
      tariff,
      shock,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    } as SimulationResult;
    
  } catch (error: any) {
    console.error("Error running simulation:", error);
    
    // Fallback to mock data if API fails
    const mockResult = generateMockData();
    return {
      ...mockResult,
      scenarioName,
      tariff,
      shock,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    } as SimulationResult;
  }
};