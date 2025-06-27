import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores inspirada en Gemini
        'gemini-gray': {
          '900': '#131314', // Fondo principal
          '800': '#1e1f20', // Fondo de superficies (cards, modales)
          '700': '#2d2e30', // Bordes, elementos interactivos sutiles
          '600': '#3d3e40', // Bordes más visibles
          '500': '#8e9092', // Texto secundario, iconos
          '400': '#c4c7c5', // Texto principal
          '300': '#e3e3e3', // Texto principal más brillante
        },
        'gemini-blue': {
          'DEFAULT': '#89b4f8', // Acentos, links
          'dark': '#5e97f6',   // Acentos hover
        },
      },
      borderRadius: {
        lg: `0.75rem`,
        md: `0.5rem`,
        sm: `0.25rem`,
      },
    },
  },
  plugins: [],
};
export default config;