/* global React */
const { useState } = React;

const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const SEMANA = ['D','S','T','Q','Q','S','S'];

const dia = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const mesmoDia = (a, b) => a && b && dia(a).getTime() === dia(b).getTime();

/* Calendário de mês, pt-BR, semana começando no domingo (é o que o
   Brasil lê). Ele não sabe nada de "últimos 30 dias" — quem sabe disso
   é o SeletorPeriodo. Aqui só existe dia e intervalo. */
export function Calendario({
  modo = 'dia', valor, aoSelecionar, min, max, mesInicial, style,
}) {
  const base = mesInicial || (modo === 'intervalo' ? valor?.inicio : valor) || new Date();
  const [mes, setMes] = useState(new Date(base.getFullYear(), base.getMonth(), 1));
  const [pairando, setPairando] = useState(null);

  const inicio = modo === 'intervalo' ? valor?.inicio : valor;
  const fim = modo === 'intervalo' ? valor?.fim : null;
  /* Enquanto só a primeira ponta foi escolhida, o intervalo desenhado
     acompanha o mouse — sem isso a pessoa não entende que falta clicar. */
  const fimVisivel = fim || (modo === 'intervalo' && inicio && pairando > inicio ? pairando : null);

  const primeiro = new Date(mes.getFullYear(), mes.getMonth(), 1);
  const celulas = [];
  for (let i = 0; i < primeiro.getDay(); i++) celulas.push(null);
  const ultimo = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
  for (let d = 1; d <= ultimo; d++) celulas.push(new Date(mes.getFullYear(), mes.getMonth(), d));
  while (celulas.length % 7) celulas.push(null);

  const bloqueado = (d) => (min && dia(d) < dia(min)) || (max && dia(d) > dia(max));

  function clicar(d) {
    if (bloqueado(d)) return;
    if (modo === 'dia') return aoSelecionar && aoSelecionar(d);
    if (!inicio || fim) return aoSelecionar && aoSelecionar({ inicio: d, fim: null });
    /* Clicou antes do início? Não é erro — é a pessoa se corrigindo.
       Reordena em silêncio em vez de recusar o clique. */
    if (dia(d) < dia(inicio)) return aoSelecionar && aoSelecionar({ inicio: d, fim: inicio });
    aoSelecionar && aoSelecionar({ inicio, fim: d });
  }

  const seta = (dir) => (
    <button type="button" aria-label={dir < 0 ? 'Mês anterior' : 'Próximo mês'}
      onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + dir, 1))}
      style={{
        font: 'inherit', fontSize: 16, lineHeight: 1, cursor: 'pointer', width: 28, height: 28, flex: 'none',
        display: 'grid', placeItems: 'center', borderRadius: 'var(--raio-pequeno)',
        border: '1px solid var(--cor-borda)', background: 'var(--cor-superficie)', color: 'var(--cor-texto)',
      }}>{dir < 0 ? '\u2039' : '\u203A'}</button>
  );

  return (
    /* Largura máxima, não fixa: o calendário mora em barra lateral estreita
       tanto quanto em popover, e célula de tamanho fixo estoura a lateral. */
    <div style={{ fontFamily: 'var(--fonte-ui)', width: '100%', maxWidth: 266, minWidth: 0, boxSizing: 'border-box', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, marginBottom: 10 }}>
        {seta(-1)}
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cor-texto-forte)', textTransform: 'capitalize', textAlign: 'center', minWidth: 0, whiteSpace: 'nowrap' }}>
          {MESES[mes.getMonth()]} {mes.getFullYear()}
        </div>
        {seta(1)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', gap: 2 }}>
        {SEMANA.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--cor-texto-suave)', paddingBottom: 4 }}>{s}</div>
        ))}
        {celulas.map((d, i) => {
          if (!d) return <div key={i} />;
          const dentro = fimVisivel && inicio && dia(d) > dia(inicio) && dia(d) < dia(fimVisivel);
          const ponta = mesmoDia(d, inicio) || mesmoDia(d, fimVisivel) || (modo === 'dia' && mesmoDia(d, valor));
          const hoje = mesmoDia(d, new Date());
          const off = bloqueado(d);
          return (
            <button key={i} type="button" disabled={off}
              onClick={() => clicar(d)} onMouseEnter={() => setPairando(d)} onMouseLeave={() => setPairando(null)}
              aria-current={hoje ? 'date' : undefined}
              style={{
                font: 'inherit', fontSize: 13, fontVariantNumeric: 'tabular-nums',
                padding: '8px 0', minWidth: 0, border: 'none', borderRadius: 'var(--raio-pequeno)',
                cursor: off ? 'not-allowed' : 'pointer', opacity: off ? 0.3 : 1,
                background: ponta ? 'var(--cor-acao)' : dentro ? 'var(--cor-superficie-2)' : 'transparent',
                color: ponta ? 'var(--cor-texto-invertido)' : 'var(--cor-texto)',
                fontWeight: ponta || hoje ? 600 : 400,
                boxShadow: hoje && !ponta ? 'inset 0 0 0 1px var(--cor-borda-controle)' : 'none',
                transition: 'background 120ms ease',
              }}>{d.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
}
