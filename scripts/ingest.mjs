import { readdir, readFile } from "node:fs/promises";

const { N8N_INGEST_URL, N8N_INGEST_SECRET } = process.env;
if (!N8N_INGEST_URL || !N8N_INGEST_SECRET) {
  console.error("Defina N8N_INGEST_URL e N8N_INGEST_SECRET no .env.local.");
  process.exit(1);
}

const dir = new URL("../knowledge/", import.meta.url);
const files = (await readdir(dir)).filter((file) => file.endsWith(".md")).sort();

const documents = [];
for (const file of files) {
  const content = (await readFile(new URL(file, dir), "utf8"))
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!content) continue;
  const title = content.match(/^#\s+(.+)$/m)?.[1].trim() ?? file;
  documents.push({ source: file, title, content });
}

const response = await fetch(N8N_INGEST_URL, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-ingest-secret": N8N_INGEST_SECRET,
  },
  body: JSON.stringify({ documents }),
});
const body = await response.text();
if (!response.ok) {
  console.error(`Falha na ingestão (${response.status}): ${body}`);
  process.exit(1);
}
console.log(`${documents.length} arquivos enviados: ${body}`);
