/* global React */
function iniciais(nome) {
  const p = String(nome || '').trim().split(/\s+/);
  return ((p[0] || '')[0] || '' ).concat(p.length > 1 ? (p[p.length - 1][0] || '') : '').toUpperCase();
}

export function Avatar({ nome, src, tamanho = 32, style }) {
  const base = {
    width: tamanho, height: tamanho, borderRadius: 999, flex: 'none',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--fonte-ui)', fontWeight: 600, fontSize: Math.round(tamanho * 0.38),
    background: 'var(--cor-acao-suave-2)', color: 'var(--cor-acao-ativa)',
    border: '1px solid var(--cor-borda)', overflow: 'hidden', ...style,
  };
  if (src) return React.createElement('img', { src, alt: nome || '', style: { ...base, objectFit: 'cover' } });
  return React.createElement('span', { style: base, title: nome }, iniciais(nome));
}
