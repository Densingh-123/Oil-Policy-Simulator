import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AppProvider } from './src/contexts/AppContext';
import Header from './src/components/layout/Header';
import Footer from './src/components/layout/Footer';
import LandingPage from './src/components/pages/LandingPage';
import SimulationPage from './src/components/pages/SimulationPage';
import HistoryPage from './src/components/pages/HistoryPage';
import AnalyticsPage from './src/components/pages/AnalyticsPage';
import ProfilePage from './src/components/pages/ProfilePage';
import AboutPage from './src/components/pages/AboutPage';
import Login from './src/components/auth/Login';
import Register from './src/components/auth/Register';
import AuthGuard from './src/components/auth/AuthGuard';
import './styles/globals.css';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {user && <Header />}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/simulation" /> : <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected Routes */}
          <Route element={<AuthGuard />}>
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;