import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Globe, Smartphone, Zap, Users } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Desarrollo Frontend',
      description: 'Creación de interfaces modernas y responsivas con las últimas tecnologías web.',
      gradient: 'from-red-600 to-red-800',
      features: ['React/Vue.js', 'Responsive Design']
    },
    {
      icon: Palette,
      title: 'Diseño UI/UX',
      description: 'Diseño de experiencias digitales intuitivas y atractivas para tus usuarios.',
      gradient: 'from-red-500 to-red-700',
      features: ['Figma']
    },
    {
      icon: Globe,
      title: 'Sitios Web',
      description: 'Desarrollo de sitios web completos optimizados para SEO y conversiones.',
      gradient: 'from-red-700 to-red-900',
      features: ['SEO Optimizado', 'CMS Integration', 'E-commerce']
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Desarrollo de aplicaciones móviles nativas y híbridas multiplataforma.',
      gradient: 'from-red-800 to-black',
      features: ['React Native', 'Java']
    },
    {
      icon: Zap,
      title: 'Optimización',
      description: 'Mejora del rendimiento y velocidad de carga de aplicaciones existentes.',
      gradient: 'from-red-600 to-black',
      features: ['Clean Code', 'Lazy Loading', 'Bundle Optimization']
    },
    {
      icon: Users,
      title: 'Metodologias agiles',
      description: 'Asesoramiento técnico y estratégico para proyectos de desarrollo web.',
      gradient: 'from-red-500 to-black',
      features: ['Scrum', 'Kanban', 'Lean Software Development']
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text font-display">
            MIS SERVICIOS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrezco una gama completa de servicios de desarrollo web y diseño digital 
            para llevar tu proyecto al siguiente nivel.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative bg-black p-8 rounded-xl card-hover group ${
                hoveredIndex === index ? 'wobble' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${service.gradient} mb-6`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-500 transition-colors duration-300 font-heading">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;