import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#040507',
          DEFAULT: '#07080C',
          900: '#0C0E14',
          800: '#141722',
          700: '#1E2333',
        },
        paper: {
          light: '#FAF8F3',
          DEFAULT: '#F4F1EA',
          muted: '#EAE6DC',
          border: '#DED8CB',
          dark: '#161513',
        },
        cobalt: {
          DEFAULT: '#4267FF',
          hover: '#2E54F0',
          light: '#6B89FF',
          dim: 'rgba(66, 103, 255, 0.15)',
        },
        violet: {
          DEFAULT: '#8A63FF',
          hover: '#774DF0',
          light: '#A687FF',
          dim: 'rgba(138, 99, 255, 0.15)',
        },
        mint: {
          DEFAULT: '#43D3A1',
          light: '#65E4B9',
          dim: 'rgba(67, 211, 161, 0.15)',
        },
        amber: {
          warm: '#F1B55A',
          warning: '#F59E0B',
          dim: 'rgba(241, 181, 90, 0.15)',
        },
        coral: {
          DEFAULT: '#FF6363',
          danger: '#EF4444',
          dim: 'rgba(255, 99, 99, 0.15)',
        },
        softblue: {
          DEFAULT: '#9CB7FF',
          dim: 'rgba(156, 183, 255, 0.15)',
        },
        graphite: {
          50: '#f7f7f8',
          100: '#efeff1',
          200: '#dcdce2',
          300: '#c0c0c9',
          400: '#9b9ba8',
          500: '#7a7a88',
          600: '#35354a',
          700: '#252530',
          800: '#1a1a1f',
          900: '#111114',
          950: '#0a0a0c',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'data-flow': 'data-flow 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          'from': { backgroundPosition: '200% 0' },
          'to': { backgroundPosition: '-200% 0' },
        },
        'data-flow': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.5)',
        'glow-graphite': '0 0 30px -10px rgba(53, 53, 74, 0.4)',
      }
    },
  },
  plugins: [],
} satisfies Config;
