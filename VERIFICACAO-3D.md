# Verificação — avaliações CSS 3D

Verificado localmente em 01/10/2026 com Microsoft Edge/Chromium e Playwright. 363 verificações registradas nos conjuntos abaixo, além de testes específicos de retorno durante redimensionamento e leitura Enter/Escape. Nenhuma publicação realizada.

| Conjunto | Verificações |
| --- | ---: |
| Cena, modal, fases, pausa, teclado e modos | 61 |
| Regressão da interface 2D | 110 |
| Auditoria de 45 links | 167 |
| Hero, entradas e cancelamento da galeria | 6 |
| Swipe, toque, carrossel manual e hero móvel | 5 |
| Integridade de conteúdo, links e ativos | 5 |
| Seis cartões, fontes e preferência durante transições | 9 |

## Conferido

- 320, 390, 768 e 1440px: modos apropriados ao espaço, sem rolagem horizontal na página; textos e controles dentro dos painéis.
- Desktop: relógio avança; pausa global, hover e foco; texto central; seis cartões e reputação preservados.
- Leitura: Enter, espaço, botão e clique; fechamento por ×, Escape e fundo; foco contido, retorno de foco, posição e inclinação restauradas; todas as órbitas interrompidas durante leitura.
- Seis cartões: autores e trechos idênticos à origem; sem conteúdo inventado, sem truncamento na leitura; cada fonte Google abre independentemente do diálogo.
- Movimento reduzido inicial e alterado com página aberta: grade estática; transições de abertura/fechamento canceladas; retorno imediato e pausa manual preservada.
- Desktop/mobile: alternância sem novos ciclos ou eventos; troca durante leitura e durante fechamento; acionador retorna visível, inclusive após mudança da geometria.
- Cena fora da tela interrompe o movimento. Documento oculto verificado com propriedade e evento de visibilidade simulados, depois restaurados.
- Toque em contexto móvel emulado: swipe sem abrir diálogo, toque abre/fecha e carrossel permanece manual após oito segundos. Hero móvel estável.
- Menu, Escape, galeria com cinco categorias, grid sem lacunas, lightbox, suas setas e retorno de foco, créditos, links internos, mapa e contatos mantidos.
- Sem JavaScript: seis relatos e fontes, oito fotos e todos os destinos permanecem disponíveis. Texto a 200% sem rolagem horizontal.
- Comparação do HTML: textos, autores, estrelas, notas, comentários, 45 links com atributos, fotos e créditos originais preservados. Todos os ativos, configuração e quatro folhas CSS anteriores são idênticos ao ZIP de entrada. O inventário JSON foi removido no ajuste posterior, mantendo o HTML como fonte única. `script.js` também permanece idêntico.
- Sintaxe JavaScript conferida; sem erros de execução ou recursos locais ausentes nos testes.
- Revisão independente identificou e validou a correção dos dois casos de redimensionamento. Uma camada transparente que interceptava cliques na cena foi corrigida; teste completo e fontes dos seis cartões conferidos após a correção.

## Limites

Testes executados no Edge/Chromium, com larguras e toque emulados. Não foram testados aparelhos físicos, Safari/Firefox, consumo real de GPU/bateria ou Lighthouse. Links externos foram abertos com destinos capturados, sem executar mensagens, reservas ou avaliações; disponibilidade dos serviços externos não foi revalidada. Dados e textos são os da versão 2D, com sua data de consulta original. A órbita usa RAF próprio único; os efeitos 2D anteriores mantêm seus controladores separados.

O ZIP 2D original conserva SHA-256 `89a12c8e44447a531535ae709552e11193beedfe99e4980cad3d91a15679403e`. Os relatórios detalhados desta etapa estão em `work/` no workspace; o pacote contém apenas o site, ativos e documentação.

## Revisão posterior de compatibilidade

Leia `REVISAO-COMPATIBILIDADE.md` para os testes novos, a fonte única no HTML e os testes manuais pendentes. A contagem acima registra a entrega inicial 3D.
