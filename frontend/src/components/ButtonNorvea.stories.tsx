import type { Meta, StoryObj } from '@storybook/react';
import ButtonNorvea from './ButtonNorvea';

const meta: Meta<typeof ButtonNorvea> = {
  title: 'Norvea/ButtonNorvea',
  component: ButtonNorvea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bouton primaire Norvea, conforme au design system (bleu doux, arrondi, micro-interactions, dark mode ready). Accessible, focus visible, feedback loading, désactivé si loading/disabled.'
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
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonNorvea>;

export const Default: Story = {
  args: {
    children: 'Connexion',
  },
};

export const Loading: Story = {
  args: {
    children: 'Connexion',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Connexion',
    disabled: true,
  },
};

export const DarkMode: Story = {
  args: {
    children: 'Connexion',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}; 