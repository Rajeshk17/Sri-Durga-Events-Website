import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastColors = () => {
    switch (type) {
      case 'error':
        return {
          bg: '#2C1C1C',
          border: '#D9534F',
          icon: 'bi-exclamation-triangle-fill',
          iconColor: '#D9534F'
        };
      case 'info':
        return {
          bg: 'var(--luxury-navy-light)',
          border: 'var(--luxury-gold)',
          icon: 'bi-info-circle-fill',
          iconColor: 'var(--luxury-gold)'
        };
      case 'success':
      default:
        return {
          bg: '#1C2B21',
          border: '#28A745',
          icon: 'bi-check-circle-fill',
          iconColor: '#28A745'
        };
    }
  };

  const toastStyle = getToastColors();

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1060, marginTop: '70px' }}
    >
      <div
        className="toast show align-items-center text-white border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          backgroundColor: toastStyle.bg,
          borderLeft: `4px solid ${toastStyle.border}`,
          borderRadius: '4px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          minWidth: '280px',
          opacity: 0.95,
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center gap-3 py-3 px-4">
            <i 
              className={`bi ${toastStyle.icon} fs-5`} 
              style={{ color: toastStyle.iconColor }}
            ></i>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              {message}
            </span>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-3 m-auto"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
