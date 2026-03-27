import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import menuRoutes from './routes/menu.js';
import bookingRoutes from './routes/bookings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
}));
app.use(express.json());

// API routes
app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve static files in production (local / Render only — Vercel serves the client separately)
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

// Export for Vercel serverless; listen when running locally or on Render
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Saffron server running on http://localhost:${PORT}`);
  });
}

export default app;
