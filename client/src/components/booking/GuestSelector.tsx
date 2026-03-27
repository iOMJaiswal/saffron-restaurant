import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface GuestSelectorProps {
  adults: number;
  children: number;
  onAdultsChange: (val: number) => void;
  onChildrenChange: (val: number) => void;
}

function Stepper({
  value,
  onChange,
  label,
  min = 0,
  max = 10,
}: {
  value: number;
  onChange: (val: number) => void;
  label: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-body text-text-secondary">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => value > min && onChange(value - 1)}
          disabled={value <= min}
          className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold disabled:border-[rgba(201,168,76,0.08)] disabled:text-text-tertiary disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-secondary"
          aria-label={`Decrease ${label}`}
        >
          <Minus size={16} />
        </button>
        <div className="w-10 text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-2xl font-display text-text-primary inline-block"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          onClick={() => value < max && onChange(value + 1)}
          disabled={value >= max}
          className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold disabled:border-[rgba(201,168,76,0.08)] disabled:text-text-tertiary disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-secondary"
          aria-label={`Increase ${label}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default function GuestSelector({ adults, children, onAdultsChange, onChildrenChange }: GuestSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-center gap-12">
        <Stepper value={adults} onChange={onAdultsChange} label="Adults" min={1} max={10} />
        <Stepper value={children} onChange={onChildrenChange} label="Children" min={0} max={10} />
      </div>
      <p className="text-center text-text-tertiary text-[13px] font-body mt-4">
        For groups above 10, please call us directly.
      </p>
    </div>
  );
}
