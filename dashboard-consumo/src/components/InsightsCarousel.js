import React, { useState, useEffect } from 'react';

const InsightsCarousel = ({ data, avgFocus, avgScreenTime }) => {
  const [current, setCurrent] = useState(0);

  // Mensagens traduzidas e ajustadas para um contexto profissional
  const insights = [
    { 
      text: `Dataset analysis complete: ${data.length} user profiles processed.`, 
      icon: "📊" 
    },
    { 
      text: `Average Focus Score at ${avgFocus}/10. Healthy threshold is above 7.0.`, 
      icon: "🎯" 
    },
    { 
      text: parseFloat(avgScreenTime) > 6 
        ? "High usage detected: Potential risk of mental fatigue and focus loss." 
        : "Balanced consumption: Screen time is within productivity limits.", 
      icon: "⚠️" 
    },
    { 
      text: "Data suggests short-form video content correlates with lower sleep quality.", 
      icon: "🌙" 
    },
    { 
      text: "Stress levels tend to spike after the 4th hour of continuous digital exposure.", 
      icon: "🧠" 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % insights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [insights.length]);

  return (
    <div className="insight-card" style={{ 
      backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', 
      border: '1px solid #334155', minHeight: '220px', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center' 
    }}>
      <h3 style={{ color: '#94a3b8', marginBottom: '15px', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
        💡 Key Insights {current + 1}/{insights.length}
      </h3>
      <div style={{ height: '80px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '28px' }}>{insights[current].icon}</span>
        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#f8fafc', margin: 0 }}>
          {insights[current].text}
        </p>
      </div>
      <div style={{ width: '100%', height: '3px', backgroundColor: '#334155', marginTop: '20px', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${((current + 1) / insights.length) * 100}%`, 
          height: '100%', backgroundColor: '#6366f1', transition: 'width 0.6s ease-in-out' 
        }} />
      </div>
    </div>
  );
};

export default InsightsCarousel;