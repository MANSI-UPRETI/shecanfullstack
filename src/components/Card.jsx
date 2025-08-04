import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  icon, 
  gradient = 'primary',
  animate = true,
  glass = false,
  ...props 
}) => {
  const gradientClasses = {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary',
    dark: 'bg-gradient-dark'
  };

  const cardClasses = [
    'card',
    animate ? 'animate-scale-in' : '',
    glass ? 'glass' : '',
    className
  ].filter(Boolean).join(' ');

  const headerClasses = [
    'card-header',
    gradientClasses[gradient] || gradientClasses.primary
  ].join(' ');

  return (
    <div className={cardClasses} {...props}>
      {(title || icon) && (
        <div className={headerClasses}>
          <div className="d-flex align-items-center">
            {icon && <span className="me-2 fs-4">{icon}</span>}
            <div>
              {title && <h5 className="mb-0">{title}</h5>}
              {subtitle && <small className="opacity-75">{subtitle}</small>}
            </div>
          </div>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card; 