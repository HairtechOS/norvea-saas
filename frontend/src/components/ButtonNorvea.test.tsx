import { render, screen, fireEvent } from '@testing-library/react';
import ButtonNorvea from './ButtonNorvea';

describe('ButtonNorvea', () => {
  it('rend le texte enfant', () => {
    render(<ButtonNorvea>Connexion</ButtonNorvea>);
    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });

  it('désactive le bouton si disabled', () => {
    render(<ButtonNorvea disabled>Connexion</ButtonNorvea>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('affiche le spinner si loading', () => {
    render(<ButtonNorvea loading>Connexion</ButtonNorvea>);
    expect(screen.getByLabelText(/chargement/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('déclenche onClick si cliqué', () => {
    const onClick = jest.fn();
    render(<ButtonNorvea onClick={onClick}>Connexion</ButtonNorvea>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('focus visible (accessibilité)', () => {
    render(<ButtonNorvea>Connexion</ButtonNorvea>);
    const btn = screen.getByRole('button');
    btn.focus();
    expect(btn).toHaveFocus();
  });
}); 