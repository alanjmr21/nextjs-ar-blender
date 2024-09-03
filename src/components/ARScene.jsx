import React, { useEffect } from 'react';

const ARScene = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          gltf-model="/product.glb"
          scale="2 2 2"
          position="0 0 0"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARScene;
