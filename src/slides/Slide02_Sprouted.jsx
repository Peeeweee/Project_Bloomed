import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';

const BackgroundLeaves = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <motion.div 
      className="animate-float-slow"
      style={{ position: 'absolute', top: '-10%', left: '-20%', opacity: 0.12 }}
    >
      <svg width="400" height="400" viewBox="0 0 100 100" fill="#8fbe6a">
        <path d="M10,90 Q50,0 90,10 Q50,100 10,90 Z" />
        <path d="M10,90 Q30,40 90,10" stroke="#729854" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
    <motion.div 
      className="animate-float-rotate"
      style={{ position: 'absolute', bottom: '-15%', right: '-15%', opacity: 0.1 }}
    >
      <svg width="450" height="450" viewBox="0 0 100 100" fill="#a8c686">
        <path d="M90,90 Q10,50 10,10 Q100,10 90,90 Z" />
        <path d="M90,90 Q50,50 10,10" stroke="#87a06a" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  </div>
);

const FloatingSpores = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
        animate={{
          y: '-10vh',
          x: `${Math.random() * 100}vw`,
          opacity: [0, 0.6, 0.6, 0],
          scale: [0.5, 1.5, 0.5]
        }}
        transition={{ duration: 15 + Math.random() * 20, delay: Math.random() * 10, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', backgroundColor: '#c8b89a', filter: 'blur(1px)' }}
      />
    ))}
  </div>
);

const AnimatedGreenBorders = () => {
  return (
    <div style={{ position: 'absolute', inset: '24px', pointerEvents: 'none', zIndex: 5 }}>
      {/* The drawing box lines */}
      <motion.div 
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', backgroundColor: '#8fbe6a', transformOrigin: 'top' }} 
      />
      <motion.div 
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        style={{ position: 'absolute', left: 0, top: 0, right: 0, height: '2px', backgroundColor: '#8fbe6a', transformOrigin: 'left' }} 
      />
      <motion.div 
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '2px', backgroundColor: '#8fbe6a', transformOrigin: 'bottom' }} 
      />
      <motion.div 
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        style={{ position: 'absolute', left: 0, bottom: 0, right: 0, height: '2px', backgroundColor: '#8fbe6a', transformOrigin: 'right' }} 
      />

      {/* Top Left Leafy Cluster */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7, duration: 0.8 }}
        style={{ position: 'absolute', top: '-12px', left: '-12px', width: 24, height: 24 }}
      >
        <svg viewBox="0 0 20 20" className="animate-float-slow">
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#729854" transform="rotate(45, 10, 10)" />
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#8fbe6a" transform="rotate(-15, 10, 10) scale(0.7) translate(-2, -5)" />
        </svg>
      </motion.div>

      {/* Top Right Leafy Cluster */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.9, duration: 0.8 }}
        style={{ position: 'absolute', top: '-12px', right: '-12px', width: 24, height: 24 }}
      >
        <svg viewBox="0 0 20 20" className="animate-float-slow">
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#729854" transform="rotate(-45, 10, 10)" />
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#a8c686" transform="rotate(15, 10, 10) scale(0.7) translate(2, -5)" />
        </svg>
      </motion.div>

      {/* Bottom Left Leafy Cluster */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '-12px', left: '-12px', width: 24, height: 24 }}
      >
        <svg viewBox="0 0 20 20" className="animate-float-rotate">
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#729854" transform="rotate(135, 10, 10)" />
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#8fbe6a" transform="rotate(75, 10, 10) scale(0.8) translate(-2, 5)" />
        </svg>
      </motion.div>

      {/* Bottom Right Leafy Cluster */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.0, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '-12px', right: '-12px', width: 24, height: 24 }}
      >
        <svg viewBox="0 0 20 20" className="animate-float-rotate">
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#729854" transform="rotate(-135, 10, 10)" />
          <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#a8c686" transform="rotate(-75, 10, 10) scale(0.8) translate(2, 5)" />
        </svg>
      </motion.div>

      {/* Border Sprouts */}
      {[20, 50, 80].map((pos, i) => (
        <motion.div 
          key={`top-${i}`}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 + i*0.2, duration: 0.5 }}
          style={{ position: 'absolute', top: '-6px', left: `${pos}%`, transformOrigin: 'bottom' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" className="animate-float-slow">
            <path d="M6 12 Q0 6 6 0 Q12 6 6 12 Z" fill="#a8c686" transform="rotate(45, 6, 6)" />
          </svg>
        </motion.div>
      ))}
      {[30, 60].map((pos, i) => (
        <motion.div 
          key={`bottom-${i}`}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.1 + i*0.2, duration: 0.5 }}
          style={{ position: 'absolute', bottom: '-6px', left: `${pos}%`, transformOrigin: 'top' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" className="animate-float-rotate">
            <path d="M6 12 Q0 6 6 0 Q12 6 6 12 Z" fill="#8fbe6a" transform="rotate(45, 6, 6)" />
          </svg>
        </motion.div>
      ))}
      {[25, 75].map((pos, i) => (
        <motion.div 
          key={`left-${i}`}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9 + i*0.2, duration: 0.5 }}
          style={{ position: 'absolute', left: '-6px', top: `${pos}%`, transformOrigin: 'right' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" className="animate-pulse-slow">
            <path d="M6 12 Q0 6 6 0 Q12 6 6 12 Z" fill="#729854" transform="rotate(-45, 6, 6)" />
          </svg>
        </motion.div>
      ))}
      {[40, 80].map((pos, i) => (
        <motion.div 
          key={`right-${i}`}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 + i*0.2, duration: 0.5 }}
          style={{ position: 'absolute', right: '-6px', top: `${pos}%`, transformOrigin: 'left' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" className="animate-pulse-slow">
            <path d="M6 12 Q0 6 6 0 Q12 6 6 12 Z" fill="#8fbe6a" transform="rotate(-45, 6, 6)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

import { PHOTO_URLS } from '../utils/photos';

export default function Slide02_Sprouted() {
  const photos = PHOTO_URLS.slide02;
  
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

  return (
    <SlideWrapper style={{ backgroundColor: '#f5f0e8' }}>
      <AnimatedGreenBorders />
      <BackgroundLeaves />
      <FloatingSpores />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '2vh 5vw',
        boxSizing: 'border-box',
        height: '100%',
        gap: '2vh',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Polaroid Card */}
        <motion.div
          initial={{ opacity: 0, rotate: -8, y: 40 }}
          animate={{ opacity: 1, rotate: [-2.5, 1.5, -2.5], y: 0 }}
          transition={{ 
            y: { duration: 0.8, ease: "easeOut", delay: 0.3 },
            opacity: { duration: 0.8, delay: 0.3 },
            rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.1 } 
          }}
          style={{
            width: '90vw',
            maxWidth: '600px',
            backgroundColor: 'white',
            padding: '1.5vh 2vw 3vh 2vw',
            boxShadow: '0 12px 32px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)',
            borderRadius: '2px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh',
            flexShrink: 1
          }}
        >
          {/* Masking Tape */}
          <div style={{
            position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%) rotate(-3deg)',
            width: '180px', height: '40px', backgroundColor: 'rgba(240, 235, 220, 0.85)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 20, border: '1px solid rgba(0,0,0,0.02)'
          }} />

          {/* Tucked Dried Flower */}
          <motion.div 
            initial={{ rotate: 60, opacity: 0, x: -20 }} 
            animate={{ rotate: 15, opacity: 1, x: 0 }} 
            transition={{ delay: 1.2, duration: 0.8, ease: "backOut" }}
            style={{ position: 'absolute', top: '10px', right: '-45px', zIndex: -1 }}
          >
            <svg width="80" height="100" viewBox="0 0 60 80">
              <path d="M30 80 Q35 40 50 10" stroke="#8b7d6b" strokeWidth="1.5" fill="none" />
              <path d="M30 60 Q45 50 40 30" stroke="#8b7d6b" strokeWidth="1" fill="none" />
              <circle cx="50" cy="10" r="4" fill="#d4c3a3" />
              <circle cx="45" cy="5" r="3" fill="#c4b393" />
              <circle cx="55" cy="6" r="3" fill="#e8dfc8" />
              <circle cx="40" cy="30" r="2.5" fill="#d4c3a3" />
            </svg>
          </motion.div>

          {/* Slideshow Container */}
          <div style={{ position: 'relative', width: '100%', backgroundColor: '#f0f0f0', overflow: 'hidden', borderRadius: '1px' }}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentPhoto}
                src={photos[currentPhoto]}
                alt="Memory" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }} 
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '30vh',
                  objectFit: 'cover',
                  display: 'block',
                  flexShrink: 1
                }} 
              />
            </AnimatePresence>

            {/* Navigation Buttons */}
            {photos.length > 1 && (
              <>
                <button 
                  onClick={prevPhoto}
                  style={{
                    position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%',
                    width: '30px', height: '30px', cursor: 'pointer', zIndex: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#5a4a3a'
                  }}
                >
                  ←
                </button>
                <button 
                  onClick={nextPhoto}
                  style={{
                    position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%',
                    width: '30px', height: '30px', cursor: 'pointer', zIndex: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#5a4a3a'
                  }}
                >
                  →
                </button>
              </>
            )}
          </div>

          <div style={{
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'var(--font-hand)',
            fontSize: 'clamp(0.7rem, 1.5vh, 1rem)',
            color: '#5a4a3a'
          }}>
            InnovaCCOn
          </div>
        </motion.div>

        {/* Botanical Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ flexShrink: 0 }}
        >
          <svg width="200" height="24" viewBox="0 0 200 24">
            <line x1="0" y1="12" x2="88" y2="12" stroke="#c8b89a" strokeWidth="1" />
            <path d="M100 7 Q105 7 105 12 Q105 17 100 17 Q95 17 95 12 Q95 7 100 7 Z" fill="#3B6D11" />
            <line x1="112" y1="12" x2="200" y2="12" stroke="#c8b89a" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Botanical Field Note Card Wrapper */}
        <motion.div
          className="animate-float-slow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            padding: '4px',
            backgroundColor: '#dcd3c0',
            borderRadius: '10px',
            width: '90vw',
            maxWidth: '600px',
            boxSizing: 'border-box',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            flexShrink: 1
          }}
        >
          {/* Inner Dashed Card */}
          <div style={{
            backgroundColor: '#fffdf7',
            border: '1px dashed #b8a68b',
            borderRadius: '6px',
            padding: '2vh 20px',
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            {/* Top-Right Decorative Leaf */}
            <motion.svg 
              className="animate-pulse-slow"
              width="24" height="24" viewBox="0 0 20 20" 
              style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
              <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#8fbe6a" />
            </motion.svg>
            
            {/* Top-Left Decorative Leaf */}
            <motion.svg 
              className="animate-pulse-slow"
              width="24" height="24" viewBox="0 0 20 20" 
              style={{ position: 'absolute', top: '16px', left: '16px', transform: 'scaleX(-1)' }}
            >
              <path d="M10 2 Q18 10 10 18 Q2 10 10 2 Z" fill="#8fbe6a" />
            </motion.svg>

            {/* Label */}
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.55rem, 1.2vh, 0.7rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#8b7d6b',
              textAlign: 'center',
              marginBottom: '1.5vh',
              fontWeight: 'bold'
            }}>
              — A Beautiful Beginning —
            </div>

            {/* Main Content Text */}
            <div style={{
              fontFamily: 'var(--font-hand)',
              fontSize: 'clamp(0.9rem, 2.5vh, 1.4rem)',
              color: '#3d2e1e',
              lineHeight: '1.7',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8vh',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0 }}>Our paths crossed exactly where we were meant to be.</p>
              <p style={{ margin: 0 }}>The day everything changed: the day we found each other.</p>
              <p style={{ margin: 0 }}>The moment: She was upstairs, and I was completely below staring at her focused face.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </SlideWrapper>
  );
}
