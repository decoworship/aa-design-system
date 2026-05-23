/* global React, Badge */

function ProjectRow({ project, onClick }) {
  const variantFor = {
    rascunho: 'neutro',
    andamento: 'info',
    pendente: 'atencao',
    atrasado: 'erro',
    concluido: 'sucesso',
  }[project.status] || 'neutro';

  const statusLabel = {
    rascunho: 'Rascunho',
    andamento: 'Em andamento',
    pendente: 'Pendente',
    atrasado: 'Atrasado',
    concluido: 'Concluído',
  }[project.status] || project.status;

  const total = project.tasks.length;
  const done = project.tasks.filter(t => t.done).length;
  const pct = total === 0 ? 0 : (done / total) * 100;

  return (
    <button onClick={onClick} style={{
      all: 'unset', cursor: 'pointer',
      display: 'grid',
      gridTemplateColumns: '1fr auto 180px 100px',
      gap: 24, alignItems: 'center',
      padding: '16px 20px',
      background: 'var(--cor-superficie)',
      border: '1px solid var(--cor-borda)',
      borderRadius: 10,
      transition: 'background 0.15s ease, border-color 0.15s ease',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--cor-fundo)'; e.currentTarget.style.borderColor = 'var(--cor-borda-forte)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--cor-superficie)'; e.currentTarget.style.borderColor = 'var(--cor-borda)'; }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--fonte-ui)', fontSize: 15, fontWeight: 600, color: 'var(--cor-texto-forte)' }}>
          {project.name}
        </span>
        <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)' }}>
          {project.subtitle}
        </span>
      </div>

      <Badge variant={variantFor}>{statusLabel}</Badge>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Tarefas
          </span>
          <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)', fontVariantNumeric: 'tabular-nums' }}>
            {done}/{total}
          </span>
        </div>
        <div style={{ height: 6, background: 'var(--cor-superficie-2)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--cor-acao)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        {project.updated}
      </span>
    </button>
  );
}

Object.assign(window, { ProjectRow });
