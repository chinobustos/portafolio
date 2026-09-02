import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Reparte un texto en letras y las hace crecer desde la línea de base, una
 * detrás de otra.
 *
 * Ojo con `scaleY` y el origen: si el origen queda al centro, las letras se
 * abren como una persiana desde el medio. Creciendo desde `bottom` es como si
 * subieran desde la base, que es el gesto de la referencia.
 *
 * Dos trampas que costaron encontrar:
 *
 * 1. `whileInView` puesto en cada letra no dispara nunca. Una letra en
 *    `scaleY: 0` tiene altura cero, y un elemento de área cero jamás alcanza
 *    el umbral del IntersectionObserver. Por eso el observador va en el
 *    contenedor: los transforms no afectan al layout, así que el contenedor
 *    conserva su alto real aunque las letras estén aplastadas.
 *
 * 2. Resolverlo con variantes y `staggerChildren` tampoco alcanzó: el estado
 *    inicial se propagaba a las letras pero el de destino no. Acá el estado
 *    va explícito en cada letra, sin depender de esa propagación.
 *
 * `fade` queda desactivado en el h1 del hero a propósito: ese titular usa
 * `background-clip: text`, y el degradado lo pinta el elemento padre, no cada
 * letra. Animar la opacidad de una letra no afecta a ese relleno; el `scaleY`
 * sí, porque mueve el glifo que recorta el degradado.
 */
export const SplitText = ({
  text,
  /** Segundos antes de que arranque la primera letra. */
  delay = 0,
  /** Separación entre letras. */
  stagger = 0.045,
  duration = 0.6,
  /** Acompañar el crecimiento con una entrada de opacidad. */
  fade = false,
  /**
   * Disparar al entrar en pantalla en vez de al montar. El hero anima al
   * montarse porque ya está visible; una sección más abajo tiene que esperar
   * a que el usuario llegue.
   */
  inView = false,
  className
}: {
  text: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  fade?: boolean;
  inView?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: false, amount: 0.4 });
  const activo = inView ? visto : true;

  return (
    <span ref={ref} className={className}>
      {/* El texto completo queda accesible; las letras sueltas se ocultan del
          árbol de accesibilidad para que un lector no deletree. */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {Array.from(text).map((char, i) =>
          char === " " ? (
            <span key={i}> </span>
          ) : (
            <motion.span
              key={i}
              className="inline-block"
              style={{ transformOrigin: "bottom", willChange: "transform" }}
              initial={fade ? { scaleY: 0, opacity: 0 } : { scaleY: 0 }}
              animate={
                activo
                  ? fade
                    ? { scaleY: 1, opacity: 1 }
                    : { scaleY: 1 }
                  : fade
                  ? { scaleY: 0, opacity: 0 }
                  : { scaleY: 0 }
              }
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {char}
            </motion.span>
          )
        )}
      </span>
    </span>
  );
};

export default SplitText;
