# Etapa 1 — animações 2D

Base: `recanto-das-pedras 2.zip` fornecido pelo usuário. Nenhuma publicação realizada. Projeto mantém HTML, CSS e JavaScript puro, sem bibliotecas novas.

## Arquivos alterados

- `index.html`: enquadramento interno da foto de hospedagem, mantendo legenda e selo fora do zoom; entradas individuais dos cartões de avaliações e barra de controles.
- `styles.css`: entrada existente refinada para fade e deslocamento vertical de 16px, com duração de 600ms.
- `refinements.css`: sequência única do hero, com título em linhas, descrição e ações; 600ms e deslocamento de 18px. Removidas sobreposições e diferenças de duração. Profundidade anterior preservada.
- `evolution.css`: cascata de 80ms entre experiências, zoom de 2,5% em fotografias, microinterações de cor/setas, cartões com entrada de 550ms e destaque discreto. Transições novas/refinadas entre 240 e 650ms.
- `script.js`: aproveita o observador existente; entradas uma vez, conteúdo focado aparece imediatamente e mudança de movimento reduzido finaliza as entradas sem escondê-las ou repetir o hero.
- `evolution.js`: troca de categoria com rearranjo imediato e animação de grupo de 240ms; cancelamento de transições em cliques rápidos e na mudança de reduced motion. Contador existente ajustado para 700ms. Carrossel e mapa preservados.

`navigation.css`, `config.js`, `avaliacoes.json` e todos os ativos permanecem idênticos ao original. Textos, imagens, metadados das fotos, créditos e os 45 links/atributos foram comparados e preservados.

Sem React, Three.js, GSAP, migração ou novos movimentos contínuos. Os efeitos anteriores de profundidade, parallax e atmosfera permanecem; não foram ampliados. No celular, fotografia do hero estável. Sem JavaScript, conteúdo, fotografias, links e navegação continuam disponíveis.

## Verificações

324 verificações passaram. Edge/Chromium em 320, 390, 768 e 1440px, teclado e contexto móvel com toque. Menu, filtros, lightbox, restauração de foco, créditos, setas, pausa, swipe, autoplay, mapa sob demanda, links, reduced motion inicial e alterado com a página aberta, e conteúdo sem JavaScript.

Geometria das nove seções, fotografia e grids comparada com o original nas quatro larguras: diferença inferior a 1px. Layout shift observado na entrada inicial do hero: zero. Nenhum erro JavaScript ou recurso local ausente. A troca de filtros muda naturalmente a altura do conjunto conforme a quantidade de fotos; itens ocultos não deixam lacunas.

Os cliques externos foram conferidos em abas com destino capturado, sem envio de mensagens, reservas ou avaliações. O carregamento do iframe foi validado com resposta de teste; o endereço externo do mapa permaneceu intacto. Não foi realizado novo teste de disponibilidade dos serviços externos, nem teste em aparelhos físicos ou auditoria Lighthouse.

## Usar

Abra `index.html` ou sirva a pasta por uma hospedagem estática/local. Não há instalação ou build. O ZIP inclui todas as fotografias. A documentação anterior de conteúdo continua em `CONTEUDO-REAL.md`.
