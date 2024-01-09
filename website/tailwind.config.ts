import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        lightGray: 'rgb(229, 225, 218)',
        milk:'rgb(251, 249, 241)',
        blue: 'rgb(170, 215, 217)',
        deepBlue: 'rgb(146, 199, 207)',
      },
      animation: {
        loading: 'loading 1s infinite',
      },

    },
  },
  plugins: [],
}
export default config
