# AA Design System

> A calm, neutral, warm-sand design system for personal **web & mobile dashboards and tools.** Built around two fonts (Fraunces + Hanken Grotesk), a single sand neutral scale, one quiet blue, and a rare terracotta accent. Originally written in **Brazilian Portuguese** (`pt-BR`) — token names, copy, and component labels follow Portuguese conventions.

**Version:** 0.1.0 — base inicial

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
├── colors_and_type.css        → tokens as CSS vars + semantic .t-* classes
├── tokens/
│   ├── tokens.css             → tokens as CSS vars (mirrors colors_and_type)
│   └── tokens.json            → source-of-truth tokens (edit this first)
├── docs/
│   └── guia-de-design.md      → original Portuguese design guide
├── assets/
│   └── logo-aa.svg            → AA monogram (recolorable via currentColor)
├── preview/                   → individual design-system cards (one concept each)
└── ui_kits/
    └── casa-projetos/         → "Home & Projects" personal dashboard kit
        ├── index.html
        ├── README.md
        └── *.jsx              → reusable components
```

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

### Typography
- **Two fonts, both local.** Fraunces (variable serif, full SOFT/WONK/opsz/wght axes — italic + roman) for display ONLY, loaded from `fonts/Fraunces-VariableFont.ttf` and `fonts/Fraunces-Italic-VariableFont.ttf`. Hanken Grotesk (variable sans, weight axis 100–900, italic + roman) for everything else: headings ≤24px, body, UI — loaded from `fonts/HankenGrotesk-VariableFont_wght.ttf` and `fonts/HankenGrotesk-Italic-VariableFont_wght.ttf`. Nothing comes from Google Fonts; the system runs fully offline.
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

The base v0.1.0 includes ONLY:

- **Button** — three variants: `btn-primario` (blue, one per screen), `btn-secundario` (sand outline), `btn-texto` (link-style). Plus disabled.
- **Campo de texto** (text field) — label above, hint below, 3px blue focus ring on `--primaria-50`.
- **Badge** — pill-shaped status chip in 4 variants: neutro / sucesso / atencao / erro.
- **Alerta** — feedback row with a dot + message in 3 variants: info / sucesso / erro.

Anything else (tables, modals, navigation, tabs, charts beyond bars, date pickers) **does not exist** in the system. The original guide explicitly says: don't create components "just in case"; let real projects pull new components into existence as they need them.

When extending the system in a project, mimic the existing components' construction: build from tokens (no hex codes inline), include hover/focus/disabled states, name in Portuguese (`cartao`, `aba`, `menu-suspenso`).

---

## A note on language

Token names, comments, and the design guide are all in **Brazilian Portuguese**. When generating code or copy for AA projects, **keep the Portuguese names** — don't rename `--cor-acao` to `--color-action`. This matters: it's part of the system's identity and what makes it not just "another tan-colored Tailwind config."

UI copy for AA projects should also default to Portuguese unless explicitly told otherwise.
