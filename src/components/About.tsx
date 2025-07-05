import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Globe, GraduationCap, Briefcase, Languages } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const technologies = [
    { name: 'HTML5', icon: Code, color: 'text-red-400' },
    { name: 'CSS3', icon: Palette, color: 'text-red-500' },
    { name: 'JavaScript', icon: Code, color: 'text-red-600' },
    { name: 'React', icon: Code, color: 'text-red-400' },
    { name: 'Figma', icon: Palette, color: 'text-red-500' },
    { name: 'Git', icon: Globe, color: 'text-red-600' },
  ];

  const cards = [
    {
      icon: GraduationCap,
      title: 'Educación',
      content: 'Ingeniería en Sistemas Computacionales\nUniversidad Tecnológica',
      color: 'from-red-600 to-red-800'
    },
    {
      icon: Briefcase,
      title: 'Experiencia',
      content: '3+ años desarrollando\nsoluciones web innovadoras',
      color: 'from-red-500 to-red-700'
    },
    {
      icon: Languages,
      title: 'Idiomas',
      content: 'Español (Nativo)\nInglés (Avanzado)',
      color: 'from-red-700 to-red-900'
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text font-display">
            SOBRE MÍ
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Apasionado por crear experiencias digitales que combinan diseño elegante 
            con funcionalidad excepcional. Especializado en desarrollo front-end moderno 
            con enfoque en la experiencia del usuario.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur-2xl opacity-30"></div>
              <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center red-border-glow">
                <div className="w-72 h-72 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-white font-display">IB</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-red-500 font-heading">
                TECNOLOGÍAS QUE DOMINO
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-black p-4 rounded-lg text-center card-hover"
                  >
                    <tech.icon className={`w-8 h-8 mx-auto mb-2 ${tech.color}`} />
                    <span className="text-sm text-gray-300">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className="bg-black p-6 rounded-lg card-hover"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${card.color} mr-4`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white font-heading">{card.title}</h4>
                  </div>
                  <p className="text-gray-300 whitespace-pre-line">{card.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;