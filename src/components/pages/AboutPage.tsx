import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About PalmTariffSim</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          An AI-powered platform for evidence-based policy decisions on palm oil import tariffs, 
          helping India achieve self-reliance in edible oil production.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Mission */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
          <div className="text-blue-600 text-3xl mb-4">
            <i className="fas fa-bullseye"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600">
            To provide policymakers with accurate, data-driven insights for making informed decisions 
            about palm oil import tariffs that balance farmer welfare, consumer affordability, and 
            national self-reliance goals.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
          <div className="text-purple-600 text-3xl mb-4">
            <i className="fas fa-eye"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
          <p className="text-gray-600">
            A future where India's edible oil sector is resilient, self-reliant, and globally 
            competitive, supported by advanced AI tools that enable evidence-based policy formulation.
          </p>
        </div>

        {/* Technology */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
          <div className="text-green-600 text-3xl mb-4">
            <i className="fas fa-cogs"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Technology</h3>
          <p className="text-gray-600">
            Powered by advanced machine learning models, real-time data integration, and 
            sophisticated economic simulations to provide accurate forecasts and policy recommendations.
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Challenge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fas fa-exclamation-triangle text-orange-500 mr-2"></i>
              Current Issues
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <i className="fas fa-arrow-right text-blue-500 mr-2 mt-1 text-sm"></i>
                High dependence on palm oil imports exposes India to global price volatility
              </li>
              <li className="flex items-start">
                <i className="fas fa-arrow-right text-blue-500 mr-2 mt-1 text-sm"></i>
                Frequent tariff adjustments disrupt domestic markets and farmer confidence
              </li>
              <li className="flex items-start">
                <i className="fas fa-arrow-right text-blue-500 mr-2 mt-1 text-sm"></i>
                Complex inter-ministerial consultations required for policy decisions
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fas fa-bullseye text-green-500 mr-2"></i>
              Our Solution
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                AI-powered simulation of tariff impacts under multiple scenarios
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                Real-time data integration from global commodity markets
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                Evidence-based recommendations for balanced policy decisions
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 card-hover">
              <div className={`text-2xl mb-4 ${feature.color}`}>
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Research Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <i className={`${partner.icon} text-xl text-blue-600`}></i>
              </div>
              <h3 className="font-semibold text-gray-800">{partner.name}</h3>
              <p className="text-sm text-gray-600">{partner.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join policymakers and researchers using our AI-powered simulator for better economic insights 
          and evidence-based decision making.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/simulation"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition duration-200"
          >
            Start Simulating
          </Link>
          <Link
            to="/register"
            className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition duration-200"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: 'fas fa-brain',
    color: 'text-purple-500',
    title: 'AI Forecasting',
    description: 'Advanced machine learning models predict economic impacts with high accuracy based on historical data.'
  },
  {
    icon: 'fas fa-chart-line',
    color: 'text-blue-500',
    title: 'Real-time Analytics',
    description: 'Live data integration from global markets and comprehensive visualization tools for deep insights.'
  },
  {
    icon: 'fas fa-cogs',
    color: 'text-green-500',
    title: 'Scenario Modeling',
    description: 'Test multiple policy scenarios with different tariff rates and external market conditions.'
  },
  {
    icon: 'fas fa-file-pdf',
    color: 'text-red-500',
    title: 'Report Generation',
    description: 'Automated generation of comprehensive policy reports with actionable recommendations.'
  },
  {
    icon: 'fas fa-database',
    color: 'text-orange-500',
    title: 'Data Integration',
    description: 'Seamless integration with historical trade data, global price indices, and domestic production metrics.'
  },
  {
    icon: 'fas fa-shield-alt',
    color: 'text-indigo-500',
    title: 'Policy Validation',
    description: 'Validate policy decisions against historical data and projected economic impacts.'
  }
];

const partners = [
  {
    name: 'Ministry of Agriculture',
    role: 'Policy Advisory',
    icon: 'fas fa-landmark'
  },
  {
    name: 'NITI Aayog',
    role: 'Research Partner',
    icon: 'fas fa-university'
  },
  {
    name: 'IIT Delhi',
    role: 'Technical Research',
    icon: 'fas fa-graduation-cap'
  },
  {
    name: 'FAO India',
    role: 'Data Partnership',
    icon: 'fas fa-globe'
  }
];

export default AboutPage;