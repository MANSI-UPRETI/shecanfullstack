import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/interns', label: 'Interns', icon: '👥' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { path: '/rewards', label: 'Rewards', icon: '🎁' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/events', label: 'Events', icon: '📅' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>
          <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🎓</span>
          intern
        </h2>
        {user && (
          <p style={{ 
            color: 'var(--text-secondary)', 
            margin: '0.5rem 0 0 0', 
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Welcome, {user.name}
          </p>
        )}
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.label}
            </Link>
          </div>
        ))}
        
        {/* Logout Button */}
        <div className="nav-item" style={{ marginTop: '2rem' }}>
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              color: 'var(--primary-reddish-pink)'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🚪</span>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 