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

- `src/content.ts`: perfil, contatos, cases, experiência, tecnologias e configuração do chat.
- `src/App.tsx`: seções e interações.
- `src/components/ChatWidget.tsx`: botão flutuante e painel do chat.
- `src/styles.css`: direção visual, responsividade e movimento reduzido.
- `knowledge/*.md`: base de conhecimento do chat.
- `public/willian-dantas-curriculo.pdf`: currículo disponibilizado para download.

Os relatos seguem o currículo fornecido e não incluem métricas, depoimentos ou clientes inventados. As ilustrações são conceituais e não reproduzem arquiteturas internas. A página não utiliza formulário, rastreamento nem cookies próprios. O único backend é o chat, descrito abaixo. As fontes são carregadas pelo Google Fonts com fallback local.

## Chat com IA

O botão "Pergunte sobre mim" abre um assistente que responde sobre carreira, projetos e tecnologias.

- **Site:** envia `{ sessionId, message }` para um webhook do n8n, hospedado no Railway (`chat.endpoint` em `src/content.ts`). O widget só aparece depois da hidratação. O HTML pré-renderizado não muda.
- **n8n, workflow "Portfolio · Chat":**
  - Valida a entrada: mensagem de até 500 caracteres e `sessionId` UUID.
  - Aplica rate limit por IP (20/hora) e global (400/dia).
  - Responde com um AI Agent que usa Groq (`openai/gpt-oss-120b`) e cai para o Gemini Flash-Lite quando a Groq estoura o limite.
  - O agente tem memória no Postgres e busca vetorial no Supabase.
  - O CORS aceita `wd-portifolio.vercel.app` e o `npm run dev` local. As previews da Vercel ficam bloqueadas.
- **Supabase:**
  - `public.documents` guarda os chunks com embeddings Gemini de 3072 dimensões, consultados via `match_documents`.
  - `public.n8n_chat_histories` guarda as conversas.
  - `private.chat_requests` controla o rate limit e guarda o IP só com hash e salt.
  - Todas as tabelas têm RLS ligado e nenhuma policy, então a chave pública não acessa nada.
- **Privacidade:** as conversas ficam registradas, e o painel do chat avisa isso ao visitante.

### Atualizar a base de conhecimento

1. Edite ou crie arquivos em `knowledge/`. O primeiro `# ` é o título, e cada seção `## ` vira um trecho de busca que leva junto o título e a introdução do arquivo. Comentários HTML são ignorados.
2. Crie o `.env.local`, que fica fora do git, com:

   ```bash
   N8N_INGEST_URL=https://primary-production-9eb5e.up.railway.app/webhook/portfolio-ingest
   N8N_INGEST_SECRET=<o mesmo valor da credencial Header Auth no n8n>
   ```

3. Rode `npm run ingest`. O workflow "Portfolio · Ingest" apaga a base e reindexa todos os arquivos.

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
