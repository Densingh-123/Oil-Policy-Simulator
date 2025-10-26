import { GoogleGenAI, Type } from "@google/genai";
import { SimulationResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const simulationSchema = {
  type: Type.OBJECT,
  properties: {
    forecasts: {
      type: Type.ARRAY,
      description: "A 12-month forecast data array. Each object represents one month.",
      items: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.STRING, description: "Month in 'Mon YYYY' format (e.g., 'Jan 2025')." },
          globalPrice: { type: Type.NUMBER, description: "Baseline Global FCPO Price (USD/tonne)." },
          importVolume: { type: Type.NUMBER, description: "Baseline India Import Volume (Million Tonnes)." },
          domesticPrice: { type: Type.NUMBER, description: "Baseline Domestic Wholesale Price Index." },
          farmerPriceIndex: { type: Type.NUMBER, description: "Baseline Farmer Price Realization Index." },
          globalPriceScenario: { type: Type.NUMBER, description: "Scenario Global FCPO Price (USD/tonne)." },
          importVolumeScenario: { type: Type.NUMBER, description: "Scenario India Import Volume (Million Tonnes)." },
          domesticPriceScenario: { type: Type.NUMBER, description: "Scenario Domestic Wholesale Price Index." },
          farmerPriceIndexScenario: { type: Type.NUMBER, description: "Scenario Farmer Price Realization Index." },
        },
        required: [
          "month",
          "globalPrice",
          "importVolume",
          "domesticPrice",
          "farmerPriceIndex",
          "globalPriceScenario",
          "importVolumeScenario",
          "domesticPriceScenario",
          "farmerPriceIndexScenario",
        ],
      },
    },
    metrics: {
      type: Type.OBJECT,
      description: "Key performance indicators comparing baseline vs. scenario.",
      properties: {
        importChange: { type: Type.NUMBER, description: "Projected % change in import volume over 12 months." },
        consumerPriceImpact: { type: Type.NUMBER, description: "Projected % change in domestic consumer price index." },
        farmerPriceChange: { type: Type.NUMBER, description: "Projected % change in farmer price realization index." },
        selfRelianceDelta: { type: Type.STRING, description: "Qualitative change in time-to-self-reliance (e.g., 'Accelerated by ~6 months')." },
      },
      required: ["importChange", "consumerPriceImpact", "farmerPriceChange", "selfRelianceDelta"],
    },
    recommendations: {
      type: Type.STRING,
      description: "Actionable policy recommendations based on the simulation, formatted as a single markdown string with bullet points.",
    },
    shapSummary: {
      type: Type.STRING,
      description: "A plain-language summary of the key drivers (explainability) for the forecast changes, formatted as a single markdown string.",
    },
  },
  required: ["forecasts", "metrics", "recommendations", "shapSummary"],
};

export const runSimulation = async (tariff: number, shock: string): Promise<SimulationResult> => {
  const scenarioName = `${tariff}% Tariff` + (shock !== 'None' ? ` + ${shock}` : '');
  
  let shockInstruction = '';
  if (shock !== 'None') {
    shockInstruction = `\n- **Exogenous Shock Event:** In addition to the tariff, model the impact of the following event: "${shock}". This should be reflected as a deviation in the scenario forecast compared to a standard tariff-only model.`
  }

  const prompt = `
    Act as an expert economic modeling AI for agricultural commodities, specializing in the Indian palm oil market. Your task is to simulate the impact of an import tariff on India's Crude Palm Oil (CPO) sector.

    **Simulation Parameters:**
    - Commodity: Crude Palm Oil (CPO)
    - Country: India
    - Scenario: Apply a ${tariff}% import duty on CPO. The baseline is a 0% tariff.
    ${shockInstruction}
    - Forecast Horizon: 12 months from today.
    - Data sources to consider: Bursa Malaysia (FCPO futures), MPOB data, UN Comtrade, FAOSTAT, and NMEO-OP policy goals.

    **Modeling Approach:**
    1.  **Market Price & Import Demand Model (Short-term):** Use an ensemble of time-series models (like ARIMA/Prophet + LSTM) to forecast global prices and India's import demand. Factor in the tariff's effect on import parity pricing and the specified shock event.
    2.  **Tariff Pass-through & Consumer Price Model:** Use a distributed-lag econometric model to estimate the percentage of the tariff passed through to domestic wholesale and retail edible oil prices.
    3.  **Domestic Supply Response Model (Medium-term):** Qualitatively assess how sustained higher domestic prices might influence farmer planting decisions and contribute to self-reliance goals under the NMEO-OP.

    **Request:**
    Generate a complete simulation result according to the provided JSON schema. Ensure the data is realistic, economically sound, and reflects the complex dynamics of the CPO market. The forecast should show a clear, logical impact from the ${tariff}% tariff (and any shock event) compared to the baseline.
    `;
  
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: simulationSchema,
            temperature: 0.2,
        },
    });
    
    // FIX: Sanitize the response text to remove potential markdown formatting around the JSON object.
    let jsonString = response.text.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.substring(7, jsonString.length - 3).trim();
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.substring(3, jsonString.length - 3).trim();
    }
    
    let result;
    try {
        result = JSON.parse(jsonString);
    } catch (parseError) {
        console.error("Error parsing JSON response from AI:", parseError);
        console.error("Raw AI response:", jsonString);
        throw new Error("The AI returned a malformed data structure. Could not parse the simulation results.");
    }

    // Basic validation
    if (!result.forecasts || !result.metrics || !result.recommendations) {
        console.error("Invalid data structure received:", result);
        throw new Error("The AI returned an incomplete data structure. Required fields are missing.");
    }

    return { ...result, scenarioName, tariff } as SimulationResult;
  } catch (error: any) {
    console.error("Error running simulation:", error);
    if (error.message.includes("malformed") || error.message.includes("incomplete")) {
        throw error; // Re-throw our custom parsing/validation errors
    }
    throw new Error("The simulation failed due to an API error. Please check the console for details.");
  }
};