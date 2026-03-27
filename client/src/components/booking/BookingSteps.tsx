import { Check } from 'lucide-react';

interface BookingStepsProps {
  currentStep: number;
}

const steps = [
  { num: 1, label: 'Select Date & Time' },
  { num: 2, label: 'Your Details' },
  { num: 3, label: 'Confirm' },
];

export default function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-body font-medium transition-all duration-300 ${
                currentStep > step.num
                  ? 'bg-gold text-primary'
                  : currentStep === step.num
                  ? 'bg-gold text-primary'
                  : 'border border-[rgba(201,168,76,0.2)] text-text-tertiary'
              }`}
            >
              {currentStep > step.num ? <Check size={18} /> : step.num}
            </div>
            <span
              className={`mt-2 text-[11px] font-body uppercase tracking-[0.1em] whitespace-nowrap ${
                currentStep >= step.num ? 'text-gold' : 'text-text-tertiary'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-px mx-4 mt-[-20px]">
              <div className="h-full bg-[rgba(201,168,76,0.15)] relative">
                <div
                  className="absolute top-0 left-0 h-full bg-gold transition-all duration-500"
                  style={{ width: currentStep > step.num ? '100%' : '0%' }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
