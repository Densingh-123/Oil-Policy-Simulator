
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'fas fa-home' },
    { name: 'Simulation', href: '/simulation', icon: 'fas fa-play-circle' },
    { name: 'Analytics', href: '/analytics', icon: 'fas fa-chart-bar' },
    { name: 'History', href: '/history', icon: 'fas fa-history' },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <i className="fas fa-chart-pie text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">PalmTariffSim</h1>
            <p className="text-xs text-gray-500">AI Policy Simulator</p>
          </div>
        </Link>
      </div>
      <nav className="mt-8">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;