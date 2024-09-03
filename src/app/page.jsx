"use client"

// // pages/index.js
// import React, { useState } from 'react';
// import ThreeDCanvas from '../components/ThreeDCanvas';
// import ARCanvas from '../components/ARCanvas';

// const Home = () => {
//   const [view, setView] = useState('white');

//   return (
//     <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
//       {view === 'white' && <ThreeDCanvas backgroundColor="white" />}
//       {view === 'camera' && <ARCanvas />}

//       <button
//         onClick={() => setView(view === 'white' ? 'camera' : 'white')}
//         style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}
//       >
//         Toggle View
//       </button>
//     </div>
//   );
// };

// export default Home;

// pages/index.js
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Head from 'next/head';
import ARView from '@/components/ARView'

function Model() {
  const { scene } = useGLTF('/silverbullet.glb'); // Make sure to put your .glb file in the public directory
  return <primitive object={scene} />;
}

export default function Home() {
  const [isAR, setIsAR] = useState(false);

  const handleToggle = () => {
    setIsAR(!isAR);
  };

  return (
    <div>
      <Head>
        <title>3D Model Viewer</title>
      </Head>
      <button onClick={handleToggle}>
        {isAR ? 'View in 3D' : 'View in AR'}
      </button>
      {isAR ? (
        <ARView />
      ) : (
        <Canvas style={{ height: '100vh', width: '100vw' }}>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Model />
        </Canvas>
      )}
    </div>
  );
}

