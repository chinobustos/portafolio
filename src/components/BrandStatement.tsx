const BrandStatement = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 text-center"
      style={
        {
          backgroundColor: `hsla(0,0%,0%,1)`,
          backgroundImage: `
            radial-gradient(circle at 40% 20%, hsla(28,0%,0%,1) 0%, transparent 55.0771488024338%),
            radial-gradient(circle at 80% 0%, hsla(189,0%,0%,1) 0%, transparent 50%),
            radial-gradient(circle at 0% 50%, hsla(355,0%,0%,1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, hsla(0,95%,52%,1) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, hsla(309,95%,49%,1) 0%, transparent 50%),
            radial-gradient(circle at 80% 100%, hsla(242,100%,70%,1) 0%, transparent 50%),
            radial-gradient(circle at 0% 0%, hsla(343,100%,13%,1) 0%, transparent 50%)
          `,
          backgroundBlendMode: `normal,normal,normal,normal,normal,normal,normal`,
        } as React.CSSProperties
      }
    >
      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
          Creo plataformas web{" "}
          <span className="text-white/90">
            inmersivas y ultrafuncionales
          </span>
        </h2>

        <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
          que elevan la percepción de marca, incrementan la conversión y las
          diferencian de la competencia.
        </p>

      </div>
    </section>
  );
};

export default BrandStatement;