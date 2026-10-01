# Revisão de compatibilidade e fonte única

## Alterações

- `reviews-3d.js`: todos os usos de `behavior: instant` substituídos por `auto`. Reposicionamentos suspendem e restauram `scroll-behavior` CSS, evitando animação incidental no retorno e no redimensionamento.
- `avaliacoes.json`: removido. Os seis artigos de `#avaliacoes` em `index.html` são a única fonte editorial dos cartões e do diálogo. Não há fetch, build ou dependência nova. O conteúdo continua disponível sem JavaScript.
- Orientações atualizadas em `LEIA-ME.md`, `CONTEUDO-REAL.md`, `ETAPA-2-AVALIACOES-3D.md` e `VERIFICACAO-3D.md`. Documentos antigos mantidos como histórico.

Autores, estrelas, trechos, fontes e todo o HTML são idênticos ao ZIP 3D anterior. Fotografias, folhas CSS, contatos, menu, galeria, mapa e os outros scripts também são idênticos. Os ZIPs anteriores foram preservados.

## Verificações executadas nesta revisão

Chrome desktop 154.0.8037.92, via automação Playwright, navegador instalado:

- 1024px: manual, sem overflow, leitura, foco, controles e reduced motion
- 1152px: manual, sem overflow, leitura, foco, controles e reduced motion
- 1199px: manual, sem overflow, leitura, foco, controles e reduced motion
- 1200px: manual, sem overflow, leitura, foco, controles e reduced motion
- 1280px: orbit, sem overflow, leitura, foco, controles e reduced motion
- 1366px: orbit, sem overflow, leitura, foco, controles e reduced motion

Mais 61 verificações de cena/modal, em Edge/Chromium: 320, 390, 768 e 1440px; abertura, fechamento, foco, pausa, órbita, preferência ao vivo, fonte Google independente, documento oculto simulado, cena fora da tela, alternância desktop/mobile e conteúdo sem JavaScript. Teste específico repetido para redimensionamento durante leitura e durante fechamento, incluindo acionador visível. Sintaxe JavaScript conferida.

## Testes manuais: status real

- **Chrome desktop: pendente.** Chrome foi encontrado e aberto, mas o controle pela interface foi interrompido automaticamente pela ferramenta porque ela não conseguiu identificar a URL atual com confiança suficiente para aplicar sua política. Não foram executadas ações posteriores pela interface. Os testes Chrome acima são automatizados, não manuais.
- **Chrome Android: pendente.** Não há aparelho Android ou sessão Chrome Android acessível neste ambiente.
- **Safari/iPhone: pendente.** Não há iPhone ou Safari acessível neste ambiente.
- **Faixa 1024–1366px: automatizada, concluída.** A validação manual da mesma faixa permanece pendente. Não usar emulação Chromium como prova de funcionamento no Safari/iPhone ou Chrome Android real.

Checklist para a validação manual nos navegadores reais: abrir as seis leituras; fechar com ×, Escape quando houver teclado e fundo; conferir retorno de foco e visibilidade; clicar fonte Google sem abrir o diálogo; pausar/retomar; hover/foco no desktop; swipe/toque nos móveis; ativar movimento reduzido; mudar orientação/tamanho com leitura aberta e durante retorno; conferir menu, filtros, lightbox, mapa e contatos. Verificar em especial 1024, 1200, 1280 e 1366px.

Nenhuma publicação foi realizada. Não foi revalidada a disponibilidade externa dos serviços nem medido consumo de GPU/bateria em aparelhos reais.
