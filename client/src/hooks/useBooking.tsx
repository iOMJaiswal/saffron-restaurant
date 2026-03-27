import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { BookingFormData } from '../types';

interface BookingContextType {
  formData: BookingFormData;
  currentStep: number;
  setStep: (step: number) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  resetForm: () => void;
}

const defaultFormData: BookingFormData = {
  date: '',
  time: '',
  adults: 2,
  children: 0,
  occasion: 'None',
  occasion_note: '',
  name: '',
  email: '',
  phone: '',
  special_requests: '',
  dietary_requirements: [],
};

const BookingContext = createContext<BookingContextType>({
  formData: defaultFormData,
  currentStep: 1,
  setStep: () => {},
  updateFormData: () => {},
  resetForm: () => {},
});

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<BookingFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = useCallback((data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(defaultFormData);
    setCurrentStep(1);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        formData,
        currentStep,
        setStep: setCurrentStep,
        updateFormData,
        resetForm,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
