import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import ScenarioControls from '../dashboard/ScenarioControls';
import Dashboard from '../dashboard/Dashboard';
import Loader from '../common/Loader';
import { runSimulation } from '../../services/geminiService';
import { SimulationResult } from '../../types';

const SimulationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addSimulation, currentSimulation } = useApp();

  const handleRunSimulation = async (tariff: number, shock: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await runSimulation(tariff, shock);
      addSimulation(result);
    } catch (err: any) {
      console.error('Simulation error:', err);
      setError(err.message || 'Failed to run simulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Policy Simulation</h1>
        <p className="text-gray-600">
          Test different tariff scenarios and analyze their impact on palm oil markets
        </p>
      </div>

      {/* Simulation Controls */}
      <div className="mb-8">
        <ScenarioControls onRunSimulation={handleRunSimulation} isLoading={isLoading} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center">
          <i className="fas fa-exclamation-triangle mr-3 text-red-500"></i>
          <div>
            <p className="font-semibold">Simulation Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <button 
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && <Loader />}

      {/* Results Dashboard */}
      {currentSimulation && !isLoading && (
        <Dashboard result={currentSimulation} />
      )}

      {/* Empty State */}
      {!currentSimulation && !isLoading && !error && (
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-chart-line text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Ready to Simulate
            </h3>
            <p className="text-gray-600 mb-6">
              Configure your tariff scenario and market conditions above to run your first policy simulation. 
              The AI will generate comprehensive forecasts and recommendations.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
              <p className="text-sm text-blue-700 font-semibold mb-2">💡 Pro Tip</p>
              <p className="text-sm text-blue-600">
                Start with a 15-25% tariff scenario to see moderate impacts on import volumes and domestic prices.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationPage;