import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebase'; // Your Firebase config
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { SimulationResult } from '../../types';
import Loader from '../common/Loader';

const HistoryPage: React.FC = () => {
  const { currentUser, setCurrentSimulation } = useApp(); // Assuming you have currentUser in context
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationResult | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'high-tariff' | 'low-tariff'>('all');

  useEffect(() => {
    const fetchSimulations = async () => {
      setLoading(true);
      try {
        let userSimulations: SimulationResult[] = [];

        if (currentUser?.uid) {
          // Fetch simulations created by current user
          const simRef = collection(db, 'simulations');
          const q = query(
            simRef,
            where('userId', '==', currentUser.uid),
            orderBy('timestamp', 'desc')
          );
          const snapshot = await getDocs(q);
          userSimulations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SimulationResult));
        }

        // If no user-specific records, fetch 5 latest global records
        if (userSimulations.length === 0) {
          const simRef = collection(db, 'simulations');
          const q = query(simRef, orderBy('timestamp', 'desc'), limit(5));
          const snapshot = await getDocs(q);
          userSimulations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SimulationResult));
        }

        setSimulations(userSimulations);
      } catch (error) {
        console.error('Failed to fetch simulations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimulations();
  }, [currentUser]);

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

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Simulation History</h1>
          <p className="text-gray-600">Review and manage your past simulations</p>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Simulations List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 max-h-[600px] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Saved Simulations ({filteredSimulations.length})
              </h2>
            </div>
            {filteredSimulations.map(sim => (
              <div
                key={sim.id}
                onClick={() => handleSelectSimulation(sim)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition duration-200 ${
                  selectedSimulation?.id === sim.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm">{sim.scenarioName}</h3>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
                    {sim.tariff}%
                  </span>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Import Change:</span>
                    <span className={`${sim.metrics.importChange < 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                      {sim.metrics.importChange > 0 ? '+' : ''}{sim.metrics.importChange.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Farmer Price:</span>
                    <span className={`${sim.metrics.farmerPriceChange > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                      {sim.metrics.farmerPriceChange > 0 ? '+' : ''}{sim.metrics.farmerPriceChange.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consumer Impact:</span>
                    <span className={`${sim.metrics.consumerPriceImpact > 0 ? 'text-red-600' : 'text-green-600'} font-semibold`}>
                      {sim.metrics.consumerPriceImpact > 0 ? '+' : ''}{sim.metrics.consumerPriceImpact.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {sim.timestamp ? new Date(sim.timestamp).toLocaleDateString() : 'Unknown date'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Details */}
        <div className="lg:col-span-2">
          {selectedSimulation ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedSimulation.scenarioName}</h2>
              <p className="text-gray-600 mb-4">
                Run on {selectedSimulation.timestamp ? new Date(selectedSimulation.timestamp).toLocaleString() : 'Unknown date'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                  <div className={`${selectedSimulation.metrics.importChange < 0 ? 'text-green-600' : 'text-red-600'} font-bold text-2xl`}>
                    {selectedSimulation.metrics.importChange > 0 ? '+' : ''}{selectedSimulation.metrics.importChange.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Import Change</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                  <div className="text-green-600 font-bold text-2xl">
                    {selectedSimulation.metrics.farmerPriceChange > 0 ? '+' : ''}{selectedSimulation.metrics.farmerPriceChange.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Farmer Price</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                  <div className="text-orange-600 font-bold text-2xl">
                    {selectedSimulation.metrics.consumerPriceImpact > 0 ? '+' : ''}{selectedSimulation.metrics.consumerPriceImpact.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Consumer Impact</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                  <div className="text-purple-600 font-bold text-lg">{selectedSimulation.metrics.selfRelianceDelta}</div>
                  <div className="text-sm text-gray-600 mt-1">Self-Reliance</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-4">Policy Recommendations</h3>
                <p className="text-gray-700">{selectedSimulation.recommendations}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <i className="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a simulation to view details</h3>
              <p className="text-gray-500">Click on any simulation from the left to see detailed metrics and recommendations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
