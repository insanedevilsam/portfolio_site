import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef();
  
  // Create a proper sphere with valid positions
  const count = 5000;
  const positions = new Float32Array(count * 3);
  const radius = 1.5;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true }}
      >
        <StarField />
      </Canvas>
    </div>
  );
}
