/* global React */
const TONS = {
  neutro:  { background: 'var(--cor-superficie-2)', color: 'var(--cor-texto-suave)' },
  info:    { background: 'var(--cor-info-bg)', color: 'var(--cor-info)' },
  sucesso: { background: 'var(--cor-sucesso-bg)', color: 'var(--cor-sucesso)' },
  atencao: { background: 'var(--cor-atencao-bg)', color: 'var(--cor-atencao)' },
  erro:    { background: 'var(--cor-erro-bg)', color: 'var(--cor-erro)' },
  destaque:{ background: 'var(--cor-destaque-bg)', color: 'var(--cor-destaque-texto)' },
};

export function Etiqueta({ variante = 'neutro', ponto = true, children, style }) {
  return React.createElement('span', { style: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--fonte-ui)', fontSize: 11, fontWeight: 600,
    padding: '4px 12px', borderRadius: 999, whiteSpace: 'nowrap',
    ...TONS[variante], ...style,
  } },
    ponto ? React.createElement('span', { key: 'p', style: { width: 6, height: 6, borderRadius: 999, background: 'currentColor', opacity: 0.75 } }) : null,
    children);
}
