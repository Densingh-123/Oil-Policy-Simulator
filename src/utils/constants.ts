export const APP_CONFIG = {
  name: 'PalmTariffSim',
  version: '1.0.0',
  description: 'AI-Powered Palm Oil Policy Simulator',
};

export const TARIFF_RANGE = {
  min: 0,
  max: 50,
  step: 1,
  default: 15
};

export const SHOCK_EVENTS = [
  'None',
  'Major Producer Supply Disruption (e.g., drought in Indonesia)',
  'Global Shipping Route Crisis (e.g., Suez Canal blockage)',
  'Sudden Spike in Global Edible Oil Demand (e.g., biofuel policy change)',
  'Indian Rupee Devaluation (-10% vs USD)',
  'Export Ban by Major Producer Country',
  'Global Economic Recession Impact',
];

export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#3b82f6'
};