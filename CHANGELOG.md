# Changelog

Todas as mudanças relevantes do AA Design System.
Versionamento: `MAIOR.MENOR.CORRECAO` — correções mudam o último número, adições mudam o do meio.

## [0.1.1] — Fixed

### Fixed
- `@font-face` paths in `colors_and_type.css` now point to `fonts/Fraunces/` and `fonts/Hanken_Grotesk/` after the font directory was reorganized into subfolders.
- Fraunces variable `.ttf` files renamed to drop the `_SOFT,WONK,opsz,wght` suffix (commas in filenames broke URL resolution).

## [0.1.0] — base inicial

### Adicionado
- Fundamentos: paleta de cores (neutros, primária, acento, feedback, dados), tipografia (Fraunces + Hanken Grotesk), escala de espaçamento (base 4px), raios e sombras.
- Tokens em `tokens.json` (fonte da verdade) e `tokens.css` (variáveis CSS).
- Componentes iniciais: botão, campo de texto, badge e alerta.
- `preview.html` — referência visual do sistema.
- `docs/guia-de-design.md` — guia de design completo.
- Logo AA em SVG recolorível.
