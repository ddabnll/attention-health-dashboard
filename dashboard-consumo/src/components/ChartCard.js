import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="chart-card" style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;