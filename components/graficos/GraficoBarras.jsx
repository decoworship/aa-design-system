/* global React */
const NF = new Intl.NumberFormat('pt-BR');
const PALETA = ['var(--dados-1)','var(--dados-2)','var(--dados-3)','var(--dados-4)','var(--dados-5)','var(--dados-6)','var(--dados-7)','var(--dados-8)'];

function passoBonito(bruto) {
  const exp = Math.floor(Math.log10(bruto || 1));
  const base = Math.pow(10, exp);
  const n = (bruto || 1) / base;
  const m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return m * base;
}
function marcas(max, min, divisoes) {
  const d = divisoes || 4;
  const passo = passoBonito((max - min) / d);
  const topo = Math.ceil(max / passo) * passo;
  const piso = min < 0 ? Math.floor(min / passo) * passo : 0;
  const out = [];
  for (let v = piso; v <= topo + passo * 0.001; v += passo) out.push(Number(v.toFixed(6)));
  return { marcas: out, topo, piso };
}
function Legenda({ series, style }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontFamily: 'var(--fonte-ui)', fontSize: 12, color: 'var(--cor-texto-suave)', ...style }}>
      {series.map((s, i) => (
        <span key={s.chave || i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: s.cor || PALETA[i % 8], flex: 'none' }} />
          {s.nome || s.chave}
        </span>
      ))}
    </div>
  );
}

export function GraficoBarras({ dados = [], series = [], empilhado, orientacao = 'vertical', altura = 240, mostrarGrade = true, mostrarLegenda = true, formatar, realce, style }) {
  const fmt = formatar || ((v) => NF.format(v));
  const chaves = series.length ? series : [{ chave: 'valor', nome: 'Valor' }];
  const W = 640, H = altura;
  const horizontal = orientacao === 'horizontal';
  const m = horizontal ? { t: 10, r: 16, b: 26, l: 108 } : { t: 10, r: 12, b: 30, l: 46 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;

  const totais = dados.map((d) => empilhado
    ? chaves.reduce((s, k) => s + (Number(d[k.chave]) || 0), 0)
    : Math.max(...chaves.map((k) => Number(d[k.chave]) || 0)));
  const { marcas: ticks, topo } = marcas(Math.max(1, ...totais), 0, 4);

  const passoBanda = (horizontal ? ih : iw) / (dados.length || 1);
  const larguraGrupo = passoBanda * 0.62;
  const larguraBarra = empilhado ? larguraGrupo : larguraGrupo / chaves.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      <svg viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }} role="img">
        {mostrarGrade ? ticks.map((t) => {
          const p = (t / topo);
          return horizontal
            ? <line key={t} x1={m.l + p * iw} x2={m.l + p * iw} y1={m.t} y2={m.t + ih} stroke="var(--grafico-grade)" strokeWidth="1" />
            : <line key={t} x1={m.l} x2={m.l + iw} y1={m.t + ih - p * ih} y2={m.t + ih - p * ih} stroke="var(--grafico-grade)" strokeWidth="1" />;
        }) : null}
        {ticks.map((t) => {
          const p = t / topo;
          return horizontal
            ? <text key={'l' + t} x={m.l + p * iw} y={m.t + ih + 17} textAnchor="middle" fontSize="10" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{fmt(t)}</text>
            : <text key={'l' + t} x={m.l - 8} y={m.t + ih - p * ih + 3.5} textAnchor="end" fontSize="10" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{fmt(t)}</text>;
        })}
        {dados.map((d, i) => {
          const inicio = (horizontal ? m.t : m.l) + i * passoBanda + (passoBanda - larguraGrupo) / 2;
          let acumulado = 0;
          return (
            <g key={i}>
              {chaves.map((k, j) => {
                const v = Number(d[k.chave]) || 0;
                const comp = (v / topo) * (horizontal ? iw : ih);
                const cor = realce && realce === d.rotulo ? 'var(--grafico-realce)' : (k.cor || PALETA[j % 8]);
                let x, y, w, h;
                if (horizontal) {
                  x = m.l + (empilhado ? (acumulado / topo) * iw : 0);
                  y = inicio + (empilhado ? 0 : j * larguraBarra);
                  w = comp; h = Math.max(0, larguraBarra - (empilhado ? 0 : 2));
                } else {
                  x = inicio + (empilhado ? 0 : j * larguraBarra);
                  y = m.t + ih - comp - (empilhado ? (acumulado / topo) * ih : 0);
                  w = Math.max(0, larguraBarra - (empilhado ? 0 : 2)); h = comp;
                }
                acumulado += v;
                return <rect key={k.chave} x={x} y={y} width={w} height={h} fill={cor} rx="2" />;
              })}
              {horizontal
                ? <text x={m.l - 10} y={inicio + larguraGrupo / 2 + 3.5} textAnchor="end" fontSize="11" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{d.rotulo}</text>
                : <text x={inicio + larguraGrupo / 2} y={m.t + ih + 18} textAnchor="middle" fontSize="11" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{d.rotulo}</text>}
            </g>
          );
        })}
        <line x1={m.l} y1={m.t + ih} x2={m.l + iw} y2={m.t + ih} stroke="var(--grafico-eixo)" strokeWidth="1" />
      </svg>
      {mostrarLegenda && chaves.length > 1 ? <Legenda series={chaves} /> : null}
    </div>
  );
}
