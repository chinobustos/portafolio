// React import not required with new JSX transform
import Hero from './components/Hero';
import About from './components/About';
import Scalability from './components/Scalability';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <Navigation />
      <Hero />
      <About />
      <Scalability />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}

export default App;