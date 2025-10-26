import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r italic from-blue-400 to-blue-900 text-white rounded-2xl">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            India Palm Oil Policy Simulator
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            AI-powered economic modeling for evidence-based policy decisions on palm oil import tariffs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition duration-300"
            >
              Get Started Free
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Powerful Features for Policy Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition duration-300">
                <div className="text-blue-600 text-3xl mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
     <section className="py-16 bg-gradient-to-r from-blue-400 to-blue-900 text-white rounded-2xl shadow-lg">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-6">
      Ready to Transform Your Policy Decisions?
    </h2>
    <p className="text-xl mb-8 max-w-2xl mx-auto">
      Join policymakers and researchers using our AI-powered simulator for better economic insights.
    </p>
    <Link
      to="/register"
      className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition duration-300 inline-block"
    >
      Start Simulating Now
    </Link>
  </div>
</section>

    </div>
  );
};

const features = [
  {
    icon: 'fas fa-brain',
    title: 'AI-Powered Forecasting',
    description: 'Advanced machine learning models predict economic impacts with 95% accuracy based on historical data and market trends.'
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Real-time Analytics',
    description: 'Monitor global palm oil prices, import volumes, and domestic market impacts with live data integration.'
  },
  {
    icon: 'fas fa-cogs',
    title: 'Scenario Modeling',
    description: 'Test multiple policy scenarios with different tariff rates and external market shocks to understand potential outcomes.'
  }
];

const steps = [
  {
    title: 'Set Parameters',
    description: 'Configure tariff rates and select market conditions'
  },
  {
    title: 'Run Simulation',
    description: 'AI processes data and generates forecasts'
  },
  {
    title: 'Analyze Results',
    description: 'Review impact metrics and visualizations'
  },
  {
    title: 'Make Decisions',
    description: 'Use insights for evidence-based policymaking'
  }
];

export default LandingPage;