import { useState, useEffect, useRef, useMemo } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { z } from 'zod';
import { ArrowRight, Sun, Moon, X, Menu, ArrowUp, Sparkles, Download, FolderGit, CalendarDays, BadgeCheck, Cpu, User, Webhook, Zap, Globe, Activity, GitBranch, Wind, Palette, CodeXml, FileJson, FileType, Atom, FileCode2, Github, Users, Code2, MapPin, Star, ExternalLink, Award, Send, CheckCircle2, Mail } from 'lucide-react';

var ApiServices = class {
  baseUrl = "";
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "";
  }
  /**
  * Configura la URL base para todas las peticiones
  */
  setBaseUrl(url) {
    this.baseUrl = url;
  }
  /**
  * GET request
  */
  async get(endpoint, headers) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers
        }
      });
      if (!response.ok) return {
        error: `Error ${response.status}: ${response.statusText}`,
        status: response.status
      };
      return { data: await response.json() };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Error desconocido en la petici\xF3n GET" };
    }
  }
  /**
  * POST request
  */
  async post(endpoint, body, headers) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) return {
        error: `Error ${response.status}: ${response.statusText}`,
        status: response.status
      };
      return { data: await response.json() };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Error desconocido en la petici\xF3n POST" };
    }
  }
  /**
  * PUT request
  */
  async put(endpoint, body, headers) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) return {
        error: `Error ${response.status}: ${response.statusText}`,
        status: response.status
      };
      return { data: await response.json() };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Error desconocido en la petici\xF3n PUT" };
    }
  }
  /**
  * DELETE request
  */
  async delete(endpoint, headers) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...headers
        }
      });
      if (!response.ok) return {
        error: `Error ${response.status}: ${response.statusText}`,
        status: response.status
      };
      return { data: await response.json() };
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Error desconocido en la petici\xF3n DELETE" };
    }
  }
  /**
  * Obtiene repositorios de GitHub
  */
  async getRepos(username) {
    const data = await (await fetch(`https://api.github.com/users/${username}/repos?sort=updated`)).json();
    console.log("GitHub Repos Response:", data);
    return data;
  }
  /**
  * Obtiene información del usuario de GitHub
  */
  async getUser(username) {
    const data = await (await fetch(`https://api.github.com/users/${username}`)).json();
    console.log("GitHub User Response:", data);
    return data;
  }
  /**
  * Obtiene eventos del usuario de GitHub
  */
  async getUserEvents(username) {
    const data = await (await fetch(`https://api.github.com/users/${username}/events/public`)).json();
    console.log("GitHub Events Response:", data);
    return data;
  }
  /**
  * Obtiene los lenguajes de programación de los repositorios del usuario
  */
  async getUserLanguages(username) {
    const repos = await this.getRepos(username);
    const languages = /* @__PURE__ */ new Set();
    console.log("Repos:", repos);
    for (const repo of repos) if (repo.language) {
      languages.add(repo.language);
      console.log("Language found:", repo.language);
    }
    const uniqueLanguages = Array.from(languages);
    console.log("GitHub Languages Response:", uniqueLanguages);
    return uniqueLanguages;
  }
  /**
  * Calendario de contribuciones del último año (fecha, count y nivel 0–4).
  * Usa el grafo público de GitHub; los eventos REST solo cubren ~90 días y suelen llegar vacíos.
  */
  async getUserContributions(username) {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!res.ok) throw new Error(`Error ${res.status}: no se pudo leer el calendario de GitHub`);
    const days = ((await res.json()).contributions ?? []).map((day) => ({
      date: day.date,
      count: day.count,
      level: Math.max(0, Math.min(4, day.level))
    }));
    console.log("GitHub Contributions:", days.filter((day) => day.count > 0));
    return days;
  }
};
var apiServices = new ApiServices();
var navItems = [
  ["Inicio", "inicio"],
  ["Sobre m\xED", "sobre-mi"],
  ["GitHub", "github"],
  ["Proyectos", "proyectos"],
  ["Certificados", "certificados"],
  ["Contacto", "contacto"]
];
var skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Git",
  "Vue",
  "Nuxt",
  "Vite",
  "REST APIs"
];
var projects = [
  {
    title: "Store Technology",
    desc: "Tienda online de productos tecnol\xF3gicos con dise\xF1o completamente responsive y navegaci\xF3n estructurada por secciones, priorizando una experiencia de usuario clara en cualquier dispositivo.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754502/proyecto2_f4qvni.png",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap"
    ],
    link: "https://store-technology.vercel.app/index.html"
  },
  {
    title: "Sistema de Gesti\xF3n Personal",
    desc: "Plataforma todo-en-uno para organizaci\xF3n personal, con calculadora, control de gastos, cupones de descuento y administraci\xF3n de citas. Implementa programaci\xF3n orientada a objetos y persistencia de datos con localStorage, preservando el comportamiento de los objetos mediante prototipos al recuperar la informaci\xF3n.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754497/proyecto1_xjh53v.png",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap"
    ],
    link: "https://javascript-project-snowy.vercel.app/"
  },
  {
    title: "Store Food",
    desc: "Aplicaci\xF3n web para una tienda de comida donde los usuarios exploran el cat\xE1logo de productos y realizan pedidos de forma \xE1gil, con un dise\xF1o responsive y visualmente atractivo.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754506/proyecto3_nhvl72.png",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap"
    ],
    link: "https://store-food-sigma.vercel.app/index.html"
  },
  {
    title: "MiAppExchange",
    desc: "Aplicaci\xF3n web con integraci\xF3n de APIs externas para el manejo de datos din\xE1micos en tiempo real, construida con Vue Router para una navegaci\xF3n fluida entre vistas y una interfaz moderna y responsiva.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754497/proyecto4_k8gdzv.png",
    tags: [
      "Vue.js",
      "Vue Router",
      "JavaScript"
    ],
    link: "https://mi-app-exchange.vercel.app/"
  },
  {
    title: "Panel Administrador YARD Sale",
    desc: "Panel de administraci\xF3n para un marketplace, con gesti\xF3n completa de productos, usuarios y ventas mediante operaciones CRUD. Incluye visualizaci\xF3n de m\xE9tricas clave en gr\xE1ficos interactivos: ventas mensuales, tr\xE1fico del sitio y distribuci\xF3n de productos.",
    image: "https://res.cloudinary.com/ddedghgb6/image/upload/v1789754497/proyecto5_jtcdrq.png",
    tags: [
      "Nuxt.js",
      "Vuex",
      "Vuetify",
      "MySQL"
    ],
    link: "https://marketplace-tienda-zdgi.vercel.app/admin/redirigir"
  },
  {
    title: "Marketplace Tienda",
    desc: "Plataforma de comercio electr\xF3nico donde los usuarios exploran productos, gestionan su carrito de compras y completan pedidos de forma segura, con backend en MySQL para la gesti\xF3n de datos.",
    image: "https://res.cloudinary.com/dbejvtl9p/image/upload/v1749054033/ccvg1coiz56tmeqzrgwh.png",
    tags: [
      "Nuxt.js",
      "Vuex",
      "MySQL"
    ],
    link: "https://marketplace-tienda-zdgi.vercel.app/"
  }
];
var certificates = [
  [
    "CSS Grid B\xE1sico",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-css-grid.pdf"
  ],
  [
    "Responsive Design: Mobile First",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-mobile-first.pdf"
  ],
  [
    "Curso Pr\xE1ctico de Frontend Developer",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-frontend-developer-practico.pdf"
  ],
  [
    "Fundamentos de Sass",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-sass.pdf"
  ],
  [
    "Curso Pr\xE1ctico de APIs con JavaScript",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-api-practico%20(1).pdf"
  ],
  [
    "Fundamentos de API REST",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-api%20(1).pdf"
  ],
  [
    "Manipulaci\xF3n de Arrays en JavaScript",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-arrays.pdf.pdf"
  ],
  [
    "Asincronismo en JavaScript",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-asincronismo-js.pdf.pdf"
  ],
  [
    "Closures y Scope en JavaScript",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-closures-scope.pdf.pdf"
  ],
  [
    "POO Intermedia en JavaScript",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-poo-intermedio.pdf.pdf"
  ],
  [
    "POO B\xE1sica en JavaScript",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-poo.pdf.pdf"
  ],
  [
    "Matem\xE1ticas con JavaScript",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-javascript-practico-matematicas.pdf"
  ],
  [
    "Vue.js Profesional",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-vuejs-profesional.pdf.pdf"
  ],
  [
    "Vue.js B\xE1sico",
    "Platzi",
    "",
    "https://portafolio-rouge-six.vercel.app/certificaciones/diploma-vuejs2.pdf.pdf"
  ]
];
var skillIcons = {
  React: Atom,
  TypeScript: FileType,
  JavaScript: FileJson,
  "Next.js": Globe,
  HTML5: CodeXml,
  CSS3: Palette,
  "Tailwind CSS": Wind,
  Git: GitBranch,
  Vue: Activity,
  Nuxt: Globe,
  Vite: Zap,
  "REST APIs": Webhook
};
function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
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
  const [repos, setRepos] = useState([]);
  const [githubData, setGithubData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [contributions, setContributions] = useState([]);
  useReveal();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id ?? "")).filter((section) => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [
        0,
        0.15,
        0.5
      ]
    });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max ? scrollY / max * 100 : 0);
      setShowTop(scrollY > 600);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [reposData, userData, languagesData, contributionsData] = await Promise.all([
          apiServices.getRepos("luis123-code"),
          apiServices.getUser("luis123-code"),
          apiServices.getUserLanguages("luis123-code"),
          apiServices.getUserContributions("luis123-code")
        ]);
        setRepos(reposData);
        setGithubData(userData);
        setLanguages(languagesData);
        setContributions(contributionsData);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };
    fetchGithubData();
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300",
    children: [
      /* @__PURE__ */ jsx("div", {
        className: "fixed inset-x-0 top-0 z-[60] h-0.5 bg-secondary",
        children: /* @__PURE__ */ jsx("div", {
          className: "h-full bg-primary transition-[width] duration-100",
          style: { width: `${progress}%` }
        })
      }),
      /* @__PURE__ */ jsxs("header", {
        className: "fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mx-auto grid h-[4.5rem] max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8",
          children: [
            /* @__PURE__ */ jsxs("a", {
              href: "#inicio",
              className: "flex min-w-0 items-center gap-2.5 font-extrabold",
              "aria-label": "{githubData?.name || 'Luis Zevallos'}, volver al inicio",
              children: [/* @__PURE__ */ jsx("span", {
                className: "grid size-9 shrink-0 place-items-center rounded-md bg-primary text-sm text-primary-foreground shadow-sm",
                children: "LR"
              }), /* @__PURE__ */ jsx("span", {
                className: "truncate text-sm sm:text-base",
                children: githubData?.name || "Luis Zevallos"
              })]
            }),
            /* @__PURE__ */ jsx("nav", {
              className: "hidden min-w-0 items-center justify-center gap-1 md:flex",
              "aria-label": "Navegaci\xF3n principal",
              children: navItems.map(([label, id]) => /* @__PURE__ */ jsxs("a", {
                href: `#${id}`,
                "aria-current": activeSection === id ? "location" : void 0,
                className: `relative rounded-md px-2.5 py-2 text-[11px] font-bold transition-colors lg:px-3 lg:text-xs ${activeSection === id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`,
                children: [/* @__PURE__ */ jsx("span", { children: label }), activeSection === id && /* @__PURE__ */ jsx("span", { className: "absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" })]
              }, id))
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "flex shrink-0 items-center gap-2",
              children: [
                /* @__PURE__ */ jsxs("a", {
                  href: "#contacto",
                  className: "hidden h-9 items-center gap-2 rounded-md bg-primary px-3 text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 lg:inline-flex",
                  children: ["Hablemos ", /* @__PURE__ */ jsx(ArrowRight, { size: 14 })]
                }),
                /* @__PURE__ */ jsx("button", {
                  onClick: () => setDark(!dark),
                  className: "grid size-9 place-items-center rounded-md border border-border bg-card transition-all hover:border-primary hover:text-primary",
                  "aria-label": dark ? "Activar modo claro" : "Activar modo oscuro",
                  title: dark ? "Modo claro" : "Modo oscuro",
                  children: dark ? /* @__PURE__ */ jsx(Sun, { size: 17 }) : /* @__PURE__ */ jsx(Moon, { size: 17 })
                }),
                /* @__PURE__ */ jsx("button", {
                  onClick: () => setMenu(!menu),
                  className: "grid size-9 place-items-center rounded-md border border-border bg-card transition-colors hover:border-primary md:hidden",
                  "aria-expanded": menu,
                  "aria-controls": "mobile-navigation",
                  "aria-label": menu ? "Cerrar men\xFA" : "Abrir men\xFA",
                  children: menu ? /* @__PURE__ */ jsx(X, { size: 19 }) : /* @__PURE__ */ jsx(Menu, { size: 19 })
                })
              ]
            })
          ]
        }), menu && /* @__PURE__ */ jsxs("nav", {
          id: "mobile-navigation",
          className: "animate-fade-in border-t border-border bg-background px-5 pb-5 pt-3 shadow-xl md:hidden",
          "aria-label": "Navegaci\xF3n m\xF3vil",
          children: [/* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-2 gap-2",
            children: navItems.map(([label, id]) => /* @__PURE__ */ jsxs("a", {
              href: `#${id}`,
              onClick: () => setMenu(false),
              "aria-current": activeSection === id ? "location" : void 0,
              className: `flex min-h-12 items-center justify-between rounded-md border px-4 text-sm font-bold transition-colors ${activeSection === id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary"}`,
              children: [label, activeSection === id && /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-primary" })]
            }, id))
          }), /* @__PURE__ */ jsxs("a", {
            href: "#contacto",
            onClick: () => setMenu(false),
            className: "mt-3 flex h-12 items-center justify-center gap-2 rounded-md bg-primary text-sm font-bold text-primary-foreground",
            children: ["Hablemos de tu proyecto ", /* @__PURE__ */ jsx(ArrowRight, { size: 16 })]
          })]
        })]
      }),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(Hero, {}),
        /* @__PURE__ */ jsx(Metrics, { repos }),
        /* @__PURE__ */ jsx(About, {}),
        /* @__PURE__ */ jsx(GithubSection, {
          githubData,
          languages,
          contributions
        }),
        /* @__PURE__ */ jsx(Projects, {}),
        /* @__PURE__ */ jsx(Certificates, {}),
        /* @__PURE__ */ jsx(Contact, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx("button", {
        onClick: () => scrollTo({
          top: 0,
          behavior: "smooth"
        }),
        "aria-label": "Volver arriba",
        className: `fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-md bg-primary text-primary-foreground shadow-lg transition-all ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`,
        children: /* @__PURE__ */ jsx(ArrowUp, { size: 19 })
      })
    ]
  });
}
function Hero() {
  const [githubData, setGithubData] = useState(null);
  const roles = [
    "Desarrollador Frontend",
    "Desarrollador de Interfaces",
    "Especialista en Integraci\xF3n de APIs",
    "Desarrollador Full Stack en Formaci\xF3n"
  ];
  const [role, setRole] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = roles[role] ?? roles[0] ?? "Frontend Developer";
    const done = text === target;
    const empty = text === "";
    const timer = setTimeout(() => {
      if (done && !deleting) setDeleting(true);
      else if (empty && deleting) {
        setDeleting(false);
        setRole((role + 1) % roles.length);
      } else setText(target.slice(0, text.length + (deleting ? -1 : 1)));
    }, done ? 1300 : deleting ? 42 : 72);
    return () => clearTimeout(timer);
  }, [
    text,
    deleting,
    role
  ]);
  return /* @__PURE__ */ jsx("section", {
    id: "inicio",
    className: "relative min-h-[92svh] pt-16",
    children: /* @__PURE__ */ jsxs("div", {
      className: "relative mx-auto grid min-h-[calc(92svh-4rem)] max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-[1.15fr_.85fr] lg:px-8",
      children: [
        /* @__PURE__ */ jsxs("div", {
          className: "z-10 max-w-3xl animate-fade-in",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "mb-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-bold uppercase text-primary",
              children: [/* @__PURE__ */ jsx(Sparkles, { size: 14 }), "Disponible para nuevos proyectos"]
            }),
            /* @__PURE__ */ jsx("p", {
              className: "mb-3 text-sm font-semibold text-muted-foreground",
              children: "Hola, soy"
            }),
            /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-8xl",
              children: ["Luis Zevallos", /* @__PURE__ */ jsx("span", {
                className: "text-primary",
                children: "."
              })]
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "mt-5 h-9 text-xl font-semibold sm:text-2xl",
              children: [
                /* @__PURE__ */ jsx("span", {
                  className: "text-muted-foreground",
                  children: "Soy "
                }),
                /* @__PURE__ */ jsx("span", { children: text }),
                /* @__PURE__ */ jsx("span", {
                  className: "cursor-blink text-primary",
                  children: "|"
                })
              ]
            }),
            /* @__PURE__ */ jsx("p", {
              className: "mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg",
              children: "Desarrollador Junior en aprendizaje constante. Construyo interfaces con React y Vue, conecto APIs, gestiono repositorios con Git/GitHub y trabajo con bases de datos. Tengo nociones de renderizado SSR y CSR, y conocimientos de redes. Uso herramientas de IA como Cursor y Devin para acelerar mi flujo de desarrollo. Me apasiona crear soluciones web funcionales y seguir creciendo como desarrollador"
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "mt-8 flex flex-wrap gap-3",
              children: [
                /* @__PURE__ */ jsxs("a", {
                  href: "#proyectos",
                  className: "inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5",
                  children: ["Ver proyectos ", /* @__PURE__ */ jsx(ArrowRight, { size: 16 })]
                }),
                /* @__PURE__ */ jsx("a", {
                  href: "#contacto",
                  className: "inline-flex h-11 items-center rounded-md border border-border bg-card px-5 text-sm font-bold transition-colors hover:border-primary",
                  children: "Cont\xE1ctame"
                }),
                /* @__PURE__ */ jsxs("a", {
                  href: "/cv.pdf",
                  download: true,
                  className: "inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm font-bold text-muted-foreground transition-all hover:scale-105 hover:text-primary",
                  children: [/* @__PURE__ */ jsx(Download, { size: 16 }), "Descargar CV"]
                })
              ]
            }),
            /* @__PURE__ */ jsx(Socials, {})
          ]
        }),
        /* @__PURE__ */ jsx("div", {
          className: "md:hidden",
          children: /* @__PURE__ */ jsx("div", {
            className: "mx-auto h-px w-28 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70",
            "aria-hidden": "true"
          })
        }),
        /* @__PURE__ */ jsxs("div", {
          className: "portrait-enter relative mx-auto w-full max-w-[430px]",
          children: [/* @__PURE__ */ jsx("div", {
            className: "aspect-[6/7] overflow-hidden rounded-md border border-border bg-card",
            children: /* @__PURE__ */ jsx("img", {
              src: "https://avatars.githubusercontent.com/u/118630481?v=4",
              alt: "Retrato profesional de {githubData?.name || 'Luis Zevallos'}",
              width: 1200,
              height: 1400,
              className: "h-full w-full object-cover"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "absolute -bottom-4 -left-4 rounded-md border border-border bg-background px-4 py-3 shadow-xl",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-xs text-muted-foreground",
              children: "Basado en"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm font-bold",
              children: "Lima, Per\xFA \xB7 UTC\u22125"
            })]
          })]
        })
      ]
    })
  });
}
function Socials() {
  return /* @__PURE__ */ jsxs("div", {
    className: "mt-8 flex gap-3",
    "aria-label": "Redes sociales",
    children: [/* @__PURE__ */ jsx(Social, {
      href: "https://github.com",
      label: "GitHub",
      children: /* @__PURE__ */ jsx(Github, { size: 18 })
    }), /* @__PURE__ */ jsx(Social, {
      href: "mailto:hola@{githubData?.login || 'luis123-code'}.dev",
      label: "Correo",
      children: /* @__PURE__ */ jsx(Mail, { size: 18 })
    })]
  });
}
function Social({ href, label, children }) {
  return /* @__PURE__ */ jsx("a", {
    href,
    target: href.startsWith("http") ? "_blank" : void 0,
    rel: "noreferrer",
    "aria-label": label,
    className: "grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary",
    children
  });
}
function Count({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const started = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - started) / 900, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return /* @__PURE__ */ jsxs("span", {
    ref,
    children: [count, "+"]
  });
}
function Metrics({ repos }) {
  return /* @__PURE__ */ jsx("section", {
    "aria-label": "M\xE9tricas profesionales",
    className: "border-y border-border bg-surface px-5 py-10 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-6 flex items-end justify-between gap-4",
        children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase text-primary",
          children: "Impacto en n\xFAmeros"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-2 text-xl font-extrabold sm:text-2xl",
          children: "Experiencia que se puede medir."
        })] }), /* @__PURE__ */ jsx("span", {
          className: "hidden text-xs text-muted-foreground sm:block",
          children: "Actualizado \xB7 2026"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
        children: [
          {
            value: 5,
            label: "Proyectos completados",
            detail: "De concepto a producci\xF3n",
            icon: FolderGit
          },
          {
            value: 2,
            label: "A\xF1os de experiencia",
            detail: "Creando productos digitales",
            icon: CalendarDays
          },
          {
            value: 8,
            label: "Certificados obtenidos",
            detail: "Formaci\xF3n especializada",
            icon: BadgeCheck
          },
          {
            value: 10,
            label: "Tecnolog\xEDas dominadas",
            detail: "Stack moderno y escalable",
            icon: Cpu
          }
        ].map(({ value, label, detail, icon: Icon }, index) => /* @__PURE__ */ jsxs("article", {
          className: "group relative min-h-48 overflow-hidden rounded-md border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl sm:p-6",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between",
              children: [/* @__PURE__ */ jsx("span", {
                className: "grid size-11 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-105",
                children: /* @__PURE__ */ jsx(Icon, { size: 21 })
              }), /* @__PURE__ */ jsxs("span", {
                className: "font-mono text-[10px] font-bold text-muted-foreground",
                children: ["0", index + 1]
              })]
            }),
            /* @__PURE__ */ jsx("strong", {
              className: "mt-7 block text-4xl font-extrabold leading-none sm:text-5xl",
              children: /* @__PURE__ */ jsx(Count, { value })
            }),
            /* @__PURE__ */ jsx("h3", {
              className: "mt-3 text-sm font-bold",
              children: label
            }),
            /* @__PURE__ */ jsx("p", {
              className: "mt-1 hidden text-xs text-muted-foreground sm:block",
              children: detail
            }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" })
          ]
        }, label))
      })]
    })
  });
}
function SectionHead({ kicker, title, copy, icon: Icon }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "reveal-on-scroll mb-12 max-w-2xl",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-primary",
        children: [Icon && /* @__PURE__ */ jsx(Icon, { size: 14 }), /* @__PURE__ */ jsx("span", { children: kicker })]
      }),
      /* @__PURE__ */ jsx("h2", {
        className: "text-3xl font-extrabold sm:text-5xl",
        children: title
      }),
      copy && /* @__PURE__ */ jsx("p", {
        className: "mt-5 leading-7 text-muted-foreground",
        children: copy
      })
    ]
  });
}
function About() {
  return /* @__PURE__ */ jsx("section", {
    id: "sobre-mi",
    className: "px-5 py-24 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsx(SectionHead, {
        icon: User,
        kicker: "01 / Sobre m\xED",
        title: "C\xF3digo con intenci\xF3n.",
        copy: "Combino pensamiento de producto, sensibilidad visual y criterio t\xE9cnico para crear experiencias que se sienten simples porque est\xE1n bien resueltas."
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid gap-10 lg:grid-cols-[.8fr_1.2fr]",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "reveal-on-scroll text-sm leading-7 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "En ",
              /* @__PURE__ */ jsx("a", {
                href: "https://tcretail.org",
                target: "_blank",
                rel: "noreferrer",
                className: "text-primary hover:underline",
                children: "Tecretail"
              }),
              " (ERP para retail y e-commerce), pas\xE9 2 a\xF1os y medio traduciendo problemas reales de clientes en soluciones: desarroll\xE9 con React y TypeScript los m\xF3dulos de fulfillment, gesti\xF3n de casos y reportes estad\xEDsticos con filtros din\xE1micos y consultas SQL parametrizadas."
            ] }),
            /* @__PURE__ */ jsx("p", {
              className: "mt-5",
              children: "Tambi\xE9n impuls\xE9 automatizaciones apoyadas en IA para agilizar procesos internos, y di soporte directo resolviendo lo que realmente frenaba la operaci\xF3n del cliente."
            }),
            /* @__PURE__ */ jsx("p", {
              className: "mt-5",
              children: "Trabajo cerca de dise\xF1o y negocio para entender el problema antes de escribir c\xF3digo, y valoro la accesibilidad, el rendimiento medible y los sistemas que otros desarrolladores pueden mantener sin fricci\xF3n."
            })
          ]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
          children: skills.map((s, i) => {
            const SkillIcon = skillIcons[s] ?? FileCode2;
            return /* @__PURE__ */ jsxs("div", {
              style: { animationDelay: `${i * 45}ms` },
              className: "reveal-on-scroll flex items-center gap-3 rounded-md border border-border bg-card p-4 text-sm font-semibold transition-all hover:-translate-y-1 hover:border-primary",
              children: [/* @__PURE__ */ jsx(SkillIcon, {
                size: 17,
                className: "text-primary"
              }), s]
            }, s);
          })
        })]
      })]
    })
  });
}
var heatTones = [
  "bg-background/10",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary"
];
function GithubSection({ githubData, languages, contributions }) {
  const githubStats = githubData ? [
    [
      githubData.public_repos?.toString() || "0",
      "Repositorios",
      Github,
      "P\xFAblicos"
    ],
    [
      githubData.followers?.toString() || "0",
      "Seguidores",
      Users,
      "Total"
    ],
    [
      githubData.public_gists?.toString() || "0",
      "Gists",
      Code2,
      "P\xFAblicos"
    ],
    [
      languages.length.toString() || "0",
      "Lenguajes",
      Code2,
      "\xDAnicos"
    ]
  ] : [
    [
      "0",
      "Repositorios",
      Github,
      "Cargando..."
    ],
    [
      "0",
      "Seguidores",
      Users,
      "Cargando..."
    ],
    [
      "0",
      "Gists",
      Code2,
      "Cargando..."
    ],
    [
      "0",
      "Lenguajes",
      Code2,
      "Cargando..."
    ]
  ];
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  return /* @__PURE__ */ jsx("section", {
    id: "github",
    className: "bg-contrast px-5 py-24 text-background dark:bg-surface dark:text-foreground lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsx(SectionHead, {
        icon: Github,
        kicker: "02 / Actividad",
        title: "Construyendo en p\xFAblico.",
        copy: "Una vista de mi actividad y aprendizaje continuo. Los datos son en GitHub y est\xE1n listos para conectar con GitHub."
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid gap-5 lg:grid-cols-[.72fr_1.28fr]",
        children: [/* @__PURE__ */ jsxs("article", {
          className: "reveal-on-scroll relative overflow-hidden rounded-md border border-background/20 bg-background/5 p-6 dark:border-border dark:bg-card sm:p-7",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 size-28 bg-primary/10 blur-3xl" }),
            /* @__PURE__ */ jsxs("div", {
              className: "relative flex items-center gap-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx("img", {
                  src: githubData?.avatar_url || "/assets/developer-portrait-CTH2Cjl_.jpg",
                  alt: "Avatar de ${githubData?.name || 'Luis Zevallos'}",
                  width: 1200,
                  height: 1400,
                  loading: "lazy",
                  className: "size-16 rounded-md object-cover ring-2 ring-primary/30"
                }), /* @__PURE__ */ jsx("span", {
                  className: "absolute -bottom-1 -right-1 size-3 rounded-full bg-primary ring-2 ring-contrast dark:ring-card",
                  "aria-label": "Disponible para colaborar"
                })]
              }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
                className: "font-extrabold",
                children: githubData?.name || "Luis Zevallos"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-sm opacity-60",
                children: ["@", githubData?.login || "luis123-code"]
              })] })]
            }),
            /* @__PURE__ */ jsx("p", {
              className: "relative mt-6 text-sm leading-6 opacity-70",
              children: "Desarrollador Frontend Junior. Interfaces accesibles, sistemas de dise\xF1o y c\xF3digo abierto."
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "relative mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs opacity-60",
              children: [/* @__PURE__ */ jsxs("span", {
                className: "inline-flex items-center gap-1.5",
                children: [/* @__PURE__ */ jsx(MapPin, { size: 14 }), "Lima, Per\xFA"]
              }), /* @__PURE__ */ jsxs("span", {
                className: "inline-flex items-center gap-1.5",
                children: [/* @__PURE__ */ jsx(Star, { size: 14 }), "Disponible para proyectos"]
              })]
            }),
            /* @__PURE__ */ jsxs("a", {
              href: "https://github.com",
              target: "_blank",
              rel: "noreferrer",
              className: "relative mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5",
              children: ["Ver perfil completo ", /* @__PURE__ */ jsx(ExternalLink, { size: 15 })]
            })
          ]
        }), /* @__PURE__ */ jsxs("div", {
          className: "reveal-on-scroll grid grid-cols-2 gap-3 sm:grid-cols-4",
          children: [githubStats.map(([value, label, Icon, detail]) => /* @__PURE__ */ jsxs("article", {
            className: "group rounded-md border border-background/20 bg-background/5 p-4 transition-colors hover:border-primary/60 dark:border-border dark:bg-card",
            children: [
              /* @__PURE__ */ jsx(Icon, {
                size: 18,
                className: "mb-5 text-primary transition-transform group-hover:scale-110"
              }),
              /* @__PURE__ */ jsx("strong", {
                className: "block text-xl font-extrabold sm:text-2xl",
                children: value
              }),
              /* @__PURE__ */ jsx("span", {
                className: "mt-1 block text-xs opacity-60",
                children: label
              }),
              /* @__PURE__ */ jsx("span", {
                className: "mt-3 hidden text-[10px] font-bold text-primary sm:block",
                children: detail
              })
            ]
          }, label)), /* @__PURE__ */ jsx(ContributionHeatmap, {
            days: contributions,
            total: totalContributions
          })]
        })]
      })]
    })
  });
}
function ContributionHeatmap({ days, total }) {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(null);
  const [tip, setTip] = useState({
    left: 0,
    top: 0
  });
  const months = useMemo(() => {
    const labels = [];
    let last = "";
    days.forEach((day, index) => {
      if (index % 7 !== 0) return;
      const label = (/* @__PURE__ */ new Date(`${day.date}T12:00:00`)).toLocaleDateString("es-PE", { month: "short" }).replace(".", "");
      if (label !== last) {
        labels.push({
          label,
          week: index / 7
        });
        last = label;
      }
    });
    return labels;
  }, [days]);
  const weeks = Math.max(days.length / 7, 1);
  function showDay(day, node) {
    const wrap = wrapRef.current?.getBoundingClientRect();
    const cell = node.getBoundingClientRect();
    if (!wrap) return;
    setActive(day);
    setTip({
      left: cell.left - wrap.left + cell.width / 2,
      top: cell.top - wrap.top
    });
  }
  return /* @__PURE__ */ jsxs("article", {
    className: "relative col-span-2 rounded-md border border-background/20 bg-background/5 p-5 sm:col-span-4 dark:border-border dark:bg-card sm:p-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "mb-6 flex flex-wrap items-center justify-between gap-3",
        children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-2",
          children: [/* @__PURE__ */ jsx(Activity, {
            size: 16,
            className: "text-primary"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-sm font-bold",
            children: "Contribuciones \xB7 \xFAltimo a\xF1o"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-1 text-xs opacity-60",
          children: active ? `${active.count} ${active.count === 1 ? "contribuci\xF3n" : "contribuciones"} el ${(/* @__PURE__ */ new Date(`${active.date}T12:00:00`)).toLocaleDateString("es-PE", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
          })}` : "Pasa el cursor sobre un d\xEDa para ver el detalle"
        })] }), /* @__PURE__ */ jsxs("span", {
          className: "rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary",
          children: [total, " total"]
        })]
      }),
      /* @__PURE__ */ jsxs("div", {
        ref: wrapRef,
        className: "relative",
        children: [
          active && /* @__PURE__ */ jsxs("div", {
            role: "tooltip",
            className: "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-semibold text-background shadow-lg dark:bg-primary dark:text-primary-foreground",
            style: {
              left: tip.left,
              top: tip.top
            },
            children: [
              /* @__PURE__ */ jsx("strong", { children: active.count }),
              " ",
              active.count === 1 ? "contribuci\xF3n" : "contribuciones",
              /* @__PURE__ */ jsx("span", {
                className: "block font-medium opacity-70",
                children: (/* @__PURE__ */ new Date(`${active.date}T12:00:00`)).toLocaleDateString("es-PE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })
              })
            ]
          }),
          /* @__PURE__ */ jsx("div", {
            className: "relative mb-2 hidden h-3 sm:block",
            "aria-hidden": "true",
            children: months.map(({ label, week }) => /* @__PURE__ */ jsx("span", {
              className: "absolute text-[9px] capitalize opacity-50",
              style: { left: `${week / weeks * 100}%` },
              children: label
            }, `${label}-${week}`))
          }),
          /* @__PURE__ */ jsx("div", {
            className: "grid w-full grid-flow-col grid-rows-7 gap-[3px]",
            role: "img",
            "aria-label": "Mapa de contribuciones del \xFAltimo a\xF1o",
            children: days.map((day) => /* @__PURE__ */ jsx("button", {
              type: "button",
              "aria-label": `${day.count} ${day.count === 1 ? "contribuci\xF3n" : "contribuciones"} el ${day.date}`,
              onMouseEnter: (event) => showDay(day, event.currentTarget),
              onMouseLeave: () => setActive(null),
              onFocus: (event) => showDay(day, event.currentTarget),
              onBlur: () => setActive(null),
              className: `aspect-square min-w-0 rounded-[2px] outline-none transition-transform hover:scale-125 focus-visible:ring-2 focus-visible:ring-primary ${heatTones[day.level] ?? heatTones[0]} ${active?.date === day.date ? "ring-1 ring-foreground dark:ring-primary-foreground" : ""}`
            }, day.date))
          })
        ]
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "mt-4 flex items-center justify-end gap-1.5 text-[9px] opacity-60",
        children: [
          /* @__PURE__ */ jsx("span", { children: "Menos" }),
          heatTones.map((tone) => /* @__PURE__ */ jsx("span", { className: `size-2 rounded-[1.5px] ${tone}` }, tone)),
          /* @__PURE__ */ jsx("span", { children: "M\xE1s" })
        ]
      })
    ]
  });
}
function Projects() {
  return /* @__PURE__ */ jsx("section", {
    id: "proyectos",
    className: "px-5 py-24 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsx(SectionHead, {
        kicker: "03 / Trabajo seleccionado",
        title: "Proyectos",
        copy: "Una muestra de c\xF3mo convierto ideas en interfaces funcionales."
      }), /* @__PURE__ */ jsx("div", {
        className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
        children: projects.map((p, i) => /* @__PURE__ */ jsxs("article", {
          style: { animationDelay: `${i * 65}ms` },
          className: "reveal-on-scroll group overflow-hidden rounded-md border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "aspect-[16/10] overflow-hidden bg-muted",
            children: /* @__PURE__ */ jsx("img", {
              src: p.image,
              alt: `Vista del proyecto ${p.title}`,
              width: 1400,
              height: 900,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-5",
            children: [
              /* @__PURE__ */ jsx("p", {
                className: "mb-3 text-xs font-bold text-primary",
                children: p.impact
              }),
              /* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold",
                children: p.title
              }),
              /* @__PURE__ */ jsx("p", {
                className: "mt-2 min-h-12 text-sm leading-6 text-muted-foreground",
                children: p.desc
              }),
              /* @__PURE__ */ jsx("div", {
                className: "mt-4 flex flex-wrap gap-2",
                children: p.tags.map((t) => /* @__PURE__ */ jsx("span", {
                  className: "rounded-sm bg-secondary px-2 py-1 text-[10px] font-bold text-secondary-foreground",
                  children: t
                }, t))
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "mt-6 flex gap-4",
                children: [/* @__PURE__ */ jsxs("a", {
                  href: p.link,
                  className: "inline-flex items-center gap-1.5 text-xs font-bold hover:text-primary",
                  children: ["Ver demo ", /* @__PURE__ */ jsx(ExternalLink, { size: 13 })]
                }), /* @__PURE__ */ jsxs("a", {
                  href: "https://github.com",
                  className: "inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary",
                  children: ["Ver c\xF3digo ", /* @__PURE__ */ jsx(Github, { size: 13 })]
                })]
              })
            ]
          })]
        }, p.title))
      })]
    })
  });
}
function Certificates() {
  const [open, setOpen] = useState(null);
  const activeCertificate = open === null ? void 0 : certificates[open];
  useEffect(() => {
    if (open === null) return;
    const close = (e) => {
      if (e.key === "Escape") setOpen(null);
    };
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, [open]);
  return /* @__PURE__ */ jsxs("section", {
    id: "certificados",
    className: "border-y border-border bg-surface px-5 py-24 lg:px-8",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsx(SectionHead, {
        kicker: "04 / Formaci\xF3n",
        title: "Aprender es parte del trabajo."
      }), /* @__PURE__ */ jsx("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: certificates.map(([name, org, date], i) => /* @__PURE__ */ jsxs("article", {
          className: "reveal-on-scroll rounded-md border border-border bg-card p-5",
          children: [
            /* @__PURE__ */ jsx("div", {
              className: "mb-8 grid size-11 place-items-center rounded-md bg-primary/15 text-primary",
              children: /* @__PURE__ */ jsx(Award, { size: 22 })
            }),
            /* @__PURE__ */ jsxs("p", {
              className: "text-xs font-bold text-primary",
              children: [
                org,
                " \xB7 ",
                date
              ]
            }),
            /* @__PURE__ */ jsx("h3", {
              className: "mt-2 text-lg font-bold",
              children: name
            }),
            /* @__PURE__ */ jsxs("button", {
              onClick: () => setOpen(i),
              className: "mt-6 inline-flex items-center gap-2 text-xs font-bold hover:text-primary",
              children: ["Ver certificado ", /* @__PURE__ */ jsx(ExternalLink, { size: 13 })]
            })
          ]
        }, name))
      })]
    }), open !== null && activeCertificate && /* @__PURE__ */ jsx("div", {
      className: "fixed inset-0 z-[70] grid place-items-center bg-contrast/80 p-5 backdrop-blur-sm",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "cert-title",
      onMouseDown: () => setOpen(null),
      children: /* @__PURE__ */ jsxs("div", {
        className: "animate-scale-in w-full max-w-lg rounded-md bg-card p-7 text-card-foreground shadow-2xl",
        onMouseDown: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between",
            children: [/* @__PURE__ */ jsx(Award, {
              size: 35,
              className: "text-primary"
            }), /* @__PURE__ */ jsx("button", {
              onClick: () => setOpen(null),
              "aria-label": "Cerrar certificado",
              className: "grid size-9 place-items-center rounded-md border border-border",
              children: /* @__PURE__ */ jsx(X, { size: 18 })
            })]
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-8 text-xs font-bold uppercase text-primary",
            children: "Certificado de finalizaci\xF3n"
          }),
          /* @__PURE__ */ jsx("h3", {
            id: "cert-title",
            className: "mt-2 text-2xl font-extrabold",
            children: activeCertificate[0]
          }),
          /* @__PURE__ */ jsxs("p", {
            className: "mt-2 text-muted-foreground",
            children: [
              "Emitido por ",
              activeCertificate[1],
              " \xB7 ",
              activeCertificate[2]
            ]
          }),
          /* @__PURE__ */ jsxs("a", {
            href: activeCertificate[3],
            target: "_blank",
            rel: "noreferrer",
            className: "mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground",
            children: ["Abrir documento ", /* @__PURE__ */ jsx(ExternalLink, { size: 15 })]
          })
        ]
      })
    })]
  });
}
var contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(100),
  email: z.string().trim().email("Ingresa un correo v\xE1lido").max(255),
  subject: z.string().trim().max(120),
  message: z.string().trim().min(10, "Escribe al menos 10 caracteres").max(1e3)
});
var WHATSAPP_NUMBER = "51977831158";
function Contact() {
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setSent(false);
    const currentForm = e.currentTarget;
    const form = new FormData(currentForm);
    const data = Object.fromEntries(form);
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const next = {};
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
      `Correo de contacto: ${data.email}`
    ].filter(Boolean);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSending(false);
    setSent(true);
    currentForm.reset();
  }
  return /* @__PURE__ */ jsx("section", {
    id: "contacto",
    className: "px-5 py-24 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsx(SectionHead, {
        kicker: "05 / Contacto",
        title: "Hagamos algo valioso.",
        copy: "Cu\xE9ntame sobre el producto, el reto o la oportunidad. Respondo normalmente en menos de 24 horas."
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid gap-12 lg:grid-cols-[1.2fr_.8fr]",
        children: [/* @__PURE__ */ jsxs("form", {
          onSubmit: submit,
          noValidate: true,
          className: "reveal-on-scroll grid gap-5 sm:grid-cols-2",
          children: [
            /* @__PURE__ */ jsx(Field, {
              name: "name",
              label: "Nombre completo *",
              error: errors["name"]
            }),
            /* @__PURE__ */ jsx(Field, {
              name: "email",
              label: "Correo electr\xF3nico *",
              type: "email",
              error: errors["email"]
            }),
            /* @__PURE__ */ jsx(Field, {
              name: "subject",
              label: "Asunto",
              error: errors["subject"]
            }),
            /* @__PURE__ */ jsx("div", {}),
            /* @__PURE__ */ jsx(Field, {
              name: "message",
              label: "Mensaje *",
              area: true,
              error: errors["message"]
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "sm:col-span-2 flex flex-wrap items-center gap-4",
              children: [/* @__PURE__ */ jsx("button", {
                disabled: sending,
                className: "inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground disabled:opacity-60",
                children: sending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { className: "spin size-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" }), "Enviando\u2026"] }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Enviar por WhatsApp ", /* @__PURE__ */ jsx(Send, { size: 16 })] })
              }), sent && /* @__PURE__ */ jsxs("span", {
                role: "status",
                className: "animate-fade-in inline-flex items-center gap-2 text-sm font-semibold text-primary",
                children: [/* @__PURE__ */ jsx(CheckCircle2, { size: 17 }), "Te llevamos a WhatsApp con tu mensaje listo."]
              })]
            })
          ]
        }), /* @__PURE__ */ jsxs("aside", {
          className: "reveal-on-scroll border-l border-border pl-7",
          children: [
            /* @__PURE__ */ jsx("h3", {
              className: "font-bold",
              children: "Tambi\xE9n puedes escribirme directamente"
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "mt-6 space-y-4",
              children: [/* @__PURE__ */ jsx(ContactLink, {
                icon: /* @__PURE__ */ jsx(Mail, { size: 17 }),
                label: "Correo",
                value: "albetamirez@gmail.com",
                href: "javascript:void(0)"
              }), /* @__PURE__ */ jsx(ContactLink, {
                icon: /* @__PURE__ */ jsx(Github, { size: 17 }),
                label: "GitHub",
                value: "https://github.com/luis123-code",
                href: "https://github.com/luis123-code"
              })]
            }),
            /* @__PURE__ */ jsxs("a", {
              href: "/cv.pdf",
              download: true,
              className: "mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary",
              children: [/* @__PURE__ */ jsx(Download, { size: 16 }), "Descargar mi CV"]
            })
          ]
        })]
      })]
    })
  });
}
function Field({ name, label, type = "text", area, error }) {
  const cls = `mt-2 w-full rounded-md border bg-card px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none ${error ? "field-shake border-destructive" : "border-input"}`;
  return /* @__PURE__ */ jsxs("label", {
    className: area ? "sm:col-span-2" : "",
    children: [
      /* @__PURE__ */ jsx("span", {
        className: "text-xs font-bold",
        children: label
      }),
      area ? /* @__PURE__ */ jsx("textarea", {
        name,
        rows: 6,
        maxLength: 1e3,
        className: cls,
        "aria-invalid": !!error
      }) : /* @__PURE__ */ jsx("input", {
        name,
        type,
        maxLength: 255,
        className: cls,
        "aria-invalid": !!error
      }),
      error && /* @__PURE__ */ jsx("span", {
        className: "mt-1 block text-xs text-destructive",
        children: error
      })
    ]
  });
}
function ContactLink({ icon, label, value, href }) {
  return /* @__PURE__ */ jsxs("a", {
    href,
    target: href.startsWith("http") ? "_blank" : void 0,
    rel: "noreferrer",
    className: "flex items-center gap-4 rounded-md border border-border bg-card p-4 transition-colors hover:border-primary",
    children: [/* @__PURE__ */ jsx("span", {
      className: "text-primary",
      children: icon
    }), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("small", {
      className: "block text-muted-foreground",
      children: label
    }), /* @__PURE__ */ jsx("strong", {
      className: "text-sm",
      children: value
    })] })]
  });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", {
    className: "border-t border-border bg-surface px-5 py-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "text-xs text-muted-foreground",
        children: [
          "\xA9 ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Luis Zevallos. Dise\xF1ado y desarrollado con intenci\xF3n."
        ]
      }), /* @__PURE__ */ jsx(Socials, {})]
    })
  });
}

export { Portfolio as component };
//# sourceMappingURL=routes-C9qDy06H.mjs.map
