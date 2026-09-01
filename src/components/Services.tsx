import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Globe, Zap, Users } from 'lucide-react';

/* =========================
   CONTADOR ANIMADO
========================= */
/**
 * Antes usaba `setInterval` a 16 ms con `setState`: cinco tarjetas visibles
 * significaban ~300 re-renders de React por segundo, justo mientras se hacía
 * scroll. Ahora la cuenta va en un `requestAnimationFrame` que escribe el texto
 * directo en el DOM, así que React no vuelve a renderizar ni una vez.
 */
const PercentageCounter = ({ value, delay }: { value: number; delay: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 2000;
    let rafId = 0;
    let startTime = 0;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      if (ref.current) {
        ref.current.textContent = String(Math.floor(progress * value));
      }
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const timer = window.setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, delay]);

  return <span ref={ref}>0</span>;
};

/* =========================
   PROGRESS RING
========================= */
const ProgressRing = ({
  percentage,
  size = 140,
  stroke = 10,
  gradientId
}: {
  percentage: number;
  size?: number;
  stroke?: number;
  gradientId: string;
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="absolute -rotate-90">
      <circle
        stroke="rgba(255,255,255,0.08)"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      <motion.circle
        stroke={`url(#${gradientId})`}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />

      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/* =========================
   SERVICES
========================= */
const Services = () => {
  const services = [
    { icon: Code, title: 'Desarrollo Frontend', percentage: 100 },
    { icon: Palette, title: 'Diseño UI/UX', percentage: 90 },
    { icon: Globe, title: 'Sitios Web', percentage: 90 },
    { icon: Zap, title: 'Optimización', percentage: 80 },
    { icon: Users, title: 'Metodologías Ágiles', percentage: 92 }
  ];

  return (
    <section id="services" className="relative min-h-screen py-24">
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

        {/* GRID ORIGINAL CORREGIDO */}
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-6
            auto-rows-[minmax(200px,auto)]
          "
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

/* =========================
   SERVICE CARD
========================= */
const ServiceCard = ({ service, index }: { service: { icon: React.ElementType; title: string; percentage: number }; index: number }) => {
  const [started, setStarted] = useState(false);

  const spanClasses = [
    'row-span-2 col-span-2 lg:col-span-2',
    '',
    '',
    '',
    ''
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      onViewportEnter={() => setStarted(true)}
      onViewportLeave={() => setStarted(false)}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`
        glass-dark p-8 relative rounded-[32px]
        flex flex-col items-center justify-center
        overflow-hidden
        ${spanClasses[index]}
      `}
    >
      <service.icon className="w-6 h-6 mb-4 text-zinc-300" />

      <h3 className="text-sm text-zinc-400 mb-6 tracking-wide">
        {service.title}
      </h3>

      <div className="relative flex items-center justify-center w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
        {started && (
          <ProgressRing
            percentage={service.percentage}
            size={140}
            gradientId={`service-ring-gradient-${index}`}
          />
        )}

        <div className="absolute text-3xl md:text-4xl font-semibold text-white">
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
      </div>

      <p className="text-xs text-zinc-500 mt-6">
        Nivel de experiencia
      </p>
    </motion.div>
  );
};

export default Services;
