// React import not required with new JSX transform
import Hero from './components/Hero';
import About from './components/About';
import Scalability from './components/Scalability';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Timeline from './components/Timeline';
import BrandStatement from "./components/BrandStatement";

import './App.css';
import './index.css';
import ParticlesBg from './components/ParticlesBg';

function App() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <ParticlesBg />
      <div className="animated-bg" aria-hidden="true" />
      <Navigation />
      <Hero />
      <About />
      <BrandStatement />
      <Scalability />
      <Projects />
      <Services />
      <Timeline />
      <Contact />

    </div>
  );
}

export default App;