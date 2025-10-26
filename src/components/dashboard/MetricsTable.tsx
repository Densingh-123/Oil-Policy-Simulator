import React from 'react';
import { ScenarioMetrics } from '../../types';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  positiveIsGood?: boolean;
  icon: string;
  tooltip: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit = '', positiveIsGood, icon, tooltip }) => {
    const isNumber = typeof value === 'number';
    const colorClass = isNumber ? (
      (value > 0 && positiveIsGood === true) || (value < 0 && positiveIsGood === false)
      ? 'text-green-600'
      : (value < 0 && positiveIsGood === true) || (value > 0 && positiveIsGood === false)
      ? 'text-red-600'
      : 'text-slate-800'
    ) : 'text-slate-800';

    const sign = isNumber && value > 0 ? '+' : '';

    return (
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl hover:shadow-md transition duration-200">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-slate-500 font-medium">{label}</span>
          <div className="relative group">
            <i className="fas fa-info-circle text-slate-400 cursor-pointer"></i>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-slate-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <i className={`${icon} ${colorClass} text-2xl`}></i>
            <span className={`text-2xl font-bold ${colorClass}`}>
                {isNumber ? `${sign}${value.toFixed(2)}${unit}` : value}
            </span>
        </div>
      </div>
    );
};

const MetricsTable: React.FC<{ metrics: ScenarioMetrics }> = ({ metrics }) => {
  return (
    <div id="metrics-table-container" className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-full">
      <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
        <i className="fas fa-tachometer-alt mr-3 text-slate-400"></i>
        Key Metrics
      </h3>
      <div className="space-y-4">
        <MetricCard
            label="Import Volume Change" 
            value={metrics.importChange} 
            unit="%" 
            positiveIsGood={false} 
            icon="fas fa-ship"
            tooltip="The projected percentage change in total palm oil import volume over the 12-month forecast period compared to the baseline."
        />
        <MetricCard
            label="Consumer Price Impact" 
            value={metrics.consumerPriceImpact} 
            unit="%" 
            positiveIsGood={false} 
            icon="fas fa-shopping-cart"
            tooltip="The estimated percentage impact on the domestic consumer price index for edible oils, reflecting the tariff's pass-through effect."
        />
        <MetricCard
            label="Farmer Price Change" 
            value={metrics.farmerPriceChange} 
            unit="%" 
            positiveIsGood={true}
            icon="fas fa-seedling"
            tooltip="The projected percentage change in the price realization for domestic oilseed farmers due to shifts in domestic market prices."
        />
        <MetricCard
            label="Self-Reliance Delta" 
            value={metrics.selfRelianceDelta}
            icon="fas fa-flag"
            tooltip="A qualitative assessment of how the scenario impacts India's long-term goal of self-reliance in edible oils under the NMEO-OP."
        />
      </div>
    </div>
  );
};

export default MetricsTable;