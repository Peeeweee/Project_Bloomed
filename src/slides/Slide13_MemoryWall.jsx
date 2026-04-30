import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_MEMORIES } from '../utils/photos';
import SlideWrapper from '../components/SlideWrapper';

const ScrollingRow = ({ photos, speed, direction = 1, onPhotoClick }) => {
  // Duplicate photos once to create a seamless infinite loop
  const doubledPhotos = [...photos, ...photos];
  
  return (
    <div style={{ 
      display: 'flex', 
      width: '100%',
      overflow: 'hidden',
      height: '100%',
      alignItems: 'center'
    }}>
      <motion.div
        animate={{ 
          x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] 
        }}
        transition={{ 
          duration: photos.length * speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ 
          display: 'flex', 
          gap: '2vh',
          width: 'fit-content',
          height: '100%'
        }}
      >
        {doubledPhotos.map((photo, i) => (
          <motion.div
            key={`${photo}-${i}`}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onClick={() => onPhotoClick(photo)}
            style={{
              height: '100%',
              aspectRatio: '3 / 4',
              backgroundColor: '#1a1a1a',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.05)',
              flexShrink: 0
            }}
          >
            <img 
              src={photo} 
              alt="Memory" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Slide13_MemoryWall() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [msgIndex, setMsgIndex] = useState(-1);
  
  // Split photos into 3 rows
  const row1 = ALL_MEMORIES.filter((_, i) => i % 3 === 0);
  const row2 = ALL_MEMORIES.filter((_, i) => i % 3 === 1);
  const row3 = ALL_MEMORIES.filter((_, i) => i % 3 === 2);

  const messages = [
    { 
      title: "Our Garden isnt finished yet", 
      subtitle: "Neither are we." 
    },
    { 
      title: "We did the hardest thing...", 
      subtitle: "Finding each other amidst all people... " 
    },
    { 
      title: "Now,", 
      subtitle: "i wanna ask you baby... " 
    },
    { 
      title: "Can we do...", 
      subtitle: "the easiest thing???" 
    },
    { 
      title: "Lets stay...", 
      subtitle: "and never lose each other anymore...." 
    },
    { 
      title: "I Love You", 
      subtitle: "and I Am Afraid of Losing You ❤️" 
    }
  ];

  // Auto-advance logic with reset on interaction
  useEffect(() => {
    // Idle period for the very first time
    if (msgIndex === -1) {
      const idleTimer = setTimeout(() => {
        setMsgIndex(0);
      }, 10000);
      return () => clearTimeout(idleTimer);
    }

    // If we're at the last message, don't start a new timer
    if (msgIndex === messages.length - 1) return;

    const timer = setTimeout(() => {
      setMsgIndex((prev) => prev + 1);
    }, 7000);

    return () => clearTimeout(timer);
  }, [msgIndex, messages.length]);

  const nextMsg = (e) => { 
    if (e) e.stopPropagation(); 
    setMsgIndex((prev) => (prev === -1 ? 0 : (prev + 1) % messages.length)); 
  };
  
  const prevMsg = (e) => { 
    if (e) e.stopPropagation(); 
    setMsgIndex((prev) => (prev <= 0 ? 0 : prev - 1)); 
  };

  return (
    <SlideWrapper style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          background: msgIndex === messages.length - 1 
            ? 'radial-gradient(circle at 50% 50%, #2a0a0a 0%, #050505 100%)' 
            : 'radial-gradient(circle at 50% 50%, #0a1a08 0%, #050505 100%)'
        }}
        transition={{ duration: 5 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }} 
      />

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '2vh 0'
      }}>
        
        {/* Floating Message Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '900px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '0 20px'
          }}>
            {/* Mini Navigation Buttons */}
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              onClick={prevMsg}
              style={{ 
                pointerEvents: 'auto', border: '2px solid #fff', 
                background: 'rgba(0,0,0,0.6)', 
                color: '#fff', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer',
                position: 'absolute', left: 0, zIndex: 200, fontSize: '1.2rem',
                opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                fontWeight: 'bold'
              }}
            >
              ‹
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              onClick={nextMsg}
              style={{ 
                pointerEvents: 'auto', border: '2px solid #fff', 
                background: 'rgba(0,0,0,0.6)', 
                color: '#fff', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer',
                position: 'absolute', right: 0, zIndex: 200, fontSize: '1.2rem',
                opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                fontWeight: 'bold'
              }}
            >
              ›
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.div
                key={msgIndex}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                style={{
                  textAlign: 'center',
                  background: 'radial-gradient(circle, rgba(0,0,0,0.85) 0%, transparent 90%)',
                  padding: '50px',
                  borderRadius: '10px',
                  width: '100%'
                }}
              >
                <motion.h1 
                  animate={msgIndex === messages.length - 1 ? { 
                    textShadow: [
                      '0 0 20px rgba(255,0,0,0.2)', 
                      '0 0 60px rgba(255,0,0,0.8)', 
                      '0 0 20px rgba(255,0,0,0.2)'
                    ]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ 
                    fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 6vh, 3rem)', color: '#fff', 
                    margin: '0 0 2vh 0', letterSpacing: '0.15em', textTransform: 'uppercase',
                    textShadow: '0 0 40px rgba(143, 190, 106, 0.6)', lineHeight: 1.2
                  }}
                >
                  {msgIndex !== -1 && messages[msgIndex].title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{ 
                    fontFamily: 'var(--font-hand)', 
                    fontSize: 'clamp(1.2rem, 4vh, 2.2rem)', 
                    color: msgIndex === messages.length - 1 ? '#ff4d4d' : '#8fbe6a', 
                    margin: 0,
                    textShadow: '0 2px 15px rgba(0,0,0,0.9)',
                    lineHeight: 1.5,
                    maxWidth: '700px',
                    marginInline: 'auto'
                  }}
                >
                  {msgIndex !== -1 && messages[msgIndex].subtitle}
                </motion.p>
                
                {/* Special 10s Animation for the final message */}
                {msgIndex === messages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    style={{
                      marginTop: '4vh',
                      fontSize: '2rem',
                      color: '#ff4d4d',
                      filter: 'drop-shadow(0 0 20px rgba(255,77,77,0.5))'
                    }}
                  >
                    ❤️
                  </motion.div>
                )}

                {/* Pagination Dots */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '5vh' }}>
                  {messages.map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ 
                        scale: i === msgIndex ? 1.5 : 1,
                        backgroundColor: i === msgIndex ? (i === messages.length - 1 ? '#ff4d4d' : '#8fbe6a') : 'rgba(255,255,255,0.1)'
                      }}
                      style={{ 
                        width: '8px', height: '8px', borderRadius: '50%', 
                      }} 
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* The 3 Layers of VERY SLOW Carousels */}
        <div style={{ 
          flex: 1,
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-evenly',
          width: '100%', 
          overflow: 'hidden',
          minHeight: 0
        }}>
          <div style={{ height: 'min(30vh, 250px)', minHeight: '100px' }}>
            <ScrollingRow photos={row1} speed={25} direction={1} onPhotoClick={setSelectedPhoto} />
          </div>
          
          <div style={{ height: 'min(30vh, 250px)', minHeight: '100px' }}>
            <ScrollingRow photos={row2} speed={30} direction={-1} onPhotoClick={setSelectedPhoto} />
          </div>
          
          <div style={{ height: 'min(30vh, 250px)', minHeight: '100px' }}>
            <ScrollingRow photos={row3} speed={22} direction={1} onPhotoClick={setSelectedPhoto} />
          </div>
        </div>

      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '5vh'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              style={{
                position: 'relative', maxWidth: '90vw', maxHeight: '80vh',
                boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                border: '10px solid white', borderRadius: '4px'
              }}
            >
              <img 
                src={selectedPhoto} 
                alt="Memory Large" 
                style={{ maxWidth: '100%', maxHeight: '75vh', display: 'block' }} 
              />
              <div style={{
                position: 'absolute', bottom: -50, left: 0, width: '100%',
                textAlign: 'center', color: '#fff', fontFamily: 'var(--font-hand)', fontSize: '1.4rem'
              }}>
                Forever and Always
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </SlideWrapper>
  );
}
