import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SlideWrapper from '../components/SlideWrapper';

export default function Slide12_GardenContinues() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Attempt autoplay safely
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)); // Fails silently if browser blocks autoplay
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.error("Audio playback failed", e));
      }
    }
  };

  // Generate 9 procedurally varying plants
  const plants = Array.from({ length: 9 }).map((_, i) => {
    const isFlower = i === 2 || i === 6; // 2 flowers mixed in
    return {
      id: i,
      x: 100 + i * 100 + (Math.random() * 40 - 20),
      height: 60 + Math.random() * 80, // 60px to 140px tall
      duration: 2.5 + Math.random() * 1.5,
      delay: Math.random() * 1.5,
      opacity: 0.4 + Math.random() * 0.4,
      isFlower
    };
  });

  // Generate 20 random fireflies
  const fireflies = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: 20 + Math.random() * 60, // 20% to 80% horizontal spread
    y: 20 + Math.random() * 50, // 20% to 70% vertical spread
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 5
  }));

  return (
    <SlideWrapper style={{ background: 'linear-gradient(to bottom, #0d2010 0%, #1a3a18 40%, #0a1a08 100%)' }}>
      
      {/* Local CSS for ambient keyframe animations */}
      <style>{`
        @keyframes sway {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        .plant-sway {
          animation: sway 3s ease-in-out infinite alternate;
          transform-box: fill-box;
          transform-origin: bottom center;
        }
        @keyframes firefly-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.9; }
        }
        .firefly {
          animation: firefly-blink 3s ease-in-out infinite;
        }
        .reset-btn {
          cursor: pointer;
          background: none;
          border: none;
          padding: 8px 16px;
          transition: opacity 0.2s;
        }
        .reset-btn:hover {
          text-decoration: underline;
          opacity: 0.8;
        }
        .music-btn {
          cursor: pointer;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.6;
          transition: opacity 0.2s;
          padding: 8px;
        }
        .music-btn:hover {
          opacity: 1;
        }
      `}</style>

      {/* Layer 0: Firefly Particles */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {fireflies.map(f => (
          <circle
            key={f.id}
            cx={`${f.x}%`}
            cy={`${f.y}%`}
            r="2"
            fill="#f5e87a"
            className="firefly"
            style={{ animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }}
          />
        ))}
      </svg>

      {/* Layer 1: Swaying Garden Silhouettes (Bottom Edge) */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '200px', pointerEvents: 'none', zIndex: 1 }}>
        <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMax slice" style={{ overflow: 'visible' }}>
          {plants.map(p => (
            <g 
              key={p.id} 
              className="plant-sway" 
              style={{ animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} 
              opacity={p.opacity}
            >
              {/* Tall Stem */}
              <rect x={p.x - 1} y={200 - p.height} width="2" height={p.height} fill="#2a5a20" />
              
              {/* Plant Crown */}
              {p.isFlower ? (
                <g transform={`translate(${p.x}, ${200 - p.height})`}>
                  <circle cx="0" cy="0" r="4" fill="#2a5a20" />
                  {[0, 72, 144, 216, 288].map(a => (
                    <ellipse key={a} cx="0" cy="-6" rx="2.5" ry="8" fill="#2a5a20" transform={`rotate(${a})`} />
                  ))}
                </g>
              ) : (
                <ellipse cx={p.x} cy={200 - p.height} rx="6" ry="20" fill="#2a5a20" />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Layer 2: Main Text Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        
        {/* Core Message Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
            marginTop: 'auto'
          }}
        >
          {/* Decorative Leaf Line */}
          <div style={{ marginBottom: '24px' }}>
            <svg width="80" height="20" viewBox="0 0 80 20">
              {[10, 25, 40, 55, 70].map(x => (
                <ellipse 
                  key={x} cx={x} cy="10" 
                  rx="4" ry="2" 
                  fill="#5a9e2f" 
                  opacity="0.6" 
                  transform={`rotate(-30 ${x} 10)`} 
                />
              ))}
            </svg>
          </div>
          
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.4rem',
            color: '#e8dfc8',
            textAlign: 'center',
            lineHeight: '1.4',
            maxWidth: '500px'
          }}>
            Our garden isn't finished growing.
          </div>
          
          <div style={{
            fontFamily: 'var(--font-hand)',
            fontSize: '1.1rem',
            color: '#8fbe6a',
            marginTop: '12px'
          }}>
            And neither are we. 🌱
          </div>
        </motion.div>

        {/* Botanical Classification Names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            marginTop: '16px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            color: 'rgba(200,230,180,0.5)',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: '1.8'
          }}
        >
          <div>Together since: the day we found each other</div>
          <div>Status: Loving you more every day</div>
        </motion.div>

        {/* Start Over Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{ marginTop: 'auto', marginBottom: '20px' }}
        >
          <button 
            className="reset-btn"
            onClick={() => {
              window.location.hash = '#slide-1';
              window.location.reload();
            }}
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '0.95rem',
              color: 'rgba(200,230,180,0.5)'
            }}
          >
            ← experience it again
          </button>
        </motion.div>

      </div>

      {/* Layer 3: Interactive Music Controller */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 20
      }}>
        <button onClick={toggleAudio} className="music-btn" aria-label="Toggle Music">
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            your song
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8fbe6a" strokeWidth="2">
            {isPlaying ? (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            ) : (
              <>
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </>
            )}
          </svg>
        </button>
        
        <audio ref={audioRef} loop>
          <source src="/assets/your-song.mp3" type="audio/mpeg" />
        </audio>
      </div>

    </SlideWrapper>
  );
}
