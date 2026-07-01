import React, { useState } from 'react';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer 
} from 'recharts';

// 1. Define the structural type for our analytics data items
interface DailyMetric {
  name: string;
  views: number;
  signups: number;
}

// 2. Mock Analytics Live Dataset
const initialData: DailyMetric[] = [
  { name: 'Mon', views: 2400, signups: 140 },
  { name: 'Tue', views: 1398, signups: 221 },
  { name: 'Wed', views: 9800, signups: 229 },
  { name: 'Thu', views: 3908, signups: 200 },
  { name: 'Fri', views: 4800, signups: 218 },
  { name: 'Sat', views: 3800, signups: 150 },
  { name: 'Sun', views: 4300, signups: 210 },
];

export default function App() {
  const [data, setData] = useState<DailyMetric[]>(initialData);

  // Simple function simulating a live data fetch update
  const refreshData = () => {
    const updated = data.map(item => ({
      ...item,
      views: Math.floor(item.views * (0.8 + Math.random() * 0.4)),
      signups: Math.floor(item.signups * (0.8 + Math.random() * 0.4))
    }));
    setData(updated);
  };

  // Simple Inline CSS Styles to bypass heavy CSS framework configurations
  const styles = {
    container: { padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    button: { padding: '10px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' as const },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' },
    card: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    title: { color: '#334155', marginBottom: '16px', fontSize: '18px' }
  };

  return (
    <div style={styles.container}>
      {/* Dashboard Top Navigation */}
      <header style={styles.header}>
        <div>
          <h1 style={{ color: '#0f172a', margin: 0 }}>Analytics Dashboard</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Live performance monitoring tracking key metrics</p>
        </div>
        <button style={styles.button} onClick={refreshData}>
          🔄 Fetch Live Data
        </button>
      </header>

      {/* Main Dashboard Layout Grid */}
      <main style={styles.grid}>
        {/* Chart 1: Traffic Overview (Bar Chart) */}
        <div style={styles.card}>
          <h3 style={styles.title}>Traffic Overview (Page Views)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" name="Page Views" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Conversion Metrics (Line Chart) */}
        <div style={styles.card}>
          <h3 style={styles.title}>User Conversions (Sign-ups)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="signups" name="New Sign-ups" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}