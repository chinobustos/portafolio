import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Smartphone, Globe, ShoppingCart } from 'lucide-react';

const Projects = () => {
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

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Plataforma de comercio electrónico moderna con React y Node.js',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      icon: ShoppingCart,
      gradient: 'from-red-600 to-red-800'
    },
    {
      title: 'Mobile App UI',
      description: 'Diseño de interfaz para aplicación móvil de fitness',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React Native', 'Figma', 'Firebase'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Smartphone,
      gradient: 'from-red-500 to-red-700'
    },
    {
      title: 'Corporate Website',
      description: 'Sitio web corporativo con animaciones avanzadas',
      image: 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Next.js', 'Tailwind CSS', 'GSAP'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Globe,
      gradient: 'from-red-700 to-red-900'
    },
    {
      title: 'Customer Relationship Management',
      description: 'Dashboard interactivo para análisis de datos y gestion de clientes ',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'D3.js', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Globe,
      gradient: 'from-red-800 to-black'
    },
    {
      title: 'Social Media App',
      description: 'Aplicación social con funciones de tiempo real',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Socket.io', 'Express'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Smartphone,
      gradient: 'from-red-600 to-black'
    },
    {
      title: 'Portfolio Template',
      description: 'Plantilla de portafolio moderna y responsiva',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      liveUrl: '#',
      githubUrl: '#',
      icon: Globe,
      gradient: 'from-red-500 to-black'
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
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text font-display">
            PROYECTOS DESTACADOS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Una selección de mis trabajos más recientes que demuestran mi 
            experiencia en desarrollo front-end y diseño de experiencias digitales.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-black rounded-xl overflow-hidden card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className={`absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r ${project.gradient}`}>
                  <project.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors duration-300 font-heading">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-900 text-red-400 rounded-full text-xs border border-red-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    className="flex items-center text-gray-300 hover:text-red-500 transition-colors duration-300"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    <span className="text-sm">Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center text-gray-300 hover:text-red-500 transition-colors duration-300"
                  >
                    <Github size={16} className="mr-1" />
                    <span className="text-sm">Código</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;