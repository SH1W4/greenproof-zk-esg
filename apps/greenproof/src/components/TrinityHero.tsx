"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  ContactShadows, 
  PerspectiveCamera,
  Line,
  Icosahedron,
  MeshWobbleMaterial
} from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  position: [number, number, number];
  color: string;
  delay?: number;
}

const AnimatedOrb = ({ position, color, delay = 0 }: OrbProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() + delay;
    
    // Add a slight orbit to the position
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.1;
    
    const targetScale = hovered ? 1.5 : 1.3;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group 
      position={position} 
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.3, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.45}
            radius={0.3}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.8}
            roughness={0}
            metalness={1}
            toneMapped={false}
          />
        </Sphere>
      </Float>
      
      {/* Light Glow Aura */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

const CentralCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += 0.005;
    coreRef.current.rotation.z += 0.01;
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Inner pulsing light */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#00FF88" transparent opacity={0.1} />
      </mesh>
      
      {/* Wireframe architecture hub */}
      <Icosahedron ref={coreRef} args={[0.8, 1]}>
        <meshBasicMaterial color="#00FF88" wireframe transparent opacity={0.1} />
      </Icosahedron>

      {/* Floating data particles simulation */}
      <Float speed={5} rotationIntensity={5} floatIntensity={2}>
         <Icosahedron args={[0.5, 2]}>
            <MeshWobbleMaterial color="#00FF88" speed={1} factor={0.6} transparent opacity={0.2} wireframe />
         </Icosahedron>
      </Float>
    </group>
  );
};

function DataConnectors() {
  const positions = useMemo(() => {
    return [
      new THREE.Vector3(-1.4, 0.8, 0),
      new THREE.Vector3(1.4, 0.8, 0),
      new THREE.Vector3(0, -1.4, 0),
    ];
  }, []);

  const corePos = new THREE.Vector3(0, -0.2, 0);

  return (
    <group>
      {/* Main outer triangle */}
      <Line points={[positions[0], positions[1]]} color="#00FF88" lineWidth={1} transparent opacity={0.2} />
      <Line points={[positions[1], positions[2]]} color="#00FF88" lineWidth={1} transparent opacity={0.2} />
      <Line points={[positions[2], positions[0]]} color="#00FF88" lineWidth={1} transparent opacity={0.2} />

      {/* Connection paths to center (Orchestration rays) */}
      {positions.map((p, i) => (
        <Line 
          key={i}
          points={[p, corePos]} 
          color="#00FF88" 
          lineWidth={2} 
          transparent 
          opacity={0.3} 
          dashed={true}
        />
      ))}
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
    <div className="w-full h-full relative">
      {/* Background radial gradient for depth */}
      <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={30} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} color="#00FF88" />
        
        <CentralCore />
        <DataConnectors />
        
        <AnimatedOrb position={[-1.4, 0.8, 0]} color="#00FF88" delay={0} />
        <AnimatedOrb position={[1.4, 0.8, 0]} color="#00FF88" delay={2} />
        <AnimatedOrb position={[0, -1.4, 0]} color="#00FF88" delay={4} />

        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.3} 
          scale={20} 
          blur={3.5} 
          far={10} 
        />
      </Canvas>
    </div>
  );
}
