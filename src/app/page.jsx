"use client";

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

// SECOND ATTEMPT 
// pages/index.js
// import { useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import Head from "next/head";
// import Script from "next/script";

// function Model() {
//   const { scene } = useGLTF("/silverbullet.glb"); // Ensure model.glb is in the public directory
//   return <primitive object={scene} />;
// }

// function ARView() {
//   return (
//     <div className="w-full h-5/6">
//       <Script src="https://aframe.io/releases/1.6.0/aframe.min.js"></Script>
//       <a-scene className="h-[96px]">
//         <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
//         <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
//         <a-cylinder
//           position="1 0.75 -3"
//           radius="0.5"
//           height="1.5"
//           color="#FFC65D"
//         ></a-cylinder>
//         <a-plane
//           position="0 0 -4"
//           rotation="-90 0 0"
//           width="4"
//           height="4"
//           color="#7BC8A4"
//         ></a-plane>
//         <a-sky color="#ECECEC"></a-sky>
//       </a-scene>
//     </div>
//   );
// }

// export default function Home() {
//   const [isAR, setIsAR] = useState(false);

//   const handleToggle = () => {
//     setIsAR(!isAR);
//   };

//   return (
//     <div>
//       <Head>
//         <title>3D Model Viewer</title>
//       </Head>
//       <button onClick={handleToggle}>
//         {isAR ? "View in 3D" : "View in AR"}
//       </button>
//       {isAR ? (
//         <ARView />
//       ) : (
//         <Canvas style={{ height: "100vh", width: "100vw" }}>
//           <OrbitControls />
//           <ambientLight />
//           <pointLight position={[10, 10, 10]} />
//           <Model />
//         </Canvas>
//       )}
//     </div>
//   );
// }

// THIRD ATTEMPT

import { useState, useEffect } from 'react';
import Head from 'next/head';
import * as THREE from "three";

export default function Home() {
  const [isAR, setIsAR] = useState(false);

  useEffect(() => {
    if (isAR) {
      // Dynamically load AR.js and three.js scripts when AR mode is enabled
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/three.js/build/ar.js';
      script2.async = true;
      document.body.appendChild(script2);

      script2.onload = () => {
        // After loading scripts, initialize the AR scene
        initARScene();
      };

      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    }
  }, [isAR]);

  const initARScene = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('ar-container').appendChild(renderer.domElement);

    const arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: 'webcam',
    });

    arToolkitSource.init(() => {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(renderer.domElement);
    });

    const arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/three.js/examples/arjs/marker-training/examples/img/camera_para.dat',
      detectionMode: 'mono',
    });

    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    const markerRoot = new THREE.Group();
    scene.add(markerRoot);

    new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/data/patt.hiro',
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    markerRoot.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
      }
      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <div>
      <Head>
        <title>3D Model Viewer with AR</title>
      </Head>
      <button onClick={() => setIsAR(!isAR)}>
        {isAR ? 'View in 3D' : 'View in AR'}
      </button>
      {isAR ? (
        <div id="ar-container" style={{ width: '100vw', height: '100vh' }} />
      ) : (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>3D View Placeholder</p>
        </div>
      )}
    </div>
  );
}
