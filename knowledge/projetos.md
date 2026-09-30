# Projetos e cases profissionais de Willian Dantas

Os cases do portfólio são anonimizados: não citam clientes, métricas ou arquiteturas internas.

## Case 01: IA conversacional ("Da conversa à ação")

Agentes conectados a ferramentas, conhecimento e regras de negócio, da arquitetura à operação em contas enterprise.

- Contexto: jornadas corporativas precisam combinar conversas naturais, regras determinísticas e ações em sistemas externos.
- Contribuição do Willian: arquitetura e operação de agentes, engenharia de system prompts, configuração de ferramentas e handoffs com preservação de contexto.
- Aplicação: atuação em crédito e cobrança, seguros, saneamento, varejo e farmacêutico, do discovery ao acompanhamento em produção.
- Temas: multi-agente, RAG, tool calling.
- Stack: OpenAI SDK, MCP, Zod, APIs REST.

## Case 02: Automação e integrações ("Sistemas diferentes. Uma só jornada.")

Workflows que aproximam agentes, back-ends e APIs corporativas para viabilizar jornadas de ponta a ponta.

- Contexto: jornadas de pagamento, confirmação de identidade e negociação atravessam diferentes sistemas e plataformas corporativas.
- Contribuição do Willian: construção de automações em n8n e integrações com back-ends de clientes e APIs de terceiros, conectadas aos fluxos conversacionais.
- Aplicação: integrações com plataformas de cobrança e serviços corporativos, além de skills e templates reutilizáveis para padronizar a construção de jornadas.
- Temas: n8n, APIs REST, webhooks.
- Stack: n8n, Node.js, TypeScript, webhooks.

## Case 03: Dados e observabilidade ("Visibilidade para evoluir.")

Logs, conversas e ferramentas de diagnóstico transformados em contexto para entender e melhorar a operação.

- Contexto: entender o comportamento de uma jornada exige cruzar o que aconteceu na conversa com os eventos dos sistemas que a sustentam.
- Contribuição do Willian: diagnóstico forense em Datadog, análise de conversas no BigQuery e desenvolvimento de ferramentas internas de inspeção de bots e variáveis.
- Aplicação: dashboard de jornada em Next.js, extensões Chrome e relatórios operacionais em Apache Superset para apoiar o diagnóstico e orientar a evolução dos fluxos.
- Temas: Datadog, BigQuery, Next.js.
- Stack: Datadog, BigQuery, Apache Superset, Next.js.

## Como um agente funciona, segundo o portfólio

O portfólio mostra um agente em cinco etapas:

1. Contexto (input): toda boa conversa começa com contexto, ou seja, intenção, histórico e regras de negócio.
2. Conhecimento (RAG): RAG e memória conectam o agente ao conhecimento necessário para cada jornada.
3. Agente (reasoning): system prompts e orquestração transformam contexto em decisões e próximos passos.
4. Ferramentas (tool calling): APIs, MCP e workflows permitem que a conversa execute ações nos sistemas.
5. Handoff (routing): o contexto acompanha a conversa quando outro agente assume uma etapa especializada.
