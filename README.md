# AA Design System

Design system pessoal — base calma e neutra, com toques de cor.
Para projetos próprios em **web** e **mobile** (dashboards e ferramentas).

**Versão:** 0.1.0 — base inicial

---

## O que tem aqui

```
aa-design-system/
├── README.md              → este arquivo
├── CHANGELOG.md           → histórico de mudanças
├── docs/
│   └── guia-de-design.md  → o guia de design (comece por aqui)
├── tokens/
│   ├── tokens.json        → fonte da verdade dos tokens
│   └── tokens.css         → tokens como variáveis CSS (para projetos web)
├── assets/
│   └── logo-aa.svg        → logo AA (recolorível via currentColor)
└── preview.html           → referência visual — abra no navegador
```

## Por onde começar

1. Abra **`preview.html`** no navegador para ver o sistema funcionando.
2. Leia **`docs/guia-de-design.md`** para entender as decisões.
3. Para usar num projeto web, importe **`tokens/tokens.css`**.

---

## Como colocar este projeto no GitHub

Você vai precisar do [Git instalado](https://git-scm.com/downloads) e de uma conta no GitHub.

### 1. Crie o repositório no site do GitHub

Em [github.com/new](https://github.com/new): dê o nome `aa-design-system`, deixe como **privado** (é pessoal), e **não** marque nenhuma opção de inicialização (README, .gitignore, licença) — este projeto já tem esses arquivos. Clique em *Create repository*.

### 2. No seu computador, dentro da pasta do projeto

Abra o terminal na pasta `aa-design-system` e rode, uma linha por vez:

```bash
git init
git add .
git commit -m "Base inicial do design system (v0.1.0)"
git branch -M main
```

### 3. Conecte ao repositório do GitHub

Troque `SEU-USUARIO` pelo seu nome de usuário do GitHub:

```bash
git remote add origin https://github.com/SEU-USUARIO/aa-design-system.git
git push -u origin main
```

Pronto — o design system está versionado e online.

### Sempre que fizer uma mudança

```bash
git add .
git commit -m "Descreva o que mudou"
git push
```

Use mensagens de commit que seu "eu do futuro" entenda: `"Ajusta azul primário para tom mais escuro"` é melhor que `"update"`.

---

## Dica: publicar o preview como página

O GitHub pode servir o `preview.html` como um site, de graça. Em **Settings → Pages**, escolha a branch `main` e a pasta raiz. Em alguns minutos, sua referência visual fica acessível por um link — útil para abrir no celular e mostrar para sua esposa.
