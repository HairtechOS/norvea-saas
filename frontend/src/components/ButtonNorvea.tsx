import React from 'react';

interface ButtonNorveaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

/**
 * Bouton primaire Norvea, conforme au design system (bleu doux, arrondi, micro-interactions, dark mode ready).
 * Accessible, focus visible, feedback loading, désactivé si loading/disabled.
 */
const ButtonNorvea: React.FC<ButtonNorveaProps> = ({
  children,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      type={props.type || 'button'}
      className={`
        px-6 py-2 rounded-[var(--radius-main)] shadow-main font-semibold text-white
        bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
        disabled:bg-[var(--color-bg-separator)] disabled:text-[var(--color-text-secondary)] disabled:cursor-not-allowed
        relative flex items-center justify-center gap-2
        ${className}
      `}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute left-4 flex items-center" aria-label="Chargement">
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </span>
      )}
      <span className={loading ? 'opacity-60' : ''}>{children}</span>
    </button>
  );
};

export default ButtonNorvea; 