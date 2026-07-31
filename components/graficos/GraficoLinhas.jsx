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

export function GraficoLinhas({ dados = [], series = [], area, altura = 240, mostrarGrade = true, mostrarPontos, mostrarLegenda = true, formatar, referencia, style }) {
  const fmt = formatar || ((v) => NF.format(v));
  const chaves = series.length ? series : [{ chave: 'valor', nome: 'Valor' }];
  const W = 640, H = altura, m = { t: 12, r: 14, b: 30, l: 46 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const todos = dados.flatMap((d) => chaves.map((k) => Number(d[k.chave]) || 0));
  const { marcas: ticks, topo, piso } = marcas(Math.max(1, ...todos), Math.min(0, ...todos), 4);
  const span = topo - piso || 1;
  const px = (i) => m.l + (dados.length > 1 ? (i / (dados.length - 1)) * iw : iw / 2);
  const py = (v) => m.t + ih - ((v - piso) / span) * ih;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      <svg viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }} role="img">
        {mostrarGrade ? ticks.map((t) => (
          <line key={t} x1={m.l} x2={m.l + iw} y1={py(t)} y2={py(t)} stroke="var(--grafico-grade)" strokeWidth="1" />
        )) : null}
        {ticks.map((t) => (
          <text key={'l' + t} x={m.l - 8} y={py(t) + 3.5} textAnchor="end" fontSize="10" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{fmt(t)}</text>
        ))}
        {referencia != null ? (
          <g>
            <line x1={m.l} x2={m.l + iw} y1={py(referencia)} y2={py(referencia)} stroke="var(--grafico-referencia)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={m.l + iw} y={py(referencia) - 5} textAnchor="end" fontSize="10" fill="var(--grafico-referencia)" fontFamily="var(--fonte-ui)">meta</text>
          </g>
        ) : null}
        {chaves.map((k, j) => {
          const cor = k.cor || PALETA[j % 8];
          const pts = dados.map((d, i) => [px(i), py(Number(d[k.chave]) || 0)]);
          const linha = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
          return (
            <g key={k.chave}>
              {area ? <path d={linha + ' L' + px(dados.length - 1).toFixed(1) + ' ' + py(piso).toFixed(1) + ' L' + px(0).toFixed(1) + ' ' + py(piso).toFixed(1) + ' Z'} fill={j === 0 ? 'var(--grafico-area)' : cor} opacity={j === 0 ? 1 : 0.14} /> : null}
              <path d={linha} fill="none" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {mostrarPontos ? pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="var(--cor-superficie)" stroke={cor} strokeWidth="2" />) : null}
            </g>
          );
        })}
        {dados.map((d, i) => (
          <text key={i} x={px(i)} y={m.t + ih + 18} textAnchor="middle" fontSize="11" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{d.rotulo}</text>
        ))}
        <line x1={m.l} y1={m.t + ih} x2={m.l + iw} y2={m.t + ih} stroke="var(--grafico-eixo)" strokeWidth="1" />
      </svg>
      {mostrarLegenda && chaves.length > 1 ? <Legenda series={chaves} /> : null}
    </div>
  );
}
