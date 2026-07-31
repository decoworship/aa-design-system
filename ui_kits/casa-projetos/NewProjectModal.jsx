/* global React, Button, Field, Eyebrow */
const { useState, useEffect } = React;

function NewProjectModal({ open, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) { setName(''); setSubtitle(''); setNotes(''); setError(''); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Dê um nome para o projeto.'); return; }
    onCreate({ name: name.trim(), subtitle: subtitle.trim() || 'Sem subtítulo', notes: notes.trim() });
  };

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(34,31,26,0.35)',
        zIndex: 70,
      }} />
      <form onSubmit={submit} style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480, zIndex: 80,
        background: 'var(--cor-superficie)',
        border: '1px solid var(--cor-borda)',
        borderRadius: 16,
        boxShadow: '0 12px 28px rgba(34,31,26,0.12)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '24px 28px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Eyebrow color="var(--cor-destaque-texto)">Criar</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--fonte-display)', fontSize: 24, fontWeight: 600,
            color: 'var(--cor-texto-forte)', margin: 0,
          }}>Novo projeto</h2>
          <p style={{ fontSize: 13, color: 'var(--cor-texto-suave)', margin: 0 }}>
            Aparece na lista da página inicial.
          </p>
        </div>

        <div style={{ padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field
            label="Nome do projeto"
            value={name}
            onChange={(v) => { setName(v); if (error) setError(''); }}
            placeholder="Ex.: Reforma da cozinha"
            error={error}
          />
          <Field
            label="Subtítulo"
            value={subtitle}
            onChange={setSubtitle}
            placeholder="Ex.: armários, bancada e elétrica"
            hint="Uma linha curta para lembrar do escopo."
          />
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--fonte-ui)', fontSize: 13, fontWeight: 600, color: 'var(--cor-texto)' }}>
              Notas iniciais
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Comece pelo que já está claro — o resto vem depois."
              style={{
                fontFamily: 'var(--fonte-ui)', fontSize: 15, color: 'var(--cor-texto)',
                padding: '9px 12px', resize: 'vertical',
                border: '1px solid var(--cor-borda-forte)',
                borderRadius: 6, background: 'var(--cor-superficie)',
                outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--cor-acao)'; e.currentTarget.style.boxShadow = 'var(--anel-foco)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cor-borda-forte)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </label>
        </div>

        <div style={{
          padding: '16px 28px 24px',
          display: 'flex', justifyContent: 'flex-end', gap: 8,
        }}>
          <Button variant="texto" onClick={onClose}>Cancelar</Button>
          <Button variant="primario" type="submit">Criar projeto</Button>
        </div>
      </form>
    </>
  );
}

Object.assign(window, { NewProjectModal });
