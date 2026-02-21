"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  ContactShadows, 
  PerspectiveCamera,
  Line
} from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  position: [number, number, number];
  color: string;
}

const AnimatedOrb = ({ position, color }: OrbProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.4 : 1.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group 
      position={position} 
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.6, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            speed={1.5}
            distort={0.4}
            radius={0.6}
            emissive={color}
            emissiveIntensity={hovered ? 1.2 : 0.6}
            roughness={0}
            metalness={1}
            toneMapped={false}
          />
        </Sphere>
      </Float>
    </group>
  );
};

function DataConnectors() {
  const positions = useMemo(() => {
    const p1 = new THREE.Vector3(-1.8, 1, 0);
    const p2 = new THREE.Vector3(1.8, 1, 0);
    const p3 = new THREE.Vector3(0, -1.8, 0);
    return [p1, p2, p3];
  }, []);

  return (
    <group>
      <Line 
        points={[positions[0], positions[1]]} 
        color="#00FF88" 
        lineWidth={2} 
        transparent 
        opacity={0.4} 
      />
      <Line 
        points={[positions[1], positions[2]]} 
        color="#00FF88" 
        lineWidth={2} 
        transparent 
        opacity={0.4} 
      />
      <Line 
        points={[positions[2], positions[0]]} 
        color="#00FF88" 
        lineWidth={2} 
        transparent 
        opacity={0.4} 
      />
      
      <Float speed={8} rotationIntensity={0} floatIntensity={1}>
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color="#00FF88" />
        </mesh>
      </Float>
    </group>
  );
}

export default function TrinityHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative group">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 20]} angle={0.2} penumbra={1} intensity={3} color="#00FF88" />
        
        <DataConnectors />
        
        <AnimatedOrb position={[-1.8, 1, 0]} color="#00FF88" />
        <AnimatedOrb position={[1.8, 1, 0]} color="#00FF88" />
        <AnimatedOrb position={[0, -1.8, 0]} color="#00FF88" />

        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={3} 
          far={6} 
        />
      </Canvas>
    </div>
  );
}
