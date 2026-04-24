import React from 'react';

const ChartCard = ({ title, children }) => (
  <div style={{ 
    backgroundColor: '#1e293b', 
    padding: '24px', 
    borderRadius: '16px', 
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <h3 style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px', textTransform: 'uppercase' }}>{title}</h3>
    <div style={{ height: '250px', width: '100%', position: 'relative' }}>
      {children}
    </div>
  </div>
);

export default ChartCard;