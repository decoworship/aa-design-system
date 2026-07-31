/* global React */
export function Abas({ abas = [], ativa, aoMudar, style }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--cor-borda)', ...style }}>
      {abas.map((a) => {
        const id = typeof a === 'string' ? a : a.id;
        const rotulo = typeof a === 'string' ? a : a.rotulo;
        const contagem = typeof a === 'string' ? null : a.contagem;
        const sel = id === ativa;
        return (
          <button key={id} role="tab" aria-selected={sel} onClick={() => aoMudar && aoMudar(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', padding: '12px 0', cursor: 'pointer',
              fontFamily: 'var(--fonte-ui)', fontSize: 15, fontWeight: 600,
              color: sel ? 'var(--cor-texto-forte)' : 'var(--cor-texto-suave)',
              borderBottom: '2px solid ' + (sel ? 'var(--cor-acao)' : 'transparent'),
              marginBottom: -1, transition: 'color 150ms ease, border-color 150ms ease',
            }}>
            {rotulo}
            {contagem != null ? (
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 999,
                background: sel ? 'var(--cor-acao-suave)' : 'var(--cor-superficie-2)',
                color: sel ? 'var(--cor-acao)' : 'var(--cor-texto-suave)' }}>{contagem}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
