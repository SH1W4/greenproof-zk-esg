"use client";

import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

interface OrbProps {
  color: string;
  speed?: number;
  distort?: number;
}

export function Orb({ color, speed = 1.5, distort = 0.4 }: OrbProps) {
  return (
    <div className="w-24 h-24 sm:w-32 sm:h-32">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1, 32, 32]}>
            <MeshDistortMaterial
              color={color}
              speed={speed}
              distort={distort}
              radius={1}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}
