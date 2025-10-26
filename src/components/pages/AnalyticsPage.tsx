import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, BarChart, Bar } from 'recharts';
import { MarketData } from '../../types';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '1Y' | 'ALL'>('1Y');
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchMarketData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data
      const mockData: MarketData[] = [];
      const basePrice = 800;
      const baseVolume = 1000;
      
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        
        mockData.push({
          date: date.toISOString().split('T')[0],
          price: basePrice + Math.random() * 200 - 100,
          volume: baseVolume + Math.random() * 500 - 250,
          demand: 0.8 + Math.random() * 0.4
        });
      }
      
      setMarketData(mockData);
      setLoading(false);
    };

    fetchMarketData();
  }, [timeRange]);

  const stats = [
    { name: 'Current CPO Price', value: '$842.50', change: '+2.3%', icon: 'fas fa-dollar-sign', color: 'text-green-500' },
    { name: 'Import Volume', value: '1.2M tons', change: '-4.1%', icon: 'fas fa-ship', color: 'text-red-500' },
    { name: 'Domestic Production', value: '0.8M tons', change: '+8.7%', icon: 'fas fa-seedling', color: 'text-green-500' },
    { name: 'Market Demand', value: '2.1M tons', change: '+3.2%', icon: 'fas fa-chart-line', color: 'text-green-500' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-xl"></div>
            ))}
          </div>
          <div className="bg-gray-200 h-96 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Market Analytics</h1>
            <p className="text-gray-600">
              Real-time palm oil market data and trends analysis
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {(['1M', '3M', '1Y', 'ALL'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`text-2xl ${stat.color}`}>
                <i className={stat.icon}></i>
              </div>
              <span className={`text-sm font-semibold ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.name}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Price Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-chart-line text-blue-500 mr-3"></i>
            CPO Price Trends (USD/ton)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="price" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-ship text-green-500 mr-3"></i>
            Import Volume Trends (tons)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Demand Forecast */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-chart-bar text-purple-500 mr-3"></i>
            Market Demand Forecast
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="demand" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Insights */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-lightbulb text-yellow-500 mr-3"></i>
            Market Insights
          </h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight.color} mt-1`}>
                  <i className={insight.icon}></i>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{insight.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const insights = [
  {
    icon: 'fas fa-arrow-up',
    color: 'bg-green-100 text-green-600',
    title: 'Price Recovery',
    description: 'CPO prices showing 5% recovery from last month lows due to supply constraints.'
  },
  {
    icon: 'fas fa-ship',
    color: 'bg-blue-100 text-blue-600',
    title: 'Import Growth',
    description: 'Q1 import volumes expected to grow by 8% year-over-year.'
  },
  {
    icon: 'fas fa-seedling',
    color: 'bg-orange-100 text-orange-600',
    title: 'Domestic Production',
    description: 'NMEO-OP initiatives driving 12% increase in domestic cultivation.'
  }
];

export default AnalyticsPage;