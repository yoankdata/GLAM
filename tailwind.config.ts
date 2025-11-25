import type { Config } from 'tailwindcss';

const config: Config = {
  // Spécifie où Tailwind doit chercher les classes CSS à purger
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Définition de votre palette de couleurs et de vos polices
      colors: {
        'primary-pink': '#D4A6A8', // Couleur accent pour GLAM
        'light-bg': '#FAF9F7',    // Fond très léger
        'dark-text': '#0A0A0A',   // Texte foncé
      },
      fontFamily: {
        // La police sans-serif sera Inter (par défaut dans globals.css)
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;