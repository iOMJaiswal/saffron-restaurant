import { MenuItem, Booking, BookingFormData, TimeSlot } from '../types';

const API_BASE = '/api';

const warnedFallbacks = new Set<string>();

const dummyMenu: MenuItem[] = [
  {
    id: 1,
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 340,
    description: 'Chargrilled cottage cheese with smoky spices.',
    image_url: 'https://images.unsplash.com/photo-1625937326939-e7f7372f7b3f?auto=format&fit=crop&w=900&q=80',
    is_veg: 1,
    is_special: 1,
    spice_level: 2,
  },
  {
    id: 2,
    name: 'Butter Chicken',
    category: 'Mains',
    price: 520,
    description: 'Creamy tomato gravy and tender chicken pieces.',
    image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80',
    is_veg: 0,
    is_special: 1,
    spice_level: 2,
  },
  {
    id: 3,
    name: 'Garlic Naan',
    category: 'Breads',
    price: 110,
    description: 'Soft tandoor naan finished with garlic butter.',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    is_veg: 1,
    is_special: 0,
    spice_level: 0,
  },
  {
    id: 4,
    name: 'Hyderabadi Veg Biryani',
    category: 'Biryanis',
    price: 410,
    description: 'Fragrant basmati, vegetables, and saffron.',
    image_url: 'https://images.unsplash.com/photo-1701579231347-7afabe2f9e8a?auto=format&fit=crop&w=900&q=80',
    is_veg: 1,
    is_special: 1,
    spice_level: 3,
  },
  {
    id: 5,
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 180,
    description: 'Warm khoya dumplings in cardamom syrup.',
    image_url: 'https://images.unsplash.com/photo-1601303516476-79e31d2f4ef4?auto=format&fit=crop&w=900&q=80',
    is_veg: 1,
    is_special: 0,
    spice_level: 0,
  },
  {
    id: 6,
    name: 'Masala Chaas',
    category: 'Drinks',
    price: 120,
    description: 'Spiced buttermilk with roasted cumin.',
    image_url: 'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?auto=format&fit=crop&w=900&q=80',
    is_veg: 1,
    is_special: 0,
    spice_level: 0,
  },
];

let dummyBookings: Booking[] = [
  {
    id: 1,
    booking_ref: 'SAF-240301',
    date: '2026-03-31',
    time: '20:00',
    adults: 2,
    children: 0,
    occasion: 'anniversary',
    occasion_note: null,
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    phone: '9876543210',
    special_requests: 'Window seat preferred.',
    dietary_requirements: 'Vegetarian options',
    created_at: '2026-03-30T10:30:00.000Z',
  },
];

function warnFallback(scope: string, error: unknown): void {
  if (warnedFallbacks.has(scope)) return;
  warnedFallbacks.add(scope);
  console.warn(`[offline-fallback] ${scope}: backend unavailable, serving dummy data.`, error);
}

async function withFallback<T>(scope: string, request: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (error) {
    warnFallback(scope, error);
    return fallback();
  }
}

function normalizeDate(date: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
}

function buildDummySlots(date: string): TimeSlot[] {
  const safeDate = normalizeDate(date);
  const times = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
  const booked = new Set(
    dummyBookings
      .filter((b) => b.date === safeDate)
      .map((b) => b.time),
  );

  return times.map((time) => ({
    time,
    available: !booked.has(time),
  }));
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
}

export async function fetchMenu(category?: string): Promise<MenuItem[]> {
  const params = new URLSearchParams();
  if (category && category !== 'All') {
    params.set('category', category);
  }
  const url = `${API_BASE}/menu${params.toString() ? `?${params}` : ''}`;
  return withFallback('menu.list', async () => {
    const response = await fetch(url);
    return handleResponse<MenuItem[]>(response);
  }, () => {
    if (!category || category === 'All') return dummyMenu.slice();
    return dummyMenu.filter((item) => item.category === category);
  });
}

export async function fetchTimeSlots(date: string): Promise<TimeSlot[]> {
  return withFallback('bookings.slots', async () => {
    const response = await fetch(`${API_BASE}/bookings/slots?date=${encodeURIComponent(date)}`);
    return handleResponse<TimeSlot[]>(response);
  }, () => buildDummySlots(date));
}

export async function createBooking(data: BookingFormData): Promise<Booking> {
  return withFallback('bookings.create', async () => {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Booking>(response);
  }, () => {
    const nextId = Math.max(0, ...dummyBookings.map((b) => b.id)) + 1;
    const booking: Booking = {
      id: nextId,
      booking_ref: `SAF-${Date.now().toString().slice(-8)}`,
      date: normalizeDate(data.date),
      time: data.time,
      adults: data.adults,
      children: data.children,
      occasion: data.occasion || null,
      occasion_note: data.occasion_note || null,
      name: data.name,
      email: data.email,
      phone: data.phone,
      special_requests: data.special_requests || null,
      dietary_requirements: data.dietary_requirements.join(', ') || null,
      created_at: new Date().toISOString(),
    };
    dummyBookings = [booking, ...dummyBookings];
    return booking;
  });
}

export async function fetchBooking(id: string): Promise<Booking> {
  return withFallback('bookings.detail', async () => {
    const response = await fetch(`${API_BASE}/bookings/${encodeURIComponent(id)}`);
    return handleResponse<Booking>(response);
  }, () => {
    const match = dummyBookings.find((b) => b.booking_ref === id || String(b.id) === id);
    return match ?? dummyBookings[0];
  });
}
