import { motion } from "framer-motion";
import { Download } from "lucide-react";
import profileImg from "../assets/profile.png";
import SplitText from "./SplitText";

/*
 * Reversión editorial: retrato enmarcado a la izquierda y todo el discurso
 * alineado a la izquierda en la columna derecha.
 *
 * El texto es el que ya tenías, solo repartido en dos niveles: la frase corta
 * pasa a titular con palabras acentuadas, y el resto queda como cuerpo. No
 * inventé copy nuevo.
 */

/** Solo datos verificables en el propio sitio. */
const FICHA = [
  { label: "Ubicación", value: "Mendoza, Argentina" },
  { label: "Enfoque", value: "Frontend & UX/UI" },
  { label: "Stack", value: "React · TypeScript" }
];

const About = () => (
  <section id="about" className="min-h-screen py-24 bg-black">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">

      {/* Rótulo de sección con su regla, como en la referencia.
          El título entra letra por letra desde la línea de base, el mismo
          gesto que el titular del hero, en vez del desplazamiento en bloque
          que usan las otras secciones. */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-2xl font-semibold tracking-[0.2em] text-white md:text-3xl">
          <SplitText text="SOBRE MÍ" inView stagger={0.055} duration={0.7} />
        </h2>

        {/* La regla se dibuja desde el centro, después del título. */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 block h-px w-full max-w-md origin-center bg-gradient-to-r from-transparent via-accent-500 to-transparent"
        />
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-20">

        {/* IZQUIERDA — retrato enmarcado */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          {/* El nombre fantasma detrás del retrato, como en la referencia */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-3 font-display text-2xl font-bold uppercase tracking-tight text-white/[0.18] md:text-3xl"
          >
            Ivan Bustos
          </span>

          <img
            src={profileImg}
            alt="Ivan Bustos"
            width={1200}
            height={810}
            loading="lazy"
            decoding="async"
            className="w-full object-contain"
          />
        </motion.div>

        {/* DERECHA — discurso */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="mb-6 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">
            <span className="h-px w-10 bg-accent-500" />
            ¿Quién soy?
          </p>

          <h3 className="font-display text-3xl font-semibold uppercase leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
            Apasionado por crear{" "}
            <span className="text-accent-500">experiencias digitales</span>
          </h3>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Especializado en el desarrollo moderno con enfoque en la experiencia
            del usuario.
          </p>

          {/* Ficha de datos */}
          <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-white/10 pt-10 sm:grid-cols-3">
            {FICHA.map((item) => (
              <div key={item.label}>
                <dt className="mb-2 text-[0.65rem] uppercase tracking-[0.2em] text-accent-500">
                  {item.label}
                </dt>
                <dd className="text-sm uppercase tracking-wide text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <motion.a
            href="/CV_Ivan_Bustos.pdf"
            download="CV_Ivan_Bustos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-12 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-600 to-accent-700 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:from-accent-700 hover:to-accent-800"
          >
            <Download size={20} />
            DESCARGAR CV
          </motion.a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
