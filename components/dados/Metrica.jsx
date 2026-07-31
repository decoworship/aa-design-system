/* global React */
/* Só token semântico: literal de cor aqui não vira no tema escuro, e o
   delta de uma métrica é texto pequeno — é onde a falha aparece primeiro. */
const TENDENCIAS = { alta: 'var(--cor-sucesso)', baixa: 'var(--cor-erro)', neutra: 'var(--cor-texto-suave)', atencao: 'var(--cor-atencao)' };

export function Metrica({ rotulo, valor, delta, tendencia = 'neutra', serie, unidade, style }) {
  return (
    <div style={{
      background: 'var(--cor-superficie)', border: '1px solid var(--cor-borda)',
      borderRadius: 'var(--raio-medio)', padding: 16,
      display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'var(--fonte-ui)', ...style,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cor-texto-suave)' }}>{rotulo}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
        <span style={{ fontFamily: 'var(--fonte-display)', fontSize: 36, fontWeight: 600, lineHeight: 1.05, color: 'var(--cor-texto-forte)' }}>{valor}</span>
        {unidade ? <span style={{ fontSize: 13, color: 'var(--cor-texto-suave)' }}>{unidade}</span> : null}
      </div>
      {serie && serie.length > 1 ? <Faisca serie={serie} cor={TENDENCIAS[tendencia]} /> : null}
      {delta ? <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4, color: TENDENCIAS[tendencia] }}>{delta}</div> : null}
    </div>
  );
}

function Faisca({ serie, cor }) {
  const w = 100, h = 22;
  const min = Math.min(...serie), max = Math.max(...serie), span = max - min || 1;
  const pts = serie.map((v, i) => [(i / (serie.length - 1)) * w, h - ((v - min) / span) * (h - 3) - 1.5]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <svg viewBox={'0 0 ' + w + ' ' + h} preserveAspectRatio="none" style={{ width: '100%', height: 22, marginTop: 6, display: 'block' }}>
      <path d={d} fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
