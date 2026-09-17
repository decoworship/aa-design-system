/* global React */
export function BarraSuperior({ rotulo, titulo, acoes, style }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 24, flexWrap: 'wrap', minWidth: 0,
      padding: '24px 32px', borderBottom: '1px solid var(--cor-borda)',
      background: 'var(--cor-camada)', fontFamily: 'var(--fonte-ui)',
      backdropFilter: 'var(--camada-filtro)', WebkitBackdropFilter: 'var(--camada-filtro)', ...style,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 240px', minWidth: 0 }}>
        {rotulo ? <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cor-texto-suave)', whiteSpace: 'nowrap' }}>{rotulo}</span> : null}
        {titulo ? <h1 style={{ margin: 0, fontFamily: 'var(--fonte-display)', fontSize: 36, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--cor-texto-forte)', textWrap: 'balance' }}>{titulo}</h1> : null}
      </div>
      {acoes ? <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: '0 1 auto' }}>{acoes}</div> : null}
    </header>
  );
}
