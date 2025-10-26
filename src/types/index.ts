export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organization?: string;
  createdAt: string;
  photoURL?: string;
  emailVerified: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, organization?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export interface SimulationResult {
  id?: string;
  scenarioName: string;
  tariff: number;
  shock: string;
  timestamp?: string;
  forecasts: ForecastDataPoint[];
  metrics: ScenarioMetrics;
  recommendations: string;
  shapSummary: string;
  description?: string;
  userId?: string; // Link simulations to users
}

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
  revenueImpact?: number;
  tradeBalanceImpact?: number;
}

export interface ChartConfig {
  key: string;
  scenarioKey: string;
  name: string;
  color: string;
  unit: string;
}

export interface AppContextType {
  simulations: SimulationResult[];
  addSimulation: (simulation: SimulationResult) => void;
  clearSimulations: () => void;
  currentSimulation: SimulationResult | null;
  setCurrentSimulation: (simulation: SimulationResult | null) => void;
  saveSimulationToFirebase: (simulation: SimulationResult) => Promise<void>;
  loadSimulationsFromFirebase: () => Promise<void>;
}

export interface MarketData {
  date: string;
  price: number;
  volume: number;
  demand: number;
}