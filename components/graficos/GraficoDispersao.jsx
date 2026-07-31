/* global React */
const NF = new Intl.NumberFormat('pt-BR');
const PALETA = ['var(--dados-1)','var(--dados-2)','var(--dados-3)','var(--dados-4)','var(--dados-5)','var(--dados-6)'];

function passoBonito(bruto) {
  const exp = Math.floor(Math.log10(bruto || 1)), base = Math.pow(10, exp), n = (bruto || 1) / base;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * base;
}
function eixo(max) {
  const passo = passoBonito(max / 4), topo = Math.ceil(max / passo) * passo, out = [];
  for (let v = 0; v <= topo + passo * 0.001; v += passo) out.push(Number(v.toFixed(6)));
  return { ticks: out, topo };
}

export function GraficoDispersao({ pontos = [], altura = 260, rotuloX, rotuloY, formatarX, formatarY, tamanhoBolha, style }) {
  const fx = formatarX || ((v) => NF.format(v)), fy = formatarY || ((v) => NF.format(v));
  const W = 640, H = altura, m = { t: 12, r: 16, b: 38, l: 50 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const ex = eixo(Math.max(1, ...pontos.map((p) => p.x)));
  const ey = eixo(Math.max(1, ...pontos.map((p) => p.y)));
  const maxR = Math.max(1, ...pontos.map((p) => p.tamanho || 1));
  return (
    <div style={{ ...style }}>
      <svg viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }} role="img">
        {ey.ticks.map((t) => {
          const y = m.t + ih - (t / ey.topo) * ih;
          return <g key={'y' + t}>
            <line x1={m.l} x2={m.l + iw} y1={y} y2={y} stroke="var(--grafico-grade)" strokeWidth="1" />
            <text x={m.l - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{fy(t)}</text>
          </g>;
        })}
        {ex.ticks.map((t) => {
          const x = m.l + (t / ex.topo) * iw;
          return <text key={'x' + t} x={x} y={m.t + ih + 17} textAnchor="middle" fontSize="10" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{fx(t)}</text>;
        })}
        {pontos.map((p, i) => (
          <circle key={i}
            cx={m.l + (p.x / ex.topo) * iw}
            cy={m.t + ih - (p.y / ey.topo) * ih}
            r={tamanhoBolha ? 4 + ((p.tamanho || 1) / maxR) * 14 : 4.5}
            fill={p.cor || PALETA[(p.grupo || 0) % 6]} opacity="0.72" />
        ))}
        <line x1={m.l} y1={m.t + ih} x2={m.l + iw} y2={m.t + ih} stroke="var(--grafico-eixo)" strokeWidth="1" />
        {rotuloX ? <text x={m.l + iw / 2} y={H - 4} textAnchor="middle" fontSize="10" letterSpacing="0.06em" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{rotuloX.toUpperCase()}</text> : null}
        {rotuloY ? <text x={-(m.t + ih / 2)} y="12" transform="rotate(-90)" textAnchor="middle" fontSize="10" letterSpacing="0.06em" fill="var(--grafico-rotulo)" fontFamily="var(--fonte-ui)">{rotuloY.toUpperCase()}</text> : null}
      </svg>
    </div>
  );
}
