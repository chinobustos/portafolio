import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Palette, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Creando experiencias digitales extraordinarias';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center animated-gradient">
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 font-display text-shadow"
          >
            <span className="gradient-text">IVAN BUSTOS</span>
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl lg:text-5xl font-light mb-4 text-gray-200 font-heading"
          >
            FULL STACK DEVELOPER
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 text-red-500 font-medium font-heading"
          >
            BIENVENIDOS A MI MUNDO
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="h-8 mb-12"
          >
            <p className="text-lg md:text-xl text-gray-300">
              {text}
              <span className="animate-pulse text-red-500">|</span>
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-16"
          >
            <a
              href="https://github.com/chinobustos"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-black/70 hover:bg-red-600 transition-all duration-300 hover:scale-110 red-glow button-scale"
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/ivan-bustosdev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-black/70 hover:bg-red-600 transition-all duration-300 hover:scale-110 red-glow button-scale"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-black/70 hover:bg-red-600 transition-all duration-300 hover:scale-110 red-glow button-scale"
            >
              <Palette size={28} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-red-500 hover:text-red-400 transition-colors duration-300"
        >
          <span className="text-sm mb-2 font-heading">EXPLORAR</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;