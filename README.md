# Presentation Graphics (Flowchart Viewer)

A dynamic flowchart and diagram visualization tool built with React and Vite. It leverages React Flow to provide an interactive canvas for mapping out processes, system architectures, data models, and more.

## Features

- **Interactive Canvas**: Drag-and-drop nodes, connect them with customizable edges, and seamlessly navigate around large diagrams.
- **Custom Nodes**: Create custom flowchart elements with unique icons, labels, descriptions, and colors.
- **JSON Nodes**: Visualize complex JSON data models or schemas visually, with dedicated fields and property types.
- **Horizontal & Vertical Linking**: Link nodes using left, right, top, and bottom handles to build complex, directional workflows.
- **Customizable Edges**: Change edge colors, toggle direction arrows, and switch to dotted lines to differentiate connections.
- **Export Capabilities**: Easily export your flowchart designs to PNG directly from the interface.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Development

To start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

To build the application for production:

```bash
npm run build
```

## Built With

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool & Dev Server
- [React Flow](https://reactflow.dev/) - Node-based UI building block
- [Lucide React](https://lucide.dev/) - Iconography
- [html-to-image](https://github.com/bubkoo/html-to-image) - Canvas exporting
