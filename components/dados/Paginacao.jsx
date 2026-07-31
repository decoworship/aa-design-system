/* global React */
export function Paginacao({ pagina = 1, total = 1, aoMudar, style }) {
  const paginas = [];
  const add = (p) => paginas.push(p);
  if (total <= 7) { for (let i = 1; i <= total; i++) add(i); }
  else {
    add(1);
    if (pagina > 3) add('…');
    for (let i = Math.max(2, pagina - 1); i <= Math.min(total - 1, pagina + 1); i++) add(i);
    if (pagina < total - 2) add('…');
    add(total);
  }
  const btn = (conteudo, alvo, ativo, chave) => (
    <button key={chave} disabled={alvo == null} onClick={() => alvo != null && aoMudar && aoMudar(alvo)}
      style={{
        minWidth: 32, height: 32, padding: '0 8px', borderRadius: 'var(--raio-pequeno)',
        fontFamily: 'var(--fonte-ui)', fontSize: 13, fontWeight: 600,
        border: '1px solid ' + (ativo ? 'var(--cor-acao)' : 'transparent'),
        background: ativo ? 'var(--cor-acao-suave)' : 'transparent',
        color: alvo == null ? 'var(--cor-borda-forte)' : ativo ? 'var(--cor-acao)' : 'var(--cor-texto-suave)',
        cursor: alvo == null ? 'default' : 'pointer', transition: 'background 150ms ease',
      }}>{conteudo}</button>
  );
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 4, ...style }}>
      {btn('\u2039', pagina > 1 ? pagina - 1 : null, false, 'prev')}
      {paginas.map((p, i) => p === '…' ? btn('…', null, false, 'e' + i) : btn(p, p, p === pagina, p))}
      {btn('\u203A', pagina < total ? pagina + 1 : null, false, 'next')}
    </nav>
  );
}
