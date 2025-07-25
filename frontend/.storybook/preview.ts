import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FAF7F2' },
        { name: 'dark', value: '#181A1B' },
      ],
    },
    a11y: {
      test: 'todo',
    },
    layout: 'responsive',
    docs: {
      description: {
        component: 'Tous les composants Norvea respectent le design system, la police Inter, le dark mode, et l’accessibilité.'
      }
    }
  },
};

export default preview;