import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Globe, Zap, Users } from 'lucide-react';

const PercentageCounter = ({ value, delay }: { value: number; delay: number }) => {
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

  const services = [
    { icon: Code, title: 'Desarrollo Frontend', percentage: 100 },
    { icon: Palette, title: 'Diseño UI/UX', percentage: 90 },
    { icon: Globe, title: 'Sitios Web', percentage: 90 },
    { icon: Zap, title: 'Optimización', percentage: 80 },
    { icon: Users, title: 'Metodologías Ágiles', percentage: 92 }
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 overflow-hidden bg-transparent"
    >
      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Mis Servicios
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Desarrollo experiencias digitales modernas con enfoque en diseño,
            rendimiento y precisión.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[180px]">
          {services.map((service, index) => {
            return (
              <ServiceCard key={index} service={service} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const [started, setStarted] = useState(false);

  const spanClasses = [
    'row-span-2 col-span-2 lg:col-span-2',
    '',
    '',
    '',
    'col-span-2'
  ];

  const isFrontend = index === 0;
  const isWebsite = service.title === 'Sitios Web';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      onViewportEnter={() => setStarted(true)}
      onViewportLeave={() => setStarted(false)}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative p-8 rounded-[32px] backdrop-blur-xl 
        ${isWebsite 
          ? 'border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]' 
          : 'border border-white/10'}
        shadow-2xl shadow-black/40 transition duration-300 
        flex flex-col justify-between overflow-hidden 
        bg-white/5
        ${spanClasses[index]}`}
    >
      {isFrontend && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#A435F0]/40 via-[#7B2CBF]/30 to-transparent" />
      )}

      <div className="relative z-10">
        <service.icon className={`w-6 h-6 mb-6 ${isFrontend ? 'text-white' : 'text-zinc-300'}`} />

        <h3 className="text-sm text-zinc-400 mb-2 tracking-wide">
          {service.title}
        </h3>

        <div className="text-5xl font-semibold tracking-tight text-white">
          {started ? (
            <>
              <PercentageCounter
                value={service.percentage}
                delay={index * 150}
              />
              %
            </>
          ) : (
            '0%'
          )}
        </div>

        <p className="text-xs text-zinc-500 mt-1">Nivel de experiencia</p>
      </div>
    </motion.div>
  );
};

export default Services;