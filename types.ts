export interface ForecastDataPoint {
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

export interface ScenarioMetrics {
  importChange: number;
  consumerPriceImpact: number;
  farmerPriceChange: number;
  selfRelianceDelta: string;
}

export interface SimulationResult {
  scenarioName: string;
  tariff: number;
  forecasts: ForecastDataPoint[];
  metrics: ScenarioMetrics;
  recommendations: string;
  shapSummary: string;
}

export interface ChartConfig {
    key: keyof ForecastDataPoint;
    scenarioKey: keyof ForecastDataPoint;
    name: string;
    color: string;
    unit: string;
}
