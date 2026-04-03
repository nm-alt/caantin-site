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
        'stone-black': '#080807',
        'near-black': '#0f0e0d',
        'ancient': '#1a1816',
        'stone': '#2a2826',
        'stone-mid': '#3d3b38',
        'mid': '#666462',
        'silver': '#999795',
        'near-white': '#f4f2f0',
        'off-white': '#fafaf8',
        'accent': '#EC4E02',
        'accent-hover': '#d94500',
        'accent-light': '#FFF4EE',
        'peach': '#F5D5C0',
        'warm-gray': '#F0EDEA',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        'tight': '-0.025em',
        'tighter': '-0.04em',
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}

export default config
