/* global React */
const { useState } = React;

export function Busca({ valor, aoMudar, placeholder = 'Buscar…', largura = 260, style }) {
  const [foco, setFoco] = useState(false);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, width: largura, boxSizing: 'border-box',
      padding: '0 12px', height: 38, background: 'var(--cor-superficie)',
      border: '1px solid ' + (foco ? 'var(--cor-acao)' : 'var(--cor-borda-forte)'),
      borderRadius: 'var(--raio-pilula)', boxShadow: foco ? 'var(--anel-foco)' : 'none',
      transition: 'border-color 150ms ease, box-shadow 150ms ease', ...style,
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--cor-texto-suave)" strokeWidth="2" strokeLinecap="round" style={{ flex: 'none' }}>
        <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        value={valor ?? ''} placeholder={placeholder}
        onChange={(e) => aoMudar && aoMudar(e.target.value)}
        onFocus={() => setFoco(true)} onBlur={() => setFoco(false)}
        style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--fonte-ui)', fontSize: 14, color: 'var(--cor-texto)' }} />
      {valor ? (
        <button type="button" onClick={() => aoMudar && aoMudar('')} aria-label="Limpar"
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--cor-texto-suave)', padding: 0, lineHeight: 1, fontSize: 15, flex: 'none' }}>×</button>
      ) : null}
    </span>
  );
}
