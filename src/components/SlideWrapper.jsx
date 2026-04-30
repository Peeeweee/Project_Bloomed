import { motion } from 'framer-motion';

export default function SlideWrapper({ children, style, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`slide-wrapper ${className}`}
      {...props}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '4vh 0', // Give some space at top/bottom when zoomed
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}
