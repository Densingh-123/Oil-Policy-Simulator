import { MarketData } from '../types';

export const dataService = {
  async getMarketData(timeRange: string): Promise<MarketData[]> {
    // Mock API call for market data
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData: MarketData[] = [];
        const basePrice = 800;
        const baseVolume = 1000;
        
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          
          mockData.push({
            date: date.toISOString().split('T')[0],
            price: basePrice + Math.random() * 200 - 100,
            volume: baseVolume + Math.random() * 500 - 250,
            demand: 0.8 + Math.random() * 0.4
          });
        }
        
        resolve(mockData);
      }, 500);
    });
  },

  async getHistoricalData() {
    // Mock historical data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          prices: Array.from({ length: 12 }, (_, i) => 700 + Math.random() * 300),
          volumes: Array.from({ length: 12 }, (_, i) => 800 + Math.random() * 400),
          dates: Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - (11 - i));
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          })
        });
      }, 300);
    });
  }
};