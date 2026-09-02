import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "../hooks/useSceneProgress";
import { INTRO_REVEAL_AT } from "./HeroIntro";
import SplitText from "./SplitText";
import { Github, Linkedin, ChevronDown } from "lucide-react";
import backHero from "../assets/back_hero.png";

const fullText = "Creando experiencias digitales extraordinarias";

const Hero = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  // El contenido sube mientras la cortina abre, no antes de que se vea.
  const base = reduced ? 0 : INTRO_REVEAL_AT;

  useEffect(() => {
    // Se escribe directo en el DOM en lugar de con setState: el efecto de tipeo
    // provocaba ~45 re-renders de todo el Hero justo durante la carga inicial.
    let currentIndex = 0;
    let typingInterval: number | undefined;

    const start = window.setTimeout(() => {
      typingInterval = window.setInterval(() => {
      if (currentIndex <= fullText.length) {
        if (typedRef.current) {
          typedRef.current.textContent = fullText.slice(0, currentIndex);
        }
        currentIndex++;
      } else {
        window.clearInterval(typingInterval);
      }
    }, 80);
    }, base * 1000);

    return () => {
      window.clearTimeout(start);
      if (typingInterval) window.clearInterval(typingInterval);
    };
  }, [base]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background: <img> en vez de background-image para que el navegador lo
          descubra en el HTML inicial y lo priorice (es el elemento LCP). */}
      <img
        src={backHero}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        {/* Las letras suben desde la línea de base, una detrás de otra. Sin
            `y` ni `opacity` en el h1: el degradado lo pinta este elemento con
            `background-clip: text`, así que solo el `scaleY` de cada letra
            —que mueve el glifo -recorte— tiene efecto sobre el relleno. */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <SplitText
            text="Ivan Bustos"
            className="gradient-text"
            delay={base}
            stagger={0.05}
            duration={0.7}
          />
        </h1>

        <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light mb-4 text-gray-200">
          <SplitText
            text="FRONTEND DEVELOPER & UX/UI DESIGNER"
            delay={base + 0.45}
            stagger={0.018}
            duration={0.5}
            fade
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.4, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl mb-6 text-accent-500 font-medium"
        >
          BIENVENIDOS A MI MUNDO
        </motion.p>

        <div className="h-6 sm:h-8 mb-8">
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            <span ref={typedRef} />
            <span className="animate-pulse text-accent-500">|</span>
          </p>
        </div>

        <div className="flex justify-center space-x-4 sm:space-x-6 mb-12">
          <a
            href="https://github.com/chinobustos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-full glass-button-dark text-white hover:text-accent-500"
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/ivan-bustosdev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-full glass-button-dark text-white hover:text-accent-500"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <a
          href="#about"
          className="flex flex-col items-center text-accent-500 hover:text-accent-400 transition-colors duration-300"
        >
          <span className="text-xs sm:text-sm mb-1">EXPLORAR</span>
          <ChevronDown size={22} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
