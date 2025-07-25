import type { Meta, StoryObj } from '@storybook/react';
import LanguageCurrencySelector from './LanguageCurrencySelector';

const meta: Meta<typeof LanguageCurrencySelector> = {
  title: 'Norvea/LanguageCurrencySelector',
  component: LanguageCurrencySelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Sélecteur optionnel langues/devise Norvea, responsive, accessible, conforme design system.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FAF7F2' },
        { name: 'dark', value: '#181A1B' },
      ],
    },
  },
};
export default meta;
type Story = StoryObj<typeof LanguageCurrencySelector>;

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];
const currencies = [
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'USD', label: 'Dollar', symbol: '$' },
  { code: 'GBP', label: 'Livre', symbol: '£' },
];

export const Default: Story = {
  args: {
    languages,
    currencies,
    valueLanguage: 'fr',
    valueCurrency: 'EUR',
    onChangeLanguage: () => {},
    onChangeCurrency: () => {},
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}; 