import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Scalability = () => {
  // `useViewportScroll` está deprecado; `useScroll()` sin target devuelve el
  // mismo scroll global y produce exactamente el mismo resultado visual.
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [50, -50]);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: false, amount: 0.1 });

  // La aparición de las palabras ahora se resuelve 100% en CSS. Antes había un
  // setTimeout por palabra escribiendo estilos inline, más 26 listeners de
  // mouseenter/mouseleave que también escribían estilos en cada hover.
  const headline = [
    { text: 'Construye', delay: 0, className: 'text-white' },
    { text: 'tu', delay: 150, className: 'text-white' },
    { text: 'negocio', delay: 300, className: 'text-white' },
    { text: '100%', delay: 450, className: 'text-accent-400 font-medium' },
    { text: 'escalable', delay: 600, className: 'text-accent-400 font-medium' }
  ];

  const subline = [
    'Soluciones',
    'web',
    'que',
    'crecen',
    'junto',
    'con',
    'tu',
    'empresa'
  ];

  return (
    <section id="scalability" className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="w-full max-w-7xl relative">
        {/* Text Content */}
        <motion.div
          ref={textRef}
          style={{ y: textY, willChange: 'transform' }}
          className={`relative z-10 text-center mb-12 ${isInView ? 'words-in' : ''}`}
        >
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mb-6 leading-tight">
                {headline.map((word, i) => (
                  <span key={word.text}>
                    <span
                      className={`word-animate ${word.className}`}
                      style={{ animationDelay: `${word.delay}ms` }}
                    >
                      {word.text}
                    </span>
                    {i === 2 && <br className="hidden sm:block" />}
                  </span>
                ))}
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
                {subline.map((word, i) => (
                  <span
                    key={word}
                    className="word-animate"
                    style={{ animationDelay: `${750 + i * 150}ms` }}
                  >
                    {word}
                  </span>
                ))}
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
                  stroke="#ff5533"
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
                      fill="#ff7a5c"
                      stroke="#ffa48d"
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
                    <stop offset="0%" stopColor="#ff5533" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a02a0c" stopOpacity="0.01" />
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
