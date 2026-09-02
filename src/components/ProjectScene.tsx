import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import type { Character, Project } from "../data/projects";
import { useSceneProgress, usePrefersReducedMotion } from "../hooks/useSceneProgress";
import { MacBookPro } from "./devices/MacBookPro";
import { IPhonePro } from "./devices/IPhonePro";
import { MockSite, MockTerminal } from "./devices/MockScreen";

/*
 * Las tres capas derivan del mismo progreso 0→1 de la escena, pero con
 * ventanas distintas: el iPhone entra más tarde y sale antes que el Mac, y el
 * texto llega el último y se va el primero. Ese desfase es lo que produce la
 * sensación de profundidad; sin él las tres capas se mueven como una calcomanía.
 */
const WINDOW = {
  mac: [0, 0.26, 0.5, 0.74, 1],
  // El personaje va entre el Mac y el teléfono: es otro plano de profundidad.
  character: [0, 0.3, 0.5, 0.71, 1],
  phone: [0, 0.34, 0.5, 0.68, 1],
  text: [0, 0.4, 0.5, 0.62, 1]
} as const;

const ProjectScene = ({
  project,
  index,
  total,
  progress: externalProgress
}: {
  project: Project;
  index: number;
  total: number;
  /** Progreso provisto por la pila. Sin él, la escena se mide sola. */
  progress?: MotionValue<number>;
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const ownProgress = useSceneProgress(sceneRef);
  const progress = externalProgress ?? ownProgress;
  const reduced = usePrefersReducedMotion();

  // El iPhone alterna de lado según el índice.
  const phoneOnLeft = index % 2 === 1;

  return (
    <div
      ref={sceneRef}
      className="relative flex h-full min-h-screen flex-col items-center justify-center gap-5 px-6 py-12 md:gap-6"
    >
      <Stage
        progress={progress}
        reduced={reduced}
        project={project}
        phoneOnLeft={phoneOnLeft}
      />

      <Details
        progress={progress}
        reduced={reduced}
        project={project}
        index={index}
        total={total}
      />
    </div>
  );
};

/* ============================ Escenario 3D ============================ */

const Stage = ({
  progress,
  reduced,
  project,
  phoneOnLeft
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  project: Project;
  phoneOnLeft: boolean;
}) => {
  const { mac, phone } = WINDOW;

  const macOpacity = useTransform(progress, [...mac], [0, 1, 1, 1, 0]);
  const macScale = useTransform(progress, [...mac], [0.82, 1, 1, 1, 0.9]);
  const macRotate = useTransform(progress, [...mac], [22, 0, 0, 0, -14]);
  const macY = useTransform(progress, [...mac], [110, 0, 0, 0, -80]);
  const macBlurPx = useTransform(progress, [...mac], [12, 0, 0, 0, 8]);
  const macBlur = useTransform(macBlurPx, (v) => `blur(${v}px)`);

  // El teléfono entra lateralmente desde la derecha y se desliza hasta su sitio.
  // El desplazamiento va en porcentaje de su propio ancho, así arranca siempre
  // fuera de cuadro sea cual sea el tamaño del escenario. La salida se mantiene
  // hacia arriba, para que entrada y salida no se confundan entre sí.
  const phoneOpacity = useTransform(progress, [...phone], [0, 1, 1, 1, 0]);
  const phoneScale = useTransform(progress, [...phone], [0.78, 1, 1, 1, 0.86]);
  const phoneRotate = useTransform(progress, [...phone], [10, 0, 0, 0, -18]);
  const phoneRotateY = useTransform(progress, [...phone], [-18, 0, 0, 0, 0]);
  const phoneX = useTransform(progress, [...phone], ["210%", "0%", "0%", "0%", "0%"]);
  const phoneY = useTransform(progress, [...phone], [40, 0, 0, 0, -140]);
  const phoneBlurPx = useTransform(progress, [...phone], [16, 0, 0, 0, 10]);
  const phoneBlur = useTransform(phoneBlurPx, (v) => `blur(${v}px)`);

  const still = { rotateX: 0, y: 0, scale: 1, filter: "none" };

  return (
    <div
      // Acotar por altura de viewport: si no, el MacBook empuja la ficha fuera
      // del fold en pantallas anchas y bajas. 52vh es lo que sobra tras
      // descontar el padding de la escena y la altura real de la ficha
      // (rótulo + título + descripción + chips + botones), medido en el navegador.
      className="relative w-[min(100%,66vh,calc((100vh-472px)*1.37))]"
      style={{ perspective: "1800px" }}
    >
      {/* Halo detrás del producto. Se atenúa con el propio Mac para que no
          quede una mancha de luz flotando cuando el dispositivo ya salió. */}
      {!reduced && <motion.span className="stage__halo" style={{ opacity: macOpacity }} />}

      <motion.div
        className="relative z-10"
        style={{
          opacity: macOpacity,
          transformOrigin: "bottom",
          willChange: "transform, opacity, filter",
          ...(reduced
            ? still
            : {
                scale: macScale,
                rotateX: macRotate,
                y: macY,
                filter: macBlur
              })
        }}
      >
        <div className={reduced ? undefined : "device-float"}>
          {project.kind === "cli" ? (
            <MacBookPro chrome="terminal" title={`orq — ${project.slug}`}>
              <MockTerminal project={project} />
            </MacBookPro>
          ) : (
            <MacBookPro path={`/${project.slug}`}>
              <MockSite project={project} variant="desktop" animate={!reduced} />
            </MacBookPro>
          )}
        </div>
      </motion.div>

      {project.character && (
        <SceneCharacter
          character={project.character}
          progress={progress}
          reduced={reduced}
        />
      )}

      {/* El iPhone se oculta por debajo de 640 px: a ese ancho mide ~75 px y
          solo estorba. Y no se dibuja para proyectos sin interfaz gráfica:
          un teléfono mostrando una CLI sería inventar un producto. */}
      {project.kind === "web" && (
        <motion.div
          className={`absolute bottom-[-6%] z-20 hidden w-[25%] sm:block ${
            phoneOnLeft ? "left-[2%]" : "right-[2%]"
          }`}
          style={{
            opacity: phoneOpacity,
            transformOrigin: "bottom",
            willChange: "transform, opacity, filter",
            ...(reduced
              ? { ...still, x: 0, rotateY: 0 }
              : {
                  scale: phoneScale,
                  rotateX: phoneRotate,
                  rotateY: phoneRotateY,
                  x: phoneX,
                  y: phoneY,
                  filter: phoneBlur
                })
          }}
        >
          <div
            className={reduced ? undefined : "device-float device-float--phone"}
          >
            <IPhonePro>
              <MockSite project={project} variant="phone" animate={!reduced} />
            </IPhonePro>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ============================ Personaje ============================ */

const SceneCharacter = ({
  character,
  progress,
  reduced
}: {
  character: Character;
  progress: MotionValue<number>;
  reduced: boolean;
}) => {
  const { character: win } = WINDOW;
  const fromSide = character.side === "left" ? "-70%" : "70%";

  const opacity = useTransform(progress, [...win], [0, 1, 1, 1, 0]);
  const scale = useTransform(progress, [...win], [0.84, 1, 1, 1, 0.92]);
  const x = useTransform(progress, [...win], [fromSide, "0%", "0%", "0%", "0%"]);
  const y = useTransform(progress, [...win], [90, 0, 0, 0, -110]);
  const blurPx = useTransform(progress, [...win], [14, 0, 0, 0, 9]);
  const blur = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <motion.div
      // Se oculta por debajo de 768 px: a ese ancho el escenario es tan
      // estrecho que el personaje se le encima al portátil.
      className={`pointer-events-none absolute hidden md:block ${
        character.depth === "behind" ? "z-[5]" : "z-30"
      }`}
      style={{
        width: `${character.width}%`,
        [character.side]: `${character.offset}%`,
        ...(character.top !== undefined ? { top: `${character.top}%` } : {}),
        ...(character.bottom !== undefined
          ? { bottom: `${character.bottom}%` }
          : {}),
        opacity,
        transformOrigin: "bottom",
        willChange: "transform, opacity, filter",
        ...(reduced
          ? { x: 0, y: 0, scale: 1, filter: "none" }
          : { scale, x, y, filter: blur })
      }}
    >
      <div className={reduced ? undefined : "device-float device-float--char"}>
        <img
          src={character.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
        />
      </div>
    </motion.div>
  );
};

/* ============================ Ficha del proyecto ============================ */

const Details = ({
  progress,
  reduced,
  project,
  index,
  total
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  project: Project;
  index: number;
  total: number;
}) => {
  const { text } = WINDOW;
  const opacity = useTransform(progress, [...text], [0, 1, 1, 1, 0]);
  const y = useTransform(progress, [...text], [70, 0, 0, 0, -50]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      style={{
        opacity,
        willChange: "transform, opacity",
        ...(reduced ? { y: 0 } : { y })
      }}
    >
      <p className="mb-5 text-xs uppercase tracking-[0.28em] text-accent-400">
        <span className="text-white/35">
          {pad(index + 1)} / {pad(total)}
        </span>
        <span className="mx-3 text-white/20">·</span>
        {project.category}
      </p>

      <h3 className="mb-5 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
        {project.title}
      </h3>

      <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
        {project.description}
      </p>

      <ul className="mb-8 flex flex-wrap justify-center gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap justify-center gap-4">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button-dark flex items-center gap-3 rounded-lg px-6 py-3 text-white"
          >
            <ExternalLink size={18} />
            Demo
          </a>
        )}

        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-white/20 px-6 py-3 text-white transition-colors hover:bg-white/5"
          >
            <Github size={18} />
            Código
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectScene;
