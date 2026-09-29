import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#12100c',
        cream: '#f6f1e8',
        sand: '#e9ddc9',
        gold: '#c9a227',
        cocoa: '#2a2118',
        smoke: '#8a8378',
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Didot"', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        arch: '999px 999px 28px 28px',
        leaf: '8px 120px 8px 120px',
        blob: '46% 54% 58% 42% / 48% 42% 58% 52%',
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(18,16,12,.45)',
        card: '0 18px 50px -20px rgba(18,16,12,.35)',
      },
    },
  },
  plugins: [],
};

export default config;
