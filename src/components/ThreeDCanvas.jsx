// components/ThreeDCanvas.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDCanvas = ({ backgroundColor = 'white' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff,1); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Strong directional light
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Add OrbitControls to allow user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const loader = new GLTFLoader();
    loader.load('/silverbullet.glb', (gltf) => {
      const model = gltf.scene;
      
      scene.add(model);
    }, undefined, (error) => {
      console.error('An error happened', error);
    });

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update(); // Required for damping
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to be called on unmount
    return () => {
      if (mountRef.current) {
        // Remove the renderer's DOM element if it exists
        if (renderer.domElement.parentElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [backgroundColor]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeDCanvas;
