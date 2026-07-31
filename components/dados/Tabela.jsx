/* global React */
const { useState } = React;

/* Estados de carregamento e erro moram AQUI dentro, não no consumidor.
   Toda tabela real tem três estados além do normal — vazio, carregando e
   erro — e resolver isso fora significa reescrever a mesma coisa em cada
   tela, quase sempre com espaçamento diferente. */
export function Tabela({
  colunas = [], linhas = [], ordenavel, vazio = 'Nada por aqui ainda.',
  estado = 'pronto', erro, aoTentarNovamente, linhasCarregando = 5,
  aoClicarLinha, linhaAtiva, style,
}) {
  const [ordem, setOrdem] = useState(null);
  const [hover, setHover] = useState(null);

  const dados = React.useMemo(() => {
    if (!ordem) return linhas;
    const dir = ordem.dir === 'asc' ? 1 : -1;
    return [...linhas].sort((a, b) => {
      const x = a[ordem.chave], y = b[ordem.chave];
      if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
      return String(x ?? '').localeCompare(String(y ?? ''), 'pt-BR') * dir;
    });
  }, [linhas, ordem]);

  const alinhar = (c) => (c.numerica ? 'right' : 'left');
  const cel = { padding: '12px 16px', borderBottom: '1px solid var(--cor-borda)', color: 'var(--cor-texto)', verticalAlign: 'middle' };

  const cabecalho = (
    <thead>
      <tr>
        {colunas.map((c) => (
          <th key={c.chave} scope="col"
            onClick={() => estado === 'pronto' && ordenavel && setOrdem((o) =>
              o && o.chave === c.chave ? { chave: c.chave, dir: o.dir === 'asc' ? 'desc' : 'asc' } : { chave: c.chave, dir: 'asc' })}
            aria-sort={ordenavel ? (ordem && ordem.chave === c.chave ? (ordem.dir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
            style={{
              textAlign: alinhar(c), fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--cor-texto-suave)', whiteSpace: 'nowrap',
              padding: '12px 16px', borderBottom: '1px solid var(--cor-borda-forte)',
              cursor: ordenavel && estado === 'pronto' ? 'pointer' : 'default', userSelect: 'none', width: c.largura,
            }}>
            {c.rotulo}
            {ordenavel && ordem && ordem.chave === c.chave ? <span style={{ marginLeft: 5, color: 'var(--cor-acao)' }}>{ordem.dir === 'asc' ? '\u2191' : '\u2193'}</span> : null}
          </th>
        ))}
      </tr>
    </thead>
  );

  const tabela = { width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--fonte-ui)', fontSize: 15, ...style };

  /* Carregando: esqueleto com a MESMA grade da tabela pronta, para o
     conteúdo não saltar quando chegar. Largura das barras varia de
     propósito — barra idêntica em toda célula parece defeito. */
  if (estado === 'carregando') {
    return (
      <table style={tabela} aria-busy="true">
        {cabecalho}
        <tbody>
          {Array.from({ length: linhasCarregando }).map((_, i) => (
            <tr key={i}>
              {colunas.map((c, j) => (
                <td key={c.chave} style={{ ...cel, borderBottom: i === linhasCarregando - 1 ? 'none' : cel.borderBottom }}>
                  <span style={{
                    display: 'block', height: 11, borderRadius: 'var(--raio-pequeno)',
                    width: [78, 52, 64, 44][(i + j) % 4] + '%',
                    marginLeft: c.numerica ? 'auto' : 0,
                    background: 'var(--cor-superficie-2)',
                    animation: 'aa-pulso 1.4s ease-in-out infinite',
                    animationDelay: (i * 90) + 'ms',
                  }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  /* Erro: sempre com o próximo passo. Uma tabela que só diz "erro"
     deixa a pessoa sem saída. */
  if (estado === 'erro') {
    return (
      <table style={tabela}>
        {cabecalho}
        <tbody>
          <tr><td colSpan={colunas.length} style={{ padding: '40px 16px', textAlign: 'center' }} role="alert">
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--cor-texto-forte)' }}>Não foi possível carregar</div>
            <div style={{ fontSize: 13, color: 'var(--cor-texto-suave)', margin: '4px auto 0', maxWidth: '46ch' }}>
              {erro || 'A conexão falhou no meio do caminho. Seus dados estão a salvo.'}
            </div>
            {aoTentarNovamente ? (
              <button type="button" onClick={aoTentarNovamente} style={{
                marginTop: 16, font: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                padding: '8px 16px', borderRadius: 'var(--raio-pequeno)',
                border: '1px solid var(--cor-borda-controle)', background: 'var(--cor-superficie)', color: 'var(--cor-texto)',
              }}>Tentar de novo</button>
            ) : null}
          </td></tr>
        </tbody>
      </table>
    );
  }

  return (
    <table style={tabela}>
      {cabecalho}
      <tbody>
        {dados.length === 0 ? (
          <tr><td colSpan={colunas.length} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--cor-texto-suave)', fontSize: 13 }}>{vazio}</td></tr>
        ) : dados.map((l, i) => {
          const ativa = linhaAtiva != null && (l.id ?? i) === linhaAtiva;
          return (
            <tr key={l.id ?? i}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              onClick={() => aoClicarLinha && aoClicarLinha(l)}
              aria-selected={ativa || undefined}
              style={{
                background: ativa ? 'var(--cor-superficie-2)' : hover === i ? 'var(--cor-linha-hover)' : 'transparent',
                boxShadow: ativa ? 'inset 3px 0 0 var(--cor-acao)' : 'none',
                cursor: aoClicarLinha ? 'pointer' : 'default', transition: 'background 150ms ease',
              }}>
              {colunas.map((c) => (
                <td key={c.chave} style={{
                  ...cel, textAlign: alinhar(c),
                  borderBottom: i === dados.length - 1 ? 'none' : cel.borderBottom,
                  fontVariantNumeric: c.numerica ? 'tabular-nums' : 'normal',
                }}>{c.render ? c.render(l) : l[c.chave]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
