# Changelog

Todas as mudanças relevantes do AA Design System.
Versionamento: `MAIOR.MENOR.CORRECAO` — correções mudam o último número, adições compatíveis o do meio.

## [0.5.0] — 2026-09-17

Camada de material: o mesmo sistema com dois acabamentos, `aa` e `vidro`. Nada removido, nada renomeado, e o padrão continua sendo o `aa` — quem não põe `data-estilo` não vê diferença nenhuma.

### Adicionado
- **`estilos.css` e o atributo `data-estilo`.** `data-estilo="aa"` é o de hoje (areia chapada, borda, sombra discreta); `data-estilo="vidro"` deixa translúcido **só o que flutua**. Redefine apenas tokens de camada, borda, raio e sombra — **nunca paleta, fonte ou escala tipográfica** (12/13/15/18/24/36 são idênticas nos dois). Funciona por subárvore e **combina** com `data-tema`, igual ao modo escuro: `<html data-tema="auto" data-estilo="vidro">`.
- **Tokens de camada.** `--cor-camada`, `--cor-camada-opaca`, `--cor-borda-camada`, `--cor-camada-invertida`, `--cor-camada-invertida-opaca` e `--camada-filtro`, declarados nos três contextos de tema (claro, escuro e auto) e no `tokens.json`, que ganhou um bloco `estilo` com os valores dos dois estilos nos dois temas.

  **A camada é token próprio, e não `--cor-superficie`, de propósito.** Os componentes de sobreposição não têm classe CSS — são *inline style* lendo token. Duas consequências: uma camada de vidro baseada em seletor de classe não alcançaria nenhum deles, então o vidro tem que entrar por token; e se entrasse por `--cor-superficie`, **todo `Cartao` ficaria translúcido junto** e o texto passaria a depender do que corre atrás. Então `--cor-superficie` é o que se lê e continua opaca nos dois estilos, e `--cor-camada` é o que flutua e é só ela que vira vidro. É assim que a regra de design fica escrita no próprio sistema:

  > **Vidro flutua, conteúdo é opaco.** Se a camada **cobre** conteúdo, pode ser vidro. Se a camada **é** o conteúdo, não pode.

- **Nove componentes passaram a ler a camada,** sem nenhuma mudança de lógica e sem nenhuma classe nova: `Modal`, `Gaveta`, `MenuSuspenso`, `Aviso`, `PilhaAvisos`, `Dica`, `MultiSelecao` (painel de opções), `SeletorPeriodo` (popover do calendário) e `BarraSuperior`. **Não** mexeram: `Cartao`, `Tabela`, `BarraLateral`, `Abas`, gráficos, e o véu de modal e gaveta — véu é cortina, não camada, e não recebe filtro. Campo e caixa de marcar dentro de uma camada seguem com fundo opaco e `--cor-borda-controle`: estilo não afrouxa borda de controle.
- **`preview/estilos.html`** — as quatro combinações de estilo × tema na mesma página, com barras de gráfico atrás da camada para o blur ficar visível e o cartão opaco ao lado para mostrar o contraste da regra. **`preview/sobreposicoes.html`** ganhou um botão de estilo, para ver os componentes de verdade em vidro.
- **`preview/contraste.html`** ganhou a auditoria da camada: **34 pares novos**, nos dois temas.

### Sobre o alfa da camada — o achado desta versão
Camada translúcida **não tem contraste fixo**: ela herda o que corre atrás, então não existe "o par" para medir — existe o **pior caso**. O que torna o problema resolvível é uma regra que o sistema já tinha: sem imagem, sem gradiente, sem padrão, sem grão. A camada só flutua sobre cor do sistema, e aí o pior caso é enumerável.

Enumerando, o alfa que o estudo visual sugeria (0.55 no claro) **reprovava AA** — e não num caso exótico: reprovava **sob o véu do modal sobre o fundo da página**, que é o caso mais comum do sistema inteiro, porque o véu escurece o fundo *antes* do vidro compor em cima. Sobre bloco de tinta o texto de corpo caía a 3.94:1.

Os valores que entraram são **0.82 no claro e 0.85 no escuro**: o mínimo que mantém AA sobre qualquer superfície ou preenchimento decorativo do sistema, com e sem véu. A exigência mais apertada fica 3% acima do alvo. **É o blur que faz parecer vidro, não o alfa** — baixar o alfa para "parecer mais vidro" quebra a leitura. Quem mexer nesses números roda `preview/contraste.html` de novo.

### Corrigido
- **`data-tema="auto"` também recebe os blocos de estilo.** `[data-tema="auto"]` e `[data-estilo="vidro"]` empatam em especificidade (0,1,0) e `estilos.css` é importado depois, então sem um par explícito sob `prefers-color-scheme: dark` a página em auto + vidro num sistema escuro pegaria a camada **clara**. Mesmo motivo pelo qual o tema escuro explícito precisa de dois seletores (o de mesmo elemento e o descendente).
- **O fallback sem `backdrop-filter` cai no token, não só na classe.** Como os componentes são inline style lendo `--cor-camada`, um `@supports` que só cobrisse `.aa-vidro` deixaria todos eles translúcidos **e sem blur** — o pior dos dois mundos. Agora o `@supports` redefine `--cor-camada` para `--cor-camada-opaca`, então vidro cai para opaco em qualquer consumidor. Nunca para ilegível.
- **`Dica` entrou por uma camada invertida.** A dica é um chip de tinta: fundo `--cor-texto-forte`, texto `--cor-superficie`. Apontá-la para `--cor-camada` teria posto **texto claro sobre vidro claro**. Ela usa `--cor-camada-invertida`, que é vidro escuro no tema claro e vidro claro no escuro — no estilo `aa` o valor é idêntico ao de hoje, então nada muda lá.
- `--cor-veu` estava **declarado duas vezes** no bloco `[data-tema="auto"]` de `colors_and_type.css` e de `tokens/tokens.css`, uma delas com indentação errada. Mesmo valor nas duas, então nunca deu sintoma; removida a repetida.
- O guia listava `texto-suave` como `areia-600` na tabela de cores semânticas. Ele desceu para `areia-700` na auditoria de contraste do 0.3.0 — justamente porque `areia-600` reprovava — e a tabela ficou para trás. Corrigido.
- `README.md` e `SKILL.md` afirmavam "sem glassmorphism, sem blur", e o README dizia que o sistema não usa `backdrop-filter`. Passou a ser mentira. Os dois textos agora dizem a regra com escopo, em vez de negar o recurso.

### Verificado, sem mudança
O `backdrop-filter: none !important` que existe em `templates/*/support.js` **já está dentro de `@media print`** nos cinco templates. A suspeita de que ele mataria o vidro em tela não se confirmou: é proteção de impressão e captura, e não vale na tela. Nenhum template precisou de ajuste.

### Ainda não
O padrão continua `aa`. Trocar o padrão para `vidro` é um segundo passo, deliberado, e com o contraste já medido não depende mais de nada técnico — depende de decisão.

## [0.4.0] — 2026-07-31

Os três buracos que a auditoria apontou, mais o guia de mobile. Nada removido, nada renomeado.

### Adicionado
- **`Gaveta`** (estrutura) — painel de `lado="direita" | "esquerda" | "baixo"`, com cabeçalho, corpo rolável e rodapé de ações fixo. `baixo` é a variante mobile do modal: sobe do rodapé, não briga com o teclado virtual. Fecha no Esc, no véu e no ×, e devolve o foco a quem abriu.
- **`PilhaAvisos`** (feedback), com o hook `Avisos.usar()` — fila de toasts com limite (o mais novo empurra o mais antigo), quatro cantos, `aria-live="polite"`. **Aviso de erro e aviso com ação não somem sozinhos**: quem errou precisa ler, e quem tem "Desfazer" precisa de tempo para clicar. `Aviso` continua existindo para o toast solto. O hook sai como binding próprio capitalizado (`Avisos.usar()`): o bundle só expõe nomes com maiúscula, e reencapsula a função exportada, então propriedade pendurada no componente também não sobrevive.

O mesmo bug estava no `SeletorPeriodo` desde o 0.3.0: `periodoDoAtalho` e `periodoAnterior` eram anunciados no README e **nunca chegavam ao namespace**. Agora saem como `Periodo.doAtalho()` e `Periodo.anterior()` (mais `Periodo.atalhos`). **Regra: função utilitária exportada de componente precisa de nome com maiúscula, ou de um objeto capitalizado que a carregue.**
- **`MultiSelecao`** (formulário) — fichas do escolhido, lista com caixas de marcar, resumo "+N" acima de três, `limite` de escolhas com dica explicando o teto. A busca aparece sozinha a partir de nove opções; abaixo disso seria só ruído.
- **`docs/mobile.md`** — a quebra é uma só (720px) e as quatro trocas estão escritas: barra lateral → gaveta, modal → gaveta de baixo, tabela → lista de cartões, coluna de filtro → gaveta com contador. Mais o que **não** muda (nenhum token por breakpoint, corpo continua 15px) e o que ainda falta.
- **`preview/sobreposicoes.html`** — cartão clicável dos três componentes novos.
- Keyframes `aa-veu-entra`, `aa-aviso-entra` e `aa-gaveta-*` em `componentes.css`, sob o `prefers-reduced-motion` que já existia.

### Corrigido — disciplina de token, segunda passada
A auditoria do 0.3.0 procurou por `#hex` e escalas cruas, e por isso **passou por cima de `rgba()`**. O véu do `Modal` era `rgba(34,31,26,0.38)` escrito dentro do componente: no escuro, cortina clara demais sobre fundo escuro. Agora é **`--cor-veu`** (novo token, valor próprio em cada tema), usado por `Modal` e `Gaveta`.

Dois literais `#7C2E25` sobraram na mensagem de erro dos templates `login-centrado` e `login-dividido` — trocados por `var(--cor-erro)`. **Ao auditar, faça `grep` por `rgba(` também, não só por `#`.** O `zIndex` fixo `300` do `Modal` virou `var(--z-modal)`; os tokens de camada existiam desde o 0.2.0 e não estavam sendo usados.

## [0.3.0] — 2026-07-31

Modo escuro, filtro de período, tabela com estados e o template de lista/detalhe. Inclui a auditoria de contraste que estava marcada como 0.2.1 — as duas coisas mexem nos mesmos tokens e saem juntas.

### Adicionado
- **Modo escuro.** `[data-tema="escuro"]` redefine **só os tokens semânticos**; as escalas cruas ficam intactas. `[data-tema="auto"]` segue o sistema operacional. Base é marrom-carvão (`#1A1714`), não cinza azulado: areia no escuro continua quente. Séries de gráfico clareiam mantendo a mesma ordem e o mesmo matiz. Cartão em `preview/tema-escuro.html`, com os dois temas lado a lado na mesma página.
- **`SeletorPeriodo`** — atalhos ("Hoje", "7 dias", "30 dias", "Este mês", "Este ano") mais intervalo pelo calendário, e **comparação com o período anterior** já embutida: mesma duração, colada antes do início. Exporta `Periodo.doAtalho()` e `Periodo.anterior()` para quem só precisa da conta.
- **`Calendario`** — mês em pt-BR, semana começando no domingo, modo dia ou intervalo, `min`/`max`. Enquanto só uma ponta está escolhida, o intervalo acompanha o mouse; clique antes do início reordena em silêncio em vez de recusar.
- **Template `lista-detalhe/`** — filtros à esquerda, lista ordenável ao centro, painel de detalhe à direita, com os quatro estados (pronto, vazio, carregando, erro) trocáveis por tweak. Vazio por filtro e vazio de verdade têm textos diferentes de propósito: um pede para afrouxar o filtro, o outro para criar o primeiro item.
- **`docs/voz.md`** e `preview/voz.html` — dez regras em pares "escreva assim / não assim", tiradas dos próprios templates, mais vocabulário fixo e regras de caixa e pontuação.
- **`docs/acessibilidade.md`** — contraste, foco, alvo de toque, movimento, e o que ainda **não** foi testado (leitor de tela).
- **`preview/contraste.html`** — 58 pares medidos nos dois temas, com alvo, veredito e os casos isentos justificados por escrito.
- **`preview/periodo.html`** — cartão do seletor e do calendário.
- `@media (prefers-reduced-motion: reduce)` em `componentes.css`.

### Corrigido — disciplina de token (achado pelo modo escuro)
O escuro funcionou como teste: dez componentes ainda tinham **cor literal ou escala crua** escrita dentro. No tema claro passavam; no escuro o fundo virava e o texto não — a etiqueta "Em andamento" ficava em 1.36:1. Todos convertidos para token semântico: `Etiqueta`, `Metrica`, `Alerta`, `Aviso`, `Botao`, `Avatar`, `Abas`, `Paginacao`, `BarraLateral`, `MenuSuspenso`, `Tabela`, `Dica`, `Escolha`, `Interruptor`, `GraficoMedidor` — e o mesmo no espelho `componentes.css`.

**Regra nova, e vale para sempre:** componente nenhum escreve cor literal nem escala crua (`--areia-*`, `--primaria-*`, `--acento-*`). Só token semântico. Auditar token não basta — `preview/contraste.html` mede pares de token e um literal dentro do componente passa invisível por ele; faça `grep` por `#` e pelas escalas cruas em `components/` antes de fechar versão.

Para isso, **estados de interação viraram token**: `--cor-acao-suave`, `--cor-acao-suave-2`, `--cor-destaque-bg`, `--cor-linha-hover`, `--cor-borda-controle-hover`, `--cor-link-sublinhado`. A única exceção do sistema é a marca do checkbox em `componentes.css`: a cor vive dentro do SVG embutido, então o tema escuro tem uma segunda declaração.

### Alterado
- **`Tabela` ganhou estados**: `estado="carregando"` desenha esqueleto **na mesma grade** da tabela pronta (o conteúdo não salta quando chega) e `estado="erro"` mostra recuperação com `aoTentarNovamente`. Também aceita `linhaAtiva`, para tabela ao lado de painel de detalhe. Nada disso era resolvível fora sem reescrever a mesma coisa em cada tela.
- `aria-sort` no cabeçalho ordenável e `aria-busy` durante o carregamento.

### Corrigido — auditoria de contraste
- **`--cor-texto-suave`**: `areia-600` → `areia-700`. Reprovava nas três superfícies (3.27–3.97:1); agora 5.42–6.59:1.
- **Cores de feedback escurecidas**, cada uma reprovava duas vezes (como texto sobre o próprio `-bg` e como preenchimento sob texto claro): `--cor-sucesso` → `#4A6746`, `--cor-atencao` → `#8A5F22`, `--cor-erro` → `#8E3A2E`.
- **`--grafico-rotulo`** `#847A63` → `#5F584A`: rótulo de eixo é texto de 12px, não decoração.
- **Anel de foco** era `primaria-50` sobre superfície clara, praticamente invisível. Agora `primaria-400` (claro) e `primaria-300` (escuro). `--anel-foco-erro` passou de `--cor-erro-bg` para `--cor-erro`.
- **`.aa-entrada::placeholder`** usava `areia-500` (2.65:1). **Interruptor desligado** usava `areia-400` (1.75:1) — não dava para perceber o controle.

### Novos tokens
- **`--cor-borda-controle`** (`areia-600`): borda de campo, checkbox e rádio precisam de 3:1 por WCAG 1.4.11; borda decorativa não. Aplicado em `.aa-entrada` e `.aa-escolha`.
- **`--cor-destaque-texto`** (`acento-700`): `--cor-destaque` passa a ser oficialmente decorativa (preenchimento, filete, ícone) e nunca texto.
- Bloco `tema-escuro` completo em `tokens/tokens.json` — 34 tokens semânticos, séries, cromo de gráfico, sombras e foco.

### Atenção ao atualizar
Se algum projeto seu escreveu `--cor-destaque` em cima de texto, troque por `--cor-destaque-texto`. É a única mudança que pode alterar aparência de forma perceptível.

## [0.2.0] — 2026-07-30

O sistema saiu de "tokens + quatro componentes" para algo que dá conta de um dashboard inteiro. Nada foi removido; tudo que existia continua valendo.

### Adicionado
- **`styles.css`** na raiz: um único arquivo para linkar. Importa `colors_and_type.css` e `componentes.css`.
- **`componentes.css`**: todos os componentes também como classes CSS puras (`.aa-btn`, `.aa-campo`, `.aa-tabela`…), para projetos sem React.
- **34 componentes React** em `components/`, com `.d.ts` e cartão de preview por família:
  - *Ações* — Botao, Etiqueta, Avatar, Dica
  - *Formulário* — Campo, Selecao, AreaTexto, Escolha, Interruptor, Busca
  - *Estrutura* — Cartao, Abas, Divisor, Migalhas
  - *Dados* — Metrica, Tabela, Progresso, Paginacao, Vazio, Esqueleto
  - *Feedback* — Alerta, Modal, MenuSuspenso, Aviso
  - *Navegação* — BarraLateral, BarraSuperior
  - *Gráficos* — GraficoBarras, GraficoLinhas, GraficoRosca, GraficoDispersao, GraficoFunil, GraficoMedidor, MapaDeCalor, Minigrafico
- **`preview/graficos-catalogo.html`**: o mapa completo dos tipos de gráfico para dashboard, agrupados pela pergunta que respondem, com o que evitar e a receita dos tipos ainda não implementados.
- **Templates** em `templates/`: `login-centrado`, `login-dividido`, `login-codigo` e `painel`.
- **Tokens novos**: escala primária e acento completas (50–900); `--dados-7/8`; escala sequencial `--seq-1…5`; escala divergente `--div-1…5`; cromo de gráfico (`--grafico-grade`, `-eixo`, `-rotulo`, `-area`, `-realce`, `-referencia`); movimento (`--transicao*`); foco (`--anel-foco`, `--anel-foco-erro`); camadas (`--z-*`); layout (`--largura-maxima`, `--largura-leitura`, `--quebra-mobile`); `--fonte-mono`; `--texto-heroi` (48px, só para hero de login).
- **`thumbnail.html`**: a marca do sistema na tela inicial.

### Alterado
- `tokens/tokens.css` e `tokens/tokens.json` sincronizados com os tokens novos.
- README e SKILL.md passam a listar componentes, gráficos e templates.

### Não mudou
- A escala de espaçamento (8 valores), os raios, as sombras e a paleta de areia.
- A regra de fundo quente, sem branco puro, sem gradiente, sem sombra decorativa.
- Os nomes em português.

## [0.1.1] — caminho das fontes e localização bilíngue

Entrada deste repositório, anterior ao pacote 0.2.0 do Claude Design e preservada aqui.

### Corrigido
- Caminhos de `@font-face` em `colors_and_type.css` apontando para `fonts/Fraunces/` e `fonts/Hanken_Grotesk/` depois que o diretório de fontes foi reorganizado em subpastas. A correção continua valendo: o pacote vem com as fontes na raiz de `fonts/`, e este repositório mantém as subpastas com licença (`OFL.txt`) e estáticas.
- `SKILL.md` e `docs/guia-de-design.md` não afirmam mais que as fontes vêm do Google Fonts — elas são distribuídas localmente.

### Adicionado
- Seção de convenções de idioma no `README.md`, documentando o que é escrito em inglês e o que é escrito em português.

## [0.1.0] — base inicial

Primeira versão empacotada: tokens de cor, tipografia, espaçamento, raio e sombra; quatro componentes (botão, campo, etiqueta, alerta); guia de design em português; UI kit "Casa & projetos".
