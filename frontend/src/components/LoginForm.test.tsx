import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('affiche une erreur si email invalide', async () => {
    render(<LoginForm onLogin={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'foo' } });
    fireEvent.blur(screen.getByLabelText(/email/i));
    expect(await screen.findByText(/email valide/i)).toBeInTheDocument();
  });

  it('affiche une erreur si mot de passe trop court', async () => {
    render(<LoginForm onLogin={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: '123' } });
    fireEvent.blur(screen.getByLabelText(/mot de passe/i));
    expect(await screen.findByText(/8 caractères minimum/i)).toBeInTheDocument();
  });

  it('désactive le bouton si loading', () => {
    render(<LoginForm onLogin={jest.fn()} loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('appelle onLogin avec email et password valides', async () => {
    const onLogin = jest.fn().mockResolvedValue(undefined);
    render(<LoginForm onLogin={onLogin} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@norvea.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(onLogin).toHaveBeenCalledWith('test@norvea.com', 'password123'));
  });

  it('affiche une erreur backend', () => {
    render(<LoginForm onLogin={jest.fn()} error="Erreur API" />);
    expect(screen.getByText(/erreur api/i)).toBeInTheDocument();
  });

  it('affiche un message de succès', () => {
    render(<LoginForm onLogin={jest.fn()} success="Connexion réussie !" />);
    expect(screen.getByText(/connexion réussie/i)).toBeInTheDocument();
  });
}); 