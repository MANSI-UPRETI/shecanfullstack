import React from 'react';

const Reward = ({ amount, reward, isUnlocked, currentDonations, className = '' }) => {
  const progress = Math.min((currentDonations / amount) * 100, 100);
  
  const getRewardIcon = () => {
    if (isUnlocked) {
      return '🎉';
    }
    return '🔒';
  };

  const getRewardColor = () => {
    if (isUnlocked) {
      return 'border-success';
    }
    return 'border-secondary';
  };

  const getProgressColor = () => {
    if (isUnlocked) {
      return 'bg-success';
    }
    if (progress > 50) {
      return 'bg-warning';
    }
    return 'bg-primary';
  };

  return (
    <div className={`card h-100 ${getRewardColor()} ${className} animate-scale-in`}>
      <div className="card-body text-center p-4">
        <div className="mb-3">
          <span 
            className="display-4"
            style={{
              filter: isUnlocked ? 'none' : 'grayscale(100%) opacity(0.6)',
              transition: 'all var(--transition-normal)'
            }}
          >
            {getRewardIcon()}
          </span>
        </div>
        
        <h5 className={`card-title fw-bold mb-2 ${isUnlocked ? 'text-success' : 'text-muted'}`}>
          {reward}
        </h5>
        
        <p className="card-text mb-3">
          <strong className="fs-5" style={{ color: 'var(--primary-navy-blue)' }}>
            ₹{amount.toLocaleString()}
          </strong>
        </p>
        
        <div className="progress mb-3" style={{ height: '10px' }}>
          <div 
            className={`progress-bar ${getProgressColor()}`}
            style={{ 
              width: `${progress}%`,
              transition: 'width var(--transition-slow)'
            }}
          />
        </div>
        
        <small className={`fw-medium ${isUnlocked ? 'text-success' : 'text-muted'}`}>
          {isUnlocked ? (
            <span className="d-flex align-items-center justify-content-center">
              <span className="me-1">✅</span> Unlocked!
            </span>
          ) : (
            `${progress.toFixed(1)}% Complete`
          )}
        </small>
        
        {/* Unlock animation overlay */}
        {isUnlocked && (
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              background: 'linear-gradient(135deg, rgba(192, 215, 192, 0.1), rgba(70, 150, 166, 0.1))',
              pointerEvents: 'none',
              borderRadius: '16px'
            }}
          >
            <div className="animate-pulse">
              <span className="fs-1">✨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reward; 