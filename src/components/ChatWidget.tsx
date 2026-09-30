import { Fragment, useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { ArrowUp, MessageCircle, RotateCcw, X } from "lucide-react";
import { chat } from "../content";

type Message = { role: "user" | "assistant"; text: string };
type Status = "idle" | "loading" | "error";

const storageKey = "wd-chat";
const timeoutMs = 30000;
const linkPattern = /(https?:\/\/[^\s<>()]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function newSessionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function readStored(): { sessionId: string; messages: Message[] } | null {
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (typeof stored?.sessionId === "string" && Array.isArray(stored.messages))
      return stored;
  } catch {
    // sessionStorage indisponível ou conteúdo inválido: começa do zero
  }
  return null;
}

function renderText(text: string) {
  return text.split(linkPattern).map((part, i) => {
    if (i % 2 === 0) return part;
    const link = part.replace(/[.,;:!?]+$/, "");
    const isEmail = !link.startsWith("http");
    return (
      <Fragment key={i}>
        <a
          href={isEmail ? `mailto:${link}` : link}
          {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {link}
        </a>
        {part.slice(link.length)}
      </Fragment>
    );
  });
}

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const toggleButton = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | undefined>(undefined);

  useEffect(() => {
    const stored = readStored();
    setSessionId(stored?.sessionId ?? newSessionId());
    setMessages(stored?.messages ?? []);
    setMounted(true);
    return () => request.current?.abort();
  }, []);
  useEffect(() => {
    if (!sessionId) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ sessionId, messages }));
    } catch {
      // sem persistência: a conversa continua só nesta aba
    }
  }, [sessionId, messages]);
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, status, open]);
  useEffect(() => {
    document.documentElement.classList.toggle("chat-open", open);
    if (!open) return;
    // No touch, focar o input abriria o teclado por cima da conversa
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
    else panelRef.current?.focus();
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(history: Message[]) {
    const last = history[history.length - 1];
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    setStatus("loading");
    try {
      const response = await fetch(chat.endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, message: last.text }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      // O prompt pede texto puro, mas o modelo às vezes escapa um markdown
      const output =
        typeof data?.output === "string"
          ? data.output
              .replace(/\*\*(.+?)\*\*/g, "$1")
              .replace(/^#{1,6}\s+/gm, "")
              .replace(/[ \t]+\n/g, "\n")
              .trim()
          : "";
      if (!output || (!response.ok && response.status !== 429))
        throw new Error(`HTTP ${response.status}`);
      setMessages([...history, { role: "assistant", text: output }]);
      setStatus("idle");
    } catch {
      if (request.current === controller) setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }

  function send(text: string) {
    const message = text.trim().slice(0, chat.maxLength);
    if (!message || status === "loading") return;
    const history: Message[] = [...messages, { role: "user", text: message }];
    setMessages(history);
    setInput("");
    void ask(history);
  }

  function reset() {
    request.current?.abort();
    request.current = undefined;
    setSessionId(newSessionId());
    setMessages([]);
    setStatus("idle");
    inputRef.current?.focus();
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  function onInputKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send(input);
    }
  }

  if (!mounted) return null;
  return (
    <div className="chat-widget">
      <section
        ref={panelRef}
        tabIndex={-1}
        id="chat-panel"
        className={`chat-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-labelledby="chat-title"
        inert={!open}
      >
        <header className="chat-header">
          <span className="chat-avatar" aria-hidden="true">
            WD
          </span>
          <div className="chat-heading">
            <h2 id="chat-title">Assistente do Willian</h2>
            <p>
              <span className="chat-dot" /> IA · CARREIRA E PROJETOS
            </p>
          </div>
          <button
            className="chat-icon-button"
            onClick={reset}
            aria-label="Nova conversa"
            title="Nova conversa"
          >
            <RotateCcw size={16} />
          </button>
          <button
            className="chat-icon-button"
            onClick={() => {
              setOpen(false);
              toggleButton.current?.focus();
            }}
            aria-label="Fechar chat"
          >
            <X size={18} />
          </button>
        </header>
        <div
          ref={listRef}
          className="chat-messages"
          aria-live="polite"
          aria-busy={status === "loading"}
        >
          <p className="chat-bubble assistant">{chat.welcome}</p>
          {messages.length === 0 && (
            <div className="chat-suggestions">
              {chat.suggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => send(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          {messages.map((message, i) => (
            <p key={i} className={`chat-bubble ${message.role}`}>
              {message.role === "assistant"
                ? renderText(message.text)
                : message.text}
            </p>
          ))}
          {status === "loading" && (
            <p className="chat-typing" role="status">
              <span />
              <span />
              <span />
              <b>Digitando…</b>
            </p>
          )}
          {status === "error" && (
            <div className="chat-error" role="alert">
              Não consegui responder agora.
              <button onClick={() => void ask(messages)}>Tentar de novo</button>
            </div>
          )}
        </div>
        <form className="chat-form" onSubmit={onSubmit}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={chat.maxLength}
            placeholder="Pergunte sobre o Willian…"
            aria-label="Sua pergunta"
            onChange={(event) => {
              setInput(event.target.value);
              event.target.style.height = "auto";
              event.target.style.height = `${Math.min(event.target.scrollHeight, 120)}px`;
            }}
            onKeyDown={onInputKey}
          />
          <button
            type="submit"
            aria-label="Enviar pergunta"
            disabled={!input.trim() || status === "loading"}
          >
            <ArrowUp size={18} />
          </button>
        </form>
        <p className="chat-note">
          Respostas geradas por IA. As conversas são registradas para melhorar
          as respostas.
        </p>
      </section>
      <button
        ref={toggleButton}
        className={`chat-toggle ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Fechar chat" : "Pergunte sobre mim"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="chat-toggle-label">Pergunte sobre mim</span>
      </button>
    </div>
  );
}
