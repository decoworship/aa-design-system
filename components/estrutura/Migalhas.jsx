/* global React */
export function Migalhas({ itens = [], aoNavegar, style }) {
  return (
    <nav aria-label="Trilha" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      fontFamily: 'var(--fonte-ui)', fontSize: 13, color: 'var(--cor-texto-suave)', ...style }}>
      {itens.map((it, i) => {
        const rotulo = typeof it === 'string' ? it : it.rotulo;
        const ultimo = i === itens.length - 1;
        return (
          <React.Fragment key={i}>
            {ultimo
              ? <span style={{ color: 'var(--cor-texto)', fontWeight: 600 }} aria-current="page">{rotulo}</span>
              : <button onClick={() => aoNavegar && aoNavegar(it, i)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--cor-acao)' }}>{rotulo}</button>}
            {!ultimo ? <span style={{ color: 'var(--cor-borda-forte)' }}>/</span> : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
