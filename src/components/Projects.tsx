import { useRef, type RefObject } from "react";

import { projects } from "../data/projects";
import { useStackProgress } from "../hooks/useSceneProgress";
import ProjectScene from "./ProjectScene";
import WorkIntro from "./WorkIntro";

/*
 * Ruido de fondo embebido como data URI. Antes se descargaba de un dominio
 * externo (grainy-gradients.vercel.app) y se componía con `mix-blend-overlay`,
 * que obliga al navegador a recomponer todo el contexto de apilado en cada
 * frame de scroll. Con opacidad 0.04 el resultado visual es el mismo sin blend.
 */
const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Backdrop = () => (
  <>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,white_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: NOISE_URL }}
    />
  </>
);

/**
 * Una tarjeta de la pila. Todas comparten `top: 0`, así que cada una queda
 * clavada arriba y la siguiente —que se pinta después, por su z-index— sube
 * desde abajo y la tapa. Ese solapamiento es el efecto de la referencia.
 *
 * Cada tarjeta necesita fondo propio y opaco: si fuera transparente se vería
 * la tarjeta de abajo a través de ella.
 */
const StackedScene = ({
  index,
  total,
  stackRef
}: {
  index: number;
  total: number;
  stackRef: RefObject<HTMLDivElement | null>;
}) => {
  const progress = useStackProgress(stackRef, index);

  return (
    <div
      className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0F]"
      style={{ zIndex: index + 1 }}
    >
      <Backdrop />
      <div className="relative z-10 h-full">
        <ProjectScene
          project={projects[index]}
          index={index}
          total={total}
          progress={progress}
        />
      </div>
    </div>
  );
};

const Projects = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="relative bg-[#0A0A0F]">
      <Backdrop />

      <div className="relative z-10">
        {/* Antesala: palabra gigante + marquesina, antes de la pila. */}
        <WorkIntro />

        {/* La pila. El contenedor sí se desplaza con el scroll, y de su
            posición sale el progreso de cada tarjeta clavada. */}
        <div ref={stackRef} className="relative">
          {projects.map((project, index) => (
            <StackedScene
              key={project.slug}
              index={index}
              total={projects.length}
              stackRef={stackRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
