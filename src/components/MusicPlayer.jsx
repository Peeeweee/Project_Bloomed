import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SLIDE_MUSIC } from '../utils/music';

export default function MusicPlayer() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackInfo, setTrackInfo] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef(new Audio());
  const fadeInterval = useRef(null);

  // Map hash (#slide-N) to track key
  const getTrackKey = (hash) => {
    if (!hash || hash === '#slide-1') return 'slide01';
    const match = hash.match(/#slide-(\d+)/);
    if (match) return `slide${match[1].padStart(2, '0')}`;
    return 'slide01';
  };

  useEffect(() => {
    const trackKey = getTrackKey(location.hash);
    const musicData = SLIDE_MUSIC[trackKey];

    if (musicData && musicData.title !== trackInfo?.title) {
      setTrackInfo(musicData);
      
      const fullUrl = musicData.url;
      
      if (isPlaying) {
        fadeOutAndSwitch(fullUrl);
      } else {
        audioRef.current.src = fullUrl;
        audioRef.current.loop = true;
        audioRef.current.load();
      }
    }
  }, [location.hash, trackInfo, isPlaying]);

  // Auto-play on first interaction anywhere
  useEffect(() => {
    const startAudio = () => {
      if (!isPlaying && trackInfo?.url) {
        console.log("Attempting to start audio with:", trackInfo.url);
        audioRef.current.play().then(() => {
          console.log("Audio started successfully!");
          setIsPlaying(true);
          fadeIn();
        }).catch(err => {
          console.error("Audio play failed:", err);
        });
      }
    };

    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('scroll', startAudio);
    
    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('scroll', startAudio);
    };
  }, [isPlaying, trackInfo]);

  // Update progress bar
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current.duration) {
        const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(p || 0);
      }
    };
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Loop failed:", e));
    });
    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const fadeOutAndSwitch = (newUrl) => {
    clearInterval(fadeInterval.current);
    console.log("Switching to new track:", newUrl);
    let currentVol = audioRef.current.volume;
    
    fadeInterval.current = setInterval(() => {
      if (currentVol > 0.04) {
        currentVol -= 0.04;
        audioRef.current.volume = currentVol;
      } else {
        clearInterval(fadeInterval.current);
        audioRef.current.src = newUrl;
        audioRef.current.load();
        audioRef.current.play().then(() => {
          fadeIn();
        }).catch(e => console.error("Auto-play blocked after switch:", e));
      }
    }, 40);
  };

  const fadeIn = () => {
    clearInterval(fadeInterval.current);
    let currentVol = 0;
    audioRef.current.volume = 0;
    
    fadeInterval.current = setInterval(() => {
      if (currentVol < 0.45) {
        currentVol += 0.02;
        audioRef.current.volume = Math.min(0.45, currentVol);
      } else {
        clearInterval(fadeInterval.current);
      }
    }, 50);
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!trackInfo?.url) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeIn();
      }).catch(e => console.error("Manual play failed:", e));
    }
  };

  if (!trackInfo || !trackInfo.title) return null;

  return (
    <>
      <div style={{ 
        position: 'fixed', 
        bottom: '30px', 
        left: '30px', 
        zIndex: 10000,
        width: 'min(85vw, 280px)'
      }}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'rgba(20, 20, 20, 0.75)',
            backdropFilter: 'blur(15px)',
            borderRadius: '12px',
            padding: '12px 16px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            backgroundColor: '#1DB954',
            width: `${progress}%`,
            transition: 'width 0.2s linear'
          }} />

          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '4px',
            background: 'linear-gradient(45deg, #1DB954, #191414)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🎵</span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ 
              color: '#fff', 
              fontSize: '0.85rem', 
              margin: 0, 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.05em'
            }}>
              {trackInfo.title}
            </h4>
            <p style={{ 
              color: '#b3b3b3', 
              fontSize: '0.7rem', 
              margin: '2px 0 0 0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {trackInfo.artist}
            </p>
          </div>

          <button 
            onClick={togglePlay}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '4px',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying ? (
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '12px' }}>
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 12, 6, 12, 4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    style={{ width: '2px', backgroundColor: '#1DB954' }}
                  />
                ))}
              </div>
            ) : (
              <span>▶</span>
            )}
          </button>
        </motion.div>
      </div>
    </>
  );
}
