import { MenuItem, Booking, BookingFormData, TimeSlot } from '../types';

const API_BASE = '/api';

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
  const response = await fetch(url);
  return handleResponse<MenuItem[]>(response);
}

export async function fetchTimeSlots(date: string): Promise<TimeSlot[]> {
  const response = await fetch(`${API_BASE}/bookings/slots?date=${encodeURIComponent(date)}`);
  return handleResponse<TimeSlot[]>(response);
}

export async function createBooking(data: BookingFormData): Promise<Booking> {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Booking>(response);
}

export async function fetchBooking(id: string): Promise<Booking> {
  const response = await fetch(`${API_BASE}/bookings/${encodeURIComponent(id)}`);
  return handleResponse<Booking>(response);
}
