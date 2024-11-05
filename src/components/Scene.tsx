import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Model } from './Model';
import { LoadingScreen } from './LoadingScreen';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 40 }}
      className="rounded-lg shadow-2xl"
    >
      <Suspense fallback={<LoadingScreen />}>
        <ambientLight intensity={0.8} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <pointLight
          position={[5, 5, 5]}
          intensity={0.5}
          color="#ff7f50"
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Model />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
          enableRotate={false}
        />
      </Suspense>
    </Canvas>
  );
}