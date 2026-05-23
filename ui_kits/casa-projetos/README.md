# UI Kit — Casa & projetos

A pixel-faithful recreation of the dashboard archetype the AA Design System was designed for: a small personal tool for tracking home projects (kitchen renovation, garden, etc.). This is **the only product** the original system targets — built from the example dashboard shown in `preview.html` and the design guide's domestic examples (`Reforma da cozinha`, `Resumo do mês`, `Projetos ativos`).

## What's here

```
ui_kits/casa-projetos/
├── README.md
├── index.html          → interactive clickable mock
├── App.jsx             → root composition
├── Sidebar.jsx         → left rail nav + monogram
├── TopBar.jsx          → page header with month picker + new project button
├── MetricCard.jsx      → headline metric tile
├── BarChart.jsx        → weekly activity chart using --dados-* palette
├── ProjectRow.jsx      → list-row for a project (name, status badge, last update)
├── ProjectDetail.jsx   → overlay panel showing tasks for one project
├── NewProjectModal.jsx → simple create-project form
└── primitives.jsx      → Button, Field, Badge, Alert, Card, Eyebrow
```

## What's interactive

- Click any project in the list → opens detail overlay with tasks
- Tick a task → marked done, the project's "concluído" count goes up
- "Novo projeto" button (top right) → opens a modal with `Field` + `Button`
- Submit → adds the project to the list with status "Rascunho"
- Sidebar nav switches between "Resumo" (default) and "Projetos" (full list)
- Esc closes overlays

## What's intentionally faked

Everything is in-memory React state. There's no backend, no persistence, no real chart data, no auth. The point is to demonstrate the **visual vocabulary** and **interaction patterns** of an AA-flavored app, not to ship one.

## Design source

This is a recreation of the example dashboard shown in the original [`preview.html`](https://github.com/decoworship/aa-design-system/blob/main/preview.html) and follows the guidance in [`docs/guia-de-design.md`](../../docs/guia-de-design.md). Copy is in Portuguese (`pt-BR`), matching the source.
