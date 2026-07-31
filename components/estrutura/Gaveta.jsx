/* global React */
const { useEffect, useRef } = React;

const LADOS = {
  direita: { inset: '0 0 0 auto', borda: 'borderLeft', anim: 'aa-gaveta-direita' },
  esquerda: { inset: '0 auto 0 0', borda: 'borderRight', anim: 'aa-gaveta-esquerda' },
  baixo: { inset: 'auto 0 0 0', borda: 'borderTop', anim: 'aa-gaveta-baixo' },
};

/* Gaveta: painel lateral para tarefa secundária que não merece sair da tela —
   filtros, detalhe de item, formulário curto. Se a tarefa é a única coisa que
   importa naquele momento, use Modal; se é navegação, use BarraLateral. */
export function Gaveta({
  aberta = true, lado = 'direita', titulo, rotulo, aoFechar,
  largura = 400, altura = '70vh', acoes, children, style,
}) {
  const painel = useRef(null);
  const l = LADOS[lado] || LADOS.direita;
  const deBaixo = lado === 'baixo';

  useEffect(() => {
    if (!aberta) return;
    const h = (e) => { if (e.key === 'Escape' && aoFechar) aoFechar(); };
    window.addEventListener('keydown', h);
    const antes = document.activeElement;
    if (painel.current) painel.current.focus();
    return () => {
      window.removeEventListener('keydown', h);
      if (antes && antes.focus) antes.focus();
    };
  }, [aberta, aoFechar]);

  if (!aberta) return null;
  return (
    <div onClick={aoFechar} style={{
      position: 'fixed', inset: 0, zIndex: 'var(--z-modal)',
      background: 'var(--cor-veu)', animation: 'aa-veu-entra 160ms ease',
    }}>
      <div
        ref={painel} role="dialog" aria-modal="true" aria-label={titulo || 'Painel'} tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', inset: l.inset, outline: 'none',
          width: deBaixo ? 'auto' : largura, maxWidth: '100%',
          height: deBaixo ? altura : 'auto', maxHeight: '100%',
          display: 'flex', flexDirection: 'column',
          background: 'var(--cor-superficie)', boxShadow: 'var(--sombra-grande)',
          [l.borda]: '1px solid var(--cor-borda)',
          borderRadius: deBaixo ? 'var(--raio-grande) var(--raio-grande) 0 0' : 0,
          fontFamily: 'var(--fonte-ui)',
          animation: l.anim + ' 220ms cubic-bezier(0.22,0.61,0.36,1)',
          ...style,
        }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 24px 16px',
          borderBottom: '1px solid var(--cor-borda)', flex: 'none',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {rotulo ? <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cor-texto-suave)', marginBottom: 4 }}>{rotulo}</div> : null}
            {titulo ? <h2 style={{ margin: 0, fontFamily: 'var(--fonte-display)', fontSize: 22, fontWeight: 600, lineHeight: 1.2, color: 'var(--cor-texto-forte)' }}>{titulo}</h2> : null}
          </div>
          {aoFechar ? (
            <button onClick={aoFechar} aria-label="Fechar painel" style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cor-texto-suave)',
              fontSize: 20, lineHeight: 1, padding: 0, flex: 'none', minWidth: 44, minHeight: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            }}>×</button>
          ) : null}
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px', fontSize: 15, lineHeight: 1.55, color: 'var(--cor-texto)' }}>{children}</div>
        {acoes ? (
          <div style={{
            display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '16px 24px',
            borderTop: '1px solid var(--cor-borda)', background: 'var(--cor-superficie-2)', flex: 'none',
          }}>{acoes}</div>
        ) : null}
      </div>
    </div>
  );
}
