import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';

const FallingPetals = () => {
  const petals = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 10,
    size: 14 + Math.random() * 8, 
    color: Math.random() > 0.5 ? '#fa8c2a' : '#ffb56b', // Chrysanthemum colors
    rotateStart: Math.random() * 360
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {petals.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: '-10vh', rotate: p.rotateStart, opacity: 0 }}
          animate={{
            x: [`${p.x}vw`, `${p.x - 25}vw`],
            y: ['-10vh', '110vh'],
            rotate: [p.rotateStart, p.rotateStart + 360],
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: p.size, height: p.size }}
        >
          <svg viewBox="0 0 20 20" fill={p.color} opacity="0.6">
            <ellipse cx="10" cy="10" rx="3" ry="10" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const CenterChrysanthemum = () => {
  const layers = [
    { count: 32, radiusX: 3.5, radiusY: 28, color: '#e65c00', delay: 3.1 },
    { count: 28, radiusX: 3.5, radiusY: 24, color: '#f07418', delay: 3.3 },
    { count: 24, radiusX: 3, radiusY: 20, color: '#fa8c2a', delay: 3.5 },
    { count: 18, radiusX: 3, radiusY: 16, color: '#ff9d42', delay: 3.7 },
    { count: 12, radiusX: 2.5, radiusY: 12, color: '#ffb56b', delay: 3.9 },
    { count: 8, radiusX: 2, radiusY: 8, color: '#ffd094', delay: 4.1 }
  ];

  return (
    <motion.div 
      style={{ position: 'absolute', width: '180px', height: '180px', left: '-90px', top: '-90px', zIndex: 100 }}
      exit={{ scale: 35, rotate: 180, filter: 'blur(2px)', opacity: 0, transition: { duration: 2.8, ease: "easeInOut" } }}
    >
      <motion.svg 
        viewBox="0 0 100 100" 
        width="100%" 
        height="100%" 
        style={{ overflow: 'visible', transformOrigin: 'center' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {layers.map((layer, layerIdx) => (
          <motion.g 
            key={`layer-${layerIdx}`}
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: layer.delay, duration: 1.5, ease: "backOut" }}
            style={{ transformOrigin: '50px 50px' }}
          >
            {Array.from({ length: layer.count }).map((_, i) => {
              const angle = (360 / layer.count) * i + (layerIdx * 15);
              return (
                <ellipse
                  key={i}
                  cx="50"
                  cy={50 - layer.radiusY + 6}
                  rx={layer.radiusX}
                  ry={layer.radiusY}
                  fill={layer.color}
                  transform={`rotate(${angle} 50 50)`}
                />
              );
            })}
          </motion.g>
        ))}
        {/* Center core */}
        <motion.circle cx="50" cy="50" r="7" fill="#a33b00" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 4.3, duration: 1 }} />
        <motion.circle cx="50" cy="50" r="4" fill="#d94b00" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 4.4, duration: 1 }} />
      </motion.svg>
    </motion.div>
  );
};

const HangingVines = () => {
  const vines = [
    { x: '2%', length: 280, delay: 5.0, color: '#ff99aa' },
    { x: '10%', length: 160, delay: 5.5, color: '#f5c842' },
    { x: '18%', length: 220, delay: 5.2, color: '#D4537E' },
    { x: '26%', length: 140, delay: 5.8, color: '#a8c686' },
    { x: '74%', length: 150, delay: 5.7, color: '#E88B60' },
    { x: '82%', length: 210, delay: 5.3, color: '#ffcc00' },
    { x: '90%', length: 170, delay: 5.6, color: '#ff66b2' },
    { x: '98%', length: 290, delay: 5.1, color: '#D4537E' },
  ];

  return (
    <div style={{ position: 'absolute', top: 0, width: '100%', height: '350px', pointerEvents: 'none', zIndex: 3 }}>
      {vines.map((v, i) => (
        <div key={i} className="animate-float" style={{ position: 'absolute', left: v.x, top: 0, width: 40, height: v.length, transformOrigin: 'top' }}>
          {/* Sinuous Vine Stem */}
          <svg width="40" height={v.length} style={{ position: 'absolute' }}>
            <motion.path
              d={`M 20 0 Q 0 ${v.length/3}, 20 ${v.length*2/3} T 20 ${v.length}`}
              fill="none"
              stroke="#2a5a20"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: v.delay, duration: 2.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Leaves */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: v.delay + 1.0, duration: 1 }}
            style={{ position: 'absolute', top: v.length * 0.35, left: 3, transformOrigin: 'top right' }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20">
              <ellipse cx="10" cy="10" rx="4" ry="10" fill="#3B6D11" transform="rotate(-60, 10, 10)" />
            </svg>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: v.delay + 1.4, duration: 1 }}
            style={{ position: 'absolute', top: v.length * 0.7, left: 18, transformOrigin: 'top left' }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20">
              <ellipse cx="10" cy="10" rx="4" ry="10" fill="#3B6D11" transform="rotate(60, 10, 10)" />
            </svg>
          </motion.div>

          {/* Vine Flower */}
          {v.color !== '#a8c686' && (
            <motion.div
              className="animate-float-rotate"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 0.9 }}
              transition={{ delay: v.delay + 1.8, duration: 1.2, ease: "backOut" }}
              style={{ position: 'absolute', top: v.length - 18, left: 4, zIndex: 10 }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path d="M16 2C22 2 28 8 28 16C28 20 24 24 16 26C8 24 4 20 4 16C4 8 10 2 16 2Z" fill={v.color} />
                <path d="M11 8C14 6 18 6 21 8C23 11 22 16 16 19C10 16 9 11 11 8Z" fill="rgba(0,0,0,0.15)" />
                <circle cx="16" cy="11" r="3.5" fill="#ffeb3b" />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

const BackgroundGarden = () => {
  const colors = ['#D4537E', '#f5c842', '#a8c686', '#E88B60', '#ff99aa', '#ffcc00', '#ff66b2'];
  const flowers = Array.from({ length: 22 }).map((_, i) => ({
    x: `${-5 + Math.random() * 110}%`,
    height: 60 + Math.random() * 160, // A lovely low meadow
    delay: 4.2 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    scale: 0.8 + Math.random() * 0.7 // Aesthetic, delicate sizes
  }));

  return (
    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '300px', pointerEvents: 'none', zIndex: 2 }}>
      {flowers.map((f, i) => (
        <div key={i} style={{ position: 'absolute', left: f.x, bottom: 0, width: 40, height: f.height, transform: `scale(${f.scale})`, transformOrigin: 'bottom' }}>
          {/* Stem */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: f.delay, duration: 1.8, ease: "easeOut" }}
            style={{ width: '2px', height: '100%', backgroundColor: '#2a5a20', margin: '0 auto', transformOrigin: 'bottom' }}
          />
          {/* Flower head */}
          {f.color !== '#a8c686' && (
            <motion.div
              className="animate-float"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: f.delay + 1.2, duration: 1.2, ease: "backOut" }}
              style={{ position: 'absolute', top: -18, left: 4, zIndex: 10 }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path d="M16 2C22 2 28 8 28 16C28 20 24 24 16 26C8 24 4 20 4 16C4 8 10 2 16 2Z" fill={f.color} />
                <path d="M11 8C14 6 18 6 21 8C23 11 22 16 16 19C10 16 9 11 11 8Z" fill="rgba(0,0,0,0.15)" />
                <circle cx="16" cy="11" r="3.5" fill="#ffeb3b" />
              </svg>
            </motion.div>
          )}
          {/* Leaves */}
          <motion.div
              className="animate-float-rotate"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: f.delay + 0.6, duration: 1 }}
              style={{ position: 'absolute', bottom: 40, left: -4, transformOrigin: 'bottom right' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <ellipse cx="10" cy="10" rx="4" ry="10" fill="#3B6D11" transform="rotate(-40, 10, 20)" />
              </svg>
          </motion.div>
          <motion.div
              className="animate-float-rotate"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: f.delay + 0.9, duration: 1 }}
              style={{ position: 'absolute', bottom: 70, left: 24, transformOrigin: 'bottom left' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <ellipse cx="10" cy="10" rx="4" ry="10" fill="#3B6D11" transform="rotate(40, 10, 20)" />
              </svg>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default function Slide01_Seed() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: [1, 1, 0], transition: { duration: 2.8, times: [0, 0.8, 1], ease: "easeInOut" } }}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#1a1a12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 50 // Keep on top during transition
      }}
    >
        
        {/* Soft magical background pulse */}
        <motion.div 
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }} 
        >
          <div 
            className="animate-pulse-slow" 
            style={{
              width: '100%', height: '100%',
              background: 'radial-gradient(circle at center, rgba(40,50,20,0.15) 0%, transparent 60%)'
            }}
          />
        </motion.div>

        <motion.div exit={{ opacity: 0, transition: { duration: 0.5 } }} style={{ position: 'absolute', inset: 0 }}>
          <FallingPetals />
          <HangingVines />
          <BackgroundGarden />
        </motion.div>
        
        {/* Main Animation Container */}
        <div style={{ position: 'relative', height: '180px', width: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem' }}>
          
          <div style={{ position: 'absolute', zIndex: 10 }}>
            {/* Blooming Chrysanthemum */}
            <CenterChrysanthemum />
          </div>

        </div>

        {/* Text Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)', transition: { duration: 0.2 } }}
          transition={{ delay: 3.8, duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '0.2rem', zIndex: 20 }}
        >
          <div className="animate-pulse-slow">
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#e8dfc8', letterSpacing: '0.05em', margin: 0, textShadow: '0 4px 20px rgba(232,223,200,0.3)' }}>
              Paulo & Hanami
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)', transition: { duration: 0.2 } }}
          transition={{ delay: 4.1, duration: 0.7 }}
          style={{ textAlign: 'center', zIndex: 20 }}
        >
          <div className="animate-float-slow">
            <h2 style={{ fontFamily: 'var(--font-hand)', fontSize: '1.4rem', color: '#8fbe6a', letterSpacing: '0.12em', margin: '0 0 10px 0', fontWeight: 'normal' }}>
              Our Sanctuary, Our Promising Journey
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 4.4, duration: 1 }}
          style={{ textAlign: 'center', zIndex: 20 }}
        >
          <p style={{ 
            fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#e8dfc8', 
            fontStyle: 'italic', margin: 0, opacity: 0.7 
          }}>
            "I am sorry and I hope this will make you feel appreciated"
          </p>
        </motion.div>

        {/* Hint text at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ delay: 5.0, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '60px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            scroll or press → to begin
          </motion.div>
        </motion.div>

    </motion.div>
  );
}
