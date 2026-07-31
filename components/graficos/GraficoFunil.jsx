/* global React */
const NF = new Intl.NumberFormat('pt-BR');
const PALETA = ['var(--dados-1)','var(--dados-2)','var(--dados-3)','var(--dados-4)','var(--dados-5)','var(--dados-6)'];

export function GraficoFunil({ etapas = [], mostrarConversao = true, formatar, style }) {
  const fmt = formatar || ((v) => NF.format(v));
  const topo = Math.max(1, ...etapas.map((e) => e.valor));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--fonte-ui)', ...style }}>
      {etapas.map((e, i) => {
        const p = e.valor / topo;
        const anterior = i ? etapas[i - 1].valor : null;
        return (
          <div key={e.rotulo} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--cor-texto)' }}>
              <span>{e.rotulo}</span>
              <span style={{ display: 'flex', gap: 12, color: 'var(--cor-texto-suave)', fontVariantNumeric: 'tabular-nums' }}>
                {mostrarConversao && anterior ? <span style={{ fontSize: 11 }}>{Math.round((e.valor / anterior) * 100)}%</span> : null}
                <strong style={{ color: 'var(--cor-texto-forte)', fontWeight: 600 }}>{fmt(e.valor)}</strong>
              </span>
            </div>
            <div style={{ height: 26, background: 'var(--cor-superficie-2)', borderRadius: 'var(--raio-pequeno)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: (p * 100) + '%', background: e.cor || PALETA[i % 6], borderRadius: 'var(--raio-pequeno)', transition: 'width 240ms ease' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
