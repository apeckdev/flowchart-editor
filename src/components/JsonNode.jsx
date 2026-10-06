import React, { useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import { Plus, X } from 'lucide-react';

export default function JsonNode({ data, id, selected }) {
  const [title, setTitle] = useState(data.title || 'Object');
  const [fields, setFields] = useState(data.fields || []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    data.title = e.target.value;
  };

  const addField = () => {
    const newFields = [...fields, { id: Date.now().toString(), name: 'newField', type: 'String', desc: 'Description' }];
    setFields(newFields);
    data.fields = newFields;
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
    data.fields = newFields;
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    data.fields = newFields;
  };

  const titleColor = data.titleColor || 'var(--primary)';

  return (
    <div className="react-flow__node-customNode" style={{ padding: 0, overflow: 'hidden', minWidth: '260px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <NodeResizer 
        minWidth={260} 
        minHeight={150} 
        isVisible={selected} 
        handleStyle={{ width: '12px', height: '12px', borderRadius: '3px', background: titleColor, border: '1px solid var(--surface)' }} 
      />
      <Handle type="target" position={Position.Left} className="!bg-indigo-500 !w-3 !h-3" />
      <Handle type="target" position={Position.Top} className="!bg-indigo-500 !w-3 !h-3" id="top" />
      <Handle type="source" position={Position.Right} id="right-title" className="!bg-pink-500 !w-3 !h-3" style={{ top: '24px' }} />
      
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderBottom: '1px solid var(--surface-border)' }}>
        <input 
          value={title}
          onChange={handleTitleChange}
          className="nodrag"
          style={{ 
            background: 'transparent', border: 'none', color: titleColor, 
            width: '100%', outline: 'none', fontWeight: 'bold', fontSize: '1rem',
            textAlign: 'center', padding: 0, margin: 0
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {fields.map((field, index) => (
          <div key={field.id} style={{ position: 'relative', display: 'flex', borderBottom: '1px solid var(--surface-border)', padding: '8px 12px', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                <input 
                  value={field.name}
                  onChange={(e) => updateField(index, 'name', e.target.value)}
                  className="nodrag"
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', fontWeight: 600, flex: 1, minWidth: '50px', fontSize: '0.8rem', padding: 0, margin: 0 }}
                />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', flexShrink: 0 }}>:</span>
                <input 
                  value={field.type}
                  onChange={(e) => updateField(index, 'type', e.target.value)}
                  className="nodrag"
                  style={{ background: 'transparent', border: 'none', color: '#ec4899', outline: 'none', width: '90px', flexShrink: 0, fontSize: '0.8rem', padding: 0, margin: 0 }}
                />
              </div>
              <input 
                value={field.desc}
                onChange={(e) => updateField(index, 'desc', e.target.value)}
                className="nodrag"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', outline: 'none', width: '100%', fontSize: '0.75rem', padding: 0, margin: 0 }}
              />
            </div>
            
            <button onClick={() => removeField(index)} className="nodrag hide-on-export" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
              <X size={14} />
            </button>

            {/* Field Handle */}
            <Handle 
              type="source" 
              position={Position.Right} 
              id={field.id} 
              className="!bg-pink-500 !w-3 !h-3"
              style={{ top: '50%', right: '-6px' }}
            />
          </div>
        ))}
        
        <button 
          onClick={addField}
          className="nodrag hide-on-export"
          style={{ 
            background: 'transparent', border: 'none', color: 'var(--text-muted)', 
            padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            fontSize: '0.8rem', transition: 'color 0.2s', marginTop: 'auto'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <Plus size={14} /> Add Field
        </button>
      </div>
    </div>
  );
}
