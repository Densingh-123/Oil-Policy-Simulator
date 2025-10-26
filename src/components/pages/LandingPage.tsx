/*  LandingPage.tsx  – 100 % full-width, blue-only theme, grid pattern, hero image  */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const { user } = useAuth();

  /* subtle grid pattern reused in white sections */
  const gridPattern = {
    backgroundImage: `
      linear-gradient(45deg,  transparent 0%,  transparent 55%,rgba(64,64,64,0.04) 55%, rgba(64,64,64,0.04) 76%,transparent 76%, transparent 100%),
      linear-gradient(135deg, transparent 0%,  transparent 14%,rgba(64,64,64,0.04) 14%, rgba(64,64,64,0.04) 41%,transparent 41%, transparent 100%),
      linear-gradient(45deg,  transparent 0%,  transparent 2%, rgba(64,64,64,0.04) 2%, rgba(64,64,64,0.04) 18%,transparent 18%, transparent 100%),
      linear-gradient(135deg, transparent 0%,  transparent 61%,rgba(64,64,64,0.04) 61%, rgba(64,64,64,0.04) 71%,transparent 71%, transparent 100%),
      linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))
    `,
  };

  return (
    <div className="min-h-screen">
      {/* -------------------------------------------------------------- */}
      {/*  HERO  – full-width, blue gradient, palm-oil image overlay     */}
      {/* -------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden">
        {/* blue gradient backdrop */}
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background:
              'linear-gradient(135deg, #dbeafe 0%, #3b82f6 45%, #1e40af 100%)',
          }}
        />

        {/* supplied palm-oil image – beautiful fade */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        
        </div>

        {/* content */}
        <div className="relative container mx-auto px-6 py-20 md:py-32 text-white">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
              India Palm Oil Policy Simulator
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100 drop-shadow-sm">
              AI-powered economic modeling for evidence-based policy decisions on palm-oil import tariffs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link
                  to="/simulation"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg
                             hover:bg-blue-50 transition duration-300 shadow-2xl transform hover:scale-105"
                >
                  <i className="fas fa-play-circle mr-2"></i>
                  Start Simulating
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg
                               hover:bg-blue-50 transition duration-300 shadow-2xl transform hover:scale-105"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/about"
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg
                               hover:bg-white hover:text-blue-600 transition duration-300"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* animated orbs */}
        <div className="absolute top-10  left-10  w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white opacity-5  rounded-full animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse delay-150"></div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  Features – full-width, grid pattern, blue accents only        */}
      {/* -------------------------------------------------------------- */}
      <section className="py-20 w-full" style={gridPattern}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Powerful Features for Policy Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl
                           hover:shadow-xl transition duration-300 border border-blue-200"
              >
                <div className="text-blue-600 text-4xl mb-6">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  How It Works – full-width, soft-blue cards                    */}
      {/* -------------------------------------------------------------- */}
      <section className="py-20 w-full bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl
                                flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg
                                group-hover:scale-110 transition duration-300"
                >
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  Statistics – full-width, blue gradient only                   */}
      {/* -------------------------------------------------------------- */}
      <section className="py-16 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Forecast Accuracy</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Policy Scenarios</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Data Points</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Real-time Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  CTA – full-width, grid pattern, blue button                   */}
      {/* -------------------------------------------------------------- */}
      <section className="py-20 w-full" style={gridPattern}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Transform Your Policy Decisions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Join policymakers and researchers using our AI-powered simulator for better economic insights and evidence-based decision making.
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl
                         font-semibold text-lg hover:from-blue-700 hover:to-blue-800
                         transition duration-300 shadow-lg inline-block"
            >
              Start Simulating Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Data – unchanged                                                  */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: 'fas fa-brain',
    title: 'AI-Powered Forecasting',
    description:
      'Advanced machine-learning models predict economic impacts with 95 % accuracy based on historical data and market trends.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Real-time Analytics',
    description:
      'Monitor global palm-oil prices, import volumes, and domestic market impacts with live data integration from multiple sources.',
  },
  {
    icon: 'fas fa-cogs',
    title: 'Scenario Modeling',
    description:
      'Test multiple policy scenarios with different tariff rates and external market shocks to understand potential outcomes and trade-offs.',
  },
];

const steps = [
  {
    title: 'Set Parameters',
    description: 'Configure tariff rates, select market conditions, and define policy objectives',
  },
  {
    title: 'Run Simulation',
    description: 'AI processes historical data and generates accurate economic forecasts',
  },
  {
    title: 'Analyze Results',
    description: 'Review impact metrics, visualizations, and policy recommendations',
  },
  {
    title: 'Make Decisions',
    description: 'Use data-driven insights for evidence-based policymaking',
  },
];

export default LandingPage;