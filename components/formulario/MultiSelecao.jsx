/* global React */
const { useState, useRef, useEffect, useMemo } = React;

function normaliza(o) {
  return typeof o === 'string' ? { valor: o, rotulo: o } : o;
}

/* Multi-seleção: fichas do que já foi escolhido + lista com caixas de marcar.
   Acima de ~8 opções a busca aparece sozinha; abaixo dela seria só ruído. */
export function MultiSelecao({
  rotulo, opcoes = [], valor = [], aoMudar, placeholder = 'Selecionar…',
  dica, erro, obrigatorio, desabilitado, limite, maxFichas = 3, style,
}) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [foco, setFoco] = useState(false);
  const raiz = useRef(null);

  const itens = useMemo(() => opcoes.map(normaliza), [opcoes]);
  const comBusca = itens.length > 8;
  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return q ? itens.filter((o) => o.rotulo.toLowerCase().includes(q)) : itens;
  }, [itens, busca]);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e) => { if (raiz.current && !raiz.current.contains(e.target)) setAberto(false); };
    const tecla = (e) => { if (e.key === 'Escape') setAberto(false); };
    document.addEventListener('mousedown', fora);
    window.addEventListener('keydown', tecla);
    return () => { document.removeEventListener('mousedown', fora); window.removeEventListener('keydown', tecla); };
  }, [aberto]);

  const cheio = limite != null && valor.length >= limite;
  const alterna = (v) => {
    if (!aoMudar) return;
    if (valor.includes(v)) aoMudar(valor.filter((x) => x !== v));
    else if (!cheio) aoMudar([...valor, v]);
  };

  const escolhidos = itens.filter((o) => valor.includes(o.valor));
  const visiveis = escolhidos.slice(0, maxFichas);
  const restantes = escolhidos.length - visiveis.length;

  return (
    <div ref={raiz} style={{ position: 'relative', fontFamily: 'var(--fonte-ui)', display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {rotulo ? (
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--cor-texto)' }}>
          {rotulo}{obrigatorio ? <span style={{ color: 'var(--cor-destaque-texto)', marginLeft: 2 }}>*</span> : null}
        </span>
      ) : null}

      <button
        type="button" disabled={desabilitado}
        onClick={() => setAberto((a) => !a)}
        onFocus={() => setFoco(true)} onBlur={() => setFoco(false)}
        aria-expanded={aberto} aria-haspopup="listbox"
        style={{
          display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', textAlign: 'left',
          minHeight: 40, width: '100%', boxSizing: 'border-box', padding: '6px 34px 6px 10px',
          fontFamily: 'var(--fonte-ui)', fontSize: 15, color: 'var(--cor-texto)',
          background: desabilitado ? 'var(--cor-superficie-2)' : 'var(--cor-superficie)',
          border: '1px solid ' + (erro ? 'var(--cor-erro)' : (foco || aberto) ? 'var(--cor-acao)' : 'var(--cor-borda-controle)'),
          borderRadius: 'var(--raio-pequeno)', outline: 'none',
          boxShadow: (foco || aberto) ? (erro ? 'var(--anel-foco-erro)' : 'var(--anel-foco)') : 'none',
          opacity: desabilitado ? 0.55 : 1, cursor: desabilitado ? 'not-allowed' : 'pointer',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          backgroundImage: 'linear-gradient(45deg, transparent 50%, var(--cor-texto-suave) 50%), linear-gradient(135deg, var(--cor-texto-suave) 50%, transparent 50%)',
          backgroundPosition: 'calc(100% - 16px) 50%, calc(100% - 11px) 50%',
          backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat',
        }}>
        {escolhidos.length === 0 ? (
          <span style={{ color: 'var(--cor-texto-suave)' }}>{placeholder}</span>
        ) : (
          <React.Fragment>
            {visiveis.map((o) => (
              <span key={o.valor} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 4px 2px 8px',
                borderRadius: 999, background: 'var(--cor-acao-suave)', color: 'var(--cor-acao)',
                fontSize: 13, fontWeight: 600, lineHeight: 1.6,
              }}>
                {o.rotulo}
                <span
                  role="button" aria-label={'Remover ' + o.rotulo} tabIndex={-1}
                  onClick={(e) => { e.stopPropagation(); alterna(o.valor); }}
                  style={{ cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: '0 3px', opacity: 0.75 }}>×</span>
              </span>
            ))}
            {restantes > 0 ? <span style={{ fontSize: 13, color: 'var(--cor-texto-suave)' }}>+{restantes}</span> : null}
          </React.Fragment>
        )}
      </button>

      {aberto ? (
        <div role="listbox" aria-multiselectable="true" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          zIndex: 'var(--z-suspenso)', background: 'var(--cor-camada)',
          border: '1px solid var(--cor-borda-camada)', borderRadius: 'var(--raio-medio)',
          boxShadow: 'var(--sombra-media)', padding: 6, maxHeight: 260, overflow: 'auto',
          backdropFilter: 'var(--camada-filtro)', WebkitBackdropFilter: 'var(--camada-filtro)',
        }}>
          {comBusca ? (
            <input
              autoFocus value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="Filtrar opções" aria-label="Filtrar opções"
              style={{
                width: '100%', boxSizing: 'border-box', marginBottom: 6, padding: '7px 10px',
                fontFamily: 'var(--fonte-ui)', fontSize: 14, color: 'var(--cor-texto)',
                background: 'var(--cor-superficie-2)', border: '1px solid var(--cor-borda)',
                borderRadius: 'var(--raio-pequeno)', outline: 'none',
              }} />
          ) : null}

          {filtrados.length === 0 ? (
            <div style={{ padding: '10px 10px 12px', fontSize: 13, color: 'var(--cor-texto-suave)' }}>
              Nada com esse nome. Tente menos letras.
            </div>
          ) : filtrados.map((o) => {
            const marcado = valor.includes(o.valor);
            const bloqueado = !marcado && cheio;
            return (
              <div
                key={o.valor} role="option" aria-selected={marcado}
                onClick={() => !bloqueado && alterna(o.valor)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                  borderRadius: 'var(--raio-pequeno)', fontSize: 14, minHeight: 20,
                  color: bloqueado ? 'var(--cor-texto-suave)' : 'var(--cor-texto)',
                  background: marcado ? 'var(--cor-acao-suave)' : 'transparent',
                  cursor: bloqueado ? 'not-allowed' : 'pointer', opacity: bloqueado ? 0.6 : 1,
                }}>
                <span aria-hidden="true" style={{
                  width: 16, height: 16, flex: 'none', borderRadius: 4,
                  border: '1px solid ' + (marcado ? 'var(--cor-acao)' : 'var(--cor-borda-controle)'),
                  background: marcado ? 'var(--cor-acao)' : 'var(--cor-superficie)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cor-texto-invertido)', fontSize: 11, lineHeight: 1, fontWeight: 700,
                }}>{marcado ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>{o.rotulo}</span>
              </div>
            );
          })}
        </div>
      ) : null}

      {erro
        ? <span style={{ fontSize: 11, color: 'var(--cor-erro)', fontWeight: 600 }}>{erro}</span>
        : (
          <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)' }}>
            {cheio ? 'Máximo de ' + limite + ' — desmarque uma para trocar.' : dica}
          </span>
        )}
    </div>
  );
}
