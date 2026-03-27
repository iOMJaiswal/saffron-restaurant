import { SelectHTMLAttributes, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, id, required, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-sm font-body text-text-secondary">
          {label}
          {required && <span className="text-gold ml-0.5">*</span>}
        </label>
        <select
          ref={ref}
          id={id}
          className={`w-full bg-secondary border ${
            error ? 'border-error' : 'border-[rgba(201,168,76,0.15)]'
          } rounded-lg px-4 py-3 text-text-primary font-body text-sm appearance-none
          focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]
          transition-all duration-200 cursor-pointer ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-secondary">
              {opt.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';

export default Select;
