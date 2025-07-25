import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: 'var(--color-bg-main)',
          accent: 'var(--color-bg-accent)',
          separator: 'var(--color-bg-separator)',
        },
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        accent: 'var(--color-accent)',
        alert: 'var(--color-alert)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        text: {
          main: 'var(--color-text-main)',
          secondary: 'var(--color-text-secondary)',
        },
      },
      borderRadius: {
        main: 'var(--radius-main)',
      },
      boxShadow: {
        main: 'var(--shadow-main)',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config; 