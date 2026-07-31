# Mobile

O sistema foi desenhado para dashboard em tela grande. Isto é o que muda quando a mesma tela abre no celular — não é um segundo design system, é o mesmo com quatro decisões escritas.

A quebra é `--quebra-mobile` (720px). Uma só. Tablet usa o layout de desktop com menos colunas.

## As quatro trocas

**1. `BarraLateral` sai do fluxo e vira `Gaveta`.** No desktop ela é coluna fixa. Abaixo de 720px, esconda-a e abra `<Gaveta lado="esquerda">` a partir do botão de menu da `BarraSuperior`. Não empurre o conteúdo para o lado: em tela estreita isso deixa duas coisas pela metade.

**2. `Modal` central vira `Gaveta lado="baixo"`.** Modal centrado em celular briga com o teclado virtual — o campo fica atrás dele. A gaveta de baixo sobe até 70% da altura, o topo do conteúdo continua visível e o rodapé de ações fica no alcance do polegar.

**3. `Tabela` vira lista de cartões.** Tabela de cinco colunas não caiba em 360px, e rolagem horizontal esconde justamente a coluna que a pessoa quer. Escolha as duas ou três colunas que importam, empilhe-as num `Cartao` por linha e leve o resto para o detalhe. `linhaAtiva` continua servindo: o cartão tocado abre a `Gaveta` de detalhe.

**4. Filtro em coluna vira `Gaveta` com contador.** No template `lista-detalhe` os filtros ficam à esquerda. Em celular, um botão "Filtros (2)" abre a gaveta; o número diz quantos estão ativos, porque filtro escondido que ninguém lembra de ter ligado é a causa mais comum de "o sistema perdeu meus dados".

## O que não muda

- **Tokens.** Nenhum token tem valor por breakpoint. Espaço, tipo e cor são os mesmos.
- **Escala de tipo.** Corpo continua 15px. Não reduza para caber mais: cabe menos, e está certo.
- **Alvo de toque: 44px de lado**, já é o mínimo em todo o sistema — não é uma regra só de mobile. Vale para o × da gaveta, o item de menu e a ficha removível da `MultiSelecao`.
- **`SeletorPeriodo`** já serve: os atalhos resolvem quase tudo e o `Calendario` é fluido (`width:100%`, `maxWidth:266`), então cabe dentro da gaveta sem ajuste.

## Ainda não resolvido

- Nenhum template tem variante mobile pronta — a receita acima está escrita, não empacotada.
- `GraficoDispersao` e `MapaDeCalor` não têm versão estreita utilizável. Em celular, troque por `Metrica` com `Minigrafico`.
- Gesto de arrastar para fechar a gaveta não existe; só o × e o toque no véu.
