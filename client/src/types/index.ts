export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  is_veg: number;
  is_special: number;
  spice_level: number;
}

export interface Booking {
  id: number;
  booking_ref: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  occasion: string | null;
  occasion_note: string | null;
  name: string;
  email: string;
  phone: string;
  special_requests: string | null;
  dietary_requirements: string | null;
  created_at: string;
}

export interface BookingFormData {
  date: string;
  time: string;
  adults: number;
  children: number;
  occasion: string;
  occasion_note: string;
  name: string;
  email: string;
  phone: string;
  special_requests: string;
  dietary_requirements: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export type MenuCategory = 'All' | 'Starters' | 'Breads' | 'Mains' | 'Biryanis' | 'Desserts' | 'Drinks';

export type DietaryFilter = 'all' | 'veg' | 'non-veg' | 'special';
