import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";

import type { LucideIcon } from "lucide-react";
import {
  Activity, ArrowRight, ArrowUp, Atom, Award, BadgeCheck, CalendarDays, CheckCircle2, Code2,
  CodeXml, Cpu, Download, ExternalLink, FileCode2, FileJson, FileType, Figma,
  FolderGit, GitBranch, GitCommit, Github, Globe, Layers, Linkedin, Mail, MapPin, Menu, Moon,
  Palette, Send, Sparkles, Star, Sun, TestTube, User, Users, Webhook, Wind, X, Zap,
} from "lucide-react";
import portrait from "../assets/developer-portrait.jpg";
import finance from "../assets/project-finance.jpg";
import commerce from "../assets/project-commerce.jpg";
import workspace from "../assets/project-workspace.jpg";
import { apiServices, type ContributionDay } from "../lib/api-services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luis Zevallos | Frontend Developer" },
      { name: "description", content: "Portafolio de {githubData?.name || 'Luis Zevallos'}: React, TypeScript y experiencias web rápidas y accesibles." },
      { property: "og:title", content: "{githubData?.name || 'Luis Zevallos'} | Frontend Developer" },
      { property: "og:description", content: "Interfaces rápidas, accesibles y orientadas a resultados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = [["Inicio", "inicio"], ["Sobre mí", "sobre-mi"], ["GitHub", "github"], ["Proyectos", "proyectos"], ["Certificados", "certificados"], ["Contacto", "contacto"]];
const skills = ["React", "TypeScript", "JavaScript", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Git", "Vue", "Nuxt", "Vite", "REST APIs"];
const projects = [
  {
    title: "Store Technology",
    desc: "Tienda online de productos tecnológicos con diseño completamente responsive y navegación estructurada por secciones, priorizando una experiencia de usuario clara en cualquier dispositivo.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754502/proyecto2_f4qvni.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://store-technology.vercel.app/index.html",
  },
  {
    title: "Sistema de Gestión Personal",
    desc: "Plataforma todo-en-uno para organización personal, con calculadora, control de gastos, cupones de descuento y administración de citas. Implementa programación orientada a objetos y persistencia de datos con localStorage, preservando el comportamiento de los objetos mediante prototipos al recuperar la información.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754497/proyecto1_xjh53v.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://javascript-project-snowy.vercel.app/",
  },
  {
    title: "Store Food",
    desc: "Aplicación web para una tienda de comida donde los usuarios exploran el catálogo de productos y realizan pedidos de forma ágil, con un diseño responsive y visualmente atractivo.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754506/proyecto3_nhvl72.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://store-food-sigma.vercel.app/index.html",
  },
  {
    title: "MiAppExchange",
    desc: "Aplicación web con integración de APIs externas para el manejo de datos dinámicos en tiempo real, construida con Vue Router para una navegación fluida entre vistas y una interfaz moderna y responsiva.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754497/proyecto4_k8gdzv.png",
    tags: ["Vue.js", "Vue Router", "JavaScript"],
    link: "https://mi-app-exchange.vercel.app/",
  },
  {
    title: "Panel Administrador YARD Sale",
    desc: "Panel de administración para un marketplace, con gestión completa de productos, usuarios y ventas mediante operaciones CRUD. Incluye visualización de métricas clave en gráficos interactivos: ventas mensuales, tráfico del sitio y distribución de productos.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754497/proyecto5_jtcdrq.png",
    tags: ["Nuxt.js", "Vuex", "Vuetify", "MySQL"],
    link: "https://marketplace-tienda-zdgi.vercel.app/admin/redirigir",
  },
  {
    title: "Marketplace Tienda",
    desc: "Plataforma de comercio electrónico donde los usuarios exploran productos, gestionan su carrito de compras y completan pedidos de forma segura, con backend en MySQL para la gestión de datos.",
    image: "https://res.cloudinary.com/dbejvtl9p/image/upload/v1749054033/ccvg1coiz56tmeqzrgwh.png",
    tags: ["Nuxt.js", "Vuex", "MySQL"],
    link: "https://marketplace-tienda-zdgi.vercel.app/",
  },
];
const certificates = [
  ["CSS Grid Básico", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-css-grid.pdf"],
  ["Responsive Design: Mobile First", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-mobile-first.pdf"],
  ["Curso Práctico de Frontend Developer", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-frontend-developer-practico.pdf"],
  ["Fundamentos de Sass", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-sass.pdf"],
  ["Curso Práctico de APIs con JavaScript", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-api-practico%20(1).pdf"],
  ["Fundamentos de API REST", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-api%20(1).pdf"],
  ["Manipulación de Arrays en JavaScript", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-arrays.pdf.pdf"],
  ["Asincronismo en JavaScript", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-asincronismo-js.pdf.pdf"],
  ["Closures y Scope en JavaScript", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-closures-scope.pdf.pdf"],
  ["POO Intermedia en JavaScript", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-poo-intermedio.pdf.pdf"],
  ["POO Básica en JavaScript", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-poo.pdf.pdf"],
  ["Matemáticas con JavaScript", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-practico-matematicas.pdf"],
  ["Vue.js Profesional", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-vuejs-profesional.pdf.pdf"],
  ["Vue.js Básico", "Platzi", "", "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-vuejs2.pdf.pdf"],
];
const skillIcons: Record<string, LucideIcon> = {
  React: Atom, TypeScript: FileType, JavaScript: FileJson, "Next.js": Globe,
  HTML5: CodeXml, CSS3: Palette, "Tailwind CSS": Wind, Git: GitBranch,
  Vue: Activity, Nuxt: Globe, Vite: Zap, "REST APIs": Webhook,
};

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [repos, setRepos] = useState<any[]>([]);
  const [githubData, setGithubData] = useState<any>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  useReveal();
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id ?? ""))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, .15, .5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const update = () => { const max = document.documentElement.scrollHeight - innerHeight; setProgress(max ? scrollY / max * 100 : 0); setShowTop(scrollY > 600); };
    update(); addEventListener("scroll", update, { passive: true }); return () => removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [reposData, userData, languagesData, contributionsData] = await Promise.all([
          apiServices.getRepos('luis123-code'),
          apiServices.getUser('luis123-code'),
          apiServices.getUserLanguages('luis123-code'),
          apiServices.getUserContributions('luis123-code')
        ]);
        setRepos(reposData);
        setGithubData(userData);
        setLanguages(languagesData);
        setContributions(contributionsData);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };
    fetchGithubData();
  }, []);
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-secondary"><div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-[4.5rem] max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-2.5 font-extrabold" aria-label="{githubData?.name || 'Luis Zevallos'}, volver al inicio"><span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-sm text-primary-foreground shadow-sm">LR</span><span className="truncate text-sm sm:text-base">{githubData?.name || 'Luis Zevallos'}</span></a>
        <nav className="hidden min-w-0 items-center justify-center gap-1 md:flex" aria-label="Navegación principal">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} className={`relative rounded-md px-2.5 py-2 text-[11px] font-bold transition-colors lg:px-3 lg:text-xs ${activeSection === id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}><span>{label}</span>{activeSection === id && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />}</a>)}</nav>
        <div className="flex shrink-0 items-center gap-2">
          <a href="#contacto" className="hidden h-9 items-center gap-2 rounded-md bg-primary px-3 text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 lg:inline-flex">Hablemos <ArrowRight size={14} /></a>
          <button onClick={() => setDark(!dark)} className="grid size-9 place-items-center rounded-md border border-border bg-card transition-all hover:border-primary hover:text-primary" aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"} title={dark ? "Modo claro" : "Modo oscuro"}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button onClick={() => setMenu(!menu)} className="grid size-9 place-items-center rounded-md border border-border bg-card transition-colors hover:border-primary md:hidden" aria-expanded={menu} aria-controls="mobile-navigation" aria-label={menu ? "Cerrar menú" : "Abrir menú"}>{menu ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </div>
      {menu && <nav id="mobile-navigation" className="animate-fade-in border-t border-border bg-background px-5 pb-5 pt-3 shadow-xl md:hidden" aria-label="Navegación móvil"><div className="grid grid-cols-2 gap-2">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} aria-current={activeSection === id ? "location" : undefined} className={`flex min-h-12 items-center justify-between rounded-md border px-4 text-sm font-bold transition-colors ${activeSection === id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary"}`}>{label}{activeSection === id && <span className="size-1.5 rounded-full bg-primary" />}</a>)}</div><a href="#contacto" onClick={() => setMenu(false)} className="mt-3 flex h-12 items-center justify-center gap-2 rounded-md bg-primary text-sm font-bold text-primary-foreground">Hablemos de tu proyecto <ArrowRight size={16} /></a></nav>}
    </header>
    <main>
      <Hero />
      <Metrics repos={repos} />
      <About />
      <GithubSection githubData={githubData} languages={languages} contributions={contributions} />
      <Projects />
      <Certificates />
      <Contact />
    </main>
    <Footer />
    <button onClick={() => scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver arriba" className={`fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-md bg-primary text-primary-foreground shadow-lg transition-all ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}><ArrowUp size={19} /></button>
  </div>;
}

function Hero() {
  const [githubData, setGithubData] = useState<any>(null);
  const roles = ["Desarrollador Frontend", "Desarrollador de Interfaces", "Especialista en Integración de APIs", "Desarrollador Full Stack en Formación"];
  const [role, setRole] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = roles[role] ?? roles[0] ?? "Frontend Developer";
    const done = text === target;
    const empty = text === "";
    const timer = setTimeout(() => {
      if (done && !deleting) setDeleting(true);
      else if (empty && deleting) { setDeleting(false); setRole((role + 1) % roles.length); }
      else setText(target.slice(0, text.length + (deleting ? -1 : 1)));
    }, done ? 1300 : deleting ? 42 : 72);
    return () => clearTimeout(timer);
  }, [text, deleting, role]);
  return <section id="inicio" className="relative min-h-[92svh] pt-16">
    <div className="relative mx-auto grid min-h-[calc(92svh-4rem)] max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-[1.15fr_.85fr] lg:px-8">
      <div className="z-10 max-w-3xl animate-fade-in">
        <div className="mb-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-bold uppercase text-primary"><Sparkles size={14} />Disponible para nuevos proyectos</div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Hola, soy</p>
        <h1 className="text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-8xl">Luis Zevallos<span className="text-primary">.</span></h1>
        <div className="mt-5 h-9 text-xl font-semibold sm:text-2xl"><span className="text-muted-foreground">Soy </span><span>{text}</span><span className="cursor-blink text-primary">|</span></div>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Desarrollador Junior en aprendizaje constante. Construyo interfaces con React y Vue, conecto APIs, gestiono repositorios con Git/GitHub y trabajo con bases de datos. Tengo nociones de renderizado SSR y CSR, y conocimientos de redes. Uso herramientas de IA como Cursor y Devin para acelerar mi flujo de desarrollo. Me apasiona crear soluciones web funcionales y seguir creciendo como desarrollador</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#proyectos" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">Ver proyectos <ArrowRight size={16} /></a>
          <a href="#contacto" className="inline-flex h-11 items-center rounded-md border border-border bg-card px-5 text-sm font-bold transition-colors hover:border-primary">Contáctame</a>
          <a href="/cv.pdf" download className="inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm font-bold text-muted-foreground transition-all hover:scale-105 hover:text-primary"><Download size={16} />Descargar CV</a>
        </div>
        <Socials />
      </div>
      <div className="md:hidden">
        <div className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" aria-hidden="true" />
      </div>
      <div className="portrait-enter relative mx-auto w-full max-w-[430px]">
        <div className="aspect-[6/7] overflow-hidden rounded-md border border-border bg-card"><img   src="https://avatars.githubusercontent.com/u/118630481?v=4" alt="Retrato profesional de {githubData?.name || 'Luis Zevallos'}" width={1200} height={1400} className="h-full w-full object-cover" /></div>
        <div className="absolute -bottom-4 -left-4 rounded-md border border-border bg-background px-4 py-3 shadow-xl"><p className="text-xs text-muted-foreground">Basado en</p><p className="text-sm font-bold">Lima, Perú · UTC−5</p></div>
      </div>
    </div>
  </section>;
}

function Socials() { return <div className="mt-8 flex gap-3" aria-label="Redes sociales"><Social href="https://github.com" label="GitHub"><Github size={18} /></Social><Social href="mailto:hola@{githubData?.login || 'luis123-code'}.dev" label="Correo"><Mail size={18} /></Social></div>; }
function Social({ href, label, children }: { href: string; label: string; children: ReactNode }) { return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label} className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary">{children}</a>; }

function Count({ value }: { value: number }) { const [count, setCount] = useState(0); const ref = useRef<HTMLSpanElement>(null); useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (!entry?.isIntersecting) return; const started = performance.now(); const animate = (now: number) => { const progress = Math.min((now - started) / 900, 1); setCount(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(animate) }; requestAnimationFrame(animate); observer.disconnect() }, { threshold: .5 }); observer.observe(node); return () => observer.disconnect() }, [value]); return <span ref={ref}>{count}+</span>; }
function Metrics({ repos }: { repos: any[] }) {
  const stats = [
    { value: 5, label: "Proyectos completados", detail: "De concepto a producción", icon: FolderGit },
    { value: 2, label: "Años de experiencia", detail: "Creando productos digitales", icon: CalendarDays },
    { value: 8, label: "Certificados obtenidos", detail: "Formación especializada", icon: BadgeCheck },
    { value: 10, label: "Tecnologías dominadas", detail: "Stack moderno y escalable", icon: Cpu },
  ]; return <section aria-label="Métricas profesionales" className="border-y border-border bg-surface px-5 py-10 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase text-primary">Impacto en números</p><h2 className="mt-2 text-xl font-extrabold sm:text-2xl">Experiencia que se puede medir.</h2></div><span className="hidden text-xs text-muted-foreground sm:block">Actualizado · 2026</span></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map(({ value, label, detail, icon: Icon }, index) => <article key={label} className="group relative min-h-48 overflow-hidden rounded-md border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl sm:p-6"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-105"><Icon size={21} /></span><span className="font-mono text-[10px] font-bold text-muted-foreground">0{index + 1}</span></div><strong className="mt-7 block text-4xl font-extrabold leading-none sm:text-5xl"><Count value={value} /></strong><h3 className="mt-3 text-sm font-bold">{label}</h3><p className="mt-1 hidden text-xs text-muted-foreground sm:block">{detail}</p><div className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" /></article>)}</div></div></section>;
}

function SectionHead({ kicker, title, copy, icon: Icon }: { kicker: string; title: string; copy?: string; icon?: LucideIcon }) { return <div className="reveal-on-scroll mb-12 max-w-2xl"><div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-primary">{Icon && <Icon size={14} />}<span>{kicker}</span></div><h2 className="text-3xl font-extrabold sm:text-5xl">{title}</h2>{copy && <p className="mt-5 leading-7 text-muted-foreground">{copy}</p>}</div>; }
function About() { return <section id="sobre-mi" className="px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHead icon={User} kicker="01 / Sobre mí" title="Código con intención." copy="Combino pensamiento de producto, sensibilidad visual y criterio técnico para crear experiencias que se sienten simples porque están bien resueltas." /><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div className="reveal-on-scroll text-sm leading-7 text-muted-foreground"><p>En <a href="https://tcretail.org" target="_blank" rel="noreferrer" className="text-primary hover:underline">Tecretail</a> (ERP para retail y e-commerce), pasé 2 años y medio traduciendo problemas reales de clientes en soluciones: desarrollé con React y TypeScript los módulos de fulfillment, gestión de casos y reportes estadísticos con filtros dinámicos y consultas SQL parametrizadas.</p><p className="mt-5">También impulsé automatizaciones apoyadas en IA para agilizar procesos internos, y di soporte directo resolviendo lo que realmente frenaba la operación del cliente.</p><p className="mt-5">Trabajo cerca de diseño y negocio para entender el problema antes de escribir código, y valoro la accesibilidad, el rendimiento medible y los sistemas que otros desarrolladores pueden mantener sin fricción.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{skills.map((s, i) => { const SkillIcon = skillIcons[s] ?? FileCode2; return <div key={s} style={{ animationDelay: `${i * 45}ms` }} className="reveal-on-scroll flex items-center gap-3 rounded-md border border-border bg-card p-4 text-sm font-semibold transition-all hover:-translate-y-1 hover:border-primary"><SkillIcon size={17} className="text-primary" />{s}</div> })}</div></div></div></section>; }

const heatTones = ["bg-background/10", "bg-primary/25", "bg-primary/45", "bg-primary/70", "bg-primary"] as const;

function GithubSection({ githubData, languages, contributions }: { githubData: any; languages: string[]; contributions: ContributionDay[] }) {
  const githubStats = githubData ? [
    [githubData.public_repos?.toString() || "0", "Repositorios", Github, "Públicos"],
    [githubData.followers?.toString() || "0", "Seguidores", Users, "Total"],
    [githubData.public_gists?.toString() || "0", "Gists", Code2, "Públicos"],
    [languages.length.toString() || "0", "Lenguajes", Code2, "Únicos"]
  ] : [["0", "Repositorios", Github, "Cargando..."], ["0", "Seguidores", Users, "Cargando..."], ["0", "Gists", Code2, "Cargando..."], ["0", "Lenguajes", Code2, "Cargando..."]] as const;
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  return <section id="github" className="bg-contrast px-5 py-24 text-background dark:bg-surface dark:text-foreground lg:px-8"><div className="mx-auto max-w-7xl"><SectionHead icon={Github} kicker="02 / Actividad" title="Construyendo en público." copy="Una vista de mi actividad y aprendizaje continuo. Los datos son en GitHub y están listos para conectar con GitHub." /><div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]"><article className="reveal-on-scroll relative overflow-hidden rounded-md border border-background/20 bg-background/5 p-6 dark:border-border dark:bg-card sm:p-7"><div className="absolute right-0 top-0 size-28 bg-primary/10 blur-3xl" /><div className="relative flex items-center gap-4"><div className="relative"><img src={githubData?.avatar_url || portrait} alt="Avatar de ${githubData?.name || 'Luis Zevallos'}" width={1200} height={1400} loading="lazy" className="size-16 rounded-md object-cover ring-2 ring-primary/30" /><span className="absolute -bottom-1 -right-1 size-3 rounded-full bg-primary ring-2 ring-contrast dark:ring-card" aria-label="Disponible para colaborar" /></div><div><h3 className="font-extrabold">{githubData?.name || 'Luis Zevallos'}</h3><p className="text-sm opacity-60">@{githubData?.login || 'luis123-code'}</p></div></div><p className="relative mt-6 text-sm leading-6 opacity-70">Desarrollador Frontend Junior. Interfaces accesibles, sistemas de diseño y código abierto.</p><div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs opacity-60"><span className="inline-flex items-center gap-1.5"><MapPin size={14} />Lima, Perú</span><span className="inline-flex items-center gap-1.5"><Star size={14} />Disponible para proyectos</span></div><a href="https://github.com" target="_blank" rel="noreferrer" className="relative mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">Ver perfil completo <ExternalLink size={15} /></a></article><div className="reveal-on-scroll grid grid-cols-2 gap-3 sm:grid-cols-4">{githubStats.map(([value, label, Icon, detail]) => <article key={label} className="group rounded-md border border-background/20 bg-background/5 p-4 transition-colors hover:border-primary/60 dark:border-border dark:bg-card"><Icon size={18} className="mb-5 text-primary transition-transform group-hover:scale-110" /><strong className="block text-xl font-extrabold sm:text-2xl">{value}</strong><span className="mt-1 block text-xs opacity-60">{label}</span><span className="mt-3 hidden text-[10px] font-bold text-primary sm:block">{detail}</span></article>)}<ContributionHeatmap days={contributions} total={totalContributions} /></div></div></div></section>;
}

function ContributionHeatmap({ days, total }: { days: ContributionDay[]; total: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ContributionDay | null>(null);
  const [tip, setTip] = useState({ left: 0, top: 0 });
  const months = useMemo(() => {
    const labels: { label: string; week: number }[] = [];
    let last = "";
    days.forEach((day, index) => {
      if (index % 7 !== 0) return;
      const label = new Date(`${day.date}T12:00:00`).toLocaleDateString("es-PE", { month: "short" }).replace(".", "");
      if (label !== last) {
        labels.push({ label, week: index / 7 });
        last = label;
      }
    });
    return labels;
  }, [days]);
  const weeks = Math.max(days.length / 7, 1);

  function showDay(day: ContributionDay, node: HTMLElement) {
    const wrap = wrapRef.current?.getBoundingClientRect();
    const cell = node.getBoundingClientRect();
    if (!wrap) return;
    setActive(day);
    setTip({ left: cell.left - wrap.left + cell.width / 2, top: cell.top - wrap.top });
  }

  return (
    <article className="relative col-span-2 rounded-md border border-background/20 bg-background/5 p-5 sm:col-span-4 dark:border-border dark:bg-card sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2"><Activity size={16} className="text-primary" /><h3 className="text-sm font-bold">Contribuciones · último año</h3></div>
          <p className="mt-1 text-xs opacity-60">{active ? `${active.count} ${active.count === 1 ? "contribución" : "contribuciones"} el ${new Date(`${active.date}T12:00:00`).toLocaleDateString("es-PE", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}` : "Pasa el cursor sobre un día para ver el detalle"}</p>
        </div>
        <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{total} total</span>
      </div>
      <div ref={wrapRef} className="relative">
        {active && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-semibold text-background shadow-lg dark:bg-primary dark:text-primary-foreground"
            style={{ left: tip.left, top: tip.top }}
          >
            <strong>{active.count}</strong> {active.count === 1 ? "contribución" : "contribuciones"}
            <span className="block font-medium opacity-70">{new Date(`${active.date}T12:00:00`).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        )}
        <div className="relative mb-2 hidden h-3 sm:block" aria-hidden="true">
          {months.map(({ label, week }) => (
            <span key={`${label}-${week}`} className="absolute text-[9px] capitalize opacity-50" style={{ left: `${(week / weeks) * 100}%` }}>{label}</span>
          ))}
        </div>
        <div className="grid w-full grid-flow-col grid-rows-7 gap-[3px]" role="img" aria-label="Mapa de contribuciones del último año">
          {days.map((day) => (
            <button
              key={day.date}
              type="button"
              aria-label={`${day.count} ${day.count === 1 ? "contribución" : "contribuciones"} el ${day.date}`}
              onMouseEnter={(event) => showDay(day, event.currentTarget)}
              onMouseLeave={() => setActive(null)}
              onFocus={(event) => showDay(day, event.currentTarget)}
              onBlur={() => setActive(null)}
              className={`aspect-square min-w-0 rounded-[2px] outline-none transition-transform hover:scale-125 focus-visible:ring-2 focus-visible:ring-primary ${heatTones[day.level] ?? heatTones[0]} ${active?.date === day.date ? "ring-1 ring-foreground dark:ring-primary-foreground" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-1.5 text-[9px] opacity-60">
        <span>Menos</span>
        {heatTones.map((tone) => <span key={tone} className={`size-2 rounded-[1.5px] ${tone}`} />)}
        <span>Más</span>
      </div>
    </article>
  );
}
function Projects() {
  return (
    <section id="proyectos" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="03 / Trabajo seleccionado"
          title="Proyectos"
          copy="Una muestra de cómo convierto ideas en interfaces funcionales."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article
              key={p.title}
              style={{ animationDelay: `${i * 65}ms` }}
              className="reveal-on-scroll group overflow-hidden rounded-md border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={`Vista del proyecto ${p.title}`}
                  width={1400}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="mb-3 text-xs font-bold text-primary">{p.impact}</p>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm bg-secondary px-2 py-1 text-[10px] font-bold text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-4">
                  <a
                    href={p.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold hover:text-primary"
                  >
                    Ver demo <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://github.com"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary"
                  >
                    Ver código <Github size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certificates() {
  const [open, setOpen] = useState<number | null>(null);
  const activeCertificate = open === null ? undefined : certificates[open];

  useEffect(() => {
    if (open === null) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, [open]);

  return (
    <section id="certificados" className="border-y border-border bg-surface px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker="04 / Formación" title="Aprender es parte del trabajo." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map(([name, org, date], i) => (
            <article key={name} className="reveal-on-scroll rounded-md border border-border bg-card p-5">
              <div className="mb-8 grid size-11 place-items-center rounded-md bg-primary/15 text-primary">
                <Award size={22} />
              </div>
              <p className="text-xs font-bold text-primary">
                {org} · {date}
              </p>
              <h3 className="mt-2 text-lg font-bold">{name}</h3>
              <button
                onClick={() => setOpen(i)}
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold hover:text-primary"
              >
                Ver certificado <ExternalLink size={13} />
              </button>
            </article>
          ))}
        </div>
      </div>

      {open !== null && activeCertificate && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-contrast/80 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-title"
          onMouseDown={() => setOpen(null)}
        >
          <div
            className="animate-scale-in w-full max-w-lg rounded-md bg-card p-7 text-card-foreground shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <Award size={35} className="text-primary" />
              <button
                onClick={() => setOpen(null)}
                aria-label="Cerrar certificado"
                className="grid size-9 place-items-center rounded-md border border-border"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-8 text-xs font-bold uppercase text-primary">
              Certificado de finalización
            </p>
            <h3 id="cert-title" className="mt-2 text-2xl font-extrabold">
              {activeCertificate[0]}
            </h3>
            <p className="mt-2 text-muted-foreground">
              Emitido por {activeCertificate[1]} · {activeCertificate[2]}
            </p>
            <a
              href={activeCertificate[3]}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground"
            >
              Abrir documento <ExternalLink size={15} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(100),
  email: z.string().trim().email("Ingresa un correo válido").max(255),
  subject: z.string().trim().max(120),
  message: z.string().trim().min(10, "Escribe al menos 10 caracteres").max(1000),
});

const WHATSAPP_NUMBER = "51977831158"; // 51 = código de país Perú

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(false);

    const currentForm = e.currentTarget;
    const form = new FormData(currentForm);
    const data = Object.fromEntries(form) as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    const result = contactSchema.safeParse(data);

    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setSending(true);

    const lines = [
      `Hola, soy ${data.name}.`,
      data.subject ? `Asunto: ${data.subject}` : null,
      `Mensaje: ${data.message}`,
      `Correo de contacto: ${data.email}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSending(false);
    setSent(true);
    currentForm.reset();
  }

  return (
    <section id="contacto" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="05 / Contacto"
          title="Hagamos algo valioso."
          copy="Cuéntame sobre el producto, el reto o la oportunidad. Respondo normalmente en menos de 24 horas."
        />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <form onSubmit={submit} noValidate className="reveal-on-scroll grid gap-5 sm:grid-cols-2">
            <Field name="name" label="Nombre completo *" error={errors["name"]} />
            <Field name="email" label="Correo electrónico *" type="email" error={errors["email"]} />
            <Field name="subject" label="Asunto" error={errors["subject"]} />
            <div />
            <Field name="message" label="Mensaje *" area error={errors["message"]} />
            <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
              <button
                disabled={sending}
                className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <span className="spin size-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar por WhatsApp <Send size={16} />
                  </>
                )}
              </button>
              {sent && (
                <span role="status" className="animate-fade-in inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <CheckCircle2 size={17} />
                  Te llevamos a WhatsApp con tu mensaje listo.
                </span>
              )}
            </div>
          </form>

          <aside className="reveal-on-scroll border-l border-border pl-7">
            <h3 className="font-bold">También puedes escribirme directamente</h3>
            <div className="mt-6 space-y-4">
              <ContactLink
                icon={<Mail size={17} />}
                label="Correo"
                value="albetamirez@gmail.com"
                href="javascript:void(0)"
              />
              <ContactLink
                icon={<Github size={17} />}
                label="GitHub"
                value="https://github.com/luis123-code"
                href="https://github.com/luis123-code"
              />
            </div>
            <a href="/cv.pdf" download className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
              <Download size={16} />
              Descargar mi CV
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  area,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  area?: boolean;
  error?: string | undefined;
}) {
  const cls = `mt-2 w-full rounded-md border bg-card px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none ${error ? "field-shake border-destructive" : "border-input"
    }`;

  return (
    <label className={area ? "sm:col-span-2" : ""}>
      <span className="text-xs font-bold">{label}</span>
      {area ? (
        <textarea name={name} rows={6} maxLength={1000} className={cls} aria-invalid={!!error} />
      ) : (
        <input name={name} type={type} maxLength={255} className={cls} aria-invalid={!!error} />
      )}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-center gap-4 rounded-md border border-border bg-card p-4 transition-colors hover:border-primary"
    >
      <span className="text-primary">{icon}</span>
      <span>
        <small className="block text-muted-foreground">{label}</small>
        <strong className="text-sm">{value}</strong>
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Luis Zevallos. Diseñado y desarrollado con intención.
        </p>
        <Socials />
      </div>
    </footer>
  );
}
