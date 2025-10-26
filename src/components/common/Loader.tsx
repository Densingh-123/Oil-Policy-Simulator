import React from 'react';

const Loader: React.FC = () => {
  const messages = [
    "Calibrating econometric models...",
    "Analyzing global price futures...",
    "Simulating tariff pass-through effects...",
    "Consulting historical trade data...",
    "Forecasting domestic supply response...",
    "Generating policy recommendations...",
  ];

  return (
    <div className="flex justify-center items-center p-12 bg-white rounded-2xl shadow-lg border border-blue-100">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Animated spinner */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <i className="fas fa-chart-pie text-blue-600 text-xl"></i>
          </div>
        </div>
        
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Running Economic Simulation
        </p>
        <p className="text-gray-600 mb-4">
          This may take a few moments as we process complex economic models...
        </p>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse"></div>
        </div>
        
        {/* Rotating messages */}
        <div className="h-8">
          <div className="animate-pulse text-blue-600 font-medium">
            {messages[Math.floor(Math.random() * messages.length)]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;