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
        // V2 — Pink leads. Dark supports.
        'pink': '#E8266D',
        'pink-hot': '#FF1F78',
        'pink-deep': '#C41E5C',
        'pink-soft': '#FFEEF5',
        'pink-ink': '#1A0610',
        'pink-signal': '#FF4D8D',
        'pink-glow': '#FF85AD',

        // Alias — 'accent' still maps to pink for backwards-compat
        'accent': '#E8266D',
        'accent-hover': '#C41E5C',
        'accent-light': '#FFEEF5',
        'accent-signal': '#FF4D8D',
        'accent-glow': '#FF85AD',

        // Dark — single mode option, no longer default
        'stone-black': '#0D0D0D',
        'near-black': '#1a1a1a',
        'ancient': '#1f1f1f',
        'stone': '#2D2D3F',
        'stone-mid': '#3d3d50',
        'mid': '#6b6b80',
        'silver': '#9a9aaa',
        'near-white': '#F3F4F6',
        'off-white': '#f9fafb',
        'charcoal': '#2D2D3F',
        'warm-gray': '#F3F4F6',

        // Signal colors
        'live-green': '#00D69B',
        'amber': '#FFB800',
        'info-blue': '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        // Legacy alias so nothing breaks mid-migration
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.025em',
        'tighter': '-0.04em',
        'tightest': '-0.06em',
      },
      fontSize: {
        // V2 — louder, bigger, bolder
        'display-2xl': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
}

export default config
