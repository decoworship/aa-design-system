/* global React */
export function Progresso({ valor = 0, max = 100, rotulo, formato = 'barra', cor = 'var(--cor-acao)', tamanho = 64, mostrarValor, style }) {
  const pct = Math.max(0, Math.min(1, valor / (max || 1)));
  if (formato === 'anel') {
    const r = (tamanho - 8) / 2, c = 2 * Math.PI * r;
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: 'var(--fonte-ui)', ...style }}>
        <svg width={tamanho} height={tamanho} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={tamanho / 2} cy={tamanho / 2} r={r} fill="none" stroke="var(--cor-superficie-2)" strokeWidth="6" />
          <circle cx={tamanho / 2} cy={tamanho / 2} r={r} fill="none" stroke={cor} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - pct)} style={{ transition: 'stroke-dashoffset 240ms ease' }} />
        </svg>
        {rotulo ? <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)' }}>{rotulo}</span> : null}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--fonte-ui)', ...style }}>
      {rotulo || mostrarValor ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--cor-texto-suave)' }}>
          <span>{rotulo}</span>
          {mostrarValor ? <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{Math.round(pct * 100)}%</span> : null}
        </div>
      ) : null}
      <div style={{ height: 6, background: 'var(--cor-superficie-2)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: (pct * 100) + '%', background: cor, borderRadius: 999, transition: 'width 240ms ease' }} />
      </div>
    </div>
  );
}
