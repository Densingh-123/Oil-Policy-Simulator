import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ Corrected import

// ------------------------------
// Define Data Interfaces
// ------------------------------
interface ForecastData {
  month: string;
  globalPrice: number;
  importVolume: number;
  domesticPrice: number;
  farmerPriceIndex: number;
  globalPriceScenario: number;
  importVolumeScenario: number;
  domesticPriceScenario: number;
  farmerPriceIndexScenario: number;
}

interface SimulationMetrics {
  importChange: number;
  consumerPriceImpact: number;
  farmerPriceChange: number;
  selfRelianceDelta: string;
}

interface SimulationResult {
  forecasts: ForecastData[];
  metrics: SimulationMetrics;
  recommendations: string;
  shapSummary: string;
  scenarioName: string;
  tariff: number;
  shock: string;
  id: string;
  timestamp: string;
}

// ------------------------------
// API Setup
// ------------------------------
const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  "AIzaSyAurNoRuPmTNG8pY35f5fq0NvbpNvz3jIs";

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

// ✅ Use correct Gemini class (GoogleGenerativeAI)
const ai = new GoogleGenerativeAI(API_KEY);

// ------------------------------
// Main Simulation Function
// ------------------------------
export const runSimulation = async (
  tariff: number,
  shock: string
): Promise<SimulationResult> => {
  const scenarioName = `${tariff}% Tariff` + (shock !== "None" ? ` + ${shock}` : "");

  let shockInstruction = "";
  if (shock !== "None") {
    shockInstruction = `\n- **Exogenous Shock Event:** In addition to the tariff, model the impact of the following event: "${shock}". This should be reflected as a deviation in the scenario forecast compared to a standard tariff-only model.`;
  }

  // ------------------------------
  // Mock Data Generator
  // ------------------------------
  const generateMockData = (): Omit<
    SimulationResult,
    "scenarioName" | "tariff" | "shock" | "id" | "timestamp"
  > => {
    const forecasts: ForecastData[] = [];
    const baseDate = new Date();

    for (let i = 0; i < 12; i++) {
      const month = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
      const monthStr = month.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      const baseGlobalPrice = 800 + Math.random() * 200;
      const baseImportVolume = 0.8 + Math.random() * 0.4;
      const baseDomesticPrice = 100 + Math.random() * 20;
      const baseFarmerPrice = 100 + Math.random() * 15;

      const tariffImpact = 1 + tariff * 0.001;
      const shockImpact = shock !== "None" ? 0.9 + Math.random() * 0.2 : 1;

      forecasts.push({
        month: monthStr,
        globalPrice: Math.round(baseGlobalPrice),
        importVolume: parseFloat(baseImportVolume.toFixed(2)),
        domesticPrice: parseFloat(baseDomesticPrice.toFixed(1)),
        farmerPriceIndex: parseFloat(baseFarmerPrice.toFixed(1)),
        globalPriceScenario: Math.round(baseGlobalPrice * shockImpact),
        importVolumeScenario: parseFloat(
          (baseImportVolume / tariffImpact * shockImpact).toFixed(2)
        ),
        domesticPriceScenario: parseFloat(
          (baseDomesticPrice * tariffImpact * shockImpact).toFixed(1)
        ),
        farmerPriceIndexScenario: parseFloat(
          (baseFarmerPrice * tariffImpact).toFixed(1)
        ),
      });
    }

    const importChange = tariff * -0.8 + (Math.random() * 0.4 - 0.2);
    const consumerPriceImpact = tariff * 0.3 + (Math.random() * 0.2 - 0.1);
    const farmerPriceChange = tariff * 0.4 + (Math.random() * 0.2 - 0.1);

    return {
      forecasts,
      metrics: {
        importChange: parseFloat(importChange.toFixed(2)),
        consumerPriceImpact: parseFloat(consumerPriceImpact.toFixed(2)),
        farmerPriceChange: parseFloat(farmerPriceChange.toFixed(2)),
        selfRelianceDelta:
          tariff >= 25
            ? "Significantly accelerated"
            : tariff >= 15
            ? "Moderately accelerated"
            : "Minimal impact",
      },
      recommendations: `* Implement the ${tariff}% tariff gradually to monitor market response.
* Monitor global palm oil prices for potential supply chain impacts.
* Support domestic oilseed farmers with complementary policies.
* Assess consumer price impacts and consider targeted subsidies if needed.
* Review the policy after 6 months to evaluate effectiveness.`,
      shapSummary: `**Tariff Rate:** (${(tariff * 0.1).toFixed(
        2
      )}) — Primary driver of import reduction and domestic price increases.
**Global Supply Conditions:** (${(Math.random() * 0.5 - 0.25).toFixed(
        2
      )}) — Moderate impact from international market trends.
**Domestic Production:** (${(Math.random() * 0.3).toFixed(
        2
      )}) — Limited short-term influence.
**Exchange Rate:** (${(Math.random() * 0.4 - 0.2).toFixed(
        2
      )}) — Secondary factor affecting import costs.
**Consumer Demand:** (${(Math.random() * 0.2).toFixed(
        2
      )}) — Minimal elasticity in short term.`,
    };
  };

  // ------------------------------
  // Simulation Execution
  // ------------------------------
  try {
    // Use mock data for now (replace with actual Gemini API call in production)
    const mockResult = generateMockData();

    return {
      ...mockResult,
      scenarioName,
      tariff,
      shock,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error running simulation:", error);

    const mockResult = generateMockData();
    return {
      ...mockResult,
      scenarioName,
      tariff,
      shock,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
  }
};
