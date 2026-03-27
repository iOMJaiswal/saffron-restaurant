import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const featuredDishes = [
  {
    name: 'Butter Chicken',
    description: 'Tandoori chicken simmered in a velvety tomato-butter sauce with honey and fenugreek.',
    price: '₹545',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
    isVeg: false,
  },
  {
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked overnight with butter, cream, and smoky spices.',
    price: '₹445',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    isVeg: true,
  },
  {
    name: 'Awadhi Gosht Biryani',
    description: 'Lucknowi-style lamb biryani layered with saffron rice, slow-cooked on dum.',
    price: '₹695',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
    isVeg: false,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800"
            alt="Elegant restaurant interior with warm ambient lighting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,10,7,0.3)] via-[rgba(13,10,7,0.7)] to-[#0D0A07]" />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="font-body text-[13px] uppercase tracking-[0.2em] text-gold mb-6"
          >
            Fine Dining · Mumbai
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display italic text-5xl md:text-7xl lg:text-[80px] text-text-primary leading-[1.1] mb-6"
          >
            Where Every Meal
            <br />
            Is a Memory
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-body text-lg text-text-secondary mb-10 max-w-xl mx-auto"
          >
            Authentic Indian cuisine, reimagined for the modern palate
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/book">
              <Button variant="primary" size="lg">
                Reserve a Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" size="lg">
                Explore Menu
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-tertiary"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-4">
              From Our Kitchen
            </p>
            <h2 className="font-display italic text-4xl md:text-[40px] text-text-primary">
              Crafted with intention, served with soul
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredDishes.map((dish, i) => (
              <motion.div
                key={dish.name}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
                }}
                className="group border border-[rgba(201,168,76,0.15)] rounded-xl overflow-hidden hover:border-[rgba(201,168,76,0.4)] hover:shadow-gold-border-glow transition-all duration-400"
              >
                <div className="overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-success' : 'bg-[#E8815C]'}`}
                    />
                    <span className="text-[11px] font-body uppercase tracking-wider text-text-tertiary">
                      {dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                  </div>
                  <h3 className="font-display text-[22px] text-text-primary mb-2">{dish.name}</h3>
                  <p className="font-body text-sm text-text-secondary line-clamp-2 mb-4">
                    {dish.description}
                  </p>
                  <p className="font-body text-lg text-gold font-medium">{dish.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/menu"
              className="font-body text-sm text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2"
            >
              View Full Menu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-px w-16 bg-[rgba(201,168,76,0.3)] mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-4">
                Our Story
              </p>
              <h2 className="font-display italic text-4xl md:text-[48px] text-text-primary leading-[1.15] mb-8">
                A Celebration of
                <br />
                Indian Heritage
              </h2>
              <p className="font-body text-text-secondary leading-[1.7] mb-6">
                Saffron was born from the belief that Indian cuisine deserves a stage as grand as its history. 
                Nestled in the heart of Mumbai's Malabar Hill, we bring together centuries-old recipes and 
                contemporary technique under one roof.
              </p>
              <p className="font-body text-text-secondary leading-[1.7] mb-8">
                Every ingredient is chosen with intention — from hand-ground spices sourced directly from 
                Kerala's plantations to seasonal produce from local farms. Our chefs honour tradition 
                while embracing innovation, creating dishes that tell stories of India's diverse culinary landscape.
              </p>
              <Link
                to="/about"
                className="font-body text-sm text-gold hover:text-gold-light transition-colors inline-flex items-center gap-2"
              >
                Learn More About Us →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 order-1 lg:order-2 relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900"
                  alt="Chef carefully plating a dish with precision and artistry"
                  className="w-full aspect-[3/4] object-cover rounded-xl relative z-10"
                />
                <div className="absolute -top-3 -left-3 w-full h-full border border-gold/30 rounded-xl z-0" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800"
            alt="Warm restaurant ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>

        {/* Floating gold particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full animate-float-up"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`,
              top: `${60 + (i % 3) * 10}%`,
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-4">
              Reservations
            </p>
            <h2 className="font-display italic text-4xl md:text-[56px] text-text-primary leading-[1.15] mb-6">
              Your Table is Waiting
            </h2>
            <p className="font-body text-lg text-text-secondary mb-10">
              Book in minutes. No account needed.
            </p>
            <Link to="/book">
              <Button variant="primary" size="lg">
                Reserve a Table
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
