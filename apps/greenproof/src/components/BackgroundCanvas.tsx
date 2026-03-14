"use client";

import React, { useEffect, useRef } from "react";

/**
 * @component BackgroundCanvas
 * @description Engine de partículas em Canvas utilizando Typed Arrays para máxima performance.
 * Segue os requisitos da skill ai-designer-pro (Delta Time, Offscreen Drawing potential, Typed Arrays).
 */
export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Configurações
    const particleCount = 100;
    const particles = new Float32Array(particleCount * 5); // x, y, vx, vy, size
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles[i * 5] = Math.random() * canvas.width;     // x
        particles[i * 5 + 1] = Math.random() * canvas.height; // y
        particles[i * 5 + 2] = (Math.random() - 0.5) * 0.5;   // vx
        particles[i * 5 + 3] = (Math.random() - 0.5) * 0.5;   // vy
        particles[i * 5 + 4] = Math.random() * 2 + 1;         // size
      }
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const deltaTime = (time - lastTime) / 16.67; // Normalizado para 60fps
      lastTime = time;

      // Clear with background color token equivalent
      ctx.fillStyle = "#020c06"; // var(--color-bg-main) fallback
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(23, 207, 84, 0.15)"; // var(--color-brand-primary) with low opacity

      for (let i = 0; i < particleCount; i++) {
        let x = particles[i * 5];
        let y = particles[i * 5 + 1];
        const vx = particles[i * 5 + 2];
        const vy = particles[i * 5 + 3];
        const size = particles[i * 5 + 4];

        x += vx * deltaTime;
        y += vy * deltaTime;

        // Wrap around
        if (x < 0) x = canvas.width;
        if (x > canvas.width) x = 0;
        if (y < 0) y = canvas.height;
        if (y > canvas.height) y = 0;

        particles[i * 5] = x;
        particles[i * 5 + 1] = y;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(render);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-50"
      style={{ filter: "blur(2px)" }}
    />
  );
};
