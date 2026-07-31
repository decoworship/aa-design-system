/* global React */
const { useState, useCallback, useRef, useEffect } = React;

const CANTOS = {
  'inferior-direito': { bottom: 'var(--espaco-5)', right: 'var(--espaco-5)', align: 'flex-end' },
  'inferior-esquerdo': { bottom: 'var(--espaco-5)', left: 'var(--espaco-5)', align: 'flex-start' },
  'superior-direito': { top: 'var(--espaco-5)', right: 'var(--espaco-5)', align: 'flex-end' },
  'superior-esquerdo': { top: 'var(--espaco-5)', left: 'var(--espaco-5)', align: 'flex-start' },
};

const TONS = {
  info: 'var(--cor-info)', sucesso: 'var(--cor-sucesso)',
  atencao: 'var(--cor-atencao)', erro: 'var(--cor-erro)',
};

/* Fila de avisos: no máximo `limite` na tela, o mais novo empurra o mais antigo.
   Erro não some sozinho — quem errou precisa ler. */
function usarAvisos({ limite = 3, duracao = 5000 } = {}) {
  const [avisos, setAvisos] = useState([]);
  const seq = useRef(0);
  const dispensar = useCallback((id) => setAvisos((a) => a.filter((x) => x.id !== id)), []);
  const avisar = useCallback((aviso) => {
    const id = ++seq.current;
    setAvisos((a) => [...a, { id, variante: 'info', ...aviso }].slice(-limite));
    return id;
  }, [limite]);
  return { avisos, avisar, dispensar };
}

function Item({ aviso, aoDispensar, duracao }) {
  const permanente = aviso.variante === 'erro' || aviso.acao;
  useEffect(() => {
    if (permanente) return;
    const t = setTimeout(aoDispensar, aviso.duracao ?? duracao);
    return () => clearTimeout(t);
  }, [permanente, aviso.duracao, duracao, aoDispensar]);
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start', width: 340, maxWidth: '100%',
      boxSizing: 'border-box', background: 'var(--cor-superficie)',
      border: '1px solid var(--cor-borda)', borderRadius: 'var(--raio-medio)',
      boxShadow: 'var(--sombra-media)', padding: '14px 16px',
      fontFamily: 'var(--fonte-ui)', pointerEvents: 'auto',
      animation: 'aa-aviso-entra 200ms ease',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: TONS[aviso.variante] || TONS.info, marginTop: 6, flex: 'none' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {aviso.titulo ? <strong style={{ fontSize: 14, fontWeight: 600, color: 'var(--cor-texto-forte)' }}>{aviso.titulo}</strong> : null}
        {aviso.mensagem ? <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--cor-texto-suave)' }}>{aviso.mensagem}</span> : null}
        {aviso.acao ? (
          <button onClick={() => { aviso.acao.ao && aviso.acao.ao(); aoDispensar(); }} style={{
            alignSelf: 'flex-start', marginTop: 6, background: 'none', border: 'none', padding: 0,
            cursor: 'pointer', fontFamily: 'var(--fonte-ui)', fontSize: 13, fontWeight: 600,
            color: 'var(--cor-acao)', textDecoration: 'underline',
            textDecorationColor: 'var(--cor-link-sublinhado)', textUnderlineOffset: 3,
          }}>{aviso.acao.rotulo}</button>
        ) : null}
      </div>
      <button onClick={aoDispensar} aria-label="Fechar aviso" style={{
        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cor-texto-suave)',
        fontSize: 15, lineHeight: 1, padding: 0, flex: 'none', minWidth: 20, minHeight: 20,
      }}>×</button>
    </div>
  );
}

export function PilhaAvisos({ avisos = [], aoDispensar, canto = 'inferior-direito', duracao = 5000, style }) {
  const c = CANTOS[canto] || CANTOS['inferior-direito'];
  const deBaixo = canto.startsWith('inferior');
  return (
    <div aria-live="polite" aria-atomic="false" style={{
      position: 'fixed', zIndex: 'var(--z-aviso)', display: 'flex',
      flexDirection: deBaixo ? 'column-reverse' : 'column',
      alignItems: c.align, gap: 'var(--espaco-3)', pointerEvents: 'none',
      top: c.top, bottom: c.bottom, left: c.left, right: c.right, ...style,
    }}>
      {avisos.map((a) => (
        <Item key={a.id} aviso={a} duracao={duracao} aoDispensar={() => aoDispensar && aoDispensar(a.id)} />
      ))}
    </div>
  );
}

/* O compilador só expõe nomes com maiúscula e reencapsula a função exportada,
   então propriedade pendurada no componente não sobrevive. O hook sai como
   binding próprio, capitalizado: Avisos.usar(). */
export const Avisos = { usar: usarAvisos };
