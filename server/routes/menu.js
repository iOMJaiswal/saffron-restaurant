import express from 'express';
import sql from '../db.js';

const router = express.Router();

// GET /api/menu
router.get('/', async (req, res) => {
  try {
    const { category, veg } = req.query;

    const conditions = ['1=1'];
    const params = [];

    if (category && category !== 'All') {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (veg === 'true') {
      conditions.push('is_veg = 1');
    }

    const query = `SELECT * FROM menu_items WHERE ${conditions.join(' AND ')} ORDER BY category, id`;
    const items = await sql.unsafe(query, params);
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

export default router;
