/* global React */
export function Divisor({ rotulo, style }) {
  if (!rotulo) return <hr style={{ height: 1, background: 'var(--cor-borda)', border: 'none', margin: '24px 0', ...style }} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0',
      fontFamily: 'var(--fonte-ui)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
      textTransform: 'uppercase', color: 'var(--cor-texto-suave)', ...style }}>
      <span style={{ flex: 1, height: 1, background: 'var(--cor-borda)' }} />
      {rotulo}
      <span style={{ flex: 1, height: 1, background: 'var(--cor-borda)' }} />
    </div>
  );
}
