import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, loading, children, className = '', disabled, ...props }, ref) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-body font-medium uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-primary active:scale-[0.97] overflow-hidden';

    const variants = {
      primary:
        'bg-gold text-primary hover:bg-gold-light disabled:bg-text-tertiary disabled:text-text-secondary disabled:cursor-not-allowed',
      outline:
        'border border-gold text-gold hover:bg-gold hover:text-primary disabled:border-text-tertiary disabled:text-text-tertiary disabled:cursor-not-allowed',
      ghost:
        'text-text-secondary hover:text-text-primary disabled:text-text-tertiary disabled:cursor-not-allowed',
      text: 'text-gold hover:text-gold-light underline-offset-4 hover:underline disabled:text-text-tertiary disabled:cursor-not-allowed',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-sm',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
        {variant === 'primary' && !disabled && (
          <span className="absolute inset-0 overflow-hidden pointer-events-none">
            <span className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-btn-shimmer" />
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
