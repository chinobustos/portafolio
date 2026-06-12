import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ChevronDown } from "lucide-react";
import backHero from "../assets/back_hero.png";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Creando experiencias digitales extraordinarias";

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backHero})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">Ivan Bustos</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light mb-4 text-gray-200"
        >
          WEB DEVELOPER / DESIGNER
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl mb-6 text-red-500 font-medium"
        >
          BIENVENIDOS A MI MUNDO
        </motion.p>

        <div className="h-6 sm:h-8 mb-8">
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            {text}
            <span className="animate-pulse text-red-500">|</span>
          </p>
        </div>

        <div className="flex justify-center space-x-4 sm:space-x-6 mb-12">
          <a
            href="https://github.com/chinobustos"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-full glass-button-dark text-white hover:text-red-500"
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/ivan-bustosdev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-full glass-button-dark text-white hover:text-red-500"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <a
          href="#about"
          className="flex flex-col items-center text-red-500 hover:text-red-400 transition-colors duration-300"
        >
          <span className="text-xs sm:text-sm mb-1">EXPLORAR</span>
          <ChevronDown size={22} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;