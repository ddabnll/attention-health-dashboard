import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from './components/FilterBar';
import KPICard from './components/KPICard';
import ChartCard from './components/ChartCard';
import { Bar, Pie } from 'react-chartjs-2';
// Importe as outras dependências do Chart.js que você já usava aqui

const App = () => {
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(apiUrl)
      .then(res => setData(res.data))
      .catch(err => console.error("Erro ao buscar dados:", err));
  }, [apiUrl]);

  return (
    <div className="app-container" style={{ padding: '20px', backgroundColor: '#f4f7f6' }}>
      <h1>Attention Health Dashboard</h1>
      
      <FilterBar onFilterChange={(filter) => console.log(filter)} />

      <div className="kpi-grid" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <KPICard title="Total Users" value={data.length} icon="👥" />
        {/* Adicione outros KPICards conforme o Copilot sugeriu */}
      </div>

      <div className="charts-grid">
        <ChartCard title="Usage by Platform">
          {/* Aqui vai o seu componente de <Bar data={...} /> */}
        </ChartCard>
      </div>
    </div>
  );
};

export default App;