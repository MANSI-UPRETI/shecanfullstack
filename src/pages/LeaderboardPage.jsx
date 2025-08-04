import React, { useState, useEffect } from 'react';
import { getTopInterns, getFallbackTopInterns } from '../services/api';
import Card from '../components/Card';

const LeaderboardPage = ({ currentUser }) => {
  const [topInterns, setTopInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopInterns = async () => {
      setLoading(true);
      try {
        const data = await getTopInterns();
        setTopInterns(data);
      } catch (error) {
        console.error('Error fetching top interns:', error);
        // Fallback to mock data if API fails
        try {
          const fallbackData = await getFallbackTopInterns();
          setTopInterns(fallbackData);
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTopInterns();
  }, []);

      // Default leaderboard data
    const fallbackData = [
    { id: 'mansi', name: 'Mansi Upreti', referral: 'mansi2025', donations: 7500 },
    { id: 'rohan', name: 'Rohan Sharma', referral: 'rohan2025', donations: 6200 },
    { id: 'priya', name: 'Priya Patel', referral: 'priya2025', donations: 5800 },
    { id: 'arjun', name: 'Arjun Singh', referral: 'arjun2025', donations: 5200 },
    { id: 'neha', name: 'Neha Gupta', referral: 'neha2025', donations: 4800 }
  ];

  const data = topInterns.length > 0 ? topInterns : fallbackData;

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-3"></div>
          <p className="text-muted">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <Card 
            className="text-white animate-fade-in-up"
            gradient="primary"
          >
            <div className="text-center py-4">
              <h1 className="display-5 fw-bold mb-2">🏆 Top Interns Leaderboard</h1>
              <p className="lead mb-0">See who's leading the fundraising challenge!</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="row">
        <div className="col-12">
          <Card 
            title="📊 Current Rankings"
            icon="🏅"
            gradient="dark"
            className="animate-fade-in-left"
          >
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '80px' }}>Rank</th>
                    <th>Intern Name</th>
                    <th>Referral Code</th>
                    <th className="text-end">Total Donations</th>
                    <th className="text-center">Rewards</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((intern, index) => {
                    const isCurrentUser = intern.id === currentUser;
                    const rank = index + 1;
                    
                    // Calculate achievement rewards
                    const rewardsUnlocked = [
                      intern.donations >= 5000 ? '👕' : null,
                      intern.donations >= 10000 ? '📜' : null,
                      intern.donations >= 15000 ? '🏅' : null
                    ].filter(Boolean);

                    return (
                      <tr 
                        key={intern.id} 
                        className={isCurrentUser ? 'table-warning fw-bold' : ''}
                      >
                        <td className="text-center">
                          {rank === 1 && <span className="badge badge-warning fs-6">🥇</span>}
                          {rank === 2 && <span className="badge badge-secondary fs-6">🥈</span>}
                          {rank === 3 && <span className="badge" style={{ backgroundColor: '#cd7f32', color: 'white' }}>🥉</span>}
                          {rank > 3 && <span className="badge bg-light text-dark">#{rank}</span>}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {isCurrentUser && <span className="me-2">👤</span>}
                            <span className={isCurrentUser ? 'text-primary' : ''}>
                              {intern.name}
                            </span>
                            {isCurrentUser && <span className="badge badge-primary ms-2">You</span>}
                          </div>
                        </td>
                        <td>
                          <code className="bg-light px-2 py-1 rounded">{intern.referral}</code>
                        </td>
                        <td className="text-end">
                          <span className="fw-bold text-success">
                            ₹{intern.donations.toLocaleString()}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-1">
                            {rewardsUnlocked.length > 0 ? (
                              rewardsUnlocked.map((reward, idx) => (
                                <span key={idx} className="fs-5" title="Reward Unlocked">
                                  {reward}
                                </span>
                              ))
                            ) : (
                              <span className="text-muted">🔒</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row mt-4">
        <div className="col-md-4">
          <Card 
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="card-body">
              <h4 className="text-warning mb-3">🥇</h4>
              <h5 className="card-title fw-bold">{data[0]?.name || 'No Data'}</h5>
              <p className="card-text text-success fw-bold fs-4">
                ₹{data[0]?.donations?.toLocaleString() || '0'}
              </p>
              <small className="text-muted">Top Performer</small>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card 
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="card-body">
              <h4 className="text-primary mb-3">📊</h4>
              <h5 className="card-title fw-bold">{data.length}</h5>
              <p className="card-text fw-bold fs-4" style={{ color: 'var(--primary-teal)' }}>
                ₹{data.reduce((sum, intern) => sum + (intern.donations || 0), 0).toLocaleString()}
              </p>
              <small className="text-muted">Total Participants & Donations</small>
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card 
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="card-body">
              <h4 className="text-success mb-3">🎯</h4>
              <h5 className="card-title fw-bold">
                {data.filter(intern => intern.donations >= 15000).length}
              </h5>
              <p className="card-text fw-bold">Goal Achievers</p>
              <small className="text-muted">₹15,000+ Raised</small>
            </div>
          </Card>
        </div>
      </div>

      {/* Current User Highlight */}
      {currentUser && data.find(intern => intern.id === currentUser) && (
        <div className="row mt-4">
          <div className="col-12">
            <Card 
              className="animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="alert alert-info mb-0">
                <div className="d-flex align-items-center">
                  <span className="fs-4 me-3">🎯</span>
                  <div>
                    <h5 className="mb-1 fw-bold">Your Current Position</h5>
                    <p className="mb-0">
                      You're currently ranked #{data.findIndex(intern => intern.id === currentUser) + 1} 
                      with ₹{data.find(intern => intern.id === currentUser)?.donations?.toLocaleString()} raised!
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage; 