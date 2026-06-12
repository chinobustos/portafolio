import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Nexus",
    description:
      "Plataforma integral bajo el modelo Software as a Service (SaaS) orientada a la administración centralizada de clientes, contratos y flujos de trabajo para freelancers y empresas de desarrollo.",
    image:
      "/dashboard.png"
  },
  {
    title: "GymOS",
    description:
      "Gestión de Membresías y Dashboard Analítico con control automático de vencimientos (lógica asíncrona) y visualización de KPIs en tiempo real.",
    image:
      "/gym.png"
  }
];

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
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

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
                style={{ y: parallaxY }}
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
                <img
                  src={project.image}
                  alt={`Proyecto ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[420px] object-cover scale-105"
                />
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
                  <a
                    href="#"
                    className="flex items-center gap-3 text-white glass-button-dark px-6 py-3 rounded-lg"
                  >
                    <ExternalLink size={18} />
                    Live Preview
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 text-white border border-white/20 px-6 py-3 rounded-lg hover:bg-white/5 transition"
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