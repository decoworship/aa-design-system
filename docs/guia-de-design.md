# Guia de Design — AA Design System

> Versão 0.1.0 · base inicial
> Um design system pequeno e propositalmente simples, para projetos pessoais em web e mobile (dashboards e ferramentas).

---

## O que é isto (e o que não é)

Este é o **conjunto de decisões visuais** que você vai reaproveitar em todos os seus projetos, para que eles tenham a mesma cara sem você ter que decidir tudo de novo a cada vez.

Não é uma biblioteca gigante de componentes. É uma base enxuta: algumas cores, duas fontes, uma régua de espaçamento e um punhado de componentes. Cresce só quando você sentir falta de algo — nunca antes.

**A regra de ouro:** quando for construir uma tela, use sempre os *tokens* (os valores nomeados deste guia). Nunca escolha uma cor ou um tamanho "no olho". É isso que mantém tudo coerente.

---

## A direção visual

Calmo e neutro, com toques de cor. A base é uma paleta de tons de areia quente — herdada do clima dos posters e dos instrumentos vintage que serviram de referência. A cor aparece pouco e com intenção: um azul tranquilo para ações e uma terracota para destaques raros.

O logo AA de vocês entra de forma **discreta** — um detalhe pequeno no cabeçalho, em tom neutro, nunca como elemento gritante.

Três palavras que guiam qualquer decisão: **calmo, quente, claro.** Na dúvida entre duas opções, escolha a mais sóbria.

---

## 1. Cores

As cores estão organizadas em duas camadas. Você quase sempre vai usar a **camada semântica** (os nomes que descrevem função), não os valores crus.

### Neutros — a base calma

Uma escala de areia quente, de `areia-50` (quase branco) a `areia-900` (quase preto). É com ela que se faz fundo, superfície de cards, bordas e texto.

### Cores semânticas — use estas no dia a dia

| Token | Para quê | Valor |
|---|---|---|
| `fundo` | Fundo das telas | areia-100 |
| `superficie` | Fundo de cards e painéis — o que se **lê**, sempre opaco | areia-50 |
| `camada` | Fundo do que **flutua**: barra, modal, gaveta, menu, aviso, dica | areia-50 |
| `borda` | Linhas e divisórias | areia-300 |
| `texto` | Texto padrão | areia-800 |
| `texto-suave` | Texto secundário, legendas | areia-700 |
| `texto-forte` | Títulos | areia-900 |
| `acao` | Botões e links principais | primária-500 (azul) |
| `destaque` | Acentos raros | acento-500 (terracota) |

### Feedback

Quatro cores para comunicar status: **sucesso** (verde sálvia), **atenção** (âmbar), **erro** (telha) e **info** (o próprio azul). São de propósito suaves — não devem gritar.

### Paleta de dados

Seis cores separadas, só para **gráficos** de dashboard (`dados-1` a `dados-6`). Cores de gráfico seguem regras diferentes das de interface: precisam ser distinguíveis entre si. Não use as cores de feedback em gráficos, nem as de gráfico em botões.

> A lista completa de valores hexadecimais está em `tokens/tokens.json` e `tokens/tokens.css`.

---

## 2. Tipografia

Duas fontes, ambas gratuitas no Google Fonts:

- **Fraunces** — serifada, com calor. Usada **só** em títulos grandes (Display). É a "voz" do sistema.
- **Hanken Grotesk** — sem serifa, limpa e legível. Faz **todo o resto**: títulos menores, corpo, legendas, interface. É a fonte de trabalho.

### Escala de tamanhos

| Nome | Tamanho | Fonte | Uso |
|---|---|---|---|
| Display | 36px | Fraunces | Título principal de uma página |
| Título G | 24px | Hanken 600 | Título de seção |
| Título M | 18px | Hanken 600 | Subtítulo, título de card |
| Corpo | 15px | Hanken 400 | Texto padrão |
| Pequeno | 13px | Hanken 400 | Apoio, legendas, dicas |
| Rótulo | 12px | Hanken 600 | Etiquetas em CAIXA ALTA |

Não invente tamanhos fora desta lista.

---

## 3. Espaçamento, raio e sombra

### Espaçamento — base 4px

Toda margem e todo respiro vêm de uma escala única: `4, 8, 12, 16, 24, 32, 48, 64`. Se você precisa de "uns 20px ali", arredonde para um valor da escala (16 ou 24). Essa disciplina é o que faz layouts parecerem alinhados.

### Raio de borda

- `pequeno` (6px) — campos de formulário
- `médio` (10px) — botões, etiquetas pequenas
- `grande` (16px) — cards e painéis
- `pílula` — badges e elementos circulares

### Sombra

Três níveis (`pequena`, `média`, `grande`), todas suaves e com um leve tom quente. Sombra aqui serve para separar camadas discretamente — nunca para chamar atenção.

### Material — `aa` e `vidro`

Raio e sombra são as duas coisas que mudam quando você troca o **estilo**. O sistema tem dois, e os dois vivem sobre a mesma paleta, as mesmas fontes e a mesma escala tipográfica:

| | `aa` (padrão) | `vidro` |
|---|---|---|
| Camada que flutua | areia chapada | translúcida, com blur |
| Raio | 6 / 10 / 16px | 10 / 14 / 22px |
| Sombra | discreta, quase só um filete | presente — é ela que diz que flutua |

Liga com `data-estilo="vidro"` no `<html>`, ou em qualquer wrapper. Funciona por subárvore e **combina** com `data-tema`:

```html
<html data-tema="auto" data-estilo="vidro">
```

**A regra é uma só: vidro flutua, conteúdo é opaco.** Se a camada **cobre** conteúdo — barra, modal, gaveta, menu, aviso, dica — pode ser vidro. Se a camada **é** o conteúdo — cartão, tabela, barra lateral, gráfico — fica opaca. Texto longo sobre blur cansa, e o contraste dele passa a depender do que corre atrás. É a translucidez ser escassa que deixa o `vidro` mais leve que o `aa` sem mexer na leitura.

Por isso existem dois tokens de superfície, e não um: `superficie` é o que se lê e nunca fica translúcido; `camada` é o que flutua e é só ele que vira vidro. Se o vidro entrasse por `superficie`, todo cartão iria junto.

Duas coisas que não se negociam:

- **O alfa da camada é medido, não escolhido a olho.** Camada translúcida não tem contraste fixo — ela herda o que corre atrás. Os valores (0.82 no claro, 0.85 no escuro) são o mínimo que mantém AA no pior substrato que o sistema consegue pintar, inclusive sob o véu do modal, que escurece o fundo antes do vidro compor em cima. Baixar quebra AA. É o blur que faz parecer vidro, não o alfa.
- **Sem `backdrop-filter` no navegador, vidro cai para opaco** — nunca para ilegível.

Os dois estilos lado a lado, nos dois temas: `preview/estilos.html`. A medição par por par: `preview/contraste.html`.

---

## 4. Componentes iniciais

A base v0.1.0 traz só o essencial. Cada componente é montado a partir dos tokens acima.

- **Botão** — três variações: primário (azul, ação principal), secundário (contorno) e texto (sem fundo). Use **um só** botão primário por tela.
- **Campo de texto** — rótulo em cima, dica embaixo, foco com anel azul.
- **Badge** — etiqueta de status pequena, em formato pílula.
- **Alerta** — faixa de feedback (info, sucesso, erro).

Para cada componente, lembre dos **estados**: normal, hover (mouse em cima), foco (navegação por teclado) e desabilitado. Eles estão demonstrados na página `preview.html`.

### O que ainda não existe (e tudo bem)

Tabelas, modais, navegação, gráficos prontos, abas. Você adiciona quando um projeto real precisar — e aí o componente nasce já testado por uso. Resista a criar componente "por garantia".

---

## 5. Acessibilidade — o mínimo que não se abre mão

Não é uma etapa final, é parte de cada decisão:

- **Contraste:** texto sobre fundo precisa ter contraste suficiente para ser lido. Texto pequeno claro sobre fundo claro é o erro mais comum.
- **Foco visível:** quem navega por teclado precisa ver onde está. Nunca remova o anel de foco sem colocar outro no lugar.
- **Alvo de toque:** no mobile, botões e links precisam de área suficiente para o dedo (mire em ~44px de altura).

---

## 6. Como usar isto num projeto

**Projeto web:** copie `tokens/tokens.css` para o projeto, importe-o antes do seu CSS e use as variáveis (`var(--cor-acao)`, `var(--espaco-4)`, etc.).

Para o estilo `vidro`, copie também `estilos.css` e importe-o **depois** dos tokens — ele redefine token semântico, então ordem importa. Depois é só `data-estilo="vidro"` no `<html>`.

**Ferramenta Python (Streamlit, Dash e afins):** o framework já traz os componentes prontos. Seu design system ali se aplica principalmente como **tema** — leia as cores e fontes de `tokens.json` e configure o tema do framework com esses valores. O guia continua valendo como referência de decisões.

**Mobile:** os mesmos tokens valem. Adapte só o que for específico de telas pequenas (alvos de toque maiores, menos colunas).

---

## 7. Como o sistema evolui

Mesmo trabalhando sozinho, trate mudanças com cuidado:

1. Mudou um token ou componente? Anote no `CHANGELOG.md` o que mudou e por quê.
2. Suba a versão: correções pequenas mudam o último número (0.1.0 → 0.1.1); adições mudam o do meio (0.1.0 → 0.2.0).
3. Sempre que mexer nos tokens, abra `preview.html` e confira se tudo continua coerente.

O `tokens.json` é a **fonte da verdade**. Se algum dia o `tokens.css` divergir dele, o JSON é quem manda. Os dois estilos estão lá no bloco `estilo`, com os valores dos dois temas — é de onde um app Python/Streamlit lê o material sem precisar interpretar CSS.

---

## Próximos passos sugeridos

1. Abra `preview.html` no navegador e veja se o clima visual agrada vocês dois.
2. Ajuste o que não combinar — provavelmente uma ou duas cores. É só editar o `tokens.json` e o `tokens.css`.
3. Use a base num projeto real pequeno. O primeiro uso real revela o que falta melhor do que qualquer planejamento.
4. Só então adicione o próximo componente — aquele que o projeto pediu.
