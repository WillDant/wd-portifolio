import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  Braces,
  Check,
  ChevronDown,
  CircleDot,
  Copy,
  Database,
  Download,
  GitBranch,
  Github,
  Globe2,
  Linkedin,
  Menu,
  Network,
  Terminal,
  Waypoints,
  X,
} from "lucide-react";
import {
  agentNodes,
  cases,
  experience,
  labProjects,
  profile,
  technologies,
} from "./content";
import { ChatWidget } from "./components/ChatWidget";
import { Globe } from "./components/ui/cobe-globe";
import type { Arc, Marker } from "./components/ui/cobe-globe";

const navigation = [
  { id: "projetos", label: "Projetos" },
  { id: "lab", label: "Lab" },
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
];
const icons = [AudioLines, Database, Network, Braces, GitBranch];

const saoPaulo: [number, number] = [-23.5505, -46.6333];
const globeMarkers: Marker[] = [
  { id: "sp", location: saoPaulo, label: "São Paulo · Base" },
  { id: "nyc", location: [40.7128, -74.006] },
  { id: "lis", location: [38.7223, -9.1393] },
  { id: "lon", location: [51.5074, -0.1278] },
  { id: "sf", location: [37.7749, -122.4194] },
];
const globeArcs: Arc[] = [
  { id: "sp-nyc", from: saoPaulo, to: [40.7128, -74.006] },
  { id: "sp-lis", from: saoPaulo, to: [38.7223, -9.1393] },
  { id: "sp-lon", from: saoPaulo, to: [51.5074, -0.1278] },
  { id: "sp-sf", from: saoPaulo, to: [37.7749, -122.4194] },
];
// Órbita contínua Contexto → Handoff (viewBox 640x660, centro 320,360, r 300)
const orbitPath = "M38.1 257.4A300 300 0 0 1 601.9 257.4";
const globeBase: [number, number, number] = [0.16, 0.18, 0.12];
const globeAccent: [number, number, number] = [0.9, 1, 0.53];
const globeGlow: [number, number, number] = [0.18, 0.21, 0.12];

function useReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("will-reveal"));
    };
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="header">
      <div className="header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="Willian Dantas, início"
          onClick={() => setOpen(false)}
        >
          <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#111210" />
            <path
              d="M12 24l6 20 7-13 7 13 6-20m12-10v30h-6a10 10 0 1 1 6-18"
              fill="none"
              stroke="#e6ff88"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="brand-caption">
            WILLIAN
            <br />
            DANTAS
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.id}
              className={active === item.id ? "active" : ""}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contato">
          Vamos conversar <ArrowUpRight size={16} />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        aria-label="Navegação mobile"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        inert={!open}
      >
        {navigation.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
            <span>0{i + 1}</span>
            {item.label}
            <ArrowUpRight size={20} />
          </a>
        ))}
        <a href="#contato" onClick={() => setOpen(false)}>
          <span>0{navigation.length + 1}</span>Contato
          <ArrowUpRight size={20} />
        </a>
      </nav>
    </header>
  );
}

function AgentSystem() {
  const [selected, setSelected] = useState(2);
  const node = agentNodes[selected];
  return (
    <div className="agent-system">
      <div className="system-topline">
        <span>
          <i className="status-dot" /> SISTEMA DE AGENTES
        </span>
        <span>FIG. 001</span>
      </div>
      <div className={`system-canvas selected-${node.id}`}>
        <div className="system-glow" />
        <div className="system-globe">
          <Globe
            markers={globeMarkers}
            arcs={globeArcs}
            baseColor={globeBase}
            markerColor={globeAccent}
            arcColor={globeAccent}
            glowColor={globeGlow}
            dark={1}
            diffuse={1.2}
            mapBrightness={6}
            markerSize={0.03}
            markerElevation={0.02}
            arcWidth={0.6}
            arcHeight={0.3}
            speed={0.0025}
            theta={0.25}
          />
        </div>
        <svg
          className="system-wires"
          viewBox="0 0 640 660"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="outer-orbit"
            cx="320"
            cy="360"
            r="300"
            stroke="currentColor"
            strokeDasharray="2 12"
          />
          <path
            className="network-lines"
            d={orbitPath}
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <g
            className="network-flow"
            stroke="currentColor"
            strokeLinecap="round"
          >
            <path className="flow-glow" d={orbitPath} pathLength={100} />
            <path className="flow-trail" d={orbitPath} pathLength={100} />
            <path className="flow-head" d={orbitPath} pathLength={100} />
          </g>
          <path d="M30 620h16m-8-8v16M594 620h16m-8-8v16" stroke="#777b6d" />
          <text
            x="23"
            y="652"
            fill="#73776b"
            fontSize="9"
            fontFamily="monospace"
          >
            CTX / 01
          </text>
        </svg>
        {agentNodes.map((item, i) => {
          const Icon = icons[i];
          return (
            <button
              key={item.id}
              className={`agent-node ${i === 2 ? "core-node" : ""} ${item.y < 30 && i !== 2 ? "label-above" : ""} ${selected === i ? "is-selected" : ""}`}
              style={
                {
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  "--i": i,
                } as CSSProperties
              }
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              aria-label={`Explorar ${item.label}`}
              aria-describedby="system-description"
            >
              <span className="node-icon">
                <Icon size={i === 2 ? 26 : 19} strokeWidth={1.4} />
              </span>
              <span className="node-label">{item.label}</span>
            </button>
          );
        })}
        <span className="orbit-caption">INTELIGÊNCIA CONECTADA</span>
      </div>
      <div
        className="system-description"
        id="system-description"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="mono">{node.tag}</span>
        <p key={node.id}>{node.description}</p>
      </div>
      <div className="system-hint">
        <span className="tiny-cross">+</span> Explore os nós da rede{" "}
        <span>MODELO CONCEITUAL</span>
      </div>
    </div>
  );
}

// Usuário → Orquestrador, depois Orquestrador → RAG / Tools / Especialista
const miniPaths = [
  "M92 164H268",
  "M268 164V88H386",
  "M268 164H433",
  "M268 164V244H386",
];

function CaseIllustration({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="case-art agent-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="art-label">01 / ARQUITETURA MULTI-AGENTE</div>
        <div className="mini-orbit" />
        {/* Linhas de centro a centro: os nós (opacos) cobrem as pontas,
            então encostam na borda em qualquer proporção do card. */}
        <svg viewBox="0 0 540 330" preserveAspectRatio="none" fill="none">
          <g stroke="#8c9b60" strokeWidth="1">
            {miniPaths.map((d) => (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <g className="mini-flow" stroke="#e6ff88" strokeWidth="2">
            {miniPaths.map((d, i) => (
              <path
                key={d}
                d={d}
                pathLength={100}
                className={i === 0 ? "mini-flow-in" : "mini-flow-out"}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </svg>
        <div className="mini-node mini-input">
          <AudioLines size={20} />
          <span>Usuário</span>
        </div>
        <div className="mini-node mini-agent">
          <Network size={27} />
          <span>Orquestrador</span>
        </div>
        <div className="mini-node mini-rag">
          <Database size={18} />
          <span>RAG</span>
        </div>
        <div className="mini-node mini-api">
          <Braces size={20} />
          <span>Tools</span>
        </div>
        <div className="mini-node mini-specialist">
          <GitBranch size={18} />
          <span>Especialista</span>
        </div>
        <div className="art-footnote">
          <span className="status-dot" /> CONTEXTO → DECISÃO → AÇÃO
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="case-art workflow-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="art-label">02 / ORQUESTRAÇÃO DE WORKFLOWS</div>
        <div className="workflow">
          <div className="workflow-step">
            <Globe2 />
            <span>Webhook</span>
            <small>01</small>
          </div>
          <i />
          <div className="workflow-step">
            <Braces />
            <span>Validação</span>
            <small>02</small>
          </div>
          <i />
          <div className="workflow-step highlighted">
            <Waypoints />
            <span>n8n</span>
            <small>03</small>
          </div>
          <i />
          <div className="workflow-step">
            <Database />
            <span>API</span>
            <small>04</small>
          </div>
        </div>
        <div className="code-snippet">
          <span className="code-comment">
            // conectando conversa e operação
          </span>
          <br />
          <span className="code-keyword">await</span> jornada.
          <span className="code-method">executar</span>({"{"}
          <br />
          <span className="code-indent">contexto, ferramentas, regras</span>
          <br />
          {"}"});
        </div>
        <div className="art-footnote">
          <span className="status-dot" /> FLUXOS QUE CONECTAM
        </div>
      </div>
    );
  return (
    <div className="case-art observability-art" aria-hidden="true">
      <div className="art-grid" />
      <div className="art-label">03 / INTELIGÊNCIA OPERACIONAL</div>
      <div className="trace-header">
        <Terminal size={15} />
        <span>journey.trace</span>
        <span>EVENTOS DA JORNADA</span>
      </div>
      <div className="trace-rows">
        {[
          "conversation.started",
          "agent.tool_called",
          "integration.response",
          "journey.completed",
        ].map((label, i) => (
          <div className="trace-row" key={label}>
            <span>0{i + 1}</span>
            <i />
            <code>{label}</code>
            <div className={`trace-bar bar-${i}`} />
          </div>
        ))}
      </div>
      <svg className="trace-chart" viewBox="0 0 460 65" fill="none">
        <path d="M0 52H460M0 27H460" stroke="#34372b" strokeDasharray="2 5" />
        <path
          className="chart-line"
          d="M0 45L22 45L33 40L54 44L69 30L86 35L107 22L127 30L143 26L166 35L183 21L201 23L222 11L242 23L258 21L278 30L294 18L314 25L333 14L353 20L375 5L391 11L414 7L434 13L460 4"
          stroke="#e6ff88"
          strokeWidth="1.7"
        />
      </svg>
      <div className="art-footnote">
        LOGS + DADOS + CONTEXTO <span>VISUALIZAÇÃO ILUSTRATIVA</span>
      </div>
    </div>
  );
}

function WorkSection() {
  return (
    <section id="projetos" className="section work-section">
      <div className="section-heading" data-reveal>
        <div>
          <span className="eyebrow">
            <span>01 /</span> TRABALHOS SELECIONADOS
          </span>
          <h2>
            Da complexidade
            <br />à <span className="serif-word">solução.</span>
          </h2>
        </div>
        <p>
          Um recorte do que construo.
          <br />
          Tecnologia aplicada a desafios reais.
        </p>
      </div>
      <div className="case-list">
        {cases.map((item, i) => (
          <article className="case" key={item.id} data-reveal>
            <CaseIllustration index={i} />
            <div className="case-copy">
              <div className="case-meta">
                <span>{item.category}</span>
                <span>/{item.number}</span>
              </div>
              <h3>
                {item.title.split("\n").map((line, j) => (
                  <span key={line}>
                    {j > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              <p>{item.description}</p>
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <details className="case-details">
                <summary>
                  Explorar atuação{" "}
                  <span className="detail-icon">
                    <ArrowUpRight size={20} />
                    <X size={20} />
                  </span>
                </summary>
                <div className="case-detail-content">
                  <h4>O desafio</h4>
                  <p>{item.context}</p>
                  <h4>Minha contribuição</h4>
                  <p>{item.contribution}</p>
                  <h4>Na prática</h4>
                  <p>{item.application}</p>
                  <div className="detail-stack">{item.stack.join(" / ")}</div>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
      <p className="work-note">
        <CircleDot size={13} /> Relatos baseados na minha atuação profissional.
        Clientes e arquiteturas específicas preservados.
      </p>
    </section>
  );
}

// Sorteio: cada chip sai do bolo no centro (x0, y0) para a posição no time
// (x1, y1), em % do campo. Um C, dois T e dois S por time.
const grxPlayers = [
  { tier: "S", team: "a", x0: 47, y0: 42, x1: 9, y1: 50 },
  { tier: "T", team: "a", x0: 55, y0: 47, x1: 24, y1: 26 },
  { tier: "T", team: "a", x0: 43, y0: 53, x1: 24, y1: 74 },
  { tier: "C", team: "a", x0: 52, y0: 58, x1: 39, y1: 38 },
  { tier: "S", team: "a", x0: 58, y0: 38, x1: 39, y1: 62 },
  { tier: "S", team: "b", x0: 50, y0: 50, x1: 91, y1: 50 },
  { tier: "T", team: "b", x0: 42, y0: 44, x1: 76, y1: 26 },
  { tier: "T", team: "b", x0: 57, y0: 55, x1: 76, y1: 74 },
  { tier: "C", team: "b", x0: 46, y0: 61, x1: 61, y1: 38 },
  { tier: "S", team: "b", x0: 53, y0: 36, x1: 61, y1: 62 },
];
const grxLedger = [
  ["#07", "PAGO"],
  ["#12", "AGENDADO"],
  ["#03", "CALOTE"],
];
// Planta simplificada de 2 dormitórios (viewBox 250x170)
const formaWalls = [
  "M4 4H246V166H4Z",
  "M4 56H70M100 56H170",
  "M80 56V96M80 124V166",
  "M170 4V56M170 84V166",
  "M170 78H246",
];

function FormaPlan({ layer }: { layer: number }) {
  return (
    <svg
      className={`forma-layer layer-${layer}`}
      viewBox="0 0 250 170"
      fill="none"
    >
      {layer === 0 && (
        <rect className="forma-room" x="81" y="57" width="88" height="108" />
      )}
      <g className="forma-walls" stroke="currentColor" strokeWidth="2">
        {formaWalls.map((d) => (
          <path key={d} d={d} pathLength={100} />
        ))}
      </g>
      {layer === 0 && (
        <>
          <path className="forma-window" d="M108 166H142M246 110V140" />
          <g className="forma-labels">
            <text x="30" y="34">COZINHA</text>
            <text x="190" y="44">BWC</text>
            <text x="22" y="116">QUARTO</text>
            <text x="112" y="116">SALA</text>
            <text x="192" y="126">SUÍTE</text>
          </g>
        </>
      )}
    </svg>
  );
}

function LabIllustration({ id }: { id: string }) {
  if (id === "grxfut")
    return (
      <div className="lab-scene grx-scene" aria-hidden="true">
        <div className="grx-pitch">
          <svg viewBox="0 0 400 240" preserveAspectRatio="none" fill="none">
            <g stroke="#8c9b60" strokeWidth="1">
              <rect
                x="1"
                y="1"
                width="398"
                height="238"
                vectorEffect="non-scaling-stroke"
              />
              <path d="M200 1V239" vectorEffect="non-scaling-stroke" />
              <path
                d="M1 70H50V170H1M399 70H350V170H399"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>
          <span className="grx-center" />
          <span className="grx-team team-a">TIME A</span>
          <span className="grx-team team-b">TIME B</span>
          {grxPlayers.map((p, i) => (
            <span
              key={i}
              className={`grx-chip team-${p.team}`}
              style={
                {
                  "--x0": p.x0,
                  "--y0": p.y0,
                  "--x1": p.x1,
                  "--y1": p.y1,
                  "--j": i % 2 ? 1 : -1,
                } as CSSProperties
              }
            >
              {p.tier}
            </span>
          ))}
        </div>
        <div className="grx-ledger">
          <span className="grx-ledger-title">CAIXA · PIX</span>
          {grxLedger.map(([player, status], i) => (
            <div
              className={`grx-ledger-row status-${i}`}
              key={player}
              style={{ "--r": i } as CSSProperties}
            >
              <i />
              <span>{player}</span>
              <b>{status}</b>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="lab-scene forma-scene" aria-hidden="true">
      <div className="forma-versions">
        {["v1", "v2", "v3"].map((v) => (
          <span key={v} className={`forma-version ${v}`}>
            {v}
          </span>
        ))}
      </div>
      <div className="forma-stage-wrap">
        <div className="forma-stage">
          {[0, 1, 2].map((layer) => (
            <FormaPlan key={layer} layer={layer} />
          ))}
        </div>
      </div>
      <div className="forma-chat">
        <span className="forma-prompt">›</span>
        <span className="forma-typed">deixa a sala mais clara</span>
        <i className="forma-caret" />
      </div>
    </div>
  );
}

function LabSection() {
  return (
    <section id="lab" className="section lab-section">
      <div className="section-heading" data-reveal>
        <div>
          <span className="eyebrow">
            <span>02 /</span> LABORATÓRIO
          </span>
          <h2>
            Fora do expediente,
            <br />
            <span className="serif-word">curiosidade.</span>
          </h2>
        </div>
        <p>
          Projetos pessoais, código aberto.
          <br />
          Onde testo ideias sem briefing.
        </p>
      </div>
      <div className="lab-grid">
        {labProjects.map((item, i) => (
          <article
            className="lab-card"
            key={item.id}
            data-reveal
            style={{ "--d": i } as CSSProperties}
            onPointerMove={(event) => {
              const box = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty(
                "--mx",
                `${event.clientX - box.left}px`,
              );
              event.currentTarget.style.setProperty(
                "--my",
                `${event.clientY - box.top}px`,
              );
            }}
          >
            <div className="lab-art case-art">
              <div className="art-grid" />
              <div className="lab-bar">
                <span>~/repos/{item.id}</span>
                <span>
                  <i className="status-dot" /> main
                </span>
              </div>
              <div className="art-label">{item.label}</div>
              <LabIllustration id={item.id} />
              <div className="art-footnote">
                <span className="status-dot" /> {item.footnote}
              </div>
            </div>
            <div className="lab-copy">
              <div className="lab-repo">
                <Github size={14} />
                <span>{item.repo}</span>
                <span>{item.language}</span>
              </div>
              <h3>
                {item.title.split("\n").map((line, j) => (
                  <span key={line}>
                    {j > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              <p>{item.description}</p>
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                className="text-link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver repositório ${item.repo} no GitHub`}
              >
                Ver repositório <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="section about-section">
      <div className="about-intro" data-reveal>
        <span className="eyebrow">
          <span>03 /</span> SOBRE MIM
        </span>
        <h2>
          Entre a conversa
          <br />e o <span className="serif-word">código.</span>
        </h2>
        <div className="about-location">
          <Globe2 size={17} /> São Paulo, Brasil{" "}
          <span>23°33′ S · 46°38′ O</span>
        </div>
      </div>
      <div className="about-content" data-reveal>
        <p className="large-copy">
          Sou Willian. Conecto inteligência artificial aos sistemas, às pessoas
          e aos desafios de cada negócio.
        </p>
        <p>
          Como AI / Agent Engineer, trabalho com agentes conversacionais em
          produção: arquitetura multi-agente, tool calling, RAG e integrações
          com APIs corporativas.
        </p>
        <p>
          Minha atuação vai do discovery à operação. Gosto de entender o
          problema de perto, construir a solução e acompanhar o que acontece
          quando ela encontra o mundo real.
        </p>
        <a className="text-link" href={profile.resume} download>
          Meu currículo completo <Download size={17} />
        </a>
      </div>
      <div className="expertise" data-reveal>
        <span className="eyebrow">FERRAMENTAS DO DIA A DIA</span>
        <div className="expertise-columns">
          {technologies.map((group, i) => (
            <div className="expertise-group" key={group.title}>
              <span className="expertise-number">0{i + 1}</span>
              <h3>{group.title}</h3>
              <p>
                {group.items.map((item, index) => (
                  <span key={item}>
                    {item}
                    {index < group.items.length - 1 && <b> / </b>}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experiencia" className="section experience-section">
      <div className="section-heading" data-reveal>
        <div>
          <span className="eyebrow">
            <span>04 /</span> TRAJETÓRIA
          </span>
          <h2>
            Construindo,
            <br />
            <span className="serif-word">evoluindo.</span>
          </h2>
        </div>
        <p>
          Cada desafio, uma nova perspectiva.
          <br />
          Aprendizado contínuo, na prática.
        </p>
      </div>
      <div className="timeline">
        {experience.map((item) => (
          <article className="experience-row" key={item.company} data-reveal>
            <div className="experience-period">
              <span
                className={
                  item.current ? "timeline-dot current" : "timeline-dot"
                }
              />
              {item.period}
              {item.current && (
                <span className="current-label">ATUALMENTE</span>
              )}
            </div>
            <div className="experience-main">
              <h3>{item.company}</h3>
              <p className="experience-role">{item.role}</p>
            </div>
            <p className="experience-description">{item.description}</p>
          </article>
        ))}
      </div>
      <div className="education" data-reveal>
        <div>
          <span className="eyebrow">FORMAÇÃO</span>
          <h3>
            Aprender faz parte
            <br />
            do processo.
          </h3>
        </div>
        <div className="education-items">
          <div>
            <span className="mono">2026 — 2027 · EM ANDAMENTO</span>
            <h4>Pós-graduação em Agentes de IA</h4>
            <p>FIAP</p>
          </div>
          <div>
            <span className="mono">2023 — 2025 · CONCLUÍDO</span>
            <h4>Análise e Desenvolvimento de Sistemas</h4>
            <p>FIAP</p>
          </div>
        </div>
        <div className="languages">
          <span className="eyebrow">IDIOMAS</span>
          <p>
            Português <span>Nativo</span>
          </p>
          <p>
            Inglês <span>Avançado</span>
          </p>
          <small>Wizard by Pearson · 2015–2020</small>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("idle"), 3500);
  }
  return (
    <section id="contato" className="contact-section">
      <div className="contact-inner" data-reveal>
        <span className="eyebrow">
          <span>05 /</span> PRÓXIMA CONVERSA
        </span>
        <div className="contact-heading">
          <h2>
            Boas ideias começam
            <br /> com um <span className="serif-word">olá.</span>
          </h2>
          <a
            className="contact-arrow"
            href={`mailto:${profile.email}`}
            aria-label="Enviar email para Willian Dantas"
          >
            <ArrowUpRight strokeWidth={1} />
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            Um projeto, uma oportunidade ou uma troca de ideias.
            <br /> Vamos descobrir o que podemos construir juntos.
          </p>
          <div className="email-line">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button onClick={copyEmail} aria-label="Copiar email">
              {copyState === "copied" ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
            </button>
            <span className="copy-feedback" role="status">
              {copyState === "copied"
                ? "Email copiado!"
                : copyState === "error"
                  ? "Selecione o email para copiar."
                  : ""}
            </span>
          </div>
        </div>
        <div className="contact-links">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} /> LinkedIn <ArrowUpRight size={15} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} /> GitHub <ArrowUpRight size={15} />
          </a>
          <a href={profile.phoneHref}>
            {profile.phone} <ArrowUpRight size={15} />
          </a>
          <a href={profile.resume} download>
            Baixar currículo <Download size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function App() {
  useReveals();
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="status-dot" />
              <span>AI / AGENT ENGINEER</span>
              <span className="kicker-divider" />
              <span>SÃO PAULO, BR</span>
            </div>
            <div className="hero-main">
              <div className="hero-copy">
                <h1>
                  Willian
                  <br />
                  Dantas<span className="name-period">.</span>
                </h1>
                <p className="hero-statement">
                  Inteligência artificial.
                  <br />
                  <span>Impacto real.</span>
                </p>
                <p className="hero-description">
                  Construo agentes, conecto sistemas e transformo conversas em
                  soluções. Do discovery à operação.
                </p>
                <div className="hero-actions">
                  <a className="primary-button" href="#projetos">
                    Explore meu trabalho <ArrowUpRight size={18} />
                  </a>
                  <a
                    className="icon-link"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub de Willian Dantas"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    className="icon-link"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn de Willian Dantas"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
              <AgentSystem />
            </div>
            <div className="hero-footer">
              <span>ARQUITETURA. INTEGRAÇÃO. OPERAÇÃO.</span>
              <a href="#projetos">
                CONTINUE EXPLORANDO <ArrowDown size={15} />
              </a>
              <span>PORTFÓLIO / 2026</span>
            </div>
          </div>
        </section>
        <div className="expertise-strip" aria-label="Áreas de atuação">
          <span>Agentes de IA</span>
          <i>✳</i>
          <span>Integrações</span>
          <i>✳</i>
          <span>Automação</span>
          <i>✳</i>
          <span>Observabilidade</span>
          <i>✳</i>
          <span>Do discovery à produção</span>
        </div>
        <WorkSection />
        <LabSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <footer className="footer">
        <a className="footer-wordmark" href="#inicio">
          <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#111210" />
            <path
              d="M12 24l6 20 7-13 7 13 6-20m12-10v30h-6a10 10 0 1 1 6-18"
              fill="none"
              stroke="#e6ff88"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <span>© 2026 Willian Dantas</span>
        <a href="#inicio">
          DE VOLTA AO TOPO <ChevronDown size={14} />
        </a>
      </footer>
      <ChatWidget />
    </>
  );
}
