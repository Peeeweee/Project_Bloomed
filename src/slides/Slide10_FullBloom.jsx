import React, { useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { PHOTO_URLS } from '../utils/photos';
import SlideWrapper from '../components/SlideWrapper';

export default function Slide10_FullBloom() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 40, damping: 25 });
  const springY = useSpring(0, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 45;
    const y = (e.clientY - window.innerHeight / 2) / 45;
    springX.set(x);
    springY.set(y);
    setMousePos({ x, y });
  };

  return (
    <SlideWrapper style={{ backgroundColor: '#0a1505', overflow: 'hidden' }}>
      <div 
        onMouseMove={handleMouseMove}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        {/* Layer 0: Deep Sanctuary Background */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #152a0a 0%, #0a1505 100%)', zIndex: 0 }} />
        
        {/* Layer 1: Delicate Overgrown Vines */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.3 }}>
           <motion.svg 
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 4, ease: "easeOut" }}
             style={{ position: 'absolute', top: 20, left: 20, width: '300px', height: '300px' }}
             viewBox="0 0 100 100"
           >
              <path d="M10,0 Q30,40 0,100" stroke="#4d7c0f" strokeWidth="0.5" fill="none" />
              <path d="M5,20 Q20,30 10,50" stroke="#4d7c0f" strokeWidth="0.5" fill="none" />
              <circle cx="10" cy="20" r="1.5" fill="#4d7c0f" />
           </motion.svg>
        </div>

        {/* Layer 2: Main Editorial Composition */}
        <div style={{ 
          position: 'relative', width: '100%', height: '100%', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          zIndex: 10, padding: '2vh 2vw' 
        }}>
           
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             style={{ 
               display: 'flex', flexDirection: 'column', alignItems: 'center',
               x: springX, y: springY
             }}
           >
              {/* Headline Above Photo */}
              <div style={{ textAlign: 'center', marginBottom: '2vh' }}>
                 <motion.div
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ delay: 0.5, duration: 1 }}
                   style={{ width: '40px', height: '1px', backgroundColor: '#fbbf24', margin: '0 auto 2vh auto' }}
                 />
                 <h1 style={{ 
                   fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vh, 3.5rem)', color: '#fef3c7', 
                   margin: 0, fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase'
                 }}>
                    In Full Bloom
                 </h1>
              </div>

              {/* Interactive Scattered Collage */}
              <div style={{
                position: 'relative', width: '95vw', maxWidth: '1200px',
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                gap: '1.5vh 1.5vw', padding: '2vh', zIndex: 20
              }}>
                 {PHOTO_URLS.slide10.map((photo, i) => {
                   const rotations = [-5, 4, -3, 6, -2, 5, -6, 3, -4, 7, -5];
                   const rot = rotations[i % rotations.length];
                   return (
                     <motion.div
                       key={i}
                       drag
                       dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                       whileHover={{ scale: 1.15, zIndex: 50, rotate: 0 }}
                       whileDrag={{ scale: 1.2, zIndex: 60, boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}
                       initial={{ opacity: 0, y: 50, scale: 0.8 }}
                       animate={{ opacity: 1, y: 0, scale: 1, rotate: rot }}
                       transition={{ 
                         delay: 0.5 + i * 0.1, 
                         duration: 0.8,
                         type: 'spring', bounce: 0.4
                       }}
                       style={{
                         width: 'clamp(60px, 20vh, 180px)',
                         padding: '0.8vh 0.8vh 3vh 0.8vh',
                         backgroundColor: '#fdfbf7',
                         boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                         borderRadius: '2px',
                         border: '1px solid rgba(0,0,0,0.05)',
                         cursor: 'grab',
                         position: 'relative'
                       }}
                     >
                        <div style={{ width: '100%', aspectRatio: '1/1.4', backgroundColor: '#000', overflow: 'hidden' }}>
                           <img 
                             src={photo} 
                             alt={`Bloom Memory ${i+1}`} 
                             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} 
                           />
                        </div>
                        {i % 3 === 0 && (
                          <div style={{
                            position: 'absolute', top: '-1vh', left: '50%', transform: 'translateX(-50%) rotate(-2deg)',
                            width: '40%', height: '1.5vh', backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(2px)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', zIndex: 10
                          }} />
                        )}
                     </motion.div>
                   );
                 })}
              </div>

              {/* Integrated Botanical Flourish */}
              <div style={{ 
                marginTop: '1vh', display: 'flex', justifyContent: 'center', gap: '30px', 
                opacity: 0.8, filter: 'grayscale(0.2)', zIndex: 10 
              }}>
                 {[1,2,3].map(i => (
                   <motion.div
                     key={i}
                     animate={{ rotate: [0, 5, -5, 0] }}
                     transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                     style={{ width: '24px', height: '24px' }}
                   >
                      <svg viewBox="0 0 24 24" fill="#fbbf24">
                         <circle cx="12" cy="12" r="4" />
                         {[0, 60, 120, 180, 240, 300].map(a => (
                           <ellipse key={a} cx="12" cy="6" rx="2" ry="4" transform={`rotate(${a} 12 12)`} />
                         ))}
                      </svg>
                   </motion.div>
                 ))}
              </div>

              {/* Quote Below Photo */}
              <div style={{ textAlign: 'center', marginTop: '3vh', maxWidth: '650px', zIndex: 10 }}>
                 <p style={{ 
                   fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3vh, 1.6rem)', color: '#f0e8cc', 
                   margin: 0, fontStyle: 'italic', lineHeight: '1.6', opacity: 0.9 
                 }}>
                   "Together we grew something neither of us could have grown alone."
                 </p>
                 <div style={{ 
                   marginTop: '2vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' 
                 }}>
                    <span style={{ 
                      fontFamily: 'var(--font-hand)', fontSize: '1.2rem', color: '#fbbf24', 
                      letterSpacing: '0.2em', textTransform: 'uppercase' 
                    }}>
                       P & H • Sanctuary
                    </span>
                 </div>
              </div>

           </motion.div>
        </div>

        {/* Floating Petals/Pollen for Atmosphere */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
           {Array.from({ length: 15 }).map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 y: [0, -100, 0], 
                 x: [0, Math.random() * 50, 0],
                 opacity: [0, 0.5, 0]
               }}
               transition={{ duration: 10 + i, repeat: Infinity, delay: i * 0.5 }}
               style={{ 
                 position: 'absolute', 
                 bottom: '-10%', left: `${Math.random() * 100}%`,
                 width: '2px', height: '2px', backgroundColor: '#fbbf24', 
                 borderRadius: '50%', filter: 'blur(1px)' 
               }}
             />
           ))}
        </div>

      </div>
    </SlideWrapper>
  );
}
