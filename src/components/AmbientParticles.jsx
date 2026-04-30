import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientParticles() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
          animate={{
            x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`],
            y: [`${p.y}vh`, `${p.y - 20}vh`],
            opacity: [0, p.opacity, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.5)`
          }}
        />
      ))}
    </div>
  );
}
