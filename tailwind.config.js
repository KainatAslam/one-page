/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          dark: '#22223b',
          primary: '#4a4e69',
          light: '#9a8c98',
          accent: '#c9ada7',
          bg: '#f2e9e4',
        },
      },
      fontFamily: {
        heading: "'Playfair Display', Georgia, serif",
        body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      },
      fontSize: {
        'section-tag': ['0.85rem', { lineHeight: '1rem', fontWeight: '700', letterSpacing: '2px' }],
        'section-title': ['2.5rem', { lineHeight: '1.25' }],
        'section-subtitle': ['1.1rem', { lineHeight: '1.6' }],
      },
      boxShadow: {
        'indigo-sm': '0 2px 8px rgba(34, 34, 59, 0.06)',
        'indigo-md': '0 8px 24px rgba(34, 34, 59, 0.1)',
        'indigo-lg': '0 16px 40px rgba(34, 34, 59, 0.15)',
        'indigo-cta': '0 8px 24px rgba(201, 173, 167, 0.35)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '350ms',
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [],
}

