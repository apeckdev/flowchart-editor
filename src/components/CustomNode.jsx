import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import * as Icons from 'lucide-react';

export default function CustomNode({ data }) {
  const Icon = Icons[data.icon] || Icons.HelpCircle;
  const iconColor = data.iconColor || 'var(--primary)';
  const [label, setLabel] = useState(data.label);
  const [desc, setDesc] = useState(data.desc || '');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    data.label = e.target.value;
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    data.desc = e.target.value;
  };

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-indigo-500 !w-3 !h-3" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-indigo-500 !w-3 !h-3" />
      <div className="flex flex-col">
        <div className="node-header">
          <Icon size={20} style={{ color: iconColor, flexShrink: 0 }} />
          <input 
            value={label} 
            onChange={handleLabelChange} 
            className="nodrag" 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'inherit', 
              width: '100%', 
              outline: 'none', 
              fontWeight: 'inherit', 
              fontSize: 'inherit', 
              fontFamily: 'inherit',
              padding: 0,
              margin: 0
            }} 
          />
        </div>
        <div className="node-body">
          <textarea 
            value={desc} 
            onChange={handleDescChange} 
            className="nodrag" 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'inherit', 
              width: '100%', 
              outline: 'none', 
              resize: 'vertical', 
              minHeight: '40px', 
              fontSize: 'inherit', 
              fontFamily: 'inherit',
              padding: 0,
              margin: 0
            }} 
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-pink-500 !w-3 !h-3" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-pink-500 !w-3 !h-3" />
    </>
  );
}
