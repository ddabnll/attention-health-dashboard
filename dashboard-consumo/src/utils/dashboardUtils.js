export const calculateAverage = (data, field) => {
  if (!data || data.length === 0) return 0;
  const total = data.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
  return (total / data.length).toFixed(1);
};

export const getChartsConfig = (filteredData) => {
  const platforms = ['Instagram Reels', 'TikTok', 'YouTube Shorts'];
  
  // Função que garante a comparação correta independente de como está no banco
  const cleanMatch = (dataValue, target) => {
    if (!dataValue) return false;
    return dataValue.toString().trim().toLowerCase() === target.toLowerCase();
  };

  const getAvg = (platformName, field) => {
    const items = filteredData.filter(i => cleanMatch(i.platform, platformName));
    
    if (items.length === 0) return 0;
    
    const total = items.reduce((a, b) => a + Number(b[field] || 0), 0);
    return (total / items.length).toFixed(1);
  };

  return {
    usage: { 
      labels: platforms, 
      datasets: [{ 
        data: platforms.map(p => getAvg(p, 'daily_screen_time_hours')), 
        backgroundColor: ['#6366f1', '#ec4899', '#f59e0b'], 
        borderWidth: 2, 
        borderColor: '#1e293b' 
      }] 
    },
    sleep: { 
      labels: platforms, 
      datasets: [{ 
        label: 'Sleep Hours', 
        data: platforms.map(p => getAvg(p, 'sleep_hours')), 
        borderColor: '#818cf8', 
        backgroundColor: 'rgba(129, 140, 248, 0.1)', 
        fill: true, 
        tension: 0.4 
      }] 
    },
    prod: { 
      labels: platforms, 
      datasets: [{ 
        label: 'Efficiency %', 
        data: platforms.map(p => getAvg(p, 'task_completion_rate')), 
        backgroundColor: '#10b981', 
        borderRadius: 5 
      }] 
    },
    stress: { 
      labels: ['Low', 'Medium', 'High'], 
      datasets: [{ 
        label: 'Users', 
        // Aqui também limpamos o stress_level
        data: ['Low', 'Medium', 'High'].map(l => 
          filteredData.filter(i => i.stress_level?.toString().trim().toLowerCase() === l.toLowerCase()).length
        ), 
        backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'], 
        borderRadius: 5 
      }] 
    },
    radar: {
      labels: ['Focus', 'Sleep', 'Tasks'], // Nomes mais curtos evitam cortes
      datasets: [{
        label: 'Balance',
        data: [
          calculateAverage(filteredData, 'attention_span_score'),
          calculateAverage(filteredData, 'sleep_hours'),
          (calculateAverage(filteredData, 'task_completion_rate') / 10).toFixed(1)
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#6366f1'
      }]
    }
  };
};