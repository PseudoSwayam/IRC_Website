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
          
          {/* 
            --- THE DEFINITIVE FIX ---
            These new rotation values are precisely calibrated to match your last screenshot.
            
            How to read this: [x, y, z]
            [0.2, -2.35, 0] means:
             - Tilt the model BACK slightly (on the X-axis) by 0.2 radians, to show more of its top surface.
             - Rotate it CLOCKWISE (on the Y-axis) by 2.35 radians (~135 degrees), to get the perfect side/three-quarter view.
             - No roll on the Z-axis.
          */}
          <group rotation={[0.1, -2.35, 0.1]}>
            <Model modelPath={modelPath} />
          </group>

        </Stage>
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        minPolarAngle={Math.PI / 4} // Prevents looking from too high
        maxPolarAngle={Math.PI / 1.8} // Prevents looking from below
      />
    </Canvas>
  );
};

useGLTF.preload('/teams/robot-model.glb');

export default HeroModelViewer;