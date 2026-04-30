import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTO_URLS } from '../utils/photos';

export default function Slide05_FirstDate() {
  const photos = PHOTO_URLS.slide05;
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPhoto, photos.length]);

  // Soft, therapeutic floating dust motes
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 5
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{
        width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 30%, #1a2a44 0%, #0d1a2d 60%, #050a15 100%)' // Deep Midnight Blue
      }}
    >

      {/* Therapeutic floating particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {particles.map(f => (
          <motion.div
            key={f.id}
            animate={{
              x: [`${f.x}vw`, `${f.x + (Math.random() * 6 - 3)}vw`, `${f.x}vw`],
              y: [`${f.y}vh`, `${f.y - 12}vh`, `${f.y}vh`],
              opacity: [0, 0.4, 0]
            }}
            transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: f.size, height: f.size,
              backgroundColor: '#fffbe6',
              borderRadius: '50%',
              boxShadow: '0 0 15px 4px rgba(255, 240, 150, 0.4)',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Foreground Content: Soft Landscape Matte */}
      <div style={{
        position: 'relative', width: '100%', height: '100%', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2vh 5vw' // Smaller vertical padding to maximize space
      }}>

        {/* Soft physical frame (Portrait Adaptive) */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateZ: -1 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          style={{
            width: '90vw',
            maxWidth: '500px',
            padding: '2vh 2vw 4vh 2vw',
            backgroundColor: '#fffdf5',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            borderRadius: '4px',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '2vh',
            flexShrink: 1,
            overflow: 'hidden'
          }}
        >
          {/* Subtle inner tape/texture line */}
          <div style={{ position: 'absolute', inset: '10px 10px 10px 10px', border: '1px solid rgba(0, 0, 0, 0.1)', pointerEvents: 'none', zIndex: 10 }} />

          {/* The Photo Container — Portrait aspect ratio */}
          <div style={{
            width: '100%',
            aspectRatio: '3 / 4',
            maxHeight: 'min(50vh, 600px)',
            backgroundColor: '#1a1a1a', // Darker photo backing for night theme
            overflow: 'hidden',
            borderRadius: '2px',
            position: 'relative'
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhoto}
                src={photos[currentPhoto]}
                alt="Memory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
              />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              style={{
                position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%',
                width: '35px', height: '35px', cursor: 'pointer', zIndex: 30,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#1a1a1a', fontWeight: 'bold'
              }}
            >
              ←
            </button>
            <button
              onClick={nextPhoto}
              style={{
                position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%',
                width: '35px', height: '35px', cursor: 'pointer', zIndex: 30,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#1a1a1a', fontWeight: 'bold'
              }}
            >
              →
            </button>

            <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: '0.65rem', color: '#666', background: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: '10px' }}>
              {currentPhoto + 1}/{photos.length}
            </div>
          </div>

          {/* Typography embedded directly on the paper matte */}
          <div style={{ textAlign: 'center', zIndex: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3.5vh, 1.8rem)', color: '#3d2e1e', margin: '0 0 4px 0', fontWeight: 600, letterSpacing: '0.02em' }}>
              Our First, Farthest Outside Date
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6rem, 1.5vh, 0.8rem)', color: '#8b7d6b', margin: 0, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 'bold' }}>
              MARCH 2026
            </p>
          </div>
        </motion.div>

        {/* Floating Quote softly hovering below */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
          style={{ width: '90vw', maxWidth: '850px', textAlign: 'center', marginTop: '4vh', flexShrink: 0 }}
        >
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            color: '#ebd9b4', // Golden ivory for contrast
            lineHeight: '1.6',
            fontStyle: 'italic',
            fontWeight: 300,
            letterSpacing: '0.03em',
            textShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}>
            "It was far, It was hot, and It was hassle for transportation....<br />Yet we were still happy and we made the night very worth it....<br /><br />I appreciate you and I appreciate being with you during that day..."
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
