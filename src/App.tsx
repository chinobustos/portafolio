// React import not required with new JSX transform
import { lazy, Suspense } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Scalability from './components/Scalability';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Timeline from './components/Timeline';
import  Footer  from './components/Footer';

import './App.css';
import './index.css';
import ParticlesBg from './components/ParticlesBg';

// El bloque 3D (Spline) vive muy por debajo del pliegue: se carga en un chunk
// aparte para no retrasar el primer render ni el bundle inicial.
const BrandStatement = lazy(() => import('./components/BrandStatement'));

function App() {
  return (
    // Se quitaron `overflow-y-scroll` (creaba un contenedor de scroll anidado
    // innecesario) y `snap-y snap-mandatory` (inerte, porque el contenedor no
    // tenía altura fija y por tanto nunca fue el scroller). El scroll suave
    // sigue activo vía `html { scroll-behavior: smooth }` en App.css.
    <div className="min-h-screen text-white">
      <ParticlesBg />
      <div className="animated-bg" aria-hidden="true" />
      <Navigation />
      <Hero />
      <About />
      <Scalability />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <BrandStatement />
      </Suspense>
      <Projects />
      <Services />
      <Timeline />
      <Contact />
      <Footer/>

    </div>
  );
}

export default App;
