import { useState, useEffect, useMemo, memo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  color: string;
  speed?: number;
  distort?: number;
  active?: boolean;
}

const AnimatedSphere = memo(({ color, speed, distort, active }: OrbProps) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);
  
  // Smoothly lerp scale instead of using framer-motion-3d
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const emissiveIntensity = active ? 0.8 : hovered ? 0.4 : 0;

  return (
    <group
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Float speed={2 * speed!} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={active ? color : hovered ? "#1e293b" : "#0f172a"}
            speed={speed}
            distort={distort}
            radius={1}
            emissive={active ? color : "#00FF88"}
            emissiveIntensity={emissiveIntensity}
            roughness={0.1}
            metalness={1}
            toneMapped={false}
          />
        </Sphere>
      </Float>
    </group>
  );
});

AnimatedSphere.displayName = "AnimatedSphere";

export function Orb({ color, speed = 1.5, distort = 0.4, active = false }: OrbProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-slate-900/40 rounded-full animate-pulse blur-2xl" />;

  return (
    <div className={`relative transition-all duration-1000 ${active ? 'w-48 h-48' : 'w-32 h-32'}`}>
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, -10, -10]} intensity={1} color={color} />
        
        <AnimatedSphere 
          color={color} 
          speed={speed} 
          distort={distort} 
          active={active} 
        />

        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4.5} 
        />
      </Canvas>
    </div>
  );
}
