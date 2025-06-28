import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        periwinkle: {
          50: '#F8F8FF',
          100: '#E6E6FF',
          200: '#D4D4FF',
          300: '#C5C5FF',
          400: '#A3A3FF',
          500: '#8A8AE6',
          600: '#7070CC',
          700: '#5656B3',
          800: '#3D3D99',
          900: '#2D2D4A',
        },
        background: '#F8F8FF',
        foreground: '#2D2D4A',
        success: '#7B68EE',
      },
    },
  },
  plugins: [],
}
export default config
