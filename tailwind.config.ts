import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Black and white only — no exceptions
        'stone-black': '#080807',
        'near-black': '#0f0e0d',
        'ancient': '#1a1816',
        'stone': '#2a2826',
        'stone-mid': '#3d3b38',
        'mid': '#666462',
        'silver': '#999795',
        'near-white': '#f4f2f0',
        'off-white': '#fafaf8',
      },
      fontFamily: {
        condensed: ['var(--font-barlow-condensed)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      letterSpacing: {
        'display': '-0.03em',
        'display-tight': '-0.05em',
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4vw, 5rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}

export default config
