import { useEffect, useRef, useState } from "react";
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
  profile,
  technologies,
} from "./content";
import { Globe } from "./components/ui/cobe-globe";
import type { Arc, Marker } from "./components/ui/cobe-globe";

const navigation = [
  { id: "projetos", label: "Projetos" },
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
          wd<span>↗</span>
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
          <span>04</span>Contato
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
          viewBox="0 0 640 570"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="outer-orbit"
            cx="320"
            cy="287"
            r="278"
            stroke="currentColor"
            strokeDasharray="2 12"
          />
          <g className="network-lines" stroke="currentColor" strokeWidth="1.1">
            <path d="M115 268 C190 268 215 274 320 274" />
            <path d="M333 103 C333 164 320 205 320 274" />
            <path d="M320 274 C415 274 444 250 525 250" />
            <path d="M320 274 C320 342 397 357 397 445" />
            <path d="M333 103 C470 92 535 150 525 250" />
            <path d="M115 268 C120 390 258 466 397 445" />
          </g>
          <g
            className="network-flow"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 320"
          >
            <path d="M115 268 C190 268 215 274 320 274" />
            <path d="M333 103 C333 164 320 205 320 274" />
            <path d="M320 274 C415 274 444 250 525 250" />
            <path d="M320 274 C320 342 397 357 397 445" />
          </g>
          <path d="M30 35h16m-8-8v16M594 520h16m-8-8v16" stroke="#777b6d" />
          <text
            x="23"
            y="526"
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
              className={`agent-node ${i === 2 ? "core-node" : ""} ${selected === i ? "is-selected" : ""}`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
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

function CaseIllustration({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="case-art agent-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="art-label">01 / ARQUITETURA MULTI-AGENTE</div>
        <svg viewBox="0 0 540 330" preserveAspectRatio="none" fill="none">
          <g stroke="#8c9b60" strokeWidth="1">
            <path d="M92 164H210M268 148V88H386M268 182V244H386M305 164H433" />
          </g>
          <g
            className="mini-flow"
            stroke="#e6ff88"
            strokeWidth="2"
            strokeDasharray="4 155"
          >
            <path d="M92 164H210M268 148V88H386M268 182V244H386M305 164H433" />
          </g>
          <circle
            cx="268"
            cy="164"
            r="86"
            stroke="#363c2a"
            strokeDasharray="2 6"
          />
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

function AboutSection() {
  return (
    <section id="sobre" className="section about-section">
      <div className="about-intro" data-reveal>
        <span className="eyebrow">
          <span>02 /</span> SOBRE MIM
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
            <span>03 /</span> TRAJETÓRIA
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
          <span>04 /</span> PRÓXIMA CONVERSA
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
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <footer className="footer">
        <a className="footer-wordmark" href="#inicio">
          wd<span>↗</span>
        </a>
        <span>© 2026 Willian Dantas</span>
        <a href="#inicio">
          DE VOLTA AO TOPO <ChevronDown size={14} />
        </a>
      </footer>
    </>
  );
}
