import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Norvea/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Formulaire de connexion sécurisé Norvea. Validation stricte, feedback immédiat, toasts, loading, responsive, accessibilité, dark mode.'
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
type Story = StoryObj<typeof LoginForm>;

const fakeLogin = async (email: string, password: string) => {
  await new Promise(r => setTimeout(r, 1000));
  if (email !== 'test@norvea.com' || password !== 'password123') {
    throw new Error('Mot de passe incorrect');
  }
};

export const Default: Story = {
  args: {
    onLogin: fakeLogin,
  },
};

export const Loading: Story = {
  args: {
    onLogin: fakeLogin,
    loading: true,
  },
};

export const Erreur: Story = {
  args: {
    onLogin: fakeLogin,
    error: 'Mot de passe incorrect',
  },
};

export const Succès: Story = {
  args: {
    onLogin: fakeLogin,
    success: 'Connexion réussie !',
  },
};

export const DarkMode: Story = {
  args: {
    onLogin: fakeLogin,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}; 