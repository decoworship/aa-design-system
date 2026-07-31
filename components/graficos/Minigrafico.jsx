/* global React */
export function Minigrafico({ dados = [], tipo = 'linha', cor = 'var(--dados-1)', largura = 120, altura = 32, realceUltimo, style }) {
  if (!dados.length) return null;
  const min = Math.min(...dados, 0), max = Math.max(...dados), span = max - min || 1;
  const W = 100, H = 30;
  if (tipo === 'barra') {
    const p = W / dados.length;
    return (
      <svg viewBox={'0 0 ' + W + ' ' + H} preserveAspectRatio="none" style={{ width: largura, height: altura, display: 'block', ...style }}>
        {dados.map((v, i) => {
          const h = ((v - min) / span) * (H - 2) || 0.5;
          return <rect key={i} x={i * p} y={H - h} width={Math.max(0.6, p - p * 0.32)} height={h}
            fill={realceUltimo && i === dados.length - 1 ? 'var(--grafico-realce)' : cor} opacity={realceUltimo && i < dados.length - 1 ? 0.5 : 1} />;
        })}
      </svg>
    );
  }
  const pts = dados.map((v, i) => [(i / (dados.length - 1)) * W, H - ((v - min) / span) * (H - 3) - 1.5]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <svg viewBox={'0 0 ' + W + ' ' + H} preserveAspectRatio="none" style={{ width: largura, height: altura, display: 'block', overflow: 'visible', ...style }}>
      <path d={d} fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {realceUltimo ? <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill="var(--grafico-realce)" vectorEffect="non-scaling-stroke" /> : null}
    </svg>
  );
}
