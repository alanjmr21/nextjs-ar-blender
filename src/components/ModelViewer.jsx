import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Model from './Model';

const ModelViewer = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <OrbitControls enableZoom={true} />
      <Model url="/silverbullet.glb" />
    </Canvas>
  );
};

export default ModelViewer