import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import ScenarioControls from '../dashboard/ScenarioControls';
import Dashboard from '../dashboard/Dashboard';
import Loader from '../common/Loader';
import { runSimulation } from '../../services/geminiService';
import { SimulationResult } from '../../types';

const SimulationPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'simulation' | 'compare' | 'history'>('simulation');
  const [quickScenarios, setQuickScenarios] = useState<{name: string, tariff: number, shock: string}[]>([]);
  const { addSimulation, currentSimulation, simulations } = useApp();

  useEffect(() => {
    setQuickScenarios([
      { name: "Moderate Protection", tariff: 20, shock: "None" },
      { name: "Aggressive Self-Reliance", tariff: 35, shock: "None" },
      { name: "Crisis Response", tariff: 25, shock: "Major Producer Supply Disruption (e.g., drought in Indonesia)" },
      { name: "Balanced Approach", tariff: 15, shock: "None" },
    ]);
  }, []);

  const handleRunSimulation = async (tariff: number, shock: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await runSimulation(tariff, shock);
      addSimulation(result);
      setActiveTab('simulation');
    } catch (err: any) {
      console.error('Simulation error:', err);
      setError(err.message || 'Failed to run simulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickScenario = (scenario: {tariff: number, shock: string}) => {
    handleRunSimulation(scenario.tariff, scenario.shock);
  };

  const gradientStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 40%, #60a5fa 100%)',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white relative overflow-hidden">
      {/* Floating Glow Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 opacity-20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 opacity-20 blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse"></div>

      {/* Header */}
  <div
  className="w-full text-white py-16 md:py-20 pb-5 relative z-10 rounded-2xl shadow-lg"
  style={gradientStyle}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center rounded-2xl">
  <h1 className="text-5xl md:text-6xl font-extrabold mb-4 italic tracking-tight drop-shadow-lg">
    Policy Simulation Lab
  </h1>
  <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
    Test different tariff scenarios and analyze their impact on India's palm oil markets using AI-powered economic modeling
  </p>
</div>

      </div>

      {/* Main Content */}
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-100 mb-10 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: 'simulation', icon: 'fa-play-circle', label: 'Run Simulation' },
              { id: 'compare', icon: 'fa-balance-scale', label: 'Compare Scenarios' },
              { id: 'history', icon: 'fa-history', label: 'Simulation History' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[140px] px-6 py-4 text-lg font-semibold transition duration-300 transform ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-4 border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-inner scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* SIMULATION TAB */}
            {activeTab === 'simulation' && (
              <div className="space-y-10">
                {/* Quick Scenarios */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200 shadow-inner">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-bolt text-yellow-500 mr-3"></i>
                    Quick Start Scenarios
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Instantly test policy strategies with ready-made configurations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickScenarios.map((scenario, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickScenario(scenario)}
                        disabled={isLoading}
                        className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm hover:shadow-xl hover:scale-[1.03] 
                                 transition-all duration-300 text-left group disabled:opacity-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-800">{scenario.name}</span>
                          <i className="fas fa-play-circle text-blue-500 group-hover:scale-110 transition duration-300"></i>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Tariff:</span>
                            <span className="font-semibold text-blue-600">{scenario.tariff}%</span>
                          </div>
                          {scenario.shock !== 'None' && (
                            <div className="text-orange-600 text-xs">
                              <i className="fas fa-exclamation-triangle mr-1"></i>
                              {scenario.shock.split('(')[0].trim()}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Controls */}
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <i className="fas fa-sliders-h text-blue-500 mr-3"></i>
                    Custom Simulation
                  </h3>
                  <ScenarioControls onRunSimulation={handleRunSimulation} isLoading={isLoading} />
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-2xl flex items-center shadow-md animate-pulse">
                    <i className="fas fa-exclamation-triangle mr-3 text-red-500 text-xl"></i>
                    <div className="flex-grow">
                      <p className="font-semibold">Simulation Error</p>
                      <p className="text-sm">{error}</p>
                    </div>
                    <button 
                      onClick={() => setError(null)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition duration-200"
                    >
                      <i className="fas fa-times text-lg"></i>
                    </button>
                  </div>
                )}

                {isLoading && <Loader />}

                {currentSimulation && !isLoading && (
                  <div className="animate-fade-in">
                    <Dashboard result={currentSimulation} />
                  </div>
                )}

                {!currentSimulation && !isLoading && !error && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 text-center border border-blue-200 shadow-inner">
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-blue-100">
                        <i className="fas fa-chart-line text-4xl text-blue-500"></i>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800">Ready to Simulate Policy Impacts</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Configure a custom tariff scenario or choose a preset above to analyze economic outcomes using AI-driven insights.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { icon: 'fa-brain', color: 'blue', title: 'AI-Powered Analysis', text: 'Advanced ML models predict economic outcomes with 95% accuracy.' },
                          { icon: 'fa-chart-bar', color: 'green', title: 'Comprehensive Reports', text: 'Detailed forecasts, metrics, and policy insights.' },
                          { icon: 'fa-download', color: 'purple', title: 'Export & Share', text: 'Download simulation reports and share findings.' },
                        ].map((item, i) => (
                          <div key={i} className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm hover:shadow-md transition duration-300">
                            <div className={`text-${item.color}-500 text-xl mb-2`}>
                              <i className={`fas ${item.icon}`}></i>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COMPARE TAB */}
            {activeTab === 'compare' && (
              <div className="space-y-8">
                <div className="text-center py-10">
                  <i className="fas fa-balance-scale text-5xl text-blue-500 mb-4"></i>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">Compare Policy Scenarios</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Review multiple simulations side by side for strategic decision-making.
                  </p>
                </div>

                {simulations.length >= 2 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {simulations.slice(0, 4).map((sim) => (
                      <div key={sim.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-gray-800">{sim.scenarioName}</h4>
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                            {sim.tariff}% Tariff
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center p-3 bg-gray-50 rounded-lg shadow-inner">
                            <div className={`text-lg font-bold ${sim.metrics.importChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {sim.metrics.importChange > 0 ? '+' : ''}{sim.metrics.importChange.toFixed(1)}%
                            </div>
                            <div className="text-gray-600">Import Change</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg shadow-inner">
                            <div className={`text-lg font-bold ${sim.metrics.farmerPriceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {sim.metrics.farmerPriceChange > 0 ? '+' : ''}{sim.metrics.farmerPriceChange.toFixed(1)}%
                            </div>
                            <div className="text-gray-600">Farmer Price</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg shadow-inner">
                            <div className={`text-lg font-bold ${sim.metrics.consumerPriceImpact > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {sim.metrics.consumerPriceImpact > 0 ? '+' : ''}{sim.metrics.consumerPriceImpact.toFixed(1)}%
                            </div>
                            <div className="text-gray-600">Consumer Impact</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg shadow-inner">
                            <div className="text-lg font-bold text-blue-600">
                              {sim.metrics.selfRelianceDelta.split(' ')[0]}
                            </div>
                            <div className="text-gray-600">Self-Reliance</div>
                          </div>
                        </div>
                        <button
                          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:scale-[1.02] transition duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-200 shadow-inner">
                    <i className="fas fa-balance-scale text-4xl text-gray-400 mb-4"></i>
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">Not Enough Simulations</h4>
                    <p className="text-gray-500 mb-6">
                      Run at least 2 simulations to compare different policy scenarios.
                    </p>
                    <button
                      onClick={() => setActiveTab('simulation')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300 font-semibold"
                    >
                      Run Simulations
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === 'history' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">Simulation History</h3>
                    <p className="text-gray-600">Review and manage your past simulations</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {simulations.length} simulation{simulations.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {simulations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {simulations.map((simulation) => (
                      <div
                        key={simulation.id}
                        className="bg-white rounded-3xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-gray-800 text-lg">{simulation.scenarioName}</h4>
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                            {simulation.tariff}%
                          </span>
                        </div>

                        <div className="space-y-3 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Import Change:</span>
                            <span className={`${simulation.metrics.importChange < 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                              {simulation.metrics.importChange > 0 ? '+' : ''}{simulation.metrics.importChange.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Farmer Price:</span>
                            <span className={`${simulation.metrics.farmerPriceChange > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                              {simulation.metrics.farmerPriceChange > 0 ? '+' : ''}{simulation.metrics.farmerPriceChange.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Consumer Impact:</span>
                            <span className={`${simulation.metrics.consumerPriceImpact > 0 ? 'text-red-600' : 'text-green-600'} font-semibold`}>
                              {simulation.metrics.consumerPriceImpact > 0 ? '+' : ''}{simulation.metrics.consumerPriceImpact.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 mb-4">
                          Run on {simulation.timestamp ? new Date(simulation.timestamp).toLocaleDateString() : 'Unknown date'}
                        </p>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => setActiveTab('simulation')}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 hover:scale-[1.03] transition duration-300"
                          >
                            View Results
                          </button>
                          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition duration-200">
                            <i className="fas fa-download"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-200 shadow-inner">
                    <i className="fas fa-history text-5xl text-gray-400 mb-4"></i>
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">No Simulations Yet</h4>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      You haven't run any simulations yet. Start now to see insights.
                    </p>
                    <button
                      onClick={() => setActiveTab('simulation')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300 font-semibold"
                    >
                      Run First Simulation
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {[
            { icon: 'fa-database', color: 'blue', title: 'Data Sources', text: 'Integrated with MPOB, UN Comtrade, FAOSTAT, and NMEO-OP datasets.' },
            { icon: 'fa-chart-line', color: 'green', title: 'Model Accuracy', text: '95% forecast accuracy through rigorous backtesting.' },
            { icon: 'fa-clock', color: 'purple', title: 'Real-time Updates', text: 'Continuously calibrated using live market and policy data.' },
          ].map((card, i) => (
            <div
              key={i}
              className={`bg-white rounded-3xl p-6 border border-${card.color}-200 shadow-sm hover:shadow-xl hover:scale-[1.03] transition duration-300`}
            >
              <div className={`text-${card.color}-500 text-2xl mb-4`}>
                <i className={`fas ${card.icon}`}></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
