import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Flame, Recycle, Award } from 'lucide-react';
import Button from '../components/ui/Button';

const philosophy = [
  {
    icon: Leaf,
    title: 'Locally Sourced',
    description: 'Ingredients picked from the finest local farms and spice gardens across India.',
  },
  {
    icon: Flame,
    title: 'Slow Cooked',
    description: 'Time-honoured techniques — our dal simmers for 18 hours, our kebabs rest overnight.',
  },
  {
    icon: Recycle,
    title: 'Minimal Waste',
    description: "Root-to-leaf cooking philosophy. What can't be plated is composted or reimagined.",
  },
];

const chefs = [
  {
    name: 'Arjun Malhotra',
    title: 'Head Chef',
    bio: 'Three-decade veteran of Lucknowi dum cuisine with stints in London and Dubai.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
  },
  {
    name: 'Priya Sharma',
    title: 'Pastry Chef',
    bio: 'Classically trained in Paris, she bridges Indian sweets and French patisserie.',
    image: 'https://images.unsplash.com/photo-1583394293214-28ede15ec80a?w=400',
  },
  {
    name: 'Rohit Nair',
    title: 'Sous Chef',
    bio: 'A Keralan specialist who brings the coastal spice trail to every plate.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400',
  },
];

const awards = [
  'Times Food Award 2024',
  'Zomato Luxe – Top 10 India',
  'Best New Restaurant – INCA Awards',
  'Michelin Plate Recognition 2023',
  'Condé Nast Traveller – Best Hotel Dining',
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1800"
            alt="Warm interior of Saffron restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,10,7,0.3)] via-[rgba(13,10,7,0.7)] to-[#0D0A07]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display italic text-5xl md:text-6xl text-text-primary">Our Story</h1>
            <p className="font-body text-lg text-text-secondary mt-4 max-w-xl">
              A glimpse into the passion, people, and philosophy behind Saffron.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-px w-16 bg-[rgba(201,168,76,0.3)] mb-6" />
            <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-4">Our Origin</p>
            <h2 className="font-display italic text-4xl md:text-[44px] text-text-primary leading-[1.15] mb-8">
              Born from a Passion
              <br />
              for Spice
            </h2>
            <div className="space-y-6 font-body text-text-secondary leading-[1.7]">
              <p>
                In 2018, Chef Arjun Malhotra returned to Mumbai after a fifteen-year journey through the 
                kitchens of London, Dubai, and Singapore, with a singular vision: to serve India's regional 
                cuisines with the reverence they deserve — but with a boldness that looks forward.
              </p>
              <p>
                What began as a small pop-up at a Bandra gallery evolved into Saffron, a space where the 
                fragrance of hand-ground spices meets the precision of modern gastronomy. Every recipe in our 
                kitchen has a story, a region, a memory attached to it.
              </p>
              <p>
                Today, Saffron is home to a team of 30 passionate cooks, servers, and storytellers, all united 
                by the belief that food is India's greatest art form. We don't just serve meals — we curate 
                experiences that linger long after the last bite.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900"
              alt="Chef Arjun plating a dish with care and artistic precision"
              className="w-full aspect-[4/5] object-cover rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-4">Our Philosophy</p>
            <h2 className="font-display italic text-4xl text-text-primary">Three Pillars of Saffron</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {philosophy.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="border border-[rgba(201,168,76,0.15)] rounded-xl p-8 text-center hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <item.icon size={24} className="text-gold" />
                </div>
                <h3 className="font-display text-xl text-text-primary mb-3">{item.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-4">The Team</p>
            <h2 className="font-display italic text-4xl text-text-primary">The Faces Behind the Flavours</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {chefs.map((chef) => (
              <motion.div key={chef.name} variants={fadeUp} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold/30 p-1">
                  <img
                    src={chef.image}
                    alt={`${chef.name}, ${chef.title}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="font-display text-xl text-text-primary">{chef.name}</h3>
                <p className="font-body text-sm text-gold uppercase tracking-wider mt-1">{chef.title}</p>
                <p className="font-body text-sm text-text-secondary mt-3 max-w-xs mx-auto">{chef.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 px-6 border-y border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto">
          <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-8 text-center">
            Awards & Recognition
          </p>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 min-w-max justify-center">
              {awards.map((award) => (
                <div
                  key={award}
                  className="flex items-center gap-3 px-6 py-3 border border-gold/20 rounded-full"
                >
                  <Award size={16} className="text-gold" />
                  <span className="font-body text-sm text-text-primary whitespace-nowrap">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800"
            alt="Warm restaurant ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[13px] uppercase tracking-[0.15em] text-gold mb-4">Reservations</p>
            <h2 className="font-display italic text-4xl md:text-[56px] text-text-primary leading-[1.15] mb-6">
              Your Table is Waiting
            </h2>
            <p className="font-body text-lg text-text-secondary mb-10">Book in minutes. No account needed.</p>
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
