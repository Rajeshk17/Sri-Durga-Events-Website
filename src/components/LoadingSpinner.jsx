import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading Elegance...' }) => {
  const getSpinnerDimensions = () => {
    switch (size) {
      case 'small':
        return { width: '1.5rem', height: '1.5rem' };
      case 'large':
        return { width: '4rem', height: '4rem' };
      case 'medium':
      default:
        return { width: '2.5rem', height: '2.5rem' };
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div 
        className="spinner-border text-gold" 
        role="status" 
        style={{ 
          ...getSpinnerDimensions(),
          borderWidth: '3px',
          color: 'var(--luxury-gold)'
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && (
        <p className="mt-3 text-gold tracking-widest text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
