import React, { useState, useEffect } from 'react';

const messages = [
    "Calibrating econometric models...",
    "Analyzing global price futures...",
    "Simulating tariff pass-through effects...",
    "Consulting historical trade data...",
    "Forecasting domestic supply response...",
];

const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 flex justify-center items-center p-8 bg-white rounded-lg shadow-lg border border-slate-200">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-20 w-20">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-700 font-semibold text-lg">
          Running Economic Simulation
        </p>
        <p className="mt-1 text-slate-500 w-64 h-10">
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
};

export default Loader;