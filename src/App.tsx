import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, Check, Copy, Database, Download, FileCode2, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import CodeGlitch from "@/components/reactbits/CodeGlitch";
import CountUp from "@/components/reactbits/CountUp";
import DecryptedText from "@/components/reactbits/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ClickSpark from "@/components/reactbits/ClickSpark";
import Magnet from "@/components/reactbits/Magnet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DB2_EXTENSION, SOURCE, TICKER, TOOLS, VERSION, VSIX, VSIX_PATH, WHEEL, WHEEL_URL } from "@/content";

/* ------------------------------------------------------------------ bits */
function CopyCommand({ cmd, className }: { cmd: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setState("copied");
      setTimeout(() => setState("idle"), 1600);
    } catch {
      /* clipboard refused: the command stays selectable */
    }
  };
  return (
    <div className={cn("flex min-w-0 items-stretch overflow-hidden rounded-xl border border-line bg-[#05070a]", className)}>
      <pre className="min-w-0 flex-1 whitespace-pre-wrap px-4 py-3 font-mono text-[13px] leading-relaxed text-fg [overflow-wrap:anywhere]">
        {cmd.split("\n").map((line, i) => (
          <div key={i}><span className="select-none text-faint">$ </span>{line}</div>
        ))}
      </pre>
      <button type="button" onClick={copy} aria-label="Copy command"
        className="flex shrink-0 items-center gap-1.5 border-l border-line px-4 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-signal">
        {state === "copied" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {state === "copied" ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Eyebrow({ n, children }: { n: string; children: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
      <span className="text-signal">{n}</span>
      <span className="h-px w-10 bg-line" />
      {children}
    </div>
  );
}

function SectionTitle({ lead, tail }: { lead: string; tail: string }) {
  return (
    <h2 className="mt-6 text-[clamp(2.3rem,1.4rem+3.6vw,4.6rem)] font-bold leading-[0.98] tracking-tight">
      {lead}
      <br />
      <span className="text-faint">{tail}</span>
    </h2>
  );
}

/* ---------------------------------------------------------------- ticker */
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-20 flex h-9 items-center overflow-hidden border-b border-line bg-ink">
      <div className="marquee flex shrink-0 gap-10 whitespace-nowrap pl-6 font-mono text-[12px] text-muted">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10">{t}<span className="size-1 bg-glow" /></span>
        ))}
      </div>
      <a href="#get" className="absolute right-0 top-0 hidden h-9 items-center gap-2 bg-signal px-4 text-[13px] font-semibold text-signal-ink sm:flex">
        <Download className="size-4" /> Get it free
      </a>
    </div>
  );
}

/* ---------------------------------------------------------------- header */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [["#how", "How it works"], ["#powers", "Superpowers"], ["#start", "Start here"], ["#get", "Downloads"], ["#tools", "Tools"], ["#faq", "FAQ"], ["/pitch/", "Pitch"]];
  return (
    <header className={cn("sticky top-0 z-30 transition-colors", scrolled ? "border-b border-line bg-ink/90 backdrop-blur" : "bg-transparent")}>
      <div className="gutter mx-auto flex h-16 max-w-7xl items-center gap-6">
        <a href="#top" className="flex items-center gap-2.5 text-[19px] font-semibold tracking-tight">
          <img src="/favicon.svg" alt="" className="size-7" /> ShipSafe
          <span className="hidden border-l border-line pl-2.5 text-[13px] font-medium text-muted sm:inline">for IBM Bob</span>
        </a>
        <nav aria-label="Sections" className="ml-auto hidden items-center gap-1 rounded-full border border-line bg-panel/70 p-1 lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="rounded-full px-3.5 py-1.5 text-[14px] text-muted hover:bg-panel-2 hover:text-fg">{label}</a>
          ))}
        </nav>
        <ButtonLink href="#get" size="sm" className="ml-auto lg:ml-0">Download <ArrowRight className="size-4" /></ButtonLink>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */
function Hero() {
  return (
    <section id="top" className="grain relative -mt-16 overflow-hidden pt-16">
      <CodeGlitch className="absolute inset-0 h-full w-full opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(0_0_0/0.82),rgb(0_0_0/0.35)_70%,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-ink" />
      <div className="gutter relative mx-auto flex max-w-6xl flex-col items-center pb-24 pt-20 text-center sm:pt-28">
        <Badge><span className="size-2 rounded-full bg-clean" /> Free · open source · runs on your laptop</Badge>
        <p className="mt-8 text-[clamp(1.5rem,1rem+2vw,2.6rem)] font-light tracking-tight text-muted">
          Your AI writes the code.
        </p>
        <h1 className="mt-2 text-[clamp(3.6rem,1.2rem+11vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.04em]">
          <DecryptedText text="Ship it." animateOn="view" sequential speed={45} revealDirection="start" />
          <br />
          <span className="text-signal">
            <DecryptedText text="Safely." animateOn="view" sequential speed={55} revealDirection="start" />
          </span>
        </h1>
        <p className="mt-8 max-w-3xl text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] leading-relaxed text-muted">
          ShipSafe plugs into <span className="text-fg">IBM Bob</span> and any AI IDE. It checks every file before it lands,
          fixes problems with local <span className="text-fg">IBM Granite</span> and proves the fix, validates your SQL on
          <span className="text-fg"> IBM Db2</span>, and remembers your team's decisions between sessions.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Magnet magnetStrength={4} padding={40}>
            <ClickSpark sparkColor="#f2c94c" sparkCount={10}>
              <ButtonLink href="#get" size="lg"><Download className="size-5" /> Get ShipSafe free for Bob &amp; VS Code</ButtonLink>
            </ClickSpark>
          </Magnet>
          <ButtonLink href="#start" size="lg" variant="outline">Protected in 4 steps <ArrowRight className="size-5" /></ButtonLink>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[15px]">
          {[["#demo", "Watch Bob get caught →"], ["#start", "Get Db2 free in VS Code →"], ["#tools", "All 11 MCP tools →"], [SOURCE, "Read the source ↗"]].map(([href, label]) => (
            <a key={label} href={href} className="border-b border-line pb-0.5 text-fg/85 hover:border-signal hover:text-fg">{label}</a>
          ))}
        </div>
      </div>
      <Stats />
    </section>
  );
}

function Stats() {
  const stats: { value: number; suffix?: string; label: string; note: string }[] = [
    { value: 11, label: "MCP tools", note: "for Bob, Claude, Cursor, VS Code" },
    { value: 3, label: "Db2 stored procedures", note: "risk trend, retention, IDE report" },
    { value: 0, suffix: " bytes", label: "of your code leave the laptop", note: "Granite runs in local Ollama" },
    { value: 4, label: "AI frameworks, one job each", note: "LangChain · Haystack · CrewAI · SQLAlchemy" },
  ];
  return (
    <div className="gutter relative mx-auto max-w-7xl pb-16">
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-panel/80 backdrop-blur lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={cn("p-6 sm:p-8", i % 2 === 1 && "border-l border-line", i >= 2 && "border-t border-line lg:border-t-0", i === 2 && "lg:border-l")}>
            <div className="text-[clamp(2.4rem,1.6rem+2.4vw,3.8rem)] font-bold leading-none tracking-tight tabular-nums">
              <CountUp to={s.value} duration={1.4} />{s.suffix}
            </div>
            <div className="mt-3 text-[15px] font-medium">{s.label}</div>
            <div className="mt-1 font-mono text-[12px] text-faint">{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ demo */
const TURNS: { who: string; tone?: "block" | "clean"; lines: string[] }[] = [
  { who: "Bob → shipsafe_check_code", lines: ['file  orders/repository.py', `code  sql = f"SELECT * FROM ORDERS WHERE ID = '{order_id}'"`] },
  { who: "ShipSafe", tone: "block", lines: ["verdict  BLOCK  · 440 ms", "L3  critical  SQLI-DYNAMIC  SQL built from runtime values", "    found by shipsafe_code_rules + bandit", "policy  POL-DB2-001  Parameterized SQL (from Db2 vectors)"] },
  { who: "Bob → shipsafe_fix_code", lines: ["crew    security analyst → engineer   (granite4:micro, local)", "round 1 failed verification → sent back with the remaining issues","verify  rules · secrets · syntax · bandit"] },
  { who: "ShipSafe", tone: "clean", lines: ["verified  true · 2 rounds · 32 s", `-  sql = f"SELECT * FROM ORDERS WHERE ID = '{order_id}'"`, '+  sql = "SELECT * FROM ORDERS WHERE ID = ?"', "+  stmt = ibm_db.prepare(conn, sql)", "+  ibm_db.execute(stmt, (order_id,))", "   saved to Db2 · FIX_ATTEMPTS"] },
  { who: "Bob", lines: ["Writing orders/repository.py ✓"] },
];

function Demo() {
  const [live, setLive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setLive((v) => (v + 1) % TURNS.length), 2300);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="demo" className="border-t border-line py-28">
      <div className="gutter mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
        <div>
          <Eyebrow n="01">Watch Bob get caught</Eyebrow>
          <SectionTitle lead="Caught before" tail="it was written." />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Bob was about to save a query built from user input. ShipSafe stopped the write, named the rule, pulled your
            team's policy out of Db2, and handed back a fix that passed the same checks. Bob never had to be asked.
          </p>
          <ul className="mt-8 space-y-3 text-[15px]">
            {["A rules file tells Bob to call ShipSafe before every write", "The model proposes. The checks decide.", "Every check and fix is logged in Db2 for the session report"].map((t) => (
              <li key={t} className="flex gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-signal" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-[#05070a] shadow-[0_40px_120px_-40px_rgb(59_108_255/0.45)]">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3 font-mono text-[12px] text-muted">
            <span className="flex gap-1.5"><i className="size-2.5 rounded-full bg-line" /><i className="size-2.5 rounded-full bg-line" /><i className="size-2.5 rounded-full bg-line" /></span>
            IBM Bob · orders/repository.py
          </div>
          <ol className="space-y-2 p-4">
            {TURNS.map((t, i) => (
              <li key={i} className={cn("overflow-x-auto rounded-r-lg border-l-2 px-4 py-3 font-mono text-[12.5px] leading-relaxed transition-colors duration-500",
                i === live ? "border-signal bg-signal/[0.06]" : "border-line bg-white/[0.015]")}>
                <div className="mb-1 text-[10.5px] uppercase tracking-[0.16em] text-faint">{t.who}</div>
                {t.lines.map((l, j) => (
                  <div key={j} className={cn("whitespace-pre",
                    t.tone === "block" && j === 0 && "font-semibold text-block",
                    t.tone === "clean" && j === 0 && "font-semibold text-clean",
                    l.startsWith("-") && "text-block/90", l.startsWith("+") && "text-clean")}>{l}</div>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- powers */
const POWERS = [
  { icon: ShieldCheck, title: "Check before it lands", tool: "shipsafe_check_code",
    body: "Parses the code (Python AST, JS/TS token rules), finds leaked keys, runs Bandit on a temporary copy, and answers clean, warn or block in under a second. Comments that only mention eval() stay quiet." },
  { icon: Wrench, title: "Fix it. Prove it.", tool: "shipsafe_fix_code",
    body: "A CrewAI crew of two Granite agents rewrites the file. The fix only counts if the same deterministic checks pass afterwards." },
  { icon: Database, title: "SQL that fits your real Db2", tool: "shipsafe_check_sql",
    body: "Statements are prepared on your Db2 server with deferred prepare off, so Db2 itself flags bad syntax, tables and columns. Nothing runs. Typos get a “did you mean”." },
  { icon: Brain, title: "Memory that survives the chat", tool: "shipsafe_remember / recall",
    body: "Decisions and conventions are embedded with Granite and stored in a Db2 vector table through Haystack, so the next session starts where the last one stopped." },
  { icon: Sparkles, title: "Your standards, with sources", tool: "shipsafe_ask_standards",
    body: "Team policies are chunked with LangChain and searched with VECTOR_DISTANCE in Db2. Granite answers from them and cites the policy id." },
  { icon: FileCode2, title: "A gate before “done”", tool: "shipsafe_readiness_check",
    body: "Secrets, code rules, vulnerable dependencies and tests in one verdict, saved to Db2 with a risk trend computed by a stored procedure." },
];

function Powers() {
  return (
    <section id="powers" className="border-t border-line py-28">
      <div className="gutter mx-auto max-w-7xl">
        <Eyebrow n="02">Superpowers for your AI</Eyebrow>
        <SectionTitle lead="Six new reflexes." tail="Zero extra prompts." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POWERS.map(({ icon: Icon, title, tool, body }) => (
            <SpotlightCard key={title} spotlightColor="rgba(242, 201, 76, 0.16)" className="rounded-2xl border border-line bg-panel p-7">
              <Icon className="size-7 text-signal" />
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <div className="mt-1 font-mono text-[12px] text-faint">{tool}</div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{body}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- how it works */
function How() {
  const stack = [
    ["IBM Db2 12.1", "Tables, VECTOR(384) columns, SQL PL procedures"],
    ["ibm_db", "Every query, transaction and procedure call"],
    ["LangChain", "langchain-db2 vector store + RAG chain"],
    ["Haystack", "ibm-db-haystack document store for memory"],
    ["CrewAI", "Analyst + engineer agents for fixes"],
    ["SQLAlchemy", "ibm_db_sa reads the live catalog"],
    ["Granite", "granite4:micro + granite-embedding, via Ollama"],
    ["MCP", "One stdio server for every IDE"],
  ];
  return (
    <section id="how" className="border-t border-line py-28">
      <div className="gutter mx-auto max-w-7xl">
        <Eyebrow n="03">How it works</Eyebrow>
        <SectionTitle lead="One server." tail="IBM Db2 at the centre." />
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="min-w-0 overflow-x-auto rounded-2xl border border-line bg-panel p-6">
            <svg viewBox="0 0 640 380" className="h-auto w-full min-w-[540px]" role="img" aria-label="IDEs connect over MCP to the ShipSafe server, which stores everything in IBM Db2 and uses Granite models in Ollama.">
              <defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#5c6675" /></marker></defs>
              {["IBM Bob", "VS Code", "Claude Code", "Cursor"].map((n, i) => (
                <g key={n}><rect x="8" y={18 + i * 50} width="128" height="38" rx="8" fill="#12161d" stroke="#232a35" /><text x="72" y={42 + i * 50} textAnchor="middle" fill="#f2f4f8" fontFamily="IBM Plex Mono" fontSize="12">{n}</text>
                  <path d={`M136,${37 + i * 50} C176,${37 + i * 50} 176,112 214,112`} fill="none" stroke="#5c6675" strokeWidth="1.4" markerEnd="url(#a)" /></g>
              ))}
              <text x="144" y="228" fill="#5c6675" fontFamily="IBM Plex Mono" fontSize="11">MCP · stdio</text>
              <rect x="216" y="64" width="196" height="96" rx="10" fill="#f2c94c" />
              <text x="314" y="98" textAnchor="middle" fill="#0b0d11" fontFamily="IBM Plex Sans" fontWeight="700" fontSize="15">ShipSafe MCP server</text>
              <text x="314" y="120" textAnchor="middle" fill="#0b0d11" fontFamily="IBM Plex Mono" fontSize="11">guard · crew · memory · sql</text>
              <text x="314" y="138" textAnchor="middle" fill="#0b0d11" fontFamily="IBM Plex Mono" fontSize="11">11 tools</text>
              <path d="M412,112 L478,112" fill="none" stroke="#5c6675" strokeWidth="1.4" markerEnd="url(#a)" />
              <rect x="480" y="76" width="150" height="72" rx="8" fill="#12161d" stroke="#232a35" />
              <text x="555" y="104" textAnchor="middle" fill="#f2f4f8" fontFamily="IBM Plex Sans" fontWeight="600" fontSize="13">Ollama (local)</text>
              <text x="555" y="124" textAnchor="middle" fill="#9aa4b2" fontFamily="IBM Plex Mono" fontSize="10.5">granite4:micro</text>
              <text x="555" y="139" textAnchor="middle" fill="#9aa4b2" fontFamily="IBM Plex Mono" fontSize="10.5">granite-embedding:30m</text>
              <path d="M314,160 L314,206" fill="none" stroke="#5c6675" strokeWidth="1.4" markerEnd="url(#a)" />
              <rect x="120" y="208" width="388" height="160" rx="12" fill="#0b0d11" stroke="#3b6cff" strokeWidth="1.6" />
              <text x="314" y="234" textAnchor="middle" fill="#f2f4f8" fontFamily="IBM Plex Sans" fontWeight="600" fontSize="14">IBM Db2 · schema SHIPSAFE</text>
              {[["Relational", ["GUARD_EVENTS", "FIX_ATTEMPTS", "ASSESSMENTS · FINDINGS", "SP_PROJECT_RISK …"]], ["Vector", ["POLICY_VECTORS · LangChain", "MEMORY_VECTORS · Haystack", "VECTOR(384, FLOAT32)", "VECTOR_DISTANCE COSINE"]]].map(([t, rows], k) => (
                <g key={t as string}>
                  <rect x={136 + k * 188} y="248" width="172" height="106" rx="8" fill="#12161d" stroke="#232a35" />
                  <text x={150 + k * 188} y="270" fill="#f2c94c" fontFamily="IBM Plex Mono" fontSize="12">{t as string}</text>
                  {(rows as string[]).map((r, j) => <text key={r} x={150 + k * 188} y={290 + j * 16} fill="#9aa4b2" fontFamily="IBM Plex Mono" fontSize="10.5">{r}</text>)}
                </g>
              ))}
            </svg>
          </div>
          <div className="min-w-0">
            <dl className="divide-y divide-line border-y border-line">
              {stack.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 py-3.5">
                  <dt className="font-mono text-[13px] text-fg">{k}</dt>
                  <dd className="text-[15px] text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ start here */
const STEPS = [
  { time: "10 MIN", title: "Get Db2 free in VS Code",
    body: "Install IBM's Db2 Developer Extension and click “Create Db2 instance”. You get a free Db2 Community Edition with TESTDB on your laptop. Works in IBM Bob too.",
    cmd: "code --install-extension IBM.db2-for-luw", link: [DB2_EXTENSION, "Marketplace page ↗"] },
  { time: "5 MIN", title: "Pull the Granite models",
    body: "Install Ollama from ollama.com, then pull IBM Granite for chat and for embeddings. About 2 GB, once.",
    cmd: "ollama pull granite4:micro\nollama pull granite-embedding:30m" },
  { time: "2 MIN", title: "Install ShipSafe and run setup",
    body: "Python 3.11 to 3.13. Setup saves your connection to ~/.shipsafe/.env, creates the Db2 tables, views and procedures, and indexes the team policies as vectors.",
    cmd: `pip install ${WHEEL_URL}\nshipsafe setup` },
  { time: "1 MIN", title: "Connect your IDE",
    body: "Run it inside your project. Bob gets .bob/mcp.json plus a rules file that tells it when to call each tool." },
];

function Start() {
  return (
    <section id="start" className="border-t border-line py-28">
      <div className="gutter mx-auto max-w-7xl">
        <Eyebrow n="04">Start here · 4 steps</Eyebrow>
        <SectionTitle lead="From zero to protected." tail="Four steps." />
        <p className="mt-6 max-w-2xl text-lg text-muted">Do them in order. Every command is right here, ready to copy.</p>
        <ol className="mt-14 space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className={cn("grid gap-8 rounded-2xl border border-line bg-panel p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]", i === 3 && "border-glow/50 bg-[linear-gradient(180deg,rgb(59_108_255/0.08),transparent)]")}>
              <div className="flex gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-glow text-xl font-bold">{i + 1}</span>
                <div className="min-w-0">
                  <div className="font-mono text-[12px] tracking-[0.18em] text-glow">{s.time}</div>
                  <h3 className="mt-1 text-2xl font-semibold sm:text-[28px]">{s.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.body}</p>
                  {s.link && <a href={s.link[0]} className="mt-3 inline-block text-[15px] text-fg underline decoration-line underline-offset-4 hover:decoration-signal">{s.link[1]}</a>}
                </div>
              </div>
              <div className="min-w-0 self-center">
                {i < 3 ? <CopyCommand cmd={s.cmd!} /> : (
                  <Tabs defaultValue="bob">
                    <TabsList>
                      {[["bob", "IBM Bob"], ["vscode", "VS Code"], ["claude", "Claude Code"], ["cursor", "Cursor"]].map(([v, l]) => <TabsTrigger key={v} value={v}>{l}</TabsTrigger>)}
                    </TabsList>
                    <TabsContent value="bob" className="mt-4"><CopyCommand cmd={`shipsafe connect bob\nbobide --install-extension ${VSIX_PATH}`} /></TabsContent>
                    <TabsContent value="vscode" className="mt-4"><CopyCommand cmd={`code --install-extension ${VSIX_PATH}\nshipsafe connect vscode`} /></TabsContent>
                    <TabsContent value="claude" className="mt-4"><CopyCommand cmd="shipsafe connect claude" /></TabsContent>
                    <TabsContent value="cursor" className="mt-4"><CopyCommand cmd="shipsafe connect cursor" /></TabsContent>
                  </Tabs>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- downloads */
function Downloads() {
  const items = [
    { title: "Extension for Bob & VS Code", file: VSIX, href: `/downloads/${VSIX}`, note: "Problems panel, verified quick fix, SQL check, memory, status bar. Download it, then run this from any folder (VS Code: use code instead of bobide).", cmd: `bobide --install-extension ${VSIX_PATH}` },
    { title: "Python package", file: WHEEL, href: `/downloads/${WHEEL}`, note: "MCP server, CLI, guard, crew, Db2 schema and procedures. Needs Python 3.11 to 3.13; if your default is 3.14, start with py ‑3.13 ‑m pip (Windows) or python3.13 ‑m pip. Install it first.", cmd: `pip install ${WHEEL_URL}` },
    { title: "Bob rules file", file: "shipsafe.md", href: "/downloads/shipsafe.md", note: "Makes Bob call ShipSafe on its own. Run the command inside your project (after the Python package) or drop the file into .bob/rules/.", cmd: "shipsafe connect bob" },
  ];
  return (
    <section id="get" className="relative overflow-hidden border-t border-line py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_60%_at_50%_100%,rgb(59_108_255/0.22),transparent)]" />
      <div className="gutter relative mx-auto max-w-7xl">
        <Eyebrow n="05">Downloads</Eyebrow>
        <SectionTitle lead="Grab it." tail="Use it today." />
        <p className="mt-6 max-w-2xl text-lg text-muted">
          <ShinyText text={`Version ${VERSION} · free · Apache-2.0 · no account, no telemetry`} speed={4} color="#9aa4b2" shineColor="#f2f4f8" />
        </p>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.file} className="flex min-w-0 flex-col rounded-2xl border border-line bg-panel p-7">
              <h3 className="text-xl font-semibold">{it.title}</h3>
              <div className="mt-1 break-all font-mono text-[12px] text-faint">{it.file}</div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{it.note}</p>
              <ButtonLink href={it.href} download className="mt-6 w-full"><Download className="size-4" /> Download</ButtonLink>
              <CopyCommand cmd={it.cmd} className="mt-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ tools */
function Tools() {
  return (
    <section id="tools" className="border-t border-line py-28">
      <div className="gutter mx-auto max-w-7xl">
        <Eyebrow n="06">The tools Bob gets</Eyebrow>
        <SectionTitle lead="11 tools." tail="One rules file says when." />
        <div className="mt-12 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="bg-panel font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              <tr><th className="px-5 py-4 font-medium">Tool</th><th className="px-5 py-4 font-medium">Bob calls it</th><th className="px-5 py-4 font-medium">Returns</th></tr>
            </thead>
            <tbody>
              {TOOLS.map((t) => (
                <tr key={t.name} className="border-t border-line">
                  <td className="whitespace-nowrap px-5 py-4 font-mono text-[13px]">{t.name}</td>
                  <td className="px-5 py-4"><span className="whitespace-nowrap rounded-full border border-line px-3 py-1 font-mono text-[11.5px] text-muted">{t.when}</span></td>
                  <td className="px-5 py-4 text-[15px] text-muted">{t.returns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- faq */
function Faq() {
  const qa = [
    ["Is it really free?", "Yes. ShipSafe is open source under Apache-2.0. Db2 Community Edition, Ollama and the Granite models are free too."],
    ["Does my code leave my machine?", "No. The IDE talks to ShipSafe over stdio, the Granite models run in your local Ollama, and everything is stored in your own Db2. ShipSafe turns off CrewAI and LiteLLM telemetry."],
    ["Do I need IBM Bob?", "Bob is the first-class target: it gets a rules file so it calls the tools by itself. The same server works in VS Code, Claude Code, Cursor and any other MCP client."],
    ["Do I need a GPU?", "No. granite4:micro is a 3B model and runs on a laptop CPU; a GPU makes fixes faster. Guard checks don't use the model at all and take well under a second."],
    ["Can the AI fix pass a bad change?", "No. Granite proposes the fix, but it is accepted only when the same rules, secret patterns, syntax check and Bandit all pass on the new code."],
    ["What happens if Db2 is down?", "The guard still answers from the code alone and says that policy citations and logging were skipped. shipsafe_status shows the exact error."],
  ];
  return (
    <section id="faq" className="border-t border-line py-28">
      <div className="gutter mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <Eyebrow n="07">FAQ</Eyebrow>
          <SectionTitle lead="Questions," tail="answered." />
        </div>
        <Accordion type="single" collapsible className="border-t border-line">
          {qa.map(([q, a]) => (
            <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="gutter mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2.5 text-xl font-semibold"><img src="/favicon.svg" alt="" className="size-7" /> ShipSafe</div>
          <p className="mt-3 max-w-md text-[15px] text-muted">Built for Db2Hack at the IBM Db2 TechX Summit 2026. Not an official IBM product.</p>
        </div>
        <div className="flex flex-wrap gap-6 text-[15px]">
          <a href={SOURCE} className="inline-flex items-center gap-1 text-muted hover:text-fg">Source <ArrowUpRight className="size-4" /></a>
          <a href="#get" className="text-muted hover:text-fg">Downloads</a>
          <a href="#start" className="text-muted hover:text-fg">Install</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Ticker />
      <Header />
      <main>
        <Hero />
        <Demo />
        <Powers />
        <How />
        <Start />
        <Downloads />
        <Tools />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
