import { motion } from "framer-motion";
import {
  Code2,
  Database,
  FlaskConical,
  GitBranch,
  PenTool,
  Sparkles,
  Users
} from "lucide-react";

import SplitText from "./SplitText";

/*
 * Reemplaza a "Mis Servicios", que encuadraba freelance y se apoyaba en
 * porcentajes autoevaluados.
 *
 * Estructura tomada de la referencia: titular grande a la izquierda y una
 * lista de filas a la derecha, separadas por filetes. Sin flechas ni enlaces:
 * no llevarían a ningún lado, y ya sacamos de la página todos los controles
 * que prometían algo y no cumplían.
 */

/** Las categorías y su contenido son las que declara Ivan en su CV. */
const GRUPOS = [
  {
    icon: Code2,
    titulo: "Lenguajes y Frameworks",
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React.js",
      "Next.js",
      "Vue.js",
      "HTML5",
      "CSS3",
      "Sass",
      "CSS-in-JS",
      "Tailwind CSS"
    ]
  },
  {
    icon: Database,
    titulo: "Backend e Integraciones",
    items: [
      "Node.js",
      "REST APIs",
      "Supabase",
      "PostgreSQL",
      "Mercado Pago",
      "Stripe"
    ]
  },
  {
    icon: FlaskConical,
    titulo: "Testing y Calidad",
    items: ["Jest", "React Testing Library", "Lighthouse"]
  },
  {
    icon: GitBranch,
    titulo: "Control de Versiones y Deploy",
    items: ["Git", "GitFlow", "Vercel", "CI/CD"]
  },
  {
    icon: PenTool,
    titulo: "Diseño UX/UI",
    items: [
      "Figma",
      "Wireframing",
      "Prototipado interactivo",
      "User flows",
      "Design systems"
    ]
  },
  {
    icon: Sparkles,
    titulo: "Inteligencia Artificial",
    detalle: "Automatización de flujos de desarrollo.",
    items: ["Claude Code", "Codex", "Groq"]
  },
  {
    icon: Users,
    titulo: "Metodología",
    items: ["Scrum", "Desarrollo ágil"]
  }
];

const Stack = () => (
  <section id="tecnologias" className="min-h-screen bg-black py-24">
    <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-20 lg:px-8">

      {/* IZQUIERDA — titular */}
      <div className="lg:pt-6">
        <p className="mb-6 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">
          <span className="h-px w-10 bg-accent-500" />
          Stack
        </p>

        <h2 className="font-display text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
          <span className="block text-white/35">Tecnologías</span>
          <SplitText text="que domino" inView stagger={0.045} duration={0.7} />
        </h2>

        <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
          Lo que uso a diario para construir. Cada proyecto de abajo declara el
          stack con el que está hecho.
        </p>
      </div>

      {/* DERECHA — lista de grupos */}
      <ul className="border-t border-white/10">
        {GRUPOS.map((grupo, i) => (
          <motion.li
            key={grupo.titulo}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.09 }}
            className="group flex items-start gap-6 border-b border-white/10 py-8"
          >
            <span className="w-6 shrink-0 pt-1 text-[0.7rem] tabular-nums text-zinc-600">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-2.5 text-accent-500">
              <grupo.icon size={18} strokeWidth={1.8} />
            </span>

            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                {grupo.titulo}
              </h3>

              {grupo.detalle && (
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {grupo.detalle}
                </p>
              )}

              <ul className="mt-4 flex flex-wrap gap-2">
                {grupo.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default Stack;
