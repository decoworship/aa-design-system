/* global React */
const TONS = {
  info:    { bg: 'var(--cor-info-bg)', fg: 'var(--cor-info)', ponto: 'var(--cor-info)' },
  sucesso: { bg: 'var(--cor-sucesso-bg)', fg: 'var(--cor-sucesso)', ponto: 'var(--cor-sucesso)' },
  atencao: { bg: 'var(--cor-atencao-bg)', fg: 'var(--cor-atencao)', ponto: 'var(--cor-atencao)' },
  erro:    { bg: 'var(--cor-erro-bg)', fg: 'var(--cor-erro)', ponto: 'var(--cor-erro)' },
};

export function Alerta({ variante = 'info', titulo, children, aoFechar, style }) {
  const t = TONS[variante] || TONS.info;
  return (
    <div role="status" style={{
      display: 'flex', gap: 12, padding: '12px 16px', borderRadius: 'var(--raio-medio)',
      background: t.bg, color: t.fg, fontFamily: 'var(--fonte-ui)', fontSize: 13,
      alignItems: 'flex-start', ...style,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: t.ponto, marginTop: 6, flex: 'none' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, lineHeight: 1.5 }}>
        {titulo ? <strong style={{ fontWeight: 600 }}>{titulo}</strong> : null}
        <span>{children}</span>
      </div>
      {aoFechar ? (
        <button onClick={aoFechar} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', opacity: 0.6, fontSize: 15, lineHeight: 1, padding: 0, flex: 'none' }}>×</button>
      ) : null}
    </div>
  );
}
