import { useState } from 'react';
import { runSimulation } from '../services/geminiService';
import { SimulationResult } from '../types';

export const useSimulation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const executeSimulation = async (tariff: number, shock: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const simulationResult = await runSimulation(tariff, shock);
      setResult(simulationResult);
      return simulationResult;
    } catch (err: any) {
      setError(err.message || 'Failed to run simulation');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    executeSimulation,
    isLoading,
    error,
    result,
    reset
  };
};