import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-5 md:px-8 flex items-center">
        <div className="text-blue-600 mr-4">
          <i className="fas fa-chart-pie text-3xl"></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            India Palm Oil Policy Simulator
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            An AI-powered tool for evidence-based economic policy decisions.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;