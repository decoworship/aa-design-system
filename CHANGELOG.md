# Changelog

All notable changes to the AA Design System.
Versioning: `MAJOR.MINOR.PATCH` — patches bump the last number, additions bump the middle.

## [0.1.1] — Font path fix and bilingual localization

### Fixed
- `@font-face` paths in `colors_and_type.css` now point to `fonts/Fraunces/` and `fonts/Hanken_Grotesk/` after the font directory was reorganized into subfolders.
- Fraunces variable `.ttf` files renamed to drop the `_SOFT,WONK,opsz,wght` suffix (commas in filenames broke URL resolution).
- `SKILL.md` no longer claims `colors_and_type.css` loads Google Fonts — it loads the local variable fonts shipped under `fonts/`.
- `docs/guia-de-design.md` typography section no longer claims the fonts come from Google Fonts; they're distributed locally with the project.

### Added
- "Language conventions" section in `README.md` documenting the bilingual split: English for process artifacts (READMEs, CHANGELOG, code comments, commits, PRs, issues) and Brazilian Portuguese for brand-facing content (token names, sample UI copy, the authoritative design guide).
- Short English orientation paragraph at the top of `docs/guia-de-design.md` so non-Portuguese readers know where to land first.

### Changed
- `CHANGELOG.md` rewritten in English (header, versioning note, [0.1.0] entries). Pre-existing version anchors and dates preserved.
- Version display bumped to `0.1.1` in `README.md`, `tokens/tokens.json`, `tokens/tokens.css` and the `preview.html` header/footer.

## [0.1.0] — Initial baseline

### Added
- Fundamentals: color palette (neutrals, primary, accent, feedback, data), typography (Fraunces + Hanken Grotesk), spacing scale (4px base), radii and shadows.
- Tokens in `tokens.json` (source of truth) and `tokens.css` (CSS variables).
- Initial components: button, text field, badge, and alert.
- `preview.html` — visual reference for the system.
- `docs/guia-de-design.md` — full design guide (in Portuguese, as the authoritative brand voice).
- AA logo as a recolorable SVG.
