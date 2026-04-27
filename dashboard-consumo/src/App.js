import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './App.css';
// IMPORTANTE: Adicionado Doughnut e Radar aqui para evitar erros de undefined
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import FilterBar from './components/FilterBar';
import KPICard from './components/KPICard';
import ChartCard from './components/ChartCard';
import InsightsCarousel from './components/InsightsCarousel';
import { calculateAverage, getChartsConfig } from './utils/dashboardUtils';

ChartJS.register(...registerables);

const App = () => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ platform: 'all', age: 'all', intensity: 'all' });

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL)
      .then(res => { setRawData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredRecords = useMemo(() => {
    return rawData.filter(r => {
      // 1. Filtro de Plataforma (Usando o mapeamento já criado no utils)
      const platformLower = r.platform?.toLowerCase() || "";
      const matchPlatform = filters.platform === 'all' || 
        platformLower.includes(filters.platform.toLowerCase());
      
      // 2. Filtro de Idade: Converte o número da API para as categorias do FilterBar
      const age = Number(r.age);
      let ageCategory = "";
      if (age < 18) ageCategory = "young";
      else if (age >= 18 && age <= 28) ageCategory = "young_adult";
      else ageCategory = "adult";

      const matchAge = filters.age === 'all' || ageCategory === filters.age;
      
      // 3. Filtro de Intensidade: Calculado com base nas horas (daily_screen_time_hours)
      const hours = Number(r.daily_screen_time_hours) || 0;
      let intensityCategory = "";
      if (hours < 4) intensityCategory = "low";
      else if (hours >= 4 && hours <= 8) intensityCategory = "medium";
      else intensityCategory = "high";

      const matchIntensity = filters.intensity === 'all' || intensityCategory === filters.intensity;

      return matchPlatform && matchAge && matchIntensity;
    });
  }, [rawData, filters]);

  const stats = useMemo(() => ({
    avgFocus: calculateAverage(filteredRecords, 'attention_span_score'),
    avgScreen: calculateAverage(filteredRecords, 'daily_screen_time_hours'),
    charts: getChartsConfig(filteredRecords)
  }), [filteredRecords]);

  if (loading) return <div className="status-screen">Loading...</div>;

  return (
    <div className="app-container">
      <FilterBar filters={filters} onFilterChange={setFilters} />
      
      <div className="kpi-row">
        <KPICard label="Avg Screen Time" value={stats.avgScreen} unit="h" color="#6366f1" />
        <KPICard label="Avg Focus Score" value={stats.avgFocus} unit="/10" color="#10b981" />
        <KPICard label="Total Sample" value={filteredRecords.length} unit="users" color="#f59e0b" />
      </div>

      <div className="dashboard-grid">
        <ChartCard title="Usage by Platform">
          <Doughnut data={stats.charts.usage} options={{ cutout: '70%', plugins: { legend: { display: true, position: 'bottom', labels: { color: '#94a3b8' } } } }} />
        </ChartCard>
        
        <ChartCard title="Sleep Quality Trend">
          <Line data={stats.charts.sleep} options={{ plugins: { legend: { display: false } } }} />
        </ChartCard>
        
        <ChartCard title="Productivity Rate">
          <Bar data={stats.charts.prod} options={{ plugins: { legend: { display: false } } }} />
        </ChartCard>
        
        <ChartCard title="Stress Distribution">
          <Bar data={stats.charts.stress} options={{ plugins: { legend: { display: false } } }} />
        </ChartCard>
        
        <ChartCard title="Mental Health Balance">
          <Radar 
            data={stats.charts.radar} 
            options={{ 
              layout: { padding: 30 }, // Adiciona espaço para as legendas não sumirem
              scales: { 
                r: { 
                  min: 0, max: 10,
                  grid: { color: '#334155' },
                  angleLines: { color: '#334155' },
                  pointLabels: { 
                    color: '#e2e8f0', // Cor clara para os nomes dos vértices
                    font: { size: 11, weight: '600' },
                    padding: 15
                  },
                  ticks: { display: false }
                } 
              },
              plugins: { legend: { display: false } }
            }} 
          />
        </ChartCard>

        <InsightsCarousel data={filteredRecords} avgFocus={stats.avgFocus} avgScreenTime={stats.avgScreen} />
      </div>
    </div>
  );
};

export default App;