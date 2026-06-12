import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine: unknown) => {
    await loadFull(engine);
  }, []);

  const options = {
    fpsLimit: 30,
    particles: {
      number: { value: 15, density: { enable: true, area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.12 },
      size: { value: { min: 1, max: 4 } },
      links: { enable: false, distance: 150, color: '#ffffff', opacity: 0.08, width: 1 },
      move: { enable: true, speed: 0.6, direction: 'none', outModes: { default: 'out' } }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        onClick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.6 },
        push: { quantity: 4 }
      }
    },
    detectRetina: true
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{ position: 'fixed', inset: 0, zIndex: -5, pointerEvents: 'none' }}
    />
  );
};

export default ParticlesBg;
