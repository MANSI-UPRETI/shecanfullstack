import React, { useState, useEffect } from 'react';

const SettingsPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    department: user?.department || 'Management',
    role: user?.role || 'admin',
    bio: 'Passionate about managing internship programs and helping students grow.'
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    eventReminders: true,
    achievementAlerts: true
  });
  const [systemSettings, setSystemSettings] = useState({
    language: 'English',
    timezone: 'UTC-5 (Eastern Time)',
    autoSave: true,
    darkMode: false,
    compactMode: false
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordChangeRequired: false
  });
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: '+1 (555) 123-4567',
        department: user.department || 'Management',
        role: user.role || 'admin',
        bio: 'Passionate about managing internship programs and helping students grow.'
      });
    }
  }, [user]);

  const handleProfileSave = () => {
    // Save profile changes
    console.log('Saving profile changes:', profileForm);
    
    // Update user data
    const updatedUser = { ...user, ...profileForm };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSystemToggle = (key) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSecurityToggle = (key) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ProfileTab = () => (
    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Profile Settings</h3>
      
      {showSaveMessage && (
        <div className="alert alert-success" role="alert" style={{ marginBottom: '2rem' }}>
          ✅ Profile changes saved successfully!
        </div>
      )}
      
      <div className="row">
        <div className="col-md-6">
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={profileForm.name}
              onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={profileForm.email}
              onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Department</label>
            <select
              className="form-control"
              value={profileForm.department}
              onChange={(e) => setProfileForm({...profileForm, department: e.target.value})}
            >
              <option value="Management">Management</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label className="form-label">Bio</label>
        <textarea
          className="form-control"
          rows="4"
          value={profileForm.bio}
          onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
          placeholder="Tell us about yourself..."
        />
      </div>
      
      <button 
        className="btn btn-primary"
        onClick={handleProfileSave}
        disabled={!profileForm.name.trim()}
      >
        Save Changes
      </button>
    </div>
  );

  const NotificationsTab = () => (
    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Notification Preferences</h3>
      
      <div className="card">
        <div className="card-body">
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Email Notifications</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={() => handleNotificationToggle('emailNotifications')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Receive notifications via email</small>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Push Notifications</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={() => handleNotificationToggle('pushNotifications')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Receive push notifications in browser</small>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Weekly Reports</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={() => handleNotificationToggle('weeklyReports')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Get weekly performance reports</small>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Event Reminders</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.eventReminders}
                  onChange={() => handleNotificationToggle('eventReminders')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Get reminded about upcoming events</small>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Achievement Alerts</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.achievementAlerts}
                  onChange={() => handleNotificationToggle('achievementAlerts')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Get notified about new achievements</small>
          </div>
        </div>
      </div>
    </div>
  );

  const SystemTab = () => (
    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>System Preferences</h3>
      
      <div className="row">
        <div className="col-md-6">
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Language</label>
            <select
              className="form-control"
              value={systemSettings.language}
              onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Timezone</label>
            <select
              className="form-control"
              value={systemSettings.timezone}
              onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
            >
              <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
              <option value="UTC-6 (Central Time)">UTC-6 (Central Time)</option>
              <option value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</option>
              <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Auto Save</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={systemSettings.autoSave}
                  onChange={() => handleSystemToggle('autoSave')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Automatically save changes</small>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Dark Mode</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={systemSettings.darkMode}
                  onChange={() => handleSystemToggle('darkMode')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Use dark theme</small>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Compact Mode</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={systemSettings.compactMode}
                  onChange={() => handleSystemToggle('compactMode')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Use compact layout</small>
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Security Settings</h3>
      
      <div className="card">
        <div className="card-body">
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Two-Factor Authentication</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={securitySettings.twoFactorAuth}
                  onChange={() => handleSecurityToggle('twoFactorAuth')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Add an extra layer of security</small>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0, color: 'var(--text-primary)' }}>Require Password Change</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={securitySettings.passwordChangeRequired}
                  onChange={() => handleSecurityToggle('passwordChangeRequired')}
                />
              </div>
            </div>
            <small style={{ color: 'var(--text-secondary)' }}>Force password change on next login</small>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label className="form-label">Session Timeout (minutes)</label>
        <select
          className="form-control"
          value={securitySettings.sessionTimeout}
          onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={120}>2 hours</option>
        </select>
      </div>
      
      <div className="card">
        <div className="card-body">
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Recent Login Activity</h5>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <div style={{ marginBottom: '0.5rem' }}>📍 Current Session - {new Date().toLocaleString()}</div>
            <div style={{ marginBottom: '0.5rem' }}>📍 Previous Login - {new Date(Date.now() - 86400000).toLocaleString()}</div>
            <div style={{ marginBottom: '0.5rem' }}>📍 Login from Mobile - {new Date(Date.now() - 172800000).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>⚙️ Settings</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Manage your account preferences and system settings
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
                role="tab"
              >
                Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
                role="tab"
              >
                Notifications
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'system' ? 'active' : ''}`}
                onClick={() => setActiveTab('system')}
                role="tab"
              >
                System
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
                role="tab"
              >
                Security
              </button>
            </li>
          </ul>

          <div className="tab-content" style={{ paddingTop: '2rem' }}>
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'system' && <SystemTab />}
            {activeTab === 'security' && <SecurityTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 