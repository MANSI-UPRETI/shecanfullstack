import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopInterns, getStatistics, getEvents, getFallbackTopInterns, getFallbackStatistics, getFallbackEvents } from '../services/api';
import ChartComponent from '../components/ChartComponent';

const DashboardPage = ({ user }) => {
  const [topInterns, setTopInterns] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internsData, statsData, eventsData] = await Promise.all([
          getTopInterns(),
          getStatistics(),
          getEvents()
        ]);
        
        setTopInterns(internsData);
        setStatistics(statsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data if API fails
        try {
          const [fallbackInterns, fallbackStats, fallbackEvents] = await Promise.all([
            getFallbackTopInterns(),
            getFallbackStatistics(),
            getFallbackEvents()
          ]);
          
          setTopInterns(fallbackInterns);
          setStatistics(fallbackStats);
          setEvents(fallbackEvents);
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, change, icon, color = 'primary' }) => (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="stat-label">{title}</div>
          <div className="stat-value">{value}</div>
          <div className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
            <span>{change >= 0 ? '↗' : '↘'}</span>
            <span>{Math.abs(change)}%</span>
            <span>from last month</span>
          </div>
        </div>
        <div style={{ 
          fontSize: '2rem', 
          color: `var(--primary-${color})`,
          opacity: 0.8 
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const InternCard = ({ intern, rank }) => (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            {rank}
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, color: 'var(--text-primary)' }}>{intern.name}</h5>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              ${intern.donations.toLocaleString()} raised
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--primary-sage-green)', fontWeight: 'bold' }}>
              +{intern.achievements} achievements
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h5 style={{ margin: 0, color: 'var(--text-primary)' }}>{event.title}</h5>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {event.date} • {event.location}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              background: 'var(--primary-sage-green)', 
              color: 'white', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              {event.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard chart data
  const monthlyDonationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Donations ($)',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 5878],
        borderColor: 'var(--primary-teal)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const departmentDistributionData = {
    labels: ['Engineering', 'Marketing', 'Sales', 'Design', 'Finance'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'var(--primary-teal)',
          'var(--primary-sage-green)',
          'var(--primary-orange)',
          'var(--primary-purple)',
          'var(--primary-reddish-pink)'
        ],
        borderWidth: 2,
        borderColor: 'var(--bg-card)'
      }
    ]
  };

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Interns Performance',
        data: [65, 78, 82, 85],
        backgroundColor: 'var(--primary-sage-green)',
        borderColor: 'var(--primary-sage-green)',
        borderWidth: 2
      }
    ]
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: 'var(--text-primary)'
      }}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Welcome Header */}
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome {user?.name || 'Intern'}! 👋</h1>
          <p>Here's what's happening with your internship program today.</p>
          <Link to="/reports" className="btn btn-primary">
            View Report
          </Link>
        </div>
        <div style={{ fontSize: '4rem', opacity: 0.7 }}>
          🎓
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard 
          title="Total Interns" 
          value={statistics.totalInterns || 156} 
          change={12} 
          icon="👥" 
          color="teal"
        />
        <StatCard 
          title="Total Donations" 
          value={`$${(statistics.totalDonations || 5878).toLocaleString()}`} 
          change={8.5} 
          icon="💰" 
          color="sage-green"
        />
        <StatCard 
          title="Active Events" 
          value={statistics.activeEvents || 8} 
          change={-2} 
          icon="📅" 
          color="purple"
        />
        <StatCard 
          title="Achievements" 
          value={statistics.totalAchievements || 342} 
          change={15} 
          icon="🏆" 
          color="orange"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
                role="tab"
              >
                Overview
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'leaderboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('leaderboard')}
                role="tab"
              >
                Leaderboard
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
                role="tab"
              >
                Events
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-md-8">
                    <h3>Recent Activity & Analytics</h3>
                    <div className="card">
                      <div className="card-body">
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Monthly Donations Trend</h5>
                        <ChartComponent 
                          type="line" 
                          data={monthlyDonationsData} 
                          height="300px"
                        />
                      </div>
                    </div>
                    
                    <div className="row" style={{ marginTop: '1rem' }}>
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Department Distribution</h5>
                            <ChartComponent 
                              type="doughnut" 
                              data={departmentDistributionData} 
                              height="200px"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Performance Trend</h5>
                            <ChartComponent 
                              type="bar" 
                              data={performanceData} 
                              height="200px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h3>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <Link to="/reports" className="btn btn-primary">
                        📈 View Reports
                      </Link>
                      <Link to="/events" className="btn btn-secondary">
                        📅 Manage Events
                      </Link>
                      <Link to="/interns" className="btn btn-secondary">
                        👥 Add Intern
                      </Link>
                      <Link to="/rewards" className="btn btn-success">
                        🎁 Issue Rewards
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="tab-pane fade show active">
                <h3>Top Performing Interns</h3>
                {topInterns.map((intern, index) => (
                  <InternCard key={intern.id} intern={intern} rank={index + 1} />
                ))}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <Link to="/leaderboard" className="btn btn-primary">
                    View Full Leaderboard
                  </Link>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="tab-pane fade show active">
                <h3>Upcoming Events</h3>
                {events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <Link to="/events" className="btn btn-primary">
                    View All Events
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 