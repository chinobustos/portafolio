import { motion } from "framer-motion";
import { Code2, Layers, Database, Wrench } from "lucide-react";

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

const GRUPOS = [
  {
    icon: Code2,
    titulo: "Lenguajes",
    detalle: "La base del navegador: marcado, estilos y tipado estático.",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript"]
  },
  {
    icon: Layers,
    titulo: "Interfaz",
    detalle: "Componentes, renderizado y estilos utilitarios.",
    items: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    icon: Database,
    titulo: "Datos",
    detalle: "Base relacional y backend gestionado.",
    items: ["PostgreSQL", "Supabase"]
  },
  {
    icon: Wrench,
    titulo: "Herramientas",
    detalle: "Versionado, editor, diseño y despliegue.",
    // Todas verificables: los repos están en GitHub, el portafolio y SmartCore
    // se despliegan en Vercel, y Vite es el bundler de este proyecto y de Nexus.
    items: ["Git", "GitHub", "Cursor", "Figma", "Vite", "Vercel"]
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
          Lo que uso a diario para construir. Cada proyecto de abajo declara su
          stack real, tomado de su propio repositorio.
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

              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                {grupo.detalle}
              </p>

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
