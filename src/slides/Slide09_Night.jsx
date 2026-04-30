import React, { useMemo, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { PHOTO_URLS } from '../utils/photos';
import SlideWrapper from '../components/SlideWrapper';

export default function Slide09_Night() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Smooth springs for deep parallax
  const springX = useSpring(0, { stiffness: 40, damping: 25 });
  const springY = useSpring(0, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 40;
    const y = (e.clientY - window.innerHeight / 2) / 40;
    springX.set(x);
    springY.set(y);
    setMousePos({ x, y });
  };

  const photos = PHOTO_URLS.slide09;
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };
  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPhoto, photos.length]);

  // Pre-randomized stars
  const stars = useMemo(() => {
    return Array.from({ length: 110 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 4,
      delay: Math.random() * 8,
      duration: 3 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.8
    }));
  }, []);

  // Meteor Shower Data
  const meteors = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 15,
    duration: 1 + Math.random() * 0.5,
    x: 10 + Math.random() * 60,
    y: 10 + Math.random() * 40
  }));

  return (
    <SlideWrapper style={{ backgroundColor: '#050510', overflow: 'hidden' }}>
      <div 
        onMouseMove={handleMouseMove}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        
        {/* Layer 0: Nebula / Cosmic Depth */}
        <div style={{ position: 'absolute', inset: -100, zIndex: 0, pointerEvents: 'none' }}>
           <div style={{ 
             position: 'absolute', top: '15%', left: '10%', width: '60%', height: '60%', 
             background: 'radial-gradient(circle, rgba(40,20,110,0.18) 0%, transparent 70%)', 
             filter: 'blur(100px)' 
           }} />
           <div style={{ 
             position: 'absolute', top: '40%', right: '5%', width: '50%', height: '50%', 
             background: 'radial-gradient(circle, rgba(70,25,90,0.15) 0%, transparent 70%)', 
             filter: 'blur(80px)' 
           }} />
        </div>

        {/* Layer 1: Constellations (Subtle Connections) */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', opacity: 0.15 }}>
           {/* Flower Constellation */}
           <motion.path 
             d="M30,30 L35,25 L40,30 L35,35 Z M35,25 L35,15" 
             stroke="white" strokeWidth="0.5" fill="none"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 5, delay: 2 }}
           />
           {/* Heart Constellation */}
           <motion.path 
             d="M70,60 L75,55 L80,60 L75,70 Z" 
             stroke="white" strokeWidth="0.5" fill="none"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 5, delay: 3 }}
           />
        </svg>

        {/* Layer 2: Twinkling Star Field */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
           {stars.map(star => (
             <motion.div
               key={star.id}
               style={{
                 position: 'absolute', top: `${star.y}%`, left: `${star.x}%`,
                 width: star.size, height: star.size,
                 x: useTransform(springX, (val) => val * (star.size / 2)),
                 y: useTransform(springY, (val) => val * (star.size / 2)),
               }}
             >
                <motion.svg 
                  viewBox="0 0 10 10" 
                  animate={{ opacity: [0.1, star.opacity, 0.1], scale: [0.7, 1.1, 0.7] }}
                  transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
                  style={{ width: '100%', height: '100%', overflow: 'visible' }}
                >
                   <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="white" />
                   <circle cx="5" cy="5" r="3" fill="white" filter="blur(2.5px)" opacity="0.6" />
                </motion.svg>
             </motion.div>
           ))}
        </div>

        {/* Layer 3: Meteor Shower (Shooting Stars) */}
        {meteors.map(meteor => (
          <motion.div
            key={meteor.id}
            initial={{ opacity: 0, x: `${meteor.x}vw`, y: `${meteor.y}vh`, scaleX: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: `${meteor.x + 20}vw`,
              y: `${meteor.y + 20}vh`,
              scaleX: [0, 1, 0]
            }}
            transition={{ 
              duration: meteor.duration, 
              repeat: Infinity, 
              delay: meteor.delay, 
              repeatDelay: 5 + Math.random() * 10,
              ease: "easeOut"
            }}
            style={{
              position: 'absolute', width: '150px', height: '2px',
              background: 'linear-gradient(to right, white, transparent)',
              transformOrigin: 'left center', rotate: '45deg', zIndex: 3
            }}
          />
        ))}

        {/* Layer 4: Emphasized Moon with Halo */}
        <motion.div
          style={{
            position: 'absolute', top: '12%', right: '10%', zIndex: 5,
            x: useTransform(springX, (val) => val * 1.8),
            y: useTransform(springY, (val) => val * 1.8),
          }}
        >
           <motion.div 
             animate={{ opacity: [0.25, 0.45, 0.25] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             style={{ 
               position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
               width: '200px', height: '200px', borderRadius: '50%',
               background: 'radial-gradient(circle, rgba(212,200,122,0.3) 0%, transparent 70%)',
               filter: 'blur(35px)'
             }}
           />

           <div style={{ position: 'relative', width: '90px', height: '90px' }}>
              <svg width="90" height="90" viewBox="0 0 90 90">
                 <defs>
                   <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fffce6" />
                      <stop offset="100%" stopColor="#d4c87a" />
                   </linearGradient>
                 </defs>
                 <circle cx="45" cy="45" r="36" fill="url(#moonGradient)" filter="drop-shadow(0 0 15px rgba(212,200,122,0.8))" />
                 <circle cx="34" cy="40" r="32" fill="#050510" />
              </svg>
           </div>
        </motion.div>

        {/* Layer 5: Ultra-Reactive Vertical Stack */}
        <div style={{ 
          position: 'relative', width: '100%', height: '100%', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          zIndex: 10, padding: '2vh 5vw', gap: '4vh'
        }}>
           <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 2, ease: "easeOut" }}
             style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
           >
              {/* Floating Cinematic Photo Card */}
              <motion.div
                style={{
                  width: '90vw', 
                  maxWidth: '450px', 
                  aspectRatio: '3 / 4',
                  maxHeight: 'min(55vh, 600px)',
                  borderRadius: '4px', 
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 50px 120px rgba(0,0,0,0.6)',
                  position: 'relative',
                  flexShrink: 1
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                 <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentPhoto}
                      src={photos[currentPhoto]} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        opacity: 0.85, 
                        display: 'block',
                        position: 'absolute',
                        inset: 0
                      }} 
                    />
                 </AnimatePresence>

                 {/* Navigation Buttons */}
                 <button onClick={prevPhoto} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 30, cursor: 'pointer', color: '#e8e0ff', fontWeight: 'bold' }}>←</button>
                 <button onClick={nextPhoto} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 30, cursor: 'pointer', color: '#e8e0ff', fontWeight: 'bold' }}>→</button>

                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050510 0%, transparent 60%)', pointerEvents: 'none' }} />
                 <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: '0.65rem', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                    {currentPhoto + 1}/{photos.length}
                 </div>
              </motion.div>

              {/* Serene Typography */}
              <div style={{ textAlign: 'center', maxWidth: '650px', flexShrink: 0, marginTop: '2vh' }}>
                 <h2 style={{ 
                   fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 5vh, 2.3rem)', color: '#e8e0ff', lineHeight: '1.55', 
                   fontWeight: 300, textShadow: '0 0 40px rgba(160,140,255,0.35)', margin: 0
                 }}>
                   "You are a rare species — one that only blooms more beautifully in the dark."
                 </h2>
                 <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.3rem', color: '#b0a0f0', marginTop: '2vh', letterSpacing: '0.05em' }}>
                   — HANAMI
                 </p>
              </div>
           </motion.div>
        </div>

      </div>
    </SlideWrapper>
  );
}
