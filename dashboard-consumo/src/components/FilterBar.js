import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      gap: '15px',
      flexWrap: 'wrap',
    },
    title: {
      marginRight: 'auto',
      fontSize: '24px',
      fontWeight: '600',
      color: '#f8fafc',
    },
    select: {
      backgroundColor: '#1e293b',
      color: '#fff',
      border: '1px solid #334155',
      padding: '10px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    selectHover: {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.1)',
    },
  };

  const handleSelectChange = (filterName, value) => {
    onFilterChange({
      ...filters,
      [filterName]: value,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Attention Health Dashboard</h2>

      <select
        style={styles.select}
        value={filters.platform}
        onChange={(e) => handleSelectChange('platform', e.target.value)}
      >
        <option value="all">All Platforms</option>
        <option value="Instagram Reels">Instagram</option>
        <option value="TikTok">TikTok</option>
        <option value="YouTube Shorts">YouTube</option>
      </select>

      <select
        style={styles.select}
        value={filters.age}
        onChange={(e) => handleSelectChange('age', e.target.value)}
      >
        <option value="all">All Age Groups</option>
        <option value="young">Under 18</option>
        <option value="young_adult">19-28 Years</option>
        <option value="adult">28+ Years</option>
      </select>

      <select
        style={styles.select}
        value={filters.intensity}
        onChange={(e) => handleSelectChange('intensity', e.target.value)}
      >
        <option value="all">All Usage Levels</option>
        <option value="low">Low (&lt; 4h)</option>
        <option value="medium">Medium (4-8h)</option>
        <option value="high">High (&gt; 8h)</option>
      </select>
    </div>
  );
};

export default FilterBar;
