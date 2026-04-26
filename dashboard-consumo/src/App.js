import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './App.css'; // ITEM 6: Sem inline styles

import FilterBar from './components/FilterBar';
import KPICard from './components/KPICard';
import ChartCard from './components/ChartCard';
import InsightsCarousel from './components/InsightsCarousel';
import { calculateAverage, getTrendlinePoints, buildChartData } from './utils/dashboardUtils';

import { Bar, Pie, Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const App = () => {
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [filters, setFilters] = useState({ platform: 'all', age: 'all', intensity: 'all' });

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL)
      .then(res => {
        setRawData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setFetchError("Ops! Erro ao carregar os dados.");
        setIsLoading(false);
      });
  }, []);

  // ITEM 2: Filtros reais
  const filteredRecords = useMemo(() => {
    return rawData.filter(record => {
      const isPlatformMatch = filters.platform === 'all' || record.platform === filters.platform;
      const isAgeMatch = filters.age === 'all' || record.age_group === filters.age;
      const isIntensityMatch = filters.intensity === 'all' || record.usage_level === filters.intensity;
      return isPlatformMatch && isAgeMatch && isIntensityMatch;
    });
  }, [rawData, filters]);

  // ITEM 1 & 8: Memorização de métricas e gráficos
  const stats = useMemo(() => ({
    avgScreenTime: calculateAverage(filteredRecords, 'daily_screen_time_hours'),
    avgFocus: calculateAverage(filteredRecords, 'attention_span_score'),
    trendline: getTrendlinePoints(filteredRecords),
    charts: buildChartData(filteredRecords, ['Instagram', 'TikTok', 'YouTube'])
  }), [filteredRecords]);

  if (isLoading) return <div className="status-screen">Loading dynamic data...</div>;
  if (fetchError) return <div className="status-screen error">{fetchError}</div>;

  return (
    <div className="app-container">
      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div className="kpi-row">
        <KPICard label="Avg Screen Time" value={stats.avgScreenTime} unit="h" color="#6366f1" />
        <KPICard label="Avg Focus Score" value={stats.avgFocus} unit="/10" color="#10b981" />
        <KPICard label="Total Sample" value={filteredRecords.length} unit="users" color="#f59e0b" />
      </div>

      <div className="dashboard-grid">
        <ChartCard title="Usage by Platform">
          <Pie data={stats.charts.pie} options={{ maintainAspectRatio: false }} />
        </ChartCard>

        <ChartCard title="Focus vs Screen Time (Real Trend)">
          <Scatter 
            data={{ datasets: [
              { label: 'Users', data: filteredRecords.map(r => ({ x: r.daily_screen_time_hours, y: r.attention_span_score })), backgroundColor: '#6366f1' },
              { type: 'line', label: 'Regression', data: stats.trendline, borderColor: '#f59e0b', borderWidth: 2, pointRadius: 0 }
            ]}} 
            options={{ maintainAspectRatio: false }} 
          />
        </ChartCard>

        <ChartCard title="Productivity by Platform">
          <Bar data={stats.charts.barProductivity} options={{ maintainAspectRatio: false }} />
        </ChartCard>

        <InsightsCarousel 
          data={filteredRecords} 
          avgFocus={stats.avgFocus} 
          avgScreenTime={stats.avgScreenTime} 
        />
      </div>
    </div>
  );
};

export default App;