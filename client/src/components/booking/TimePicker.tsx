import { motion } from 'framer-motion';
import { TimeSlot } from '../../types';

interface TimePickerProps {
  slots: TimeSlot[];
  selected: string;
  onSelect: (time: string) => void;
  loading: boolean;
}

export default function TimePicker({ slots, selected, onSelect, loading }: TimePickerProps) {
  const lunchSlots = slots.filter((s) =>
    ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'].includes(s.time)
  );
  const dinnerSlots = slots.filter((s) =>
    ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'].includes(s.time)
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gradient-to-r from-secondary via-tertiary to-secondary bg-[length:200%_100%] animate-shimmer rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  const renderSlots = (groupSlots: TimeSlot[], label: string) => (
    <div>
      <p className="font-body text-[11px] uppercase tracking-[0.15em] text-text-tertiary mb-3">
        {label}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {groupSlots.map((slot) => (
          <motion.button
            key={slot.time}
            whileTap={{ scale: slot.available ? 0.95 : 1 }}
            onClick={() => slot.available && onSelect(slot.time)}
            disabled={!slot.available}
            className={`relative px-3 py-2.5 rounded-full text-sm font-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-secondary ${
              selected === slot.time
                ? 'bg-gold text-primary font-medium'
                : slot.available
                ? 'border border-[rgba(201,168,76,0.2)] text-text-secondary hover:border-gold hover:text-gold cursor-pointer'
                : 'border border-[rgba(201,168,76,0.08)] text-text-tertiary cursor-not-allowed line-through'
            }`}
          >
            {slot.time}
            {!slot.available && (
              <span className="absolute -top-1 -right-1 bg-text-tertiary text-primary text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                Full
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSlots(lunchSlots, 'Lunch (12 PM – 2 PM)')}
      {renderSlots(dinnerSlots, 'Dinner (7 PM – 10 PM)')}
    </div>
  );
}
