/* global React */
const { useState, useRef, useEffect } = React;

export function MenuSuspenso({ gatilho, rotulo = 'Opções', itens = [], aoEscolher, alinhamento = 'esquerda', style }) {
  const [aberto, setAberto] = useState(false);
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (!aberto) return;
    const fora = (e) => { if (ref.current && !ref.current.contains(e.target)) setAberto(false); };
    document.addEventListener('mousedown', fora);
    return () => document.removeEventListener('mousedown', fora);
  }, [aberto]);
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <span onClick={() => setAberto((a) => !a)} style={{ display: 'inline-flex', cursor: 'pointer' }}>
        {gatilho || (
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fonte-ui)', fontSize: 15, fontWeight: 600,
            padding: '10px 16px', borderRadius: 'var(--raio-medio)', border: '1px solid var(--cor-borda-forte)',
            background: 'var(--cor-superficie)', color: 'var(--cor-texto)', cursor: 'pointer' }}>
            {rotulo}<span style={{ fontSize: 9, color: 'var(--cor-texto-suave)' }}>▼</span>
          </button>
        )}
      </span>
      {aberto ? (
        <div role="menu" style={{
          position: 'absolute', top: 'calc(100% + 6px)', zIndex: 100, minWidth: 180,
          [alinhamento === 'direita' ? 'right' : 'left']: 0,
          background: 'var(--cor-camada)', border: '1px solid var(--cor-borda-camada)',
          borderRadius: 'var(--raio-medio)', boxShadow: 'var(--sombra-media)', padding: 4,
          backdropFilter: 'var(--camada-filtro)', WebkitBackdropFilter: 'var(--camada-filtro)',
        }}>
          {itens.map((it, i) => it.separador ? (
            <div key={'s' + i} style={{ height: 1, background: 'var(--cor-borda)', margin: '4px 0' }} />
          ) : (
            <button key={it.id || i} role="menuitem"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              onClick={() => { setAberto(false); aoEscolher && aoEscolher(it); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                padding: '8px 12px', borderRadius: 'var(--raio-pequeno)',
                fontFamily: 'var(--fonte-ui)', fontSize: 14,
                color: it.perigo ? 'var(--cor-erro)' : 'var(--cor-texto)',
                background: hover === i ? 'var(--cor-linha-hover)' : 'transparent',
              }}>{it.rotulo}</button>
          ))}
        </div>
      ) : null}
    </span>
  );
}
