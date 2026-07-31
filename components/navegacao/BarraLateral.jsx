/* global React */
const { useState } = React;

export function BarraLateral({ marca = 'AA', subtitulo, grupos = [], ativo, aoNavegar, rodape, largura = 232, style }) {
  const [hover, setHover] = useState(null);
  return (
    <nav style={{
      width: largura, flex: 'none', boxSizing: 'border-box', minHeight: '100%',
      background: 'var(--cor-superficie)', borderRight: '1px solid var(--cor-borda)',
      padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: 24,
      fontFamily: 'var(--fonte-ui)', ...style,
    }}>
      <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cor-texto-forte)' }}>{marca}</span>
        {subtitulo ? <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)' }}>{subtitulo}</span> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        {grupos.map((g, gi) => (
          <div key={g.rotulo || gi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {g.rotulo ? <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cor-texto-suave)', padding: '0 8px 6px' }}>{g.rotulo}</div> : null}
            {(g.itens || []).map((it) => {
              const sel = it.id === ativo;
              const k = gi + ':' + it.id;
              return (
                <button key={it.id} onClick={() => aoNavegar && aoNavegar(it.id)}
                  onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                    textAlign: 'left', border: 'none', cursor: 'pointer', width: '100%',
                    padding: '8px 10px', borderRadius: 'var(--raio-pequeno)',
                    fontFamily: 'inherit', fontSize: 14, fontWeight: sel ? 600 : 400,
                    color: sel ? 'var(--cor-acao)' : 'var(--cor-texto)',
                    background: sel ? 'var(--cor-acao-suave)' : hover === k ? 'var(--cor-linha-hover)' : 'transparent',
                    transition: 'background 150ms ease',
                  }}>
                  <span>{it.rotulo}</span>
                  {it.contagem != null ? <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--cor-texto-suave)', fontVariantNumeric: 'tabular-nums' }}>{it.contagem}</span> : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {rodape ? <div style={{ padding: '0 8px' }}>{rodape}</div> : null}
    </nav>
  );
}
