import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { PHOTO_URLS } from '../utils/photos';

const AnimatedGreenBorders = () => (
  <div style={{ position: 'fixed', inset: '16px', pointerEvents: 'none', zIndex: 50 }}>
    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 2 }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(143, 190, 106, 0.4)', transformOrigin: 'top' }} />
    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2 }} style={{ position: 'absolute', left: 0, top: 0, right: 0, height: '2px', backgroundColor: 'rgba(143, 190, 106, 0.4)', transformOrigin: 'left' }} />
    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 2 }} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(143, 190, 106, 0.4)', transformOrigin: 'bottom' }} />
    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2 }} style={{ position: 'absolute', left: 0, bottom: 0, right: 0, height: '2px', backgroundColor: 'rgba(143, 190, 106, 0.4)', transformOrigin: 'right' }} />
    
    {/* Animated Corner Leaves */}
    {[ { top: -10, left: -10, rot: 45 }, { top: -10, right: -10, rot: -45 }, { bottom: -10, left: -10, rot: 135 }, { bottom: -10, right: -10, rot: -135 } ].map((pos, i) => (
      <motion.svg key={i} width="40" height="40" viewBox="0 0 40 40" style={{ position: 'absolute', ...pos }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.2 }}>
        <motion.path d="M 20 20 Q 40 0 20 0 Q 0 0 20 20" fill="#8fbe6a" transform={`rotate(${pos.rot} 20 20)`} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} />
      </motion.svg>
    ))}
  </div>
);

const FloatingButterflies = () => (
  <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 40 }}>
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: `${Math.random() * 100}vw`, y: `${Math.random() * 100}vh` }}
        animate={{
          x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
          y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
        }}
        transition={{ duration: 20 + Math.random() * 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', width: 30, height: 30 }}
      >
        <motion.div animate={{ scaleX: [1, 0.2, 1], y: [0, -8, 0] }} transition={{ duration: 0.3 + Math.random() * 0.2, repeat: Infinity }}>
          <svg viewBox="0 0 24 24" fill="#f5c842" opacity="0.75">
            <path d="M 12 12 Q 5 5 2 10 Q 5 15 12 12 Q 19 5 22 10 Q 19 15 12 12" />
            <path d="M 12 12 Q 8 18 5 16 Q 8 12 12 12 Q 16 18 19 16 Q 16 12 12 12" fill="#ffaa22" />
          </svg>
        </motion.div>
      </motion.div>
    ))}
  </div>
);

const FallingLeaves = () => (
  <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 10 }}>
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: ['-10vh', '110vh'],
          x: [`${Math.random() * 100}vw`, `${Math.random() * 100 + (Math.random() > 0.5 ? 20 : -20)}vw`],
          rotate: [0, 360]
        }}
        transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear", delay: Math.random() * 15 }}
        style={{ position: 'absolute', width: 24, height: 24, opacity: 0.3 }}
      >
        <svg viewBox="0 0 24 24" fill="#a8c686">
           <path d="M 12 2 Q 20 10 12 20 Q 4 10 12 2 Z" />
        </svg>
      </motion.div>
    ))}
  </div>
);

export default function Slide04_GrowthChart() {
  const containerRef = useRef(null);
  
  // Animate the main vine drawing as you scroll!
  const { scrollYProgress } = useScroll({ container: containerRef });
  // Map scroll (0 to 1) to pathLength (0 to 1), finishing a bit early so the end is visible
  const drawLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  // A beautiful, massive S-curve sinuous vine
  const VINE_PATH = `
    M 300 0
    C 450 150, 450 300, 300 450
    C 150 600, 150 750, 300 900
    C 450 1050, 450 1200, 300 1350
    C 150 1500, 150 1650, 300 1800
    C 450 1950, 450 2100, 300 2250
    C 150 2400, 150 2550, 300 2700
    C 450 2850, 450 3000, 300 3150
    C 150 3300, 150 3450, 300 3600
    C 450 3750, 450 3900, 300 4050
    C 150 4200, 150 4350, 300 4500
  `;

  // Position milestones precisely on the curves of the vine
  const milestones = [
    { id: 1, label: "Our First Date", date: "March 2, 2026", photo: PHOTO_URLS.slide04.m1, x: 410, y: 225, rotation: 6, side: 'right' },
    { id: 2, label: "Our First Park Date", date: "March 5, 2026", photo: PHOTO_URLS.slide04.m2, x: 190, y: 675, rotation: -4, side: 'left' },
    { id: 3, label: "Our First Study Date", date: "March 9, 2026", photo: PHOTO_URLS.slide04.m3, x: 410, y: 1125, rotation: 5, side: 'right' },
    { id: 4, label: "My After Arduino Date", date: "March 25, 2026", photo: PHOTO_URLS.slide04.m4, x: 190, y: 1575, rotation: -6, side: 'left' },
    { id: 5, label: "My Baby Going Home", date: "March 28, 2026", photo: PHOTO_URLS.slide04.m5, x: 410, y: 2025, rotation: 3, side: 'right' },
    { id: 6, label: "My Easter SunDate", date: "April 5, 2026", photo: PHOTO_URLS.slide04.m6, x: 190, y: 2475, rotation: -5, side: 'left' },
    { id: 7, label: "My First Intrams and My Date", date: "April 14, 2026", photo: PHOTO_URLS.slide04.m7, x: 410, y: 2925, rotation: 4, side: 'right' },
    { id: 8, label: "My Philippine Eagle Date", date: "April 18, 2026", photo: PHOTO_URLS.slide04.m8, x: 190, y: 3375, rotation: -4, side: 'left' },
    { id: 9, label: "My Arcade Date", date: "April 24, 2026", photo: PHOTO_URLS.slide04.m9, x: 410, y: 3825, rotation: 5, side: 'right' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 3, 
        filter: 'blur(20px)',
        transition: { duration: 1.5, ease: "easeIn" } 
      }}
      transition={{ duration: 1.5, delay: 0.5 }} // Fade in gently while the Slide03 butterfly flies away
      style={{ backgroundColor: '#fcfaf5', width: '100vw', height: '100vh', display: 'flex', position: 'absolute', top: 0, left: 0 }}
    >
      
      {/* Decorative Overlays */}
      <AnimatedGreenBorders />
      <FloatingButterflies />
      <FallingLeaves />

      {/* Background ambient glowing spores for a magical garden feel */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 3 }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              width: Math.random() * 15 + 5 + 'px',
              height: Math.random() * 15 + 5 + 'px',
              backgroundColor: '#a8c686',
              borderRadius: '50%',
              filter: 'blur(8px)',
              opacity: 0.2
            }}
          />
        ))}
      </div>

      {/* The scrollable viewport */}
      <div 
        ref={containerRef}
        style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth', position: 'relative', zIndex: 1 }}
      >
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative', paddingBottom: '30vh' }}>
          
          {/* HEADER */}
          <div style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '80px', position: 'relative', zIndex: 10 }}>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', color: '#2a4a1a', margin: '0 0 15px 0', textShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
            >
              How We Grew
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
              style={{ fontFamily: 'var(--font-hand)', fontSize: '1.6rem', color: '#7a9a5a', margin: 0 }}
            >
              Scroll down to trace our roots
            </motion.p>
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} 
              style={{ marginTop: '30px', color: '#7a9a5a', fontSize: '2rem' }}
            >
              ↓
            </motion.div>
          </div>

          {/* THE EXTRAVAGANT VINE CONTAINER */}
          <div style={{ position: 'relative', width: 'clamp(300px, 80vw, 600px)', height: '4500px', margin: '0 auto' }}>
            
            {/* SVG Main Stem & Drop Shadow */}
            <svg width="100%" height="4500" viewBox="0 0 600 4500" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
              {/* Outer glow/shadow for depth */}
              <motion.path 
                d={VINE_PATH} 
                fill="none" 
                stroke="#3B6D11" 
                strokeWidth="18"
                strokeLinecap="round"
                opacity="0.1"
                style={{ pathLength: drawLength, filter: 'blur(6px)' }}
              />
              {/* Core Vine */}
              <motion.path 
                d={VINE_PATH} 
                fill="none" 
                stroke="#5a823b" 
                strokeWidth="8"
                strokeLinecap="round"
                style={{ pathLength: drawLength }}
              />
            </svg>

            {/* Decorative Wild Branches (No Photos) */}
            {[
              { y: 450, x: 300, side: 'left', rot: -15 },
              { y: 900, x: 300, side: 'right', rot: 10 },
              { y: 1350, x: 300, side: 'left', rot: -20 },
              { y: 1800, x: 300, side: 'right', rot: 15 },
              { y: 2250, x: 300, side: 'left', rot: -10 },
              { y: 2700, x: 300, side: 'right', rot: 25 },
              { y: 3150, x: 300, side: 'left', rot: -30 },
              { y: 3600, x: 300, side: 'right', rot: 12 },
              { y: 4050, x: 300, side: 'left', rot: -18 },
            ].map((b, i) => (
              <div key={`branch-${i}`} style={{ position: 'absolute', top: b.y, left: `${(b.x / 600) * 100}%`, width: 0, height: 0 }}>
                <motion.svg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  width="100" height="60" viewBox="0 0 100 60" 
                  style={{ position: 'absolute', left: b.side === 'left' ? -100 : 0, top: -30, transform: b.side === 'left' ? 'scaleX(-1)' : 'none' }}
                >
                  <path d="M 0 30 Q 50 0 100 20" stroke="#5a823b" strokeWidth="3" fill="none" />
                  <circle cx="100" cy="20" r="4" fill="#8fbe6a" />
                </motion.svg>
              </div>
            ))}

            {/* Milestones / Hanging Polaroids */}
            {milestones.map((m) => (
              <div key={m.id} style={{ position: 'absolute', top: m.y, left: `${(m.x / 600) * 100}%`, width: 0, height: 0 }}>
                
                {/* Branch connecting vine to photo */}
                <motion.svg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-200px" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{ position: 'absolute', top: -10, left: m.side === 'left' ? -80 : 0, width: 80, height: 40, overflow: 'visible', zIndex: 1 }}
                >
                  <path d={m.side === 'left' ? "M0,20 Q40,-10 80,0" : "M0,0 Q40,-10 80,20"} fill="none" stroke="#729854" strokeWidth="4" />
                  {/* Decorative Leaves on Branch */}
                  <path d={m.side === 'left' ? "M 30 5 Q 40 -15 30 -20 Q 20 -15 30 5" : "M 50 5 Q 60 -15 50 -20 Q 40 -15 50 5"} fill="#8fbe6a" />
                  <path d={m.side === 'left' ? "M 50 15 Q 60 30 50 40 Q 40 30 50 15" : "M 30 15 Q 40 30 30 40 Q 20 30 30 15"} fill="#6a9e40" />
                </motion.svg>

                {/* Hanging Polaroid */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.4, rotate: m.side === 'left' ? -30 : 30 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: m.rotation }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                  viewport={{ once: false, margin: "-150px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: -120, 
                    left: m.side === 'left' ? 'clamp(-380px, -45vw, -200px)' : 'clamp(60px, 8vw, 100px)',
                    width: 'clamp(200px, 42vw, 360px)',
                    backgroundColor: '#fffdf9',
                    padding: '12px 12px 48px 12px',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)',
                    borderRadius: '2px',
                    transformOrigin: m.side === 'left' ? 'right center' : 'left center',
                    zIndex: 10,
                    cursor: 'pointer'
                  }}
                >
                  {/* Tape */}
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)',
                    width: '100px', height: '28px', backgroundColor: 'rgba(235, 230, 210, 0.95)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)', zIndex: 12, border: '1px solid rgba(0,0,0,0.03)'
                  }} />

                  {/* Photo Container */}
                  <div style={{ position: 'relative', width: '100%', height: 'auto', backgroundColor: '#e0e0e0', overflow: 'hidden', minHeight: '180px' }}>
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={m.photo} 
                      alt={m.label}
                      style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  
                  {/* Typography inside Polaroid */}
                  <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-hand)', color: '#3d2e1e', fontSize: '1.4rem' }}>
                      {m.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', color: '#8b7d6b', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '6px', fontWeight: 'bold' }}>
                      {m.date}
                    </div>
                  </div>
                </motion.div>

              </div>
            ))}

            {/* The Terracotta Pot at the base of the vine */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              style={{ position: 'absolute', top: 4450, left: 200, width: 200, height: 180, zIndex: 20 }}
            >
              <svg width="200" height="180" viewBox="0 0 200 180" style={{ overflow: 'visible' }}>
                {/* Back rim */}
                <ellipse cx="100" cy="30" rx="80" ry="15" fill="#8a4b31" />
                {/* Soil */}
                <ellipse cx="100" cy="30" rx="70" ry="10" fill="#3e2723" />
                {/* Body of the pot */}
                <path d="M 20 30 Q 30 150 60 170 L 140 170 Q 170 150 180 30 Z" fill="#d27b53" />
                {/* Front rim */}
                <path d="M 20 30 C 20 50, 180 50, 180 30 C 180 10, 20 10, 20 30" fill="none" stroke="#a45a3a" strokeWidth="8" />
                {/* Shadows/Highlights for 3D effect */}
                <path d="M 30 50 Q 40 140 65 160" fill="none" stroke="#a45a3a" strokeWidth="15" strokeLinecap="round" opacity="0.6" />
                {/* Little grass tufts growing in the soil */}
                <path d="M 70 25 Q 75 10 80 25" fill="none" stroke="#5a823b" strokeWidth="3" strokeLinecap="round" />
                <path d="M 120 28 Q 130 10 135 25" fill="none" stroke="#729854" strokeWidth="4" strokeLinecap="round" />
                <path d="M 90 22 Q 95 5 100 22" fill="none" stroke="#8fbe6a" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* THE BIG QUOTE / NOTE BELOW THE POT */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ 
                position: 'absolute', 
                top: 4700, 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: 'min(90vw, 600px)',
                textAlign: 'center',
                paddingBottom: '20vh'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 6vh, 3.5rem)',
                color: '#2a4a1a',
                lineHeight: 1.2,
                marginBottom: '20px',
                textShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                "Together we will make it longer and healthier"
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ height: '2px', background: 'linear-gradient(to right, transparent, #8fbe6a, transparent)', width: '60%', margin: '0 auto 20px auto' }}
              />
              <div style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.8rem',
                color: '#7a9a5a',
                opacity: 0.8
              }}>
                A promise for every tomorrow. 🌱
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
