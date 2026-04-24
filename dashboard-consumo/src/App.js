import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from './components/FilterBar';
import KPICard from './components/KPICard';
import ChartCard from './components/ChartCard';
import InsightsCarousel from './components/InsightsCarousel';
import { Bar, Pie, Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ platform: 'all', age: 'all', intensity: 'all' });
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(apiUrl).then(res => setData(res.data)).catch(err => console.error(err));
  }, [apiUrl]);

  const filteredData = data.filter(i => filters.platform === 'all' || (i.platform || "").includes(filters.platform));

  const getAvg = (p, f) => {
    const items = filteredData.filter(i => (i.platform || "").includes(p));
    return items.length ? (items.reduce((a, b) => a + (b[f] || 0), 0) / items.length).toFixed(2) : 0;
  };

  const platforms = ['Instagram', 'TikTok', 'YouTube'];
  
  // Definição correta das variáveis para evitar o erro 'not defined'
  const avgScreenTime = filteredData.length ? (filteredData.reduce((a, b) => a + (b.daily_screen_time_hours || 0), 0) / filteredData.length).toFixed(1) : 0;
  const avgFocus = filteredData.length ? (filteredData.reduce((a, b) => a + (b.attention_span_score || 0), 0) / filteredData.length).toFixed(1) : 0;

  const options = { maintainAspectRatio: false, plugins: { legend: { display: false } } };

  return (
    <div className="app-container" style={{ padding: '25px', backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <KPICard label="Average Screen Time" value={avgScreenTime} unit="h" color="#6366f1" />
        <KPICard label="Average Focus Score" value={avgFocus} unit="/10" color="#10b981" />
        <KPICard label="Total Sample" value={filteredData.length} unit="users" color="#f59e0b" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' }}>
        <ChartCard title="Usage by Platform">
          <Pie options={options} data={{ labels: platforms, datasets: [{ data: platforms.map(p => getAvg(p, 'daily_screen_time_hours')), backgroundColor: ['#6366f1', '#ec4899', '#f59e0b'], borderWidth: 0 }] }} />
        </ChartCard>

        <ChartCard title="Sleep Quality Trend">
          <Line options={options} data={{ labels: platforms, datasets: [{ data: platforms.map(p => getAvg(p, 'sleep_hours')), borderColor: '#818cf8', fill: true, tension: 0.4, backgroundColor: 'rgba(129, 140, 248, 0.1)' }] }} />
        </ChartCard>

        <ChartCard title="Productivity Rate">
          <Bar options={options} data={{ labels: platforms, datasets: [{ data: platforms.map(p => getAvg(p, 'task_completion_rate')), backgroundColor: '#10b981', borderRadius: 5 }] }} />
        </ChartCard>

        <ChartCard title="Stress Level Distribution">
          <Bar options={options} data={{ labels: ['Low', 'Med', 'High'], datasets: [{ data: ['Low', 'Medium', 'High'].map(l => filteredData.filter(i => i.stress_level === l).length), backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'], borderRadius: 5 }] }} />
        </ChartCard>

        <ChartCard title="Focus vs Screen Time">
          <Scatter 
            options={{ ...options, scales: { x: { display: true, grid: { color: '#334155' } }, y: { display: true, grid: { color: '#334155' } } } }} 
            data={{ datasets: [
              { type: 'scatter', label: 'Users', data: filteredData.map(i => ({ x: i.daily_screen_time_hours, y: i.attention_span_score })), backgroundColor: '#6366f1' },
              { type: 'line', label: 'Trend', data: [{ x: 0, y: 7 }, { x: 10, y: 3 }], borderColor: '#f59e0b', borderWidth: 1, pointRadius: 0, borderDash: [5, 5] }
            ]}} 
          />
        </ChartCard>

        <InsightsCarousel 
          data={filteredData} 
          avgFocus={avgFocus} 
          avgScreenTime={avgScreenTime} 
        />
      </div>
    </div>
  );
};

export default App;