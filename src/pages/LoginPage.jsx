import React, { useState } from 'react';
import Card from '../components/Card';
import { loginUser, registerUser } from '../services/api';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Form validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      let userData;
      
      if (isLogin) {
        // Login
        const response = await loginUser(formData.email, formData.password);
        userData = response.user;
        localStorage.setItem('authToken', response.token);
      } else {
        // Register
        const response = await registerUser(formData.name, formData.email, formData.password);
        userData = response.user;
        localStorage.setItem('authToken', response.token);
      }
      
      onLogin(userData);
      setLoading(false);
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ 
        general: error.message || 'Authentication failed. Please try again.' 
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation errors on input
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-welcome)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <Card>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <h1 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Intern Dashboard
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isLogin ? 'Sign in to access your internship management portal' : 'Create your account to get started'}
            </p>
          </div>

          {/* Mode Toggle */}
          <div style={{ 
            display: 'flex', 
            background: 'var(--bg-accent)', 
            borderRadius: '8px', 
            padding: '0.25rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                background: isLogin ? 'var(--primary-teal)' : 'transparent',
                color: isLogin ? 'white' : 'var(--text-secondary)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                background: !isLogin ? 'var(--primary-teal)' : 'transparent',
                color: !isLogin ? 'white' : 'var(--text-secondary)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{ borderColor: errors.name ? 'var(--primary-reddish-pink)' : undefined }}
              />
              {errors.name && (
                <small style={{ color: 'var(--primary-reddish-pink)', fontSize: '0.8rem' }}>
                  {errors.name}
                </small>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={{ borderColor: errors.email ? 'var(--primary-reddish-pink)' : undefined }}
              />
              {errors.email && (
                <small style={{ color: 'var(--primary-reddish-pink)', fontSize: '0.8rem' }}>
                  {errors.email}
                </small>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{ borderColor: errors.password ? 'var(--primary-reddish-pink)' : undefined }}
              />
              {errors.password && (
                <small style={{ color: 'var(--primary-reddish-pink)', fontSize: '0.8rem' }}>
                  {errors.password}
                </small>
              )}
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  style={{ borderColor: errors.confirmPassword ? 'var(--primary-reddish-pink)' : undefined }}
                />
                {errors.confirmPassword && (
                  <small style={{ color: 'var(--primary-reddish-pink)', fontSize: '0.8rem' }}>
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
            )}

            {errors.general && (
              <div style={{ 
                marginBottom: '1rem', 
                padding: '0.75rem', 
                background: 'var(--primary-reddish-pink)', 
                color: 'white', 
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: 'var(--bg-accent)', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <strong>Login Credentials:</strong><br />
              Email: admin@shefoundation.org<br />
              Password: mansi
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage; 