import { useState, useEffect, useRef } from 'react';
import { motion, useViewportScroll, useTransform, useInView } from 'framer-motion';

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
  
  const { scrollY } = useViewportScroll();
  const textY = useTransform(scrollY, [0, 500], [50, -50]);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      const wordElements = textRef.current?.querySelectorAll('.word-animate');
      wordElements?.forEach((word) => {
        const delay = parseInt(word.getAttribute('data-delay') || '0') || 0;
        setTimeout(() => {
          if (word) {
            (word as HTMLElement).style.animation = 'word-appear 0.8s ease-out forwards';
          }
        }, delay);
      });
    } else {
      const wordElements = textRef.current?.querySelectorAll('.word-animate');
      wordElements?.forEach((word) => {
        if (word) {
          (word as HTMLElement).style.animation = 'none';
          (word as HTMLElement).style.opacity = '0';
        }
      });
    }
  }, [isInView]);

  useEffect(() => {
    const wordElements = document.querySelectorAll('.word-animate');
    const handleMouseEnter = (e: any) => { if (e.target) e.target.style.textShadow = '0 0 20px rgba(203, 213, 225, 0.5)'; };
    const handleMouseLeave = (e: any) => { if (e.target) e.target.style.textShadow = 'none'; };
    wordElements.forEach(word => {
      word.addEventListener('mouseenter', handleMouseEnter);
      word.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      wordElements.forEach(word => {
        if (word) {
          word.removeEventListener('mouseenter', handleMouseEnter);
          word.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, []);

  const pageStyles = `
    @keyframes word-appear { 
      0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); } 
      50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); } 
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } 
    }
    .word-animate { 
      display: inline-block; 
      opacity: 0; 
      margin: 0 0.1em; 
      transition: color 0.3s ease, transform 0.3s ease; 
    }
    .word-animate:hover { 
      transform: translateY(-2px); 
    }
  `;

  // Animaciones controladas por Framer Motion \`whileInView\` (viewport once: false)

  return (
    <section id="scalability" className="snap-start min-h-screen w-full bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <style>{pageStyles}</style>
      <div className="w-full max-w-7xl relative">
        {/* Text Content */}
        <motion.div
          ref={textRef}
          style={{ y: textY }}
          className="relative z-10 text-center mb-12"
        >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight">
                <span className="word-animate text-white" data-delay="0">Construye</span>
                <span className="word-animate text-white" data-delay="150">tu</span>
                <span className="word-animate text-white" data-delay="300">negocio</span>
                <br className="hidden sm:block" />
                <span className="word-animate text-green-400 font-medium" data-delay="450">100%</span>
                <span className="word-animate text-green-400 font-medium" data-delay="600">escalable</span>
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
                <span className="word-animate" data-delay="750">Soluciones</span>
                <span className="word-animate" data-delay="900">web</span>
                <span className="word-animate" data-delay="1050">que</span>
                <span className="word-animate" data-delay="1200">crecen</span>
                <span className="word-animate" data-delay="1350">junto</span>
                <span className="word-animate" data-delay="1500">con</span>
                <span className="word-animate" data-delay="1650">tu</span>
                <span className="word-animate" data-delay="1800">empresa</span>
              </p>
            </motion.div>

        {/* SVG Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1 }}
          className="relative z-10 flex items-center justify-center h-100"
        >
              <svg
                viewBox="0 0 800 300"
                className="w-full h-full max-h-120"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid lines */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  viewport={{ once: false, amount: 0.1 }}
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
                  whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />

                {/* Line chart */}
                <motion.polyline
                  points="50,250 150,200 250,180 350,140 450,100 550,120 650,80 750,60"
                  fill="none"
                  stroke="#16c224"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
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
                      fill="#38e084"
                      stroke="#60fa93"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, amount: 0.12 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    />
                  );
                })}

                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3bf644" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#043a0b" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage value */}
              <motion.div
                className="absolute top-1/3 right-1/4 text-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
             
              </motion.div>
            </motion.div>
      </div>
    </section>
  );
};

export default Scalability;
