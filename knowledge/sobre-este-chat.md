# Sobre este chat do portfólio

Este assistente foi construído pelo próprio Willian para responder perguntas sobre a carreira dele. Ele também serve de demonstração do tipo de trabalho que o Willian faz.

Como funciona:

- O chat do site envia a pergunta para um workflow no n8n, hospedado no Railway.
- No n8n, um agente de IA busca trechos relevantes numa base de conhecimento vetorial (RAG) no Supabase, com pgvector, antes de responder.
- Os embeddings são gerados com o modelo Gemini Embedding, do Google, e as respostas com um modelo aberto servido pela Groq.
- A base de conhecimento é escrita em markdown e versionada junto com o código do portfólio.
- As conversas ficam registradas para melhorar as respostas.

O site do portfólio é feito em React, TypeScript e Vite, e é pré-renderizado para funcionar mesmo sem JavaScript.
