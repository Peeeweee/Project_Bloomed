import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { PHOTO_URLS } from '../utils/photos';
import SlideWrapper from '../components/SlideWrapper';

export default function Slide08_GoldenHour() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const springX = useSpring(0, { stiffness: 30, damping: 20 });
  const springY = useSpring(0, { stiffness: 30, damping: 20 });

  const goldenPhotos = PHOTO_URLS.slide08;

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 30;
    const y = (e.clientY - window.innerHeight / 2) / 30;
    springX.set(x);
    springY.set(y);
    setMousePos({ x, y });
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % goldenPhotos.length);
  };
  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + goldenPhotos.length) % goldenPhotos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % goldenPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPhoto, goldenPhotos.length]);

  // Birds data for the background
  const birds = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    y: 15 + Math.random() * 35,
    delay: Math.random() * 15,
    duration: 18 + Math.random() * 12
  }));

  return (
    <SlideWrapper style={{ backgroundColor: '#e8821a', overflow: 'hidden' }}>
      <div 
        onMouseMove={handleMouseMove}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        {/* Layer 0: Dynamic Sunset Gradient Background */}
        <motion.div
          animate={{ background: [
            'radial-gradient(circle at 50% 100%, #fbbf24 0%, #e8821a 45%, #7c2d12 100%)',
            'radial-gradient(circle at 50% 100%, #fcd34d 0%, #c4511a 45%, #451a03 100%)'
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />

        {/* Layer 1: Parallax Photo Background (Softened) */}
        <motion.div
          style={{
            position: 'absolute', inset: -50, zIndex: 1,
            x: springX, y: springY, opacity: 0.35,
            mixBlendMode: 'overlay', filter: 'contrast(1.1) brightness(0.9)'
          }}
        >
          <img src={PHOTO_URLS.photo2} alt="Golden Hour" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        {/* Layer 2: The Setting Sun (Glowing & Pulsing) */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', bottom: '-8vh', left: '50%', transform: 'translateX(-50%)',
            width: '55vw', height: '55vw', borderRadius: '50%',
            background: 'radial-gradient(circle, #fffbeb 0%, #fcd34d 35%, transparent 70%)',
            filter: 'blur(50px)', zIndex: 2, pointerEvents: 'none'
          }}
        />

        {/* Layer 3: God Rays / Beams */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
           {Array.from({ length: 8 }).map((_, i) => (
             <motion.div
               key={i}
               animate={{ opacity: [0.05, 0.2, 0.05], rotate: [i * 45, i * 45 + 3, i * 45] }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
               style={{
                 position: 'absolute', bottom: '10vh', left: '50%', width: '1px', height: '160vh',
                 background: 'linear-gradient(to top, #fbbf24 0%, transparent 100%)',
                 transformOrigin: 'bottom center', rotate: i * 45, filter: 'blur(5px)'
               }}
             />
           ))}
        </div>

        {/* Layer 4: Distant Flying Birds */}
        {birds.map(bird => (
          <motion.div
            key={bird.id}
            initial={{ x: '-10vw', y: `${bird.y}vh` }}
            animate={{ x: '110vw' }}
            transition={{ duration: bird.duration, repeat: Infinity, delay: bird.delay, ease: "linear" }}
            style={{ position: 'absolute', zIndex: 4 }}
          >
             <svg width="18" height="8" viewBox="0 0 20 10" fill="none">
                <motion.path 
                  animate={{ d: ["M0 5 Q 5 0 10 5 Q 15 10 20 5", "M0 5 Q 5 10 10 5 Q 15 0 20 5"] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  d="M0 5 Q 5 0 10 5 Q 15 10 20 5" stroke="#271305" strokeWidth="1" strokeLinecap="round" />
             </svg>
          </motion.div>
        ))}

        {/* Layer 5: Dynamic Lens Flare (Opposite Mouse) */}
        <motion.div
          style={{
            position: 'absolute', zIndex: 100, pointerEvents: 'none',
            x: useTransform(springX, [-30, 30], [80, -80]),
            y: useTransform(springY, [-30, 30], [80, -80]),
          }}
        >
           <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 75%)', filter: 'blur(15px)' }} />
           <div style={{ position: 'absolute', top: 180, left: 120, width: '45px', height: '45px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 75%)', filter: 'blur(8px)' }} />
        </motion.div>

        {/* Layer 6: Procedural Swaying Grass & Fall Flowers */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '110px', zIndex: 5, overflow: 'hidden' }}>
           <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', justifyContent: 'space-around', padding: '0 2vw' }}>
              {Array.from({ length: 80 }).map((_, i) => {
                const isFlower = i % 12 === 0;
                const isTallFlower = i % 24 === 0;
                
                return (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: [-3, 3, -3], 
                      height: [
                        isTallFlower ? 85 : (isFlower ? 65 : 45 + (i%10)*3), 
                        isTallFlower ? 92 : (isFlower ? 72 : 52 + (i%10)*3), 
                        isTallFlower ? 85 : (isFlower ? 65 : 45 + (i%10)*3)
                      ] 
                    }}
                    transition={{ duration: 4 + (i%6)*0.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: isFlower ? '3px' : '1.5px', 
                      backgroundColor: '#1a0a05', 
                      opacity: 0.7 + (i%3)*0.1,
                      transformOrigin: 'bottom center', 
                      borderRadius: '2px',
                      position: 'relative'
                    }}
                  >
                    {/* The Flower Head Silhouette */}
                    {isFlower && (
                      <div style={{
                        position: 'absolute',
                        top: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isTallFlower ? 18 : 12,
                        height: isTallFlower ? 18 : 12,
                      }}>
                        <svg viewBox="0 0 24 24" fill="#1a0a05">
                           {/* Simple petaled flower silhouette */}
                           <path d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8L12 0Z" opacity="0.9" />
                           <circle cx="12" cy="10" r="4" />
                        </svg>
                      </div>
                    )}

                    {/* Smaller buds for variety */}
                    {!isFlower && i % 7 === 0 && (
                       <div style={{
                         position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)',
                         width: 5, height: 5, borderRadius: '50%', backgroundColor: '#1a0a05'
                       }} />
                    )}
                  </motion.div>
                );
              })}
           </div>
        </div>

        {/* Layer 7: Cinematic Typography & Photos */}
        <div style={{ 
          position: 'relative', width: '100%', height: '100%', zIndex: 20, 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '2vh 5vw', gap: '4vh'
        }}>
           <motion.div
             initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
             animate={{ opacity: 1, scale: 1, rotate: -3 }}
             transition={{ delay: 1.2, duration: 1 }}
             style={{
               x: springX,
               y: springY,
               width: '90vw',
               maxWidth: '400px', padding: '1.5vh 1.5vh 4vh 1.5vh',
               backgroundColor: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
               pointerEvents: 'auto', cursor: 'pointer',
               position: 'relative',
               flexShrink: 1
             }}
             onClick={() => setCurrentPhoto(prev => (prev + 1) % goldenPhotos.length)}
           >
              <div style={{ 
                width: '100%', 
                aspectRatio: '3 / 4', 
                maxHeight: 'min(50vh, 600px)', 
                backgroundColor: '#fdfbf7', 
                overflow: 'hidden', 
                position: 'relative' 
              }}>
                 <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentPhoto}
                      src={goldenPhotos[currentPhoto]} 
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

                 {/* Navigation Buttons */}
                 <button onClick={prevPhoto} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 30, cursor: 'pointer', color: '#451a03', fontWeight: 'bold' }}>←</button>
                 <button onClick={nextPhoto} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', zIndex: 30, cursor: 'pointer', color: '#451a03', fontWeight: 'bold' }}>→</button>

                 <div style={{ position: 'absolute', bottom: 5, right: 5, fontSize: '0.65rem', color: 'white', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '10px' }}>
                    {currentPhoto + 1}/{goldenPhotos.length}
                 </div>
              </div>
              <div style={{ position: 'absolute', top: -15, left: '35%', width: '70px', height: '25px', backgroundColor: 'rgba(251,191,36,0.3)', backdropFilter: 'blur(4px)', transform: 'rotate(2deg)' }} />
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: '0.9rem', color: '#451a03', marginTop: '12px', textAlign: 'center' }}>
                 Golden Memories
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.8, ease: "easeOut" }}
             style={{ textAlign: 'center', pointerEvents: 'none', flexShrink: 0 }}
           >
              <div style={{ fontFamily: 'var(--font-hand)', color: '#fef3c7', fontSize: '0.9rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1.5vh', opacity: 0.7 }}>
                 Golden Hour
              </div>
              <div style={{ width: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)', margin: '0 auto 3vh auto' }} />
              
              <h1 style={{ 
                fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 5vh, 2.4rem)', color: '#fff', lineHeight: '1.45', 
                maxWidth: '850px', fontWeight: 300, textShadow: '0 0 40px rgba(251,191,36,0.5)'
              }}>
                "With you, every ending blooms into something more beautiful."
              </h1>

              {/* Decorative Pulsing Icon */}
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ marginTop: '3vh' }}
              >
                 <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="15" stroke="#fbbf24" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
                    <circle cx="20" cy="20" r="1.5" fill="#fbbf24" />
                 </svg>
              </motion.div>
           </motion.div>
        </div>

      </div>
    </SlideWrapper>
  );
}

