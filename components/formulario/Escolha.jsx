/* global React */
export function Escolha({ tipo = 'caixa', rotulo, descricao, marcado, aoMudar, nome, valor, desabilitado, style }) {
  const redondo = tipo === 'radio';
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 8,
      fontFamily: 'var(--fonte-ui)', fontSize: 15, color: 'var(--cor-texto)',
      cursor: desabilitado ? 'not-allowed' : 'pointer', opacity: desabilitado ? 0.45 : 1, ...style }}>
      <span style={{
        width: 18, height: 18, marginTop: 2, flex: 'none', boxSizing: 'border-box',
        borderRadius: redondo ? 999 : 'var(--raio-pequeno)',
        border: '1px solid ' + (marcado ? 'var(--cor-acao)' : 'var(--cor-borda-forte)'),
        background: marcado ? 'var(--cor-acao)' : 'var(--cor-superficie)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 150ms ease, border-color 150ms ease',
      }}>
        {marcado && !redondo ? (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="var(--cor-texto-invertido)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-6" /></svg>
        ) : null}
        {marcado && redondo ? <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--cor-texto-invertido)' }} /> : null}
      </span>
      <input type={redondo ? 'radio' : 'checkbox'} name={nome} value={valor} checked={!!marcado} disabled={desabilitado}
        onChange={(e) => aoMudar && aoMudar(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span>{rotulo}</span>
        {descricao ? <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)', lineHeight: 1.45 }}>{descricao}</span> : null}
      </span>
    </label>
  );
}
