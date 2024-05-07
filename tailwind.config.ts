import typography from '@tailwindcss/typography'
import { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: `rgb(var(--accent))`
      },
      backgroundColor: {
        primary: `rgb(var(--bg))`
      },
      textColor: {
        primary: `rgb(var(--text))`
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--monospace-font)', ...fontFamily.mono]
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: [typography()]
}

export default config
