import express from 'express';
import sql from '../db.js';

const router = express.Router();

function generateRef() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'SFR-';
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const {
      date, time, adults, children, occasion, occasion_note,
      name, email, phone, special_requests, dietary_requirements
    } = req.body;

    // Basic validation
    if (!date || !time || !adults || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate adults range
    if (adults < 1 || adults > 10) {
      return res.status(400).json({ error: 'Adults must be between 1 and 10' });
    }

    // Check slot availability
    const [slotCount] = await sql`SELECT COUNT(*) as count FROM bookings WHERE date = ${date} AND time = ${time}`;
    if (parseInt(slotCount.count) >= 5) {
      return res.status(409).json({ error: 'This time slot is fully booked' });
    }

    let booking_ref = generateRef();
    // Ensure uniqueness
    let existing = await sql`SELECT id FROM bookings WHERE booking_ref = ${booking_ref}`;
    while (existing.length > 0) {
      booking_ref = generateRef();
      existing = await sql`SELECT id FROM bookings WHERE booking_ref = ${booking_ref}`;
    }

    const dietaryStr = Array.isArray(dietary_requirements)
      ? dietary_requirements.join(', ')
      : dietary_requirements || '';

    const [booking] = await sql`
      INSERT INTO bookings (booking_ref, date, time, adults, children, occasion, occasion_note, name, email, phone, special_requests, dietary_requirements)
      VALUES (${booking_ref}, ${date}, ${time}, ${adults}, ${children || 0}, ${occasion || null},
        ${occasion_note || null}, ${name}, ${email}, ${phone}, ${special_requests || null}, ${dietaryStr})
      RETURNING *
    `;
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET /api/bookings/slots?date=YYYY-MM-DD
router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const allSlots = [
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
      '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
    ];

    const counts = await sql`SELECT time, COUNT(*) as count FROM bookings WHERE date = ${date} GROUP BY time`;

    const countMap = {};
    for (const row of counts) {
      countMap[row.time] = parseInt(row.count);

    const slots = allSlots.map(slot => ({
      time: slot,
      available: (countMap[slot] || 0) < 5
    }));

    res.json(slots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Failed to fetch time slots' });
  }
});

// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const [booking] = await sql`SELECT * FROM bookings WHERE id = ${req.params.id}`;

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

export default router;
