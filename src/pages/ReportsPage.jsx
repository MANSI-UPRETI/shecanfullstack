import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStatistics, getTopInterns, getEvents, getFallbackStatistics, getFallbackTopInterns, getFallbackEvents } from '../services/api';
import ChartComponent from '../components/ChartComponent';

const ReportsPage = () => {
  const [statistics, setStatistics] = useState({});
  const [topInterns, setTopInterns] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReport, setActiveReport] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, internsData, eventsData] = await Promise.all([
          getStatistics(),
          getTopInterns(),
          getEvents()
        ]);
        
        setStatistics(statsData);
        setTopInterns(internsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching report data:', error);
        // Fallback to mock data if API fails
        try {
          const [fallbackStats, fallbackInterns, fallbackEvents] = await Promise.all([
            getFallbackStatistics(),
            getFallbackTopInterns(),
            getFallbackEvents()
          ]);
          
          setStatistics(fallbackStats);
          setTopInterns(fallbackInterns);
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

  const ReportCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            fontSize: '2rem', 
            color: `var(--primary-${color})`,
            opacity: 0.8 
          }}>
            {icon}
          </div>
          <div>
            <h5 style={{ margin: 0, color: 'var(--text-primary)' }}>{title}</h5>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {value}
            </div>
            {subtitle && (
              <small style={{ color: 'var(--text-secondary)' }}>{subtitle}</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );

      // Reports chart data
    const monthlyDonationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Donations ($)',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 5878],
        backgroundColor: 'var(--primary-teal)',
        borderColor: 'var(--primary-teal)',
        borderWidth: 2
      }
    ]
  };

  const donationDistributionData = {
    labels: ['Individual Donations', 'Corporate Sponsors', 'Event Fundraising', 'Online Campaigns'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          'var(--primary-teal)',
          'var(--primary-sage-green)',
          'var(--primary-orange)',
          'var(--primary-purple)'
        ],
        borderWidth: 2,
        borderColor: 'var(--bg-card)'
      }
    ]
  };

  const internPerformanceData = {
    labels: topInterns.slice(0, 5).map(intern => intern.name),
    datasets: [
      {
        label: 'Donations ($)',
        data: topInterns.slice(0, 5).map(intern => intern.donations),
        backgroundColor: 'var(--primary-sage-green)',
        borderColor: 'var(--primary-sage-green)',
        borderWidth: 2
      }
    ]
  };

  const eventAttendanceData = {
    labels: events.slice(0, 6).map(event => event.title),
    datasets: [
      {
        label: 'Attendees',
        data: events.slice(0, 6).map(event => event.attendees || Math.floor(Math.random() * 50) + 10),
        backgroundColor: 'var(--primary-orange)',
        borderColor: 'var(--primary-orange)',
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
        <div>Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>📊 Reports & Analytics</h1>
          <Link to="/dashboard" className="btn btn-secondary">
            ← Back to Dashboard
          </Link>
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Comprehensive insights into your internship program performance
        </p>
      </div>

      {/* Report Navigation */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeReport === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveReport('overview')}
                role="tab"
              >
                Overview
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeReport === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveReport('performance')}
                role="tab"
              >
                Performance
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeReport === 'financial' ? 'active' : ''}`}
                onClick={() => setActiveReport('financial')}
                role="tab"
              >
                Financial
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeReport === 'events' ? 'active' : ''}`}
                onClick={() => setActiveReport('events')}
                role="tab"
              >
                Events
              </button>
            </li>
          </ul>

          <div className="tab-content" style={{ paddingTop: '2rem' }}>
            {/* Overview Report */}
            {activeReport === 'overview' && (
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-md-6">
                    <ReportCard
                      title="Total Interns"
                      value={statistics.totalInterns || 156}
                      subtitle="Active participants"
                      icon="👥"
                      color="teal"
                    />
                  </div>
                  <div className="col-md-6">
                    <ReportCard
                      title="Total Donations"
                      value={`$${(statistics.totalDonations || 5878).toLocaleString()}`}
                      subtitle="Funds raised"
                      icon="💰"
                      color="sage-green"
                    />
                  </div>
                  <div className="col-md-6">
                    <ReportCard
                      title="Active Events"
                      value={statistics.activeEvents || 8}
                      subtitle="Ongoing activities"
                      icon="📅"
                      color="purple"
                    />
                  </div>
                  <div className="col-md-6">
                    <ReportCard
                      title="Achievement Rate"
                      value={`${statistics.achievementRate || 85}%`}
                      subtitle="Success rate"
                      icon="🏆"
                      color="orange"
                    />
                  </div>
                </div>
                
                <div className="row" style={{ marginTop: '2rem' }}>
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Monthly Donations Trend</h5>
                        <ChartComponent 
                          type="bar" 
                          data={monthlyDonationsData} 
                          height="300px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Donation Distribution</h5>
                        <ChartComponent 
                          type="doughnut" 
                          data={donationDistributionData} 
                          height="300px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Report */}
            {activeReport === 'performance' && (
              <div className="tab-pane fade show active">
                <h3>Top Performing Interns</h3>
                <div className="row">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Top 5 Interns by Donations</h5>
                        <ChartComponent 
                          type="bar" 
                          data={internPerformanceData} 
                          height="300px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="table-responsive">
                      <table className="table" style={{ color: 'var(--text-primary)' }}>
                        <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Donations</th>
                            <th>Achievements</th>
                            <th>Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topInterns.map((intern, index) => (
                            <tr key={intern.id} style={{
                              background: 'white',
                              color: '#1a202c'
                            }}>
                              <td style={{ padding: '1rem', border: 'none' }}>
                                <span style={{
                                  background: index < 3 ? 'var(--primary-orange)' : 'var(--primary-teal)',
                                  color: 'white',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem',
                                  fontWeight: 'bold'
                                }}>
                                  #{index + 1}
                                </span>
                              </td>
                              <td style={{ padding: '1rem', border: 'none', fontWeight: '500' }}>{intern.name}</td>
                              <td style={{ padding: '1rem', border: 'none' }}>{intern.department || 'General'}</td>
                              <td style={{ padding: '1rem', border: 'none', fontWeight: 'bold', color: 'var(--primary-sage-green)' }}>
                                ${intern.donations.toLocaleString()}
                              </td>
                              <td style={{ padding: '1rem', border: 'none' }}>{intern.achievements || 0}</td>
                              <td style={{ padding: '1rem', border: 'none' }}>
                                <div style={{ width: '100px' }}>
                                  <div style={{
                                    width: `${intern.progress || 75}%`,
                                    height: '8px',
                                    background: 'var(--primary-sage-green)',
                                    borderRadius: '4px'
                                  }}></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Report */}
            {activeReport === 'financial' && (
              <div className="tab-pane fade show active">
                <h3>Financial Overview</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h5 style={{ color: 'var(--text-primary)' }}>Monthly Donations</h5>
                        <ChartComponent 
                          type="line" 
                          data={monthlyDonationsData} 
                          height="300px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h5 style={{ color: 'var(--text-primary)' }}>Donation Distribution</h5>
                        <ChartComponent 
                          type="doughnut" 
                          data={donationDistributionData} 
                          height="300px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Events Report */}
            {activeReport === 'events' && (
              <div className="tab-pane fade show active">
                <h3>Events Analysis</h3>
                <div className="row">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Event Attendance</h5>
                        <ChartComponent 
                          type="bar" 
                          data={eventAttendanceData} 
                          height="300px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row">
                      {events.map((event, index) => (
                        <div key={index} className="col-12">
                          <div className="card" style={{ marginBottom: '1rem' }}>
                            <div className="card-body">
                              <h6 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                {event.title}
                              </h6>
                              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                {event.date} • {event.location}
                              </p>
                              <div style={{
                                background: event.status === 'completed' ? 'var(--primary-sage-green)' : 'var(--primary-orange)',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                display: 'inline-block'
                              }}>
                                {event.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 