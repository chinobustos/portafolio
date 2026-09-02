import { usePrefersReducedMotion } from "../hooks/useSceneProgress";

/*
 * Antesala de la sección de proyectos: la palabra gigante con aspecto líquido
 * y una marquesina de tecnologías, como en la referencia.
 *
 * El efecto "goteo" es el filtro gooey clásico: desenfocar y después subir
 * brutalmente el contraste del canal alfa. Los bordes cercanos se funden entre
 * sí y las gotas sueltas se pegan a las letras al acercarse. El filtro se
 * aplica una vez y no se anima: animarlo obligaría a recalcularlo por frame.
 */

/** Tecnologías reales, las mismas que declaran los repos de los proyectos. */
const TAGS = [
  "React",
  "TypeScript",
  "Next.js",
  "Supabase",
  "Tailwind CSS",
  "Vite",
  "Node.js",
  "Zod"
];

const DROPS = [
  { left: "16%", top: "76%", size: 30 },
  { left: "29%", top: "88%", size: 20 },
  { left: "47%", top: "82%", size: 34 },
  { left: "62%", top: "90%", size: 18 },
  { left: "73%", top: "78%", size: 26 },
  { left: "84%", top: "86%", size: 22 }
];

const WorkIntro = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* El filtro vive en un SVG sin dimensiones: solo aporta la definición. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <filter id="liquido">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>

      {/* Sin animación de scroll en este contenedor, a propósito.
          El filtro gooey desenfoca un área de ~1300x280px; cualquier cambio de
          estilo en un ancestro —incluida la opacidad— obliga a re-rasterizarla
          en cada frame, y eso bastaba para colgar la página entera. Rasteriza
          una sola vez y después solo se compone. */}
      <div className="relative w-full">
        {/* El personaje asoma por detrás del título, centrado.
            Detrás del MacBook alcanzaba con el z-index, porque la tapa es un
            rectángulo opaco. Una palabra no lo es: el cuerpo se colaba por los
            huecos entre letras. Por eso va dentro de un contenedor con
            `overflow-hidden` más bajo que la imagen, que la recorta a la altura
            de la cabeza; lo que queda se superpone al filo superior de las
            letras y se lee como que está detrás.
            Y va fuera del contenedor del filtro líquido: adentro, el umbral de
            alfa del gooey lo despedazaría. */}
        {/* Aura naranja detrás del personaje. Es un degradado radial, no un
            `blur`: un desenfoque más acá terminaría de hundir el rendimiento
            que ya sufrió con el filtro gooey. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-0 aspect-square w-[38%] max-w-[460px] -translate-x-1/2 -translate-y-[62%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,85,51,0.22) 0%, rgba(255,85,51,0.10) 38%, rgba(255,85,51,0) 70%)"
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-0 w-[27%] max-w-[330px] -translate-x-1/2 -translate-y-[82%] overflow-hidden"
          // 238/178 recorta a ~73% de la imagen: entra la cara completa con
          // anteojos y boca. A 54% el corte caia justo sobre los anteojos.
          style={{ aspectRatio: "238 / 178" }}
        >
          <img
            src="/front.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full drop-shadow-[0_18px_34px_rgba(0,0,0,0.55)]"
          />
        </div>

        <div
          className="relative z-10 flex items-center justify-center"
          style={{ filter: reduced ? undefined : "url(#liquido)" }}
        >
          <h2 className="font-display text-[14vw] font-bold leading-[0.85] tracking-tighter text-accent-500">
            PROYECTOS
          </h2>

          {/* Gotas: al entrar en el radio del filtro se funden con las letras. */}
          {!reduced &&
            DROPS.map((d, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute rounded-full bg-accent-500"
                style={{
                  left: d.left,
                  top: d.top,
                  width: d.size,
                  height: d.size
                }}
              />
            ))}
        </div>
      </div>

      {/* Marquesina de tecnologías */}
      <div className="mt-14 w-screen overflow-hidden border-y border-white/10 py-4">
        <div className={reduced ? "flex" : "marquee flex w-max"}>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-10 pr-10"
            >
              {TAGS.map((tag) => (
                <li
                  key={tag}
                  className="flex items-center gap-10 whitespace-nowrap text-xs uppercase tracking-[0.2em] text-zinc-400"
                >
                  {tag}
                  <span className="h-1 w-1 rounded-full bg-accent-500" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkIntro;
