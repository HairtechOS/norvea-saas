import { render, screen, fireEvent } from '@testing-library/react';
import LanguageCurrencySelector from './LanguageCurrencySelector';

describe('LanguageCurrencySelector', () => {
  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];
  const currencies = [
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'USD', label: 'Dollar', symbol: '$' },
  ];

  it('affiche les langues et devises', () => {
    render(
      <LanguageCurrencySelector
        languages={languages}
        currencies={currencies}
        valueLanguage="fr"
        valueCurrency="EUR"
        onChangeLanguage={() => {}}
        onChangeCurrency={() => {}}
      />
    );
    expect(screen.getByLabelText(/langue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/devise/i)).toBeInTheDocument();
    expect(screen.getByText(/français/i)).toBeInTheDocument();
    expect(screen.getByText(/euro/i)).toBeInTheDocument();
  });

  it('change la langue et la devise', () => {
    const onChangeLanguage = jest.fn();
    const onChangeCurrency = jest.fn();
    render(
      <LanguageCurrencySelector
        languages={languages}
        currencies={currencies}
        valueLanguage="fr"
        valueCurrency="EUR"
        onChangeLanguage={onChangeLanguage}
        onChangeCurrency={onChangeCurrency}
      />
    );
    fireEvent.change(screen.getByLabelText(/langue/i), { target: { value: 'en' } });
    expect(onChangeLanguage).toHaveBeenCalledWith('en');
    fireEvent.change(screen.getByLabelText(/devise/i), { target: { value: 'USD' } });
    expect(onChangeCurrency).toHaveBeenCalledWith('USD');
  });

  it('désactive les selects si disabled', () => {
    render(
      <LanguageCurrencySelector
        languages={languages}
        currencies={currencies}
        valueLanguage="fr"
        valueCurrency="EUR"
        onChangeLanguage={() => {}}
        onChangeCurrency={() => {}}
        disabled
      />
    );
    expect(screen.getByLabelText(/langue/i)).toBeDisabled();
    expect(screen.getByLabelText(/devise/i)).toBeDisabled();
  });
}); 