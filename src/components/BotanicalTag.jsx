export default function BotanicalTag({ name, date, location }) {
  return (
    <div style={{
      backgroundColor: 'var(--color-cream)',
      color: 'var(--color-soil)',
      padding: '16px 24px',
      border: '1px solid #ccc',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
      fontFamily: 'var(--font-serif)',
      maxWidth: '300px',
      position: 'relative'
    }}>
      <div style={{
        border: '1px solid var(--color-soil)',
        padding: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', marginBottom: '8px', borderBottom: '1px solid var(--color-soil)', paddingBottom: '8px' }}>
          Our First Date
        </h3>
        <p style={{ fontSize: '1.5rem', fontStyle: 'italic', margin: '12px 0' }}>{name}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-body)', borderTop: '1px solid var(--color-soil)', paddingTop: '8px' }}>
          <span>{date}</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
