/**
 * PHOTO CONFIGURATION
 * 
 * To use your own photos:
 * 1. Place your images in the corresponding folder in public/assets/SlideXX/
 * 2. Name them photo1.jpg, photo2.jpg, etc.
 * 3. The system will automatically look for them there.
 * 
 * Note: If a local photo is not found, it will fallback to the Unsplash URL.
 */

const BASE = import.meta.env.BASE_URL;

const getLocalPath = (slide, fileName) => {
  return `${BASE}assets/${slide}/${fileName}`;
};

export const PHOTO_URLS = {
  // Slide 02 - Sprouted
  slide02: [
    `${BASE}assets/Slide02/1.JPG`,
    `${BASE}assets/Slide02/2.JPG`,
  ],
  // Slide 03 - Morning
  slide03: [
    `${BASE}assets/Slide03/1.jpg`,
    `${BASE}assets/Slide03/2.jpg`,
    `${BASE}assets/Slide03/3.jpg`
  ],
  // Slide 04 - Growth
  slide04: {
    m1: `${BASE}assets/Slide04/1.jpeg`,
    m2: `${BASE}assets/Slide04/2.JPG`,
    m3: `${BASE}assets/Slide04/3.JPG`,
    m4: `${BASE}assets/Slide04/4.JPG`,
    m5: `${BASE}assets/Slide04/5.jpg`,
    m6: `${BASE}assets/Slide04/6.JPG`,
    m7: `${BASE}assets/Slide04/7.JPG`,
    m8: `${BASE}assets/Slide04/8.JPG`,
    m9: `${BASE}assets/Slide04/9.jpg`,
  },
  // Slide 05 - First Date
  slide05: [
    `${BASE}assets/Slide05/1.JPG`,
    `${BASE}assets/Slide05/2.JPG`,
    `${BASE}assets/Slide05/3.JPG`,
    `${BASE}assets/Slide05/4.JPG`,
    `${BASE}assets/Slide05/5.JPG`,
    `${BASE}assets/Slide05/6.JPG`,
    `${BASE}assets/Slide05/7.JPG`,
  ],
  // Slide 06 - First Trip
  slide06: [
    `${BASE}assets/Slide06/1.JPG`,
    `${BASE}assets/Slide06/2.JPG`,
    `${BASE}assets/Slide06/3.JPG`,
    `${BASE}assets/Slide06/4.JPG`,
    `${BASE}assets/Slide06/5.JPG`,
    `${BASE}assets/Slide06/6.JPG`,
    `${BASE}assets/Slide06/7.JPG`,
    `${BASE}assets/Slide06/8.JPG`,
    `${BASE}assets/Slide06/9.JPG`,
    `${BASE}assets/Slide06/10.JPG`,
    `${BASE}assets/Slide06/11.JPG`,
  ],
  // Slide 07 - Afternoon
  slide07: [
    `${BASE}assets/Slide07/2.JPG`,
    `${BASE}assets/Slide07/3.jpg`,
    `${BASE}assets/Slide07/4.jpg`,
  ],
  // Slide 08 - Golden Hour
  slide08: [
    `${BASE}assets/Slide08/1.JPG`,
    `${BASE}assets/Slide08/2.JPG`,
    `${BASE}assets/Slide08/3.jpg`,
  ],
  // Slide 09 - Night
  slide09: [
    `${BASE}assets/Slide09/1.JPG`,
    `${BASE}assets/Slide09/2.JPG`,
    `${BASE}assets/Slide09/3.JPG`,
    `${BASE}assets/Slide09/4.JPG`,
    `${BASE}assets/Slide09/5.JPG`,
    `${BASE}assets/Slide09/6.JPG`,
    `${BASE}assets/Slide09/7.JPG`,
    `${BASE}assets/Slide09/8.JPG`,
    `${BASE}assets/Slide09/9.JPG`,
  ],
  // Slide 10 - Full Bloom
  slide10: [
    `${BASE}assets/Slide10/1.JPG`,
    `${BASE}assets/Slide10/2.JPG`,
    `${BASE}assets/Slide10/3.JPG`,
    `${BASE}assets/Slide10/4.JPG`,
    `${BASE}assets/Slide10/5.JPG`,
    `${BASE}assets/Slide10/6.JPG`,
    `${BASE}assets/Slide10/7.JPG`,
    `${BASE}assets/Slide10/8.JPG`,
    `${BASE}assets/Slide10/9.JPG`,
    `${BASE}assets/Slide10/10.JPG`,
    `${BASE}assets/Slide10/11.JPG`,
  ],
  // Slide 11 - Letter (these photos appear in the journal/letter spread - UI Slide 12)
  slide11: [
    `${BASE}assets/Slide12/1.JPG`,
    `${BASE}assets/Slide12/2.JPG`,
    `${BASE}assets/Slide12/3.JPG`,
  ],
  
  // Slide 12 - Garden Continues
  slide12: [
    `${BASE}assets/Slide12/1.JPG`,
    `${BASE}assets/Slide12/2.JPG`,
    `${BASE}assets/Slide12/3.JPG`,
  ],
  // Legacy references (to avoid breaking things immediately)
  photo1: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800",
  photo2: "https://images.unsplash.com/photo-1470252649358-96949c93f21f?auto=format&fit=crop&q=80&w=800",
  photo3: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
  photo4: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=800",
  photo5: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  photo6: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
  photo7: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
  photo8: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800",
};

// Utility to get EVERY unique photo path for the grand finale collage
const extractAllPhotos = () => {
  const all = [];
  Object.entries(PHOTO_URLS).forEach(([key, value]) => {
    // Skip legacy strings
    if (typeof value === 'string' && value.startsWith('http')) return;
    
    if (Array.isArray(value)) {
      all.push(...value);
    } else if (typeof value === 'object') {
      all.push(...Object.values(value));
    }
  });
  // Deduplicate and filter out any non-strings
  return [...new Set(all.filter(p => typeof p === 'string' && p.startsWith('/')))];
};

export const ALL_MEMORIES = extractAllPhotos();
