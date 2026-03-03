const Footer = () => {
  return (
    <footer className="relative min-h-screen bg-black text-white snap-start overflow-hidden flex flex-col justify-between px-8 md:px-16 py-16">

      {/* ===== TOP SECTION ===== */}
      <div className="flex flex-col lg:flex-row justify-between gap-16">

        {/* Left Big Title */}
        <div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
            <span className="underline underline-offset-8 decoration-white/70">
              Tenes un proyecto
            </span>
            <br />
            en mente?
          </h2>
        </div>

        {/* Right Links */}
        <div className="flex gap-16 text-lg">
          <ul className="space-y-4 text-white/80">
            <li className="hover:text-white transition">Sobre Mi</li>
            <li className="hover:text-white transition">Proyectos</li>
            <li className="hover:text-white transition">Servicios</li>
          </ul>

          <ul className="space-y-4 text-white/80">
            <li className="hover:text-white transition">Instagram</li>
            <li className="hover:text-white transition">LinkedIn</li>
            <li className="hover:text-white transition">GitHub</li>
          </ul>
        </div>
      </div>

      {/* ===== MIDDLE SMALL INFO ===== */}
      <div className="flex flex-col md:flex-row justify-between text-sm text-white/50 mt-20 gap-6">
        <div>
          Mendoza, Argentina
        </div>

        <div>
          Privacy Policy
        </div>

        <div>
          ivanbustosdev@gmail.com © 2026
        </div>
      </div>

      {/* ===== HUGE BACKGROUND BRAND ===== */}
      <div className="absolute bottom-[-80px] left-0 w-full text-center pointer-events-none select-none">
        <h1 className="text-[120px] md:text-[220px] lg:text-[300px] font-bold tracking-tight text-white/5">
          IVAN
        </h1>
      </div>

    </footer>
  );
};

export default Footer;