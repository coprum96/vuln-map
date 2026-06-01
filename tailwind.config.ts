import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cbr: {
          red: '#C8102E',
          'red-dark': '#8B0000',
          navy: '#1C3F6E',
          muted: '#94b3d4',
          'muted-dark': '#7a9cbd',
        },
        page: {
          bg: '#F5F5F5',
          text: '#1A1A1A',
          muted: '#6B6B6B',
          border: '#E0E0E0',
        },
      },
      fontFamily: {
        sans: ['"PT Sans"', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        cbr: '2px',
        'cbr-md': '4px',
      },
      boxShadow: {
        cbr: '0 1px 3px rgba(0,0,0,0.1)',
        'cbr-sm': '0 1px 3px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
