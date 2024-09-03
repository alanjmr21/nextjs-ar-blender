"use client"

import React, { useState } from 'react';
import ModelViewer from '@/components/ModelViewer'
import ARScene from '@/components/ARScene'

export default function Home() {
  const [viewAR, setViewAR] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ width: '100vw', height: '100vh' }}>
      {viewAR ? (
        <ARScene />
      ) : (
        <ModelViewer />
      )}
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => setViewAR(!viewAR)}
      >
        {viewAR ? 'Back to 3D View' : 'View in AR'}
      </button>
    </div>
    </div>
  );
}
