/**
 * Datos de los proyectos, extraídos del componente para que la sección y las
 * escenas puedan importarlos sin crear un ciclo entre ellas.
 *
 * El stack de cada proyecto no está inventado: sale del `package.json` real de
 * cada repositorio.
 */

export type ProjectKind = "web" | "cli";

export type Project = {
  /** Identificador estable, usado también como ruta en la barra del navegador. */
  slug: string;
  title: string;
  /** Marca corta para la barra de navegación del mockup. */
  brand: string;
  category: string;
  description: string;
  /** Tecnologías reales, leídas del package.json del repo. */
  stack: string[];
  /** Secciones reales del producto, para la navegación del mockup. */
  nav: string[];
  image?: string;
  /** "contain" para ilustraciones que no deben recortarse; por defecto "cover". */
  imageFit?: "cover" | "contain";
  demo?: string;
  repo?: string;
  /**
   * "web" se presenta como sitio dentro del navegador; "cli" como sesión de
   * terminal. agent-orchestra no tiene interfaz gráfica: fingirle una web y un
   * teléfono sería inventar un producto que no existe.
   */
  kind: ProjectKind;
  /** Líneas de la sesión de terminal, solo para kind: "cli". */
  terminal?: { prompt?: string; text: string; tone?: "dim" | "ok" | "accent" }[];
  /** Ilustración 3D que acompaña la escena. */
  character?: Character;
};

export type Character = {
  src: string;
  /** Lado del escenario al que se ancla. */
  side: "left" | "right";
  /** Ancho, en % del ancho del escenario. */
  width: number;
  /** Separación desde el borde lateral, en % del ancho del escenario. */
  offset: number;
  /**
   * Anclaje vertical, en % de la ALTURA del escenario (asi resuelve el CSS los
   * porcentajes de top/bottom, a diferencia de width). `top` negativo asoma
   * por encima de la tapa; `bottom` lo apoya a la altura de la base.
   */
  top?: number;
  bottom?: number;
  /** "behind" queda tapado por el portátil; "front" se le monta encima. */
  depth: "behind" | "front";
};

export const projects: Project[] = [
  {
    slug: "nexus",
    title: "Nexus",
    brand: "Nexus",
    category: "SaaS · Gestión de clientes",
    description:
      "Plataforma integral bajo el modelo Software as a Service (SaaS) orientada a la administración centralizada de clientes, contratos y flujos de trabajo para freelancers y empresas de desarrollo.",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase"],
    nav: ["Clientes", "Contratos", "Flujos"],
    image: "/dashboard.png",
    repo: "https://github.com/chinobustos/Nexus",
    kind: "web"
    // El personaje de esta escena se mudó detrás del título "PROYECTOS".
  },
  {
    slug: "smartcore-gym",
    title: "SmartCore Gym",
    brand: "SmartCore Gym",
    category: "SaaS · Gestión de gimnasios",
    description:
      "Gestión de Membresías y Dashboard Analítico con control automático de vencimientos (lógica asíncrona) y visualización de KPIs en tiempo real.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Radix UI", "Recharts"],
    nav: ["Socios", "Membresías", "Clases", "Inventario"],
    image: "/gym.png",
    // La captura es muy panorámica (1626x893): con "cover" se recortaría el
    // formulario de login por la izquierda y las métricas por la derecha.
    imageFit: "contain",
    repo: "https://github.com/chinobustos/SmartCore-Gym",
    kind: "web",
    // Sostiene un teléfono, y en esta escena el iPhone cae a la izquierda:
    // va a la derecha, asomando por detrás, para equilibrar la composición.
    character: {
      src: "/cel.png",
      side: "right",
      width: 44,
      offset: 0,
      top: -36,
      depth: "behind"
    }
  },
  {
    slug: "agent-orchestra",
    title: "agent-orchestra",
    brand: "agent-orchestra",
    category: "CLI · Orquestación de agentes",
    description:
      "agent-orchestra es un orquestador de agentes de IA multi-proveedor para la terminal. Preguntas a un solo proveedor (Claude, Codex, Grok, o cualquiera que añadas) o encadenas varios en un workflow declarativo, sin escribir código para cada combinación nueva.",
    stack: ["TypeScript", "Node.js 22", "YAML", "Zod", "Vitest"],
    nav: [],
    // SVG vectorial: ~4 KB, nítido en cualquier pantalla y sin coste de decodificación.
    image: "/agent-orchestra.svg",
    imageFit: "contain",
    repo: "https://github.com/chinobustosdev/agent-orchestra",
    kind: "cli",
    // `orq` es el binario real declarado en el package.json del repo.
    terminal: [
      { prompt: "$", text: "orq run workflow.yaml" },
      { text: "steps:", tone: "dim" },
      { text: "  - provider: claude", tone: "dim" },
      { text: "  - provider: codex", tone: "dim" },
      { text: "  - provider: grok", tone: "dim" },
      { text: "" },
      { text: "✓ claude   1.2s", tone: "ok" },
      { text: "✓ codex    0.9s", tone: "ok" },
      { text: "✓ grok     1.1s", tone: "ok" },
      { text: "" },
      { text: "→ workflow completado", tone: "accent" },
      { prompt: "$", text: "" }
    ],
    // Está sentado usando un portátil, y esta escena no lleva iPhone: ocupa
    // el hueco de la derecha, en primer plano y apoyado a la altura de la base.
    character: {
      src: "/focus.png",
      side: "right",
      width: 36,
      offset: -7,
      bottom: -8,
      depth: "front"
    }
  }
];
