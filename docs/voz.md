# Voz e escrita

O AA Design System escreve como uma pessoa competente falando com outra: **informal, direto, em pt-BR, sem vender nada**. Não é simpático nem seco — é claro.

Três testes rápidos antes de escrever qualquer coisa na interface:

1. Você diria isso em voz alta para alguém do lado? Se não, reescreva.
2. Dá para tirar palavras e a frase continua igual? Tire.
3. A pessoa sabe o que fazer depois de ler? Se não, falta o próximo passo.

## As dez regras

### 1. Botão é verbo, e é o verbo que a pessoa está fazendo

- ✅ **Entrar**
- ❌ Efetuar login

O rótulo do botão completa a frase "eu quero…". Substantivo abstrato ("Login", "Submissão") obriga a pessoa a traduzir antes de clicar.

### 2. Sem jargão corporativo

- ✅ **Salvar rascunho automaticamente**
- ❌ Habilitar persistência automática de rascunho

Se a frase não caberia numa conversa, não cabe na tela. "Habilitar", "efetuar", "realizar" e "prosseguir" quase sempre podem sair sem perder nada.

### 3. Erro sempre com o próximo passo

- ✅ **A conexão falhou no meio do caminho. Seus dados estão a salvo — tente de novo.**
- ❌ Erro ao processar requisição (500)

Um erro sem saída deixa a pessoa parada. Diga o que aconteceu em português, o que sobreviveu, e o que fazer agora. Código HTTP não é informação para quem usa.

### 4. Fale com a pessoa, não sobre ela

- ✅ **Você ainda não criou nenhum projeto.**
- ❌ Nenhum projeto foi encontrado para este usuário.

Voz passiva e "este usuário" transformam a pessoa em registro de banco. Trate por "você".

### 5. Estado vazio é convite, não constatação

- ✅ **Nada por aqui ainda. Crie o primeiro projeto e ele aparece nesta lista.**
- ❌ Nenhum resultado.

Tela vazia é o primeiro contato de quem acabou de chegar. Dizer só "vazio" desperdiça o único momento em que a pessoa está prestando atenção.

### 6. Dica de campo explica a consequência, não repete o rótulo

- ✅ **Aparece na lista da página inicial.**
- ❌ Digite o nome do projeto.

Se a dica só reescreve o rótulo, apague — ela está ocupando espaço e ensinando a ignorar dicas.

### 7. Número tem unidade e recorte de tempo

- ✅ **+2 no mês**
- ❌ +2

Delta sem período não quer dizer nada. Toda métrica responde "comparado com o quê".

### 8. Confirmação nomeia o que vai acontecer

- ✅ **Apagar projeto**
- ❌ OK

No botão de uma confirmação, "OK" e "Sim" obrigam a reler a pergunta. O rótulo deve funcionar mesmo se a pessoa só olhou o botão.

### 9. Nada de exclamação e nada de emoji

- ✅ **Projeto salvo.**
- ❌ Projeto salvo com sucesso! 🎉

Comemorar tarefa comum soa falso na terceira vez. "Com sucesso" também é redundante: se aparece a mensagem, deu certo.

### 10. Escreva em pt-BR, inclusive nos termos técnicos

- ✅ **Buscar · Filtros · Painel · Período**
- ❌ Search · Filters · Dashboard · Range

O sistema é em português — nos tokens, nas props, na interface. Meia tradução é pior que nenhuma: cria duas línguas na mesma tela.

## Vocabulário fixo

Escolha uma palavra e nunca troque — sinônimo na interface parece funcionalidade diferente.

| Use | Não use |
|---|---|
| Entrar / Sair | Login / Logout, Acessar |
| Salvar | Gravar, Persistir, Confirmar alterações |
| Apagar | Excluir, Remover, Deletar |
| Buscar | Pesquisar, Procurar, Search |
| Painel | Dashboard, Home |
| Período | Intervalo de datas, Range |
| Pendência | Tarefa em aberto, To-do |
| Projeto | Item, Registro, Entrada |

## Maiúsculas e pontuação

- **Frase, não Título:** "Nome do projeto", nunca "Nome Do Projeto".
- Rótulo de campo e de botão **sem ponto final**.
- Dica, mensagem de erro e texto de estado vazio **com ponto final** — são frases.
- Só `--texto-rotulo` (12px) usa caixa alta, e por ser rótulo de seção, não por ênfase.
- Reticências no rótulo significam "abre outra coisa": "Escolher datas" abre popover, então não leva; "Convidar pessoas…" abre um fluxo, então leva.
