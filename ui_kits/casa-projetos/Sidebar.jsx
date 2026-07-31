/* global React */

const AA_MONOGRAM = (
  <svg viewBox="0 0 496 496" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <g transform="translate(0,496) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M2309 4956 c-2 -2 -39 -6 -82 -10 -274 -23 -579 -112 -850 -246 -484 -241 -876 -633 -1115 -1115 -133 -266 -194 -470 -247 -820 -14 -94 -14 -433 0 -556 67 -582 321 -1101 736 -1504 385 -374 837 -597 1379 -682 179 -27 540 -25 727 5 745 120 1390 559 1767 1204 152 261 258 560 308 871 30 187 32 548 5 727 -85 542 -308 994 -682 1379 -472 486 -1098 749 -1786 750 -86 0 -158 -1 -160 -3z m454 -252 c403 -49 792 -213 1122 -474 44 -35 133 -117 198 -182 l118 -120 -24 -41 c-107 -185 -752 -1289 -773 -1324 l-14 -23 -395 0 -395 0 0 855 0 856 -122 -3 -122 -3 -860 -1476 c-474 -811 -868 -1486 -877 -1499 -16 -24 -16 -24 -73 73 -273 464 -369 1017 -270 1557 79 433 297 843 619 1165 496 496 1164 725 1868 639z m-403 -1549 l0 -615 -361 0 c-198 0 -359 4 -357 8 7 18 711 1222 715 1222 1 0 3 -277 3 -615z m2050 470 c115 -190 215 -446 264 -675 108 -504 35 -1053 -200 -1500 -395 -750 -1149 -1211 -1983 -1212 -266 0 -482 35 -726 116 -357 119 -706 347 -943 613 l-62 70 53 91 c28 49 210 360 402 691 l350 601 398 0 397 0 0 -855 0 -855 119 0 118 0 641 1098 c352 603 740 1268 862 1477 235 403 248 425 255 425 2 0 27 -38 55 -85z m-1117 -1253 c-278 -485 -689 -1177 -693 -1166 -3 7 -4 283 -2 614 l2 600 360 0 360 0 -27 -48z"/>
    </g>
  </svg>
);

function Sidebar({ section, onSection, projectCount }) {
  const items = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'projetos', label: 'Projetos', count: projectCount },
    { id: 'notas', label: 'Notas' },
  ];
  return (
    <aside style={{
      width: 240, flex: 'none',
      borderRight: '1px solid var(--cor-borda)',
      background: 'var(--cor-fundo)',
      padding: '32px 20px',
      display: 'flex', flexDirection: 'column', gap: 32,
    }}>
      {/* Brand lockup */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 26, height: 26, color: 'var(--cor-texto-forte)' }}>{AA_MONOGRAM}</div>
        <span style={{
          fontFamily: 'var(--fonte-ui)', fontSize: 12, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--cor-texto-suave)',
        }}>Casa &amp; projetos</span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => {
          const active = it.id === section;
          return (
            <button key={it.id}
              onClick={() => onSection(it.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: 'var(--fonte-ui)', fontSize: 15, fontWeight: active ? 600 : 500,
                padding: '8px 12px', borderRadius: 10,
                border: 'none', cursor: 'pointer',
                background: active ? 'var(--cor-superficie-2)' : 'transparent',
                color: active ? 'var(--cor-texto-forte)' : 'var(--cor-texto)',
                textAlign: 'left',
                transition: 'background 0.15s ease',
              }}>
              <span>{it.label}</span>
              {it.count != null && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: 'var(--cor-texto-suave)',
                  fontVariantNumeric: 'tabular-nums',
                }}>{it.count}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Account footer */}
      <div style={{ borderTop: '1px solid var(--cor-borda)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 999,
          background: 'var(--cor-destaque)', color: 'var(--cor-texto-invertido)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--fonte-display)', fontSize: 14, fontWeight: 600,
        }}>A</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--cor-texto)' }}>Ana</span>
          <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)' }}>Casa do Bosque</span>
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar });
