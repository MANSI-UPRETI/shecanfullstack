import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ReportsPage from './pages/ReportsPage';
import InternsPage from './pages/InternsPage';
import EventsPage from './pages/EventsPage';
import SettingsPage from './pages/SettingsPage';
import RewardsPage from './pages/RewardsPage';
import Sidebar from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    console.log('Login successful:', userData);
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    console.log('Logging out user:', user);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  // Layout component for authenticated pages
  const AuthenticatedLayout = ({ children }) => (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="main-content">
        {children}
      </div>
      <ThemeToggle />
    </div>
  );

  if (!isLoggedIn) {
    return (
      <Router>
        <div className="App">
          <LoginPage onLogin={handleLogin} />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <AuthenticatedLayout>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/interns" element={<InternsPage />} />
            <Route path="/events" element={<EventsPage />} />
                                  <Route path="/settings" element={<SettingsPage user={user} />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthenticatedLayout>
      </div>
    </Router>
  );
}

export default App;
