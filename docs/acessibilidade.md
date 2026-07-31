# Acessibilidade

O que o AA Design System garante, o que ele exige de você e o que ficou de fora de propósito.

## Contraste

O alvo é **WCAG 2.1 AA**, sempre:

| O quê | Mínimo |
|---|---|
| Texto até 18px (ou até 24px não-negrito) | 4.5:1 |
| Texto de 24px+, ou 18px+ em negrito | 3:1 |
| Borda de campo, caixa de seleção, anel de foco | 3:1 |
| Grade e eixo de gráfico, divisórias decorativas | isento |

Todos os 29 pares que o sistema usa estão medidos em `preview/contraste.html`. **Ao mudar qualquer cor semântica, rode a auditoria antes de commitar** — contraste é o tipo de regressão que ninguém percebe até um usuário reclamar.

**Auditar token não é auditar a tela.** `preview/contraste.html` mede pares de token; um literal de cor escrito dentro de um componente passa invisível por ele e reprova só no tema escuro, quando o fundo vira e o texto não. Foi assim que dez componentes chegaram à 0.3.0 com badge de 1.4:1. Antes de fechar versão, `grep` por `#` e por `--areia-/--primaria-/--acento-` em `components/`.

Quatro regras que saem disso:

0. **Componente nenhum escreve cor literal nem escala crua.** Só token semântico — inclusive nos estados de hover e pressionado, que por isso também são token.

1. **`--cor-destaque` nunca é cor de texto.** É preenchimento, filete e ícone. Para destaque escrito existe `--cor-destaque-texto`.
2. **Borda de controle é diferente de borda decorativa.** Campo, checkbox e rádio usam `--cor-borda-controle`; separadores usam `--cor-borda`.
3. **Cor nunca é o único sinal.** Erro tem texto, sucesso tem texto, série de gráfico tem rótulo ou legenda. Um usuário com deuteranopia precisa chegar à mesma conclusão.

## Foco

Todo elemento operável tem foco visível: `--anel-foco` (3px, `primaria-400`), ou `--anel-foco-erro` quando o campo está inválido. O botão primário usa um anel de dois passos porque o fundo dele já é azul.

Nunca escreva `outline: none` sem substituir por outra coisa. Use `:focus-visible`, não `:focus` — assim quem clica com mouse não vê anel, quem navega com Tab vê.

Ordem de tabulação segue a ordem do DOM. Se você posicionou algo visualmente fora de ordem, reordene o DOM, não conserte com `tabindex`.

## Alvo de toque

Mínimo de **44×44px** em qualquer coisa clicável no mobile. Botões e campos do sistema já nascem com 40px de altura no desktop; em tela estreita aumente o padding vertical, não diminua a fonte.

Ícone sozinho como botão precisa de `aria-label`. Sem exceção.

## Movimento

`--transicao` é 150ms e nada dá quique. Respeite `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

## Fora de escopo, por enquanto

- **Modo escuro** — próximo item da fila. Os componentes só consomem tokens semânticos, então será um bloco `[data-tema="escuro"]` e nada mais.
- **Teste com leitor de tela** — os componentes trazem `aria-*` onde é estrutural (modal, abas, tabela, alerta), mas nada foi verificado no NVDA/VoiceOver ainda. Não afirme conformidade sem testar.
