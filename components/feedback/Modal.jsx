/* global React */
const { useEffect } = React;

export function Modal({ aberto = true, titulo, rotulo, aoFechar, acoes, largura = 480, children }) {
  useEffect(() => {
    if (!aberto) return;
    const h = (e) => { if (e.key === 'Escape' && aoFechar) aoFechar(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [aberto, aoFechar]);
  if (!aberto) return null;
  return (
    <div onClick={aoFechar} style={{
      position: 'fixed', inset: 0, zIndex: 'var(--z-modal)', background: 'var(--cor-veu)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={{
        width: largura, maxWidth: '100%', maxHeight: '86vh', overflow: 'auto',
        background: 'var(--cor-camada)', borderRadius: 'var(--raio-grande)',
        border: '1px solid var(--cor-borda-camada)', boxShadow: 'var(--sombra-grande)',
        backdropFilter: 'var(--camada-filtro)', WebkitBackdropFilter: 'var(--camada-filtro)',
        padding: 24, fontFamily: 'var(--fonte-ui)',
      }}>
        {rotulo ? <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cor-texto-suave)', marginBottom: 4 }}>{rotulo}</div> : null}
        {titulo ? <h2 style={{ margin: '0 0 16px', fontFamily: 'var(--fonte-display)', fontSize: 24, fontWeight: 600, lineHeight: 1.2, color: 'var(--cor-texto-forte)' }}>{titulo}</h2> : null}
        <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--cor-texto)' }}>{children}</div>
        {acoes ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>{acoes}</div> : null}
      </div>
    </div>
  );
}
