import React, { useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PHOTO_URLS } from '../utils/photos';
import SlideWrapper from '../components/SlideWrapper';

export default function Slide11_Letter() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const springX = useSpring(0, { stiffness: 40, damping: 25 });
  const springY = useSpring(0, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 35;
    const y = (e.clientY - window.innerHeight / 2) / 35;
    springX.set(x);
    springY.set(y);
    setMousePos({ x, y });
  };

  const spreads = [
    {
      left: {
        title: "Reflection",
        subtitle: "Baby...",
        text: [
          "I've been contemplating these past days...",
          "Life has not been easy for us jud. There were lots of challenges, problems, and misunderstandings. Personally, I really feel sorry and I wanna really apologize for everything specially on my lapses jud and mga kakulangan.",
          "I am really a dumb person jud siguro ngl. I have always thought of you as something fragile for me. I don't wanna hurt you jud and I wanna give everything in all aspects for you.",
          "That's why last night and today, I really felt bad and sad."
        ]
      },
      right: {
        text: [
          "I didn't know how to respond and how to say the right things. I apologize if you feel na I wasn't on your side and I didn't understand you truly. But baby, it's nothing like that...",
          "I just want something lang naman pud and I thought it's that easy. Tbh I realized it's smth that should be asked for... It's something that must be shown for you to appreciate and embody.",
          "And me realizing those na nahurt naka, made me feel dumb jud and disappointed.",
          <strong key="h1" style={{ color: '#4d7c0f' }}>I am really sorry for everything...</strong>
        ],
        images: PHOTO_URLS.slide11
      }
    },
    {
      left: {
        title: "A Promise",
        subtitle: "Always Remember Baby...",
        text: [
          "I may not be the best person out there but I can be that person at your side, never leaving you and never belittling you. I can see and really aware ko on your sacrifices and hardworks and for me you're doing your best to be better always.",
          "That's something I am truly impressed about you... Never backing down. But yeahh it's funny because that's the source of inspiration nimo why mubalos ka huhuhuhu.",
          "Baby u don't need to balos with me, I can always consider you and you will always have a special spot in me..."
        ]
      },
      right: {
        text: [
          "I'll always listen to you and will always love you... I know daghan kog lapses baby but everytime there are issues and naa koy mga nabuhat... I always take note and I always strive to be better not only for me but for you sad...",
          "I wanna be someone na u can rely, u can rest, and specially I wanna be someone that's an asset to you... Not a liability...",
          <span>I may not look dependable but baby know that u always have me and u can always demand on me. <strong style={{ color: '#4d7c0f' }}>I'm always here.</strong></span>
        ],
        images: PHOTO_URLS.slide08
      }
    },
    {
      left: {
        title: "Connection",
        subtitle: "The Truth,",
        text: [
          "Our misunderstandings made me really realize baby that I am really afraid on losing you...",
          "It feels na murag part najud ka sa akong kinabuhi but ofcourse in a positive way ha...",
          "Whenever I'm alone I wanna see you, whenever I'm free, I always wanna check you and samok you huhu, whenever busy ko, you are my inspiration para maka-spend tag time together... Ambot lang huhuhu.",
          "Na-embody na nako ang paging 'baby'. I wanna get babied by youuu huhuhuhu...."
        ],
        images: PHOTO_URLS.slide09
      },
      right: {
        text: [
          "Baby for real I'm sorry if bata kaykog mindset usahay. I'm sorry if strict kayko and harsh usahay, and I'm sorry if di taka masabtan usahay.",
          "Tbh baby, you're past is something I am grateful... It has always shaped you to be who u are today...",
          "I've realized I'm not looking at the present you but also I am loving you not only in the past, but also today, and in the future also.",
          "It shouldn't matter na dapat sa akoa since I should value ours now, our 'now'."
        ],
        closing: <strong style={{ color: '#4d7c0f', fontStyle: 'italic' }}>I'm Sorry Baby,</strong>,
        signature: "Paulo"
      }
    }
  ];

  const nextPage = (e) => {
    e.stopPropagation();
    if (currentSpread < spreads.length - 1) {
      setCurrentSpread(prev => prev + 1);
      setPhotoIndex(0);
    } else {
      handleContinue();
    }
  };

  const prevPage = (e) => {
    e.stopPropagation();
    if (currentSpread > 0) {
      setCurrentSpread(prev => prev - 1);
      setPhotoIndex(0);
    }
  };

  const handleContinue = () => {
    setIsClosing(true);
    setIsOpen(false);
    setTimeout(() => {
      navigate({ hash: '#slide-13' });
    }, 5000);
  };

  return (
    <SlideWrapper style={{ backgroundColor: '#1c1917', overflow: 'hidden' }}>
      <motion.div 
        onMouseMove={handleMouseMove}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 4.5, delay: 0.5 }}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      >
        {/* Layer 0: Mahogany Desk Background */}
        <div style={{ 
          position: 'absolute', inset: 0, 
          background: 'radial-gradient(circle at 50% 50%, #292524 0%, #1c1917 100%)',
          zIndex: 0 
        }} />

        {/* Layer 1: Drifting Window Shadows */}
        <motion.div
          animate={{ x: [-30, 30, -30], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', inset: -100, zIndex: 1, pointerEvents: 'none' }}
        >
           <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', opacity: 0.3 }}>
              <rect x="10" y="10" width="30" height="30" fill="black" filter="blur(15px)" />
              <rect x="50" y="10" width="30" height="30" fill="black" filter="blur(15px)" />
              <rect x="10" y="50" width="30" height="30" fill="black" filter="blur(15px)" />
              <rect x="50" y="50" width="30" height="30" fill="black" filter="blur(15px)" />
           </svg>
        </motion.div>

        {/* Layer 2: The Interactive Desk Scene */}
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
           <motion.div
             style={{
               x: springX,
               y: springY,
               rotateX: useTransform(springY, [-30, 30], [5, -5]),
               rotateY: useTransform(springX, [-30, 30], [-5, 5]),
               perspective: '2000px',
               transformStyle: 'preserve-3d'
             }}
           >
              {/* Stacked Pages Borders (Depth) */}
              {!isOpen && [1, 2, 3].map(i => (
                <div key={i} style={{
                  position: 'absolute', 
                  top: i * 2, left: i * 2, right: -i * 2, bottom: -i * 2,
                  backgroundColor: '#f3f4f6', borderRadius: '4px',
                  border: '1px solid #d1d5db', zIndex: -i,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }} />
              ))}

              {/* The Book Container */}
              <motion.div 
                onClick={() => !isOpen && setIsOpen(true)}
                style={{
                  position: 'relative', width: '95vw', maxWidth: '1400px', height: '85vh',
                  cursor: isOpen ? 'default' : 'pointer',
                  transformStyle: 'preserve-3d',
                  zIndex: 100
                }}
              >
                {/* BACK COVER */}
                <div style={{
                  position: 'absolute', inset: -4,
                  backgroundColor: '#2a1f1a', borderRadius: '6px',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
                  transform: 'translateZ(-4px)',
                  border: '2px solid #3d2e1e'
                }} />

                {/* THE PAGES (The spread) */}
                <motion.div 
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: isOpen ? 0.4 : 0 }}
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', gap: '2px', backgroundColor: '#e5e7eb',
                    padding: '2px', borderRadius: '4px',
                    transform: 'translateZ(0px)',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)'
                  }}
                >
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={currentSpread}
                       initial={{ opacity: 0, scale: 0.98 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 1.02 }}
                       transition={{ duration: 0.5 }}
                       style={{ display: 'flex', width: '100%', height: '100%' }}
                     >
                        {/* Left Page */}
                        <motion.div 
                          animate={{ rotateY: [0, 0.8, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            flex: 1, backgroundColor: '#fdfbf7', padding: '60px 60px 100px 60px',
                            borderRadius: '4px 0 0 4px', position: 'relative', overflow: 'hidden',
                            transformOrigin: 'right center',
                            borderRight: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center'
                          }}
                        >
                           <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '40px', background: 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)' }} />
                           <div>
                              <h2 style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#9a8060', marginBottom: '10px', opacity: 0.8 }}>{spreads[currentSpread].left.title}</h2>
                              <h1 style={{ fontFamily: 'var(--font-hand)', fontSize: '2rem', color: '#3d2e1e', marginBottom: '25px' }}>{spreads[currentSpread].left.subtitle}</h1>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                 {spreads[currentSpread].left.text.map((p, i) => (
                                   <motion.p
                                     key={i}
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
                                     style={{ fontFamily: 'var(--font-hand)', fontSize: '1.05rem', color: '#3d2e1e', lineHeight: '1.8', margin: 0 }}
                                   >
                                      {p}
                                   </motion.p>
                                 ))}
                              </div>
                              {spreads[currentSpread].left.images && (
                                <motion.div
                                  initial={{ opacity: 0, rotate: -3, y: 10 }}
                                  animate={{ opacity: 1, rotate: 2, y: 0 }}
                                  transition={{ delay: 1.0, duration: 1 }}
                                  style={{
                                    marginTop: '3vh', 
                                    padding: '0.8vh 0.8vh 3vh 0.8vh',
                                    backgroundColor: 'white', 
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                    width: 'clamp(140px, 24vw, 240px)', 
                                    aspectRatio: '3 / 4',
                                    position: 'relative', 
                                    margin: '0 auto'
                                  }}
                                >
                                   <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                                      <AnimatePresence mode="wait">
                                        <motion.img 
                                          key={photoIndex}
                                          src={spreads[currentSpread].left.images[photoIndex]} 
                                          initial={{ opacity: 0, x: 20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -20 }}
                                          transition={{ duration: 0.4 }}
                                          alt="Memory" 
                                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} 
                                        />
                                      </AnimatePresence>
                                      {/* Photo Navigation Overlay */}
                                      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px' }}>
                                         <button 
                                           onClick={(e) => { e.stopPropagation(); setPhotoIndex(prev => (prev - 1 + spreads[currentSpread].left.images.length) % spreads[currentSpread].left.images.length) }}
                                           style={{ background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '9px' }}
                                         >←</button>
                                         <button 
                                           onClick={(e) => { e.stopPropagation(); setPhotoIndex(prev => (prev + 1) % spreads[currentSpread].left.images.length) }}
                                           style={{ background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '9px' }}
                                         >→</button>
                                      </div>
                                   </div>
                                   {/* Washi Tape Effect */}
                                   <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%) rotate(3deg)', width: '50px', height: '15px', backgroundColor: 'rgba(77,124,15,0.3)', backdropFilter: 'blur(1px)' }} />
                                </motion.div>
                              )}
                           </div>
                        </motion.div>

                        {/* Right Page */}
                        <motion.div 
                          animate={{ rotateY: [0, -0.8, 0] }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          style={{
                            flex: 1, backgroundColor: '#fdfbf7', padding: '60px 60px 100px 60px',
                            borderRadius: '0 4px 4px 0', position: 'relative', overflow: 'hidden',
                            transformOrigin: 'left center',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center'
                          }}
                        >
                           <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '40px', background: 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)' }} />
                           <div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                 {spreads[currentSpread].right.text.map((p, i) => (
                                   <motion.p
                                     key={i}
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
                                     style={{ fontFamily: 'var(--font-hand)', fontSize: '1.05rem', color: '#3d2e1e', lineHeight: '1.8', margin: 0 }}
                                   >
                                      {p}
                                   </motion.p>
                                 ))}
                              </div>

                              {spreads[currentSpread].right.closing && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1.2, duration: 1 }}
                                  style={{ marginTop: '25px' }}
                                >
                                   <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', color: '#3d2e1e', margin: 0, fontStyle: 'italic' }}>{spreads[currentSpread].right.closing}</p>
                                   <p style={{ fontFamily: 'var(--font-hand)', fontSize: '2rem', color: '#4d7c0f', marginTop: '8px' }}>{spreads[currentSpread].right.signature}</p>
                                </motion.div>
                              )}

                              {spreads[currentSpread].right.images && (
                                <motion.div
                                  initial={{ opacity: 0, rotate: 5, y: 10 }}
                                  animate={{ opacity: 1, rotate: -2, y: 0 }}
                                  transition={{ delay: 1.5, duration: 1 }}
                                  style={{
                                    marginTop: '4vh', 
                                    padding: '1vh 1vh 4vh 1vh',
                                    backgroundColor: 'white', 
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    width: 'clamp(160px, 28vw, 280px)', 
                                    aspectRatio: '3 / 4',
                                    position: 'relative', 
                                    margin: '0 auto'
                                  }}
                                >
                                   <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                                      <AnimatePresence mode="wait">
                                        <motion.img 
                                          key={photoIndex}
                                          src={spreads[currentSpread].right.images[photoIndex]} 
                                          initial={{ opacity: 0, x: 20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -20 }}
                                          transition={{ duration: 0.4 }}
                                          alt="Memory" 
                                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} 
                                        />
                                      </AnimatePresence>

                                      {/* Photo Navigation Overlay */}
                                      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px' }}>
                                         <button 
                                           onClick={(e) => { e.stopPropagation(); setPhotoIndex(prev => (prev - 1 + spreads[currentSpread].right.images.length) % spreads[currentSpread].right.images.length) }}
                                           style={{ background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px' }}
                                         >←</button>
                                         <button 
                                           onClick={(e) => { e.stopPropagation(); setPhotoIndex(prev => (prev + 1) % spreads[currentSpread].right.images.length) }}
                                           style={{ background: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px' }}
                                         >→</button>
                                      </div>
                                   </div>

                                   {/* Photo Counter */}
                                   <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: '0.6rem', opacity: 0.5, fontFamily: 'serif' }}>
                                      {photoIndex + 1} / {spreads[currentSpread].right.images.length}
                                   </div>

                                   {/* Washi Tape Effect */}
                                   <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(-5deg)', width: '60px', height: '20px', backgroundColor: 'rgba(77,124,15,0.3)', backdropFilter: 'blur(2px)' }} />
                                </motion.div>
                              )}
                           </div>

                           {/* Paging Controls */}
                           <div style={{ position: 'absolute', bottom: 40, right: 40, display: 'flex', gap: '20px', zIndex: 100 }}>
                              {currentSpread > 0 && (
                                <button onClick={prevPage} style={{ background: 'none', border: 'none', color: '#9a8060', cursor: 'pointer', fontFamily: 'var(--font-hand)', fontSize: '1rem' }}>← Previous</button>
                              )}
                              <button 
                                onClick={nextPage} 
                                style={{ 
                                  background: 'none', border: 'none', color: '#4d7c0f', 
                                  cursor: 'pointer', fontFamily: 'var(--font-hand)', fontSize: '1.1rem',
                                  fontWeight: 'bold', textDecoration: 'underline'
                                }}
                              >
                                {currentSpread === spreads.length - 1 ? "Finish Reading" : "Next Page →"}
                              </button>
                           </div>

                           {/* Page Number */}
                           <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', opacity: 0.3, fontSize: '0.8rem', fontFamily: 'serif' }}>
                              {currentSpread + 1} / {spreads.length}
                           </div>
                        </motion.div>
                     </motion.div>
                   </AnimatePresence>
                </motion.div>

                {/* FRONT COVER */}
                <motion.div
                  initial={false}
                  animate={{ rotateY: isOpen ? -175 : 0 }}
                  transition={{ duration: isClosing ? 4 : 1.2, ease: [0.645, 0.045, 0.355, 1] }}
                  style={{
                    position: 'absolute', inset: -2,
                    backgroundColor: '#3d2e1e', borderRadius: '4px',
                    transformOrigin: 'left center',
                    zIndex: 200,
                    backfaceVisibility: 'hidden',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #2a1f1a',
                    boxShadow: isOpen ? 'none' : 'inset 0 0 50px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.4)'
                  }}
                >
                   <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")', pointerEvents: 'none' }} />
                   
                   <div style={{
                     textAlign: 'center', border: '2px solid rgba(212, 175, 55, 0.4)',
                     padding: '50px', borderRadius: '2px', position: 'relative'
                   }}>
                      <h2 style={{ fontFamily: 'var(--font-serif)', color: '#d4af37', fontSize: '2.8rem', margin: 0, letterSpacing: '0.15em' }}>OUR GARDEN</h2>
                      <div style={{ height: '1px', width: '70%', backgroundColor: '#d4af37', margin: '25px auto', opacity: 0.4 }} />
                      <p style={{ fontFamily: 'var(--font-body)', color: '#d4af37', fontSize: '0.9rem', letterSpacing: '0.4em', opacity: 0.6 }}>VOLUME I</p>
                      
                      {/* Decorative Corners */}
                      <div style={{ position: 'absolute', top: 10, left: 10, width: 20, height: 20, borderTop: '2px solid #d4af37', borderLeft: '2px solid #d4af37', opacity: 0.5 }} />
                      <div style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, borderTop: '2px solid #d4af37', borderRight: '2px solid #d4af37', opacity: 0.5 }} />
                      <div style={{ position: 'absolute', bottom: 10, left: 10, width: 20, height: 20, borderBottom: '2px solid #d4af37', borderLeft: '2px solid #d4af37', opacity: 0.5 }} />
                      <div style={{ position: 'absolute', bottom: 10, right: 10, width: 20, height: 20, borderBottom: '2px solid #d4af37', borderRight: '2px solid #d4af37', opacity: 0.5 }} />
                   </div>

                   {!isOpen && (
                     <motion.div
                       animate={{ opacity: [0.4, 1, 0.4] }}
                       transition={{ duration: 2, repeat: Infinity }}
                       style={{ position: 'absolute', bottom: '60px', color: '#d4af37', fontFamily: 'var(--font-hand)', fontSize: '1.3rem' }}
                     >
                       Click to begin reading...
                     </motion.div>
                   )}
                </motion.div>
              </motion.div>

              {/* Fountain Pen */}
              <motion.div
                style={{
                  position: 'absolute', bottom: -60, right: 40, width: '220px', height: '22px',
                  backgroundColor: '#111', borderRadius: '12px 2px 2px 12px',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.5)', zIndex: 20, rotate: -15
                }}
              >
                 <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '35px', background: 'linear-gradient(to right, #444, #888)', borderRadius: '0 2px 2px 0' }} />
                 <div style={{ position: 'absolute', left: 25, top: '50%', transform: 'translateY(-50%)', width: '25px', height: '5px', backgroundColor: 'gold', opacity: 0.6 }} />
              </motion.div>

              {/* Decorative Wax Seal */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3, type: 'spring' }}
                style={{ 
                  position: 'absolute', bottom: -50, left: 40, 
                  width: '72px', height: '72px', backgroundColor: '#4d7c0f', 
                  borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '3px solid #3d600c'
                }}
              >
                 <span style={{ color: '#fff', fontSize: '0.75rem', fontFamily: 'serif', fontWeight: 'bold', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>P & H</span>
              </motion.div>



           </motion.div>
        </div>

      </motion.div>
    </SlideWrapper>
  );
}
