export const profile = {
  name: "Willian Dantas",
  role: "AI / Agent Engineer",
  email: "danielwillian532@gmail.com",
  phone: "(11) 91248-2962",
  phoneHref: "tel:+5511912482962",
  linkedin: "https://www.linkedin.com/in/willian-dantas-092b8b215/",
  github: "https://github.com/WillDant",
  resume: "/willian-dantas-curriculo.pdf",
};

export const chat = {
  endpoint:
    "https://primary-production-9eb5e.up.railway.app/webhook/portfolio-chat",
  maxLength: 500,
  welcome:
    "Oi! Sou o assistente do Willian. Pergunte sobre a carreira, os projetos ou as tecnologias com que ele trabalha.",
  suggestions: [
    "O que você faz na Fintalk?",
    "Com quais tecnologias trabalha?",
    "Me conta sobre um projeto",
    "Como falar com você?",
  ],
};

export const agentNodes = [
  {
    id: "context",
    label: "Contexto",
    tag: "01 / INPUT",
    x: 5.95,
    y: 39,
    description:
      "Toda boa conversa começa com contexto: intenção, histórico e regras de negócio.",
  },
  {
    id: "knowledge",
    label: "Conhecimento",
    tag: "02 / RAG",
    x: 23.1,
    y: 17.3,
    description:
      "RAG e memória conectam o agente ao conhecimento necessário para cada jornada.",
  },
  {
    id: "agent",
    label: "Agente",
    tag: "03 / REASONING",
    x: 50,
    y: 9.1,
    description:
      "System prompts e orquestração transformam contexto em decisões e próximos passos.",
  },
  {
    id: "tools",
    label: "Ferramentas",
    tag: "04 / TOOL CALLING",
    x: 76.9,
    y: 17.3,
    description:
      "APIs, MCP e workflows permitem que a conversa execute ações nos sistemas.",
  },
  {
    id: "handoff",
    label: "Handoff",
    tag: "05 / ROUTING",
    x: 94.05,
    y: 39,
    description:
      "O contexto acompanha a conversa quando outro agente assume uma etapa especializada.",
  },
] as const;

export const cases = [
  {
    id: "agentes",
    number: "01",
    category: "IA CONVERSACIONAL",
    title: "Da conversa\nà ação.",
    description:
      "Agentes conectados a ferramentas, conhecimento e regras de negócio. Da arquitetura à operação em contas enterprise.",
    tags: ["Multi-agente", "RAG", "Tool calling"],
    context:
      "Jornadas corporativas precisam combinar conversas naturais, regras determinísticas e ações em sistemas externos.",
    contribution:
      "Arquitetura e operação de agentes, engenharia de system prompts, configuração de ferramentas e handoffs com preservação de contexto.",
    application:
      "Atuação em crédito e cobrança, seguros, saneamento, varejo e farmacêutico, do discovery ao acompanhamento em produção.",
    stack: ["OpenAI SDK", "MCP", "Zod", "APIs REST"],
  },
  {
    id: "integracoes",
    number: "02",
    category: "AUTOMAÇÃO & INTEGRAÇÕES",
    title: "Sistemas diferentes.\nUma só jornada.",
    description:
      "Workflows que aproximam agentes, back-ends e APIs corporativas para viabilizar jornadas de ponta a ponta.",
    tags: ["n8n", "APIs REST", "Webhooks"],
    context:
      "Jornadas de pagamento, confirmação de identidade e negociação atravessam diferentes sistemas e plataformas corporativas.",
    contribution:
      "Construção de automações em n8n e integrações com back-ends de clientes e APIs de terceiros, conectadas aos fluxos conversacionais.",
    application:
      "Integrações com plataformas de cobrança e serviços corporativos, além de skills e templates reutilizáveis para padronizar a construção de jornadas.",
    stack: ["n8n", "Node.js", "TypeScript", "Webhooks"],
  },
  {
    id: "observabilidade",
    number: "03",
    category: "DADOS & OBSERVABILIDADE",
    title: "Visibilidade para\nevoluir.",
    description:
      "Logs, conversas e ferramentas de diagnóstico transformados em contexto para entender e melhorar a operação.",
    tags: ["Datadog", "BigQuery", "Next.js"],
    context:
      "Entender o comportamento de uma jornada exige cruzar o que aconteceu na conversa com os eventos dos sistemas que a sustentam.",
    contribution:
      "Diagnóstico forense em Datadog, análise de conversas no BigQuery e desenvolvimento de ferramentas internas de inspeção de bots e variáveis.",
    application:
      "Dashboard de jornada em Next.js, extensões Chrome e relatórios operacionais em Superset para apoiar o diagnóstico e orientar a evolução dos fluxos.",
    stack: ["Datadog", "BigQuery", "Apache Superset", "Next.js"],
  },
];

export const experience = [
  {
    company: "Fintalk",
    role: "Forward Deployed / AI Engineer",
    period: "SET 2025 — ATUAL",
    current: true,
    description:
      "Ponto focal técnico em contas enterprise de cinco setores. Arquitetura de agentes, integrações corporativas e acompanhamento da operação, do discovery à produção.",
  },
  {
    company: "Macro Digital Sales",
    role: "Chatbot Developer",
    period: "ABR 2024 — AGO 2025",
    current: false,
    description:
      "Desenvolvimento e evolução de chatbots, regras de mensageria, validação de entradas e mapeamento de jornadas com os times de BI e dados. Versionamento em Git e trabalho com Scrum e Kanban.",
  },
];

export const technologies = [
  {
    title: "Inteligência artificial",
    items: [
      "Arquitetura multi-agente",
      "System prompts",
      "Tool calling",
      "RAG",
      "MCP",
      "OpenAI SDK",
      "Zod",
    ],
  },
  {
    title: "Automação & dados",
    items: [
      "n8n",
      "APIs REST",
      "Webhooks",
      "BigQuery",
      "Datadog",
      "Apache Superset",
      "SQL",
    ],
  },
  {
    title: "Desenvolvimento",
    items: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "React",
      "Next.js",
      "Python",
      "Git",
      "Docker",
    ],
  },
];

export const labProjects = [
  {
    id: "grxfut",
    repo: "WillDant/grxfut",
    url: "https://github.com/WillDant/grxfut",
    language: "TypeScript",
    label: "LAB / 01 · GESTÃO DE FUTEBOL",
    title: "O fut do grupo,\nsem planilha.",
    description:
      "Webapp que organiza o futebol semanal: próximo jogo, confirmação de presença, pagamentos via PIX, caixa do grupo e sorteio de times equilibrado por tier.",
    tags: ["Next.js", "Drizzle", "Neon Postgres"],
    footnote: "PRESENÇA → PIX → SORTEIO",
  },
  {
    id: "forma",
    repo: "WillDant/Forma",
    url: "https://github.com/WillDant/Forma",
    language: "TypeScript",
    label: "LAB / 02 · INTERIORES COM IA",
    title: "Da planta\nà maquete.",
    description:
      "Editor local de interiores com planta 2D, maquete 3D e chat conectado ao Codex. Cada pedido vira uma operação validada e uma nova versão da cena.",
    tags: ["React Three Fiber", "Fastify", "Codex"],
    footnote: "PLANTA 2D → MAQUETE 3D → VERSÕES",
  },
];
