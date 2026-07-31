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

export function GraficoRosca({ dados = [], rosca = true, tamanho = 200, legenda = true, centroRotulo, centroValor, formatar, style }) {
  const fmt = formatar || ((v) => NF.format(v));
  const total = dados.reduce((s, d) => s + (Number(d.valor) || 0), 0) || 1;
  const R = tamanho / 2, r = rosca ? R * 0.62 : 0;
  let ang = -Math.PI / 2;
  const fatias = dados.map((d, i) => {
    const frac = (Number(d.valor) || 0) / total;
    const a0 = ang, a1 = ang + frac * Math.PI * 2;
    ang = a1;
    const grande = a1 - a0 > Math.PI ? 1 : 0;
    const p = (raio, a) => [R + raio * Math.cos(a), R + raio * Math.sin(a)];
    const [x0, y0] = p(R - 1, a0), [x1, y1] = p(R - 1, a1);
    const [x2, y2] = p(r, a1), [x3, y3] = p(r, a0);
    const d1 = 'M' + x0 + ' ' + y0 + ' A' + (R - 1) + ' ' + (R - 1) + ' 0 ' + grande + ' 1 ' + x1 + ' ' + y1
      + (r ? ' L' + x2 + ' ' + y2 + ' A' + r + ' ' + r + ' 0 ' + grande + ' 0 ' + x3 + ' ' + y3 + ' Z' : ' L' + R + ' ' + R + ' Z');
    return { d: d1, cor: d.cor || PALETA[i % 8], rotulo: d.rotulo, valor: d.valor, frac };
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', fontFamily: 'var(--fonte-ui)', ...style }}>
      <svg width={tamanho} height={tamanho} viewBox={'0 0 ' + tamanho + ' ' + tamanho} style={{ flex: 'none' }} role="img">
        {fatias.map((f, i) => <path key={i} d={f.d} fill={f.cor} stroke="var(--cor-superficie)" strokeWidth="2" />)}
        {rosca && (centroValor || centroRotulo) ? (
          <g>
            <text x={R} y={R - 2} textAnchor="middle" fontFamily="var(--fonte-display)" fontSize={tamanho * 0.17} fontWeight="600" fill="var(--cor-texto-forte)">{centroValor}</text>
            <text x={R} y={R + 16} textAnchor="middle" fontFamily="var(--fonte-ui)" fontSize="10" letterSpacing="0.06em" fill="var(--grafico-rotulo)">{(centroRotulo || '').toUpperCase()}</text>
          </g>
        ) : null}
      </svg>
      {legenda ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, minWidth: 150 }}>
          {fatias.map((f, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: f.cor, flex: 'none' }} />
              <span style={{ flex: 1, color: 'var(--cor-texto)' }}>{f.rotulo}</span>
              <span style={{ color: 'var(--cor-texto-suave)', fontVariantNumeric: 'tabular-nums' }}>{fmt(f.valor)}</span>
              <span style={{ color: 'var(--cor-texto-suave)', fontVariantNumeric: 'tabular-nums', width: 38, textAlign: 'right' }}>{Math.round(f.frac * 100)}%</span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
