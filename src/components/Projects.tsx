import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Terminal } from "lucide-react";

type Project = {
  title: string;
  description: string;
  image?: string;
  /** "contain" para ilustraciones que no deben recortarse; por defecto "cover". */
  imageFit?: "cover" | "contain";
  demo?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    title: "Nexus",
    description:
      "Plataforma integral bajo el modelo Software as a Service (SaaS) orientada a la administración centralizada de clientes, contratos y flujos de trabajo para freelancers y empresas de desarrollo.",
    image:
      "/dashboard.png"
  },
  {
    title: "SmartCore Gym",
    description:
      "Gestión de Membresías y Dashboard Analítico con control automático de vencimientos (lógica asíncrona) y visualización de KPIs en tiempo real.",
    image: "/gym.png",
    // La captura es muy panorámica (1626x893): con "cover" se recortaría el
    // formulario de login por la izquierda y las métricas por la derecha.
    imageFit: "contain"
  },
  {
    title: "agent-orchestra",
    description:
      "agent-orchestra es un orquestador de agentes de IA multi-proveedor para la terminal. Preguntas a un solo proveedor (Claude, Codex, Grok, o cualquiera que añadas) o encadenas varios en un workflow declarativo, sin escribir código para cada combinación nueva.",
    // SVG vectorial: ~4 KB, nítido en cualquier pantalla y sin coste de decodificación.
    image: "/agent-orchestra.svg",
    // El fondo del SVG es el mismo negro de la tarjeta, así que "contain" no
    // deja bordes visibles y evita recortar el grafo en pantallas angostas.
    imageFit: "contain",
    repo: "https://github.com/chinobustosdev/agent-orchestra"
  }
];

/*
 * Ruido de fondo embebido como data URI. Antes se descargaba de un dominio
 * externo (grainy-gradients.vercel.app) y se componía con `mix-blend-overlay`,
 * que obliga al navegador a recomponer todo el contexto de apilado en cada
 * frame de scroll. Con opacidad 0.04 el resultado visual es el mismo sin blend.
 */
const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Marcador para proyectos que todavía no tienen captura. */
const ProjectPlaceholder = ({ title }: { title: string }) => (
  <div className="w-full h-[420px] bg-[#0d0d14] flex flex-col items-center justify-center gap-4 border border-white/5">
    <Terminal size={44} className="text-blue-400/70" />
    <code className="text-zinc-400 text-sm tracking-wide">$ {title}</code>
  </div>
);

const Projects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-80px", "80px"]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0A0A0F] py-32 overflow-hidden"
    >
      {/* 🔥 Fondo Tech diagonal */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(135deg,white_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 🔥 Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: NOISE_URL }}
      />

      <div className="max-w-7xl mx-auto px-6 space-y-48 relative z-10">

        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative grid md:grid-cols-2 gap-20 items-center"
            >
              {/* Número gigante flotando */}
              <div className="absolute -z-10 text-[22vw] font-bold text-white/5 top-1/2 -translate-y-1/2 right-0 select-none">
                0{index + 1}
              </div>

              {/* IMAGEN */}
              <motion.div
                style={{ y: parallaxY, willChange: "transform" }}
                initial={{
                  opacity: 0,
                  x: isEven ? -120 : 120,
                  y: 100,
                  filter: "blur(12px)"
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  filter: "blur(0px)"
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className={`glass-dark relative rounded-2xl overflow-hidden ${
                  isEven ? "order-1" : "order-1 md:order-2"
                }`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Proyecto ${project.title}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Si todavía no existe la captura, se oculta la imagen rota
                      // y queda el fondo de la tarjeta.
                      e.currentTarget.style.display = "none";
                    }}
                    className={`w-full h-[420px] ${
                      project.imageFit === "contain"
                        ? "object-contain bg-[#0A0A0F]"
                        : "object-cover scale-105"
                    }`}
                  />
                ) : (
                  <ProjectPlaceholder title={project.title} />
                )}
              </motion.div>

              {/* TEXTO */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: isEven ? 120 : -120,
                  y: -80
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className={`${isEven ? "order-2" : "order-2 md:order-1"}`}
              >
                <p className="text-blue-400 uppercase tracking-widest text-xs mb-6">
                  Case Study 0{index + 1}
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 leading-tight">
                  {project.title}
                </h2>

                <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-6">
                  {project.demo || !project.repo ? (
                    <a
                      href={project.demo ?? "#"}
                      {...(project.demo
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center gap-3 text-white glass-button-dark px-6 py-3 rounded-lg"
                    >
                      <ExternalLink size={18} />
                      Live Preview
                    </a>
                  ) : null}

                  <a
                    href={project.repo ?? "#"}
                    {...(project.repo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-3 text-white border border-white/20 px-6 py-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Github size={18} />
                    Source Code
                  </a>
                </div>
              </motion.div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default Projects;
