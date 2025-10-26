import React from 'react';
// FIX: Removed TooltipProps as we will define a custom interface to avoid type errors.
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { ForecastDataPoint, ChartConfig } from '../types';

interface ForecastChartProps {
    data: ForecastDataPoint[];
    config: ChartConfig;
}

// FIX: Explicitly define props for the custom tooltip to avoid issues with the library's provided TooltipProps type.
// This also allows us to pass our own `config` prop.
interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    config: ChartConfig;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, config }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                <p className="font-semibold text-slate-700">{label}</p>
                <p style={{ color: '#a0aec0' }}>
                    {/* FIX: Use config from props for unit */}
                    {`Baseline: ${payload[0].value?.toLocaleString()}${config.unit}`}
                </p>
                <p style={{ color: payload[1].color }}>
                    {/* FIX: Use config from props for unit */}
                    {`Scenario: ${payload[1].value?.toLocaleString()}${config.unit}`}
                </p>
            </div>
        );
    }
    return null;
};

const ForecastChart: React.FC<ForecastChartProps> = ({ data, config }) => {
    return (
        <div className="forecast-chart-container" style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fill: '#64748b' }} fontSize={12} />
                    <YAxis 
                        tickFormatter={(value) => typeof value === 'number' ? value.toLocaleString() : value} 
                        tick={{ fill: '#64748b' }} 
                        fontSize={12}
                    />
                    {/* FIX: Pass the `config` prop to the CustomTooltip component. */}
                    <Tooltip content={<CustomTooltip config={config} />} />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                    <Line type="monotone" dataKey={config.key} name="Baseline (0% Tariff)" stroke="#a0aec0" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey={config.scenarioKey} name="Scenario" stroke={config.color} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ForecastChart;