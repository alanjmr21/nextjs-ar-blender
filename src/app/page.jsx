"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { XR, useXR } from "@react-three/xr";
import { Button } from "@/components/ui/button";
import { Loader2, Camera } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} position={[0, 0, -1]} />;
}

function ARScene({ url }) {
  const { isPresenting } = useXR();

  return (
    <Suspense fallback={null}>
      {isPresenting && <Model url={url} />}
      <Environment preset="sunset" />
    </Suspense>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default function Component() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-blue-100 to-blue-300">
      {!isReady ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <h1 className="mb-8 text-4xl font-bold text-blue-800">
            AR 3D Model Viewer
          </h1>
          <Button onClick={() => setIsReady(true)} className="text-lg">
            Start AR Experience
          </Button>
        </div>
      ) : (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setIsReady(false)}
        >
          <Canvas>
            <XR>
              <ARScene url={"/silverbullet.glb"} />
            </XR>
          </Canvas>
          <div className="absolute bottom-4 left-4 right-4 flex justify-center">
            <Camera className="mr-2 h-4 w-4 inline" />
            {(props) => (props.isPresenting ? "Exit AR" : "Enter AR")}
          </div>
          <Button
            className="absolute top-4 right-4"
            onClick={() => setIsReady(false)}
          >
            Back
          </Button>
        </ErrorBoundary>
      )}
    </div>
  );
}
