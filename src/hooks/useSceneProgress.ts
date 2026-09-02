import { useEffect, useState, type RefObject } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * Progreso 0→1 de una escena respecto del viewport.
 *
 *   0   → el borde superior de la escena está en el borde inferior del viewport
 *   0.5 → la escena está centrada
 *   1   → el borde inferior de la escena salió por arriba
 *
 * No usa `useScroll` de framer-motion a propósito: su detección automática de
 * contenedor de scroll se confunde en layouts con `perspective` y overflow
 * anidados, y termina midiendo contra el contenedor equivocado. Este hook mide
 * siempre contra el viewport con `getBoundingClientRect()`.
 *
 * El listener es pasivo y está limitado por `requestAnimationFrame`, y escribe
 * en un `MotionValue`, así que no dispara ni un render de React por frame.
 */
export function useSceneProgress(
  ref: RefObject<HTMLElement | null>
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // Recorrido total: desde que asoma por abajo hasta que sale por arriba.
      const travel = rect.height + viewport;
      const advanced = viewport - rect.top;
      const value = advanced / travel;

      progress.set(value < 0 ? 0 : value > 1 ? 1 : value);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, progress]);

  return progress;
}

/** `true` si el sistema pide reducir el movimiento. Reactivo al cambio. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Progreso de una tarjeta dentro de una pila `position: sticky`.
 *
 * Una tarjeta clavada arriba tiene `rect.top === 0` durante todo el tiempo que
 * está fija, así que `useSceneProgress` se queda congelado en cuanto se pega.
 * Acá se mide el contenedor de la pila —que sí se desplaza— y se deriva el
 * progreso local de cada tarjeta a partir de su índice.
 *
 *   0    → la tarjeta todavía viene subiendo desde abajo
 *   0.5  → la tarjeta está clavada y es la visible
 *   1    → la siguiente ya la tapó por completo
 */
export function useStackProgress(
  containerRef: RefObject<HTMLElement | null>,
  index: number
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = containerRef.current;
      if (!el) return;

      const viewport = window.innerHeight || 1;
      // Píxeles ya recorridos dentro de la pila.
      const scrolled = -el.getBoundingClientRect().top;
      // -1 = viene de abajo, 0 = se clava, +1 = ya la taparon.
      const local = (scrolled - index * viewport) / viewport;
      const value = (local + 1) / 2;

      progress.set(value < 0 ? 0 : value > 1 ? 1 : value);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [containerRef, index, progress]);

  return progress;
}
