# EVA — Energia Verde

Aplicação educativa em React 18, JavaScript/JSX, Vite, Tailwind 3.4, Lucide, Framer Motion e Recharts. Independente do Base44, sem login, backend, chaves ou APIs pagas.

## Executar

Requer Node.js 22+ e npm.

- npm install
- npm run dev
- Abra a URL Local mostrada pelo Vite.

Produção local: npm run build, seguido de npm run preview.

## Interface e navegação

A identidade visual e as dez páginas existentes foram preservadas.
Cabeçalho: Início, Energias renováveis, Sustentabilidade, Ferramentas (Comparador, Simulador e EVA Conecta), O movimento (Sobre, Kids e Atualiza) e Configurações.
Referências permanece no rodapé. Em telas até 850px, o menu compacto organiza os mesmos destinos por grupo.
Os menus funcionam por clique e teclado, fecham com Escape e clique fora; Escape devolve o foco ao botão. O menu Ferramentas e O movimento também permitem setas, Home e End.

## Idiomas e aparência

Configurações oferece Português do Brasil / English e Claro / Escuro.
As escolhas atualizam a aplicação sem recarregar ou descartar o estado das ferramentas, e são salvas em eva-preferences-v1 no LocalStorage.
O padrão é pt-BR e claro. Preferências inválidas usam os padrões; armazenamento indisponível gera aviso e mantém a escolha na sessão.
A inicialização no head aplica idioma e tema antes de carregar a aplicação, evitando flash de tema incorreto. O atributo lang e o título da página acompanham o idioma.

- src/i18n/index.js: assinatura reativa com useSyncExternalStore do React, tradução, interpolação, locale e persistência.
- src/i18n/locales/pt-BR.json e en.json: catálogos centralizados, com chaves textuais.
- src/styles.css: CSS original preservado, seguido do layout e dos tokens e variantes do tema escuro.

As traduções mantêm a geografia, as instituições, o contexto brasileiro, as unidades e a moeda BRL. Datas e números seguem o idioma. As pesquisas do Maps usam os termos brasileiros originais.
Os dados educativos em português e as fórmulas não foram reescritos.

## Biblioteca de imagens

public/assets/eva-logo.png e public/assets/ods-7.png são cópias dos dados PNG acessíveis dos anexos enviados nesta conversa, sem recriação.
Dimensões disponíveis: 2048x709 e 1600x1600. Não foram buscadas imagens externas.
A marca aparece no cabeçalho e rodapé; o ODS 7, no rodapé e na página Sobre.
src/config/assets.js centraliza os nomes. BrandMark, OdsMark e LocalImage preservam proporções e oferecem fallback se um arquivo falhar.
No tema escuro, um apoio claro mantém a marca original legível sem recolorir a imagem.

## Páginas e ferramentas

Início; Energias Renováveis (solar, eólica, hidrelétrica e biomassa); Comparador (oito critérios); Simulador EVA e análise preliminar de espaço; EVA Conecta; Sustentabilidade e checklist; EVA Kids; EVA Atualiza; Referências; Sobre.

O simulador mantém o modelo educativo: cidade apenas identifica o cenário; horas de sol pleno ajustáveis; 30 dias, desempenho 0,80, 6 m²/kWp e economia ilustrativa fixa de 80%. Não é um cálculo tarifário, projeto técnico ou proposta comercial. O retorno simples exclui juros, manutenção, degradação e reajustes.
O checklist mantém hábitos, categorias, progresso e sugestões por regras locais.
EVA Atualiza contém três resumos de notícias da EPE verificados em 09/11/2026, sem imagens de terceiros. Atualização manual em src/data/news.js.

## Estrutura

- src/pages: as dez páginas.
- src/components: layout, cabeçalho, componentes comuns, ilustração, gráfico e checklist.
- src/data: energias, hábitos, notícias e referências.
- src/config: navegação e imagens.
- src/lib/calculations.js: cálculos e premissas existentes.
- src/hooks: persistência das ferramentas.
- src/i18n: preferências e catálogos.
- tests: testes de regras, conteúdo traduzido e navegação.

## Testes

- npm test: nove testes de cálculos e cobertura dos catálogos.
- npx playwright install chromium: instala o navegador de testes.
- npm run test:e2e: suíte em computador, tablet e celular, com servidor temporário automático.
- npm run build: compila a versão estática em dist.

Os testes de navegador cobrem as dez rotas nos dois idiomas, temas, persistência, preservação de resultados ao mudar idioma, menus por teclado, clique fora, formulário solar, viabilidade, comparador, Maps, checklist, filtros, imagens e transbordamento horizontal. Capturas ficam em test-results (ignorado no versionamento).

## GitHub Pages

Não há publicação automática. Quando autorizada, gere dist e publique essa pasta pelo fluxo de Pages escolhido.
base './' e HashRouter permitem navegação em hospedagem estática e subdiretórios.

## Privacidade e acessibilidade

Preferências e dados das ferramentas ficam neste navegador. Google Fonts, Instagram, Maps e referências são serviços externos.
Fontes do sistema funcionam como fallback sem internet. Há rótulos, foco visível, navegação por teclado, atalho para conteúdo, avisos live e respeito ao movimento reduzido.

## Próximos conteúdos

Os textos originais do Base44 poderão substituir os educativos atuais quando forem fornecidos, com atualização correspondente dos dois catálogos.
O ambiente interativo próprio EVA Kids continua sendo uma etapa futura; a página atual é somente de apresentação, sem links fictícios.