export default function PhotoPolaroid({ src, caption, rotation = 0 }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '16px 16px 60px 16px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      transform: `rotate(${rotation}deg)`,
      display: 'inline-block',
      maxWidth: '400px',
      transition: 'transform 0.3s ease',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = `rotate(0deg) scale(1.05)`}
    onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`}
    >
      <div style={{
        width: '100%',
        height: '300px',
        backgroundColor: '#eee',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {src ? (
          <img src={src} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ color: '#aaa', fontFamily: 'var(--font-body)' }}>Photo Placeholder</span>
        )}
      </div>
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontFamily: 'var(--font-hand)',
        fontSize: '28px',
        color: '#333'
      }}>
        {caption}
      </div>
    </div>
  );
}
