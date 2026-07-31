/* global React */
const { useState } = React;

function Envoltorio({ rotulo, obrigatorio, dica, erro, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--fonte-ui)' }}>
      {rotulo ? (
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--cor-texto)' }}>
          {rotulo}{obrigatorio ? <span style={{ color: 'var(--cor-destaque)', marginLeft: 2 }}>*</span> : null}
        </span>
      ) : null}
      {children}
      {erro
        ? <span style={{ fontSize: 11, color: 'var(--cor-erro)', fontWeight: 600 }}>{erro}</span>
        : dica ? <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)' }}>{dica}</span> : null}
    </label>
  );
}

function entradaEstilo({ foco, erro, desabilitado }) {
  return {
    fontFamily: 'var(--fonte-ui)', fontSize: 15, color: 'var(--cor-texto)',
    padding: '9px 12px', width: '100%', boxSizing: 'border-box',
    border: '1px solid ' + (erro ? 'var(--cor-erro)' : foco ? 'var(--cor-acao)' : 'var(--cor-borda-forte)'),
    borderRadius: 'var(--raio-pequeno)',
    background: desabilitado ? 'var(--cor-superficie-2)' : 'var(--cor-superficie)',
    opacity: desabilitado ? 0.55 : 1, outline: 'none',
    boxShadow: foco ? (erro ? 'var(--anel-foco-erro)' : 'var(--anel-foco)') : 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
  };
}

export function AreaTexto({ rotulo, valor, aoMudar, placeholder, dica, erro, linhas = 4, obrigatorio, desabilitado, style }) {
  const [foco, setFoco] = useState(false);
  return (
    <Envoltorio rotulo={rotulo} obrigatorio={obrigatorio} dica={dica} erro={erro}>
      <textarea
        rows={linhas} value={valor ?? ''} placeholder={placeholder} disabled={desabilitado}
        onChange={(e) => aoMudar && aoMudar(e.target.value)}
        onFocus={() => setFoco(true)} onBlur={() => setFoco(false)}
        style={{ ...entradaEstilo({ foco, erro, desabilitado }), lineHeight: 1.55, resize: 'vertical', ...style }} />
    </Envoltorio>
  );
}
