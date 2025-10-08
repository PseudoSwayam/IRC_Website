'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls, useGLTF } from '@react-three/drei';

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

const HeroModelViewer = ({ modelPath }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 45 }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
      }}
    >
      <Suspense fallback={null}>
        <Stage preset="rembrandt" intensity={0.8} environment="city">
          <group rotation={[0.1, -2.35, 0.1]}>
            <Model modelPath={modelPath} />
          </group>
        </Stage>
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

useGLTF.preload('/teams/robot-model.glb');

export default HeroModelViewer;
