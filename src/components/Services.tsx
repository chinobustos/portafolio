import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Globe, Smartphone, Zap, Users } from 'lucide-react';

const PercentageCounter = ({ value, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return <>{count}</>;
};

const Services = () => {
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
      gradient: 'from-red-600 to-red-800',
      percentage: 95
    },
    {
      icon: Palette,
      title: 'Diseño UI/UX',
      gradient: 'from-red-500 to-red-700',
      percentage: 85
    },
    {
      icon: Globe,
      title: 'Sitios Web',
      gradient: 'from-red-700 to-red-900',
      percentage: 90
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      gradient: 'from-red-800 to-black',
      percentage: 80
    },
    {
      icon: Zap,
      title: 'Optimización',
      gradient: 'from-red-600 to-black',
      percentage: 88
    },
    {
      icon: Users,
      title: 'Metodologias agiles',
      gradient: 'from-red-500 to-black',
      percentage: 92
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateY: -10 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.12
      }
    }),
    hover: {
      y: -12,
      boxShadow: "0 25px 50px rgba(255, 0, 60, 0.2)",
      borderColor: "#ff003c",
      transition: {
        duration: 0.3
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
          className="grid grid-cols-4 gap-8 grid-flow-dense auto-rows-max"
        >
          {services.map((service, index) => {
            const spanClasses = [
              'col-span-2 row-span-2',
              'col-span-2 row-span-1',
              'col-span-1 row-span-1',
              'col-span-1 row-span-1',
              'col-span-1 row-span-1',
              'col-span-1 row-span-1'
            ];
            const spanClass = spanClasses[index] || '';

            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover="hover"
                className={`relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 group overflow-hidden flex flex-col justify-between ${spanClass}`}
              >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5`}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <motion.div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${service.gradient} mb-6`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: index * 0.12 + 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
                  className="text-xl font-bold text-center text-white font-heading mb-6"
                >
                  {service.title}
                </motion.h3>
                
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
                >
                  <div className="text-4xl font-bold gradient-text mb-2\">
                    {isVisible ? (
                      <>
                        <PercentageCounter value={service.percentage} delay={index * 120 + 400} />
                        %
                      </>
                    ) : (
                      <span>0%</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">Experiencia</p>
                </motion.div>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;