# Recanto das Pedras — site atualizado

Evolução do site existente, mantendo a identidade oliva, creme e dourado, a tipografia editorial e a estrutura estática. Recanto das Pedras é o protagonista; o Peruaçu é o entorno.

## Pré-visualizar e publicar

Abra `index.html` no navegador. Para um servidor local, execute `python -m http.server 8080` nesta pasta e abra `http://localhost:8080`.

Publique o conteúdo inteiro desta pasta em uma hospedagem estática, com `index.html` na raiz e `assets/` preservado. Não há instalação, build, CMS, chave de API ou banco de dados. A entrega é local; nenhum site público foi publicado. Quando houver domínio definitivo, acrescente canonical e og:url no HTML.

## O que mudou

- Hero com fotografia real da varanda e identificação explícita de pousada e restaurante.
- Hospedagem com quarto real; gastronomia com mesa, bolo e quitandas fotografados pelo proprietário.
- Galeria com oito fotografias, categorias, lightbox fullscreen e teclado.
- Instagram integrado com fotografia do acervo Google, sem simular posts ou feed.
- Nota 4,7/5 e 322 avaliações, consultadas em 30/09/2026; seis trechos públicos reais, agora com órbita CSS 3D em telas amplas e leitura acessível.
- Contadores, estrelas proporcionais, entradas suaves, máscaras de imagem e profundidade sutil na gastronomia.
- Avaliações com pausa por hover/foco, diálogo de leitura, pausa global, carrossel manual no celular e grade estática com movimento reduzido.
- Mapa real do estabelecimento, carregado somente após clique.

## Manutenção

- `config.js`: contatos, destinos, mensagens, nota, contagem e data. Atualize também o fallback no HTML.
- Avaliações: fonte única nos seis artigos da seção `#avaliacoes` em `index.html`; não há arquivo JSON duplicado.
- `index.html`: copy, imagens, cards e links disponíveis sem JavaScript.
- `styles.css`, `refinements.css`, `navigation.css`: base visual e refinamentos anteriores.
- `evolution.css`: novos blocos e acabamento responsivo.
- `script.js`: menu, animações, contatos, créditos e lightbox.
- `evolution.js`: reputação, filtros, mapa e parallax do entorno.
- `reviews-3d.css` e `reviews-3d.js`: cena de avaliações, navegação manual e diálogo de leitura.
- `assets/fontes-fotos.json`: autoria, origem, idade do acervo e variantes locais.

WhatsApp: (38) 99219-6283. Instagram: @pousadarecantodaspedrasperuacu. Place ID completo conferido: ChIJ86xlVMSSVgcReCfTFLMCYMY. Não substituir pelo ID truncado fornecido inicialmente.

## Conteúdo e performance

Consulte `CONTEUDO-REAL.md` para fontes e limites dos registros. Não foram inventados hóspedes, depoimentos, preços, horários, cardápio ou nomes de quartos.

Fotografias WebP locais, tamanhos responsivos, lazy loading, prioridade no hero e fontes do sistema. Sem bibliotecas de animação. No celular, sem tilt interativo; movimento reduzido remove órbitas e parallax. Sem JavaScript, conteúdo, reputação, rolagem manual dos relatos e links continuam disponíveis; filtros e controles aprimorados ficam ocultos.

Sem analytics ou coleta própria. O mapa consulta o Google somente após solicitação. Links externos abrem os respectivos serviços; WhatsApp não confirma reservas nem envia mensagens automaticamente.

## Verificação

Leia `VERIFICACAO.md` e `AUDITORIA-DE-LINKS.md`. Fotos recentes, comodidades, horários e cardápio podem ser acrescentados quando confirmados.

## Etapa 1 de animações 2D

Esta entrega refina os movimentos existentes sem alterar a estrutura do site. Leia `ETAPA-1-ANIMACOES.md` para os seis arquivos alterados, efeitos e verificações. Nenhuma publicação foi realizada.

## Etapa 2 — avaliações CSS 3D

Versão atual: órbita somente em telas com espaço suficiente; seis relatos originais, fontes independentes e diálogo de leitura. Nenhuma biblioteca adicionada. Leia `ETAPA-2-AVALIACOES-3D.md` e `VERIFICACAO-3D.md` para funcionamento, manutenção e testes.
