/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './home/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'scheme-background': '#ffffff',
        'scheme-border': '#e5e7eb',
        'neutral-darkest': '#1f2937',
      },
      fontSize: {
        'heading-h1': ['3rem', { lineHeight: '1.2' }],
        'heading-h2': ['2rem', { lineHeight: '1.3' }],
        'heading-h4': ['1.5rem', { lineHeight: '1.4' }],
        'text-medium': ['1rem', { lineHeight: '1.6' }],
        'text-regular': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}