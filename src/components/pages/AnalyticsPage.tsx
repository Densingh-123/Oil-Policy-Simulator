// AnalyticsPage.tsx
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { MarketData } from '../../types';

const ranges = ['1M', '3M', '1Y', 'ALL'] as const;
type Range = typeof ranges[number];

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<Range>('1Y');
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  /* mock fetch */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const basePrice = 800;
      const baseVolume = 1000;
      const data: MarketData[] = Array.from({ length: 30 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          price: +(basePrice + Math.random() * 200 - 100).toFixed(2),
          volume: Math.round(baseVolume + Math.random() * 500 - 250),
          demand: +(0.8 + Math.random() * 0.4).toFixed(2),
        };
      });
      setMarketData(data);
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const stats = [
    { name: 'Current CPO Price', value: '$842.50', change: '+2.3%', icon: 'fas fa-dollar-sign', color: 'from-emerald-400 to-teal-500' },
    { name: 'Import Volume', value: '1.2M tons', change: '-4.1%', icon: 'fas fa-ship', color: 'from-sky-400 to-indigo-500' },
    { name: 'Domestic Production', value: '0.8M tons', change: '+8.7%', icon: 'fas fa-seedling', color: 'from-lime-400 to-green-500' },
    { name: 'Market Demand', value: '2.1M tons', change: '+3.2%', icon: 'fas fa-chart-line', color: 'from-violet-400 to-purple-500' },
  ];

  const insights = [
    { icon: 'fas fa-arrow-up', color: 'bg-emerald-100 text-emerald-600', title: 'Price Recovery', description: 'CPO prices showing 5% recovery from last month lows due to supply constraints.' },
    { icon: 'fas fa-ship', color: 'bg-sky-100 text-sky-600', title: 'Import Growth', description: 'Q1 import volumes expected to grow by 8% year-over-year.' },
    { icon: 'fas fa-seedling', color: 'bg-lime-100 text-lime-600', title: 'Domestic Production', description: 'NMEO-OP initiatives driving 12% increase in domestic cultivation.' },
  ];

  /* skeleton */
  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" />)}</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{[...Array(2)].map((_, i) => <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl" />)}</div>
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .glass {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        @media (prefers-color-scheme: dark) {
          .glass {
            background: rgba(17, 24, 39, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-4 border-blue-500 rounded-2xl">

        <div className="max-w-7xl mx-auto  px-4 sm:px-6 py-10">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">Market Analytics</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Real-time palm-oil insights & trend forecasts</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 p-1 rounded-2xl glass">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${timeRange === r ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow' : 'text-gray-700 dark:text-gray-200 hover:bg-white/30'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="card-hover relative p-6 rounded-2xl glass overflow-hidden">
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.color} opacity-20`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <i className={`${s.icon} text-2xl text-white drop-shadow-lg`} />
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{s.change}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{s.name}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">CPO Price Trend (USD/ton)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={marketData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Import Volume (tons)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '12px' }} />
                  <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Market Demand Forecast</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="demand" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Insights</h3>
              <div className="space-y-4">
                {insights.map((ins) => (
                  <div key={ins.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/40 dark:bg-gray-800/40">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ins.color}`}><i className={ins.icon} /></div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{ins.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{ins.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;