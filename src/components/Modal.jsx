import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  className = ''
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl'
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        style={{ 
          backgroundColor: 'rgba(28, 42, 82, 0.8)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`modal fade show d-block ${className}`}
        style={{ zIndex: 1055 }}
        tabIndex="-1"
      >
        <div className={`modal-dialog ${sizeClasses[size]} modal-dialog-centered animate-scale-in`}>
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
            {/* Header */}
            {title && (
              <div className="modal-header bg-gradient-primary text-white border-0">
                <h5 className="modal-title fw-bold">{title}</h5>
                {showCloseButton && (
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onClose}
                    aria-label="Close"
                  />
                )}
              </div>
            )}
            
            {/* Body */}
            <div className="modal-body p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal; 