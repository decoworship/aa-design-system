/* global React */
export function Interruptor({ rotulo, descricao, ligado, aoMudar, desabilitado, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 12,
      fontFamily: 'var(--fonte-ui)', fontSize: 15, color: 'var(--cor-texto)',
      cursor: desabilitado ? 'not-allowed' : 'pointer', opacity: desabilitado ? 0.45 : 1, ...style }}>
      <span
        role="switch" aria-checked={!!ligado} tabIndex={desabilitado ? -1 : 0}
        onClick={() => !desabilitado && aoMudar && aoMudar(!ligado)}
        onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !desabilitado) { e.preventDefault(); aoMudar && aoMudar(!ligado); } }}
        style={{
          width: 38, height: 22, borderRadius: 999, flex: 'none', marginTop: 1, position: 'relative',
          background: ligado ? 'var(--cor-acao)' : 'var(--cor-borda-controle)',
          transition: 'background 150ms ease', outline: 'none',
        }}>
        <span style={{
          position: 'absolute', top: 3, left: 3, width: 16, height: 16, borderRadius: 999,
          background: 'var(--cor-superficie)', boxShadow: 'var(--sombra-pequena)',
          transform: ligado ? 'translateX(16px)' : 'none', transition: 'transform 150ms ease',
        }} />
      </span>
      {rotulo || descricao ? (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span>{rotulo}</span>
          {descricao ? <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)', lineHeight: 1.45 }}>{descricao}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
