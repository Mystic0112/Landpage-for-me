# Landing page — Hélio Vinícius

Landing page pessoal de apresentação, construída em **React + Vite** com forte
uso de **efeitos de parallax**. Todo o conteúdo vem do currículo (backend em
PHP/Laravel, integrações com IA e infraestrutura multi-serviços).

## Rodando o projeto

```bash
npm install
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # gera a versão de produção em dist/
npm run preview  # serve o build em http://localhost:4173
```

## Como o parallax funciona

Não há biblioteca de animação: o movimento é próprio, montado sobre um único
loop de `requestAnimationFrame`.

- **`src/lib/scroll.jsx`** — `ScrollProvider` inicia o [Lenis](https://github.com/darkroomengineering/lenis)
  (smooth scroll) e distribui a posição, a velocidade e o progresso da rolagem
  para todos os assinantes a cada frame. Os efeitos escrevem direto no DOM, sem
  re-render do React, o que mantém a rolagem fluida mesmo com dezenas de
  camadas em movimento.
- **`src/hooks/useParallax.js`** — devolve uma `ref` que desloca o elemento
  conforme a rolagem. Opções:
  - `speed` — fração do scroll aplicada; positivo empurra a camada para o fundo,
    negativo faz passar na frente.
  - `anchor` — `'center'` (zera no centro da tela, para seções internas) ou
    `'scroll'` (zera no topo da página, usado no hero para nada nascer fora do lugar).
  - `rotate`, `scale`, `clamp`, `axis`, `disableBelow` (desliga em telas estreitas).
- **`src/hooks/useTrack.js`** — informa o progresso (0 a 1) de uma seção na tela,
  nos modos `through` (atravessando a viewport) e `pinned` (seções `sticky`).
- **`src/hooks/useReveal.js`** — `IntersectionObserver` que aplica a classe
  `is-visible`; a animação em si fica no CSS.

### Efeitos por seção

| Seção | Efeito |
| --- | --- |
| Hero | 6 camadas em velocidades diferentes (grade, dois halos, marca d'água `<?php`, as duas linhas do nome e o cartão de código inclinado); o conteúdo desfoca ao sair |
| Faixa | Marquee infinito que acelera e inclina conforme a velocidade da rolagem |
| Sobre | Objetivo do currículo iluminado palavra a palavra conforme a seção atravessa a tela |
| Stack | Grade em que cada coluna sobe em ritmo próprio, com inclinação 3D e brilho seguindo o ponteiro |
| Projetos | Seção fixada (`sticky`): a rolagem vertical move a trilha de projetos na horizontal |
| Trajetória | Linha do tempo com traço que se preenche e itens deslocados em sentidos alternados |
| Contato | Halo em parallax e assinatura gigante em contra-movimento |

## Acessibilidade e responsividade

- `prefers-reduced-motion` desliga o smooth scroll, o parallax, o cursor
  customizado e as animações de entrada — a página continua completa e legível.
- Abaixo de 860px a seção de projetos deixa de ser horizontal e vira lista
  vertical; abaixo de 640px o parallax da grade de stack é desligado para os
  cartões não desalinharem.

## Editando o conteúdo

Textos, projetos, skills, idiomas e contatos ficam centralizados em
**`src/data/profile.js`**. Alterar ali atualiza todas as seções.

## Estrutura

```
index.html
src/
  main.jsx            entrada da aplicação
  App.jsx             composição das seções
  data/profile.js     todo o conteúdo do currículo
  lib/scroll.jsx      motor de scroll (Lenis + loop de rAF)
  hooks/              useParallax, useTrack, useReveal
  components/         Hero, Stack, Projects, Journey, Contact, ...
  styles/             global.css (tokens e base) e sections.css
```

## Publicação

O deploy é automático: a cada push no branch padrão, o workflow
`.github/workflows/deploy.yml` roda `npm ci && npm run build` e publica o
`dist/` no GitHub Pages.

- **Site:** https://mystic0112.github.io/Landpage-for-me/
- Para rodar o deploy manualmente: aba **Actions** → *Deploy no GitHub Pages* →
  *Run workflow*.

> **Passo único de ativação:** em **Settings → Pages → Build and deployment**,
> selecione *Source: GitHub Actions*. O token do Actions não tem permissão para
> criar o site do Pages sozinho, então essa primeira ativação é manual. Depois
> disso todo push no branch padrão publica automaticamente.

Como o `base` do Vite está em `./`, o build também funciona em Netlify, Vercel
ou qualquer hospedagem de arquivos estáticos, sem ajuste de caminhos.
