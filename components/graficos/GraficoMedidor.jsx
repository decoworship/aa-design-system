/* global React */
export function GraficoMedidor({ valor = 0, max = 100, rotulo, tamanho = 180, faixas, formatar, style }) {
  const fmt = formatar || ((v) => String(Math.round(v)));
  const pct = Math.max(0, Math.min(1, valor / (max || 1)));
  const R = tamanho / 2, r = R - 14, cx = R, cy = R;
  const arco = (de, ate, cor, largura) => {
    const a0 = Math.PI * (1 + de), a1 = Math.PI * (1 + ate);
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    return <path d={'M' + x0 + ' ' + y0 + ' A' + r + ' ' + r + ' 0 ' + (ate - de > 0.5 ? 1 : 0) + ' 1 ' + x1 + ' ' + y1}
      fill="none" stroke={cor} strokeWidth={largura} strokeLinecap="round" />;
  };
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontFamily: 'var(--fonte-ui)', ...style }}>
      <svg width={tamanho} height={tamanho * 0.62} viewBox={'0 0 ' + tamanho + ' ' + tamanho * 0.62} role="img">
        {arco(0, 1, 'var(--cor-superficie-2)', 12)}
        {(faixas || []).map((f, i) => arco(f.de / max, f.ate / max, f.cor, 12))}
        {arco(0, Math.max(0.001, pct), faixas ? 'var(--cor-texto-forte)' : 'var(--cor-acao)', faixas ? 5 : 12)}
        <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--fonte-display)" fontSize={tamanho * 0.19} fontWeight="600" fill="var(--cor-texto-forte)">{fmt(valor)}</text>
      </svg>
      {rotulo ? <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cor-texto-suave)' }}>{rotulo}</span> : null}
    </div>
  );
}
