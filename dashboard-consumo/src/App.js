import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { 
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Legend, CartesianGrid, BarChart, Bar, LineChart, Line, Scatter, ComposedChart
} from 'recharts';

const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b'];
const stressMap = { "Low": 1, "Medium": 2, "High": 3 };

const App = () => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ platform: 'all', intensity: 'all', age: 'all' });

  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/dados-consumo/')
      .then(res => { setRawData(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredData = useMemo(() => {
    return rawData.filter(d => {
      const matchPlat = filters.platform === 'all' || d.platform === filters.platform;
      const matchAge = filters.age === 'all' || 
        (filters.age === 'young' && d.age <= 18) ||
        (filters.age === 'young_adult' && d.age > 18 && d.age <= 28) ||
        (filters.age === 'adult' && d.age > 28);
      const sTime = d.daily_screen_time_hours || 0;
      const matchInt = filters.intensity === 'all' ||
        (filters.intensity === 'low' && sTime < 4) ||
        (filters.intensity === 'medium' && sTime >= 4 && sTime <= 8) ||
        (filters.intensity === 'high' && sTime > 8);
      return matchPlat && matchAge && matchInt;
    });
  }, [rawData, filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return { screen: "0", focus: "0", completion: "0" };
    const n = filteredData.length;
    const totals = filteredData.reduce((acc, c) => ({
      s: acc.s + (Number(c.daily_screen_time_hours) || 0),
      f: acc.f + (Number(c.focus_level) || 0),
      c: acc.c + (Number(c.task_completion_rate) || 0)
    }), { s: 0, f: 0, c: 0 });
    return { screen: (totals.s/n).toFixed(1), focus: (totals.f/n).toFixed(1), completion: (totals.c/n).toFixed(1) };
  }, [filteredData]);

  const chartData = useMemo(() => {
    const platforms = [...new Set(filteredData.map(d => d.platform))].map(p => ({
      name: p, value: filteredData.filter(d => d.platform === p).length
    }));

    const buckets = [
      { label: '< 2h', min: 0, max: 2 }, { label: '2-4h', min: 2, max: 4 },
      { label: '4-6h', min: 4, max: 6 }, { label: '6h+', min: 6, max: 24 }
    ];

    const screenMetrics = buckets.map(b => {
      const g = filteredData.filter(d => d.daily_screen_time_hours >= b.min && d.daily_screen_time_hours < b.max);
      const n = g.length || 1;
      return {
        range: b.label,
        focus: parseFloat((g.reduce((a, c) => a + (c.focus_level || 0), 0) / n).toFixed(2)),
        completion: parseFloat((g.reduce((a, c) => a + (c.task_completion_rate || 0), 0) / n).toFixed(2))
      };
    });

    const stressPlat = [...new Set(filteredData.map(d => d.platform))].map(p => {
      const g = filteredData.filter(d => d.platform === p);
      const avgStress = g.reduce((a, c) => a + (stressMap[c.stress_level] || 0), 0) / (g.length || 1);
      return { name: p, stress: parseFloat(avgStress.toFixed(2)) };
    });

    const scatterRaw = filteredData.slice(0, 80).map(d => ({
      x: d.daily_screen_time_hours,
      y: d.task_completion_rate
    })).sort((a, b) => a.x - b.x);

    return { platforms, screenMetrics, stressPlat, scatterRaw };
  }, [filteredData]);

  const styles = {
    container: { backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: '#f8fafc', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' },
    mainGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginTop: '30px' },
    card: { 
      backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155',
      display: 'flex', flexDirection: 'column', minHeight: '340px' 
    },
    select: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', padding: '10px', borderRadius: '8px', marginRight: '15px', cursor: 'pointer' },
    insightItem: { marginBottom: '12px', paddingLeft: '15px', borderLeft: '3px solid #6366f1', fontSize: '13.5px', lineHeight: '1.5' }
  };

  if (loading) return <div style={{textAlign:'center', color:'#818cf8', marginTop:'20%'}}>Loading Dashboard Data...</div>;

  return (
    <div style={styles.container}>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '30px'}}>
        <h2 style={{marginRight: 'auto', fontSize: '24px', fontWeight: '600'}}>Attention Health Dashboard</h2>
        
        <select style={styles.select} value={filters.platform} onChange={e => setFilters({...filters, platform: e.target.value})}>
          <option value="all">All Platforms</option>
          <option value="Instagram Reels">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube Shorts">YouTube</option>
        </select>

        <select style={styles.select} value={filters.age} onChange={e => setFilters({...filters, age: e.target.value})}>
          <option value="all">All Age Groups</option>
          <option value="young">Under 18</option>
          <option value="young_adult">19-28 Years</option>
          <option value="adult">28+ Years</option>
        </select>

        <select style={styles.select} value={filters.intensity} onChange={e => setFilters({...filters, intensity: e.target.value})}>
          <option value="all">All Usage Levels</option>
          <option value="low">Low (&lt; 4h)</option>
          <option value="medium">Medium (4-8h)</option>
          <option value="high">High (&gt; 8h)</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
        <div style={{...styles.card, minHeight: 'auto'}}>
          <small style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Average Screen Time</small>
          <h1 style={{margin: '10px 0 0', fontSize: '32px'}}>{kpis.screen}h</h1>
        </div>
        <div style={{...styles.card, minHeight: 'auto'}}>
          <small style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Average Focus Score</small>
          <h1 style={{margin: '10px 0 0', color: '#10b981', fontSize: '32px'}}>{kpis.focus} <span style={{fontSize: '16px'}}>pts</span></h1>
        </div>
        <div style={{...styles.card, minHeight: 'auto'}}>
          <small style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Average Completion Rate</small>
          <h1 style={{margin: '10px 0 0', color: '#6366f1', fontSize: '32px'}}>{kpis.completion}%</h1>
        </div>
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.card}>
          <h4 style={{marginBottom: '20px', fontSize: '16px', fontWeight: '500'}}>Usage by Platform</h4>
          <div style={{flex: 1}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={chartData.platforms} innerRadius={55} outerRadius={75} dataKey="value" paddingAngle={5}>{chartData.platforms.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>
        </div>

        <div style={styles.card}>
          <h4 style={{marginBottom: '20px', fontSize: '16px', fontWeight: '500'}}>Average Focus by Screen Time</h4>
          <div style={{flex: 1}}><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData.screenMetrics}><CartesianGrid stroke="#334155" vertical={false} /><XAxis dataKey="range" stroke="#94a3b8" fontSize={12} label={{ value: 'Daily Usage', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }} /><YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={12} /><Tooltip contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155'}} /><Line name="Focus Level" type="monotone" dataKey="focus" stroke="#10b981" strokeWidth={3} dot={{r:4}} /></LineChart></ResponsiveContainer></div>
        </div>

        <div style={styles.card}>
          <h4 style={{marginBottom: '20px', fontSize: '16px', fontWeight: '500'}}>Completion Rate by Screen Time</h4>
          <div style={{flex: 1}}><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData.screenMetrics}><CartesianGrid stroke="#334155" vertical={false} /><XAxis dataKey="range" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} unit="%" /><Tooltip cursor={{fill:'#334155', opacity: 0.4}} /><Bar name="Completion" dataKey="completion" fill="#6366f1" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>
        </div>

        <div style={styles.card}>
          <h4 style={{marginBottom: '20px', fontSize: '16px', fontWeight: '500'}}>Average Stress Level</h4>
          <div style={{flex: 1}}><ResponsiveContainer width="100%" height="100%"><BarChart layout="vertical" data={chartData.stressPlat}><XAxis type="number" domain={[0, 3]} stroke="#94a3b8" hide /><YAxis dataKey="name" type="category" stroke="#f8fafc" width={100} fontSize={12} /><Tooltip /><Bar name="Stress Level" dataKey="stress" fill="#f43f5e" radius={[0,4,4,0]} barSize={25} /></BarChart></ResponsiveContainer></div>
        </div>

        <div style={styles.card}>
          <h4 style={{marginBottom: '20px', fontSize: '16px', fontWeight: '500'}}>Screen Time vs Completion Rate</h4>
          <div style={{flex: 1}}><ResponsiveContainer width="100%" height="100%"><ComposedChart data={chartData.scatterRaw} margin={{left: -20}}><CartesianGrid stroke="#334155" strokeDasharray="3 3" /><XAxis dataKey="x" type="number" stroke="#94a3b8" fontSize={11} unit="h" /><YAxis stroke="#94a3b8" fontSize={11} unit="%" /><Tooltip /><Scatter name="User Data" dataKey="y" fill="#f59e0b" /><Line name="Trendline" dataKey="y" stroke="#ffffff" strokeWidth={1} dot={false} opacity={0.3} /></ComposedChart></ResponsiveContainer></div>
        </div>

        <div style={{...styles.card, border: '2px solid #6366f1'}}>
          <h4 style={{color: '#818cf8', marginBottom: '20px', display: 'flex', alignItems: 'center', fontWeight: '600'}}>⚡ Key Insights</h4>
          <div style={styles.insightItem}>
            <strong>Critical Productivity:</strong> Heavy users (&gt;8h) show the lowest task completion rate.
          </div>
          <div style={styles.insightItem}>
            <strong>Stress Factor:</strong> TikTok leads the average stress level among the platforms analyzed.
          </div>
          <div style={styles.insightItem}>
            <strong>Focus Fatigue:</strong> Average focus level drops significantly after the first 2 hours of exposure.
          </div>
          <div style={{marginTop: 'auto', fontSize: '11px', color: '#64748b', textAlign: 'right'}}>Data based on 12,000+ records</div>
        </div>
      </div>
    </div>
  );
};

export default App;