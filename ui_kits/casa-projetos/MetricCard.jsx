/* global React */

function MetricCard({ label, value, delta, deltaTone = 'flat' }) {
  const deltaColor = {
    up:   'var(--cor-sucesso)',
    warn: 'var(--cor-atencao)',
    down: 'var(--cor-erro)',
    flat: 'var(--cor-texto-suave)',
  }[deltaTone];
  return (
    <div style={{
      background: 'var(--cor-superficie)',
      border: '1px solid var(--cor-borda)',
      borderRadius: 10,
      padding: 20,
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.06em', color: 'var(--cor-texto-suave)',
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--fonte-display)', fontSize: 36, fontWeight: 600,
        lineHeight: 1.05, color: 'var(--cor-texto-forte)', marginTop: 6,
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</div>
      {delta && (
        <div style={{ fontSize: 11, fontWeight: 600, color: deltaColor, marginTop: 4 }}>{delta}</div>
      )}
    </div>
  );
}

function BarChart({ title, data }) {
  // data: [{ label, value, color }]
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{
      background: 'var(--cor-superficie)',
      border: '1px solid var(--cor-borda)',
      borderRadius: 10,
      padding: 20,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.06em', color: 'var(--cor-texto-suave)',
      }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{
              width: '100%',
              height: `${(d.value / max) * 130}px`,
              minHeight: 4,
              background: d.color,
              borderRadius: '4px 4px 0 0',
            }} />
            <span style={{
              fontSize: 11, color: 'var(--cor-texto-suave)',
              fontVariantNumeric: 'tabular-nums',
            }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MetricCard, BarChart });
