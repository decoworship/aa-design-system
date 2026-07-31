/* global React */
export function Vazio({ titulo, descricao, acao, style }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      padding: '48px 24px', textAlign: 'center', fontFamily: 'var(--fonte-ui)',
      border: '1px dashed var(--cor-borda-forte)', borderRadius: 'var(--raio-grande)',
      background: 'var(--cor-superficie)', ...style,
    }}>
      <div style={{ width: 28, height: 28, borderRadius: 999, border: '1px solid var(--cor-borda-forte)', marginBottom: 4 }} />
      <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--cor-texto-forte)' }}>{titulo}</div>
      {descricao ? <p style={{ margin: 0, fontSize: 13, color: 'var(--cor-texto-suave)', maxWidth: '44ch', lineHeight: 1.55 }}>{descricao}</p> : null}
      {acao ? <div style={{ marginTop: 8 }}>{acao}</div> : null}
    </div>
  );
}
