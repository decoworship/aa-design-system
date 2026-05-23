/* global React, Badge, Button, Eyebrow */
const { useEffect } = React;

function ProjectDetail({ project, onClose, onToggleTask }) {
  // Esc to close
  useEffect(() => {
    if (!project) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, onClose]);

  if (!project) return null;

  const variantFor = {
    rascunho: 'neutro', andamento: 'info', pendente: 'atencao',
    atrasado: 'erro', concluido: 'sucesso',
  }[project.status] || 'neutro';
  const statusLabel = {
    rascunho: 'Rascunho', andamento: 'Em andamento', pendente: 'Pendente',
    atrasado: 'Atrasado', concluido: 'Concluído',
  }[project.status] || project.status;

  return (
    <>
      {/* Scrim */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(34,31,26,0.25)',
        zIndex: 50,
      }} />

      {/* Slide-over panel */}
      <aside style={{
        position: 'fixed', right: 0, top: 0, bottom: 0,
        width: 480,
        background: 'var(--cor-superficie)',
        borderLeft: '1px solid var(--cor-borda)',
        boxShadow: '0 12px 28px rgba(34,31,26,0.12)',
        zIndex: 60,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--cor-borda)',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <Eyebrow color="var(--acento-500)">Projeto</Eyebrow>
            <button onClick={onClose} style={{
              all: 'unset', cursor: 'pointer',
              width: 28, height: 28, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--cor-texto-suave)',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--cor-superficie-2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <h2 style={{
            fontFamily: 'var(--fonte-display)', fontSize: 28, fontWeight: 600,
            color: 'var(--cor-texto-forte)', margin: 0, lineHeight: 1.15,
          }}>{project.name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
            <Badge variant={variantFor}>{statusLabel}</Badge>
            <span style={{ fontSize: 12, color: 'var(--cor-texto-suave)' }}>
              Atualizado {project.updated}
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <section>
            <Eyebrow style={{ marginBottom: 8 }}>Notas</Eyebrow>
            <p style={{
              fontFamily: 'var(--fonte-ui)', fontSize: 15, lineHeight: 1.55,
              color: 'var(--cor-texto)', margin: 0, maxWidth: '60ch',
            }}>{project.notes}</p>
          </section>

          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <Eyebrow>Tarefas</Eyebrow>
              <span style={{ fontSize: 11, color: 'var(--cor-texto-suave)', fontVariantNumeric: 'tabular-nums' }}>
                {project.tasks.filter(t => t.done).length} de {project.tasks.length} concluídas
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {project.tasks.map((task) => (
                <TaskRow key={task.id} task={task} onToggle={() => onToggleTask(project.id, task.id)} />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 32px', borderTop: '1px solid var(--cor-borda)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="texto" onClick={onClose}>Fechar</Button>
          <Button variant="secundario">Editar projeto</Button>
        </div>
      </aside>
    </>
  );
}

function TaskRow({ task, onToggle }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 12px', borderRadius: 8,
      cursor: 'pointer',
      transition: 'background 0.15s ease',
    }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--cor-fundo)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
      <span style={{
        width: 18, height: 18, flex: 'none', borderRadius: 6,
        border: `1.5px solid ${task.done ? 'var(--cor-acao)' : 'var(--cor-borda-forte)'}`,
        background: task.done ? 'var(--cor-acao)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--areia-50)',
        transition: 'all 0.15s ease',
      }}>
        {task.done && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={task.done} onChange={onToggle} style={{ display: 'none' }} />
      <span style={{
        fontFamily: 'var(--fonte-ui)', fontSize: 15,
        color: task.done ? 'var(--cor-texto-suave)' : 'var(--cor-texto)',
        textDecoration: task.done ? 'line-through' : 'none',
        flex: 1,
      }}>{task.label}</span>
    </label>
  );
}

Object.assign(window, { ProjectDetail });
