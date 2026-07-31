/* global React */
const ESCALA_SEQ = ['var(--seq-1)','var(--seq-2)','var(--seq-3)','var(--seq-4)','var(--seq-5)'];

export function MapaDeCalor({ linhas = [], colunas = [], valores = [], tamanhoCelula = 30, formatar, legenda = true, style }) {
  const chatos = valores.flat();
  const max = Math.max(1, ...chatos);
  const cor = (v) => ESCALA_SEQ[Math.min(4, Math.floor((v / max) * 5 - 0.0001) + (v === 0 ? 0 : 0))] || ESCALA_SEQ[0];
  const fmt = formatar || ((v) => String(v));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'var(--fonte-ui)', ...style }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(' + colunas.length + ', ' + tamanhoCelula + 'px)', gap: 3, alignItems: 'center' }}>
        <span />
        {colunas.map((c) => <span key={c} style={{ fontSize: 10, color: 'var(--grafico-rotulo)', textAlign: 'center' }}>{c}</span>)}
        {linhas.map((l, i) => (
          <React.Fragment key={l}>
            <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)', paddingRight: 8, textAlign: 'right', whiteSpace: 'nowrap' }}>{l}</span>
            {colunas.map((c, j) => {
              const v = (valores[i] || [])[j] || 0;
              return <span key={c} title={l + ' · ' + c + ': ' + fmt(v)} style={{
                height: tamanhoCelula, borderRadius: 3, background: v === 0 ? 'var(--cor-superficie-2)' : cor(v),
              }} />;
            })}
          </React.Fragment>
        ))}
      </div>
      {legenda ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--cor-texto-suave)' }}>
          <span>menos</span>
          {ESCALA_SEQ.map((c) => <span key={c} style={{ width: 14, height: 10, borderRadius: 2, background: c }} />)}
          <span>mais</span>
        </div>
      ) : null}
    </div>
  );
}
