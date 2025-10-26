import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { SimulationResult } from '../../types';

const HistoryPage: React.FC = () => {
  const { simulations, setCurrentSimulation, clearSimulations } = useApp();
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationResult | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'high-tariff' | 'low-tariff'>('all');

  const filteredSimulations = simulations.filter(sim => {
    if (filter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(sim.timestamp!) >= oneWeekAgo;
    }
    if (filter === 'high-tariff') return sim.tariff >= 25;
    if (filter === 'low-tariff') return sim.tariff < 25;
    return true;
  });

  const handleSelectSimulation = (simulation: SimulationResult) => {
    setSelectedSimulation(simulation);
    setCurrentSimulation(simulation);
  };

  const handleDeleteSimulation = (id: string) => {
    // This would be implemented with proper state management
    console.log('Delete simulation:', id);
  };

  if (simulations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Simulation History</h1>
          <p className="text-gray-600">Review and compare your past policy simulations</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-history text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              No Simulations Yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't run any policy simulations yet. Start by creating your first simulation to analyze tariff impacts.
            </p>
            <Link
              to="/simulation"
              className="bg-gradient-to-r from-blue-400 to-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 inline-flex items-center"
            >
              <i className="fas fa-plus mr-2"></i>
              Run First Simulation
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Simulation History</h1>
            <p className="text-gray-600">Review and compare your past policy simulations</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Simulations</option>
              <option value="recent">Last 7 Days</option>
              <option value="high-tariff">High Tariff (≥25%)</option>
              <option value="low-tariff">Low Tariff (&lt;25%)</option>
            </select>
            <button
              onClick={clearSimulations}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center"
            >
              <i className="fas fa-trash mr-2"></i>
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Simulations List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Saved Simulations ({filteredSimulations.length})
              </h2>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
              {filteredSimulations.map((sim) => (
                <div
                  key={sim.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition duration-200 ${
                    selectedSimulation?.id === sim.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectSimulation(sim)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                      {sim.scenarioName}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSimulation(sim.id!);
                      }}
                      className="text-red-400 hover:text-red-600 transition duration-200"
                    >
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Tariff Rate:</span>
                      <span className="font-semibold text-blue-600">{sim.tariff}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Import Change:</span>
                      <span className={`font-semibold ${
                        sim.metrics.importChange < 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {sim.metrics.importChange > 0 ? '+' : ''}{sim.metrics.importChange.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date(sim.timestamp!).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Simulation Details */}
        <div className="lg:col-span-2">
          {selectedSimulation ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedSimulation.scenarioName}
                  </h2>
                  <p className="text-gray-600">
                    Run on {new Date(selectedSimulation.timestamp!).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <Link
                    to="/simulation"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-200"
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Re-run
                  </Link>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                  <div className={`text-2xl font-bold ${
                    selectedSimulation.metrics.importChange < 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedSimulation.metrics.importChange > 0 ? '+' : ''}
                    {selectedSimulation.metrics.importChange.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Import Change</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedSimulation.metrics.farmerPriceChange > 0 ? '+' : ''}
                    {selectedSimulation.metrics.farmerPriceChange.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Farmer Price</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                  <div className="text-2xl font-bold text-orange-600">
                    {selectedSimulation.metrics.consumerPriceImpact > 0 ? '+' : ''}
                    {selectedSimulation.metrics.consumerPriceImpact.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Consumer Impact</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                  <div className="text-lg font-bold text-purple-600 leading-tight">
                    {selectedSimulation.metrics.selfRelianceDelta}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Self-Reliance</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-bullseye-pointer mr-3 text-blue-500"></i>
                  Policy Recommendations
                </h3>
                <div className="space-y-3 text-gray-700">
                  {selectedSimulation.recommendations.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                      return (
                        <div key={index} className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span>{trimmedLine.substring(2)}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <i className="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Select a Simulation
              </h3>
              <p className="text-gray-500">
                Choose a simulation from the list to view detailed results and analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;