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
      percentage: 90,
      hasChart: true
    },
    {
      icon: Zap,
      title: 'Optimización',
      gradient: 'from-red-600 to-black',
      percentage: 88,
      hasChart: true
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text font-heading">
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 grid-flow-dense auto-rows-max"
        >
          {services.map((service, index) => {
            const spanClasses = [
              'sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2',
              'sm:col-span-2 sm:row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-1',
              'sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
              'sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1',
              'sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1'
            ];
            const spanClass = spanClasses[index] || '';
            const isUiUxCard = index === 1;

            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover="hover"
                className={`relative p-8 rounded-xl border group overflow-hidden flex flex-col justify-between ${
                  isUiUxCard
                    ? 'bg-gradient-to-br from-red-900 to-black border-red-800'
                    : 'bg-gradient-to-br from-gray-900 to-black border-gray-800'
                } ${spanClass}`}
              >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5`}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <motion.div
                  className={`inline-flex p-4 rounded-full mb-6 ${
                    isUiUxCard
                      ? 'bg-blue-500'
                      : `bg-gradient-to-r ${service.gradient}`
                  }`}
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
                  className={`text-xl font-bold text-center font-heading mb-6 ${
                    isUiUxCard ? 'text-white' : 'text-white'
                  }`}
                >
                  {service.title}
                </motion.h3>
                {service.hasChart && (
                    <div className="w-full h-24 mb-4 overflow-hidden">
                    <svg viewBox="0 0 100 24" className="w-full h-full">
                      <motion.polyline
                        points="0,16 20,8 40,12 60,5 80,14 100,2"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.2, delay: index * 0.12 + 0.4 }}
                        style={{ originX: 0, originY: 0.5 }}
                      />
                    </svg>
                  </div>
                )}
                
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
                >
                  <div className={`text-4xl font-bold mb-2 ${isUiUxCard ? 'text-white' : 'gradient-text'}`}>
                    {isVisible ? (
                      <>
                        <span className="text-white inline-block">
                          <PercentageCounter value={service.percentage} delay={index * 120 + 400} />
                        </span>
                        <span className="text-white">%</span>
                      </>
                    ) : (
                      <span className="text-white">0%</span>
                    )}
                  </div>
                  <p className={`text-sm ${ isUiUxCard ? 'text-white' : 'text-gray-400' }`}>Experiencia</p>
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