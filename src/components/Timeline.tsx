import { motion } from "framer-motion";

const processSteps = [
  {
    step: "01",
    title: "Consulta",
    description:
      "Analizamos tus objetivos, necesidades y el alcance del proyecto para entender exactamente lo que buscas."
  },
  {
    step: "02",
    title: "Estimativo",
    description:
      "Definimos tiempos, estructura y presupuesto estimado según los requerimientos del proyecto."
  },
  {
    step: "03",
    title: "Aprobación",
    description:
      "Revisamos propuesta, ajustamos detalles y validamos el inicio del proyecto."
  },
  {
    step: "04",
    title: "Diseño",
    description:
      "Creamos la experiencia visual y la arquitectura del sitio enfocándonos en UI/UX moderna."
  },
  {
    step: "05",
    title: "Desarrollo",
    description:
      "Construimos la web optimizada, responsive y lista para producción."
  }
];

const ProcessTimeline = () => {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6">
            Proceso de Desarrollo
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Un flujo claro, estratégico y enfocado en resultados.
          </p>
        </div>

        <div className="relative">

          {/* Línea vertical */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent opacity-40" />

          <div className="space-y-16">
            {processSteps.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Contenido */}
                  <div
                    className={`
                      bg-white/5 backdrop-blur-xl border border-white/10
                      rounded-2xl p-6 w-full md:w-[45%]
                      shadow-2xl shadow-black/40
                      ${isLeft ? "md:mr-auto" : "md:ml-auto"}
                    `}
                  >
                    <span className="text-sm text-cyan-400 tracking-widest">
                      STEP {item.step}
                    </span>

                    <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Punto */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-4 border-black shadow-lg" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;