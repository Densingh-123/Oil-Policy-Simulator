import React from 'react';

interface ShapPlotProps {
  summary: string;
}

interface FeatureImpact {
    feature: string;
    impact: number;
    description: string;
}

const ShapBar: React.FC<{ feature: FeatureImpact }> = ({ feature }) => {
    const isPositive = feature.impact > 0;
    const barWidth = Math.min(Math.abs(feature.impact) * 15, 100);

    return (
        <div className="flex items-center space-x-4 py-2 group">
             <div className="w-1/3 text-sm font-medium text-slate-600 truncate flex items-center">
                <div className="relative">
                    <span>{feature.feature}</span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-slate-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {feature.description}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                    </div>
                </div>
                <i className="fas fa-info-circle text-slate-400 ml-2 text-xs"></i>
            </div>
            <div className="w-2/3 flex items-center">
                <div className="w-full bg-slate-200 rounded-full h-5">
                    <div
                        className={`h-5 rounded-full text-white text-xs flex items-center px-2 ${isPositive ? 'bg-green-500 justify-start' : 'bg-red-500 justify-end'}`}
                        style={{ width: `${barWidth}%` }}
                    >
                        
                    </div>
                </div>
                <span className={`w-16 text-right font-semibold text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{feature.impact.toFixed(2)}
                </span>
            </div>
        </div>
    );
};

const ShapPlot: React.FC<ShapPlotProps> = ({ summary }) => {
    const parseSummary = (text: string): FeatureImpact[] => {
        try {
            const lines = text.split('\n').filter(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
            return lines.map(line => {
                const match = line.match(/\*\*(.*?):\*\*\s\((.*?)\)\s-\s(.*)/);
                if (!match) return null;
                return {
                    feature: match[1].trim(),
                    impact: parseFloat(match[2]),
                    description: match[3].trim(),
                };
            }).filter((item): item is FeatureImpact => item !== null);
        } catch (e) {
            console.error("Failed to parse SHAP summary:", e);
            return [];
        }
    };
    
    const features = parseSummary(summary);

    if (features.length === 0) {
        return (
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-700 mb-3">
                  <i className="fas fa-brain-circuit mr-3 text-slate-400"></i>
                  Key Drivers (Explainability)
                </h3>
                <div className="space-y-2 text-slate-600">{summary}</div>
            </div>
        );
    }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-700 mb-2 flex items-center">
        <i className="fas fa-brain-circuit mr-3 text-slate-400"></i>Key Drivers (Explainability)
      </h3>
      <p className="text-sm text-slate-500 mb-4">Factors influencing the scenario forecast. Hover over a feature for its description.</p>
      <div className="space-y-1">
        {features.map((feature, index) => (
            <ShapBar key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default ShapPlot;