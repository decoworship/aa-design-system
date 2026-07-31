# AA Design System

> A calm, neutral, warm-sand design system for personal **web & mobile dashboards and tools.** Built around two fonts (Fraunces + Hanken Grotesk), a single sand neutral scale, one quiet blue, and a rare terracotta accent. Originally written in **Brazilian Portuguese** (`pt-BR`) — token names, copy, and component labels follow Portuguese conventions.

**Version:** 0.4.0 — gaveta, fila de avisos, multi-seleção, guia mobile

---

## Source

This design system is a re-packaging of:

- **GitHub:** [decoworship/aa-design-system](https://github.com/decoworship/aa-design-system)
- **Design guide (Portuguese, authoritative):** [`docs/guia-de-design.md`](docs/guia-de-design.md) — the original author's complete design rationale and decisions. Read this if you want the full "why" behind every choice.

The reader is encouraged to browse the source repository to better ground any design work in the AA brand.

---

## What this is (and isn't)

It's an **intentionally small** personal design system: enough decisions captured to make every project feel like the same family, but nowhere near a full component library. Built for:

- Personal dashboards and tools
- Web AND mobile (the same tokens scale to both)
- Python/Streamlit/Dash apps used as themes (read tokens from `tokens.json`)

It is **not** Material, Apple HIG, or any corporate system. Three words guide every decision: **calmo, quente, claro** (calm, warm, clear). When in doubt between two options, pick the more sober one.

---

## Index

```
├── README.md                  → this file
├── SKILL.md                   → portable skill manifest (Agent Skills compatible)
├── styles.css                 → SINGLE ENTRY POINT — link only this
├── colors_and_type.css        → tokens as CSS vars + semantic .t-* classes
├── componentes.css            → the same components as plain CSS classes (.aa-*)
├── thumbnail.html             → brand tile
├── tokens/
│   ├── tokens.css             → tokens as CSS vars (mirrors colors_and_type)
│   └── tokens.json            → source-of-truth tokens (edit this first)
├── docs/
│   ├── guia-de-design.md      → original Portuguese design guide
│   ├── acessibilidade.md      → contraste, foco, alvo de toque
│   └── voz.md                 → voice & writing rules (10 rules, pt-BR)
├── assets/
│   └── logo-aa.svg            → AA monogram (recolorable via currentColor)
├── components/                → 36 React components, grouped by role
│   ├── acoes/ formulario/ estrutura/
│   └── dados/ feedback/ navegacao/ graficos/
├── templates/                 → ready-to-copy starting pages
│   ├── login-centrado/ login-dividido/ login-codigo/
│   ├── painel/                → dashboard shell
│   └── lista-detalhe/         → list + detail CRUD, with all four states
├── preview/                   → design-system reference cards
│   ├── graficos-catalogo.html → the full chart-type map
│   ├── contraste.html         → WCAG audit, both themes, 58 pairs
│   ├── tema-escuro.html       → dark mode, side by side with light
│   ├── periodo.html           → period selector + calendar
│   └── voz.html               → the writing rules as cards
└── ui_kits/
    └── casa-projetos/         → "Home & Projects" personal dashboard kit
```

---

## Voice & writing

Full rules in [`docs/voz.md`](docs/voz.md) with a card version at `preview/voz.html`. The short form: **a competent person talking to another — informal, direct, pt-BR, selling nothing.** Buttons are verbs the person is performing ("Entrar", not "Efetuar login"). Errors always carry the next step. Empty states are invitations, not statements. No exclamation marks, no emoji, no "com sucesso". Fixed vocabulary — pick a word and never swap it, because a synonym in a UI reads as a different feature.

---

## Content fundamentals

The original system is written in **Brazilian Portuguese**. The tone is **calm, second-person-informal (você), and quietly opinionated.** It reads like a thoughtful note from a designer to themselves — long-form, full sentences, occasional first-person asides.

**Tone:**
- Conversational and warm, never marketing-speak. "Use sempre os tokens" not "Maximize design consistency."
- Quietly opinionated: the guide tells you what to do AND what NOT to do (e.g. "Resista a criar componente 'por garantia'" — Resist creating a component "just in case").
- Three guiding words: **calmo, quente, claro** ("calm, warm, clear").

**Voice & person:**
- Direct address using **você** (informal "you"). Sometimes drops to first-person plural for shared intent.
- Imperative mood for guidance: "Use", "Abra", "Resista", "Não invente tamanhos fora desta lista."
- Honest about scope: "Crece só quando você sentir falta de algo — nunca antes."

**Casing:**
- Sentence case for headings and labels — never Title Case, never ALL CAPS except for `.t-rotulo` (12px micro-labels) and badge states ("RASCUNHO", "CONCLUÍDO").
- Token names are lowercase-hyphenated and Portuguese: `cor-acao`, `espaco-4`, `raio-pequeno`, `areia-500`, `texto-suave`.

**Casing on actual UI copy:**
- Buttons: Sentence case (`Salvar projeto`, `Últimos 30 dias`).
- Section labels (eyebrow, .t-rotulo): UPPERCASE with `letter-spacing: 0.06em` (`FUNDAMENTOS`, `COMPONENTES`).
- Status badges: lowercase or Sentence-case depending on context (`Rascunho`, `Concluído`).

**Pronouns / examples:**
- The original guide says "para mostrar para sua esposa" ("to show your wife") — this is a personal system written by one person for one home. Examples in copy are domestic: `"Reforma da cozinha"` (kitchen renovation), `"Casa & projetos"` (Home & projects), `"Resumo do mês"` (Monthly summary).
- When adapting copy: keep it personal, domestic, small-scale. Not "Q4 OKRs" — "Reforma da cozinha".

**Emoji:** **None.** The system uses no emoji anywhere. Icons are minimal and the brand mark itself is a tiny letterform — emoji would clash with the calm, restrained tone.

**Example copy (lift verbatim or translate the cadence):**
- Hero: *"Esta página mostra o sistema funcionando."* — flat, descriptive, no exclamation.
- Help text: *"Aparece na lista da página inicial."* — fragment, casual, useful.
- Alert: *"Seus dados foram salvos automaticamente."* — neutral statement, no celebration.
- Empty rationale: *"Você adiciona quando um projeto real precisar — e aí o componente nasce já testado por uso."* — explains the *why* behind absence.

---

## Visual foundations

The system has a **distinct, recognizable look**. Follow these closely; they're the difference between "an AA design" and "a generic warm dashboard".

### The overall feel
**Warm sand + quiet blue + rare terracotta, on a soft warm background.** Think mid-century paper and pottery, vintage instrument finishes, a calm desk. Not minimal-cold, not corporate-blue, not playful-bright. The closest cousins are independent-publisher web design and the calmer end of "personal CMS" aesthetics.

### Colors
- **Background is never pure white.** Page background is `--areia-100` (`#F4EFE6`) — a warm off-white. Cards sit on `--areia-50` (`#FAF7F1`), slightly lighter. This warm-on-warm layering is the whole vibe.
- **The single neutral scale is warm sand** (`areia-50` → `areia-900`). No cool greys exist in the system; do not introduce them.
- **Blue (`--primaria-500` = `#3D6189`) is the only "action" color.** Use for primary buttons, links, focus rings, the info state. It's a desaturated, slightly grey-leaning blue — not vibrant.
- **Terracotta (`--acento-500` = `#C57B57`) is the destaque (highlight).** Use sparingly: eyebrow labels, a single bar in a chart, a divider accent. If you find yourself using it more than once or twice per screen, you're overusing it.
- **Feedback colors are intentionally muted** (sage green, amber, terra red). They should not "shout".
- **The data palette is separate** from feedback and UI colors. Never use feedback colors in charts; never use chart colors in buttons.

### Dark mode
- **Turn it on with `data-tema="escuro"`** on `<html>` (or on any wrapper — it works per-subtree). `data-tema="auto"` follows the OS.
- **Only the semantic tokens are redefined.** The raw ramps (`--areia-*`, `--primaria-*`, `--acento-*`) are untouched.
- **No component may write a literal color or a raw ramp** — semantic tokens only. This is the rule dark mode enforces: a literal passes in light and fails in dark, because the background flips and the text doesn't. Interaction states are tokens for exactly this reason (`--cor-acao-suave`, `--cor-acao-suave-2`, `--cor-destaque-bg`, `--cor-linha-hover`, `--cor-borda-controle-hover`, `--cor-link-sublinhado`). Auditing tokens is not enough — grep `components/` for `#` and for the raw ramps before shipping.
- **The dark base is warm charcoal-brown (`#1A1714`), never cool grey.** The system is sand; sand in the dark stays warm.
- **In dark, separation is tone and border — not shadow.** Surfaces step up in tone as they step up in layer. Shadows are still declared but do very little.
- **Chart series keep the same order and the same hue,** just lighter. Order is hierarchy; reshuffling it in dark would break the reading for anyone who already knows the chart.
- Both themes are audited: see `preview/tema-escuro.html` and `preview/contraste.html`.

### Accessibility
- **Target is WCAG 2.1 AA, and it's verified, not assumed.** All 58 text/background pairs across both themes are measured in `preview/contraste.html`. Re-run the audit whenever a semantic color changes — contrast is a silent regression.
- **`--cor-destaque` is decorative and never text** (fill, rule, icon). For emphasis in writing use `--cor-destaque-texto`.
- **Control borders differ from decorative ones.** Fields, checkboxes and radios use `--cor-borda-controle` (needs 3:1); separators use `--cor-borda` (exempt).
- **Color is never the only signal.** Errors, successes and chart series always carry text or a label too.
- **Focus is always visible** (`--anel-foco`), on `:focus-visible`, never removed. Touch targets never below 44px. Full rules in `docs/acessibilidade.md`.

### Typography
- **Two fonts, both local.** Fraunces (variable serif, full SOFT/WONK/opsz/wght axes — italic + roman) for display ONLY, loaded from `fonts/Fraunces/Fraunces-VariableFont.ttf` and `fonts/Fraunces/Fraunces-Italic-VariableFont.ttf`. Hanken Grotesk (variable sans, weight axis 100–900, italic + roman) for everything else: headings ≤24px, body, UI — loaded from `fonts/Hanken_Grotesk/HankenGrotesk-VariableFont_wght.ttf` and `fonts/Hanken_Grotesk/HankenGrotesk-Italic-VariableFont_wght.ttf`. Nothing comes from Google Fonts; the system runs fully offline.
- **Fraunces is the voice** — it appears only on the largest titles (36px Display, occasionally the metric numerals on a dashboard). Used too small, it loses its warmth.
- **Hanken Grotesk is the workhorse.** Body is 15px (not 14, not 16). Tight, deliberate scale: 12 / 13 / 15 / 18 / 24 / 36. No values outside this scale.
- **Micro-labels (`--texto-rotulo`, 12px)** are 600 weight, UPPERCASE, `letter-spacing: 0.06em`. They're the eyebrow that gives sections their structure.

### Spacing
- **4px base, only these eight values:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Need "about 20px"? Round to 16 or 24. The discipline is the point.
- **Generous outer padding, modest inner.** Page container has `--espaco-8` (64px) top/bottom; card internal padding is `--espaco-5` (24px).
- Section spacing also `--espaco-8` (64px between sections) — the system breathes.

### Borders & radii
- **Borders are always `--cor-borda` (`--areia-300`)** — a soft sand line, never #ccc grey.
- **Radii are gentle, not aggressive.** Form fields 6px, buttons & small chips 10px, cards & panels 16px, badges & circular chips 999px (pill). Cards do NOT have 24px+ radii — that reads too playful.

### Shadows
- **Three levels (pequena / média / grande), all warm-tinted.** Shadows use `rgba(34,31,26, …)` (the `areia-900` value), not pure black. They feel like paper, not glass.
- **Shadows separate, never decorate.** Cards typically have *no* shadow on the page (they're separated by border + warm background contrast). Reserve shadow for popovers, modals, dropdowns.

### Hover & press states
- **Buttons:** primary on hover darkens to `--cor-acao-hover` (`--primaria-600`). On press, even darker (`--cor-acao-ativa` = `--primaria-700`). Secondary on hover gets `--cor-superficie-2` background. Text buttons on hover get `--primaria-50` background.
- **Transitions:** `0.15s ease` on background and border-color. No spring physics, no bounces.
- **Focus ring:** 3px `--primaria-50` outer ring + `--cor-acao` border. Never remove a focus ring without replacing it.
- **Disabled:** 0.45 opacity, `cursor: not-allowed`.

### Animation
- **Minimal.** Transitions are 150ms `ease`. No keyframe choreography, no entrance animations on page load.
- If you absolutely must animate, fade only — no bounce, no rubber-band, no parallax.

### Backgrounds
- **Flat warm colors. No gradients. No images. No patterns. No grain.** The system uses solid sand-tone backgrounds and that's it.
- **No glassmorphism, no blur** (the original doesn't use `backdrop-filter` at all). If a popover needs separation, use the medium shadow.
- The only "decoration" available is the AA monogram, used small and in `currentColor`.

### Layout rules
- **Max content width 980px** for documents and dashboards. Wider feels too web-app.
- **Single-column on mobile, breaks at 620px.** The original drops dashboard grids to one column and stacks type specimens at 620px.
- **Generous gutters; narrow line length.** Reading paragraphs cap at `60ch`–`64ch`. Don't go wider.

### Iconography & decoration
- See [Iconography](#iconography) below — short version: very few icons, line/stroke style if any, monogram is the only "decorative" mark.

---

## Iconography

The AA system is **almost iconless on purpose.** The original project ships ONE asset:

- **`assets/logo-aa.svg`** — the AA monogram. It's a filled glyph in a circle, ~26px in the UI, color = `currentColor` (so it recolors with text color). It appears once: top-left of the page header, in `--cor-texto-forte` next to the system name in 12px UPPERCASE.

**What the original codebase ships:**
- ❌ No icon font.
- ❌ No icon sprite or component library.
- ❌ No emoji (anywhere — including docs).
- ❌ No unicode-as-icon (no →, ★, etc.).
- ✅ One SVG monogram.
- ✅ Inline geometric SVG for charts (bare `<div>` bars in the example dashboard).

**When you need an icon and the system doesn't provide one:**
1. **First preference:** ask the user / project owner for the specific icon they want, drawn in the same restrained, line/filled style as the monogram.
2. **Acceptable fallback:** [Lucide Icons](https://lucide.dev) (`https://unpkg.com/lucide@latest`). Lucide's thin 2px stroke, square caps, and minimal style matches the AA tone better than Heroicons or Font Awesome. **Flag this substitution** when used: "Using Lucide as icon-set substitute; original AA system ships no icon library."
3. **Avoid:** Heroicons (too modern-rounded), Material Icons (too Google), emoji (clashes), gradient icons (clashes), filled colorful icons (clashes).

**Sizing & color rules:**
- Icons inline with text: match the text's `currentColor`. Use 1em sizing so they scale with font.
- Icons in buttons: same height as button text, optical-center vertically.
- Never colorize icons except in feedback contexts (success/warning/error), where they pick up the matching feedback color.
- Stroke width: 2px when zoomed to 24px (Lucide default). Don't bump to 3px or down to 1.5px — keep it consistent.

---

## Components

Link **`styles.css`** (it imports everything) and read components off the compiled bundle:

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script>const { Botao, Campo, Metrica } = window.AADesignSystem_ada6b1;</script>
```

No React? `componentes.css` ships the same pieces as plain classes (`.aa-btn`, `.aa-campo`, `.aa-tabela`, `.aa-etiqueta`…).

**Ações** — `Botao` (primário / secundário / texto / perigo · 3 tamanhos · carregando · desabilitado), `Etiqueta` (badge, 6 tons), `Avatar`, `Dica` (tooltip).

**Formulário** — `Campo` (com prefixo/sufixo, dica, erro, obrigatório), `Selecao`, `AreaTexto`, `Escolha` (caixa e rádio), `Interruptor`, `MultiSelecao` (fichas + caixas de marcar, busca automática acima de 8 opções, limite de escolhas), `Busca`, `SeletorPeriodo` (atalhos + intervalo custom + comparação com período anterior), `Calendario` (dia ou intervalo, pt-BR).

**Estrutura** — `Cartao`, `Abas`, `Divisor`, `Migalhas`, `Gaveta` (painel lateral ou de baixo, com rodapé de ações fixo — a variante mobile do modal).

**Dados** — `Metrica` (KPI com faísca embutida), `Tabela` (ordenável, coluna numérica, render por célula, **estados de carregando e erro embutidos**, linha ativa para lista+detalhe), `Progresso` (barra e anel), `Paginacao`, `Vazio`, `Esqueleto`.

**Feedback** — `Alerta`, `Modal`, `MenuSuspenso`, `Aviso` (toast solto), `PilhaAvisos` (fila de toasts com limite, dispensa automática e ação de desfazer; o hook é `Avisos.usar()`).

**Navegação** — `BarraLateral` (grupos, contagens), `BarraSuperior`.

**Gráficos** — `GraficoBarras` (vertical / horizontal / agrupado / empilhado), `GraficoLinhas` (linha / área / multi-série / linha de meta), `GraficoRosca` (rosca e pizza), `GraficoDispersao` (pontos e bolhas), `GraficoFunil`, `GraficoMedidor`, `MapaDeCalor`, `Minigrafico` (sparkline).

Every prop name is Portuguese (`rotulo`, `valor`, `aoMudar`, `variante`, `desabilitado`) — keep it that way when you extend the system. Each component has a `.d.ts` next to it with the full prop list.

**What still doesn't exist**, on purpose: árvore, editor de texto rico, arraste-e-solte, tabela com colunas fixas, combobox com busca. The original rule holds — a component is born when a real project needs it, not before.

---

## Gráficos

The chart set is the biggest addition of the 0.2 line, because dashboards are what this system is for. **Read [`preview/graficos-catalogo.html`](preview/graficos-catalogo.html)** — it maps every chart type worth using here, grouped by the question it answers (comparação · tempo · parte do todo · relação · progresso), with what to use it for, what to avoid, and the AA component that implements it. Types outside the built set (cascata, treemap, histograma, bullet, pirulito, pequenos múltiplos) carry a one-line recipe using existing tokens instead of a component.

Chart colors live in their own token families and never mix with UI or feedback colors:

- `--dados-1…8` — categorical, **used in order**; the order is the hierarchy.
- `--seq-1…5` — sequential, light→dark, for one variable (heatmap, density).
- `--div-1…5` — diverging, terracotta ↔ blue, for deviation around zero.
- `--grafico-grade / -eixo / -rotulo / -area / -realce / -referencia` — chart chrome.

Hard rules: bar charts start at zero, always. Max 5 grid lines. No shadow, no gradient, no 3D. Terracotta (`--grafico-realce`) highlights exactly one thing per chart, or nothing.

---

## Templates

Four starting pages under `templates/`. Copy the folder, point `ds-base.js` at the design system, edit the markup.

- **`login-centrado/`** — the default entry: card on sand background, e-mail + senha, optional e-mail-link sign-in.
- **`login-dividido/`** — split screen, brand panel in `--primaria-500` on the left, form on the right. For when the product has a sentence to say.
- **`login-codigo/`** — passwordless: e-mail, then a six-digit code. Two steps, no card.
- **`painel/`** — the full dashboard shell: sidebar, header, four KPIs, charts, sortable table.
- **`lista-detalhe/`** — the everyday CRUD: filter sidebar, sortable list, detail panel on the right. Ships with all four states (pronto / vazio / carregando / erro) switchable as a tweak.

## Language conventions

This repository is intentionally **bilingual**, with a split between developer-facing process artifacts and brand-facing content.

**English** — developer-facing:
- This `README.md` and `SKILL.md`.
- Code comments in `.jsx`/`.d.ts` files.
- Commit messages, PR descriptions, issue bodies.

**Brazilian Portuguese (`pt-BR`)** — anything that carries the brand voice:
- Token names: `--cor-acao`, `--espaco-4`, `--areia-500`, `--fonte-display`. These are intentional and **must not be renamed** to English equivalents — they are part of the system's identity and what makes it not just "another tan-colored Tailwind config."
- Sample UI copy in `preview/`, `templates/` and `ui_kits/`: `Casa & projetos`, `Reforma da cozinha`, `Resumo do mês`, etc. Examples stay domestic and small-scale.
- [`docs/guia-de-design.md`](docs/guia-de-design.md), [`docs/voz.md`](docs/voz.md), [`docs/acessibilidade.md`](docs/acessibilidade.md) and [`docs/mobile.md`](docs/mobile.md) — the authoritative guides, written in the AA brand voice (calm, second-person-informal `você`).
- `CHANGELOG.md` — pt-BR from `0.2.0` on, since the release notes read as design rationale rather than as a build log. The `0.1.1` entry was translated to match.

When generating UI copy for AA projects, default to Portuguese unless explicitly told otherwise — the system was written for personal Brazilian Portuguese projects and the voice is part of the brand.
