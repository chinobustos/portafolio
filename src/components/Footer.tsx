const siteLinks = [
  { label: "Sobre Mi", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Tecnologías", href: "#tecnologias" }
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/chinoobustos/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ivan-bustosdev" },
  { label: "GitHub", href: "https://github.com/chinobustos" }
];

const Footer = () => {
  return (
    <footer className="cv-section relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between px-8 md:px-16 py-16">
      {/* ===== TOP SECTION ===== */}
      <div className="flex flex-col lg:flex-row justify-between gap-16">
        {/* Left Big Title */}
        <section className="relative overflow-hidden py-32">
          {/* TEXTO GIGANTE DE FONDO */}
          <h2
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  font-display text-[15vw] font-bold tracking-tight
  text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)]
  pointer-events-none select-none"
          >
            PROYECTO
          </h2>

          {/* CONTENIDO NORMAL */}
          {/* Era el llamado a la acción más grande de la página y no llevaba
              a ningún lado: ahora baja al formulario de contacto. */}
          <a href="#contact" className="block group">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight ">
              <span className="underline underline-offset-8 decoration-white/70 group-hover:decoration-white transition-colors"> Tenes un proyecto </span> <br /> en mente? </h2>
          </a>
        </section>
        {/* Right Links */}
        <div className="flex gap-16 text-lg">
          <ul className="space-y-4 text-white/80">
            {siteLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="space-y-4 text-white/80">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== MIDDLE SMALL INFO ===== */}
      <div className="flex flex-col md:flex-row justify-between text-sm text-white/50 mt-20 gap-6">
        <div>Mendoza, Argentina</div>

        <div>
          <a
            href="/privacidad.html"
            className="hover:text-white transition-colors"
          >
            Política de Privacidad
          </a>
        </div>

        <div>
          <a
            href="mailto:ivanbustosdev@gmail.com"
            className="hover:text-white transition-colors"
          >
            ivanbustosdev@gmail.com
          </a>
          <span> © {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* ===== HUGE BACKGROUND BRAND ===== */}
      <div className="absolute bottom-[-80px] left-0 w-full text-center pointer-events-none select-none">
        <h1 className="font-display text-[120px] md:text-[220px] lg:text-[300px] font-bold tracking-tight text-white/5">
          IVAN
        </h1>
      </div>
    </footer>
  );
};

export default Footer;