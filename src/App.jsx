import React, { useState } from 'react';
import { Presentation } from 'lucide-react';
import { flowcharts } from './flowcharts/data';
import FlowchartViewer from './components/FlowchartViewer';

function App() {
  const [activeChart, setActiveChart] = useState(flowcharts.basicProcess.id);

  const currentData = Object.values(flowcharts).find(f => f.id === activeChart);

  return (
    <div className="app-container">
      <div className="top-bar" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '12px 24px', 
        background: 'var(--surface)', 
        borderBottom: '1px solid var(--surface-border)',
        gap: '16px',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Presentation size={20} className="text-indigo-400" style={{ color: 'var(--primary)' }} />
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Presentation Graphics
          </h1>
        </div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Template:</label>
          <select 
            value={activeChart} 
            onChange={(e) => setActiveChart(e.target.value)}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--surface-border)', 
              color: 'var(--text-main)', 
              padding: '8px 12px', 
              borderRadius: '6px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {Object.values(flowcharts).map((chart) => (
              <option key={chart.id} value={chart.id} style={{ background: 'var(--bg-color)' }}>
                {chart.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {currentData && <FlowchartViewer data={currentData} key={currentData.id} />}
    </div>
  );
}

export default App;
