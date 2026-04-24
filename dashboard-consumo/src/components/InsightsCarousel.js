import React, { useState, useEffect } from 'react';

const InsightsCarousel = ({ data, avgFocus, avgScreenTime }) => {
  const [current, setCurrent] = useState(0);

  const insights = [
    { text: `Total de ${data.length} perfis analisados no dataset.`, icon: "📊" },
    { text: `Média de foco em ${avgFocus}/10. O ideal para ADS é acima de 7.`, icon: "🎯" },
    { text: avgScreenTime > 6 ? "Uso elevado: Risco de fadiga mental detectado." : "Consumo estável: Tempo de tela sob controle.", icon: "⚠️" },
    { text: "Vídeos curtos mostram correlação com menor tempo de sono.", icon: "🌙" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % insights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [insights.length]);

  return (
    <div style={{ 
      backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', 
      border: '1px solid #334155', minHeight: '200px', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center' 
    }}>
      <h3 style={{ color: '#94a3b8', marginBottom: '15px', fontSize: '12px', letterSpacing: '1px' }}>
        💡 KEY INSIGHTS {current + 1}/{insights.length}
      </h3>
      <div style={{ height: '80px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '24px' }}>{insights[current].icon}</span>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#f8fafc', margin: 0 }}>
          {insights[current].text}
        </p>
      </div>
      <div style={{ width: '100%', height: '2px', backgroundColor: '#334155', marginTop: '20px' }}>
        <div style={{ 
          width: `${((current + 1) / insights.length) * 100}%`, 
          height: '100%', backgroundColor: '#6366f1', transition: 'width 0.5s ease' 
        }} />
      </div>
    </div>
  );
};

export default InsightsCarousel;