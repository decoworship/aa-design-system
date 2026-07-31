# Changelog

Todas as mudanças relevantes do AA Design System.
Versionamento: `MAIOR.MENOR.CORRECAO` — correções mudam o último número, adições compatíveis o do meio.

## [0.3.0] — 2026-07-31

Modo escuro, filtro de período, tabela com estados e o template de lista/detalhe. Inclui a auditoria de contraste que estava marcada como 0.2.1 — as duas coisas mexem nos mesmos tokens e saem juntas.

### Adicionado
- **Modo escuro.** `[data-tema="escuro"]` redefine **só os tokens semânticos**; as escalas cruas ficam intactas. `[data-tema="auto"]` segue o sistema operacional. Base é marrom-carvão (`#1A1714`), não cinza azulado: areia no escuro continua quente. Séries de gráfico clareiam mantendo a mesma ordem e o mesmo matiz. Cartão em `preview/tema-escuro.html`, com os dois temas lado a lado na mesma página.
- **`SeletorPeriodo`** — atalhos ("Hoje", "7 dias", "30 dias", "Este mês", "Este ano") mais intervalo pelo calendário, e **comparação com o período anterior** já embutida: mesma duração, colada antes do início. Exporta `periodoDoAtalho()` e `periodoAnterior()` para quem só precisa da conta.
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
