---
name: aa-design
description: Use this skill to generate well-branded interfaces and assets for the AA Design System — a calm, neutral, warm-sand personal design system for web & mobile dashboards and tools. Originally written in Brazilian Portuguese (pt-BR). Contains essential design guidelines, colors, type, fonts, assets, and a UI kit for prototyping personal dashboards.
user-invocable: true
---

# AA Design System — Agent Skill

This skill packages a small, opinionated personal design system. The brand language is **calmo, quente, claro** (calm, warm, clear): warm-sand neutrals, a quiet blue for action, rare terracotta accents, two fonts (Fraunces display + Hanken Grotesk UI), a 4px spacing scale, and a tight set of components.

## How to use this skill

1. Read **`README.md`** in this folder — it covers content fundamentals, visual foundations, and iconography.
2. Read **`docs/guia-de-design.md`** for the authoritative Portuguese design guide if you need the "why" behind any decision.
3. Browse the **`preview/`** folder to see individual design-system cards (colors, type, spacing, components, brand).
4. Link **`styles.css`** on any new page — it is the single entry point (tokens + type + `.aa-*` component classes). Fonts are local; nothing is fetched from Google.
5. Use the components in **`components/`** (React, read off `window.AADesignSystem_ada6b1` after loading `_ds_bundle.js`) instead of rebuilding buttons, fields, tables or charts by hand.
6. For any dashboard chart, read **`preview/graficos-catalogo.html`** first — it maps every chart type to the question it answers and to the AA component that draws it.
7. To start a page, copy a folder from **`templates/`**: `login-centrado`, `login-dividido`, `login-codigo`, `painel`, `lista-detalhe`.
   - `lista-detalhe` is the everyday CRUD (filters + list + detail panel) and already ships the four states: pronto, vazio, carregando, erro.
8. For interactive recreations, see **`ui_kits/casa-projetos/`** — the product the system targets is a small personal dashboard for home projects.

## When generating visual artifacts

- Copy `styles.css` (plus `colors_and_type.css`, `componentes.css` and `estilos.css`, which it imports) and `assets/logo-aa.svg` into your output folder; reference them, don't re-invent.
- Default UI copy to **Brazilian Portuguese**, in conversational `você` tone. Keep examples domestic and small-scale (`Reforma da cozinha`, `Resumo do mês`).
- Use ONLY the eight spacing values, six type sizes (48px `--texto-heroi` exists but is for login/marketing heroes only), three radii, three shadows, and named semantic colors. Do not invent new colors.
- In charts: categorical series use `--dados-1…8` in order; one variable light→dark uses `--seq-1…5`; deviation uses `--div-1…5`. Never a feedback color in a series. Bar charts start at zero.
- No emoji. No gradients. No icons unless explicitly added — substitute Lucide (and flag it) if you really need one.
- No glassmorphism **by default**. Blur has exactly one scope: the opt-in `vidro` style, and only on what floats over content. If you have not been asked for `data-estilo="vidro"`, build in `aa` and nothing blurs.
- Background is `--cor-fundo` (warm off-white `#F4EFE6`), never pure white. Cards sit on `--cor-superficie` (`#FAF7F1`).
- **Never write a literal color or a raw ramp (`--areia-*`, `--primaria-*`, `--acento-*`) in a component** — semantic tokens only, hover and pressed states included. A literal passes in light and breaks in dark.
- **Dark mode:** put `data-tema="escuro"` on `<html>` (or `"auto"` to follow the OS). Only semantic tokens change, so nothing else needs touching. The dark base is warm charcoal-brown, never cool grey.
- **Material layer:** put `data-estilo="vidro"` on `<html>` for the glass style (default is `aa`, no attribute needed). It combines with `data-tema` and works per-subtree. Only layer, border, radius and shadow change — never palette, fonts or type scale. What **floats** (bar, modal, drawer, menu, toast, tooltip) goes translucent; what you **read** (card, table, sidebar, charts) stays opaque. Use `--cor-camada` for a floating surface and `--cor-superficie` for a reading surface; the `.aa-vidro` class does it for plain HTML. Do not lower the glass alpha — it is measured against AA in `preview/contraste.html`.
- **Accessibility is verified, not assumed** — see `preview/contraste.html`. Two rules that catch people out: `--cor-destaque` is decorative and never text (use `--cor-destaque-texto`), and form controls use `--cor-borda-controle`, not `--cor-borda`.
- **Writing:** follow `docs/voz.md`. Buttons are verbs the person is performing; errors always carry the next step; no exclamation marks, no emoji, no "com sucesso".

## When working on production code

Copy `tokens/tokens.css` (or `tokens/tokens.json` as the source of truth) into the project, import it before the rest of your CSS, and reference variables (`var(--cor-acao)`, `var(--espaco-4)`) — never hex values inline. The names are intentionally Portuguese; keep them.

## If the user invokes this skill without further guidance

Ask:
1. What are they building? (a screen, a slide, a component, a whole prototype?)
2. Should copy be in Portuguese or English?
3. Are there real assets/copy/data to use, or should you generate domestic placeholders in the AA spirit?

Then act as an expert AA-flavored designer and output an HTML artifact OR production code as needed.

## Files in this skill

- `README.md` — full design language documentation
- `styles.css` — single entry point (imports the two below)
- `colors_and_type.css` — drop-in tokens + local variable fonts
- `componentes.css` — every component as a plain CSS class (`.aa-*`), for projects without React
- `tokens/tokens.css`, `tokens/tokens.json` — same tokens, two forms (JSON is source of truth)
- `docs/guia-de-design.md` — original Portuguese design guide
- `assets/logo-aa.svg` — recolorable monogram
- `components/` — 36 React components: ações, formulário, estrutura, dados, feedback, navegação, gráficos
- `docs/acessibilidade.md` — contrast, focus, touch targets
- `docs/voz.md` — the ten writing rules, pt-BR
- `templates/` — starting pages: três modelos de login + painel completo + lista/detalhe
- `preview/` — design-system reference cards: `graficos-catalogo.html`, `contraste.html`, `tema-escuro.html`, `periodo.html`, `voz.html`
- `ui_kits/casa-projetos/` — interactive dashboard UI kit
