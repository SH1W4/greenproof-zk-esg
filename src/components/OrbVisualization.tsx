"use client";

import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

interface OrbProps {
  color: string;
  speed?: number;
  distort?: number;
  active?: boolean;
}

export function Orb({ color, speed = 1.5, distort = 0.4, active = false }: OrbProps) {
  return (
    <div className={`transition-all duration-1000 ${active ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-24 h-24 sm:w-32 sm:h-32'}`}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={active ? 1.5 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={active ? 3 : 1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1, 64, 64]}>
            <MeshDistortMaterial
              color={active ? color : "#14532d"}
              speed={speed}
              distort={distort}
              radius={1}
              emissive={active ? color : "#000000"}
              emissiveIntensity={active ? 0.5 : 0}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}
