import React from 'react';

interface LanguageCurrencySelectorProps {
  languages: { code: string; label: string; flag?: string }[];
  currencies: { code: string; label: string; symbol: string }[];
  valueLanguage: string;
  valueCurrency: string;
  onChangeLanguage: (code: string) => void;
  onChangeCurrency: (code: string) => void;
  disabled?: boolean;
}

/**
 * Sélecteur optionnel langues/devise Norvea, responsive, accessible, conforme design system.
 */
const LanguageCurrencySelector: React.FC<LanguageCurrencySelectorProps> = ({
  languages,
  currencies,
  valueLanguage,
  valueCurrency,
  onChangeLanguage,
  onChangeCurrency,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full">
      <div className="flex-1">
        <label htmlFor="language-select" className="block text-[var(--color-text-main)] text-sm font-medium mb-1">Langue</label>
        <select
          id="language-select"
          value={valueLanguage}
          onChange={e => onChangeLanguage(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-2 rounded-[var(--radius-main)] border border-[var(--color-bg-separator)] bg-white text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
          aria-label="Sélectionner la langue"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag ? `${lang.flag} ` : ''}{lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="currency-select" className="block text-[var(--color-text-main)] text-sm font-medium mb-1">Devise</label>
        <select
          id="currency-select"
          value={valueCurrency}
          onChange={e => onChangeCurrency(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-2 rounded-[var(--radius-main)] border border-[var(--color-bg-separator)] bg-white text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
          aria-label="Sélectionner la devise"
        >
          {currencies.map(cur => (
            <option key={cur.code} value={cur.code}>
              {cur.label} ({cur.symbol})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageCurrencySelector; 