import React, { useRef, useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, ReactFlowProvider, MarkerType } from 'reactflow';
import { toPng } from 'html-to-image';
import { Download, PlusSquare, FileText, Settings, Database, Activity, Palette } from 'lucide-react';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import JsonNode from './JsonNode';

const nodeTypes = {
  customNode: CustomNode,
  jsonNode: JsonNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

function FlowchartInner({ data }) {
  const ref = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
  const [activeEdgeColor, setActiveEdgeColor] = useState('#94a3b8');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      type: 'customEdge', 
      style: { stroke: activeEdgeColor, strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: activeEdgeColor }
    }, eds)),
    [setEdges, activeEdgeColor]
  );

  useEffect(() => {
    setNodes(data.nodes);
    setEdges(data.edges.map(e => ({ ...e, type: e.type || 'customEdge' })));
  }, [data, setNodes, setEdges]);

  const onDownload = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    // Temporarily hide controls, attribution, handles, and UI overlays for export
    const elementsToHide = ref.current.querySelectorAll('.react-flow__controls, .react-flow__minimap, .react-flow__attribution, .react-flow__background, .react-flow__handle, .hide-on-export, .react-flow__resize-control');
    elementsToHide.forEach(el => el.style.display = 'none');

    toPng(ref.current, {
      backgroundColor: 'transparent',
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
      style: {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      },
    })
      .then((dataUrl) => {
        const a = document.createElement('a');
        a.setAttribute('download', `${data.id}.png`);
        a.setAttribute('href', dataUrl);
        a.click();
      })
      .catch((err) => {
        console.error('Oops, something went wrong!', err);
      })
      .finally(() => {
        elementsToHide.forEach(el => el.style.display = '');
      });
  }, [data.id]);

  const addNode = (iconName, defaultLabel) => {
    setNodes((nds) => [
      ...nds,
      {
        id: `node_${Date.now()}`,
        type: 'customNode',
        position: { x: Math.random() * 100 + 50, y: Math.random() * 100 + 50 },
        data: { label: defaultLabel, icon: iconName, desc: 'Description...' },
      },
    ]);
  };

  const addJsonNode = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `node_${Date.now()}`,
        type: 'jsonNode',
        position: { x: Math.random() * 100 + 50, y: Math.random() * 100 + 50 },
        data: { 
          title: 'New Object', 
          fields: [{ id: Date.now().toString(), name: 'id', type: 'String', desc: 'Unique identifier' }] 
        },
      },
    ]);
  };

  const applyColorToSelectedEdges = (color) => {
    setActiveEdgeColor(color);
    setEdges((eds) => eds.map(e => {
      if (e.selected) {
        const newMarkerEnd = e.markerEnd ? { ...e.markerEnd, color } : undefined;
        return { ...e, style: { ...e.style, stroke: color }, markerEnd: newMarkerEnd };
      }
      return e;
    }));
  };

  const toggleSelectedEdgeArrow = () => {
    setEdges(eds => eds.map(e => {
      if (e.selected) {
        if (e.markerEnd) {
          return { ...e, markerEnd: undefined };
        } else {
          return { ...e, markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: e.style?.stroke || activeEdgeColor } };
        }
      }
      return e;
    }));
  };

  const toggleSelectedEdgeDotted = () => {
    setEdges(eds => eds.map(e => {
      if (e.selected) {
        const isDotted = e.style?.strokeDasharray === '5,5';
        return { ...e, style: { ...e.style, strokeDasharray: isDotted ? 'none' : '5,5' } };
      }
      return e;
    }));
  };

  const updateSelectedNode = (key, value) => {
    setNodes((nds) => nds.map(n => {
      if (n.selected) {
        return {
          ...n,
          data: { ...n.data, [key]: value }
        };
      }
      return n;
    }));
  };

  const selectedNode = nodes.find(n => n.selected);
  const selectedEdge = edges.find(e => e.selected);

  const colors = [
    { name: 'Default', value: '#94a3b8' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Rose', value: '#f43f5e' }
  ];

  return (
    <div style={{ display: 'flex', width: '100%', flex: 1, overflow: 'hidden' }}>
      {/* Sidebar Controls */}
      <div style={{ width: '250px', borderRight: '1px solid var(--surface-border)', background: 'var(--surface)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 10 }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--text-main)' }}>Add Nodes</h3>
        
        <button className="nav-btn" onClick={() => addNode('FileText', 'Requirement')}>
          <FileText size={18} className="text-indigo-400" /> Requirement
        </button>
        <button className="nav-btn" onClick={() => addNode('Settings', 'Process')}>
          <Settings size={18} className="text-indigo-400" /> Process
        </button>
        <button className="nav-btn" onClick={() => addNode('Database', 'Storage')}>
          <Database size={18} className="text-indigo-400" /> Storage
        </button>
        <button className="nav-btn" onClick={() => addNode('Activity', 'Action')}>
          <Activity size={18} className="text-indigo-400" /> Action
        </button>
        <button className="nav-btn" onClick={() => addNode('PlusSquare', 'Custom Node')}>
          <PlusSquare size={18} className="text-indigo-400" /> Custom
        </button>
        <button className="nav-btn" onClick={addJsonNode} style={{ border: '1px dashed var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
          <FileText size={18} className="text-indigo-400" /> JSON Object
        </button>

        <h3 style={{ fontSize: '1rem', marginTop: '16px', marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Palette size={16} /> Edge Color
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'center' }}>
          {colors.map(c => (
            <button
              key={c.value}
              onClick={() => applyColorToSelectedEdges(c.value)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: c.value,
                border: activeEdgeColor === c.value ? '2px solid white' : '2px solid transparent',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                padding: 0
              }}
              title={c.name}
            />
          ))}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid transparent',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
            title="Custom Color"
          >
            <input 
              type="color" 
              value={activeEdgeColor} 
              onChange={(e) => applyColorToSelectedEdges(e.target.value)}
              style={{
                width: '150%',
                height: '150%',
                padding: 0,
                margin: '-25%',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {selectedNode && (
          <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '16px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)' }}>Selected Node</h3>
            
            {selectedNode.type !== 'jsonNode' && (
              <>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Icon</label>
                <select 
                  value={selectedNode.data.icon || 'HelpCircle'}
                  onChange={(e) => updateSelectedNode('icon', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--surface-border)',
                    color: 'var(--text-main)',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    outline: 'none'
                  }}
                >
                  <option value="FileText" style={{background: 'var(--bg-color)'}}>FileText</option>
                  <option value="Settings" style={{background: 'var(--bg-color)'}}>Settings</option>
                  <option value="Database" style={{background: 'var(--bg-color)'}}>Database</option>
                  <option value="Activity" style={{background: 'var(--bg-color)'}}>Activity</option>
                  <option value="PlusSquare" style={{background: 'var(--bg-color)'}}>PlusSquare</option>
                  <option value="CheckCircle" style={{background: 'var(--bg-color)'}}>CheckCircle</option>
                  <option value="AlertTriangle" style={{background: 'var(--bg-color)'}}>AlertTriangle</option>
                  <option value="Webhook" style={{background: 'var(--bg-color)'}}>Webhook</option>
                  <option value="RefreshCw" style={{background: 'var(--bg-color)'}}>RefreshCw</option>
                  <option value="UserSearch" style={{background: 'var(--bg-color)'}}>UserSearch</option>
                  <option value="Box" style={{background: 'var(--bg-color)'}}>Box</option>
                  <option value="Link" style={{background: 'var(--bg-color)'}}>Link</option>
                  <option value="Code" style={{background: 'var(--bg-color)'}}>Code</option>
                  <option value="Asterisk" style={{background: 'var(--bg-color)'}}>Asterisk</option>
                  <option value="Server" style={{background: 'var(--bg-color)'}}>Server</option>
                  <option value="PieChart" style={{background: 'var(--bg-color)'}}>PieChart</option>
                  <option value="AlignLeft" style={{background: 'var(--bg-color)'}}>AlignLeft</option>
                  <option value="FileEdit" style={{background: 'var(--bg-color)'}}>FileEdit</option>
                  <option value="List" style={{background: 'var(--bg-color)'}}>List</option>
                </select>
              </>
            )}

            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              {selectedNode.type === 'jsonNode' ? 'Title Color' : 'Icon Color'}
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid transparent',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                <input 
                  type="color" 
                  value={selectedNode.type === 'jsonNode' ? (selectedNode.data.titleColor || '#6366f1') : (selectedNode.data.iconColor || '#6366f1')} 
                  onChange={(e) => updateSelectedNode(selectedNode.type === 'jsonNode' ? 'titleColor' : 'iconColor', e.target.value)}
                  style={{
                    width: '150%',
                    height: '150%',
                    padding: 0,
                    margin: '-25%',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {selectedEdge && (
          <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '16px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)' }}>Selected Edge</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <button 
                onClick={toggleSelectedEdgeArrow}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--text-main)',
                  padding: '6px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Toggle Arrow
              </button>
              <button 
                onClick={toggleSelectedEdgeDotted}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--text-main)',
                  padding: '6px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Toggle Dotted
              </button>
            </div>
          </div>
        )}
        
        <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            <strong>Tips:</strong><br />
            • Click node text to edit.<br />
            • Drag between dots to connect.<br />
            • Click an edge text to edit.<br />
            • Select an edge or node and press <strong>Backspace</strong> to delete.
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div className="toolbar" style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
          <button className="action-btn" onClick={onDownload}>
            <Download size={16} /> Export to PNG
          </button>
        </div>
        <div style={{ width: '100%', height: '100%' }} ref={ref}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{ type: 'customEdge', style: { stroke: '#94a3b8', strokeWidth: 2 } }}
            fitView
            attributionPosition="bottom-left"
            minZoom={0.2}
            deleteKeyCode={['Backspace', 'Delete']}
          >
            <Background color="rgba(255, 255, 255, 0.1)" gap={16} />
            <Controls />
            <MiniMap 
              nodeColor={(node) => 'var(--primary)'}
              maskColor="rgba(0,0,0,0.5)"
              style={{ backgroundColor: 'var(--surface)' }}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function FlowchartViewer(props) {
  return (
    <ReactFlowProvider>
      <FlowchartInner {...props} />
    </ReactFlowProvider>
  );
}
