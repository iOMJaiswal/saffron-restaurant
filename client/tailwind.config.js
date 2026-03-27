/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D0A07',
        secondary: '#1A1410',
        tertiary: '#241C14',
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
        'text-primary': '#F5EFE0',
        'text-secondary': '#A89880',
        'text-tertiary': '#6B5D4F',
        error: '#E05252',
        success: '#4CAF7D',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderColor: {
        'gold-subtle': 'rgba(201, 168, 76, 0.15)',
        'gold-hover': 'rgba(201, 168, 76, 0.4)',
      },
      boxShadow: {
        'gold-glow': '0 0 60px rgba(201, 168, 76, 0.07)',
        'gold-border-glow': '0 0 20px rgba(201, 168, 76, 0.15)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px)', opacity: '0.8' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'btn-shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'float-up': 'float-up 4s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'btn-shimmer': 'btn-shimmer 1.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
