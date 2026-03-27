# Saffron — Where Every Meal is a Memory

A full-stack restaurant booking & menu website for a fictional upscale Indian restaurant. Built as a portfolio project showcasing exceptional UI/UX design and frontend engineering.

![Saffron](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop)

## Tech Stack

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form + Zod
- **Backend**: Node.js + Express
- **Database**: SQLite (better-sqlite3)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd saffron-restaurant
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

### Development

Start the backend server:
```bash
npm run dev:server
```

In a new terminal, start the frontend dev server:
```bash
npm run dev:client
```

- Frontend runs at `http://localhost:5173`
- Backend API runs at `http://localhost:3001`
- Vite proxies `/api` requests to the backend in development

### Production Build

```bash
npm run build
npm start
```

This builds the React client and serves everything from the Express server on port 3001.

## Project Structure

```
saffron-restaurant/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI, layout, booking components
│   │   ├── pages/           # Home, Menu, Booking, Confirmation, About
│   │   ├── hooks/           # Custom hooks & context
│   │   ├── types/           # TypeScript interfaces
│   │   ├── lib/             # API client
│   │   ├── App.tsx          # Root component with routing
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   └── vite.config.ts
├── server/
│   ├── index.js             # Express server
│   ├── db.js                # SQLite database setup
│   ├── seed.js              # Database seeder (24+ dishes)
│   └── routes/
│       ├── menu.js          # GET /api/menu
│       └── bookings.js      # CRUD booking endpoints
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Fetch all menu items (filter by `?category=` or `?veg=true`) |
| GET | `/api/bookings/slots?date=YYYY-MM-DD` | Get time slot availability for a date |
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings/:id` | Get booking details by ID |

## Features

- **Luxury editorial design** — dark, warm, gold-accented
- **3-step booking wizard** with persistent form context
- **Interactive menu** with category sidebar, dietary filters, and Intersection Observer
- **Framer Motion animations** throughout — page transitions, staggered reveals, animated checkmark
- **Custom calendar** styled with react-day-picker
- **Toast notification system** built from scratch
- **Skeleton loaders** with shimmer animation
- **Responsive** — mobile, tablet, and desktop
- **Accessible** — WCAG AA color contrast, keyboard navigation, proper ARIA labels
- **ICS calendar file download** on booking confirmation

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `NODE_ENV` | `development` | Set to `production` to serve built client |

## License

MIT
