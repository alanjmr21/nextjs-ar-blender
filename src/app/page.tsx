"use client"

// pages/index.js
import React, { useState } from 'react';
import ThreeDCanvas from '../components/ThreeDCanvas';
import ARCanvas from '../components/ARCanvas';

const Home = () => {
  const [view, setView] = useState('white');

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {view === 'white' && <ThreeDCanvas backgroundColor="white" />}
      {view === 'camera' && <ARCanvas />}

      <button
        onClick={() => setView(view === 'white' ? 'camera' : 'white')}
        style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}
      >
        Toggle View
      </button>
    </div>
  );
};

export default Home;
