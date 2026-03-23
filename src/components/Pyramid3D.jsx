import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

const Pyramid = ({ base, height, showDimensions }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Create pyramid geometry
  const geometry = new THREE.ConeGeometry(base / Math.sqrt(2), height, 4);
  geometry.rotateY(Math.PI / 4);

  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Main Pyramid */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        <meshStandardMaterial
          color={hovered ? '#d4a84b' : '#c9a227'}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Base edges */}
      <Line
        points={[
          [-base/2, -height/2, -base/2],
          [base/2, -height/2, -base/2],
          [base/2, -height/2, base/2],
          [-base/2, -height/2, base/2],
          [-base/2, -height/2, -base/2]
        ]}
        color="#8b6914"
        lineWidth={2}
      />

      {/* Side edges */}
      <Line
        points={[[-base/2, -height/2, -base/2], [0, height/2, 0]]}
        color="#8b6914"
        lineWidth={2}
      />
      <Line
        points={[[base/2, -height/2, -base/2], [0, height/2, 0]]}
        color="#8b6914"
        lineWidth={2}
      />
      <Line
        points={[[base/2, -height/2, base/2], [0, height/2, 0]]}
        color="#8b6914"
        lineWidth={2}
      />
      <Line
        points={[[-base/2, -height/2, base/2], [0, height/2, 0]]}
        color="#8b6914"
        lineWidth={2}
      />

      {/* Dimension labels */}
      {showDimensions && (
        <>
          <Text
            position={[base/2 + 1, -height/2, 0]}
            fontSize={0.8}
            color="#333"
            anchorX="left"
          >
            Base = {base} cm
          </Text>
          <Text
            position={[base/2 + 2, 0, 0]}
            fontSize={0.8}
            color="#333"
            anchorX="left"
          >
            Height = {height} cm
          </Text>
        </>
      )}
    </group>
  );
};

const Scene = ({ base, height, showDimensions }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <Pyramid base={base} height={height} showDimensions={showDimensions} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={20}
        autoRotate={false}
      />
    </>
  );
};

const Pyramid3D = ({ base = 6, height = 8, showDimensions = true }) => {
  return (
    <div className="pyramid-3d-container">
      <Canvas
        camera={{ position: [10, 5, 10], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene base={base} height={height} showDimensions={showDimensions} />
      </Canvas>
      <div className="pyramid-controls-hint">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default Pyramid3D;
