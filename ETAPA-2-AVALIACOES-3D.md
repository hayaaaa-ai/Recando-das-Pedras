# Etapa 2 — avaliações com CSS 3D

Base: `recanto-das-pedras-animacoes-2d.zip`. HTML, CSS e JavaScript nativo, sem instalação ou build. ZIP de origem preservado. Nenhuma publicação.

## Alterações

- `reviews-3d.css`: identidade existente, cena elíptica, planos de profundidade e diálogo. Estilos limitados a `#avaliacoes`.
- `reviews-3d.js`: seis artigos originais envolvidos por camadas independentes de órbita, inclinação e destaque; relógio único baseado no tempo; leitura com diálogo nativo.
- `index.html`: apenas referências aos dois novos arquivos. Nenhum texto, foto ou link original foi alterado.
- `evolution.js`: retirado o antigo controlador de autoplay das avaliações, evitando eventos e reprodução duplicados. Contador, filtros, mapa e parallax mantidos.
- `LEIA-ME.md`: orientação atualizada. Os documentos da etapa 1 permanecem como histórico daquela entrega.

## Funcionamento

Em telas a partir de 1200px, quando a área interna tem pelo menos 1080px, as seis avaliações orbitam em setores espaçados de uma elipse. Profundidade e inclinações são pequenas, e a variação de velocidade é limitada para preservar o espaçamento. Um vizinho aguarda antes de alcançar um cartão pausado. O movimento não usa física, blur contínuo ou bibliotecas.

Hover e foco pausam o cartão. O botão “Pausar movimento” interrompe toda a cena; “Retomar movimento” reinicia. Clique, Enter, espaço ou “Ler este trecho” abrem a leitura e interrompem todas as órbitas. O cartão é representado no diálogo com uma cópia visual que se desloca e amplia; o artigo original permanece no mesmo lugar, temporariamente invisível. A órbita, fase e inclinação são preservadas até o fechamento.

Feche por ×, Escape ou clique no fundo. O movimento volta da fase salva e o foco retorna ao acionador. Enquanto esse acionador estiver focado ou sob o mouse, seu próprio cartão continua pausado. Ao redimensionar durante a leitura, o retorno acompanha a geometria atual e mantém o acionador visível.

Nas áreas menores, a lista é um carrossel manual com setas, teclado e swipe. Não há autoplay. Com movimento reduzido, a lista se torna uma grade estática e a leitura abre/fecha sem transição. A preferência é acompanhada com a página aberta. Sem JavaScript, os seis artigos, fontes, reputação e links permanecem no HTML; os controles de melhoria ficam ocultos pelo fallback já existente.

O relógio da órbita para com a cena fora da viewport, documento oculto, pausa ou diálogo aberto. As dimensões são lidas ao redimensionar, não a cada quadro. O retorno modal utiliza uma transição finita nativa de 420ms; entrada de 500ms. Redimensionamentos não criam novos ciclos de órbita.

## Conteúdo e manutenção

O projeto contém **trechos**, não avaliações completas. O diálogo mostra exatamente os textos disponíveis, sem inventar, completar ou reescrever comentários. O link do Google continua independente e abre somente a fonte.

Edite autores, estrelas, comentários e fontes nos seis `<article class="review-card">` da seção `#avaliacoes` de **`index.html`**. A cena e o diálogo leem esses artigos, sem cópia editorial separada. Nota, contagem e data ficam em `config.js`, com fallback correspondente no HTML.

Fotografias, contatos, menus, galeria, lightbox, reputação e destinos Google/WhatsApp/Instagram continuam os da versão 2D. As animações anteriores fora das avaliações foram preservadas.

## Verificações

Consulte `VERIFICACAO-3D.md` para o resultado desta etapa e limites dos testes. `VERIFICACAO.md` e `ETAPA-1-ANIMACOES.md` registram as versões anteriores.

## Ajuste posterior

`behavior: auto` substitui `instant`. Nos reposicionamentos, a suavização CSS é suspensa apenas durante a operação e imediatamente restaurada, evitando trajetórias involuntárias. `avaliacoes.json` foi removido: autores, estrelas, trechos e fontes são mantidos exclusivamente no HTML, usado pela cena e pela leitura. Documentos da etapa 1 descrevem o estado histórico daquela entrega.
