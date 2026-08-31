import { motion } from "framer-motion";
import { Code, Palette, Globe, Download } from "lucide-react";
import profileImg from "../assets/profile.png";

const About = () => {
  const technologies = [
    { name: "HTML5", icon: Code, color: "text-red-400" },
    { name: "Next.js", icon: Code, color: "text-red-500" },
    { name: "JavaScript", icon: Code, color: "text-red-600" },
    { name: "TypeScript", icon: Code, color: "text-red-500" },
    { name: "React", icon: Code, color: "text-red-400" },
    { name: "PostgreSQL", icon: Globe, color: "text-red-700" },
    { name: "Supabase", icon: Globe, color: "text-red-600" },
    { name: "Tailwind CSS", icon: Palette, color: "text-red-600" },
    { name: "CSS3", icon: Palette, color: "text-red-500" },
    { name: "Figma", icon: Palette, color: "text-red-500" },
    { name: "Git", icon: Globe, color: "text-red-600" },
  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
            SOBRE MÍ
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Apasionado por crear experiencias digitales. Especializado en el desarrollo moderno
            con enfoque en la experiencia del usuario.
          </p>

          <motion.a
            href="/CV_Ivan_Bustos.pdf"
            download="CV_Ivan_Bustos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300 cursor-pointer"
          >
            <Download size={20} />
            DESCARGAR CV
          </motion.a>
        </motion.div>

        {/* Layout Responsive */}
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* IZQUIERDA — IMAGEN GRANDE EN MÓVIL */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <img
              src={profileImg}
              alt="Ivan Bustos"
              loading="lazy"
              decoding="async"
              className="
                w-full
                max-w-[380px]
                sm:max-w-[420px]
                md:w-80
                lg:w-[500px]
                object-contain
              "
            />
          </motion.div>

          {/* DERECHA — TECNOLOGÍAS */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-2xl sm:text-3xl font-light mb-8 text-red-500 text-center lg:text-left">
              TECNOLOGÍAS QUE DOMINO
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.05,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                  }}
                  className="glass-dark p-4 rounded-lg hover:border-red-600/50 transition-all duration-300 text-center"
                >
                  <tech.icon
                    className={`w-7 h-7 mx-auto mb-2 ${tech.color}`}
                  />
                  <span className="text-sm text-gray-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;