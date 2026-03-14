/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B6CFF',
          50: '#eef0ff',
          100: '#e0e3ff',
          200: '#c7ccff',
          300: '#a5aeff',
          400: '#8189ff',
          500: '#5B6CFF',
          600: '#3d4bf5',
          700: '#3038e0',
          800: '#2830b5',
          900: '#262d8f',
        },
        secondary: {
          DEFAULT: '#8A7CFF',
          500: '#8A7CFF',
        },
        accent: {
          DEFAULT: '#00D4FF',
          500: '#00D4FF',
        },
        background: '#0B1020',
        surface: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      spacing: {
        // 4px grid
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
      },
      backdropBlur: {
        glass: '20px',
        'glass-heavy': '40px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.15)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.25)',
        glow: '0 0 20px rgba(91,108,255,0.3)',
        'glow-accent': '0 0 20px rgba(0,212,255,0.3)',
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, #1e1b4b 0, transparent 50%), radial-gradient(at 80% 0%, #312e81 0, transparent 50%), radial-gradient(at 0% 50%, #0B1020 0, transparent 50%), radial-gradient(at 80% 50%, #1e1b4b 0, transparent 50%), radial-gradient(at 0% 100%, #312e81 0, transparent 50%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(91,108,255,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(91,108,255,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
