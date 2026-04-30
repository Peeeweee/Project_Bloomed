import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NavDots from './components/NavDots';
import MusicPlayer from './components/MusicPlayer';
import AmbientParticles from './components/AmbientParticles';

import Slide01 from './slides/Slide01_Seed';
import Slide02 from './slides/Slide02_Sprouted';
import Slide03 from './slides/Slide03_Morning';
import Slide04 from './slides/Slide04_GrowthChart';
import Slide05 from './slides/Slide05_FirstDate';
import Slide06 from './slides/Slide06_FirstTrip';
import Slide07 from './slides/Slide07_Afternoon';
import Slide08 from './slides/Slide08_GoldenHour';
import Slide09 from './slides/Slide09_Night';
import Slide10 from './slides/Slide10_FullBloom';
import Slide11 from './slides/Slide11_Apology';
import Slide12 from './slides/Slide11_Letter';
import Slide13 from './slides/Slide13_MemoryWall';

const slides = [
  <Slide01 />, <Slide02 />, <Slide03 />, <Slide04 />,
  <Slide05 />, <Slide06 />, <Slide07 />, <Slide08 />,
  <Slide09 />, <Slide10 />, <Slide11 />, <Slide12 />,
  <Slide13 />
];

function SlideShow() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentHash = location.hash || '#slide-1';
  const currentSlide = parseInt(currentHash.replace('#slide-', '')) || 1;
  const isPlaying = currentSlide === 13;

  // Force reset to slide 1 on every fresh page load/reload
  useEffect(() => {
    navigate({ hash: '#slide-1' }, { replace: true });
  }, []); // Empty dependency array ensures this only runs once on mount

  useEffect(() => {
    if (!location.hash || !location.hash.startsWith('#slide-')) {
      navigate({ hash: '#slide-1' }, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentSlide < 13) {
        navigate({ hash: `#slide-${currentSlide + 1}` });
      } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
        navigate({ hash: `#slide-${currentSlide - 1}` });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, navigate]);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentSlide < 13) {
      navigate({ hash: `#slide-${currentSlide + 1}` });
    } else if (isRightSwipe && currentSlide > 1) {
      navigate({ hash: `#slide-${currentSlide - 1}` });
    }
  }

  const slideIndex = Math.max(0, Math.min(12, currentSlide - 1));

  return (
    <div 
      onTouchStart={onTouchStart} 
      onTouchMove={onTouchMove} 
      onTouchEnd={onTouchEnd}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}
    >
      <AmbientParticles />
      <MusicPlayer />
      <AnimatePresence>
        {React.cloneElement(slides[slideIndex], { key: currentSlide })}
      </AnimatePresence>
      <NavDots total={13} current={currentSlide} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/our-garden/">
      <Routes>
        <Route path="*" element={<SlideShow />} />
      </Routes>
    </BrowserRouter>
  );
}
