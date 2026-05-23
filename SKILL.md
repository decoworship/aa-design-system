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
4. Use **`colors_and_type.css`** (or `tokens/tokens.css`) on any new page — it loads Google Fonts and defines every token described in the guide.
5. For interactive recreations, see **`ui_kits/casa-projetos/`** — the only product the system targets is a small personal dashboard for home projects.

## When generating visual artifacts

- Copy `colors_and_type.css` and `assets/logo-aa.svg` into your output folder; reference them, don't re-invent.
- Default UI copy to **Brazilian Portuguese**, in conversational `você` tone. Keep examples domestic and small-scale (`Reforma da cozinha`, `Resumo do mês`).
- Use ONLY the eight spacing values, six type sizes, three radii, three shadows, and named semantic colors. Do not invent new colors.
- No emoji. No gradients. No glassmorphism. No icons unless explicitly added — substitute Lucide (and flag it) if you really need one.
- Background is `--cor-fundo` (warm off-white `#F4EFE6`), never pure white. Cards sit on `--cor-superficie` (`#FAF7F1`).

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
- `colors_and_type.css` — drop-in tokens + Google Fonts
- `tokens/tokens.css`, `tokens/tokens.json` — same tokens, two forms (JSON is source of truth)
- `docs/guia-de-design.md` — original Portuguese design guide
- `assets/logo-aa.svg` — recolorable monogram
- `preview/` — design-system reference cards
- `ui_kits/casa-projetos/` — interactive dashboard UI kit
