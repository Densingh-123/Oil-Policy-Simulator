import React, { useState } from 'react';

interface ScenarioControlsProps {
  onRunSimulation: (tariff: number, shock: string) => void;
  isLoading: boolean;
}

const shockEvents = [
  'None',
  'Major Producer Supply Disruption (e.g., drought in Indonesia)',
  'Global Shipping Route Crisis (e.g., Suez Canal blockage)',
  'Sudden Spike in Global Edible Oil Demand (e.g., biofuel policy change)',
  'Indian Rupee Devaluation (-10% vs USD)',
];

const ScenarioControls: React.FC<ScenarioControlsProps> = ({ onRunSimulation, isLoading }) => {
  const [tariff, setTariff] = useState<number>(15);
  const [shock, setShock] = useState<string>('None');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunSimulation(tariff, shock);
  };

  const sliderStyle = {
    background: `linear-gradient(to right, #3b82f6 ${tariff / 0.5}%, #e5e7eb ${tariff / 0.5}%)`,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-3">Simulation Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
          {/* Tariff Slider */}
          <div className="md:col-span-2">
            <label htmlFor="tariff" className="block text-sm font-medium text-slate-600 mb-1">
              Import Tariff Rate
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="tariff"
                type="range"
                min="0"
                max="50"
                step="1"
                value={tariff}
                onChange={(e) => setTariff(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                style={sliderStyle}
                disabled={isLoading}
              />
              <span className="font-semibold text-blue-600 w-16 text-center text-lg">{tariff}%</span>
            </div>
          </div>
          
          {/* Shock Event Dropdown */}
          <div className="md:col-span-2">
            <label htmlFor="shock" className="block text-sm font-medium text-slate-600 mb-1">
              Exogenous Shock Event
            </label>
            <select
              id="shock"
              value={shock}
              onChange={(e) => setShock(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              {shockEvents.map((event) => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white flex items-center justify-center transition-colors ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Simulating...
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-2"></i>
                  Run Simulation
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScenarioControls;