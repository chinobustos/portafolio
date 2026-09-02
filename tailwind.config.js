/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        /**
         * Voz de display, solo para titulares. El cuerpo sigue en Montserrat:
         * la gracia de tener dos voces es que se distingan, no que compitan.
         */
        display: ['"Clash Display"', 'Montserrat', 'sans-serif']
      },
      colors: {
        /**
         * Acento único del sitio. Antes convivían cuatro familias sin sistema
         * (rojo, verde, cyan/violeta y azul); ahora hay una sola escala.
         * El 500 da 6.21:1 sobre #0A0A0F: pasa AA para texto y sobra para el
         * indicador de foco, que WCAG 2.2 pide en 3:1.
         */
        accent: {
          300: '#ffa48d',
          400: '#ff7a5c',
          DEFAULT: '#ff5533',
          500: '#ff5533',
          600: '#e8431f',
          700: '#c9350f',
          800: '#a02a0c'
        }
      }
    }
  },
  plugins: []
};
