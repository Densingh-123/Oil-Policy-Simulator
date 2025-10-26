import { GoogleGenerativeAI } from "@google/generative-ai";

// ------------------------------
// Data Interfaces
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

const ai = new GoogleGenerativeAI(API_KEY);

// ------------------------------
// Main Simulation Function
// ------------------------------
export const runSimulation = async (
  tariff: number,
  shock: string
): Promise<SimulationResult> => {
  const scenarioName = `${tariff}% Tariff${shock !== "None" ? ` + ${shock}` : ""}`;

  // Optional descriptive instruction
  let shockInstruction = "";
  if (shock !== "None") {
    shockInstruction = `In addition to the tariff, the model should account for the effect of the external shock: "${shock}". Reflect this as a deviation from the standard tariff-only forecast scenario.`;
  }

  // ------------------------------
  // Generate Mock Forecast Data
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

    // ------------------------------
    // Enhanced Human-Readable Output
    // ------------------------------
    const recommendations = `
Policy Recommendations:
1. Introduce the ${tariff}% tariff gradually to allow the market to adapt smoothly.
2. Closely monitor international palm oil price fluctuations to anticipate import cost pressures.
3. Provide financial or technical support to domestic oilseed farmers to strengthen production capacity.
4. Track consumer price trends; if prices rise sharply, implement temporary subsidies for essential products.
5. Conduct a comprehensive policy review after six months to evaluate trade performance and food security impact.
`;

    const shapSummary = `
Key Drivers and Explainability:
- Tariff Rate (${(tariff * 0.1).toFixed(2)}): The main factor reducing import volume and increasing domestic prices.
- Global Supply Conditions (${(Math.random() * 0.5 - 0.25).toFixed(2)}): Moderate influence depending on international availability and cost.
- Domestic Production (${(Math.random() * 0.3).toFixed(2)}): Limited short-term effect but essential for long-term stability.
- Exchange Rate (${(Math.random() * 0.4 - 0.2).toFixed(2)}): Affects import cost and competitiveness of local producers.
- Consumer Demand (${(Math.random() * 0.2).toFixed(2)}): Low elasticity; demand remains relatively steady even with price increases.
`;

    return {
      forecasts,
      metrics: {
        importChange: parseFloat(importChange.toFixed(2)),
        consumerPriceImpact: parseFloat(consumerPriceImpact.toFixed(2)),
        farmerPriceChange: parseFloat(farmerPriceChange.toFixed(2)),
        selfRelianceDelta:
          tariff >= 25
            ? "Significantly improved self-reliance in domestic oilseed production"
            : tariff >= 15
            ? "Moderate improvement in domestic production capacity"
            : "Minimal effect on self-reliance and import dependency",
      },
      recommendations: recommendations.trim(),
      shapSummary: shapSummary.trim(),
    };
  };

  // ------------------------------
  // Simulation Execution
  // ------------------------------
  try {
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
