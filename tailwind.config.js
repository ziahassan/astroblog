import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'underline',
              color: '#1e40af',
              '&:hover': {
                color: '#1e3a8a',
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}