import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';

// Simple Typewriter component for each batch
const TypewriterBatch = ({ text, delay = 0, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 30); // Typing speed
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      const timeout = setTimeout(onComplete, 1000); // Wait before telling parent we're done
      return () => clearTimeout(timeout);
    }
  }, [index, text, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.4rem', 
        lineHeight: '1.8', 
        color: '#f0f0e8',
        maxWidth: '800px',
        textAlign: 'center'
      }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ borderRight: '2px solid #f0f0e8', marginLeft: '4px' }}
      />
    </motion.div>
  );
};

export default function Slide11_Apology() {
  const [currentBatch, setCurrentBatch] = useState(0);

  const batches = [
    { text: "I AM SO DEEPLY SORRY.", isHeadline: true },
    { text: "I let my own insecurities cloud the beautiful reality of us. I forgot how special you are, and how precious what we have is right now." },
    { text: "I judged and doubted things from your past, instead of cherishing the incredible person you are today." },
    { text: "The past is just soil. It's where things are buried." },
    { text: "I only want to focus on what we are growing together. Please give me another chance to prove how grateful I am for our now." }
  ];

  const handleBatchComplete = () => {
    if (currentBatch < batches.length - 1) {
      setCurrentBatch((prev) => prev + 1);
    }
  };

  return (
    <SlideWrapper style={{ backgroundColor: '#1a1a18', overflow: 'hidden' }}>
      
      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.15 }}>
         <svg viewBox="0 0 1000 1000" style={{ width: '120%', height: '120%', position: 'absolute', top: '-10%', left: '-10%' }}>
            <path 
              d="M1000,0 C800,200 900,400 600,600 S200,800 0,1000" 
              stroke="#000" 
              strokeWidth="180" 
              fill="none" 
              filter="blur(50px)"
            />
         </svg>
      </div>

      {/* Bokeh Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
         {Array.from({ length: 15 }).map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               y: [0, -100, 0], 
               opacity: [0, 0.3, 0],
               scale: [1, 1.2, 1]
             }}
             transition={{ duration: 12 + i, repeat: Infinity, delay: i * 0.8 }}
             style={{ 
               position: 'absolute', 
               top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
               width: `${Math.random() * 8 + 4}px`, height: `${Math.random() * 8 + 4}px`, 
               backgroundColor: '#f0f0e8', 
               borderRadius: '50%', filter: 'blur(3px)' 
             }}
           />
         ))}
      </div>

      {/* Main Narrative Content */}
      <div style={{ 
        position: 'relative', zIndex: 10, width: '100%', height: '100%', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 40px'
      }}>
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
            {batches.map((batch, idx) => (
              idx <= currentBatch && (
                <div key={idx} style={{ maxWidth: '800px', width: '100%' }}>
                  {idx === currentBatch ? (
                    <TypewriterBatch 
                      text={batch.text} 
                      onComplete={handleBatchComplete} 
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }} // Fade out previous batches slightly
                      style={{ 
                        fontFamily: batch.isHeadline ? 'var(--font-serif)' : 'var(--font-body)', 
                        fontSize: batch.isHeadline ? '2.2rem' : '1.3rem', 
                        lineHeight: '1.6', 
                        color: batch.isHeadline ? '#f0f0e8' : '#dcd6ce',
                        textAlign: 'center',
                        letterSpacing: batch.isHeadline ? '0.1em' : 'normal',
                        fontWeight: batch.isHeadline ? 500 : 300
                      }}
                    >
                      {batch.text}
                    </motion.div>
                  )
                  }
                </div>
              )
            ))}
         </div>

      </div>

    </SlideWrapper>
  );
}
