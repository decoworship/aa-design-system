/* global React */
const { useState } = React;

const VARIANTES = {
  primario: { background: 'var(--cor-acao)', color: 'var(--cor-texto-invertido)', boxShadow: '0 1px 2px rgba(34,31,26,0.10)' },
  secundario: { background: 'var(--cor-superficie)', color: 'var(--cor-texto)', borderColor: 'var(--cor-borda-forte)' },
  texto: { background: 'transparent', color: 'var(--cor-acao)' },
  perigo: { background: 'var(--cor-erro)', color: 'var(--cor-texto-invertido)' },
};
const HOVER = {
  primario: { background: 'var(--cor-acao-hover)', boxShadow: '0 6px 14px rgba(38,64,90,0.22)', transform: 'translateY(-1px)' },
  secundario: { background: 'var(--cor-superficie-2)', borderColor: 'var(--cor-borda-controle-hover)' },
  texto: { background: 'var(--cor-acao-suave)' },
  perigo: { filter: 'brightness(0.92)' },
};
const ATIVO = {
  primario: { background: 'var(--cor-acao-ativa)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.18)', transform: 'translateY(1px)' },
  secundario: { background: 'var(--cor-superficie-2)', borderColor: 'var(--cor-borda-controle-hover)', boxShadow: 'inset 0 1px 2px rgba(34,31,26,0.10)' },
  texto: { background: 'var(--cor-acao-suave-2)', color: 'var(--cor-acao-ativa)' },
  perigo: { filter: 'brightness(0.84)' },
};
const FOCO = {
  primario: { boxShadow: '0 0 0 2px var(--cor-superficie), 0 0 0 5px var(--cor-acao-ativa)' },
  secundario: { borderColor: 'var(--cor-acao)', boxShadow: 'var(--anel-foco)' },
  texto: { boxShadow: 'var(--anel-foco)' },
  perigo: { boxShadow: 'var(--anel-foco-erro)' },
};
const TAMANHOS = {
  pequeno: { fontSize: 13, padding: '6px 12px', borderRadius: 'var(--raio-pequeno)' },
  medio: { fontSize: 15, padding: '10px 18px', borderRadius: 'var(--raio-medio)' },
  grande: { fontSize: 18, padding: '13px 24px', borderRadius: 'var(--raio-medio)' },
};

export function Botao({ variante = 'primario', tamanho = 'medio', bloco, desabilitado, carregando, onClick, type = 'button', children, style }) {
  const [hover, setHover] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const [foco, setFoco] = useState(false);
  const inerte = desabilitado || carregando;
  let estado = {};
  if (!inerte) {
    if (ativo) estado = ATIVO[variante];
    else if (hover) estado = HOVER[variante];
    if (foco) estado = { ...estado, ...FOCO[variante] };
  }
  return React.createElement('button', {
    type, disabled: inerte, onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setAtivo(false); },
    onMouseDown: () => setAtivo(true),
    onMouseUp: () => setAtivo(false),
    onFocus: () => setFoco(true),
    onBlur: () => setFoco(false),
    style: {
      display: bloco ? 'flex' : 'inline-flex', width: bloco ? '100%' : undefined,
      alignItems: 'center', justifyContent: 'center', gap: 8,
      fontFamily: 'var(--fonte-ui)', fontWeight: 600,
      border: '1px solid transparent', outline: 'none', whiteSpace: 'nowrap',
      cursor: inerte ? 'not-allowed' : 'pointer', opacity: inerte ? 0.45 : 1,
      transition: 'background 150ms ease, border-color 150ms ease, box-shadow 150ms ease, transform 120ms ease, color 150ms ease',
      ...TAMANHOS[tamanho], ...VARIANTES[variante], ...estado, ...style,
    },
  }, carregando ? React.createElement(Girador, { key: 'g' }) : null, children);
}

function Girador() {
  return React.createElement('span', { style: {
    width: 13, height: 13, borderRadius: 999, flex: 'none',
    border: '2px solid currentColor', borderTopColor: 'transparent',
    animation: 'aa-girar 0.7s linear infinite',
  } });
}
