// React import not required with new JSX transform
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Stack from './components/Stack';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import  Footer  from './components/Footer';

import './App.css';
import './index.css';
import './styles/devices.css';
import ParticlesBg from './components/ParticlesBg';
import HeroIntro from './components/HeroIntro';

function App() {
  return (
    // Se quitaron `overflow-y-scroll` (creaba un contenedor de scroll anidado
    // innecesario) y `snap-y snap-mandatory` (inerte, porque el contenedor no
    // tenía altura fija y por tanto nunca fue el scroller). El scroll suave
    // sigue activo vía `html { scroll-behavior: smooth }` en App.css.
    <div className="min-h-screen text-white">
      {/* Cortina de entrada. Va primero para quedar por encima de todo. */}
      <HeroIntro />

      {/* Primer elemento enfocable de la página: permite saltarse los cinco
          enlaces del nav en cada visita con teclado o lector de pantalla. */}
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <ParticlesBg />
      <div className="animated-bg" aria-hidden="true" />
      <Navigation />

      {/* La página no tenía ningún landmark: era un div suelto. `main` le da a
          los lectores de pantalla un punto de entrada al contenido. */}
      <main id="contenido">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>

      <Footer/>

    </div>
  );
}

export default App;
