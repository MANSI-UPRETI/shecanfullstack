import React, { useState, useEffect } from 'react';
import { getTopInterns, getFallbackTopInterns } from '../services/api';

const RewardsPage = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rewards');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [rewardForm, setRewardForm] = useState({
    type: 'achievement',
    points: 100,
    description: '',
    reason: ''
  });

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const data = await getTopInterns();
        // Add reward data to interns
        const internsWithRewards = data.map(intern => ({
          ...intern,
          points: Math.floor(Math.random() * 1000) + 100,
          achievements: intern.achievements || Math.floor(Math.random() * 10) + 1,
                     rewards: [
             { type: 'achievement', name: 'First Donation', points: 50, date: '2024-01-15' },
             { type: 'milestone', name: '1000 Points', points: 100, date: '2024-02-01' },
             { type: 'special', name: 'Top Performer', points: 200, date: '2024-02-15' },
             { type: 'achievement', name: 'Team Player', points: 75, date: '2024-01-20' },
             { type: 'milestone', name: '500 Points', points: 50, date: '2024-01-25' }
           ].slice(0, Math.floor(Math.random() * 3) + 1)
        }));
        setInterns(internsWithRewards);
      } catch (error) {
        console.error('Error fetching interns:', error);
        // Fallback to mock data if API fails
        try {
          const fallbackData = await getFallbackTopInterns();
          const internsWithRewards = fallbackData.map(intern => ({
            ...intern,
            points: Math.floor(Math.random() * 1000) + 100,
            achievements: intern.achievements || Math.floor(Math.random() * 10) + 1,
                       rewards: [
               { type: 'achievement', name: 'First Donation', points: 50, date: '2024-01-15' },
               { type: 'milestone', name: '1000 Points', points: 100, date: '2024-02-01' },
               { type: 'special', name: 'Top Performer', points: 200, date: '2024-02-15' },
               { type: 'achievement', name: 'Team Player', points: 75, date: '2024-01-20' },
               { type: 'milestone', name: '500 Points', points: 50, date: '2024-01-25' }
             ].slice(0, Math.floor(Math.random() * 3) + 1)
          }));
          setInterns(internsWithRewards);
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  const RewardCard = ({ reward }) => (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h6 style={{ margin: 0, color: 'var(--text-primary)' }}>{reward.name}</h6>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {reward.description || 'Achievement unlocked!'}
            </p>
            <small style={{ color: 'var(--text-muted)' }}>Earned on {reward.date}</small>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              background: reward.type === 'achievement' ? 'var(--primary-sage-green)' :
                         reward.type === 'milestone' ? 'var(--primary-teal)' : 'var(--primary-orange)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              {reward.type}
            </div>
            <div style={{ color: 'var(--primary-sage-green)', fontWeight: 'bold' }}>
              +{reward.points} pts
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InternRewardCard = ({ intern }) => (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              {intern.name.charAt(0)}
            </div>
            <div>
              <h6 style={{ margin: 0, color: 'var(--text-primary)' }}>{intern.name}</h6>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {intern.department || 'General'} • {intern.achievements?.length || 0}
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--primary-sage-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {intern.points} pts
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedIntern(intern);
                  setShowIssueModal(true);
                }}
              >
                Reward
              </button>
              <button className="btn btn-secondary btn-sm">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleIssueReward = () => {
    if (selectedIntern && rewardForm.description) {
      // Create new reward record
      const newReward = {
        type: rewardForm.type,
        name: rewardForm.description,
        points: rewardForm.points,
        date: new Date().toISOString().split('T')[0],
        reason: rewardForm.reason
      };
      
      console.log('Issuing reward:', newReward, 'to:', selectedIntern.name);
      
      // Clean up form state
      setRewardForm({
        type: 'achievement',
        points: 100,
        description: '',
        reason: ''
      });
      setShowIssueModal(false);
      setSelectedIntern(null);
    }
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
        <div>Loading rewards...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>🎁 Rewards System</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowIssueModal(true)}
          >
            + Issue Reward
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Manage rewards, points, and achievements for your interns
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row" style={{ marginBottom: '2rem' }}>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--primary-sage-green)', marginBottom: '0.25rem' }}>🏆</div>
              <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {interns.reduce((sum, i) => sum + (i.achievements?.length || 0), 0)}
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem' }}>Total</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--primary-teal)', marginBottom: '0.25rem' }}>⭐</div>
              <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {interns.reduce((sum, i) => sum + i.points, 0).toLocaleString()}
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem' }}>Points</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--primary-orange)', marginBottom: '0.25rem' }}>🎁</div>
              <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {interns.reduce((sum, i) => sum + i.rewards.length, 0)}
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem' }}>Issued</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', color: 'var(--primary-purple)', marginBottom: '0.25rem' }}>👥</div>
              <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{interns.length}</h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem' }}>Interns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'rewards' ? 'active' : ''}`}
                onClick={() => setActiveTab('rewards')}
                role="tab"
              >
                Intern Rewards
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'achievements' ? 'active' : ''}`}
                onClick={() => setActiveTab('achievements')}
                role="tab"
              >
                Achievements
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'leaderboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('leaderboard')}
                role="tab"
              >
                Points Leaderboard
              </button>
            </li>
          </ul>

          <div className="tab-content" style={{ paddingTop: '2rem' }}>
            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
              <div className="tab-pane fade show active">
                <h3>Intern Rewards & Points</h3>
                <div className="row">
                  {interns.map((intern, index) => (
                    <div key={intern.id || index} className="col-md-6 col-lg-4">
                      <InternRewardCard intern={intern} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="tab-pane fade show active">
                <h3>Recent Achievements</h3>
                <div className="row">
                  {interns.flatMap(intern => 
                    intern.rewards.map((reward, index) => (
                      <div key={`${intern.id}-${index}`} className="col-md-6 col-lg-4">
                        <RewardCard reward={reward} />
                      </div>
                    ))
                  ).slice(0, 9)}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="tab-pane fade show active">
                <h3>Points Leaderboard</h3>
                <div className="table-responsive">
                  <table className="table" style={{ color: 'var(--text-primary)' }}>
                    <thead style={{
                      background: 'var(--gradient-primary)',
                      color: 'white'
                    }}>
                      <tr>
                        <th style={{ padding: '1rem', border: 'none' }}>Rank</th>
                        <th style={{ padding: '1rem', border: 'none' }}>Name</th>
                        <th style={{ padding: '1rem', border: 'none' }}>Department</th>
                        <th style={{ padding: '1rem', border: 'none' }}>Points</th>
                        <th style={{ padding: '1rem', border: 'none' }}>Achievements</th>
                        <th style={{ padding: '1rem', border: 'none' }}>Rewards</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interns
                        .sort((a, b) => b.points - a.points)
                        .map((intern, index) => (
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
                              {intern.points.toLocaleString()}
                            </td>
                            <td style={{ padding: '1rem', border: 'none' }}>{intern.achievements}</td>
                            <td style={{ padding: '1rem', border: 'none' }}>{intern.rewards.length}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Issue Reward Modal */}
      {showIssueModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '500px', maxWidth: '90vw' }}>
            <div className="card-body">
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Issue Reward {selectedIntern && `to ${selectedIntern.name}`}
              </h4>
              
              {!selectedIntern && (
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Select Intern</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      const intern = interns.find(i => i.id === e.target.value);
                      setSelectedIntern(intern);
                    }}
                  >
                    <option value="">Choose an intern...</option>
                    {interns.map(intern => (
                      <option key={intern.id} value={intern.id}>
                        {intern.name} ({intern.department || 'General'})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Reward Type</label>
                <select
                  className="form-control"
                  value={rewardForm.type}
                  onChange={(e) => setRewardForm({...rewardForm, type: e.target.value})}
                >
                  <option value="achievement">Achievement</option>
                  <option value="milestone">Milestone</option>
                  <option value="special">Special Recognition</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Points</label>
                <input
                  type="number"
                  className="form-control"
                  value={rewardForm.points}
                  onChange={(e) => setRewardForm({...rewardForm, points: parseInt(e.target.value)})}
                  min="1"
                  max="1000"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={rewardForm.description}
                  onChange={(e) => setRewardForm({...rewardForm, description: e.target.value})}
                  placeholder="Enter reward description"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Reason (Optional)</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={rewardForm.reason}
                  onChange={(e) => setRewardForm({...rewardForm, reason: e.target.value})}
                  placeholder="Why is this reward being issued?"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowIssueModal(false);
                    setSelectedIntern(null);
                    setRewardForm({
                      type: 'achievement',
                      points: 100,
                      description: '',
                      reason: ''
                    });
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleIssueReward}
                  disabled={!selectedIntern || !rewardForm.description}
                >
                  Issue Reward
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage; 