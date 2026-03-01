import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Globe, GraduationCap, Briefcase, Languages, Download } from 'lucide-react';
import profileImg from '../assets/profile.png';

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
    {name : 'Tailwind CSS', icon: Palette, color: 'text-red-600' },
    {name : 'TypeScript', icon: Code, color: 'text-red-500' },
    {name:'MySQL', icon: Globe, color: 'text-red-700' },
    {name:'supabase', icon: Globe, color: 'text-red-600' },
    {name: 'spring boot', icon: Code, color: 'text-red-800' },
    {name:'sqlite', icon: Globe, color: 'text-red-500' },
    {name : 'java', icon: Code, color: 'text-red-700' },
    { name: 'CSS3', icon: Palette, color: 'text-red-500' },
    { name: 'JavaScript', icon: Code, color: 'text-red-600' },
    { name: 'React', icon: Code, color: 'text-red-400' },
    { name: 'Figma', icon: Palette, color: 'text-red-500' },
    { name: 'Git', icon: Globe, color: 'text-red-600' },
  ];

 

  return (
   <section
  id="about"
  className="snap-start min-h-screen py-20 bg-black"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text font-heading">
        SOBRE MÍ
      </h2>

      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Apasionado por crear experiencias digitales. Especializado en el desarrollo moderno
        con enfoque en la experiencia del usuario.
      </p>

      <motion.a
        href="/Ivan-Bustos-CV.pdf"
        download="Ivan-Bustos-CV.pdf"
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 60, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-heading font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300 border border-red-500/50"
      >
        <Download size={20} />
        DESCARGAR CV
      </motion.a>
    </motion.div>

    {/* 🔥 Layout Responsive */}
    <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

      {/* 🔥 Imagen */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <img
          src={profileImg}
          alt="Ivan Bustos"
          className="
            w-56 sm:w-64 md:w-72 
            lg:w-[700px]
            object-contain
            opacity-90
          "
        />
      </motion.div>

      {/* 🔥 Contenido */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full lg:w-1/2 space-y-8"
      >
        <div>
          <h3 className="text-2xl font-light mb-4 text-red-500 font-heading">
            TECNOLOGÍAS QUE DOMINO
          </h3>

          <div className="grid grid-cols-3 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 20,
                  scale: isVisible ? 1 : 0.8
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.08
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255, 0, 60, 0.2)"
                }}
                className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800 hover:border-red-600/50 transition-all duration-300"
              >
                <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                  <tech.icon className={`w-8 h-8 mx-auto mb-2 ${tech.color}`} />
                </motion.div>
                <span className="text-sm text-gray-300">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

       
      </motion.div>
    </div>

  </div>
</section>
  );
};

export default About;