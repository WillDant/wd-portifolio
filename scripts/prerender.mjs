import { readFile, writeFile, rm } from "node:fs/promises";
import { render } from "../dist-ssr/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
await writeFile(
  "dist/index.html",
  template.replace("<!--app-html-->", render()),
);
await rm("dist-ssr", { recursive: true, force: true });
console.log("Página pré-renderizada: conteúdo disponível antes do JavaScript.");
