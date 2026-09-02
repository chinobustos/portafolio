import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { usePrefersReducedMotion } from "../hooks/useSceneProgress";

/*
 * Cortina de entrada: un saludo que rota de idioma y después se abre en una
 * grilla de bloques que revelan el hero.
 *
 * La propagación no es radial pura: el retraso pesa mucho más por fila que por
 * columna, así que la fila central corre primero a lo ancho y recién después
 * crece hacia arriba y abajo. Eso es lo que produce la "cruz" que se ve
 * mientras abre, en lugar de un círculo.
 */

const COLS = 10;
const ROWS = 7;

const GREETINGS = ["hola", "hello", "olá", "ciao", "bonjour"];

const GREETING_STEP = 0.32; // seg. por idioma
const CURTAIN_HOLD = GREETINGS.length * GREETING_STEP; // fin del saludo
const CELL_DURATION = 0.7;
const ROW_STEP = 0.14;
const COL_STEP = 0.05;

// Distancia real al centro, no `floor`: con COLS par el centro cae entre dos
// columnas, así que el máximo es (COLS-1)/2 y no COLS/2.
const maxDelay =
  ((ROWS - 1) / 2) * ROW_STEP + ((COLS - 1) / 2) * COL_STEP;

/** Momento en que la cortina empieza a abrirse: el hero entra a partir de acá. */
export const INTRO_REVEAL_AT = CURTAIN_HOLD + 0.2;

/** Duración total, para desmontar. */
const INTRO_TOTAL = INTRO_REVEAL_AT + maxDelay + CELL_DURATION;

const HeroIntro = () => {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [greeting, setGreeting] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }

    const rotator = window.setInterval(() => {
      setGreeting((i) => Math.min(i + 1, GREETINGS.length - 1));
    }, GREETING_STEP * 1000);

    const end = window.setTimeout(() => setVisible(false), INTRO_TOTAL * 1000);

    return () => {
      window.clearInterval(rotator);
      window.clearTimeout(end);
    };
  }, [reduced]);

  // Con movimiento reducido no hay cortina: la página aparece y listo.
  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100]"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Grilla de bloques. Cada celda se va cuando le toca. */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`
            }}
          >
            {Array.from({ length: COLS * ROWS }).map((_, i) => {
              const row = Math.floor(i / COLS);
              const col = i % COLS;
              const dRow = Math.abs(row - (ROWS - 1) / 2);
              const dCol = Math.abs(col - (COLS - 1) / 2);

              return (
                <motion.span
                  key={i}
                  className="block bg-accent-500"
                  style={{
                    // -1px evita las costuras de subpíxel entre celdas
                    margin: "-0.5px",
                    willChange: "transform"
                  }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 0 }}
                  transition={{
                    duration: CELL_DURATION,
                    delay:
                      INTRO_REVEAL_AT + dRow * ROW_STEP + dCol * COL_STEP,
                    ease: [0.76, 0, 0.24, 1]
                  }}
                />
              );
            })}
          </div>

          {/* El saludo vive por encima de la grilla y se va antes de que abra. */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: CURTAIN_HOLD - 0.15 }}
          >
            <span className="font-display text-5xl font-medium text-[#0a0a0f] md:text-7xl">
              {GREETINGS[greeting]}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroIntro;
