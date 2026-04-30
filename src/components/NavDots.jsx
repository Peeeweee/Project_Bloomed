import { motion } from 'framer-motion';

export default function NavDots({ total = 12, current = 1 }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '12px',
      zIndex: 100
    }}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = (i + 1) === current;
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              scale: isActive ? 1.2 : 1,
              backgroundColor: isActive ? 'var(--color-bloom)' : 'rgba(255, 255, 255, 0.25)',
              opacity: isActive ? 1 : 0.6
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              cursor: 'pointer' // Can add onClick here if requested later
            }}
          />
        );
      })}
    </div>
  );
}
