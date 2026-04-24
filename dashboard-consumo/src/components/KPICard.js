import React from 'react';

const KPICard = ({ label, value, unit, color }) => {
  const styles = {
    card: {
      backgroundColor: '#1e293b',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'auto',
    },
    label: {
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontSize: '12px',
      fontWeight: '600',
    },
    value: {
      margin: '10px 0 0',
      fontSize: '32px',
      fontWeight: '700',
      color: color || '#f8fafc',
    },
    unit: {
      fontSize: '16px',
      marginLeft: '8px',
    },
  };

  return (
    <div style={styles.card}>
      <small style={styles.label}>{label}</small>
      <h1 style={styles.value}>
        {value}
        <span style={styles.unit}>{unit}</span>
      </h1>
    </div>
  );
};

export default KPICard;
