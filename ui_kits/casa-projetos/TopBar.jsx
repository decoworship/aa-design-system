/* global React, Button, Eyebrow */

function TopBar({ title, eyebrow, onNew, month, onPrevMonth, onNextMonth }) {
  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'flex-end', gap: 24,
      padding: '40px 48px 24px',
      borderBottom: '1px solid var(--cor-borda)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, flexShrink: 1 }}>
        {eyebrow && <Eyebrow color="var(--cor-destaque-texto)">{eyebrow}</Eyebrow>}
        <h1 style={{
          fontFamily: 'var(--fonte-display)', fontSize: 36, fontWeight: 600,
          lineHeight: 1.1, letterSpacing: '-0.01em',
          color: 'var(--cor-texto-forte)', margin: 0,
        }}>{title}</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, whiteSpace: 'nowrap' }}>
        {/* Month picker — a tiny secondary control */}
        <div style={{
          display: 'flex', alignItems: 'center',
          background: 'var(--cor-superficie)',
          border: '1px solid var(--cor-borda-forte)',
          borderRadius: 10,
          padding: 2,
        }}>
          <ChevronButton onClick={onPrevMonth} dir="left" />
          <span style={{
            fontFamily: 'var(--fonte-ui)', fontSize: 13, fontWeight: 600,
            color: 'var(--cor-texto)',
            padding: '0 12px', minWidth: 130, textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
          }}>{month}</span>
          <ChevronButton onClick={onNextMonth} dir="right" />
        </div>
        <Button variant="primario" onClick={onNew}>Novo projeto</Button>
      </div>
    </header>
  );
}

function ChevronButton({ onClick, dir }) {
  return (
    <button onClick={onClick} style={{
      width: 26, height: 26, border: 'none', background: 'transparent',
      cursor: 'pointer', borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--cor-texto-suave)',
    }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--cor-superficie-2)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'left'
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />
        }
      </svg>
    </button>
  );
}

Object.assign(window, { TopBar });
