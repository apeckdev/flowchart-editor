import { MarkerType } from 'reactflow';

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#94a3b8',
  },
  style: { stroke: '#94a3b8', strokeWidth: 2 },
};

export const flowcharts = {
  basicProcess: {
    id: 'basicProcess',
    name: 'Basic Process Flow',
    description: 'A simple linear process from start to finish.',
    nodes: [
      { id: 'bp1', type: 'customNode', position: { x: 250, y: 50 }, data: { label: 'Start Process', icon: 'Play', desc: 'Initiate the workflow' } },
      { id: 'bp2', type: 'customNode', position: { x: 250, y: 200 }, data: { label: 'First Step', icon: 'Settings', desc: 'Perform initial processing' } },
      { id: 'bp3', type: 'customNode', position: { x: 250, y: 350 }, data: { label: 'Review', icon: 'Search', desc: 'Check the output' } },
      { id: 'bp4', type: 'customNode', position: { x: 250, y: 500 }, data: { label: 'Complete', icon: 'CheckCircle', desc: 'Process finished successfully' } },
    ],
    edges: [
      { id: 'ebp1-2', source: 'bp1', target: 'bp2', ...defaultEdgeOptions },
      { id: 'ebp2-3', source: 'bp2', target: 'bp3', ...defaultEdgeOptions },
      { id: 'ebp3-4', source: 'bp3', target: 'bp4', ...defaultEdgeOptions },
    ],
  },
  
  systemArchitecture: {
    id: 'systemArchitecture',
    name: 'System Architecture',
    description: 'A standard three-tier web application architecture.',
    nodes: [
      { id: 'sa1', type: 'customNode', position: { x: 250, y: 50 }, data: { label: 'Client Application', icon: 'Monitor', desc: 'Web browser or mobile app' } },
      { id: 'sa2', type: 'customNode', position: { x: 250, y: 200 }, data: { label: 'API Gateway', icon: 'Server', desc: 'Routes requests to backend services' } },
      { id: 'sa3', type: 'customNode', position: { x: 50, y: 350 }, data: { label: 'Auth Service', icon: 'Shield', desc: 'Handles authentication & authorization' } },
      { id: 'sa4', type: 'customNode', position: { x: 450, y: 350 }, data: { label: 'Data Service', icon: 'Database', desc: 'Manages application data' } },
      { id: 'sa5', type: 'customNode', position: { x: 450, y: 500 }, data: { label: 'Primary Database', icon: 'HardDrive', desc: 'Persistent storage' } },
    ],
    edges: [
      { id: 'esa1-2', source: 'sa1', target: 'sa2', ...defaultEdgeOptions },
      { id: 'esa2-3', source: 'sa2', target: 'sa3', ...defaultEdgeOptions, animated: false },
      { id: 'esa2-4', source: 'sa2', target: 'sa4', ...defaultEdgeOptions, animated: false },
      { id: 'esa4-5', source: 'sa4', target: 'sa5', ...defaultEdgeOptions },
    ],
  },

  decisionTree: {
    id: 'decisionTree',
    name: 'Decision Tree',
    description: 'A branching workflow based on conditional logic.',
    nodes: [
      { id: 'dt1', type: 'customNode', position: { x: 250, y: 50 }, data: { label: 'Receive Request', icon: 'Inbox', desc: 'Incoming customer request' } },
      { id: 'dt2', type: 'customNode', position: { x: 250, y: 200 }, data: { label: 'Valid Request?', icon: 'HelpCircle', desc: 'Check request validity' } },
      { id: 'dt3', type: 'customNode', position: { x: 50, y: 350 }, data: { label: 'Reject', icon: 'XCircle', desc: 'Return error to user' } },
      { id: 'dt4', type: 'customNode', position: { x: 450, y: 350 }, data: { label: 'Process', icon: 'Cpu', desc: 'Execute business logic' } },
      { id: 'dt5', type: 'customNode', position: { x: 450, y: 500 }, data: { label: 'Send Response', icon: 'Send', desc: 'Deliver results to user' } },
    ],
    edges: [
      { id: 'edt1-2', source: 'dt1', target: 'dt2', ...defaultEdgeOptions },
      { id: 'edt2-3', source: 'dt2', target: 'dt3', ...defaultEdgeOptions, label: 'No', style: { stroke: '#ef4444', strokeWidth: 2 } },
      { id: 'edt2-4', source: 'dt2', target: 'dt4', ...defaultEdgeOptions, label: 'Yes', style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'edt4-5', source: 'dt4', target: 'dt5', ...defaultEdgeOptions },
    ],
  },

  dataModel: {
    id: 'dataModel',
    name: 'Schema Data Model',
    description: 'Visualizing relational data structures.',
    nodes: [
      { 
        id: 'dm_user', 
        type: 'jsonNode', 
        position: { x: 50, y: 50 }, 
        data: { 
          title: 'User Object', 
          fields: [
            { id: 'u1', name: 'id', type: 'UUID', desc: 'Primary key' },
            { id: 'u2', name: 'username', type: 'String', desc: 'Unique display name' },
            { id: 'u3', name: 'email', type: 'String', desc: 'Contact email address' },
            { id: 'u4', name: 'profileId', type: 'UUID', desc: 'Foreign key to Profile' },
            { id: 'u5', name: 'createdAt', type: 'Timestamp', desc: 'Record creation time' }
          ]
        } 
      },
      { 
        id: 'dm_profile', 
        type: 'jsonNode', 
        position: { x: 450, y: 50 }, 
        data: { 
          title: 'Profile Object', 
          fields: [
            { id: 'p1', name: 'id', type: 'UUID', desc: 'Primary key' },
            { id: 'p2', name: 'firstName', type: 'String', desc: 'Given name' },
            { id: 'p3', name: 'lastName', type: 'String', desc: 'Family name' },
            { id: 'p4', name: 'avatarUrl', type: 'String', desc: 'Link to profile picture' }
          ]
        } 
      },
      { 
        id: 'dm_post', 
        type: 'jsonNode', 
        position: { x: 50, y: 350 }, 
        data: { 
          title: 'Post Object', 
          fields: [
            { id: 'po1', name: 'id', type: 'UUID', desc: 'Primary key' },
            { id: 'po2', name: 'authorId', type: 'UUID', desc: 'Foreign key to User' },
            { id: 'po3', name: 'content', type: 'String', desc: 'Post body text' },
            { id: 'po4', name: 'published', type: 'Boolean', desc: 'Visibility status' }
          ]
        } 
      }
    ],
    edges: [
      { id: 'edm_u_p', source: 'dm_user', sourceHandle: 'u4', target: 'dm_profile', targetHandle: 'p1', ...defaultEdgeOptions, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
      { id: 'edm_p_u', source: 'dm_post', sourceHandle: 'po2', target: 'dm_user', targetHandle: 'u1', ...defaultEdgeOptions, style: { stroke: '#3b82f6', strokeWidth: 2 } }
    ],
  }
};
