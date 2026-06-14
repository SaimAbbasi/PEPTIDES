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
        background: '#0A0B0D',
        surface: '#111318',
        'surface-elevated': '#1A1D24',
        'border-subtle': '#1E2028',
        accent: '#00C2FF',
        'accent-hover': '#00A8E0',
        teal: '#00857A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A8B8',
        'text-muted': '#5A6070',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
