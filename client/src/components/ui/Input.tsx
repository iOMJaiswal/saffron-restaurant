import { InputHTMLAttributes, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, id, required, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-sm font-body text-text-secondary">
          {label}
          {required && <span className="text-gold ml-0.5">*</span>}
        </label>
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary text-sm font-body">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={`w-full bg-secondary border ${
              error ? 'border-error' : 'border-[rgba(201,168,76,0.15)]'
            } rounded-lg px-4 py-3 text-text-primary font-body text-sm placeholder:text-text-tertiary
            focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]
            transition-all duration-200 ${prefix ? 'pl-12' : ''} ${className}`}
            {...props}
          />
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              className="flex items-center gap-1 text-error text-[13px] font-body"
            >
              <AlertCircle size={14} />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
