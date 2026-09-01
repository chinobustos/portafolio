import { useEffect, useRef } from 'react';

/**
 * Fondo de partículas.
 *
 * Antes usaba `react-tsparticles` + `loadFull`, que arrastraba el motor completo
 * (dos versiones del engine terminaban en el bundle) y mantenía su propio bucle
 * de render, su ResizeObserver y sus listeners de interacción vivos todo el rato.
 *
 * Esta versión dibuja exactamente lo mismo (puntos blancos tenues a la deriva,
 * que se apartan del cursor) en un canvas propio de ~100 líneas:
 *  - se detiene cuando la pestaña está en segundo plano,
 *  - respeta `prefers-reduced-motion`,
 *  - limita el devicePixelRatio y los FPS,
 *  - guarda la posición del ratón en un ref (cero renders de React).
 */

const FPS = 30;
const HOVER_RADIUS = 100;
const OPACITY = 0.12;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const ParticlesBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999 };

    const buildParticles = () => {
      // Densidad equivalente a la configuración anterior, con tope para no
      // penalizar pantallas grandes.
      const count = Math.min(24, Math.max(10, Math.round((width * height) / 90000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: 1 + Math.random() * 3,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(255, 255, 255, ${OPACITY})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Repulsión suave alrededor del cursor
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < HOVER_RADIUS && dist > 0.01) {
          const push = (1 - dist / HOVER_RADIUS) * 1.6;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }

        // Reaparece por el lado opuesto al salir
        if (p.x < -p.r) p.x = width + p.r;
        else if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        else if (p.y > height + p.r) p.y = -p.r;
      }
      draw();
    };

    let rafId = 0;
    let last = 0;
    const frameInterval = 1000 / FPS;

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - last < frameInterval) return;
      last = now;
      step();
    };

    const start = () => {
      if (rafId || reduceMotion) return;
      last = 0;
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    resize();
    draw();
    start();

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="tsparticles"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -5, pointerEvents: 'none' }}
    />
  );
};

export default ParticlesBg;
