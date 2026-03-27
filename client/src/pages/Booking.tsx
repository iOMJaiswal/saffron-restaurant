import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useBooking } from '../hooks/useBooking';
import { fetchTimeSlots, createBooking } from '../lib/api';
import BookingSteps from '../components/booking/BookingSteps';
import DatePickerComponent from '../components/booking/DatePicker';
import TimePicker from '../components/booking/TimePicker';
import GuestSelector from '../components/booking/GuestSelector';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { Calendar, Clock, Users, PartyPopper, MessageSquare, AlertCircle } from 'lucide-react';

const guestDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  special_requests: z.string().max(300, 'Maximum 300 characters').optional(),
});

type GuestDetailsForm = z.infer<typeof guestDetailsSchema>;

const occasions = [
  { value: 'None', label: 'None' },
  { value: 'Birthday', label: 'Birthday' },
  { value: 'Anniversary', label: 'Anniversary' },
  { value: 'Business Dinner', label: 'Business Dinner' },
  { value: 'Other', label: 'Other' },
];

const dietaryOptions = ['Vegetarian', 'Jain', 'Vegan', 'Nut Allergy', 'Gluten Free'];

export default function Booking() {
  const navigate = useNavigate();
  const { formData, currentStep, setStep, updateFormData, resetForm } = useBooking();
  const { showToast } = useToast();

  // Step 1 local state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    formData.date ? new Date(formData.date) : undefined
  );
  const [step1Error, setStep1Error] = useState('');

  const dateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

  const { data: timeSlots = [], isLoading: slotsLoading } = useQuery({
    queryKey: ['timeSlots', dateString],
    queryFn: () => fetchTimeSlots(dateString),
    enabled: !!dateString,
  });

  // Step 2 form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<GuestDetailsForm>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      special_requests: formData.special_requests,
    },
    mode: 'onBlur',
  });

  const specialRequestsValue = watch('special_requests') || '';

  // Dietary requirements
  const [dietary, setDietary] = useState<string[]>(formData.dietary_requirements);

  const toggleDietary = (option: string) => {
    setDietary((prev) =>
      prev.includes(option) ? prev.filter((d) => d !== option) : [...prev, option]
    );
  };

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (booking) => {
      resetForm();
      navigate(`/booking/confirmation?id=${booking.id}`);
      showToast('Reservation confirmed!', 'success');
    },
    onError: (error: Error) => {
      showToast(error.message || 'Failed to create booking', 'error');
    },
  });

  // Step 1 validation & next
  const handleStep1Next = useCallback(() => {
    setStep1Error('');
    if (!selectedDate) {
      setStep1Error('Please select a date');
      return;
    }
    if (!formData.time) {
      setStep1Error('Please select a time slot');
      return;
    }
    updateFormData({
      date: format(selectedDate, 'yyyy-MM-dd'),
      adults: formData.adults || 2,
      children: formData.children || 0,
    });
    setStep(2);
  }, [selectedDate, formData.time, formData.adults, formData.children, updateFormData, setStep]);

  // Step 2 submit
  const onStep2Submit = (data: GuestDetailsForm) => {
    updateFormData({
      ...data,
      dietary_requirements: dietary,
    });
    setStep(3);
  };

  // Confirm booking
  const handleConfirm = () => {
    bookingMutation.mutate(formData);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return format(d, 'EEEE, d MMMM yyyy');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-end pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800"
            alt="Restaurant table setting with warm candlelight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,10,7,0.4)] via-[rgba(13,10,7,0.7)] to-[#0D0A07]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display italic text-5xl md:text-6xl text-text-primary"
          >
            Reserve a Table
          </motion.h1>
        </div>
      </section>

      {/* Booking Card */}
      <section className="px-6 py-16">
        <div className="max-w-[640px] mx-auto bg-secondary border border-[rgba(201,168,76,0.15)] rounded-[20px] p-8 md:p-10 shadow-gold-glow">
          <BookingSteps currentStep={currentStep} />

          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Date */}
                <div>
                  <h3 className="font-display text-xl text-text-primary mb-4">Select a Date</h3>
                  <DatePickerComponent selected={selectedDate} onSelect={setSelectedDate} />
                </div>

                {/* Time */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="font-display text-xl text-text-primary mb-4">Choose a Time</h3>
                    <TimePicker
                      slots={timeSlots}
                      selected={formData.time}
                      onSelect={(time) => updateFormData({ time })}
                      loading={slotsLoading}
                    />
                  </motion.div>
                )}

                {/* Guests */}
                <div>
                  <h3 className="font-display text-xl text-text-primary mb-4">Number of Guests</h3>
                  <GuestSelector
                    adults={formData.adults}
                    children={formData.children}
                    onAdultsChange={(adults) => updateFormData({ adults })}
                    onChildrenChange={(children) => updateFormData({ children })}
                  />
                </div>

                {/* Occasion */}
                <div>
                  <Select
                    id="occasion"
                    label="Special Occasion"
                    options={occasions}
                    value={formData.occasion}
                    onChange={(e) => updateFormData({ occasion: e.target.value })}
                  />
                  <AnimatePresence>
                    {formData.occasion === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3"
                      >
                        <Input
                          id="occasion_note"
                          label="Please specify"
                          value={formData.occasion_note}
                          onChange={(e) => updateFormData({ occasion_note: e.target.value })}
                          placeholder="Tell us about the occasion"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {step1Error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-2 text-error text-sm font-body"
                    >
                      <AlertCircle size={16} />
                      {step1Error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  onClick={handleStep1Next}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Continue to Details →
                </Button>
              </motion.div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit(onStep2Submit)} className="space-y-6">
                  <Input
                    id="name"
                    label="Full Name"
                    required
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                  />

                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    required
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Input
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    required
                    prefix="+91"
                    placeholder="9876543210"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />

                  <div className="space-y-1.5">
                    <label htmlFor="special_requests" className="block text-sm font-body text-text-secondary">
                      Special Requests
                    </label>
                    <div className="relative">
                      <textarea
                        id="special_requests"
                        rows={3}
                        maxLength={300}
                        placeholder="Any special preferences or requests..."
                        className="w-full bg-secondary border border-[rgba(201,168,76,0.15)] rounded-lg px-4 py-3 text-text-primary font-body text-sm placeholder:text-text-tertiary focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all duration-200 resize-none"
                        {...register('special_requests')}
                      />
                      <span className="absolute bottom-2 right-3 text-[11px] font-body text-text-tertiary">
                        {specialRequestsValue.length}/300
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-body text-text-secondary mb-3">Dietary Requirements</p>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleDietary(option)}
                          className={`px-4 py-2 text-sm font-body rounded-full transition-all ${
                            dietary.includes(option)
                              ? 'bg-gold/15 text-gold border border-gold/40'
                              : 'border border-[rgba(201,168,76,0.15)] text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          {dietary.includes(option) && '✓ '}
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" variant="primary" size="lg" className="flex-1">
                      Continue to Review →
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h3 className="font-display text-2xl text-text-primary">Review Your Booking</h3>

                {/* Summary card */}
                <div className="bg-tertiary border border-[rgba(201,168,76,0.2)] rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-body">
                    <Calendar size={18} className="text-gold" />
                    <span className="text-text-secondary">Date:</span>
                    <span className="text-text-primary">{formatDisplayDate(formData.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-body">
                    <Clock size={18} className="text-gold" />
                    <span className="text-text-secondary">Time:</span>
                    <span className="text-text-primary">{formData.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-body">
                    <Users size={18} className="text-gold" />
                    <span className="text-text-secondary">Guests:</span>
                    <span className="text-text-primary">
                      {formData.adults} Adult{formData.adults !== 1 ? 's' : ''}
                      {formData.children > 0 &&
                        ` · ${formData.children} Child${formData.children !== 1 ? 'ren' : ''}`}
                    </span>
                  </div>
                  {formData.occasion !== 'None' && (
                    <div className="flex items-center gap-3 text-sm font-body">
                      <PartyPopper size={18} className="text-gold" />
                      <span className="text-text-secondary">Occasion:</span>
                      <span className="text-text-primary">
                        {formData.occasion}
                        {formData.occasion_note ? ` — ${formData.occasion_note}` : ''}
                      </span>
                    </div>
                  )}
                  {formData.special_requests && (
                    <div className="flex items-start gap-3 text-sm font-body">
                      <MessageSquare size={18} className="text-gold mt-0.5" />
                      <div>
                        <span className="text-text-secondary">Special Requests: </span>
                        <span className="text-text-primary">{formData.special_requests}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Guest details */}
                <div className="space-y-3">
                  <h4 className="font-body text-sm uppercase tracking-[0.1em] text-text-tertiary">
                    Guest Details
                  </h4>
                  <div className="text-sm font-body space-y-1">
                    <p className="text-text-primary">{formData.name}</p>
                    <p className="text-text-secondary">{formData.email}</p>
                    <p className="text-text-secondary">+91 {formData.phone}</p>
                  </div>
                </div>

                {/* Dietary */}
                {formData.dietary_requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.dietary_requirements.map((d) => (
                      <span
                        key={d}
                        className="px-3 py-1 text-[13px] font-body rounded-full bg-gold/10 text-gold border border-gold/20"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="text-gold text-sm font-body hover:text-gold-light transition-colors"
                >
                  Edit Details
                </button>

                <p className="text-[12px] font-body text-text-tertiary">
                  By confirming, you agree to our cancellation policy.
                </p>

                {bookingMutation.isError && (
                  <div className="bg-error/10 border border-error/20 rounded-lg p-4 text-error text-sm font-body flex items-center gap-2">
                    <AlertCircle size={16} />
                    {bookingMutation.error?.message || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleConfirm}
                    loading={bookingMutation.isPending}
                    className="flex-1"
                  >
                    {bookingMutation.isPending ? 'Confirming...' : 'Confirm Reservation'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
