/* global React */
const TONS = {
  info:    { bg: 'var(--cor-info-bg)', fg: 'var(--cor-info)', ponto: 'var(--cor-info)' },
  sucesso: { bg: 'var(--cor-sucesso-bg)', fg: 'var(--cor-sucesso)', ponto: 'var(--cor-sucesso)' },
  atencao: { bg: 'var(--cor-atencao-bg)', fg: 'var(--cor-atencao)', ponto: 'var(--cor-atencao)' },
  erro:    { bg: 'var(--cor-erro-bg)', fg: 'var(--cor-erro)', ponto: 'var(--cor-erro)' },
};

export function Aviso({ variante = 'info', titulo, mensagem, aoFechar, style }) {
  const t = TONS[variante] || TONS.info;
  return (
    <div role="status" style={{
      display: 'flex', gap: 12, alignItems: 'flex-start', width: 340, maxWidth: '100%',
      background: 'var(--cor-camada)', border: '1px solid var(--cor-borda-camada)',
      borderRadius: 'var(--raio-medio)', boxShadow: 'var(--sombra-media)',
      backdropFilter: 'var(--camada-filtro)', WebkitBackdropFilter: 'var(--camada-filtro)',
      padding: '14px 16px', fontFamily: 'var(--fonte-ui)', ...style,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: t.ponto, marginTop: 6, flex: 'none' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {titulo ? <strong style={{ fontSize: 14, fontWeight: 600, color: 'var(--cor-texto-forte)' }}>{titulo}</strong> : null}
        {mensagem ? <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--cor-texto-suave)' }}>{mensagem}</span> : null}
      </div>
      {aoFechar ? (
        <button onClick={aoFechar} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cor-texto-suave)', fontSize: 15, lineHeight: 1, padding: 0, flex: 'none' }}>×</button>
      ) : null}
    </div>
  );
}
