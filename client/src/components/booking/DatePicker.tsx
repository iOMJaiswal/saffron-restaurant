import { DayPicker } from 'react-day-picker';
import { addDays, isBefore, startOfDay } from 'date-fns';
import 'react-day-picker/style.css';

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function DatePicker({ selected, onSelect }: DatePickerProps) {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  return (
    <div className="saffron-calendar">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={[{ before: today }, { after: maxDate }]}
        today={today}
        modifiersClassNames={{
          selected: 'saffron-day-selected',
          today: 'saffron-day-today',
        }}
      />
      <style>{`
        .saffron-calendar .rdp-root {
          --rdp-accent-color: #C9A84C;
          --rdp-accent-background-color: #C9A84C;
          --rdp-day_button-width: 40px;
          --rdp-day_button-height: 40px;
          font-family: 'DM Sans', sans-serif;
          color: #F5EFE0;
        }
        .saffron-calendar .rdp-month_caption {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          color: #F5EFE0;
          padding: 0.5rem 0;
        }
        .saffron-calendar .rdp-weekday {
          color: #A89880;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .saffron-calendar .rdp-day button {
          color: #F5EFE0;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .saffron-calendar .rdp-day button:hover:not([disabled]) {
          background: rgba(201, 168, 76, 0.2);
          color: #C9A84C;
        }
        .saffron-calendar .rdp-day.rdp-disabled button {
          color: #6B5D4F;
          cursor: not-allowed;
        }
        .saffron-calendar .saffron-day-selected button,
        .saffron-calendar .rdp-selected .rdp-day_button {
          background: #C9A84C !important;
          color: #0D0A07 !important;
          font-weight: 600;
        }
        .saffron-calendar .saffron-day-today button {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .saffron-calendar .rdp-button_previous,
        .saffron-calendar .rdp-button_next {
          color: #A89880;
        }
        .saffron-calendar .rdp-button_previous:hover,
        .saffron-calendar .rdp-button_next:hover {
          color: #C9A84C;
        }
        .saffron-calendar .rdp-chevron {
          fill: currentColor;
        }
      `}</style>
    </div>
  );
}
