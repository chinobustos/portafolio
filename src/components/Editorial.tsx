import { motion } from "framer-motion";

const Editorial = () => {
  return (
    <section className="relative w-full min-h-[30vh] flex items-end bg-black overflow-hidden">
      
      {/* Texto gigante */}
      <motion.h2
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 0.06, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 
                   text-[18vw] font-black uppercase 
                   tracking-tight text-white whitespace-nowrap select-none"
      >
        DEV
      </motion.h2>

      {/* Línea fina minimal */}
      <div className="w-full h-px bg-white/10 absolute bottom-0" />
    </section>
  );
};

export default Editorial;