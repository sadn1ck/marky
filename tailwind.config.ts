import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import { neutral } from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'media',
  content: ['./**/*/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: `rgb(var(--accent-color))`
        },
        gray: neutral
      },
      backgroundColor: {
        primary: `rgb(var(--bg))`,
        secondary: `rgb(var(--bg-secondary))`
      },
      textColor: {
        primary: `rgb(var(--text))`,
        secondary: `rgb(var(--text-secondary))`
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--monospace-font)', ...fontFamily.mono]
      }
    }
  },
  plugins: [animate]
}

export default config
