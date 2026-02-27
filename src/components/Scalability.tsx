import { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const PercentageCounterScalability = ({ value, delay }) => {
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

const Scalability = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useViewportScroll();
  const textY = useTransform(scrollY, [0, 500], [50, -50]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('scalability');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="scalability" className="snap-start min-h-screen w-full bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="w-full max-w-7xl relative">
        {/* Text Content */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center mb-12"
        >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight">
                <span className="text-white">Construye tu negocio </span>
                <span className="gradient-text">100% escalable</span>
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
                Soluciones web que crecen junto con tu empresa
              </p>
            </motion.div>

        {/* SVG Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex items-center justify-center h-96"
        >
              <svg
                viewBox="0 0 800 300"
                className="w-full h-full max-h-80"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid lines */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 0.2 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-gray-600"
                >
                  <line x1="50" y1="50" x2="50" y2="250" stroke="currentColor" strokeWidth="1" />
                  <line x1="50" y1="250" x2="750" y2="250" stroke="currentColor" strokeWidth="1" />
                  {[100, 200, 300, 400, 500, 600, 700].map((x) => (
                    <line
                      key={`grid-${x}`}
                      x1={x}
                      y1="245"
                      x2={x}
                      y2="255"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  ))}
                </motion.g>

                {/* Area under curve */}
                <motion.path
                  d="M 50,250 L 150,200 L 250,180 L 350,140 L 450,100 L 550,120 L 650,80 L 750,60 L 750,250 Z"
                  fill="url(#areaGradient)"
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={isVisible ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />

                {/* Line chart */}
                <motion.polyline
                  points="50,250 150,200 250,180 350,140 450,100 550,120 650,80 750,60"
                  fill="none"
                  stroke="#364969"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.8, delay: 0.1 }}
                />

                {/* Dots on chart */}
                {[50, 150, 250, 350, 450, 550, 650, 750].map((x, i) => {
                  const yValues = [250, 200, 180, 140, 100, 120, 80, 60];
                  return (
                    <motion.circle
                      key={`dot-${i}`}
                      cx={x}
                      cy={yValues[i]}
                      r="6"
                      fill="#3b82f6"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    />
                  );
                })}

                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage value */}
              <motion.div
                className="absolute top-1/3 right-1/4 text-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="text-6xl font-bold text-blue-400">
                  {isVisible ? (
                    <PercentageCounterScalability value={100} delay={800} />
                  ) : (
                    0
                  )}
                  <span className="text-5xl">%</span>
                </div>
              </motion.div>
            </motion.div>
      </div>
    </section>
  );
};

export default Scalability;
