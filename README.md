# Willian Dantas · Portfólio

Página pessoal em português com cases anonimizados de engenharia de agentes, integrações e observabilidade. React, TypeScript e Vite, com ilustrações SVG próprias e animações CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
npm run preview
```

O build executa a verificação TypeScript e pré-renderiza a página completa em `dist/index.html`. O diretório `dist` pode ser servido em qualquer hospedagem estática. O conteúdo principal fica disponível mesmo sem JavaScript. O seletor de nós, o menu mobile e a cópia de email precisam de JavaScript; os cases usam o elemento nativo `details`.

## Conteúdo e personalização

- `src/content.ts`: perfil, contatos, cases, experiência e tecnologias.
- `src/App.tsx`: seções e interações.
- `src/styles.css`: direção visual, responsividade e movimento reduzido.
- `public/willian-dantas-curriculo.pdf`: currículo disponibilizado para download.

Os relatos seguem o currículo fornecido e não incluem métricas, depoimentos ou clientes inventados. As ilustrações são conceituais e não reproduzem arquiteturas internas. A página não utiliza formulário, rastreamento, cookies próprios ou backend. As fontes são carregadas pelo Google Fonts com fallback local.

## Referências visuais

- [Portfólios do 21st.dev](https://21st.dev/community/components/explore/portfolio-website-templates): composição e apresentação de trabalhos.
- [Unlumen UI no 21st.dev](https://21st.dev/blog/unlumen-ui-components): navegação com indicador e movimento que responde à interação.

Os componentes foram implementados neste projeto, sem dependência de acesso ao catálogo pago. A animação do sistema usa SVG e CSS, sem WebGL. A preferência `prefers-reduced-motion` desativa animações e rolagem suave.

## Verificações realizadas

- Build de produção e verificação TypeScript concluídos.
- Revisão visual em 1440 × 900, 1280 × 720, 768 × 1024, 390 × 844 e 320 × 740, sem rolagem horizontal.
- Seleção dos cinco nós, abertura dos três cases e navegação entre seções.
- Menu mobile, fechamento com Escape e retorno de foco ao botão.
- Cases operados por teclado, cópia de email e download do currículo.
- Build pré-renderizado com conteúdo e cases nativos funcionando em uma cópia sem scripts.
- Interação após a hidratação do build, sem erros ou avisos no console.
- Regras de movimento reduzido presentes no CSS final; preferência do sistema não emulada nesta revisão.

O PDF publicado foi comparado por hash com o arquivo original e está idêntico. Os endereços de contato seguem o currículo; email e telefone não foram acionados para enviar mensagens ou iniciar chamadas.

Antes de publicar em um domínio definitivo, configurar uma URL absoluta para a imagem social e adicionar uma URL canônica. `public/social-preview.svg` é a arte base e `public/social-preview.png` é a versão de compartilhamento. Publicação não foi realizada nesta etapa.
