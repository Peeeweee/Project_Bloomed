import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { PHOTO_URLS } from '../utils/photos';

const GlowingSun = () => (
  <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 1 }}>
    {/* Massive Glow */}
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: 'absolute', left: '-250px', top: '-250px', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(255, 210, 80, 0.35) 0%, rgba(255, 150, 50, 0.1) 40%, transparent 70%)',
        zIndex: -1
      }}
    />

    {/* Sun Rays */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      style={{ position: 'absolute', left: '-120px', top: '-120px', width: '240px', height: '240px' }}
    >
      <svg width="240" height="240" viewBox="0 0 240 240" style={{ opacity: 0.5 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <polygon key={i} points="118,10 122,10 120,0" fill="#ffcc44" transform={`rotate(${i * 22.5} 120 120)`} />
        ))}
      </svg>
    </motion.div>

    {/* Inner Sun */}
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      style={{ position: 'absolute', left: '-60px', top: '-60px' }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="#ffaa22" filter="blur(4px)" />
          <circle cx="60" cy="60" r="40" fill="#ffdb58" />
          <circle cx="60" cy="60" r="35" fill="#fff5cc" />
        </svg>
      </motion.div>
    </motion.div>
  </div>
);

const GoldenDust = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 5 }}>
    {Array.from({ length: 25 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: `${100 + Math.random() * 20}vh`, x: `${Math.random() * 100}vw`, opacity: 0, scale: Math.random() * 0.8 + 0.4 }}
        animate={{
          y: [`${100 + Math.random() * 20}vh`, `${-10 - Math.random() * 20}vh`],
          x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
          opacity: [0, 0.8, 0.8, 0]
        }}
        transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
        style={{
          position: 'absolute', width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: '#ffeba1', boxShadow: '0 0 12px #ffcc44', filter: 'blur(1px)'
        }}
      />
    ))}
  </div>
);

const FlyingBirds = () => {
  const birds = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 25, // Stagger their entrances
    duration: 25 + Math.random() * 15, // How long it takes to cross the screen
    yStart: 10 + Math.random() * 40, // Start height (10vh to 50vh)
    yEnd: 5 + Math.random() * 30, // End height
    scale: 0.25 + Math.random() * 0.45, // Varying sizes for depth
    wingSpeed: 0.5 + Math.random() * 0.4 // How fast they flap
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 4 }}>
      {birds.map((b) => (
        <motion.div
          key={b.id}
          initial={{ x: '-10vw', y: `${b.yStart}vh`, scale: b.scale }}
          animate={{ x: '110vw', y: `${b.yEnd}vh` }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "linear", delay: b.delay }}
          style={{ position: 'absolute' }}
        >
          <motion.svg width="40" height="20" viewBox="0 0 40 20"
            animate={{ scaleY: [1, 0.2, 1] }} transition={{ duration: b.wingSpeed, repeat: Infinity }}
          >
            <path d="M0,10 Q10,0 20,10 Q30,0 40,10 Q30,5 20,12 Q10,5 0,10 Z" fill="#5c3a21" opacity={0.4 + Math.random() * 0.4} />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
};

const DriftingClouds = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
    <motion.div
      initial={{ x: '-40vw', opacity: 0 }}
      animate={{ x: '110vw', opacity: [0, 0.5, 0] }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 0 }}
      style={{ position: 'absolute', top: '30%', width: '400px', height: '120px', background: 'radial-gradient(ellipse, rgba(255,230,200,0.3) 0%, transparent 60%)', filter: 'blur(25px)' }}
    />
    <motion.div
      initial={{ x: '-40vw', opacity: 0 }}
      animate={{ x: '110vw', opacity: [0, 0.4, 0] }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 12 }}
      style={{ position: 'absolute', top: '50%', width: '500px', height: '160px', background: 'radial-gradient(ellipse, rgba(255,210,180,0.25) 0%, transparent 60%)', filter: 'blur(30px)' }}
    />
  </div>
);

export default function Slide03_Morning() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPhoto, setCurrentPhoto] = useState(0);
  
  const morningPhotos = PHOTO_URLS.slide03;

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % morningPhotos.length);
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + morningPhotos.length) % morningPhotos.length);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % morningPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPhoto, morningPhotos.length]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <motion.div 
      initial={{ clipPath: 'circle(0% at 50% 100%)', opacity: 1, scaleX: 1, scaleY: 1, y: 0 }}
      animate={{ 
        clipPath: 'circle(150% at 50% 100%)', 
        opacity: 1, scaleX: 1, scaleY: 1, y: 0,
        transition: { duration: 2.5, ease: [0.4, 0.0, 0.2, 1] }
      }}
      exit={{ 
        clipPath: [
          'polygon(0% 0%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%, 0% 50%)', // Full slide rectangle
          'polygon(10% 30%, 50% 50%, 90% 30%, 70% 90%, 50% 60%, 30% 90%, 10% 50%)', // Folds into Butterfly!
          'polygon(10% 30%, 50% 50%, 90% 30%, 70% 90%, 50% 60%, 30% 90%, 10% 50%)', 
          'polygon(10% 30%, 50% 50%, 90% 30%, 70% 90%, 50% 60%, 30% 90%, 10% 50%)',
          'polygon(10% 30%, 50% 50%, 90% 30%, 70% 90%, 50% 60%, 30% 90%, 10% 50%)'
        ],
        scaleX: [1, 1, 0.2, 1, 0.2], // Flaps wings (squeezes horizontally)
        y: [0, 0, -300, -700, -1200], // Flies UP off the screen
        scaleY: [1, 1, 0.8, 0.6, 0.3], // Shrinks into the distance
        opacity: [1, 1, 1, 1, 0], // Fades out into the distance
        transition: { duration: 2.5, times: [0, 0.2, 0.5, 0.7, 1.0], ease: "easeInOut" } 
      }}
      onMouseMove={handleMouseMove}
      style={{
        transformPerspective: 1200,
        transformOrigin: 'center center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#ffb370', // A beautiful default sunrise base color
        zIndex: 20 // Render above the previous slide during the transition
      }}
    >
        
        {/* Sky Base Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', // Peachy morning sunrise
          zIndex: 0
        }} />
        
        {/* Layer 0: Background Photo with Parallax & Blending */}
        <div style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${mousePos.x * -0.025}px, ${mousePos.y * -0.02}px) scale(1.1)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 0
        }}>
          <img 
            src={PHOTO_URLS.photo2} 
            alt="Warm Morning"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: 0.45, // Blends perfectly into the sunrise background
              mixBlendMode: 'overlay' // Makes the photo absorb the warm colors
            }}
          />
        </div>

        {/* Cinematic Components */}
        <GlowingSun />
        <DriftingClouds />
        <FlyingBirds />
        <GoldenDust />

        {/* Bottom Warm Vignette for Text Readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(90,40,10,0.8) 0%, rgba(200,100,20,0.2) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 6
        }} />



        {/* Layer 2: Foreground Text & Photos */}
        <div style={{ 
          position: 'absolute', inset: 0, 
          display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', 
          pointerEvents: 'none', zIndex: 10,
          gap: '40px'
        }}>
            {/* Centered & Enlarged Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{
                width: '90vw',
                maxWidth: '450px', 
                aspectRatio: '3 / 4',
                maxHeight: 'min(55vh, 600px)',
                backgroundColor: 'white', 
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                padding: '1.5vh',
                pointerEvents: 'auto', 
                cursor: 'pointer',
                position: 'relative',
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.5vh', 
                flexShrink: 1
              }}
              onClick={() => nextPhoto()}
            >
               <div style={{ width: '100%', aspectRatio: '3 / 4', maxHeight: '50vh', backgroundColor: '#f0f0f0', overflow: 'hidden', position: 'relative', borderRadius: '2px' }}>
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentPhoto}
                      src={morningPhotos[currentPhoto]} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        display: 'block',
                        position: 'absolute',
                        inset: 0
                      }} 
                    />
                  </AnimatePresence>
                  <div style={{ position: 'absolute', bottom: 5, right: 5, fontSize: '0.7rem', color: 'white', background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '10px' }}>
                    {currentPhoto + 1}/{morningPhotos.length}
                  </div>

                  {/* Navigation Buttons */}
                  {morningPhotos.length > 1 && (
                    <>
                      <button 
                        onClick={prevPhoto}
                        style={{
                          position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                          background: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '50%',
                          width: '40px', height: '40px', cursor: 'pointer', zIndex: 30,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#5c3a21'
                        }}
                      >
                        ←
                      </button>
                      <button 
                        onClick={nextPhoto}
                        style={{
                          position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                          background: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '50%',
                          width: '40px', height: '40px', cursor: 'pointer', zIndex: 30,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#5c3a21'
                        }}
                      >
                        →
                      </button>
                    </>
                  )}
               </div>
               <div style={{ position: 'absolute', top: -20, left: '42%', width: '100px', height: '35px', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', transform: 'rotate(-2deg)' }} />
               <div style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#5c3a21', marginTop: '15px', textAlign: 'center' }}>
                  Morning Light
               </div>
            </motion.div>

            <motion.div
              className="animate-float-slow"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              style={{
                textAlign: 'center',
                width: '90vw',
                maxWidth: '800px',
                zIndex: 10
              }}
            >
              {/* Decorative Subtitle */}
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,240,200,0.7)',
                marginBottom: '12px'
              }}>
                — Morning —
              </div>
              
              {/* Main Quote */}
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: '#fff8ee',
                lineHeight: '1.4',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                marginBottom: '16px'
              }}>
                Even your sleepy face is my favorite view, baby
              </div>
    
              {/* Signature/Name */}
              <div style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.1rem',
                color: '#f5d080'
              }}>
                Hanami
              </div>
            </motion.div>
        </div>

    </motion.div>
  );
}
