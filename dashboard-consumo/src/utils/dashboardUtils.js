// Centralizando a lógica de cálculos e métricas
export const calculateAverage = (data, field) => {
  if (!data || data.length === 0) return 0;
  const total = data.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
  return (total / data.length).toFixed(1);
};

// Regressão Linear Real para a Trendline (Item 4)
export const getTrendlinePoints = (data) => {
  if (data.length < 2) return [];
  
  const n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  data.forEach(item => {
    const x = item.daily_screen_time_hours;
    const y = item.attention_span_score;
    sumX += x; sumY += y; sumXY += x * y; sumXX += x * x;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const minX = Math.min(...data.map(d => d.daily_screen_time_hours));
  const maxX = Math.max(...data.map(d => d.daily_screen_time_hours));

  return [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept }
  ];
};

// src/utils/dashboardUtils.js (Adicione ao final)

export const buildChartData = (filteredData, platforms) => {
  // Média por plataforma para os gráficos
  const getAvg = (platformName, field) => {
    const items = filteredData.filter(i => i.platform === platformName);
    return items.length ? (items.reduce((a, b) => a + b[field], 0) / items.length).toFixed(1) : 0;
  };

  return {
    pie: {
      labels: platforms,
      datasets: [{
        data: platforms.map(p => getAvg(p, 'daily_screen_time_hours')),
        backgroundColor: ['#6366f1', '#ec4899', '#f59e0b'],
        borderWidth: 0
      }]
    },
    barProductivity: {
      labels: platforms,
      datasets: [{
        label: 'Task Completion %',
        data: platforms.map(p => getAvg(p, 'task_completion_rate')),
        backgroundColor: '#10b981',
        borderRadius: 5
      }]
    }
  };
};