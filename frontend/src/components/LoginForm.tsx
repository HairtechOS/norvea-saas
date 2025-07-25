import React, { useState } from 'react';
import ButtonNorvea from './ButtonNorvea';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string;
  success?: string;
}

/**
 * Formulaire de connexion sécurisé Norvea.
 * - Validation stricte email/password (frontend)
 * - Affichage immédiat des erreurs explicites
 * - Toast notification succès/erreur
 * - Loading spinner, désactivation bouton
 * - Responsive, accessibilité, dark mode ready
 */
const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading = false, error, success }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [touched, setTouched] = useState({ email: false, password: false });

  // Validation stricte
  const validateEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  const validatePassword = (value: string) => value.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setFormError(null);
    if (!validateEmail(email)) {
      setFormError('Merci de renseigner un email valide');
      setShowToast(true);
      setToastType('error');
      return;
    }
    if (!validatePassword(password)) {
      setFormError('Mot de passe incorrect (8 caractères minimum)');
      setShowToast(true);
      setToastType('error');
      return;
    }
    try {
      await onLogin(email, password);
      setShowToast(true);
      setToastType('success');
    } catch (err: any) {
      setFormError(err?.message || 'Erreur inconnue');
      setShowToast(true);
      setToastType('error');
    }
  };

  // Affichage toast API (succès/erreur)
  React.useEffect(() => {
    if (error) {
      setShowToast(true);
      setToastType('error');
    } else if (success) {
      setShowToast(true);
      setToastType('success');
    }
  }, [error, success]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto p-6 bg-[var(--color-bg-accent)] rounded-[var(--radius-main)] shadow-main flex flex-col gap-4"
      aria-label="Formulaire de connexion Norvea"
      autoComplete="off"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium text-[var(--color-text-main)]">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          className={`px-4 py-2 rounded-[var(--radius-main)] border border-[var(--color-bg-separator)] bg-white text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors ${touched.email && !validateEmail(email) ? 'border-[var(--color-error)]' : ''}`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
          disabled={loading}
          aria-invalid={touched.email && !validateEmail(email)}
          aria-describedby="email-error"
        />
        {touched.email && !validateEmail(email) && (
          <span id="email-error" className="text-[var(--color-error)] text-sm">Merci de renseigner un email valide</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-medium text-[var(--color-text-main)]">Mot de passe</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className={`px-4 py-2 rounded-[var(--radius-main)] border border-[var(--color-bg-separator)] bg-white text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors ${touched.password && !validatePassword(password) ? 'border-[var(--color-error)]' : ''}`}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, password: true }))}
          disabled={loading}
          aria-invalid={touched.password && !validatePassword(password)}
          aria-describedby="password-error"
        />
        {touched.password && !validatePassword(password) && (
          <span id="password-error" className="text-[var(--color-error)] text-sm">Mot de passe incorrect (8 caractères minimum)</span>
        )}
      </div>
      <ButtonNorvea
        type="submit"
        loading={loading}
        disabled={loading || !email || !password}
        className="mt-2"
        aria-label="Se connecter"
      >
        Login
      </ButtonNorvea>
      {(formError || error) && showToast && toastType === 'error' && (
        <div
          role="alert"
          className="mt-2 px-4 py-2 rounded-[var(--radius-main)] bg-[var(--color-error)] text-white animate-fade-in"
        >
          {formError || error}
        </div>
      )}
      {success && showToast && toastType === 'success' && (
        <div
          role="status"
          className="mt-2 px-4 py-2 rounded-[var(--radius-main)] bg-[var(--color-success)] text-[var(--color-text-main)] animate-fade-in"
        >
          {success}
        </div>
      )}
    </form>
  );
};

export default LoginForm; 