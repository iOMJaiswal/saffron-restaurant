import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fetchBooking } from '../lib/api';
import Button from '../components/ui/Button';
import { SkeletonConfirmation } from '../components/ui/Skeleton';
import { Calendar, Clock, Users, User, Mail, Phone } from 'lucide-react';

function AnimatedCheckmark() {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <motion.circle
        cx="40"
        cy="40"
        r="36"
        stroke="#C9A84C"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.path
        d="M24 40L35 51L56 30"
        stroke="#C9A84C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

function generateICS(booking: {
  date: string;
  time: string;
  name: string;
  booking_ref: string;
}) {
  const dateStr = booking.date.replace(/-/g, '');
  // Parse time like "8:00 PM" into 24hr
  const match = booking.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return;
  let hours = parseInt(match[1]);
  const minutes = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hours !== 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes}00`;

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Saffron//Reservation//EN
BEGIN:VEVENT
DTSTART:${dateStr}T${timeStr}
DURATION:PT2H
SUMMARY:Dinner at Saffron (${booking.booking_ref})
DESCRIPTION:Reservation for ${booking.name} at Saffron Restaurant
LOCATION:42 Malabar Hill Road, Mumbai 400006, India
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `saffron-${booking.booking_ref}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id');

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => fetchBooking(bookingId!),
    enabled: !!bookingId,
  });

  if (!bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center">
          <h1 className="font-display italic text-3xl text-text-primary mb-4">No Booking Found</h1>
          <p className="font-body text-text-secondary mb-8">
            It looks like you haven't made a booking yet, or the link is invalid.
          </p>
          <Link to="/book">
            <Button variant="primary">Make a Reservation</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-6">
        <SkeletonConfirmation />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center">
          <h1 className="font-display italic text-3xl text-text-primary mb-4">Something Went Wrong</h1>
          <p className="font-body text-text-secondary mb-8">
            We couldn't find your booking details. Please try again.
          </p>
          <Link to="/book">
            <Button variant="primary">Try Again</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = (() => {
    try {
      return format(new Date(booking.date), 'EEEE, d MMMM yyyy');
    } catch {
      return booking.date;
    }
  })();

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <AnimatedCheckmark />

          <h1 className="font-display italic text-4xl md:text-[48px] text-text-primary">
            You're all set!
          </h1>
          <p className="font-body text-lg text-text-secondary">
            We look forward to welcoming you at Saffron.
          </p>

          {/* Confirmation ticket card */}
          <div className="mt-10 relative">
            <div className="bg-secondary border-2 border-dashed border-gold/30 rounded-2xl p-8 space-y-6">
              {/* Booking ref */}
              <div className="text-center pb-5 border-b border-[rgba(201,168,76,0.15)]">
                <p className="font-body text-[11px] uppercase tracking-[0.15em] text-text-tertiary mb-2">
                  Booking Reference
                </p>
                <p className="font-mono text-2xl text-gold font-bold tracking-wider">
                  #{booking.booking_ref}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 text-sm font-body">
                  <Calendar size={16} className="text-gold" />
                  <span className="text-text-secondary min-w-[60px]">Date</span>
                  <span className="text-text-primary">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-body">
                  <Clock size={16} className="text-gold" />
                  <span className="text-text-secondary min-w-[60px]">Time</span>
                  <span className="text-text-primary">{booking.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-body">
                  <Users size={16} className="text-gold" />
                  <span className="text-text-secondary min-w-[60px]">Guests</span>
                  <span className="text-text-primary">
                    {booking.adults} Adult{booking.adults !== 1 ? 's' : ''}
                    {booking.children > 0 &&
                      ` · ${booking.children} Child${booking.children !== 1 ? 'ren' : ''}`}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm font-body">
                  <User size={16} className="text-gold" />
                  <span className="text-text-secondary min-w-[60px]">Name</span>
                  <span className="text-text-primary">{booking.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-body">
                  <Mail size={16} className="text-gold" />
                  <span className="text-text-secondary min-w-[60px]">Email</span>
                  <span className="text-text-primary">{booking.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-body">
                  <Phone size={16} className="text-gold" />
                  <span className="text-text-secondary min-w-[60px]">Phone</span>
                  <span className="text-text-primary">+91 {booking.phone}</span>
                </div>
              </div>
            </div>

            {/* Decorative scissor line */}
            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-primary rounded-full" />
            <div className="absolute -right-3 top-1/2 w-6 h-6 bg-primary rounded-full" />
          </div>

          <p className="font-body text-sm text-text-tertiary">
            A confirmation has been sent to <span className="text-text-secondary">{booking.email}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => generateICS(booking)}
              className="flex-1"
            >
              Add to Calendar
            </Button>
            <Link to="/" className="flex-1">
              <Button variant="primary" size="lg" fullWidth>
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
