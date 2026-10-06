import React, { useState } from 'react';
import { getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  selected,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [label, setLabel] = useState(data?.label || '');

  const onLabelChange = (evt) => {
    setLabel(evt.target.value);
    if (data) {
      data.label = evt.target.value;
    }
  };

  const showLabel = label !== '' || selected;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {showLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <input
              value={label}
              onChange={onLabelChange}
              placeholder="Label"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--surface-border)',
                borderRadius: '4px',
                color: 'var(--text-main)',
                padding: '2px 6px',
                fontSize: '12px',
                width: Math.max(50, label.length * 8 + 20) + 'px',
                textAlign: 'center',
                outline: 'none',
                backdropFilter: 'blur(4px)',
              }}
            />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
