"use client"

import { useEffect } from "react";

function ARView() {
  useEffect(() => {
    // Load the A-Frame and AR.js scripts dynamically
    const script1 = document.createElement('script');
    script1.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://aframe.io/releases/1.2.0/aframe-ar.min.js';
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <a-scene embedded>
      <a-marker preset="hiro">
        <a-entity gltf-model="/silverbullet.glb" scale="0.5 0.5 0.5" />
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
}

export default ARView;