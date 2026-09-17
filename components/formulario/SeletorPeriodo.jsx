/* global React */
const { useState, useRef, useEffect } = React;

const d0 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const somaDias = (d, n) => { const x = d0(d); x.setDate(x.getDate() + n); return x; };
const fmt = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
const fmtLongo = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');

/* Atalhos resolvem quase todo o uso em dashboard. O calendário é o
   escape, não o caminho principal — por isso ele é o último chip e
   abre em popover, não ocupando espaço permanente. */
export const ATALHOS = [
  { chave: 'hoje',  rotulo: 'Hoje',        dias: 0 },
  { chave: '7d',    rotulo: '7 dias',      dias: 6 },
  { chave: '30d',   rotulo: '30 dias',     dias: 29 },
  { chave: 'mes',   rotulo: 'Este mês',    mes: true },
  { chave: 'ano',   rotulo: 'Este ano',    ano: true },
];

export function periodoDoAtalho(chave, hoje = new Date()) {
  const a = ATALHOS.find((x) => x.chave === chave);
  if (!a) return null;
  const fim = d0(hoje);
  if (a.mes) return { inicio: new Date(fim.getFullYear(), fim.getMonth(), 1), fim };
  if (a.ano) return { inicio: new Date(fim.getFullYear(), 0, 1), fim };
  return { inicio: somaDias(fim, -a.dias), fim };
}

/* O período anterior de mesma duração, colado no início do atual.
   É sempre isso que se quer comparar: "os 30 dias antes destes 30". */
export function periodoAnterior({ inicio, fim }) {
  const dias = Math.round((d0(fim) - d0(inicio)) / 86400000) + 1;
  return { inicio: somaDias(inicio, -dias), fim: somaDias(inicio, -1) };
}

export function SeletorPeriodo({
  valor, aoMudar, comparavel = true, atalhos = ATALHOS, hoje = new Date(), style,
}) {
  const [aberto, setAberto] = useState(false);
  const [rascunho, setRascunho] = useState(null);
  const caixa = useRef(null);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e) => { if (caixa.current && !caixa.current.contains(e.target)) setAberto(false); };
    const esc = (e) => { if (e.key === 'Escape') setAberto(false); };
    document.addEventListener('mousedown', fora);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', fora); document.removeEventListener('keydown', esc); };
  }, [aberto]);

  const atual = valor || { chave: '30d', ...periodoDoAtalho('30d', hoje), comparar: false };
  const custom = atual.chave === 'custom';

  function escolher(patch) {
    const novo = { ...atual, ...patch };
    novo.comparacao = novo.comparar ? periodoAnterior(novo) : null;
    aoMudar && aoMudar(novo);
  }

  const chip = (ativo) => ({
    font: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
    padding: '7px 14px', borderRadius: 'var(--raio-pilula)', transition: 'background 120ms ease',
    border: '1px solid ' + (ativo ? 'var(--cor-acao)' : 'var(--cor-borda)'),
    background: ativo ? 'var(--cor-acao)' : 'var(--cor-superficie)',
    color: ativo ? 'var(--cor-texto-invertido)' : 'var(--cor-texto)',
  });

  return (
    <div style={{ fontFamily: 'var(--fonte-ui)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--espaco-2)', ...style }}>
      {atalhos.map((a) => (
        <button key={a.chave} type="button" aria-pressed={atual.chave === a.chave}
          onClick={() => escolher({ chave: a.chave, ...periodoDoAtalho(a.chave, hoje) })}
          style={chip(atual.chave === a.chave)}>{a.rotulo}</button>
      ))}

      <div ref={caixa} style={{ position: 'relative' }}>
        <button type="button" aria-expanded={aberto} aria-haspopup="dialog"
          onClick={() => { setRascunho(custom ? { inicio: atual.inicio, fim: atual.fim } : { inicio: null, fim: null }); setAberto((v) => !v); }}
          style={chip(custom)}>
          {custom ? fmt(atual.inicio) + ' \u2013 ' + fmt(atual.fim) : 'Escolher datas'}
        </button>

        {aberto ? (
          <div role="dialog" aria-label="Escolher intervalo de datas" style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 'var(--z-suspenso)',
            background: 'var(--cor-camada)', border: '1px solid var(--cor-borda-camada)',
            borderRadius: 'var(--raio-medio)', boxShadow: 'var(--sombra-grande)', padding: 'var(--espaco-4)',
            backdropFilter: 'var(--camada-filtro)', WebkitBackdropFilter: 'var(--camada-filtro)',
          }}>
            <CalendarioSlot modo="intervalo" valor={rascunho} aoSelecionar={setRascunho} max={d0(hoje)} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--espaco-3)', marginTop: 'var(--espaco-3)', paddingTop: 'var(--espaco-3)', borderTop: '1px solid var(--cor-borda)' }}>
              <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)' }}>
                {rascunho?.inicio && rascunho?.fim ? fmtLongo(rascunho.inicio) + ' a ' + fmtLongo(rascunho.fim)
                  : rascunho?.inicio ? 'Agora escolha o fim' : 'Escolha o início'}
              </span>
              <button type="button" disabled={!rascunho?.inicio || !rascunho?.fim}
                onClick={() => { escolher({ chave: 'custom', ...rascunho }); setAberto(false); }}
                style={{
                  font: 'inherit', fontSize: 13, fontWeight: 600, padding: '7px 14px',
                  borderRadius: 'var(--raio-pequeno)', border: '1px solid var(--cor-acao)',
                  background: 'var(--cor-acao)', color: 'var(--cor-texto-invertido)',
                  cursor: rascunho?.inicio && rascunho?.fim ? 'pointer' : 'not-allowed',
                  opacity: rascunho?.inicio && rascunho?.fim ? 1 : 0.45,
                }}>Aplicar</button>
            </div>
          </div>
        ) : null}
      </div>

      {comparavel ? (
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--cor-texto)', marginLeft: 'var(--espaco-2)' }}>
          <input type="checkbox" checked={!!atual.comparar} onChange={(e) => escolher({ comparar: e.target.checked })}
            style={{ width: 16, height: 16, accentColor: 'var(--cor-acao)', cursor: 'pointer' }} />
          Comparar com período anterior
          {atual.comparar ? (
            <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)' }}>
              ({fmt(periodoAnterior(atual).inicio)} {'\u2013'} {fmt(periodoAnterior(atual).fim)})
            </span>
          ) : null}
        </label>
      ) : null}
    </div>
  );
}

/* Só nomes com inicial maiúscula entram no namespace global do bundle,
   então as duas funções auxiliares viajam penduradas no componente:
   SeletorPeriodo.periodoDoAtalho(...) e SeletorPeriodo.periodoAnterior(...). */
SeletorPeriodo.periodoDoAtalho = periodoDoAtalho;
SeletorPeriodo.periodoAnterior = periodoAnterior;
SeletorPeriodo.ATALHOS = ATALHOS;

/* Resolve o Calendario em tempo de render: assim o SeletorPeriodo
   funciona tanto importado como módulo quanto pelo bundle global. */
function CalendarioSlot(props) {
  const ns = typeof window !== 'undefined' ? Object.keys(window).find((k) => k.startsWith('AADesignSystem')) : null;
  const Cal = (ns && window[ns] && window[ns].Calendario) || null;
  if (!Cal) return <div style={{ fontSize: 13, color: 'var(--cor-texto-suave)', width: '100%', maxWidth: 266 }}>Calendario não carregado.</div>;
  return <Cal {...props} />;
}

/* Só nomes com maiúscula chegam ao namespace do bundle. As duas contas saem
   agrupadas: Periodo.doAtalho() e Periodo.anterior(). */
export const Periodo = { doAtalho: periodoDoAtalho, anterior: periodoAnterior, atalhos: ATALHOS };
