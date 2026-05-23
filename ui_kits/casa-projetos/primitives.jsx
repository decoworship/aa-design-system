/* global React */
const { useState } = React;

// ---------- Eyebrow (.t-rotulo) ----------
function Eyebrow({ children, color, style }) {
  return (
    <div style={{
      fontFamily: 'var(--fonte-ui)', fontSize: 12, fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      color: color || 'var(--cor-texto-suave)', ...style
    }}>{children}</div>
  );
}

// ---------- Button ----------
function Button({ variant = 'primario', children, onClick, type = 'button', disabled, style }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [focus, setFocus] = useState(false);

  const base = {
    fontFamily: 'var(--fonte-ui)', fontSize: 15, fontWeight: 600,
    padding: '10px 18px', borderRadius: 10, border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease, color 0.15s ease',
    opacity: disabled ? 0.45 : 1,
    whiteSpace: 'nowrap',
    outline: 'none',
  };

  // Default (resting) styles per variant
  const variants = {
    primario: {
      background: 'var(--cor-acao)',
      color: 'var(--cor-texto-invertido)',
      boxShadow: '0 1px 2px rgba(34,31,26,0.10)',
    },
    secundario: {
      background: 'var(--cor-superficie)',
      color: 'var(--cor-texto)',
      borderColor: 'var(--cor-borda-forte)',
    },
    texto: { background: 'transparent', color: 'var(--cor-acao)' },
  };

  // State overlays (applied if not disabled)
  let stateStyle = {};
  if (!disabled) {
    if (active) {
      stateStyle = {
        primario: {
          background: 'var(--cor-acao-ativa)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.18), 0 1px 0 rgba(34,31,26,0.04)',
          transform: 'translateY(1px)',
        },
        secundario: {
          background: 'var(--areia-300)',
          borderColor: 'var(--areia-500)',
          boxShadow: 'inset 0 1px 2px rgba(34,31,26,0.10)',
        },
        texto: { background: 'var(--primaria-100)', color: 'var(--cor-acao-ativa)' },
      }[variant];
    } else if (hover) {
      stateStyle = {
        primario: {
          background: 'var(--cor-acao-hover)',
          boxShadow: '0 6px 14px rgba(38,64,90,0.22)',
          transform: 'translateY(-1px)',
        },
        secundario: {
          background: 'var(--cor-superficie-2)',
          borderColor: 'var(--areia-500)',
        },
        texto: { background: 'var(--primaria-50)' },
      }[variant];
    }
    if (focus) {
      stateStyle = {
        ...stateStyle,
        ...({
          primario: {
            boxShadow: '0 0 0 4px var(--primaria-50), 0 0 0 5px var(--cor-acao-ativa), 0 1px 2px rgba(34,31,26,0.10)',
          },
          secundario: {
            borderColor: 'var(--cor-acao)',
            boxShadow: '0 0 0 3px var(--primaria-50)',
          },
          texto: { boxShadow: '0 0 0 3px var(--primaria-50)' },
        }[variant]),
      };
    }
  }

  return (
    <button
      type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{ ...base, ...variants[variant], ...stateStyle, ...style }}>
      {children}
    </button>
  );
}

// ---------- Field ----------
function Field({ label, value, onChange, placeholder, hint, error, type = 'text' }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--fonte-ui)', fontSize: 13, fontWeight: 600, color: 'var(--cor-texto)' }}>{label}</span>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          fontFamily: 'var(--fonte-ui)', fontSize: 15, color: 'var(--cor-texto)',
          padding: '9px 12px',
          border: `1px solid ${error ? 'var(--cor-erro)' : 'var(--cor-borda-forte)'}`,
          borderRadius: 6, background: 'var(--cor-superficie)',
          outline: 'none',
          borderColor: focus ? 'var(--cor-acao)' : (error ? 'var(--cor-erro)' : 'var(--cor-borda-forte)'),
          boxShadow: focus ? '0 0 0 3px var(--primaria-50)' : 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        }}
      />
      {error ? (
        <span style={{ fontSize: 11, color: 'var(--cor-erro)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)' }}>{hint}</span>
      ) : null}
    </label>
  );
}

// ---------- Badge ----------
const BADGE_STYLES = {
  neutro:  { bg: '#E9E1D2', fg: '#5F584A', dot: '#847A63' },
  info:    { bg: '#EAEEF4', fg: '#26405A', dot: '#3D6189' },
  sucesso: { bg: '#E7EDE4', fg: '#3C5639', dot: '#5C7E58' },
  atencao: { bg: '#F5EBD8', fg: '#8a5e1f', dot: '#C2893C' },
  erro:    { bg: '#F3E0DC', fg: '#7C2E25', dot: '#AE4A3C' },
};
function Badge({ variant = 'neutro', dot = true, children }) {
  const s = BADGE_STYLES[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--fonte-ui)', fontSize: 11, fontWeight: 600,
      padding: '4px 12px', borderRadius: 999,
      background: s.bg, color: s.fg,
      whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot }} />}
      {children}
    </span>
  );
}

// ---------- Alert ----------
function Alert({ variant = 'info', children }) {
  const s = BADGE_STYLES[variant === 'sucesso' ? 'sucesso' : variant === 'erro' ? 'erro' : variant === 'atencao' ? 'atencao' : 'info'];
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '12px 16px',
      borderRadius: 10, fontSize: 13, alignItems: 'flex-start',
      background: s.bg, color: s.fg, fontFamily: 'var(--fonte-ui)',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: s.dot, marginTop: 6, flex: 'none' }} />
      <span style={{ lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

// ---------- Card ----------
function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--cor-superficie)',
      border: '1px solid var(--cor-borda)',
      borderRadius: 16,
      padding: 24,
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, { Eyebrow, Button, Field, Badge, Alert, Card });
