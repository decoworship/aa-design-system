/* global React */
const { useState } = React;

const POS = {
  cima:   { bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)' },
  baixo:  { top: '100%', left: '50%', transform: 'translate(-50%, 8px)' },
  esquerda:{ right: '100%', top: '50%', transform: 'translate(-8px, -50%)' },
  direita:{ left: '100%', top: '50%', transform: 'translate(8px, -50%)' },
};

export function Dica({ texto, posicao = 'cima', children }) {
  const [ver, setVer] = useState(false);
  return React.createElement('span', {
    style: { position: 'relative', display: 'inline-flex' },
    onMouseEnter: () => setVer(true), onMouseLeave: () => setVer(false),
    onFocus: () => setVer(true), onBlur: () => setVer(false),
  }, children, ver ? React.createElement('span', { key: 't', role: 'tooltip', style: {
    position: 'absolute', zIndex: 100, ...POS[posicao],
    background: 'var(--cor-texto-forte)', color: 'var(--cor-superficie)',
    fontFamily: 'var(--fonte-ui)', fontSize: 12, lineHeight: 1.4,
    padding: '6px 10px', borderRadius: 'var(--raio-pequeno)',
    whiteSpace: 'nowrap', boxShadow: 'var(--sombra-media)', pointerEvents: 'none',
  } }, texto) : null);
}
