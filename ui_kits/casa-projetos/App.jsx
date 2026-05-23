/* global React, Sidebar, TopBar, MetricCard, BarChart, ProjectRow, ProjectDetail, NewProjectModal, Alert, Eyebrow, Button */
const { useState, useMemo } = React;

const INITIAL_PROJECTS = [
  {
    id: 'p1', name: 'Reforma da cozinha',
    subtitle: 'armários, bancada e elétrica',
    status: 'andamento',
    updated: 'há 2 dias',
    notes: 'Trocar a bancada por uma de madeira maciça, refazer a parte elétrica dos tomadas baixas, manter os armários superiores. O orçamento aprovado é o do João.',
    tasks: [
      { id: 't1', label: 'Confirmar medidas com o marceneiro', done: true },
      { id: 't2', label: 'Comprar tomadas e disjuntores', done: true },
      { id: 't3', label: 'Combinar dia da entrega da bancada', done: false },
      { id: 't4', label: 'Pintar a parede atrás da pia', done: false },
      { id: 't5', label: 'Fotografar tudo "antes" para o álbum', done: false },
    ],
  },
  {
    id: 'p2', name: 'Pomar dos fundos',
    subtitle: 'jabuticaba, pitanga e amora',
    status: 'pendente',
    updated: 'há 5 dias',
    notes: 'Pesquisar viveiros de Atibaia que vendem mudas adultas. A jabuticaba é prioridade — quero plantar na próxima chuva.',
    tasks: [
      { id: 't1', label: 'Pedir orçamento de 3 viveiros', done: true },
      { id: 't2', label: 'Marcar visita no Sítio das Mudas', done: false },
      { id: 't3', label: 'Limpar a área dos fundos', done: false },
    ],
  },
  {
    id: 'p3', name: 'Biblioteca da sala',
    subtitle: 'estante de canto · 4 prateleiras',
    status: 'rascunho',
    updated: 'há 11 dias',
    notes: 'Ainda em estudo. Talvez modular com nichos de tamanhos variados. Olhar referências antes de fechar o desenho.',
    tasks: [
      { id: 't1', label: 'Salvar 5 referências no quadro', done: false },
      { id: 't2', label: 'Medir parede de canto', done: false },
    ],
  },
  {
    id: 'p4', name: 'Hortinha de temperos',
    subtitle: 'janela da cozinha · 6 vasos',
    status: 'concluido',
    updated: 'há 1 mês',
    notes: 'Manjericão, alecrim, salsinha, cebolinha, hortelã e tomilho. Todos prosperando — a hortelã já precisa de poda.',
    tasks: [
      { id: 't1', label: 'Comprar vasos e terra', done: true },
      { id: 't2', label: 'Plantar mudas', done: true },
      { id: 't3', label: 'Pendurar o suporte na janela', done: true },
    ],
  },
  {
    id: 'p5', name: 'Reorganizar o escritório',
    subtitle: 'cabos, papéis e a estante',
    status: 'atrasado',
    updated: 'há 3 dias',
    notes: 'Era para ter terminado no mês passado. Maior parte do trabalho é descartar o que não uso há mais de um ano.',
    tasks: [
      { id: 't1', label: 'Triagem das gavetas', done: true },
      { id: 't2', label: 'Organizar cabos com velcro', done: false },
      { id: 't3', label: 'Descartar caixas antigas', done: false },
      { id: 't4', label: 'Reposicionar a impressora', done: false },
    ],
  },
];

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function App() {
  const [section, setSection] = useState('resumo');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [monthIdx, setMonthIdx] = useState(4); // Maio (May), like the design guide's domestic feel
  const [year, setYear] = useState(2026);
  const [savedFlash, setSavedFlash] = useState(false);

  const openProject = projects.find(p => p.id === openProjectId) || null;

  // Metrics derived from project list
  const metrics = useMemo(() => {
    const active = projects.filter(p => ['andamento', 'pendente', 'atrasado'].includes(p.status)).length;
    const done = projects.filter(p => p.status === 'concluido').length;
    const overdue = projects.filter(p => p.status === 'atrasado').length;
    const pending = projects.filter(p => p.status === 'pendente').length + overdue;
    return { active, done, pending, overdue };
  }, [projects]);

  const toggleTask = (projectId, taskId) => {
    setProjects(prev => prev.map(p => p.id !== projectId ? p : {
      ...p,
      tasks: p.tasks.map(t => t.id !== taskId ? t : { ...t, done: !t.done }),
      updated: 'agora',
    }));
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2400);
  };

  const createProject = ({ name, subtitle, notes }) => {
    const id = 'p' + (projects.length + 1) + '-' + Date.now();
    setProjects(prev => [
      { id, name, subtitle, status: 'rascunho', updated: 'agora', notes: notes || 'Sem notas ainda.', tasks: [] },
      ...prev,
    ]);
    setShowNew(false);
  };

  const monthLabel = `${MONTHS[monthIdx]} ${year}`;
  const stepMonth = (dir) => {
    let m = monthIdx + dir, y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonthIdx(m); setYear(y);
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: 'var(--cor-fundo)',
      fontFamily: 'var(--fonte-ui)',
      color: 'var(--cor-texto)',
    }}>
      <Sidebar section={section} onSection={setSection} projectCount={projects.length} />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar
          eyebrow={section === 'resumo' ? 'Painel' : 'Lista'}
          title={section === 'resumo' ? 'Resumo do mês' : section === 'projetos' ? 'Todos os projetos' : 'Notas'}
          onNew={() => setShowNew(true)}
          month={monthLabel}
          onPrevMonth={() => stepMonth(-1)}
          onNextMonth={() => stepMonth(+1)}
        />

        <div style={{ flex: 1, padding: '32px 48px 64px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {savedFlash && (
            <Alert variant="info">Seus dados foram salvos automaticamente.</Alert>
          )}

          {section === 'resumo' && (
            <ResumoView
              projects={projects}
              metrics={metrics}
              onOpenProject={setOpenProjectId}
              onSeeAll={() => setSection('projetos')}
            />
          )}

          {section === 'projetos' && (
            <ProjetosView projects={projects} onOpenProject={setOpenProjectId} />
          )}

          {section === 'notas' && <NotasView />}
        </div>
      </main>

      <ProjectDetail project={openProject} onClose={() => setOpenProjectId(null)} onToggleTask={toggleTask} />
      <NewProjectModal open={showNew} onClose={() => setShowNew(false)} onCreate={createProject} />
    </div>
  );
}

function ResumoView({ projects, metrics, onOpenProject, onSeeAll }) {
  const active = projects.filter(p => ['andamento', 'pendente', 'atrasado'].includes(p.status)).slice(0, 4);
  return (
    <>
      {/* Metrics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <MetricCard label="Projetos ativos" value={metrics.active} delta="+2 no mês" deltaTone="up" />
        <MetricCard label="Concluídos" value={metrics.done} delta="+1 no mês" deltaTone="up" />
        <MetricCard label="Pendências" value={metrics.pending} delta={metrics.overdue ? `${metrics.overdue} atrasada${metrics.overdue > 1 ? 's' : ''}` : 'em dia'} deltaTone={metrics.overdue ? 'warn' : 'flat'} />
      </section>

      {/* Chart */}
      <section>
        <BarChart
          title="Atividade por semana"
          data={[
            { label: 'sem 1', value: 11, color: 'var(--dados-1)' },
            { label: 'sem 2', value: 16, color: 'var(--dados-2)' },
            { label: 'sem 3', value: 8,  color: 'var(--dados-3)' },
            { label: 'sem 4', value: 19, color: 'var(--dados-4)' },
            { label: 'sem 5', value: 13, color: 'var(--dados-5)' },
          ]}
        />
      </section>

      {/* Active list */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <Eyebrow>Em movimento</Eyebrow>
            <h2 style={{
              fontFamily: 'var(--fonte-ui)', fontSize: 18, fontWeight: 600,
              color: 'var(--cor-texto-forte)', margin: 0, whiteSpace: 'nowrap',
            }}>Projetos ativos</h2>
          </div>
          <Button variant="texto" onClick={onSeeAll}>Ver todos</Button>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {active.map(p => (
            <ProjectRow key={p.id} project={p} onClick={() => onOpenProject(p.id)} />
          ))}
        </div>
      </section>
    </>
  );
}

function ProjetosView({ projects, onOpenProject }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {projects.map(p => (
        <ProjectRow key={p.id} project={p} onClick={() => onOpenProject(p.id)} />
      ))}
    </section>
  );
}

function NotasView() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '60ch' }}>
      <Eyebrow>Em branco</Eyebrow>
      <h2 style={{
        fontFamily: 'var(--fonte-display)', fontSize: 28, fontWeight: 600,
        color: 'var(--cor-texto-forte)', margin: 0,
      }}>Ainda não há notas soltas.</h2>
      <p style={{ color: 'var(--cor-texto-suave)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>
        Notas avulsas vão aparecer aqui — para anotar uma ideia sem ter que criar um projeto inteiro. Ainda não construído, e tudo bem: a gente adiciona quando um projeto real precisar.
      </p>
    </section>
  );
}

window.App = App;
