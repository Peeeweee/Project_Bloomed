import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { PHOTO_URLS } from '../utils/photos';
import SlideWrapper from '../components/SlideWrapper';

export default function Slide07_Afternoon() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth springs for the parallax effect
  const springX = useSpring(0, { stiffness: 40, damping: 25 });
  const springY = useSpring(0, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 25;
    const y = (clientY - window.innerHeight / 2) / 25;
    springX.set(x);
    springY.set(y);
    setMousePos({ x, y });
  };

  const photos = PHOTO_URLS.slide07;
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
    }, 5000); // 5-second auto-play to allow manual interaction
    return () => clearInterval(timer);
  }, [currentPhoto, photos.length]);

  // Detailed Maple Leaf Path
  const leafPath = "M12 22C12 22 13 18 15 17C17 16 21 16 21 16C21 16 18 15 17 13C16 11 16 7 16 7C16 7 15 10 13 11C11 12 7 12 7 12C7 12 10 13 11 15C12 17 12 21 12 21";

  return (
    <SlideWrapper 
      style={{ 
        background: '#fffdf5', 
        overflow: 'hidden'
      }}
    >
      <div 
        onMouseMove={handleMouseMove}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}
      >
        
        {/* Layer 0: Background Texture */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 70% 30%, #fcd34d 0%, transparent 70%)',
            filter: 'blur(100px)',
            zIndex: 0
          }}
        />

        {/* Layer 1: Floating Golden Motes */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
           {Array.from({ length: 20 }).map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 opacity: [0, 0.6, 0],
                 y: ['-10vh', '110vh'],
                 x: [`${Math.random() * 100}vw`, `${Math.random() * 100 + (Math.random() * 10 - 5)}vw`]
               }}
               transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 15, ease: "linear" }}
               style={{
                 position: 'absolute', width: 3 + Math.random() * 3, height: 3 + Math.random() * 3,
                 backgroundColor: '#fbbf24', borderRadius: '50%', filter: 'blur(1px)'
               }}
             />
           ))}
        </div>

        {/* Layer 2: Ultra-Reactive Vertical Stack */}
        <div style={{ 
          position: 'relative', width: '100%', height: '100%', zIndex: 5, 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '2vh 5vw', gap: '4vh'
        }}>
          
          {/* TOP: Floating Photo Card */}
          <motion.div
            style={{
              x: springX,
              y: springY,
              rotateX: useTransform(springY, [-30, 30], [8, -8]),
              rotateY: useTransform(springX, [-30, 30], [-8, 8]),
              perspective: '1200px',
              flexShrink: 1
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateZ: 2 }}
              animate={{ opacity: 1, scale: 1, rotateZ: -2 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              style={{
                width: '90vw',
                maxWidth: '500px',
                backgroundColor: '#fff',
                padding: '1.5vh',
                boxShadow: '0 40px 90px rgba(146, 64, 14, 0.15)',
                borderRadius: '2px',
                border: '1px solid rgba(254, 243, 199, 0.8)',
                position: 'relative'
              }}
            >
              <div style={{ width: '100%', aspectRatio: '3 / 4', maxHeight: '55vh', overflow: 'hidden', backgroundColor: '#fef3c7', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentPhoto}
                    src={photos[currentPhoto]} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ width: '100%', height: '100%', maxHeight: '55vh', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} 
                  />
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button onClick={prevPhoto} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 10, cursor: 'pointer', color: '#92400e', fontWeight: 'bold' }}>←</button>
                <button onClick={nextPhoto} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 10, cursor: 'pointer', color: '#92400e', fontWeight: 'bold' }}>→</button>
                
                <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: '0.65rem', color: '#92400e', background: 'rgba(255,255,255,0.6)', padding: '2px 8px', borderRadius: '10px' }}>
                  {currentPhoto + 1}/{photos.length}
                </div>
              </div>
                  <div style={{ padding: '1.5vh 0 0.5vh 0', textAlign: 'center' }}>
                     <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.3rem', color: '#b45309', margin: 0 }}>
                       My Baby Everyday
                     </p>
                  </div>
            </motion.div>
          </motion.div>

          {/* BOTTOM: Typography */}
          <div style={{ textAlign: 'center', pointerEvents: 'none', flexShrink: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              <h2 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2rem, 8vh, 3.5rem)', 
                color: '#92400e', 
                margin: '0 0 1vh 0', 
                fontWeight: 300, 
                lineHeight: 1.1 
              }}>
                Ordinary Days
              </h2>
              <div style={{ width: '60px', height: '2px', backgroundColor: '#f59e0b', margin: '0 auto 2vh auto' }} />
              <p style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(1rem, 3vh, 1.4rem)', 
                color: '#78350f', 
                lineHeight: '1.6', 
                fontStyle: 'italic',
                fontWeight: 300,
                maxWidth: '500px'
              }}>
                "Even ordinary days feel like an extraordinary adventure with you by my side."
              </p>
              <p style={{ 
                fontFamily: 'var(--font-hand)', 
                fontSize: '1.1rem', 
                color: '#b45309', 
                marginTop: '2vh',
                letterSpacing: '0.1em'
              }}>
                — GOLDEN HOUR MEMORIES
              </p>
            </motion.div>
          </div>

        </div>

        {/* Layer 3: Foreground Leaves (Updated Shapes & Depth) */}
        {[
          { top: '-5%', left: '-2%', size: '25vw', rotate: 20 },
          { bottom: '-10%', right: '-5%', size: '30vw', rotate: -15 },
          { top: '70%', left: '10%', size: '15vw', rotate: 45 }
        ].map((leaf, idx) => (
          <motion.div
            key={idx}
            style={{
              position: 'absolute', top: leaf.top, left: leaf.left, right: leaf.right, bottom: leaf.bottom,
              width: leaf.size, height: leaf.size, zIndex: 100, pointerEvents: 'none',
              x: useTransform(springX, [-30, 30], [idx % 2 === 0 ? -40 : 40, idx % 2 === 0 ? 40 : -40]),
              y: useTransform(springY, [-30, 30], [idx % 2 === 0 ? -30 : 30, idx % 2 === 0 ? 30 : -30]),
              rotate: leaf.rotate, filter: 'blur(10px)'
            }}
          >
            <svg viewBox="0 0 24 24" fill="#f59e0b" style={{ width: '100%', height: '100%', opacity: 0.12 }}>
               <path d="M12 22C12 22 13 18 15 17C17 16 21 16 21 16C21 16 18 15 17 13C16 11 16 7 16 7C16 7 15 10 13 11C11 12 7 12 7 12C7 12 10 13 11 15C12 17 12 21 12 21" />
            </svg>
          </motion.div>
        ))}

      </div>
    </SlideWrapper>
  );
}


