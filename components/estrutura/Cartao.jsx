/* global React */
export function Cartao({ titulo, rotulo, acoes, rodape, compacto, children, style }) {
  return (
    <section style={{
      background: 'var(--cor-superficie)', border: '1px solid var(--cor-borda)',
      borderRadius: compacto ? 'var(--raio-medio)' : 'var(--raio-grande)',
      padding: compacto ? 16 : 24, fontFamily: 'var(--fonte-ui)', ...style,
    }}>
      {rotulo || titulo || acoes ? (
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {rotulo ? <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cor-texto-suave)' }}>{rotulo}</span> : null}
            {titulo ? <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.35, color: 'var(--cor-texto-forte)' }}>{titulo}</h3> : null}
          </div>
          {acoes ? <div style={{ display: 'flex', gap: 8, flex: 'none' }}>{acoes}</div> : null}
        </header>
      ) : null}
      {children}
      {rodape ? (
        <footer style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--cor-borda)', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>{rodape}</footer>
      ) : null}
    </section>
  );
}
