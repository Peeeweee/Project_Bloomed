import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTO_URLS } from '../utils/photos';

export default function Slide06_FirstTrip() {
  const [isFlipped, setIsFlipped] = useState(false);
  const photos = PHOTO_URLS.slide06;
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
    if (!isFlipped) {
      const timer = setInterval(() => {
        setCurrentPhoto((prev) => (prev + 1) % photos.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentPhoto, isFlipped, photos.length]);

  // Dynamic Drifting Clouds Data
  const clouds = [
    { id: 1, top: '10%', delay: 0, duration: 40, size: 1.0 },
    { id: 2, top: '45%', delay: -20, duration: 55, size: 1.5 },
    { id: 3, top: '75%', delay: -10, duration: 45, size: 0.8 },
  ];

  const eagles = [
    { id: 1, top: '15%', delay: 5, duration: 25, size: 0.5 },
    { id: 2, top: '35%', delay: 15, duration: 35, size: 0.7 },
    { id: 3, top: '65%', delay: 0, duration: 30, size: 0.4 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        scale: [1, 0.4, 0.05],
        rotateZ: [0, 20, 60],
        rotateY: [0, 90, 110],
        rotateX: [0, -30, -50],
        x: ['0vw', '20vw', '120vw'],
        y: ['0vh', '-20vh', '-120vh'],
        opacity: [1, 1, 0],
        clipPath: [
          'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Full screen
          'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond fold
          'polygon(100% 0%, 100% 0%, 40% 100%, 0% 50%)', // Airplane Dart shape
          'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)'  // Vanished point
        ]
      }}
      transition={{ 
        duration: 2, 
        ease: [0.45, 0, 0.55, 1],
        times: [0, 0.4, 0.8, 1]
      }}
      style={{ 
        width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, overflow: 'hidden',
        background: 'linear-gradient(135deg, #d3e2e8 0%, #f4eee1 100%)' // Vintage sky blue to parchment
      }}
    >
      
      {/* Drifting Clouds Background */}
      {clouds.map(c => (
        <motion.svg key={c.id} 
          viewBox="0 0 100 40" 
          style={{ 
            position: 'absolute', top: c.top, left: '-20%', 
            width: `${300 * c.size}px`, height: 'auto', 
            fill: 'rgba(255,255,255,0.6)', 
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.06))', 
            zIndex: 0 
          }}
          animate={{ x: ['0vw', '130vw'] }}
          transition={{ duration: c.duration, ease: 'linear', repeat: Infinity, delay: c.delay }}
        >
          <path d="M20 20 Q 20 10 30 10 Q 40 0 50 10 Q 70 5 80 20 Q 90 20 90 30 Q 90 40 80 40 L 20 40 Q 10 40 10 30 Q 10 20 20 20 Z" />
        </motion.svg>
      ))}

      {/* Soaring Philippine Eagles */}
      {eagles.map(e => (
        <motion.div
          key={e.id}
          style={{ 
            position: 'absolute', top: e.top, left: '-15%', 
            width: `${100 * e.size}px`, height: 'auto', 
            zIndex: 1, opacity: 0.4, pointerEvents: 'none'
          }}
          animate={{ 
            x: ['0vw', '130vw'],
            y: [0, -20, 10, 0] // Subtle soaring oscillation
          }}
          transition={{ 
            x: { duration: e.duration, ease: 'linear', repeat: Infinity, delay: e.delay },
            y: { duration: 5, ease: 'easeInOut', repeat: Infinity }
          }}
        >
          <svg viewBox="0 0 100 60" fill="#3d2e1e">
             {/* Simple but majestic eagle silhouette */}
             <path d="M50 30 Q 30 10 10 25 Q 5 20 0 10 Q 15 5 45 25 L 50 28 L 55 25 Q 85 5 100 10 Q 95 20 90 25 Q 70 10 50 30 Z" />
             <path d="M48 28 L 52 28 L 50 35 Z" /> {/* head/beak area */}
          </svg>
        </motion.div>
      ))}

      {/* Looping Paper Airplane Animation */}
      <motion.div
        animate={{ 
          x: ['-10vw', '50vw', '120vw'],
          y: ['60vh', '15vh', '80vh'],
          rotateZ: [15, -15, 35]
        }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
        style={{ position: 'absolute', zIndex: 5, width: '45px', height: '45px', filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.2))' }}
      >
        <svg viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round">
          <path d="M 22 2 L 15 22 L 11 13 L 2 9 Z" fill="#fffdf5" stroke="#9ba6ab" strokeWidth="1"/>
          <path d="M 22 2 L 11 13" stroke="#9ba6ab" strokeWidth="1"/>
        </svg>
      </motion.div>

      {/* Aggressive Passport Stamp Animation */}
      <motion.div
        initial={{ scale: 4, opacity: 0, rotate: -40 }}
        animate={{ scale: 1, opacity: 0.15, rotate: -15 }}
        transition={{ duration: 0.6, delay: 1.2, type: 'spring', bounce: 0.5 }}
        style={{ position: 'absolute', top: '12%', left: '15%', width: '180px', height: '180px', zIndex: 1, pointerEvents: 'none' }}
      >
        <svg viewBox="0 0 100 100" stroke="#8b4513" fill="none" strokeWidth="2.5">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="38" strokeDasharray="6 4" strokeWidth="1.5" />
          <path d="M 20 50 L 80 50" strokeWidth="1" />
          <text x="50" y="44" fontSize="11" fill="#8b4513" textAnchor="middle" fontWeight="bold" fontFamily="var(--font-serif)" letterSpacing="2px">WANDERLUST</text>
          <text x="50" y="65" fontSize="13" fill="#8b4513" textAnchor="middle" fontWeight="bold" fontFamily="monospace">APPROVED</text>
        </svg>
      </motion.div>

      {/* Centerpiece: Interactive 3D Flipping Postcard */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', perspective: '2000px' }}>
        
        <motion.div
          initial={{ y: 80, opacity: 0, rotateZ: 4, rotateY: -20 }}
          animate={{ y: 0, opacity: 1, rotateZ: 2, rotateY: 0 }}
          whileHover={{ scale: 1.03, rotateZ: 0, rotateY: 4 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ 
            width: '90vw', 
            maxWidth: '380px', 
            aspectRatio: '1 / 1.4',
            maxHeight: 'min(65vh, 600px)',
            position: 'relative', 
            cursor: 'pointer', 
            transformStyle: 'preserve-3d',
            flexShrink: 1
          }}
        >
          {/* 3D Flipper Container */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 50, damping: 15 }}
            style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
          >
            
            {/* --- FRONT OF POSTCARD (Photo & Title) --- */}
            <div style={{ 
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden', 
              backgroundColor: '#fbf9f4', padding: '15px', borderRadius: '6px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.08)', 
              border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column',
              gap: '15px'
            }}>
              {/* Photo Area with Airmail Border */}
              <div style={{ 
                width: '100%', 
                flex: 1, 
                backgroundColor: '#e2ddcd', 
                overflow: 'hidden', 
                position: 'relative', 
                borderRadius: '4px'
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  />
                </AnimatePresence>

                {/* Airmail Borders */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'repeating-linear-gradient(45deg, #c74b4b, #c74b4b 12px, transparent 12px, transparent 24px, #4b6bc7 24px, #4b6bc7 36px, transparent 36px, transparent 48px)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: 'repeating-linear-gradient(-45deg, #c74b4b, #c74b4b 12px, transparent 12px, transparent 24px, #4b6bc7 24px, #4b6bc7 36px, transparent 36px, transparent 48px)' }} />

                {/* Nav Buttons */}
                <button onClick={prevPhoto} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 30, cursor: 'pointer' }}>←</button>
                <button onClick={nextPhoto} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 30, cursor: 'pointer' }}>→</button>
              </div>
              
              {/* Header Text */}
              <div style={{ textAlign: 'center', padding: '5px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 2px 0', fontSize: '1.4rem', color: '#3d2e1e', fontWeight: 600 }}>Our First Trip</h3>
                <p style={{ fontFamily: 'var(--font-body)', margin: '0 0 8px 0', color: '#8b7d6b', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 'bold' }}>Philippine Eagle</p>
                <div style={{ fontFamily: 'var(--font-hand)', color: '#b0a694', fontSize: '0.9rem' }}>
                  Tap to flip ↺
                </div>
              </div>
            </div>

            {/* --- BACK OF POSTCARD (Handwritten Message & Address) --- */}
            <div style={{ 
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
              backgroundColor: '#fbf9f4', padding: '25px', borderRadius: '6px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.08)', 
              border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column', gap: '20px', 
              backgroundImage: 'radial-gradient(#d3cec1 1px, transparent 1px)', backgroundSize: '24px 24px' 
            }}>
              
              {/* Top Side: Stamp & Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                 {/* Fill-in-the-blank Lines */}
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', paddingTop: '10px' }}>
                    <div style={{ borderBottom: '1px solid #c8c0b0', paddingBottom: '2px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#8b7d6b', letterSpacing: '0.15em' }}>
                      TO: <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#3d2e1e' }}>Hanami</span>
                    </div>
                    <div style={{ borderBottom: '1px solid #c8c0b0', paddingBottom: '2px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#8b7d6b', letterSpacing: '0.15em' }}>
                      DEST: <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#5a4a3a' }}>Philippine Eagle</span>
                    </div>
                    <div style={{ borderBottom: '1px solid #c8c0b0', paddingBottom: '2px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#8b7d6b', letterSpacing: '0.15em' }}>
                      DATE: <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: '#5a4a3a' }}>April 18, 2026</span>
                    </div>
                  </div>

                {/* Vintage Postage Stamp */}
                <div style={{ width: '60px', height: '75px', backgroundColor: '#f0ece1', border: '2px dashed #b8b0a0', padding: '4px', transform: 'rotate(4deg)' }}>
                  <img src={photos[0]} alt="Stamp" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'sepia(80%) contrast(120%)' }} />
                </div>
              </div>

              {/* Bottom Side: The Message */}
              <div style={{ flex: 1, borderTop: '1.5px solid #dcd5c7', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ fontFamily: 'var(--font-hand)', fontSize: '1.4rem', color: '#4a3a2a', lineHeight: '1.4', transform: 'rotate(-1deg)' }}>
                  "Every trip with you is a new species of happy."
                </div>
                <div style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#7a6a50', fontStyle: 'italic' }}>
                  Our first real adventure together! I loved seeing your eyes light up seeing the eagles.
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* Floating Instructional Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ marginTop: '50px', fontFamily: 'var(--font-hand)', fontSize: '1.3rem', color: '#8c8070', textShadow: '0 2px 4px rgba(255,255,255,0.5)' }}
        >
          (Click the postcard to read the back)
        </motion.div>

      </div>
    </motion.div>
  );
}
